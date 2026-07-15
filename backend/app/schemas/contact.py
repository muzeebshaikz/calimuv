"""Contact message schemas."""

from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

from app.schemas.common import ORMModel


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=50)
    subject: str | None = Field(default=None, max_length=200)
    message: str = Field(min_length=1)


class ContactRead(ORMModel):
    id: int
    name: str
    email: EmailStr
    phone: str | None = None
    subject: str | None = None
    message: str
    is_read: bool
    created_at: datetime
