/**
 * Difficult-airway cognitive aids (DAS 2015-style Plan A–D), a rapid-sequence
 * induction checklist, and extubation criteria. Static, reviewable data — the
 * module renders it; tests assert it stays well-formed.
 */

export type AirwayStepType = 'action' | 'decision' | 'warning' | 'info';

export interface AirwayPlanStep {
  plan: 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  type: AirwayStepType;
  keyPoints: string[];
}

export const DAS_PLAN: AirwayPlanStep[] = [
  {
    plan: 'A',
    title: 'Plan A — Face-mask ventilation & tracheal intubation',
    description: 'Optimise the first attempt. Maintain oxygenation throughout; every second counts.',
    type: 'action',
    keyPoints: [
      'Pre-oxygenate (3 min, or 8 vital-capacity breaths); optimise head/neck position.',
      'Consider videolaryngoscopy as the first-line technique.',
      'Limit to 3 (+1 by a more experienced operator) laryngoscopy attempts.',
      'Maintain oxygenation with face-mask; consider a second-generation SGA as a conduit.',
      'Confirm placement with sustained waveform capnography.',
    ],
  },
  {
    plan: 'B',
    title: 'Plan B — Supraglottic airway device (SGA)',
    description: 'If face-mask ventilation and intubation have failed, insert a second-generation SGA.',
    type: 'decision',
    keyPoints: [
      'Insert a second-generation SGA; maximum 2 attempts.',
      'Change device type and/or size between attempts.',
      'Consider fibreoptic-guided intubation through the SGA.',
      'Re-assess: are you oxygenating? If not, proceed to Plan C.',
    ],
  },
  {
    plan: 'C',
    title: 'Plan C — Final attempt at face-mask ventilation',
    description: 'After 2 failed SGA attempts, return to face-mask ventilation while preparing Plan D.',
    type: 'warning',
    keyPoints: [
      'Ensure full neuromuscular blockade (or reverse it) and optimal positioning.',
      'Two-person, four-hand technique with adjuncts (Guedel, jaw thrust).',
      'Call for help and declare the possibility of CICO now — do not wait.',
      'If oxygenation remains impossible → CICO → Plan D.',
    ],
  },
  {
    plan: 'D',
    title: 'Plan D — Emergency front-of-neck access (eFONA)',
    description: 'Cannot Intubate, Cannot Oxygenate. Perform scalpel–bougie cricothyroidotomy without delay.',
    type: 'warning',
    keyPoints: [
      'Declare CICO, call for help, ensure neuromuscular blockade.',
      'Scalpel–bougie cricothyroidotomy: horizontal stab, bougie, rail-road a size-6.0 cuffed tube.',
      'Extend the incision if needed; ventilate and confirm with capnography.',
      'Emergency cricothyroidotomy is a rescue — it must not be delayed.',
    ],
  },
];

export interface ChecklistGroup {
  title: string;
  items: string[];
}

export const RSI_CHECKLIST: ChecklistGroup[] = [
  {
    title: 'Preparation',
    items: [
      'Team brief, roles assigned (airway operator, assistant, cricoid, drugs)',
      'Monitoring: SpO₂, ECG, NIBP, waveform capnography',
      'Working IV access confirmed; suction on and tested',
      'Pre-oxygenation: 3 min at high FiO₂, or 8 vital-capacity breaths',
      'Positioning: ramped / ear-to-sternal-notch, bed at working height',
      'Airway trolley: ETT + bougie, videolaryngoscope, second-generation SGA, cricothyroidotomy kit',
      'Induction and rapid-onset paralytic drawn and labelled; vasopressor ready',
      'Aspiration risk assessed; NG tube aspirated if present',
      'Plan A–D verbalised; cricoid pressure role agreed',
    ],
  },
  {
    title: 'Induction & intubation',
    items: [
      'Pre-oxygenation complete (end-tidal O₂ > 90%)',
      'Induction agent given, immediately followed by neuromuscular blocker',
      'Adequate paralysis confirmed (no cough/movement at laryngoscopy)',
      'Laryngoscopy ≤ 30 s per attempt; maintain oxygenation between attempts',
      'ETT passed, cuff inflated, circuit connected',
      'Placement confirmed by sustained waveform capnography + bilateral breath sounds',
      'Tube secured and documented (depth at teeth/lip)',
    ],
  },
];

export const EXTUBATION_CRITERIA: string[] = [
  'Awake, cooperative and following commands',
  'Adequate neuromuscular recovery (TOF ratio ≥ 0.9; sustained 5 s head lift)',
  'Haemodynamically stable (no or minimal vasopressors)',
  'Adequate spontaneous ventilation (normal RR, no distress, adequate VT)',
  'Oxygenation at or near the preoperative baseline (SpO₂ ≥ 92% on modest FiO₂)',
  'Normothermia',
  'Adequate analgesia; no significant residual anaesthesia',
  'Minimal secretions; effective cough',
];

export const HIGH_RISK_EXTUBATION: string[] = [
  'Known or anticipated difficult airway — plan an extubation strategy before induction.',
  'Consider an airway-exchange catheter, staged extubation, or deep extubation.',
  'Ensure reintubation equipment, video laryngoscope and surgical airway kit are immediately available.',
  'Consider extubating in the operating theatre or a high-dependency area with skilled help present.',
];
