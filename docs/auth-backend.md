# Authentification : brancher Better Auth au backend FastAPI

Le front (Next.js) gère **toute** l'authentification avec [Better Auth](https://www.better-auth.com) : connexion Google / GitHub, sessions, cookies.
Le backend Python ne gère ni mot de passe ni OAuth : il **vérifie seulement un JWT** envoyé par le front.

## Vue d'ensemble

```
Navigateur ──(cookie de session)──▶ Next.js /api/auth/*   (Better Auth)
    │                                   │
    │  1. GET /api/auth/token  ◀────────┘  renvoie un JWT signé (EdDSA, 15 min)
    │
    │  2. Authorization: Bearer <jwt>
    ▼
FastAPI ──3. GET /api/auth/jwks (clé publique, mise en cache)──▶ Next.js
    │
    └─ 4. vérifie signature + iss + aud + exp → user id (= claim "sub")
```

- Le JWT est signé avec une clé privée stockée dans la table `jwks` ; seule la **clé publique** est exposée sur `/api/auth/jwks`.
- Le backend n'a **aucun secret à partager** avec le front.
- Côté front, c'est déjà câblé : `apiFetch()` dans [`frontend/src/lib/api.ts`](../frontend/src/lib/api.ts) récupère le JWT, le met en cache jusqu'à expiration et l'ajoute en header `Authorization`.

### Contenu du JWT

| Claim   | Valeur                                    |
| ------- | ----------------------------------------- |
| `sub`   | id de l'utilisateur Better Auth (string)  |
| `email` | email de l'utilisateur                    |
| `name`  | nom affiché                               |
| `iss`   | `BETTER_AUTH_URL` (ex. `http://localhost:3000`) |
| `aud`   | `JWT_AUDIENCE` (par défaut `chatify-api`) |
| `exp`   | émission + 15 min                         |

En-tête : `alg: EdDSA` (Ed25519), `kid` = id de la clé dans le JWKS.
Pour ajouter des claims, modifier `definePayload` dans [`frontend/src/lib/auth.ts`](../frontend/src/lib/auth.ts).

## Côté backend

### 1. Dépendance

```bash
uv add "pyjwt[crypto]"
```

(`[crypto]` installe `cryptography`, nécessaire pour EdDSA.)

### 2. Configuration

Dans `app/core/config.py` :

```python
class Settings(BaseSettings):
    ...
    better_auth_url: str = "http://localhost:3000"
    jwt_audience: str = "chatify-api"
    cors_origins: list[str] = ["http://localhost:3000"]

    @property
    def jwks_url(self) -> str:
        return f"{self.better_auth_url}/api/auth/jwks"
```

Et dans `.env` / `.env.exemple` :

```
BETTER_AUTH_URL=http://localhost:3000
JWT_AUDIENCE=chatify-api
```

> `BETTER_AUTH_URL` et `JWT_AUDIENCE` doivent avoir **exactement** les mêmes valeurs que dans `frontend/.env`, sinon la vérification de `iss` / `aud` échoue.

### 3. Dépendance FastAPI `get_current_user`

`app/core/auth.py` :

```python
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

from app.core.config import get_settings

settings = get_settings()

# Télécharge le JWKS une fois puis le garde en cache ;
# refait un appel automatiquement si un nouveau `kid` apparaît (rotation de clé).
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
        signing_key = _jwks_client.get_signing_key_from_jwt(creds.credentials)
        payload = jwt.decode(
            creds.credentials,
            signing_key.key,
            algorithms=["EdDSA"],
            audience=settings.jwt_audience,
            issuer=settings.better_auth_url,
        )
    except jwt.PyJWTError:
        raise unauthorized
    return CurrentUser(
        id=payload["sub"], email=payload["email"], name=payload.get("name")
    )
```

> La dépendance est volontairement **synchrone** (`def`, pas `async def`) : `PyJWKClient` fait un appel HTTP bloquant la première fois, FastAPI l'exécute donc dans son threadpool sans bloquer la boucle async.

