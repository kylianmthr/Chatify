"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

// Temporary: checks the JWT round-trip with the FastAPI `GET /me` endpoint.
export function ApiCheck() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    setLoading(true);
    try {
      const res = await apiFetch("/me");
      const body = await res.text();
      setResult(`${res.status} ${body}`);
    } catch (e) {
      setResult(`Backend injoignable : ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="font-medium text-slate-900">Connexion au backend</p>
      <p className="mt-1 text-sm text-slate-500">
        Appelle <code className="font-mono">GET /me</code> sur l&apos;API avec
        le JWT de la session.
      </p>
      <button
        type="button"
        onClick={check}
        disabled={loading}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Appel en cours…" : "Tester l'appel"}
      </button>
      {result && (
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-200">
          {result}
        </pre>
      )}
    </div>
  );
}
