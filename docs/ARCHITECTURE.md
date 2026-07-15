# Architecture Overview

## High-level

```
┌─────────────┐      HTTPS/JSON      ┌──────────────┐      SQL      ┌────────────┐
│  Next.js    │ ───────────────────► │   FastAPI    │ ────────────► │  Supabase  │
│  (Vercel)   │ ◄─────────────────── │   (Render)   │ ◄──────────── │ PostgreSQL │
└─────────────┘                      └──────────────┘               └────────────┘
      │                                     │
      │ public pages: SSR/ISR read data     │ JWT-protected admin routes
      │ admin pages: authenticated writes    │ Cloudinary for image assets
      ▼                                     ▼
   Visitors (read-only)              Admin (full CRUD)
```

## Key principles

- **Read/write separation.** Public visitors can only `GET`. All mutations
  (`POST`/`PUT`/`DELETE`) require a valid admin JWT. Enforced at the backend —
  the frontend never decides authorization.
- **Single source of truth.** All content lives in Postgres, edited only via the
  admin dashboard. No hardcoded content in the frontend.
- **Stateless backend.** JWT auth means Render's free tier can restart/sleep
  without losing sessions.
- **Environment-driven config.** No secrets in code. Each environment
  (local, production) supplies its own `.env`.

## Backend layering (clean architecture)

```
backend/app/
├── api/          # route handlers (thin — parse, delegate, respond)
├── core/         # config, security (JWT), logging
├── models/       # SQLAlchemy ORM models
├── schemas/      # Pydantic request/response models
├── crud/         # database operations (reusable, testable)
└── db/           # session, base, dependencies
```

Request flow: `api` → validates with `schemas` → calls `crud` → uses `models` → returns `schemas`.

## Data model (9 tables)

`admin_users` · `founder` · `trainers` · `programs` · `pricing` ·
`gallery` · `testimonials` · `faqs` · `contact_messages`

Detailed in [`docs/DATABASE.md`](DATABASE.md) (created in Step 3).
