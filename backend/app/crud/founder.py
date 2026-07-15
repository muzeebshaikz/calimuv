"""Founder CRUD."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.founder import Founder
from app.schemas.founder import FounderCreate, FounderUpdate


class CRUDFounder(CRUDBase[Founder, FounderCreate, FounderUpdate]):
    def get_singleton(self, db: Session) -> Founder | None:
        """The founder page shows one profile — return the first row."""
        return db.execute(select(Founder).order_by(Founder.id)).scalars().first()


founder = CRUDFounder(Founder)
