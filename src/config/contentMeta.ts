import { TabType } from '../types';

/**
 * Content provenance & versioning.
 *
 * Every module declares where its clinical content comes from and when it was
 * last reviewed, so the app can show a traceable "source · reviewed" footer and
 * an About screen. Keep this in sync when content changes.
 */

/** Application (code) version — mirrors package.json. */
export const APP_VERSION = '1.0.0';

/** Clinical content revision + the date it was last reviewed. */
export const CONTENT_VERSION = '2026.10';
export const CONTENT_REVIEWED = '2026-10-14';

export interface ContentSource {
  label: string;
  url?: string;
}

export interface ModuleProvenance {
  sources: ContentSource[];
  reviewed: string;
  note?: string;
}

/** Optional place to send corrections. If unset, the UI copies a report draft. */
export const FEEDBACK: { email?: string; url?: string } = {
  // email: 'feedback@example.com',
  // url: 'https://github.com/<org>/<repo>/issues',
};

export const MODULE_PROVENANCE: Record<TabType, ModuleProvenance> = {
  guidelines: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'American Society of Anesthesiologists (ASA)', url: 'https://www.asahq.org/standards-and-practice-parameters' },
      { label: 'European Society of Anaesthesiology & Intensive Care (ESAIC)', url: 'https://www.esaic.org/guidelines/' },
      { label: 'European Society of Intensive Care Medicine (ESICM)', url: 'https://www.esicm.org/resources/guidelines/' },
      { label: 'Difficult Airway Society (DAS)', url: 'https://das.uk.com/guidelines/' },
    ],
    note: 'Guideline cards link to the source publication where available.',
  },
  conditions: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'Surviving Sepsis Campaign (SCCM/ESICM)', url: 'https://www.sccm.org/survivingsepsiscampaign' },
      { label: 'Resuscitation Council (UK) guidelines', url: 'https://www.resus.org.uk/library/2021-resuscitation-guidelines' },
      { label: 'Specialty-society and standard textbook protocols' },
    ],
    note: 'Protocols are compiled summaries; always defer to local policy.',
  },
  patient: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'Devine (1974) body-weight formulae' },
      { label: 'Advanced Paediatric Life Support (APLS) / PALS weight estimates' },
      { label: 'local antibiotic stewardship guidance' },
    ],
  },
  preop: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'RCRI — Lee et al., Circulation 1999', url: 'https://www.ahajournals.org/doi/10.1161/01.CIR.100.10.1043' },
      { label: 'ARISCAT — Canet et al., Anesthesiology 2010', url: 'https://pubs.asahq.org/anesthesiology/article/113/6/1338/9428' },
      { label: 'STOP-BANG — Chung et al., Anesthesiology 2008', url: 'https://pubs.asahq.org/anesthesiology/article/108/5/812/7587' },
      { label: 'Apfel — Anesthesiology 1999' },
      { label: 'Difficult Airway Society (DAS)', url: 'https://das.uk.com/guidelines/' },
    ],
  },
  scores: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'Original publication for each score (see the score description)' },
      { label: 'Standard critical-care references' },
    ],
  },
  surgery: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'Standard anaesthetic texts (e.g. Miller, Barash)' },
      { label: 'ERAS Society recommendations', url: 'https://erassociety.org/guidelines/' },
      { label: 'Specialty-society guidance' },
    ],
  },
  ventilator: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'ARDSNet mechanical ventilation protocol', url: 'http://www.ardsnet.org/' },
      { label: 'Berlin definition of ARDS (2012)' },
      { label: 'ARDSNet lower/higher PEEP–FiO₂ ladders' },
    ],
  },
  regional: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'American Society of Regional Anesthesia (ASRA)', url: 'https://www.asra.com/' },
      { label: 'European Society of Regional Anaesthesia (ESRA)', url: 'https://esra.org/' },
      { label: 'NYSORA educational resources', url: 'https://www.nysora.com/' },
    ],
  },
  therapies: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'KDIGO clinical practice guidelines', url: 'https://kdigo.org/guidelines/' },
      { label: 'Surviving Sepsis Campaign (SCCM/ESICM)', url: 'https://www.sccm.org/survivingsepsiscampaign' },
      { label: 'Prismaflex / Baxter device documentation' },
    ],
  },
  airway: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'Difficult Airway Society (DAS) 2015 guidelines', url: 'https://das.uk.com/guidelines/' },
      { label: 'Project for Universal Management of Airways (PUMA)' },
    ],
  },
  fluids: {
    reviewed: CONTENT_REVIEWED,
    sources: [
      { label: 'Association of Anaesthetists (AAGBI) guidance', url: 'https://anaesthetists.org/Home/Resources-publications/Guidelines' },
      { label: 'National Blood Transfusion / massive haemorrhage protocols' },
      { label: 'Berlin/standard dynamic-index references' },
    ],
  },
};

export const ALL_MODULE_IDS = Object.keys(MODULE_PROVENANCE) as TabType[];

export function getProvenance(moduleId: TabType): ModuleProvenance {
  return MODULE_PROVENANCE[moduleId];
}

/** A copyable report draft for corrections/suggestions. */
export function buildReportDraft(moduleLabel?: string, detail?: string): string {
  return [
    'AnestAssist content report',
    `App version: ${APP_VERSION} · Content ${CONTENT_VERSION} (reviewed ${CONTENT_REVIEWED})`,
    moduleLabel ? `Module: ${moduleLabel}` : 'Module: ',
    detail ? `Item: ${detail}` : 'Item: ',
    '',
    'Issue / suggested change:',
    '',
    'Page/section:',
    '',
  ].join('\n');
}
