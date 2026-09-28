import { ChevronDown } from "lucide-react";
import { SectionHeader } from "./section-header";

const faqs = [
  {
    q: "Quels types de fichiers puis-je importer ?",
    a: "PDF, Word (.docx), texte, Markdown, CSV ainsi que des pages web via leur URL. Vous pouvez mettre à jour ou supprimer un document à tout moment.",
  },
  {
    q: "Le chatbot peut-il inventer des réponses ?",
    a: "Chatify est conçu pour répondre uniquement à partir de vos documents et cite ses sources. Si une information est absente, l'assistant l'indique et peut rediriger vers votre support.",
  },
  {
    q: "Combien de temps faut-il pour mettre en place le chatbot ?",
    a: "Quelques minutes : importez vos documents, personnalisez l'apparence, puis collez une ligne de code sur votre site.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Vos documents sont chiffrés, hébergés en Europe et ne sont jamais utilisés pour entraîner des modèles tiers. Vous pouvez les supprimer définitivement à tout moment.",
  },
  {
    q: "Puis-je changer d'offre plus tard ?",
    a: "Oui, vous pouvez passer à une offre supérieure ou inférieure à tout moment, sans engagement.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader eyebrow="FAQ" title="Questions fréquentes" />
        <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
