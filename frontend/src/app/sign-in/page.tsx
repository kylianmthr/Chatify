import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/landing/logo";
import { auth } from "@/lib/auth";
import { SignInButtons } from "./sign-in-buttons";

export const metadata: Metadata = {
  title: "Connexion — Chatify",
};

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/dashboard");

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-blue-900/5">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
            Bienvenue
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Connectez-vous pour créer votre chatbot.
          </p>
          <div className="mt-8">
            <SignInButtons />
          </div>
        </div>
      </div>
    </main>
  );
}
