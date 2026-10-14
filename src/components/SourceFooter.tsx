import { useState } from 'react';
import { ShieldCheck, ExternalLink, Flag } from 'lucide-react';
import { TabType } from '../types';
import { getProvenance, CONTENT_VERSION, CONTENT_REVIEWED, FEEDBACK, buildReportDraft } from '../config/contentMeta';

interface SourceFooterProps {
  moduleId: TabType;
  /** Human label for the current module (used in the report draft). */
  moduleLabel?: string;
  /** Optional per-item source (e.g. a guideline's origin). */
  source?: string;
  year?: number;
  /** Optional specific item label for the report draft. */
  detail?: string;
}

/**
 * Renders where a module's clinical content comes from and when it was last
 * reviewed, plus a "report an error" action. Included once per page so every
 * module is traceable.
 */
export function SourceFooter({ moduleId, moduleLabel, source, year, detail }: SourceFooterProps) {
  const prov = getProvenance(moduleId);
  const [copied, setCopied] = useState(false);

  const report = () => {
    const draft = buildReportDraft(moduleLabel, detail);
    if (FEEDBACK.url) {
      window.open(FEEDBACK.url, '_blank', 'noopener');
      return;
    }
    if (FEEDBACK.email) {
      window.location.href = `mailto:${FEEDBACK.email}?subject=${encodeURIComponent('AnestAssist content report')}&body=${encodeURIComponent(draft)}`;
      return;
    }
    navigator.clipboard?.writeText(draft).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sources = source
    ? [{ label: year ? `${source} (${year})` : source }, ...prov.sources]
    : prov.sources;

  return (
    <div className="mt-10 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="text-[11px] text-slate-500 leading-relaxed min-w-0">
        <p className="font-bold text-slate-600 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Sources &amp; review
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {sources.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              {s.url ? (
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  className="text-medical-accent hover:underline inline-flex items-center gap-0.5">
                  {s.label} <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span>{s.label}</span>
              )}
            </span>
          ))}
        </div>
        <p className="mt-1 text-slate-400">
          Reviewed {prov.reviewed || CONTENT_REVIEWED} · Content v{CONTENT_VERSION}
        </p>
        {prov.note && <p className="mt-0.5 text-slate-400 italic">{prov.note}</p>}
      </div>
      <button
        onClick={report}
        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors"
      >
        <Flag className="w-3.5 h-3.5" /> {copied ? 'Report copied' : 'Report an error'}
      </button>
    </div>
  );
}

export default SourceFooter;
