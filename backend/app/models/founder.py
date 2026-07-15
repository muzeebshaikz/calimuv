"""Founder profile model (expected to hold a single row)."""

from typing import Any

from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base, IntPKMixin, JSONType, TimestampMixin


class Founder(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "founder"

    name: Mapped[str] = mapped_column(String(150), nullable=False)
    title: Mapped[str | None] = mapped_column(String(150))
    bio: Mapped[str | None] = mapped_column(Text)
    quote: Mapped[str | None] = mapped_column(Text)
    photo_url: Mapped[str | None] = mapped_column(String(500))
    years_experience: Mapped[int | None] = mapped_column(Integer)
    social_links: Mapped[dict[str, Any] | None] = mapped_column(JSONType)
    email: Mapped[str | None] = mapped_column(String(255))
    phone: Mapped[str | None] = mapped_column(String(50))
