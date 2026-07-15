"""Aggregate every route module into a single API router."""

from fastapi import APIRouter

from app.api.routes import (
    auth,
    contact,
    faqs,
    founder,
    gallery,
    home,
    pricing,
    programs,
    testimonials,
    trainers,
)

api_router = APIRouter()
api_router.include_router(home.router)
api_router.include_router(auth.router)
api_router.include_router(founder.router)
api_router.include_router(trainers.router)
api_router.include_router(programs.router)
api_router.include_router(pricing.router)
api_router.include_router(gallery.router)
api_router.include_router(testimonials.router)
api_router.include_router(faqs.router)
api_router.include_router(contact.router)