### 4. Utilisation dans une route

Le dashboard front appelle `GET /me` (bouton « Tester l'appel ») pour vérifier que tout est branché :

```python
from typing import Annotated
from fastapi import Depends
from app.core.auth import CurrentUser, get_current_user


@app.get("/me")
def me(user: Annotated[CurrentUser, Depends(get_current_user)]) -> CurrentUser:
    return user
```

Pour protéger un router entier : `APIRouter(dependencies=[Depends(get_current_user)])`.

### 5. CORS

Le front appelle l'API depuis le navigateur avec un header `Authorization`, il faut donc autoriser son origine :

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],
)
```

(Pas besoin de `allow_credentials` : on n'envoie pas de cookie au backend, seulement le Bearer.)

## Base de données

Better Auth crée ses propres tables dans la base Postgres : `user`, `session`, `account`, `verification`, `jwks`.
Elles sont gérées par le front (`npx auth@latest migrate` depuis `frontend/`), **pas par Alembic**.

### Exclure ces tables d'Alembic

Sinon `alembic revision --autogenerate` proposera de les supprimer. Dans `migrations/env.py` :

```python
BETTER_AUTH_TABLES = {"user", "session", "account", "verification", "jwks"}


def include_object(object, name, type_, reflected, compare_to):
    return not (type_ == "table" and name in BETTER_AUTH_TABLES)


# à ajouter dans les DEUX appels context.configure(...) (offline et online)
context.configure(..., include_object=include_object)
```

### Lier un utilisateur à une entreprise

Stocker l'id Better Auth (claim `sub`, un `string`, pas un UUID) dans vos modèles, par ex. :

```python
class Company(Base):
    ...
    owner_id: Mapped[str] = mapped_column(String(64), index=True)
```

Pas de `ForeignKey("user.id")` : la table `user` n'est pas dans la metadata SQLAlchemy. Si vous avez besoin de l'email ou du nom, ils sont déjà dans le JWT.

## Mise en route (front)

1. Copier `frontend/.env.example` en `frontend/.env.local` et remplir :
   - `BETTER_AUTH_SECRET` : `openssl rand -base64 32`
   - `DATABASE_URL` : la même base que le backend, mais au format **`postgresql://…`** (sans `+psycopg`)
   - identifiants OAuth Google et GitHub (voir ci-dessous)
2. Créer les tables Better Auth : `cd frontend && npx auth@latest migrate`
3. `npm run dev`, puis aller sur http://localhost:3000/sign-in

### Applications OAuth

| Provider | Où la créer | URL de callback |
| -------- | ----------- | --------------- |
| Google   | [Google Cloud Console → Identifiants → ID client OAuth (Application Web)](https://console.cloud.google.com/apis/credentials) | `http://localhost:3000/api/auth/callback/google` |
| GitHub   | [GitHub → Settings → Developer settings → OAuth Apps](https://github.com/settings/developers) | `http://localhost:3000/api/auth/callback/github` |

En production, ajouter les mêmes URLs avec le domaine réel.

## Tester à la main

```bash
# Clé publique
curl http://localhost:3000/api/auth/jwks

# JWT (copier le cookie `better-auth.session_token` depuis le navigateur une fois connecté)
curl http://localhost:3000/api/auth/token -H "cookie: better-auth.session_token=<valeur>"

# Appel backend
curl http://localhost:8000/me -H "Authorization: Bearer <jwt>"
```

Erreurs fréquentes côté backend (`401`) :
- `InvalidIssuerError` / `InvalidAudienceError` → `BETTER_AUTH_URL` ou `JWT_AUDIENCE` différents entre front et back.
- `ExpiredSignatureError` → JWT de plus de 15 min ; le front en redemande un automatiquement via `apiFetch()`.
- `PyJWKClientConnectionError` → le backend n'arrive pas à joindre `…/api/auth/jwks` (front éteint ou mauvaise URL).
