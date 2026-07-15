"""Trainer CRUD."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.trainer import Trainer
from app.schemas.trainer import TrainerCreate, TrainerUpdate


class CRUDTrainer(CRUDBase[Trainer, TrainerCreate, TrainerUpdate]):
    def get_by_slug(self, db: Session, *, slug: str) -> Trainer | None:
        return db.execute(
            select(Trainer).where(Trainer.slug == slug)
        ).scalar_one_or_none()


trainer = CRUDTrainer(Trainer)
