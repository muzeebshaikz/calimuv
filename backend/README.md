# Backend — Calimuv API

FastAPI + SQLAlchemy + Alembic. Public read endpoints, JWT-protected admin CRUD.

## Architecture

```
app/
├── core/       # config (env vars), security (JWT + bcrypt), logging
├── db/         # engine/session, declarative base + portable JSON type
├── models/     # SQLAlchemy ORM models (9 tables)
├── schemas/    # Pydantic request/response models
├── crud/       # reusable DB operations (generic CRUDBase + per-resource)
└── api/
    ├── deps.py         # auth guards (get_current_admin / get_optional_admin)
    ├── router.py       # aggregates all routes
    └── routes/         # one module per resource
```

Request flow: **route** → validate with **schema** → call **crud** → **model** → response schema.

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate                       # Windows (PowerShell: .venv\Scripts\Activate.ps1)
pip install --only-binary=:all: -r requirements.txt
copy .env.example .env                        # then edit values
```

> `--only-binary=:all:` forces prebuilt wheels — required on Python 3.14 and
> behind corporate SSL proxies (avoids Rust/C source builds).

## Database

Local dev uses **SQLite** (`calimuv.db`, no install). Production uses
**Supabase PostgreSQL** — just change `DATABASE_URL` in `.env`.

```bash
alembic upgrade head        # create/upgrade schema from migrations
python seed.py              # create admin + placeholder content (idempotent)
```

To change the schema: edit a model, then:
```bash
alembic revision --autogenerate -m "describe change"
alembic upgrade head
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

- API docs (Swagger): http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Endpoints

| Method | Path | Access |
|--------|------|--------|
| GET | `/api/home` | public (aggregated) |
| GET | `/api/founder` | public |
| GET | `/api/trainers`, `/api/trainers/{slug}` | public |
| GET | `/api/programs`, `/api/programs/{slug}` | public |
| GET | `/api/pricing` | public |
| GET | `/api/gallery` | public |
| GET | `/api/testimonials`, `/api/testimonials/transformations` | public |
| GET | `/api/faqs` | public |
| POST | `/api/contact` | public (submit) |
| POST | `/api/auth/login`, `/logout`, GET `/auth/me` | auth |
| POST/PUT/DELETE | trainers, programs, pricing, gallery, testimonials, faqs, founder | **admin only** |
| GET/PUT/DELETE | `/api/contact` (inbox) | **admin only** |

All mutations require `Authorization: Bearer <token>`. Public users can only read.

## Default admin (change in production!)

Set via `.env` (`FIRST_ADMIN_EMAIL` / `FIRST_ADMIN_PASSWORD`) before running `seed.py`.
