"""Gallery schemas."""

from datetime import datetime

from pydantic import BaseModel

from app.schemas.common import ORMModel


class GalleryBase(BaseModel):
    image_url: str
    thumbnail_url: str | None = None
    caption: str | None = None
    category: str | None = None
    cloudinary_public_id: str | None = None
    display_order: int = 0


class GalleryCreate(GalleryBase):
    pass


class GalleryUpdate(BaseModel):
    image_url: str | None = None
    thumbnail_url: str | None = None
    caption: str | None = None
    category: str | None = None
    cloudinary_public_id: str | None = None
    display_order: int | None = None


class GalleryRead(GalleryBase, ORMModel):
    id: int
    created_at: datetime
