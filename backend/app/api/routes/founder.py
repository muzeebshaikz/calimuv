"""Founder routes — public read (singleton), admin write."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.crud.founder import founder as crud
from app.db.session import get_db
from app.models.admin_user import AdminUser
from app.schemas.founder import FounderCreate, FounderRead, FounderUpdate

router = APIRouter(prefix="/founder", tags=["founder"])


@router.get("", response_model=FounderRead | None)
def get_founder(db: Session = Depends(get_db)):
    """Public: return the founder profile (or null if not set yet)."""
    return crud.get_singleton(db)


@router.post("", response_model=FounderRead, status_code=status.HTTP_201_CREATED)
def create_founder(
    payload: FounderCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    return crud.create(db, obj_in=payload)


@router.put("/{id}", response_model=FounderRead)
def update_founder(
    id: int,
    payload: FounderUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    obj = crud.get(db, id=id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Founder not found")
    return crud.update(db, db_obj=obj, obj_in=payload)
