"""FAQ routes — public read, admin write."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_optional_admin
from app.crud.faq import faq as crud
from app.db.session import get_db
from app.models.admin_user import AdminUser
from app.schemas.common import Message
from app.schemas.faq import FAQCreate, FAQRead, FAQUpdate

router = APIRouter(prefix="/faqs", tags=["faqs"])


@router.get("", response_model=list[FAQRead])
def list_faqs(
    db: Session = Depends(get_db),
    admin: AdminUser | None = Depends(get_optional_admin),
) -> list:
    return crud.get_multi(db, active_only=admin is None, limit=500)


@router.post("", response_model=FAQRead, status_code=status.HTTP_201_CREATED)
def create_faq(
    payload: FAQCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    return crud.create(db, obj_in=payload)


@router.put("/{id}", response_model=FAQRead)
def update_faq(
    id: int,
    payload: FAQUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    obj = crud.get(db, id=id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "FAQ not found")
    return crud.update(db, db_obj=obj, obj_in=payload)


@router.delete("/{id}", response_model=Message)
def delete_faq(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if crud.remove(db, id=id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "FAQ not found")
    return Message(detail="FAQ deleted")
