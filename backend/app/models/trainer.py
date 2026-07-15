"""Trainer profile model."""

from typing import Any

from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base, IntPKMixin, JSONType, TimestampMixin


class Trainer(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "trainers"

    name: Mapped[str] = mapped_column(String(150), nullable=False)
    slug: Mapped[str] = mapped_column(String(180), unique=True, index=True, nullable=False)
    specialization: Mapped[str | None] = mapped_column(String(200))
    bio: Mapped[str | None] = mapped_column(Text)
    photo_url: Mapped[str | None] = mapped_column(String(500))
    experience_years: Mapped[int | None] = mapped_column(Integer)
    certifications: Mapped[list[str] | None] = mapped_column(JSONType)
    social_links: Mapped[dict[str, Any] | None] = mapped_column(JSONType)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
