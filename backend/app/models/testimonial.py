"""Testimonial model — also powers the Transformations page."""

from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base, IntPKMixin, TimestampMixin


class Testimonial(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "testimonials"

    author_name: Mapped[str] = mapped_column(String(150), nullable=False)
    author_context: Mapped[str | None] = mapped_column(String(200))
    content: Mapped[str] = mapped_column(Text, nullable=False)
    rating: Mapped[int | None] = mapped_column(Integer)  # 1-5
    photo_url: Mapped[str | None] = mapped_column(String(500))

    # Transformations page fields:
    is_transformation: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    before_image_url: Mapped[str | None] = mapped_column(String(500))
    after_image_url: Mapped[str | None] = mapped_column(String(500))

    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
