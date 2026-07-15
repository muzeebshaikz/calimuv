"""Shared API dependencies (auth guard for admin-only routes)."""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import decode_access_token
from app.crud.admin_user import admin_user as admin_crud
from app.db.session import get_db
from app.models.admin_user import AdminUser

# tokenUrl is where Swagger UI's "Authorize" button sends credentials.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_PREFIX}/auth/login")
# Optional variant: does not error when no token is present (for public routes
# that reveal extra data to an authenticated admin).
oauth2_scheme_optional = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_PREFIX}/auth/login", auto_error=False
)


def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> AdminUser:
    """Validate the JWT and return the admin. Raises 401 if invalid.

    Every mutating (POST/PUT/DELETE) route depends on this, which is how we
    guarantee visitors can only read data.
    """
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = decode_access_token(token)
    if payload is None:
        raise credentials_error

    subject = payload.get("sub")
    if subject is None:
        raise credentials_error

    user = admin_crud.get(db, id=int(subject))
    if user is None or not user.is_active:
        raise credentials_error

    return user


def get_optional_admin(
    token: str | None = Depends(oauth2_scheme_optional),
    db: Session = Depends(get_db),
) -> AdminUser | None:
    """Return the admin if a valid token is present, else None (no error).

    Lets public list endpoints show inactive items only to a logged-in admin.
    """
    if not token:
        return None
    payload = decode_access_token(token)
    if payload is None or payload.get("sub") is None:
        return None
    user = admin_crud.get(db, id=int(payload["sub"]))
    if user is None or not user.is_active:
        return None
    return user
