"""Contact routes — public submit, admin read/manage."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.crud.contact import contact as crud
from app.db.session import get_db
from app.models.admin_user import AdminUser
from app.schemas.common import Message
from app.schemas.contact import ContactCreate, ContactRead

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=Message, status_code=status.HTTP_201_CREATED)
def submit_contact(payload: ContactCreate, db: Session = Depends(get_db)) -> Message:
    """Public: submit a contact-form message."""
    crud.create(db, obj_in=payload)
    return Message(detail="Thanks for reaching out — we'll get back to you soon.")


@router.get("", response_model=list[ContactRead])
def list_messages(
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
) -> list:
    """Admin: view submitted messages (newest first)."""
    from app.models.contact_message import ContactMessage

    return crud.get_multi(
        db, limit=1000, order_by=ContactMessage.created_at.desc()
    )


@router.put("/{id}/read", response_model=ContactRead)
def mark_read(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    """Admin: mark a message as read."""
    obj = crud.get(db, id=id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Message not found")
    obj.is_read = True
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{id}", response_model=Message)
def delete_message(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if crud.remove(db, id=id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Message not found")
    return Message(detail="Message deleted")
