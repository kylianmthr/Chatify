import { Code2, Upload, Wand2 } from "lucide-react";
import { SectionHeader } from "./section-header";

const steps = [
  {
    icon: Upload,
    title: "Importez vos documents",
    description:
      "Glissez-déposez vos PDF, Word, pages web ou FAQ. Chatify les analyse et construit la base de connaissances de votre assistant.",
  },
  {
    icon: Wand2,
    title: "Personnalisez votre assistant",
    description:
      "Choisissez son nom, son ton, ses couleurs et son message d'accueil. Testez-le en direct avant de le publier.",
  },
  {
    icon: Code2,
    title: "Intégrez-le à votre site",
    description:
      "Copiez une ligne de code dans votre site. Le widget apparaît et répond immédiatement à vos visiteurs.",
  },
];

export function HowItWorks() {
  return (
    <section id="fonctionnement" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Fonctionnement"
          title="De vos documents à un chatbot en ligne, en 3 étapes"
          description="Aucune compétence technique requise. Si vous savez envoyer un fichier, vous savez créer votre assistant."
        />

        <div className="relative mt-16">
          <div className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 md:block" />
          <ol className="relative grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative text-center">
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-semibold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
