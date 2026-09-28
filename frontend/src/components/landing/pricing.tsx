import { Check } from "lucide-react";
import { SectionHeader } from "./section-header";

const plans = [
  {
    name: "Starter",
    price: "0 €",
    period: "/mois",
    description: "Pour tester Chatify sur un petit site.",
    features: [
      "1 chatbot",
      "100 conversations / mois",
      "10 documents (50 Mo)",
      "Widget avec mention Chatify",
    ],
    cta: "Commencer gratuitement",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "49 €",
    period: "/mois",
    description: "Pour les PME qui veulent automatiser leur support.",
    features: [
      "3 chatbots",
      "5 000 conversations / mois",
      "Documents illimités (2 Go)",
      "Widget 100 % personnalisable",
      "Statistiques avancées",
    ],
    cta: "Essayer 14 jours",
    highlighted: true,
  },
  {
    name: "Business",
    price: "Sur devis",
    period: "",
    description: "Pour les volumes importants et besoins spécifiques.",
    features: [
      "Chatbots illimités",
      "Conversations illimitées",
      "SSO & rôles d'équipe",
      "API & webhooks",
      "Support dédié",
    ],
    cta: "Contacter l'équipe",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section
      id="tarifs"
      className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Tarifs"
          title="Des tarifs simples, sans surprise"
          description="Commencez gratuitement, passez à la vitesse supérieure quand vous êtes prêt."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                p.highlighted
                  ? "bg-blue-600 text-white shadow-2xl shadow-blue-600/30 lg:-my-4 lg:py-12"
                  : "border border-slate-200 bg-white"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  Le plus populaire
                </span>
              )}
              <h3
                className={`font-semibold ${p.highlighted ? "text-white" : "text-slate-900"}`}
              >
                {p.name}
              </h3>
              <p
                className={`mt-2 text-sm ${p.highlighted ? "text-blue-100" : "text-slate-600"}`}
              >
                {p.description}
              </p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {p.price}
                </span>
                <span
                  className={`text-sm ${p.highlighted ? "text-blue-100" : "text-slate-500"}`}
                >
                  {p.period}
                </span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check
                      className={`h-4 w-4 shrink-0 ${p.highlighted ? "text-white" : "text-blue-600"}`}
                      strokeWidth={2.5}
                    />
                    <span
                      className={
                        p.highlighted ? "text-white" : "text-slate-700"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
                  p.highlighted
                    ? "bg-white text-blue-700 hover:bg-blue-50"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
