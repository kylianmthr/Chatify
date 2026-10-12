from typing import Annotated
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from app.core.config import get_settings

settings = get_settings()
_jwks_client = jwt.PyJWKClient(settings.jwks_url, cache_keys=True)
_bearer = HTTPBearer(auto_error=False)


class CurrentUser(BaseModel):
    id: str
    email: str
    name: str | None = None


def get_current_user(
    creds: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> CurrentUser:
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if creds is None:
        raise unauthorized
    try:
        key = _jwks_client.get_signing_key_from_jwt(creds.credentials)
        playload = jwt.decode(
            creds.credentials,
            key.key,
            algorithms=["EdDSA"],
            audience=settings.jwt_audience,
            issuer=settings.better_auth_url,
        )
    except jwt.PyJWKError:
        raise unauthorized
    return CurrentUser(
        id=playload["sub"], email=playload["email"], name=playload.get("name")
    )


CurrentUserDep = Annotated[CurrentUser, Depends(get_current_user)]
