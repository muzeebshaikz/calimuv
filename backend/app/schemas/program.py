"""Program schemas."""

from pydantic import BaseModel

from app.schemas.common import TimestampedRead


class ProgramBase(BaseModel):
    title: str
    slug: str
    short_description: str | None = None
    description: str | None = None
    level: str | None = None
    duration: str | None = None
    image_url: str | None = None
    features: list[str] | None = None
    is_active: bool = True
    display_order: int = 0


class ProgramCreate(ProgramBase):
    pass


class ProgramUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    short_description: str | None = None
    description: str | None = None
    level: str | None = None
    duration: str | None = None
    image_url: str | None = None
    features: list[str] | None = None
    is_active: bool | None = None
    display_order: int | None = None


class ProgramRead(ProgramBase, TimestampedRead):
    pass
