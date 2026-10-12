from fastapi import APIRouter

from app.api.deps import CurrentUser, CurrentUserDep

router = APIRouter(tags=["auth"])


@router.get("/me")
def me(user: CurrentUserDep) -> CurrentUser:
    return user
