# Oloning’o Travel website

Bilingual (English/German) website for Oloning’o Travel, built with Next.js and Supabase.

**Status:** public site complete (phase 1, days 1–5 of the plan). The admin area (login, editing trips, offers, reviews, blog, inquiries inbox) comes next. Until then, content is edited in the Supabase table editor.

## What’s inside

| Part | Where |
| --- | --- |
| Pages (one folder per page) | `src/app/[locale]/…` |
| Interface text, English and German | `messages/en.json`, `messages/de.json` |
| Localized web addresses (e.g. `/de/reisen`) | `src/i18n/routing.ts` |
| Design (colours, fonts, layout) | `src/app/globals.css` |
| Reading content from the database | `src/lib/data.ts` |
| Inquiry form handling, spam protection, emails | `src/app/api/inquiry/route.ts`, `src/lib/email.ts` |
| Database tables and security rules | `supabase/schema.sql` |
| Starter content for the database | `supabase/seed.sql` (generated from `src/lib/sample-data.ts`) |

Without Supabase settings, the site runs on the built-in sample content. That’s useful for previews. Sample reviews show a “Sample review” label there; in the database they are stored as **hidden** so they never appear publicly.

## Run it on your computer

You need [Node.js 20 or newer](https://nodejs.org).

```bash
npm install
cp .env.example .env.local   # then fill in the values (optional for a first look)
npm run dev
```

Open http://localhost:3000. Visitors with a German browser are sent to `/de`, everyone else to `/en`.

## Going live: step by step

### 1. Supabase (database, image storage, admin login)

1. Create a free project at [supabase.com](https://supabase.com). Pick the **Frankfurt (eu-central-1)** region so data stays in the EU and pages load fast in Germany.
2. In the project, open **SQL Editor**, paste the whole of `supabase/schema.sql` and run it.
3. Run `supabase/seed.sql` the same way to load the starter content.
4. Go to **Project settings → API** and copy the **Project URL**, the **anon public** key and the **service_role** key. Keep the service_role key secret.

### 2. Resend (inquiry emails)

1. Create an account at [resend.com](https://resend.com) and add your domain under **Domains**. Resend shows a few DNS records; add them at your domain provider.
2. Create an API key.
3. `EMAIL_FROM` must use the verified domain, e.g. `Oloning’o Travel <hello@your-domain.com>`.

### 3. GitHub

1. Create a private repository on [github.com](https://github.com) (e.g. `oloningo-travel`).
2. Upload this folder to it. With Git installed:

```bash
git init -b main
git add .
git commit -m "Oloning’o Travel website"
git remote add origin https://github.com/YOUR-NAME/oloningo-travel.git
git push -u origin main
```

(Or use GitHub’s “uploading an existing file” link on the new repository page and drag the folder contents in, leaving out `node_modules` and `.next`.)

### 4. Vercel (hosting)

1. Sign in to [vercel.com](https://vercel.com) with GitHub and choose **Add New → Project**, then pick the repository.
2. Under **Environment Variables**, add every value from `.env.example` (Supabase, Resend, `INQUIRY_NOTIFY_EMAIL`, `RATE_LIMIT_SALT`, and `NEXT_PUBLIC_SITE_URL` with your real domain).
3. In **Settings → Functions**, set the region to **Frankfurt (fra1)**.
4. Click **Deploy**. You get a temporary address like `oloningo-travel.vercel.app` to test on.

Vercel’s free Hobby plan is for non-commercial use only, so a business site needs the **Pro** plan.

### 5. Your domain

1. In Vercel: **Project → Settings → Domains → Add**, enter `www.your-domain.com` and also `your-domain.com`.
2. Vercel shows the DNS records to create (usually an `A` record for the bare domain and a `CNAME` for `www`). Add them at the company where you bought the domain.
3. Wait for the check marks (minutes to a few hours). Vercel issues the SSL certificate automatically.
4. Update `NEXT_PUBLIC_SITE_URL` to the final address and redeploy.

### 6. After launch

- Add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://www.your-domain.com/sitemap.xml`.
- Set up a Google Business Profile.
- Replace placeholder settings (email, phone numbers, WhatsApp number, founder name) in the Supabase `settings` table.
- Fill in the legal pages (`legal_pages` table) once the texts are reviewed.

## Editing content before the admin area exists

In Supabase → **Table Editor**:

- **settings**: contact email, WhatsApp number (digits only, with country code, e.g. `4915112345678`), phone numbers, founder name.
- **trips**, **trip_days**, **trip_inclusions**, **offers**: packages. Set `status` to `published` to show a trip.
- **reviews**: set `status` to `approved` to show a review. Only publish genuine reviews, with permission.
- **hero_slides**: the homepage carousel. The welcome slide has `is_welcome = true`.
- Images: upload to the **media** storage bucket and paste the public URL into `image` / `cover_image`.

Changes appear on the site within about a minute.

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (run before deploying to catch errors) |
| `npm run typecheck` | Checks the code for type errors |
| `npm run seed:sql` | Regenerates `supabase/seed.sql` from the sample content |

## Notes

- Fonts are self-hosted (no requests to Google), which avoids a common GDPR problem in Germany.
- The site sets no tracking cookies, so no cookie banner is needed. If analytics are added later, add consent first.
- Light/dark mode and language choice are remembered in the visitor’s browser.
