"""Program CRUD."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.program import Program
from app.schemas.program import ProgramCreate, ProgramUpdate


class CRUDProgram(CRUDBase[Program, ProgramCreate, ProgramUpdate]):
    def get_by_slug(self, db: Session, *, slug: str) -> Program | None:
        return db.execute(
            select(Program).where(Program.slug == slug)
        ).scalar_one_or_none()


program = CRUDProgram(Program)
