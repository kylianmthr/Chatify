import { ArrowRight } from "lucide-react";
import { ChatDemo } from "./chat-demo";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-24 lg:pb-28">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Votre chatbot,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              entraîné sur vos documents.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
            Importez vos fichiers, intégrez le widget, vos clients ont leurs
            réponses.
          </p>

          <a
            href="#tarifs"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
          >
            Essayer gratuitement
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
