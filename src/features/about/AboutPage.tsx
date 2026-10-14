import { useState } from 'react';
import { Info, ShieldCheck, Flag, Database, ExternalLink } from 'lucide-react';
import { navigationItems } from '../../config/navigation';
import { TabType } from '../../types';
import {
  APP_VERSION, CONTENT_VERSION, CONTENT_REVIEWED, MODULE_PROVENANCE, FEEDBACK, buildReportDraft,
} from '../../config/contentMeta';

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const report = () => {
    const draft = buildReportDraft('About');
    if (FEEDBACK.url) { window.open(FEEDBACK.url, '_blank', 'noopener'); return; }
    if (FEEDBACK.email) { window.location.href = `mailto:${FEEDBACK.email}?subject=${encodeURIComponent('AnestAssist content report')}&body=${encodeURIComponent(draft)}`; return; }
    navigator.clipboard?.writeText(draft).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-slate-900">About &amp; content sources</h2>
            <p className="text-sm text-slate-500 mt-1">Provenance, version and updating information.</p>
          </div>
          <div className="text-right text-xs font-bold text-slate-500">
            <p>App v{APP_VERSION}</p>
            <p>Content v{CONTENT_VERSION}</p>
            <p className="text-slate-400 font-medium">Reviewed {CONTENT_REVIEWED}</p>
          </div>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 leading-relaxed">
            <strong>Educational use only.</strong> AnestAssist is a study and reference aid. Always verify drugs, doses
            and protocols against your local formulary and a senior clinician before clinical use. Content is a curated
            summary of published guidance and may not reflect the most recent updates.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button onClick={report}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors">
            <Flag className="w-4 h-4" /> {copied ? 'Report copied' : 'Report an error or suggestion'}
          </button>
          {!FEEDBACK.url && !FEEDBACK.email && (
            <span className="text-[11px] text-slate-400">Copies a report template you can send to the maintainer.</span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
          <ShieldCheck className="w-4 h-4 text-indigo-600" /> Sources per module
        </h3>
        <div className="space-y-4">
          {navigationItems.map(item => {
            const prov = MODULE_PROVENANCE[item.id as TabType];
            if (!prov) return null;
            return (
              <div key={item.id} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-xs font-bold text-slate-700">{item.labelKey}</p>
                  <span className="text-[10px] text-slate-400 shrink-0">Reviewed {prov.reviewed}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  {prov.sources.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1">
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-medical-accent hover:underline inline-flex items-center gap-0.5">
                          {s.label} <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (<span>{s.label}</span>)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
          <Database className="w-4 h-4 text-indigo-600" /> Data &amp; privacy
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          AnestAssist runs fully offline, makes no network requests at runtime and contains no analytics. Patient values
          you enter are stored only in your browser's local storage and never leave the device. Use "Reset" to clear them.
        </p>
      </div>
    </div>
  );
}
