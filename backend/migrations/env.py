import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection, make_url
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from app.core.config import get_settings
from app.db.base import Base
import app.models  # noqa: F401  (enregistre les modèles dans Base.metadata)

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)


def _prepare_url() -> tuple[str, dict]:
    """Adapte l'URL Neon au driver utilisé.

    asyncpg ne comprend pas ?sslmode=require dans l'URL :
    on le retire et on passe le SSL via connect_args.
    """
    url = make_url(get_settings().database_url)
    connect_args: dict = {}

    if url.drivername == "postgresql+asyncpg":
        query = dict(url.query)
        if query.pop("sslmode", None) is not None:
            connect_args["ssl"] = "require"
        query.pop("channel_binding", None)
        url = url.set(query=query)

    return url.render_as_string(hide_password=False), connect_args


DATABASE_URL, CONNECT_ARGS = _prepare_url()

# Les % doivent être doublés pour le parser de config d'Alembic
config.set_main_option("sqlalchemy.url", DATABASE_URL.replace("%", "%%"))

target_metadata = Base.metadata

# Tables gérées par Better Auth (front Next.js, `npx auth@latest migrate`) :
# Alembic ne doit ni les créer ni proposer de les supprimer.
BETTER_AUTH_TABLES = {"user", "session", "account", "verification", "jwks"}


def include_object(object, name, type_, reflected, compare_to) -> bool:
    if type_ == "table" and name in BETTER_AUTH_TABLES:
        return False
    # Index / contraintes rattachés à une table Better Auth
    table = getattr(object, "table", None)
    if table is not None and table.name in BETTER_AUTH_TABLES:
        return False
    return True


def run_migrations_offline() -> None:
    """Mode offline : génère le SQL sans se connecter."""
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
        include_object=include_object,
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,
        include_object=include_object,
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Mode online : se connecte à Neon et applique les migrations."""
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        connect_args=CONNECT_ARGS,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
