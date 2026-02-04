import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

const TABLE = 'cash_offer_leads';

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

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e) {
    console.error('Cash offer API error:', e);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
