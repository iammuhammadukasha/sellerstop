# Make the live site work (form + emails)

The app works on localhost because it reads env vars from `.env.local`. On a **live domain** (Vercel, Netlify, etc.) you must add the **same variables in the hosting dashboard** — they are not read from `.env.local` in production.

---

## If you use Vercel

1. Go to **https://vercel.com** → your project.
2. Open **Settings** → **Environment Variables**.
3. Add each variable (name + value). Enable **Production** (and **Preview** if you want):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL  
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key  
   - `RESEND_API_KEY` = your Resend API key  
   - `CASH_OFFER_NOTIFY_EMAIL` = email where you get form notifications (e.g. `iammuhammadukasha@gmail.com`)
4. Click **Save**.
5. **Redeploy**: **Deployments** → ⋮ on the latest deployment → **Redeploy** (or push a new commit).  
   Env vars are applied only on the next build.

---

## If you use Netlify

1. **Site** → **Site configuration** → **Environment variables**.
2. Add the same four variables as above.
3. **Trigger a new deploy** (e.g. **Deploys** → **Trigger deploy** → **Deploy site**).

---

## Checklist

- [ ] All 4 env vars added in the **hosting** dashboard (not only in `.env.local`).
- [ ] No typos in variable **names** (e.g. `NEXT_PUBLIC_SUPABASE_URL` not `SUPABASE_URL`).
- [ ] No extra spaces in **values**.
- [ ] A **new deploy** was run after saving the variables.

---

## What “not working” usually is

- **Form submits but shows an error**  
  Often: “Database not configured…” or “Something went wrong.”  
  → Add the env vars in the host and redeploy.

- **Site is blank or 504**  
  → Check the host’s build logs for errors.

- **Form works but no email**  
  → Add `RESEND_API_KEY` and `CASH_OFFER_NOTIFY_EMAIL` in the host and redeploy.

After adding the variables and redeploying, test the form again on the live URL.
