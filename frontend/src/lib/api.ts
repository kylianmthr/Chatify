import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

let cached: { token: string; exp: number } | null = null;

function decodeExp(token: string): number {
  const payload = JSON.parse(
    atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
  );
  return payload.exp as number;
}

async function getToken(): Promise<string | null> {
  // Reuse the JWT until 30s before expiry.
  if (cached && cached.exp - 30 > Date.now() / 1000) return cached.token;
  const { data } = await authClient.token();
  if (!data?.token) {
    cached = null;
    return null;
  }
  cached = { token: data.token, exp: decodeExp(data.token) };
  return data.token;
}

/** Client-side fetch to the FastAPI backend with the Better Auth JWT attached. */
export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = await getToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(`${API_URL}${path}`, { ...init, headers });
}
