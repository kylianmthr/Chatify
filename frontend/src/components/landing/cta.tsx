import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-sky-500 px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-300/20 blur-2xl" />
        <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Offrez à vos clients des réponses instantanées dès aujourd&apos;hui
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-blue-100">
          Créez votre premier chatbot gratuitement, sans carte bancaire.
        </p>
        <a
          href="#tarifs"
          className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
        >
          Démarrer maintenant
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
