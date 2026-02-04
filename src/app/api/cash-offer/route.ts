import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseServer } from '@/lib/supabase';

const TABLE = 'cash_offer_leads';

async function sendLeadNotification(params: {
  full_name: string;
  email: string;
  phone: string;
  address: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CASH_OFFER_NOTIFY_EMAIL;
  if (!apiKey || !toEmail) {
    return { ok: false, error: 'RESEND_API_KEY or CASH_OFFER_NOTIFY_EMAIL not set' };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || 'Seller Stop <onboarding@resend.dev>';

  const { data, error } = await resend.emails.send({
    from,
    to: [toEmail],
    subject: `New Cash Offer Request: ${params.full_name}`,
    html: `
      <h2>New cash offer request</h2>
      <p><strong>Name:</strong> ${escapeHtml(params.full_name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(params.phone)}</p>
      <p><strong>Address:</strong> ${escapeHtml(params.address)}</p>
    `,
  });

  if (error) {
    console.error('Resend email error:', error.message || error);
    return { ok: false, error: error.message || String(error) };
  }
  return { ok: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, address } = body;

    if (!full_name || typeof full_name !== 'string' || !full_name.trim()) {
      return NextResponse.json(
        { error: 'Full name is required.' },
        { status: 400 }
      );
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { error: 'Phone number is required.' },
        { status: 400 }
      );
    }
    const phoneDigits = String(phone).replace(/\D/g, '');
    if (!/^\d+$/.test(phoneDigits)) {
      return NextResponse.json(
        { error: 'Phone must contain only numbers.' },
        { status: 400 }
      );
    }
    if (phoneDigits.length !== 10 && !(phoneDigits.length === 11 && phoneDigits.startsWith('1'))) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit US phone number.' },
        { status: 400 }
      );
    }
    if (!address || typeof address !== 'string' || !address.trim()) {
      return NextResponse.json(
        { error: 'Address is required.' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error:
            'Database not set up yet. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local (see SETUP-DATABASE.md).',
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseServer();
    const normalizedPhone = phoneDigits.length === 11 ? phoneDigits.slice(1) : phoneDigits;

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        full_name: String(full_name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: normalizedPhone,
        address: String(address).trim(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Could not save your request. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    const emailResult = await sendLeadNotification({
      full_name: String(full_name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: normalizedPhone,
      address: String(address).trim(),
    });
    if (!emailResult.ok) {
      console.error('Email notification failed:', emailResult.error);
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e) {
    console.error('Cash offer API error:', e);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
