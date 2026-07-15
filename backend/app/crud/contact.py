"""Contact message CRUD."""

from pydantic import BaseModel

from app.crud.base import CRUDBase
from app.models.contact_message import ContactMessage
from app.schemas.contact import ContactCreate


class _NoUpdate(BaseModel):
    pass


contact = CRUDBase[ContactMessage, ContactCreate, _NoUpdate](ContactMessage)
