"""Authentication schemas."""

from pydantic import BaseModel, EmailStr

from app.schemas.common import ORMModel


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AdminRead(ORMModel):
    id: int
    email: EmailStr
    full_name: str | None = None
    is_active: bool
