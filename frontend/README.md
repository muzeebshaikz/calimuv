# Frontend — Calimuv

Next.js 16 (App Router) + Tailwind v4 + shadcn/ui (base-ui) + Framer Motion.
Public marketing site and a private admin dashboard.

## Setup

```bash
cd frontend
npm install
copy .env.example .env.local     # then set NEXT_PUBLIC_API_URL
npm run dev                      # http://localhost:3000
```

The backend must be running (see `../backend/README.md`). Point
`NEXT_PUBLIC_API_URL` at it (default `http://localhost:8000/api`).

## Structure

```
src/
├── app/
│   ├── (site)/           # public pages (share Navbar + Footer)
│   │   ├── page.tsx      # home
│   │   ├── about, founder, trainers/[slug], programs/[slug],
│   │   │   pricing, gallery, transformations, testimonials,
│   │   │   schedule, faq, contact, join
│   ├── admin/
│   │   ├── login/        # unguarded login
│   │   └── (panel)/      # guarded dashboard + CRUD screens
│   ├── layout.tsx        # root: theme, fonts, metadata, toaster
│   ├── sitemap.ts, robots.ts
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── layout/           # navbar, footer
│   ├── cards/            # trainer/program/pricing/testimonial cards
│   ├── admin/            # sidebar, guard, generic ResourceManager
│   └── ...
└── lib/
    ├── api.ts            # server fetchers + client auth/CRUD
    ├── types.ts          # types mirroring backend schemas
    ├── site.ts           # brand, nav, socials, contact
    └── admin-resources.ts# field configs driving the admin CRUD
```

## Key notes

- **shadcn here uses base-ui**, not Radix: components take a `render` prop
  instead of `asChild`. Use the `ButtonLink` helper for button-styled links.
- **Images**: `SmartImage` shows a branded placeholder when a photo URL is
  missing or fails to load. Add real images by setting Cloudinary URLs in the
  admin dashboard, or drop files into `public/images/...` matching the seeded
  paths. Remote hosts are allowlisted in `next.config.ts`.
- **Admin auth** is a client-side JWT guard (token in localStorage). Real
  authorization is always enforced by the backend on every write.
- **Data freshness**: public pages use ISR (`revalidate: 60`).

## Admin

Visit `/admin/login`. Credentials are the ones seeded in the backend
(`FIRST_ADMIN_EMAIL` / `FIRST_ADMIN_PASSWORD`). From the dashboard you can
manage trainers, programs, pricing, gallery, testimonials, FAQs, the founder
profile, and view contact messages.

## Build

```bash
npm run build && npm start
```
