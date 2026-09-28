import { Check } from "lucide-react";

const points = [
  "Compatible avec Shopify, WordPress, Wix, Webflow et tout site HTML",
  "Widget léger (< 30 Ko), sans impact sur la vitesse de votre site",
  "Mises à jour automatiques quand vous modifiez vos documents",
];

export function Integration() {
  return (
    <section id="integration" className="scroll-mt-20 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-blue-600">Intégration</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Une ligne de code. C&apos;est tout.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Collez le script avant la balise{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">
              &lt;/body&gt;
            </code>{" "}
            de votre site et votre assistant est en ligne.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-2xl shadow-blue-900/20 ring-1 ring-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-slate-700" />
            <span className="h-3 w-3 rounded-full bg-slate-700" />
            <span className="h-3 w-3 rounded-full bg-slate-700" />
            <span className="ml-3 font-mono text-xs text-slate-400">
              index.html
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-300">
            <code>
              <span className="text-slate-500">
                {"<!-- Chatify widget -->"}
              </span>
              {"\n"}
              <span className="text-sky-400">{"<script"}</span>
              {"\n  "}
              <span className="text-blue-300">src</span>=
              <span className="text-emerald-300">
                {'"https://cdn.chatify.app/widget.js"'}
              </span>
              {"\n  "}
              <span className="text-blue-300">data-bot-id</span>=
              <span className="text-emerald-300">{'"bot_7f3a9c21"'}</span>
              {"\n  "}
              <span className="text-blue-300">defer</span>
              {"\n"}
              <span className="text-sky-400">{"></script>"}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
