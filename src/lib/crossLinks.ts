/**
 * Cross-module linking helpers.
 *
 * The clinical datasets were authored independently, so references between them
 * are free text (e.g. Surgery recommends "ESP Block", the Regional library calls
 * it "Erector Spinae Plane (ESP) Block"). These resolvers map those loose labels
 * onto the stable IDs used by the target modules, without mutating any dataset.
 *
 * Anything that does not resolve simply renders as plain text — we never invent
 * a link.
 */

interface BlockRule {
  keywords: string[];
  id: string;
}

/** Ordered most-specific-first; the first rule whose keyword is found wins. */
const BLOCK_RULES: BlockRule[] = [
  { keywords: ['interscalene'], id: 'interscalene-brachial-plexus' },
  { keywords: ['supraclavicular'], id: 'supraclavicular-brachial-plexus' },
  { keywords: ['infraclavicular'], id: 'infraclavicular-brachial-plexus' },
  { keywords: ['axillary'], id: 'axillary-brachial-plexus' },
  { keywords: ['fascia iliaca'], id: 'fascia-iliaca-block' },
  { keywords: ['adductor canal', 'acb'], id: 'adductor-canal-block' },
  { keywords: ['peng'], id: 'peng-block' },
  { keywords: ['ipack'], id: 'ipack-block' },
  { keywords: ['pecs', 'pectoral'], id: 'pecs-i-ii-block' },
  { keywords: ['erector spinae', 'esp block'], id: 'erector-spinae-plane-block' },
  { keywords: ['serratus'], id: 'serratus-anterior-plane-block' },
  { keywords: ['quadratus lumborum', 'ql block', '(ql)'], id: 'quadratus-lumborum-block' },
  { keywords: ['femoral triangle'], id: 'rectus-femoris-nerve-block' },
  { keywords: ['femoral nerve'], id: 'femoral-nerve-block' },
  { keywords: ['rectus sheath'], id: 'rectus-sheath-block' },
  { keywords: ['paravertebral'], id: 'paravertebral-block' },
  { keywords: ['caudal'], id: 'caudal-anesthesia' },
  { keywords: ['stellate'], id: 'stellate-ganglion-block' },
  { keywords: ['deep cervical plexus'], id: 'deep-cervical-plexus-block' },
  { keywords: ['cervical plexus'], id: 'superficial-cervical-plexus-block' },
  { keywords: ['popliteal sciatic'], id: 'popliteal-sciatic-block' },
  { keywords: ['sciatic'], id: 'sciatic-subgluteal-block' },
  { keywords: ['ankle block'], id: 'ankle-block' },
  { keywords: ['radial nerve', 'radial block'], id: 'radial-nerve-block' },
  { keywords: ['ulnar'], id: 'ulnar-nerve-block' },
  { keywords: ['median'], id: 'median-nerve-block' },
  { keywords: ['spinal'], id: 'spinal-anesthesia' },
  { keywords: ['cse'], id: 'cse-anesthesia' },
  { keywords: ['epidural'], id: 'epidural-anesthesia' },
  { keywords: ['transversalis'], id: 'tap-block' },
  { keywords: ['tap'], id: 'tap-block' },
];

// Whole-label guards checked before the keyword rules, so generic descriptors
// (e.g. "Systemic Analgesia (Spinal optional)", "Donor site ...") never link.
const EXCLUDED_STARTS_WITH = ['systemic'];
const EXCLUDED_INCLUDES = ['donor site'];

/**
 * Maps a free-text anaesthetic-technique label onto a Regional-block ID, or
 * returns undefined when the label is not one of the catalogued blocks.
 */
export function resolveBlockId(label: string): string | undefined {
  const lower = label.toLowerCase().trim();
  if (!lower) return undefined;
  if (EXCLUDED_STARTS_WITH.some(p => lower.startsWith(p))) return undefined;
  if (EXCLUDED_INCLUDES.some(p => lower.includes(p))) return undefined;

  const rule = BLOCK_RULES.find(r => r.keywords.some(k => lower.includes(k)));
  return rule?.id;
}

/**
 * Crisis guides that have a matching Conditions protocol. Only the pairs that
 * genuinely correspond are listed; the rest simply have no condition link.
 */
export const CRISIS_CONDITION_LINKS: Record<string, string> = {
  'crisis-malignant-hyperthermia': 'malignant-hyperthermia',
  'crisis-last-rescue': 'last',
  'crisis-anaphylaxis-ga': 'anaphylaxis',
  'crisis-high-spinal': 'high-spinal',
  'crisis-massive-hemorrhage': 'massive-hemorrhage',
};

/** Returns the Conditions-protocol ID for a crisis guide, if one exists. */
export function conditionIdForGuideline(guidelineId: string): string | undefined {
  return CRISIS_CONDITION_LINKS[guidelineId];
}

/** Clinical scores that screen for (and should link to) a Conditions protocol. */
export const SCORE_CONDITION_LINKS: Record<string, string[]> = {
  qsofa: ['sepsis-shock'],
  sofa: ['sepsis-shock'],
  'composite-difficult-airway': ['difficult-airway'],
  'glasgow-blatchford': ['upper-gi-bleeding'],
  'child-pugh': ['acute-liver-failure'],
};

export function conditionIdsForScore(scoreId: string): string[] {
  return SCORE_CONDITION_LINKS[scoreId] ?? [];
}

/** Reverse of {@link CRISIS_CONDITION_LINKS}: a condition's crisis/guideline card(s). */
export function guidelineIdsForCondition(conditionId: string): string[] {
  return Object.entries(CRISIS_CONDITION_LINKS)
    .filter(([, c]) => c === conditionId)
    .map(([id]) => id);
}

/** Reverse of {@link SCORE_CONDITION_LINKS}: screening scores that point at a condition. */
export function scoreIdsForCondition(conditionId: string): string[] {
  return Object.entries(SCORE_CONDITION_LINKS)
    .filter(([, ids]) => ids.includes(conditionId))
    .map(([id]) => id);
}

/** Conditions that map onto a specific infusion protocol (for a "go to infusion" link). */
export const CONDITION_INFUSION_LINKS: Record<string, string[]> = {
  'sepsis-shock': ['norepinephrine', 'vasopressin'],
  anaphylaxis: ['epinephrine'],
  'anaphylaxis-periop': ['epinephrine'],
  'neurogenic-shock': ['norepinephrine', 'phenylephrine'],
  'acute-asthma': ['epinephrine'],
};

export function infusionIdsForCondition(conditionId: string): string[] {
  return CONDITION_INFUSION_LINKS[conditionId] ?? [];
}
