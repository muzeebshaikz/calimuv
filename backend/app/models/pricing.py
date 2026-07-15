"""Pricing plan model."""

from decimal import Decimal

from sqlalchemy import Boolean, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base, IntPKMixin, JSONType, TimestampMixin


class Pricing(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "pricing"

    plan_name: Mapped[str] = mapped_column(String(120), nullable=False)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(3), default="INR", nullable=False)
    billing_period: Mapped[str | None] = mapped_column(String(30))  # monthly/quarterly/yearly/one-time
    description: Mapped[str | None] = mapped_column(String(300))
    features: Mapped[list[str] | None] = mapped_column(JSONType)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
