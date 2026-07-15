# Database Design

PostgreSQL. 9 tables. Managed by SQLAlchemy models + Alembic migrations.

## Conventions (applied to every table)

- **Primary key:** `id` — integer identity (auto-incrementing). Simple and fast.
  Public URLs use human-readable **slugs**, never raw IDs.
- **Timestamps:** `created_at` and `updated_at` (UTC) on all content tables.
  `updated_at` auto-updates on every change.
- **Soft visibility:** content tables have `is_active` (bool). The admin can
  hide something from the public site without deleting it.
- **Ordering:** content tables have `display_order` (int) so the admin controls
  the sequence shown on the site (drag-to-reorder later).
- **Flexible fields:** lists (features, certifications, social links) are stored
  as `JSONB` — queryable, flexible, no extra join tables for simple lists.

---

## 1. `admin_users`
The single admin account. Table (not a constant) so the password can be rotated
and future roles added.

| Column          | Type         | Notes                                  |
|-----------------|--------------|----------------------------------------|
| id              | int PK       |                                        |
| email           | varchar, unique, not null | login identifier          |
| hashed_password | varchar, not null | bcrypt hash — never plaintext     |
| full_name       | varchar      |                                        |
| is_active       | bool, default true |                                  |
| last_login_at   | timestamptz, nullable |                               |
| created_at      | timestamptz  |                                        |
| updated_at      | timestamptz  |                                        |

---

## 2. `founder`
Founder profile. Expected to hold a single row, but modeled as a table so it's
editable from the admin dashboard like everything else.

| Column           | Type       | Notes                                   |
|------------------|------------|-----------------------------------------|
| id               | int PK     |                                         |
| name             | varchar, not null |                                  |
| title            | varchar    | e.g. "Founder & Head Coach"             |
| bio              | text       | long-form                               |
| quote            | text       | pull-quote for the page                 |
| photo_url        | varchar    | Cloudinary URL                          |
| years_experience | int        |                                         |
| social_links     | JSONB      | `{"instagram": "...", "youtube": "..."}`|
| email            | varchar    |                                         |
| phone            | varchar    |                                         |
| created_at / updated_at | timestamptz |                                 |

---

## 3. `trainers`

| Column           | Type       | Notes                                   |
|------------------|------------|-----------------------------------------|
| id               | int PK     |                                         |
| name             | varchar, not null |                                  |
| slug             | varchar, unique, not null | for `/trainers/[slug]`   |
| specialization   | varchar    | e.g. "Mobility & Handstands"            |
| bio              | text       |                                         |
| photo_url        | varchar    | Cloudinary URL                          |
| experience_years | int        |                                         |
| certifications   | JSONB      | `["NASM-CPT", "..."]`                    |
| social_links     | JSONB      |                                         |
| is_active        | bool       |                                         |
| display_order    | int        |                                         |
| created_at / updated_at | timestamptz |                                 |

---

## 4. `programs`

| Column            | Type      | Notes                                  |
|-------------------|-----------|----------------------------------------|
| id                | int PK    |                                        |
| title             | varchar, not null |                                 |
| slug              | varchar, unique, not null |                         |
| short_description | varchar   | card blurb                             |
| description       | text      | full detail                           |
| level             | varchar   | beginner / intermediate / advanced / all |
| duration          | varchar   | e.g. "8 weeks", "Ongoing"             |
| image_url         | varchar   | Cloudinary URL                        |
| features          | JSONB     | `["3 sessions/week", "..."]`           |
| is_active         | bool      |                                        |
| display_order     | int       |                                        |
| created_at / updated_at | timestamptz |                                |

---

## 5. `pricing`

| Column         | Type      | Notes                                     |
|----------------|-----------|-------------------------------------------|
| id             | int PK    |                                           |
| plan_name      | varchar, not null | e.g. "Monthly", "Quarterly"       |
| price          | numeric(10,2) | exact money — never float             |
| currency       | varchar(3) | e.g. "INR", "USD"                        |
| billing_period | varchar   | monthly / quarterly / yearly / one-time   |
| description    | varchar   | short tagline                             |
| features       | JSONB     | `["All programs", "1-on-1 review", ...]`   |
| is_featured    | bool      | highlight the "popular" plan              |
| is_active      | bool      |                                           |
| display_order  | int       |                                           |
| created_at / updated_at | timestamptz |                                  |

---

## 6. `gallery`

| Column              | Type    | Notes                                 |
|---------------------|---------|---------------------------------------|
| id                  | int PK  |                                       |
| image_url           | varchar, not null | full-size Cloudinary URL     |
| thumbnail_url       | varchar | optimized smaller version             |
| caption             | varchar |                                       |
| category            | varchar | e.g. "events", "training", "facility" |
| cloudinary_public_id| varchar | needed to delete from Cloudinary      |
| display_order       | int     |                                       |
| created_at          | timestamptz |                                   |

---

## 7. `testimonials`
Also powers the **Transformations** page (see design note below).

| Column           | Type      | Notes                                  |
|------------------|-----------|----------------------------------------|
| id               | int PK    |                                        |
| author_name      | varchar, not null |                                 |
| author_context   | varchar   | e.g. "Lost 12kg in 6 months"           |
| content          | text, not null | the quote                         |
| rating           | int       | 1–5, nullable                          |
| photo_url        | varchar   | author photo                           |
| is_transformation| bool      | show on Transformations page           |
| before_image_url | varchar   | for transformations                    |
| after_image_url  | varchar   | for transformations                    |
| is_featured      | bool      | show on home page                      |
| is_active        | bool      |                                        |
| display_order    | int       |                                        |
| created_at / updated_at | timestamptz |                                |

---

## 8. `faqs`

| Column        | Type    | Notes                        |
|---------------|---------|------------------------------|
| id            | int PK  |                              |
| question      | varchar, not null |                    |
| answer        | text, not null |                       |
| category      | varchar | group FAQs into sections     |
| is_active     | bool    |                              |
| display_order | int     |                              |
| created_at / updated_at | timestamptz |          |

---

## 9. `contact_messages`
Submissions from the public contact form. Write-only for the public
(`POST /contact`); read/manage for the admin.

| Column     | Type      | Notes                          |
|------------|-----------|--------------------------------|
| id         | int PK    |                                |
| name       | varchar, not null |                         |
| email      | varchar, not null |                         |
| phone      | varchar   | optional                       |
| subject    | varchar   | optional                       |
| message    | text, not null |                            |
| is_read    | bool, default false | admin inbox status     |
| created_at | timestamptz |                              |

---

## Design notes / decisions to confirm

1. **Transformations page** is not a separate table (the spec lists 9 tables and
   doesn't include one). It's driven by `testimonials.is_transformation = true`
   with before/after images. A transformation usually comes with a quote anyway,
   so this fits naturally. *Alternative:* a `gallery` category. My pick:
   testimonials.

2. **Schedule page** has no table in the spec. For launch it can be **static
   content** (a weekly class timetable rendered in the frontend). If you later
   want the admin to edit it, we add a `schedule` table then. My pick: static
   for now, since class times rarely change.

3. **Money** uses `numeric(10,2)`, never floating point, to avoid rounding bugs.

4. **Future-proofing:** this schema cleanly extends to booking/payments/
   attendance later (new tables: `members`, `bookings`, `payments`,
   `attendance`) without touching existing tables.
