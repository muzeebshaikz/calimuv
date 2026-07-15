"""Founder schemas."""

from typing import Any

from pydantic import BaseModel

from app.schemas.common import TimestampedRead


class FounderBase(BaseModel):
    name: str
    title: str | None = None
    bio: str | None = None
    quote: str | None = None
    photo_url: str | None = None
    years_experience: int | None = None
    social_links: dict[str, Any] | None = None
    email: str | None = None
    phone: str | None = None


class FounderCreate(FounderBase):
    pass


class FounderUpdate(BaseModel):
    name: str | None = None
    title: str | None = None
    bio: str | None = None
    quote: str | None = None
    photo_url: str | None = None
    years_experience: int | None = None
    social_links: dict[str, Any] | None = None
    email: str | None = None
    phone: str | None = None


class FounderRead(FounderBase, TimestampedRead):
    pass
