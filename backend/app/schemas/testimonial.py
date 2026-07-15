"""Testimonial schemas (also used for Transformations)."""

from pydantic import BaseModel, Field

from app.schemas.common import TimestampedRead


class TestimonialBase(BaseModel):
    author_name: str
    author_context: str | None = None
    content: str
    rating: int | None = Field(default=None, ge=1, le=5)
    photo_url: str | None = None
    is_transformation: bool = False
    before_image_url: str | None = None
    after_image_url: str | None = None
    is_featured: bool = False
    is_active: bool = True
    display_order: int = 0


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(BaseModel):
    author_name: str | None = None
    author_context: str | None = None
    content: str | None = None
    rating: int | None = Field(default=None, ge=1, le=5)
    photo_url: str | None = None
    is_transformation: bool | None = None
    before_image_url: str | None = None
    after_image_url: str | None = None
    is_featured: bool | None = None
    is_active: bool | None = None
    display_order: int | None = None


class TestimonialRead(TestimonialBase, TimestampedRead):
    pass
