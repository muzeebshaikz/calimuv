"""Testimonial CRUD."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate


class CRUDTestimonial(CRUDBase[Testimonial, TestimonialCreate, TestimonialUpdate]):
    def get_transformations(
        self, db: Session, *, active_only: bool = True
    ) -> list[Testimonial]:
        stmt = select(Testimonial).where(Testimonial.is_transformation.is_(True))
        if active_only:
            stmt = stmt.where(Testimonial.is_active.is_(True))
        stmt = stmt.order_by(Testimonial.display_order, Testimonial.id)
        return list(db.execute(stmt).scalars().all())


testimonial = CRUDTestimonial(Testimonial)
