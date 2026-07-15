"""Pricing schemas."""

from decimal import Decimal

from pydantic import BaseModel

from app.schemas.common import TimestampedRead


class PricingBase(BaseModel):
    plan_name: str
    price: Decimal
    currency: str = "INR"
    billing_period: str | None = None
    description: str | None = None
    features: list[str] | None = None
    is_featured: bool = False
    is_active: bool = True
    display_order: int = 0


class PricingCreate(PricingBase):
    pass


class PricingUpdate(BaseModel):
    plan_name: str | None = None
    price: Decimal | None = None
    currency: str | None = None
    billing_period: str | None = None
    description: str | None = None
    features: list[str] | None = None
    is_featured: bool | None = None
    is_active: bool | None = None
    display_order: int | None = None


class PricingRead(PricingBase, TimestampedRead):
    pass
