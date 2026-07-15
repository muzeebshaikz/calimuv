"""Home route — aggregates the data the landing page needs in one request."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud.founder import founder as founder_crud
from app.crud.pricing import pricing as pricing_crud
from app.crud.program import program as program_crud
from app.crud.testimonial import testimonial as testimonial_crud
from app.crud.trainer import trainer as trainer_crud
from app.db.session import get_db
from app.schemas.founder import FounderRead
from app.schemas.pricing import PricingRead
from app.schemas.program import ProgramRead
from app.schemas.testimonial import TestimonialRead
from app.schemas.trainer import TrainerRead

router = APIRouter(prefix="/home", tags=["home"])


@router.get("")
def get_home(db: Session = Depends(get_db)) -> dict:
    """One call returns everything the homepage renders (fewer round-trips)."""
    trainers = trainer_crud.get_multi(db, active_only=True, limit=8)
    programs = program_crud.get_multi(db, active_only=True, limit=6)
    plans = pricing_crud.get_multi(db, active_only=True, limit=10)
    all_testimonials = testimonial_crud.get_multi(db, active_only=True, limit=50)
    featured = [t for t in all_testimonials if t.is_featured] or all_testimonials[:3]
    founder = founder_crud.get_singleton(db)

    return {
        "founder": FounderRead.model_validate(founder) if founder else None,
        "trainers": [TrainerRead.model_validate(t) for t in trainers],
        "programs": [ProgramRead.model_validate(p) for p in programs],
        "pricing": [PricingRead.model_validate(p) for p in plans],
        "testimonials": [TestimonialRead.model_validate(t) for t in featured],
    }
