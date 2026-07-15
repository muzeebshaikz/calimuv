"""Trainer schemas."""

from typing import Any

from pydantic import BaseModel

from app.schemas.common import TimestampedRead


class TrainerBase(BaseModel):
    name: str
    slug: str
    specialization: str | None = None
    bio: str | None = None
    photo_url: str | None = None
    experience_years: int | None = None
    certifications: list[str] | None = None
    social_links: dict[str, Any] | None = None
    is_active: bool = True
    display_order: int = 0


class TrainerCreate(TrainerBase):
    pass


class TrainerUpdate(BaseModel):
    name: str | None = None
    slug: str | None = None
    specialization: str | None = None
    bio: str | None = None
    photo_url: str | None = None
    experience_years: int | None = None
    certifications: list[str] | None = None
    social_links: dict[str, Any] | None = None
    is_active: bool | None = None
    display_order: int | None = None


class TrainerRead(TrainerBase, TimestampedRead):
    pass
