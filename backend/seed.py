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
                    name="Mithun, Uday & Vivek",
                    title="Founders — CaliMUV",
                    bio="CaliMUV was founded by Mithun, Uday and Vivek with one goal: "
                    "make world-class calisthenics coaching accessible in North "
                    "Bangalore. From your first chin-up to advanced skills, the team "
                    "coaches every member with a personalised, minimal-equipment "
                    "approach at Spark7 Sports Arena, Yelahanka.",
                    quote="If the plan doesn't work, change the plan — but never the goal.",
                    photo_url="/images/founders/mithun.jpg",
                    years_experience=None,
                    social_links={
                        "instagram": "https://instagram.com/calimuv.minimalpower",
                    },
                    email=None,
                    phone="+91 99002 83417",
                )
            )
            print("  ✓ Founder created.")

        # --- Founders / coaching team (Trainers) ---
        if not db.query(Trainer).first():
            ig = {"instagram": "https://instagram.com/calimuv.minimalpower"}
            db.add_all(
                [
                    Trainer(
                        name="Mithun",
                        slug="mithun",
                        specialization="Founder & Head Coach",
                        bio="Co-founder of CaliMUV and head calisthenics coach. "
                        "Passionate about helping members unlock their first "
                        "pull-up and progress to advanced skills.",
                        photo_url="/images/founders/mithun.jpg",
                        social_links=ig,
                        display_order=1,
                    ),
                    Trainer(
                        name="Uday",
                        slug="uday",
                        specialization="Founder & Coach",
                        bio="Co-founder of CaliMUV. Coaches strength and skill "
                        "progressions for every level.",
                        photo_url="/images/founders/uday.jpg",
                        social_links=ig,
                        display_order=2,
                    ),
                    Trainer(
                        name="Vivek",
                        slug="vivek",
                        specialization="Founder & Coach",
                        bio="Co-founder of CaliMUV. Focused on mobility, technique, "
                        "and sustainable training.",
                        photo_url="/images/founders/vivek.jpg",
                        social_links=ig,
                        display_order=3,
                    ),
                ]
            )
            print("  ✓ Founders (trainers) created.")

        # --- Programs ---
        if not db.query(Program).first():
            db.add_all(
                [
                    Program(
                        title="Kids & Students",
                        slug="kids-and-students",
                        short_description="Build discipline & strength (age 6+).",
                        description="A structured calisthenics program for kids and "
                        "students that builds discipline, coordination, and real "
                        "strength through fun, progressive bodyweight training.",
                        level="beginner",
                        duration="Ongoing",
                        features=["Age group 6+", "Build discipline & strength", "Coach supervised"],
                        display_order=1,
                    ),
                    Program(
                        title="All Levels — Beginner to Advanced",
                        slug="all-levels",
                        short_description="From your first pull-up to advanced skills.",
                        description="Whether you're just starting out or chasing the "
                        "planche, our all-levels program meets you where you are and "
                        "progresses you safely to advanced calisthenics skills.",
                        level="all",
                        duration="Ongoing",
                        features=["Beginner to advanced", "Skill progressions", "Personalised coaching"],
                        display_order=2,
                    ),
                    Program(
                        title="Group Classes",
                        slug="group-classes",
                        short_description="Train together, grow together.",
                        description="High-energy group calisthenics classes where you "
                        "train alongside a supportive community and push each other to "
                        "level up.",
                        level="all",
                        duration="Ongoing",
                        features=["Community training", "Beginner & intermediate", "Fun & motivating"],
                        display_order=3,
                    ),
                ]
            )
            print("  ✓ Programs created.")

        # --- Pricing ---
        if not db.query(Pricing).first():
            db.add_all(
                [
                    Pricing(
                        plan_name="Group Training",
                        price=Decimal("4000.00"),
                        currency="INR",
                        billing_period="monthly",
                        description="Train with the community.",
                        features=[
                            "All group classes",
                            "Beginner to advanced",
                            "Coach guidance",
                            "Access to Spark7 Sports Arena",
                        ],
                        display_order=1,
                    ),
                    Pricing(
                        plan_name="Personal Training",
                        price=Decimal("12000.00"),
                        currency="INR",
                        billing_period="monthly",
                        description="1-on-1 coaching for the fastest results.",
                        features=[
                            "1-on-1 personal training",
                            "Fully customised program",
                            "Priority scheduling",
                            "Form & technique focus",
                        ],
                        is_featured=True,
                        display_order=2,
                    ),
                ]
            )
            print("  ✓ Pricing created.")

        # --- Testimonials (+ transformations) ---
        if not db.query(Testimonial).first():
            db.add_all(
                [
                    Testimonial(
                        author_name="CaliMUV Client",
                        author_context="First chin-up in 3 weeks",
                        content="Casually unlocked a chin-up — in just 3 weeks! "
                        "The day I do a pull-up, it's over. Thanks to the CaliMUV team.",
                        rating=5,
                        photo_url="/images/testimonials/client-1.jpg",
                        is_transformation=True,
                        after_image_url="/images/testimonials/client-1.jpg",
                        is_featured=True,
                        display_order=1,
                    ),
                ]
            )
            print("  ✓ Testimonials created.")

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
