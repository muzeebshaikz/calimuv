# Deployment Guide (Free tier)

Deploy order: **Supabase (DB) → Render (backend) → Vercel (frontend) → wire CORS → Analytics**.
All free. You do the account/click steps; the code is already prepared for each.

---

## 1. Database — Supabase

1. Create an account at <https://supabase.com> → **New project**.
2. Pick a name, a strong **database password** (save it), and the region closest to you.
3. Wait for it to provision (~2 min).
4. Go to **Project Settings → Database → Connection string → "Session pooler" → URI**.
   - It looks like:
     `postgresql://postgres.abcxyz:[PASSWORD]@aws-0-xx.pooler.supabase.com:5432/postgres`
   - Replace `[PASSWORD]` with your DB password.
   - Append `?sslmode=require` at the end.
   - **Use the Session pooler (port 5432)** — it's IPv4 (Render needs that) and supports prepared statements.
5. Keep this full string — it's your `DATABASE_URL` for Render.

> You don't need to run migrations manually — Render does it on deploy.

---

## 2. Backend — Render

1. Push is already done (repo: `muzeebshaikz/calimuv`). Sign in at <https://render.com> with GitHub.
2. **New + → Blueprint** → select the `calimuv` repo. Render reads [`render.yaml`](../render.yaml).
3. It creates a web service **calimuv-api**. Before/after first deploy, set these env vars
   (Dashboard → the service → **Environment**):

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | the Supabase Session-pooler URI from step 1 |
   | `FIRST_ADMIN_EMAIL` | your admin email |
   | `FIRST_ADMIN_PASSWORD` | a strong password |
   | `BACKEND_CORS_ORIGINS` | leave as `http://localhost:3000` for now; update in step 4 |

   (`SECRET_KEY` is auto-generated; `ENVIRONMENT`, `DEBUG`, `PYTHON_VERSION` are preset.)
4. Deploy. On boot it runs migrations + seeds the admin, then starts.
5. Copy the service URL, e.g. `https://calimuv-api.onrender.com`.
   - Test: open `https://calimuv-api.onrender.com/health` → `{"status":"healthy"}`.

> ⚠️ Free tier **sleeps after ~15 min idle**; the first request then takes ~50s to wake.
> The frontend handles this gracefully (pages still render).

---

## 3. Frontend — Vercel

1. Sign in at <https://vercel.com> with GitHub → **Add New → Project** → import `calimuv`.
2. **Root Directory: `frontend`** (important — click Edit and select it).
3. Framework preset auto-detects **Next.js**. Leave build settings default.
4. Add **Environment Variables**:

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_API_URL` | `https://calimuv-api.onrender.com/api` (your Render URL + `/api`) |
   | `NEXT_PUBLIC_SITE_URL` | your Vercel URL (e.g. `https://calimuv.vercel.app`) |
   | `NEXT_PUBLIC_GA_ID` | optional now — see step 5 |

5. Deploy. You get a URL like `https://calimuv.vercel.app`.

---

## 4. Connect them (CORS)

1. Back in **Render → calimuv-api → Environment**, set:
   `BACKEND_CORS_ORIGINS = https://calimuv.vercel.app` (your real Vercel URL; add more comma-separated if needed).
2. Save → Render redeploys. Now the frontend can call the backend.
3. Visit your Vercel site → data loads. Log in at `/admin/login` with your `FIRST_ADMIN_*` creds.

---

## 5. Analytics — Google Analytics (GA4)

1. <https://analytics.google.com> → **Admin → Create Property** (GA4).
2. Add a **Web** data stream for your Vercel URL → copy the **Measurement ID** (`G-XXXXXXX`).
3. In **Vercel → Project → Settings → Environment Variables**, set `NEXT_PUBLIC_GA_ID = G-XXXXXXX`.
4. **Redeploy** (Deployments → ⋯ → Redeploy). GA is already wired in the code and activates automatically.

---

## 6. Get into Google Search

1. <https://search.google.com/search-console> → add your Vercel URL → verify (Vercel makes this easy).
2. **Sitemaps** → submit `sitemap.xml`.
3. **URL Inspection** → your homepage → **Request indexing**.
4. Indexing typically takes a few days to ~2 weeks.

---

## Custom domain (later)

Buy a domain → add it in **Vercel → Domains** → update DNS. Then update
`NEXT_PUBLIC_SITE_URL` and Render `BACKEND_CORS_ORIGINS` to the new domain.

## Redeploys

Both Vercel and Render **auto-redeploy on every push to `main`**. Just commit and push.
