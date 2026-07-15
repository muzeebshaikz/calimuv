"""Gallery image model."""

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base, IntPKMixin, TimestampMixin


class GalleryImage(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "gallery"

    image_url: Mapped[str] = mapped_column(String(500), nullable=False)
    thumbnail_url: Mapped[str | None] = mapped_column(String(500))
    caption: Mapped[str | None] = mapped_column(String(300))
    category: Mapped[str | None] = mapped_column(String(80), index=True)
    cloudinary_public_id: Mapped[str | None] = mapped_column(String(255))
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
