"""Shared schema building blocks."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ORMModel(BaseModel):
    """Base for response schemas that read from ORM objects."""

    model_config = ConfigDict(from_attributes=True)


class TimestampedRead(ORMModel):
    id: int
    created_at: datetime
    updated_at: datetime


class Message(BaseModel):
    """Generic message response, e.g. for deletes/logout."""

    detail: str
