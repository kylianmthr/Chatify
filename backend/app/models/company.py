import secrets
import uuid
from datetime import datetime

from sqlalchemy import String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


def generate_widget_id() -> str:
    return f"wgt_{secrets.token_urlsafe(16)}"


class Company(Base):
    __tablename__ = "companies"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255))
    owner_id: Mapped[str] = mapped_column(String(64), index=True)
    widget_id: Mapped[str] = mapped_column(
        String(64), unique=True, index=True, default=generate_widget_id
    )
    allowed_origins: Mapped[list[str]] = mapped_column(
        ARRAY(Text), default=list, server_default="{}"
    )
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
