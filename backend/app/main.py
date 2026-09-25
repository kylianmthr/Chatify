from typing import Annotated
from fastapi import Depends, FastAPI

from app.core.config import Settings, get_settings

app = FastAPI()


@app.get("/health")
def health(settings: Annotated[Settings, Depends(get_settings)]):
    return {"message": settings}
