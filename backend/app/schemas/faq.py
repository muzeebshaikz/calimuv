"""FAQ schemas."""

from pydantic import BaseModel

from app.schemas.common import TimestampedRead


class FAQBase(BaseModel):
    question: str
    answer: str
    category: str | None = None
    is_active: bool = True
    display_order: int = 0


class FAQCreate(FAQBase):
    pass


class FAQUpdate(BaseModel):
    question: str | None = None
    answer: str | None = None
    category: str | None = None
    is_active: bool | None = None
    display_order: int | None = None


class FAQRead(FAQBase, TimestampedRead):
    pass
