-- Run this in Supabase SQL Editor (Dashboard → SQL Editor) to create the table for cash offer form submissions.

create table if not exists public.cash_offer_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  address text,
  created_at timestamptz not null default now()
);

-- Optional: enable Row Level Security (RLS) and allow service role to do everything.
-- The API uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS, so inserts will work without this.
-- If you use the anon key instead, add a policy to allow insert:
-- alter table public.cash_offer_leads enable row level security;
-- create policy "Allow anonymous insert" on public.cash_offer_leads for insert with (true);
