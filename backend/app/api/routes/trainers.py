"""Trainer routes — public read, admin write."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_optional_admin
from app.crud.trainer import trainer as crud
from app.db.session import get_db
from app.models.admin_user import AdminUser
from app.schemas.common import Message
from app.schemas.trainer import TrainerCreate, TrainerRead, TrainerUpdate

router = APIRouter(prefix="/trainers", tags=["trainers"])


@router.get("", response_model=list[TrainerRead])
def list_trainers(
    db: Session = Depends(get_db),
    admin: AdminUser | None = Depends(get_optional_admin),
) -> list:
    # Public sees active only; an authenticated admin sees everything.
    return crud.get_multi(db, active_only=admin is None, limit=500)


@router.get("/{slug}", response_model=TrainerRead)
def get_trainer(slug: str, db: Session = Depends(get_db)):
    obj = crud.get_by_slug(db, slug=slug)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Trainer not found")
    return obj


@router.post("", response_model=TrainerRead, status_code=status.HTTP_201_CREATED)
def create_trainer(
    payload: TrainerCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if crud.get_by_slug(db, slug=payload.slug):
        raise HTTPException(status.HTTP_409_CONFLICT, "Slug already exists")
    return crud.create(db, obj_in=payload)


@router.put("/{id}", response_model=TrainerRead)
def update_trainer(
    id: int,
    payload: TrainerUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    obj = crud.get(db, id=id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Trainer not found")
    return crud.update(db, db_obj=obj, obj_in=payload)


@router.delete("/{id}", response_model=Message)
def delete_trainer(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if crud.remove(db, id=id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Trainer not found")
    return Message(detail="Trainer deleted")
