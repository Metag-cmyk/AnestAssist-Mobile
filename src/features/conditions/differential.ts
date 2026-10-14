import { ConditionProtocol, DifferentialItem } from '../../types';

/**
 * Differential-diagnosis knowledge base for the Conditions module.
 *
 * `DifferentialMatrixView` renders, per condition:
 *   - "diagnostic triggers" (the first few diagnosis items), and
 *   - a differential matrix (each alternative + its distinguishing features + a POCUS/key test).
 *
 * Each `differentialDiagnosis` entry is matched against ORDERED keyword rules;
 * unmatched entries fall back to a generic prompt. The first matching rule wins,
 * so rules are listed most-specific first.
 */

export interface DifferentialRule {
  /** Lowercased substrings; a match against the DDx label selects this rule. */
  keywords: string[];
  distinguishingFeatures: string;
  pocusOrKeyTest: string;
}

export const DIFFERENTIAL_RULES: DifferentialRule[] = [
  {
    keywords: ['pneumothorax'],
    distinguishingFeatures: 'Unilateral absent breath sounds, tracheal shift, acute high peak airway pressure & hypotension.',
    pocusOrKeyTest: 'Lung POCUS: Absent lung sliding, absence of B-lines, presence of Lung Point.',
  },
  {
    keywords: ['tamponade'],
    distinguishingFeatures: "Beck's triad (Hypotension, JVD, muffled heart sounds), low QRS voltage, pulsus paradoxus.",
    pocusOrKeyTest: 'FOCUS: Pericardial effusion with diastolic RV collapse & dilated non-collapsible IVC.',
  },
  {
    keywords: ['anaphylaxis'],
    distinguishingFeatures: 'Sudden severe bronchospasm, mucosal edema, profound vasodilation, cutaneous flushing/hives.',
    pocusOrKeyTest: 'Serum Tryptase at 1-2h & 24h; POCUS: Normal lung sliding with hyperdynamic empty LV.',
  },
  {
    keywords: ['hyperthermia', 'mh'],
    distinguishingFeatures: 'Unexplained steep EtCO2 rise, masseter muscle rigidity, hyperkalemia, dark myoglobinuria.',
    pocusOrKeyTest: 'ABG: Severe combined respiratory & metabolic acidosis + hyperkalemia + elevated CK.',
  },
  {
    keywords: ['embolism'],
    distinguishingFeatures: 'Sudden EtCO2 drop, acute RV strain, hypoxemia, right-sided heart failure.',
    pocusOrKeyTest: 'FOCUS / TEE: McConnell sign (RV apical sparing), RV/LV ratio > 1.0, D-shaped LV.',
  },
  {
    keywords: ['bronchospasm', 'asthma'],
    distinguishingFeatures: 'High peak airway pressure with normal plateau pressure, wheezing, prolonged expiration.',
    pocusOrKeyTest: 'Lung POCUS: Bilateral lung sliding, absent pneumothorax, lung hyperinflation.',
  },
  {
    keywords: ['last', 'toxicity'],
    distinguishingFeatures: 'Perioral numbness, metallic taste, seizures progressing to QRS widening & refractory arrest.',
    pocusOrKeyTest: 'ECG: QRS prolongation, AV block; FOCUS: Global LV hypokinesis.',
  },
  {
    keywords: ['sepsis'],
    distinguishingFeatures: 'Fever/hypothermia, refractory distributive vasodilation, elevated lactate, infectious focus.',
    pocusOrKeyTest: 'POCUS: Hyperdynamic LV, collapsible IVC (<50%); Blood cultures + ABG.',
  },
  {
    keywords: ['stroke', 'ischemia'],
    distinguishingFeatures: 'Focal neurological deficit, facial droop, arm drift, asymmetric gaze.',
    pocusOrKeyTest: 'Stat non-contrast CT Head to rule out intracranial hemorrhage.',
  },
];

const GENERIC_FEATURES =
  'Evaluate clinical onset, drug exposures, baseline risk factors, and systemic signs.';
const GENERIC_POCUS = 'POCUS / Bedside ABG / Focused Ultrasound';

export interface ResolvedDifferential {
  /** Red-flag diagnostic triggers (falls back to the first diagnosis items). */
  triggers: string[];
  items: DifferentialItem[];
}

/** Resolves the differential matrix for a condition using the keyword rules above. */
export function resolveDifferential(condition: ConditionProtocol): ResolvedDifferential {
  const diagnoses = condition.differentialDiagnosis ?? [];

  const items: DifferentialItem[] = diagnoses.map((label) => {
    const lower = label.toLowerCase();
    const rule = DIFFERENTIAL_RULES.find((r) => r.keywords.some((k) => lower.includes(k)));
    return {
      condition: label,
      distinguishingFeatures: rule?.distinguishingFeatures ?? GENERIC_FEATURES,
      pocusOrKeyTest: rule?.pocusOrKeyTest ?? GENERIC_POCUS,
    };
  });

  const triggers = condition.diagnosis.slice(0, 3);

  return { triggers, items };
}
