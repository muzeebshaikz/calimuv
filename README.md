# Calimuv — Calisthenics Training Institute

Production-ready website for **Calimuv**, a calisthenics training institute:
a public marketing site plus a private admin dashboard for managing all content.

## Tech Stack

| Layer            | Technology                                   |
|------------------|----------------------------------------------|
| Frontend         | Next.js (App Router), Tailwind CSS, shadcn/ui, Lucide, Framer Motion |
| Backend          | FastAPI (Python), Pydantic                   |
| Database         | Supabase PostgreSQL                          |
| ORM / Migrations | SQLAlchemy + Alembic                         |
| Auth             | JWT (single admin account)                   |
| Image Storage    | Cloudinary or Supabase Storage               |
| Hosting          | Vercel (frontend) · Render (backend)         |
| Analytics / SEO  | Google Analytics · Next.js Metadata, sitemap, robots.txt |

## Monorepo Layout

```
calimuv/
├── frontend/    # Next.js app (public site + admin dashboard)
├── backend/     # FastAPI app (REST API, auth, business logic)
├── database/    # SQL schema, seed data, ERD notes
└── docs/        # Architecture, decisions, setup guides
```

## Getting Started

Each sub-project has its own README with setup instructions:

- Frontend → [`frontend/README.md`](frontend/README.md)
- Backend  → [`backend/README.md`](backend/README.md)

## Status

🚧 **In active development.** See [`docs/ROADMAP.md`](docs/ROADMAP.md) for progress.
