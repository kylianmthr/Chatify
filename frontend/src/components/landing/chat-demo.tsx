"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Send, Sparkles, X } from "lucide-react";

type Message = {
  role: "bot" | "user";
  text: string;
  source?: string;
};

const script: Message[] = [
  {
    role: "user",
    text: "Bonjour, je peux retourner un article acheté en solde ?",
  },
  {
    role: "bot",
    text: "Oui ! Les articles soldés peuvent être retournés sous 14 jours, dans leur état d'origine. Le remboursement se fait sous forme d'avoir.",
    source: "Conditions_de_retour.pdf",
  },
  { role: "user", text: "Et les frais de retour sont offerts ?" },
  {
    role: "bot",
    text: "Le retour est gratuit en point relais. Pour un retour à domicile, des frais de 4,90 € s'appliquent.",
    source: "FAQ_Livraison.docx",
  },
];

export function ChatDemo() {
  const [visible, setVisible] = useState(1);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible >= script.length) {
      const reset = setTimeout(() => setVisible(1), 6000);
      return () => clearTimeout(reset);
    }
    const next = script[visible];
    const isBot = next.role === "bot";
    const t1 = setTimeout(() => setTyping(isBot), isBot ? 500 : 0);
    const t2 = setTimeout(
      () => {
        setTyping(false);
        setVisible((v) => v + 1);
      },
      isBot ? 2000 : 1600,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible]);

  useEffect(() => {
    const el = bottomRef.current?.parentElement;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
      <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Sparkles className="h-4 w-4" />
            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-blue-600 bg-emerald-400" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Assistant Maison Lumen</p>
            <p className="text-xs text-blue-100">Répond instantanément</p>
          </div>
        </div>
        <X className="h-4 w-4 text-blue-100" aria-hidden />
      </div>

      <div className="flex h-80 flex-col gap-3 overflow-y-auto bg-slate-50 px-4 py-4">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">
          Bonjour 👋 Comment puis-je vous aider ?
        </div>

        {script.slice(0, visible).map((m, i) =>
          m.role === "user" ? (
            <div
              key={i}
              className="animate-fade-up ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-600 px-3.5 py-2.5 text-sm text-white"
            >
              {m.text}
            </div>
          ) : (
            <div key={i} className="animate-fade-up max-w-[85%]">
              <div className="rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">
                {m.text}
              </div>
              {m.source && (
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                  <FileText className="h-3 w-3" />
                  {m.source}
                </span>
              )}
            </div>
          ),
        )}

        {typing && (
          <div className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm ring-1 ring-slate-100">
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-3 py-3">
        <div className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-400">
          Posez votre question…
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
          <Send className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
