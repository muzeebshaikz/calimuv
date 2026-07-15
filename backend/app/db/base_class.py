"""Declarative base, shared mixins, and a portable JSON column type.

Everything model-related builds on top of this module.
"""

from datetime import datetime

from sqlalchemy import DateTime, Integer, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.types import JSON


class Base(DeclarativeBase):
    """Base class for all ORM models."""


# JSONB on PostgreSQL (indexable, efficient); plain JSON on SQLite for local dev.
# Using this variant means the same model code runs on both databases.
JSONType = JSON().with_variant(JSONB, "postgresql")


class TimestampMixin:
    """Adds auto-managed created_at / updated_at to a model."""

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class IntPKMixin:
    """Adds an auto-incrementing integer primary key."""

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
