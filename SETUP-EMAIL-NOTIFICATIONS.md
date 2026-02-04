# How to get email notifications when someone submits the form

When a visitor submits "Get My Cash Offer", the lead is saved to the database and you can optionally receive an email with their details.

---

## Step 1: Create a Resend account

1. Go to **https://resend.com** and sign up (free).
2. Confirm your email if asked.

---

## Step 2: Get your API key

1. In Resend, go to **API Keys** (in the sidebar or dashboard).
2. Click **Create API Key**.
3. Name it (e.g. `sellerstop`) and click **Create**.
4. Copy the key (it starts with `re_`). You won’t see it again, so store it somewhere safe.

---

## Step 3: Add to `.env.local`

Open **`.env.local`** in your project root and add:

```env
RESEND_API_KEY=re_your_actual_key_here
CASH_OFFER_NOTIFY_EMAIL=nick@nrprobate.com
```

Replace:

- `re_your_actual_key_here` with the API key you copied.
- `nick@nrprobate.com` with the email address where you want to receive notifications.

---

## Step 4: Restart the dev server

1. Stop the server (Ctrl+C in the terminal).
2. Run `npm run dev` again.

---

## What you’ll get

Each time someone submits the form, you’ll receive an email with subject **"New Cash Offer Request: [Name]"** containing:

- Name  
- Email  
- Phone  
- Address  

The lead is still saved in Supabase even if the email fails. If you don’t set `RESEND_API_KEY` or `CASH_OFFER_NOTIFY_EMAIL`, the app still works; you just won’t get emails.

---

## Optional: Send from your own domain

By default, emails are sent from Resend’s address (`onboarding@resend.dev`). To send from your own domain (e.g. `notifications@yourdomain.com`):

1. In Resend, go to **Domains** and add your domain.
2. Add the DNS records they give you at your domain provider.
3. After the domain is verified, add to `.env.local`:

```env
RESEND_FROM_EMAIL=Seller Stop <notifications@yourdomain.com>
```

Restart the dev server. New notifications will use this “From” address.
