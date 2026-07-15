"""FastAPI application entrypoint."""

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.router import api_router
from app.core.config import settings
from app.core.logging_config import get_logger, setup_logging

setup_logging()
logger = get_logger("calimuv")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting %s (env=%s)", settings.PROJECT_NAME, settings.ENVIRONMENT)
    # Local convenience: auto-create tables on SQLite so `uvicorn` runs with
    # zero setup. Production uses Alembic migrations instead.
    if settings.is_sqlite:
        from app.db.base_class import Base
        from app.db.session import engine
        import app.models  # noqa: F401  (register all models)

        Base.metadata.create_all(bind=engine)
        logger.info("SQLite tables ensured.")
    yield
    logger.info("Shutting down %s", settings.PROJECT_NAME)


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    description="Backend API for the Calimuv calisthenics institute website.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# --- CORS: allow the Next.js frontend to call this API ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Global exception handler: never leak stack traces to clients ---
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled error on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error"},
    )


@app.get("/", tags=["health"])
def root() -> dict:
    return {"name": settings.PROJECT_NAME, "status": "ok", "docs": "/docs"}


@app.get("/health", tags=["health"])
def health() -> dict:
    return {"status": "healthy"}


# All business routes live under the API prefix (e.g. /api/trainers).
app.include_router(api_router, prefix=settings.API_PREFIX)
