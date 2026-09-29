import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/landing/logo";
import { auth } from "@/lib/auth";
import { ApiCheck } from "./api-check";
import { SignOutButton } from "./sign-out-button";

export const metadata: Metadata = {
  title: "Tableau de bord — Chatify",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const { user } = session;

  return (
    <>
      <header className="border-b border-slate-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <SignOutButton />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Bonjour {user.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">{user.email}</p>
        <div className="mt-8">
          <ApiCheck />
        </div>
      </main>
    </>
  );
}
