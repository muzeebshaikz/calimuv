"""Testimonial routes — public read (incl. transformations), admin write."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_optional_admin
from app.crud.testimonial import testimonial as crud
from app.db.session import get_db
from app.models.admin_user import AdminUser
from app.schemas.common import Message
from app.schemas.testimonial import (
    TestimonialCreate,
    TestimonialRead,
    TestimonialUpdate,
)

router = APIRouter(prefix="/testimonials", tags=["testimonials"])


@router.get("", response_model=list[TestimonialRead])
def list_testimonials(
    db: Session = Depends(get_db),
    admin: AdminUser | None = Depends(get_optional_admin),
) -> list:
    return crud.get_multi(db, active_only=admin is None, limit=500)


@router.get("/transformations", response_model=list[TestimonialRead])
def list_transformations(db: Session = Depends(get_db)) -> list:
    """Public: testimonials flagged as transformations (before/after)."""
    return crud.get_transformations(db, active_only=True)


@router.post("", response_model=TestimonialRead, status_code=status.HTTP_201_CREATED)
def create_testimonial(
    payload: TestimonialCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    return crud.create(db, obj_in=payload)


@router.put("/{id}", response_model=TestimonialRead)
def update_testimonial(
    id: int,
    payload: TestimonialUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    obj = crud.get(db, id=id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Testimonial not found")
    return crud.update(db, db_obj=obj, obj_in=payload)


@router.delete("/{id}", response_model=Message)
def delete_testimonial(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if crud.remove(db, id=id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Testimonial not found")
    return Message(detail="Testimonial deleted")
