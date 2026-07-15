"""Gallery routes — public read, admin write."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.crud.gallery import gallery as crud
from app.db.session import get_db
from app.models.admin_user import AdminUser
from app.schemas.common import Message
from app.schemas.gallery import GalleryCreate, GalleryRead, GalleryUpdate

router = APIRouter(prefix="/gallery", tags=["gallery"])


@router.get("", response_model=list[GalleryRead])
def list_gallery(
    category: str | None = None,
    db: Session = Depends(get_db),
) -> list:
    items = crud.get_multi(db, limit=1000)
    if category:
        items = [i for i in items if i.category == category]
    return items


@router.post("", response_model=GalleryRead, status_code=status.HTTP_201_CREATED)
def create_gallery(
    payload: GalleryCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    return crud.create(db, obj_in=payload)


@router.put("/{id}", response_model=GalleryRead)
def update_gallery(
    id: int,
    payload: GalleryUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    obj = crud.get(db, id=id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Image not found")
    return crud.update(db, db_obj=obj, obj_in=payload)


@router.delete("/{id}", response_model=Message)
def delete_gallery(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if crud.remove(db, id=id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Image not found")
    return Message(detail="Image deleted")
