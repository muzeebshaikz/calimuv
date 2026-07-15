"""Application configuration.

All settings are loaded from environment variables (or a local `.env` file)
via pydantic-settings. This keeps secrets out of the codebase and lets each
environment (local, production) supply its own values.
"""

from functools import lru_cache
from typing import Annotated

from pydantic import field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # --- Application ---
    PROJECT_NAME: str = "Calimuv API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_PREFIX: str = "/api"

    # --- Database ---
    DATABASE_URL: str = "sqlite:///./calimuv.db"

    # --- Security / JWT ---
    SECRET_KEY: str = "change-me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    ALGORITHM: str = "HS256"

    # --- First admin (seed) ---
    FIRST_ADMIN_EMAIL: str = "admin@calimuv.com"
    FIRST_ADMIN_PASSWORD: str = "ChangeMe123!"
    FIRST_ADMIN_NAME: str = "Calimuv Admin"

    # --- CORS ---
    # NoDecode: stop pydantic-settings from JSON-parsing this; our validator
    # below splits a plain comma-separated string instead.
    BACKEND_CORS_ORIGINS: Annotated[list[str], NoDecode] = ["http://localhost:3000"]

    # --- Cloudinary (optional; wired in Step 9) ---
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def _split_cors(cls, v: str | list[str]) -> list[str]:
        """Accept a comma-separated string from the env and turn it into a list."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    @field_validator("DATABASE_URL", mode="after")
    @classmethod
    def _normalize_db_url(cls, v: str) -> str:
        """Accept a Supabase/Heroku-style URL and force the psycopg driver so
        the connection string can be pasted verbatim from the provider.
        """
        if v.startswith("postgres://"):
            return "postgresql+psycopg://" + v[len("postgres://") :]
        if v.startswith("postgresql://"):
            return "postgresql+psycopg://" + v[len("postgresql://") :]
        return v

    @property
    def is_sqlite(self) -> bool:
        return self.DATABASE_URL.startswith("sqlite")


@lru_cache
def get_settings() -> Settings:
    """Cached singleton so the .env is parsed only once."""
    return Settings()


settings = get_settings()
