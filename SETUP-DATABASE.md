# How to set up the database (step by step)

The contact form saves submissions to a free Supabase database. Follow these steps once.

---

## Step 1: Create a Supabase account and project

1. Go to **https://supabase.com** and sign up (free).
2. Click **New project**.
3. Pick an organization (or create one), then:
   - **Name:** e.g. `sellerstop`
   - **Database password:** choose a strong password and **save it somewhere safe**
   - **Region:** pick one close to you
4. Click **Create new project** and wait 1–2 minutes until it’s ready.

---

## Step 2: Create the table

1. In the Supabase dashboard, open your project.
2. In the left sidebar, click **SQL Editor**.
3. Click **New query**.
4. Copy everything from the file **`supabase-schema.sql`** in this project (open it in your code editor and copy all).
5. Paste into the Supabase SQL Editor.
6. Click **Run** (or press Ctrl+Enter).
7. You should see “Success. No rows returned.” The table `cash_offer_leads` is now created.

---

## Step 3: Get your API keys

1. In the Supabase left sidebar, click **Settings** (gear icon).
2. Click **API** in the settings menu.
3. You’ll see:
   - **Project URL** (e.g. `https://abcdefgh.supabase.co`)
   - **Project API keys**:
     - **anon public** – don’t use this for the form
     - **service_role** – use this one (click “Reveal” and copy it; keep it secret)

---

## Step 4: Create `.env.local` in your project

1. Open your project folder in the editor (the folder that contains `package.json`).
2. Create a new file named **`.env.local`** in that **same folder** (root of the project, not inside `src`).
3. Paste this and replace the placeholders with your real values from Step 3:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Example (with fake values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc123.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Save the file.

---

## Step 5: Restart the dev server

1. In the terminal where `npm run dev` is running, press **Ctrl+C** to stop it.
2. Run again:

```bash
npm run dev
```

3. Open the site, fill the form, and submit. The submission should be saved.

---

## Check that it worked

1. In Supabase, go to **Table Editor** in the left sidebar.
2. Open the **`cash_offer_leads`** table.
3. You should see new rows when someone submits the form.

---

## If it still doesn’t work

- Make sure **`.env.local`** is in the project **root** (same folder as `package.json`).
- Make sure there are **no spaces** around the `=` in `.env.local`:
  - Good: `NEXT_PUBLIC_SUPABASE_URL=https://...`
  - Bad: `NEXT_PUBLIC_SUPABASE_URL = https://...`
- After changing `.env.local`, you **must** stop the dev server (Ctrl+C) and run `npm run dev` again.
- If the form shows an error message, read it; it may say exactly what’s missing (e.g. “Database not set up yet”).
