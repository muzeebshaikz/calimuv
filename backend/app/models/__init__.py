"""Import all models here so SQLAlchemy's metadata (and Alembic autogenerate)
can discover every table.
"""

from app.db.base_class import Base
from app.models.admin_user import AdminUser
from app.models.contact_message import ContactMessage
from app.models.faq import FAQ
from app.models.founder import Founder
from app.models.gallery import GalleryImage
from app.models.pricing import Pricing
from app.models.program import Program
from app.models.testimonial import Testimonial
from app.models.trainer import Trainer

__all__ = [
    "Base",
    "AdminUser",
    "ContactMessage",
    "FAQ",
    "Founder",
    "GalleryImage",
    "Pricing",
    "Program",
    "Testimonial",
    "Trainer",
]
