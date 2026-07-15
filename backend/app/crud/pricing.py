"""Pricing CRUD."""

from app.crud.base import CRUDBase
from app.models.pricing import Pricing
from app.schemas.pricing import PricingCreate, PricingUpdate

pricing = CRUDBase[Pricing, PricingCreate, PricingUpdate](Pricing)
