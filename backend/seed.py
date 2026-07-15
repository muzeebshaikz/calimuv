"""Seed the database with the first admin account and placeholder content.

Run:  python seed.py
Idempotent — running it again won't create duplicates.

Image fields use local placeholder paths under the frontend's /public folder.
Replace them with real Cloudinary URLs (Step 9) or drop files into
frontend/public/images/ with matching names.
"""

import sys
from decimal import Decimal

# Windows consoles default to cp1252; force UTF-8 so status glyphs print.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from app.core.config import settings
from app.core.security import hash_password
from app.db.base_class import Base
from app.db.session import SessionLocal, engine
from app.models.admin_user import AdminUser
from app.models.contact_message import ContactMessage  # noqa: F401 (register)
from app.models.faq import FAQ
from app.models.founder import Founder
from app.models.gallery import GalleryImage
from app.models.pricing import Pricing
from app.models.program import Program
from app.models.testimonial import Testimonial
from app.models.trainer import Trainer


def seed() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # --- Admin ---
        if not db.query(AdminUser).first():
            db.add(
                AdminUser(
                    email=settings.FIRST_ADMIN_EMAIL,
                    hashed_password=hash_password(settings.FIRST_ADMIN_PASSWORD),
                    full_name=settings.FIRST_ADMIN_NAME,
                    is_active=True,
                )
            )
            print(f"  ✓ Admin created: {settings.FIRST_ADMIN_EMAIL}")
        else:
            print("  • Admin already exists — skipped.")

        # --- Founder ---
        if not db.query(Founder).first():
            db.add(
                Founder(
                    name="Founder Name",  # TODO: replace
                    title="Founder & Head Coach",
                    bio="Placeholder founder bio. Share the story of how Calimuv "
                    "started and the mission behind it.",
                    quote="Strength is earned, not given.",
                    photo_url="/images/founder.jpg",  # TODO: add image
                    years_experience=10,
                    social_links={
                        "instagram": "https://instagram.com/",
                        "youtube": "https://youtube.com/",
                    },
                    email="founder@calimuv.com",
                    phone="+91 00000 00000",
                )
            )
            print("  ✓ Founder placeholder created.")

        # --- Trainers ---
        if not db.query(Trainer).first():
            db.add_all(
                [
                    Trainer(
                        name="Trainer One",
                        slug="trainer-one",
                        specialization="Handstands & Balance",
                        bio="Placeholder trainer bio.",
                        photo_url="/images/trainers/trainer-one.jpg",
                        experience_years=6,
                        certifications=["Certified Calisthenics Coach"],
                        social_links={"instagram": "https://instagram.com/"},
                        display_order=1,
                    ),
                    Trainer(
                        name="Trainer Two",
                        slug="trainer-two",
                        specialization="Strength & Mobility",
                        bio="Placeholder trainer bio.",
                        photo_url="/images/trainers/trainer-two.jpg",
                        experience_years=4,
                        certifications=["NASM-CPT"],
                        social_links={"instagram": "https://instagram.com/"},
                        display_order=2,
                    ),
                ]
            )
            print("  ✓ Trainers placeholders created.")

        # --- Programs ---
        if not db.query(Program).first():
            db.add_all(
                [
                    Program(
                        title="Beginner Foundations",
                        slug="beginner-foundations",
                        short_description="Build your base with fundamental movements.",
                        description="Placeholder program description.",
                        level="beginner",
                        duration="8 weeks",
                        image_url="/images/programs/beginner.jpg",
                        features=["3 sessions/week", "Form coaching", "Mobility work"],
                        display_order=1,
                    ),
                    Program(
                        title="Advanced Skills",
                        slug="advanced-skills",
                        short_description="Master planche, levers and more.",
                        description="Placeholder program description.",
                        level="advanced",
                        duration="12 weeks",
                        image_url="/images/programs/advanced.jpg",
                        features=["4 sessions/week", "Skill progressions", "1-on-1 review"],
                        display_order=2,
                    ),
                ]
            )
            print("  ✓ Programs placeholders created.")

        # --- Pricing ---
        if not db.query(Pricing).first():
            db.add_all(
                [
                    Pricing(
                        plan_name="Monthly",
                        price=Decimal("2000.00"),
                        currency="INR",
                        billing_period="monthly",
                        description="Great to get started.",
                        features=["All group classes", "App access"],
                        display_order=1,
                    ),
                    Pricing(
                        plan_name="Quarterly",
                        price=Decimal("5000.00"),
                        currency="INR",
                        billing_period="quarterly",
                        description="Best value — most popular.",
                        features=["All group classes", "App access", "Monthly assessment"],
                        is_featured=True,
                        display_order=2,
                    ),
                    Pricing(
                        plan_name="Yearly",
                        price=Decimal("18000.00"),
                        currency="INR",
                        billing_period="yearly",
                        description="Commit and save the most.",
                        features=["Everything in Quarterly", "1-on-1 sessions", "Nutrition guide"],
                        display_order=3,
                    ),
                ]
            )
            print("  ✓ Pricing placeholders created.")

        # --- Gallery ---
        if not db.query(GalleryImage).first():
            db.add_all(
                [
                    GalleryImage(
                        image_url=f"/images/gallery/photo-{i}.jpg",
                        caption=f"Placeholder photo {i}",
                        category="training",
                        display_order=i,
                    )
                    for i in range(1, 7)
                ]
            )
            print("  ✓ Gallery placeholders created.")

        # --- Testimonials (+ transformations) ---
        if not db.query(Testimonial).first():
            db.add_all(
                [
                    Testimonial(
                        author_name="Happy Member",
                        author_context="Member for 1 year",
                        content="Placeholder testimonial — Calimuv changed my life!",
                        rating=5,
                        photo_url="/images/testimonials/member-1.jpg",
                        is_featured=True,
                        display_order=1,
                    ),
                    Testimonial(
                        author_name="Transformed Member",
                        author_context="Lost 12kg in 6 months",
                        content="Placeholder transformation story.",
                        rating=5,
                        is_transformation=True,
                        before_image_url="/images/transformations/before-1.jpg",
                        after_image_url="/images/transformations/after-1.jpg",
                        display_order=1,
                    ),
                ]
            )
            print("  ✓ Testimonials placeholders created.")

        # --- FAQs ---
        if not db.query(FAQ).first():
            db.add_all(
                [
                    FAQ(
                        question="Do I need prior experience?",
                        answer="No — we have programs for every level, including complete beginners.",
                        category="General",
                        display_order=1,
                    ),
                    FAQ(
                        question="What should I bring?",
                        answer="Comfortable clothing, water, and a towel. We provide all equipment.",
                        category="General",
                        display_order=2,
                    ),
                ]
            )
            print("  ✓ FAQs placeholders created.")

        db.commit()
        print("\nSeed complete. ✅")
        print(f"Login → email: {settings.FIRST_ADMIN_EMAIL}  password: (from .env)")
    finally:
        db.close()


if __name__ == "__main__":
    print("Seeding Calimuv database...")
    seed()
