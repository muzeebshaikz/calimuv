"""CRUD + authentication for the admin user."""

from datetime import datetime, timezone

from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import verify_password
from app.crud.base import CRUDBase
from app.models.admin_user import AdminUser


class _Noop(BaseModel):
    pass


class CRUDAdminUser(CRUDBase[AdminUser, _Noop, _Noop]):
    def get_by_email(self, db: Session, *, email: str) -> AdminUser | None:
        stmt = select(AdminUser).where(AdminUser.email == email)
        return db.execute(stmt).scalar_one_or_none()

    def authenticate(
        self, db: Session, *, email: str, password: str
    ) -> AdminUser | None:
        user = self.get_by_email(db, email=email)
        if not user or not user.is_active:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def touch_last_login(self, db: Session, *, user: AdminUser) -> None:
        user.last_login_at = datetime.now(timezone.utc)
        db.add(user)
        db.commit()


admin_user = CRUDAdminUser(AdminUser)
