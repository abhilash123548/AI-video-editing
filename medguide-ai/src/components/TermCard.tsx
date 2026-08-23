import type { GlossaryTerm, Lang } from "@/lib/demoData";
import { localize } from "@/lib/demoData";

export function TermCard({ term, lang }: { term: GlossaryTerm; lang: Lang }) {
  return (
    <div className="rounded-xl border border-teal/20 bg-teal/5 p-4">
      <p className="text-sm font-semibold text-navy">{localize(term.term, lang)}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{localize(term.explanation, lang)}</p>
    </div>
  );
}
