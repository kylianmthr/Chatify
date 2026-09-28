import {
  BarChart3,
  Clock,
  Globe2,
  Palette,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { SectionHeader } from "./section-header";

const features = [
  {
    icon: Quote,
    title: "Réponses sourcées",
    description:
      "Chaque réponse s'appuie sur vos documents et cite sa source. Pas d'invention : si l'info n'existe pas, l'assistant le dit.",
  },
  {
    icon: Clock,
    title: "Disponible 24h/24",
    description:
      "Vos clients obtiennent une réponse instantanée, même le week-end. Votre équipe se concentre sur les demandes complexes.",
  },
  {
    icon: Palette,
    title: "Aux couleurs de votre marque",
    description:
      "Logo, couleurs, ton de voix, message d'accueil : le widget s'intègre naturellement à votre site.",
  },
  {
    icon: Globe2,
    title: "Multilingue",
    description:
      "Vos documents sont en français ? L'assistant répond quand même à vos clients dans leur langue.",
  },
  {
    icon: BarChart3,
    title: "Statistiques & insights",
    description:
      "Découvrez les questions les plus posées et repérez les manques dans votre documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurisé & conforme RGPD",
    description:
      "Données hébergées en Europe, chiffrées, et jamais utilisées pour entraîner des modèles tiers.",
  },
];

export function Features() {
  return (
    <section
      id="fonctionnalites"
      className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Fonctionnalités"
          title="Tout ce qu'il faut pour un support client autonome"
          description="Un assistant fiable, qui parle comme vous et apprend de vos propres contenus."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
