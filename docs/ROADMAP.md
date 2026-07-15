# Development Roadmap

Built step by step. `[x]` done · `[~]` in progress · `[ ]` pending.

| # | Step | Status |
|---|------|--------|
| 1 | Project setup (git, root config) | [x] |
| 2 | Folder structure (monorepo) | [x] |
| 3 | Database design (schema, models, Alembic) | [x] |
| 4 | Backend APIs (FastAPI public endpoints) | [x] |
| 5 | Authentication (JWT single admin) | [x] |
| 6 | Frontend UI (Next.js pages) | [x] |
| 7 | Connect frontend ↔ backend | [x] |
| 8 | Admin dashboard | [x] |
| 9 | Image uploads | [ ] |
| 10 | Deployment (Vercel + Render) | [ ] |
| 11 | SEO (metadata, sitemap, robots.txt) | [x] |
| 12 | Testing | [ ] |
| 13 | Production optimization | [ ] |

## Key decisions

- **Local dev DB:** PostgreSQL installed natively via `winget` (WSL/Docker
  unavailable on this machine). Real Postgres = full parity with Supabase.
- **Cloud accounts (Supabase, Cloudinary):** set up at deployment (Step 9–10).
- **Primary keys:** integer identity columns; public URLs use slugs, not IDs.

## Future (post-launch)

Online booking · Payments · Attendance tracking · AI-powered features.
The schema and architecture are designed to accommodate these without rewrites.
