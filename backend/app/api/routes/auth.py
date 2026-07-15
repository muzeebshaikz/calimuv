"""Authentication routes: login, logout, current admin."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.security import create_access_token
from app.crud.admin_user import admin_user as admin_crud
from app.db.session import get_db
from app.models.admin_user import AdminUser
from app.schemas.auth import AdminRead, LoginRequest, Token
from app.schemas.common import Message

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> Token:
    """Exchange email + password for a JWT access token."""
    user = admin_crud.authenticate(
        db, email=payload.email, password=payload.password
    )
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    admin_crud.touch_last_login(db, user=user)
    token = create_access_token(subject=user.id)
    return Token(access_token=token)


@router.post("/logout", response_model=Message)
def logout(_: AdminUser = Depends(get_current_admin)) -> Message:
    """Stateless JWT logout — the client discards the token.

    Provided for API completeness and future token-blacklist support.
    """
    return Message(detail="Logged out successfully")


@router.get("/me", response_model=AdminRead)
def read_me(current_admin: AdminUser = Depends(get_current_admin)) -> AdminUser:
    """Return the currently authenticated admin (used by the dashboard)."""
    return current_admin
