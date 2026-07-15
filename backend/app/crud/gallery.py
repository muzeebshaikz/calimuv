"""Gallery CRUD."""

from app.crud.base import CRUDBase
from app.models.gallery import GalleryImage
from app.schemas.gallery import GalleryCreate, GalleryUpdate

gallery = CRUDBase[GalleryImage, GalleryCreate, GalleryUpdate](GalleryImage)
