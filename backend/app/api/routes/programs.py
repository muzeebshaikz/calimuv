"""Program routes — public read, admin write."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_optional_admin
from app.crud.program import program as crud
from app.db.session import get_db
from app.models.admin_user import AdminUser
from app.schemas.common import Message
from app.schemas.program import ProgramCreate, ProgramRead, ProgramUpdate

router = APIRouter(prefix="/programs", tags=["programs"])


@router.get("", response_model=list[ProgramRead])
def list_programs(
    db: Session = Depends(get_db),
    admin: AdminUser | None = Depends(get_optional_admin),
) -> list:
    return crud.get_multi(db, active_only=admin is None, limit=500)


@router.get("/{slug}", response_model=ProgramRead)
def get_program(slug: str, db: Session = Depends(get_db)):
    obj = crud.get_by_slug(db, slug=slug)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Program not found")
    return obj


@router.post("", response_model=ProgramRead, status_code=status.HTTP_201_CREATED)
def create_program(
    payload: ProgramCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if crud.get_by_slug(db, slug=payload.slug):
        raise HTTPException(status.HTTP_409_CONFLICT, "Slug already exists")
    return crud.create(db, obj_in=payload)


@router.put("/{id}", response_model=ProgramRead)
def update_program(
    id: int,
    payload: ProgramUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    obj = crud.get(db, id=id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Program not found")
    return crud.update(db, db_obj=obj, obj_in=payload)


@router.delete("/{id}", response_model=Message)
def delete_program(
    id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(get_current_admin),
):
    if crud.remove(db, id=id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Program not found")
    return Message(detail="Program deleted")
