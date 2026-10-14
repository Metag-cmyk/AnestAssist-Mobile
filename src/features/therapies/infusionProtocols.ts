import { AmountUnit, DoseUnit } from '../../lib/infusionRates';

export type InfusionCategory =
  | 'Vasoactive / Inotropes'
  | 'Sedation & Analgesia'
  | 'Anticoagulation & Metabolic';

export type RangeTone = 'emerald' | 'sky' | 'amber' | 'rose';

/** A clinically meaningful dose band, expressed in the protocol's `doseUnit`. */
export interface DoseRange {
  min: number;
  max: number;
  label: string;
  description: string;
  tone: RangeTone;
  receptors?: string[];
}

export interface InfusionPrep {
  label: string;
  amount: number;
  amountUnit: AmountUnit;
  volumeMl: number;
}

export type WeightBasis = 'tbw' | 'ibw' | 'abw';

export interface InfusionProtocol {
  id: string;
  name: string;
  category: InfusionCategory;
  indication: string;
  /** Dose dimensions. Concentration is always derived in the matching amount unit. */
  doseUnit: DoseUnit;
  /** Therapeutic window and titration step, expressed in `doseUnit`. */
  minDose: number;
  maxDose: number;
  step: number;
  defaultWeightBasis: WeightBasis;
  /** True for vesicant / high-alert drugs where extravasation or misconnection is dangerous. */
  centralLineRequired?: boolean;
  preps: InfusionPrep[];
  doseRanges?: DoseRange[];
  titrationTips: string[];
  safetyWarnings: string[];
}

export const INFUSION_PROTOCOLS: InfusionProtocol[] = [
  {
    id: 'norepinephrine',
    name: 'Norepinephrine (Levophed)',
    category: 'Vasoactive / Inotropes',
    indication: 'First-line vasopressor for Septic, Cardiogenic, and Vasoplegic Shock.',
    doseUnit: { amount: 'mcg', time: 'min', perKg: true },
    minDose: 0.01,
    maxDose: 0.5,
    step: 0.01,
    defaultWeightBasis: 'tbw',
    centralLineRequired: true,
    preps: [
      { label: '4 mg in 40 mL D5W', amount: 4, amountUnit: 'mg', volumeMl: 40 },
      { label: '8 mg in 50 mL D5W', amount: 8, amountUnit: 'mg', volumeMl: 50 },
      { label: '16 mg in 250 mL D5W', amount: 16, amountUnit: 'mg', volumeMl: 250 },
    ],
    doseRanges: [
      { min: 0, max: 0.1, label: 'Low Dose', description: 'Early septic shock / vasoplegia', tone: 'emerald', receptors: ['α1', 'β1'] },
      { min: 0.1, max: 0.3, label: 'Moderate Dose', description: 'Established septic shock', tone: 'amber', receptors: ['α1++'] },
      { min: 0.3, max: 0.5, label: 'High Dose', description: 'Refractory shock — add vasopressin, consider steroids', tone: 'rose', receptors: ['α1+++'] },
    ],
    titrationTips: [
      'Central venous catheter strongly preferred to prevent extravasation necrosis.',
      'Target MAP ≥ 65 mmHg (or baseline in chronic hypertensives).',
      'Add Vasopressin early if Norepinephrine requirements exceed 0.25 mcg/kg/min.',
    ],
    safetyWarnings: [
      'Potent alpha-1 vasoconstriction can cause peripheral ischemic limb digits.',
      'Extravasation rescue: Phentolamine 5-10 mg diluted in 10 mL saline injected locally.',
    ],
  },
  {
    id: 'epinephrine',
    name: 'Epinephrine (Adrenaline)',
    category: 'Vasoactive / Inotropes',
    indication: 'Anaphylaxis, Severe Bradycardia, Cardiogenic Shock, Cardiac Arrest.',
    doseUnit: { amount: 'mcg', time: 'min', perKg: true },
    minDose: 0.01,
    maxDose: 0.25,
    step: 0.01,
    defaultWeightBasis: 'tbw',
    centralLineRequired: true,
    preps: [
      { label: '4 mg in 50 mL D5W', amount: 4, amountUnit: 'mg', volumeMl: 50 },
      { label: '1 mg in 50 mL D5W', amount: 1, amountUnit: 'mg', volumeMl: 50 },
    ],
    doseRanges: [
      { min: 0, max: 0.05, label: 'Beta Range', description: 'Inotropy & bronchodilation', tone: 'emerald', receptors: ['β1', 'β2'] },
      { min: 0.05, max: 0.1, label: 'Mixed Range', description: 'Inotropy + pressor effect', tone: 'amber', receptors: ['α1', 'β1'] },
      { min: 0.1, max: 0.25, label: 'Alpha Range', description: 'Predominant vasoconstriction', tone: 'rose', receptors: ['α1+'] },
    ],
    titrationTips: [
      'Low dose (<0.05 mcg/kg/min): Predominant Beta-1/Beta-2 (inotropy & bronchodilation).',
      'High dose (>0.1 mcg/kg/min): Predominant Alpha-1 (vasoconstriction).',
    ],
    safetyWarnings: [
      'Causes transient hyperlactatemia due to accelerated aerobic glycolysis.',
      'Tachyarrhythmias & myocardial ischemia risk.',
    ],
  },
  {
    id: 'dobutamine',
    name: 'Dobutamine',
    category: 'Vasoactive / Inotropes',
    indication: 'Decompensated Heart Failure & Low Cardiac Output States.',
    doseUnit: { amount: 'mcg', time: 'min', perKg: true },
    minDose: 2.5,
    maxDose: 20,
    step: 0.5,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '250 mg in 50 mL D5W', amount: 250, amountUnit: 'mg', volumeMl: 50 },
      { label: '250 mg in 250 mL D5W', amount: 250, amountUnit: 'mg', volumeMl: 250 },
    ],
    doseRanges: [
      { min: 0, max: 5, label: 'Low Inotropy', description: 'Mild LV dysfunction', tone: 'emerald', receptors: ['β1'] },
      { min: 5, max: 15, label: 'Standard Inotropy', description: 'Decompensated heart failure', tone: 'sky', receptors: ['β1', 'β2'] },
      { min: 15, max: 20, label: 'Maximum Range', description: 'Arrhythmogenicity risk', tone: 'rose', receptors: ['β1+++'] },
    ],
    titrationTips: [
      'Strong Beta-1 inotropic agent with mild Beta-2 vasodilation.',
      'Improves cardiac index and lowers SVR/PVR.',
    ],
    safetyWarnings: [
      'Tachycardia and ventricular dysrhythmias at higher doses.',
      'May worsen hypotension if hypovolemic.',
    ],
  },
  {
    id: 'dopamine',
    name: 'Dopamine',
    category: 'Vasoactive / Inotropes',
    indication: 'Symptomatic Bradycardia & Hypotension.',
    doseUnit: { amount: 'mcg', time: 'min', perKg: true },
    minDose: 2,
    maxDose: 20,
    step: 0.5,
    defaultWeightBasis: 'tbw',
    centralLineRequired: true,
    preps: [
      { label: '200 mg in 50 mL D5W', amount: 200, amountUnit: 'mg', volumeMl: 50 },
      { label: '400 mg in 250 mL D5W', amount: 400, amountUnit: 'mg', volumeMl: 250 },
    ],
    doseRanges: [
      { min: 0, max: 3, label: 'Dopaminergic', description: 'D1/D2 — renal effect is not clinically proven', tone: 'sky', receptors: ['D1', 'D2'] },
      { min: 3, max: 10, label: 'Inotropic', description: 'β1 positive inotropy', tone: 'emerald', receptors: ['β1', 'β2'] },
      { min: 10, max: 20, label: 'Vasopressor', description: 'α1 vasoconstriction', tone: 'amber', receptors: ['α1'] },
    ],
    titrationTips: [
      'Low dose (1-3 mcg/kg/min): Dopaminergic receptors.',
      'Medium dose (3-10 mcg/kg/min): Beta-1 inotropy.',
      'High dose (>10 mcg/kg/min): Alpha-1 vasoconstriction.',
    ],
    safetyWarnings: [
      'High incidence of tachyarrhythmias compared to Norepinephrine.',
    ],
  },
  {
    id: 'vasopressin',
    name: 'Vasopressin',
    category: 'Vasoactive / Inotropes',
    indication: 'Adjunct vasopressor in septic / vasoplegic shock (not weight-based).',
    doseUnit: { amount: 'units', time: 'min', perKg: false },
    minDose: 0.01,
    maxDose: 0.04,
    step: 0.005,
    defaultWeightBasis: 'tbw',
    centralLineRequired: true,
    preps: [
      { label: '20 units in 100 mL NS', amount: 20, amountUnit: 'units', volumeMl: 100 },
      { label: '40 units in 40 mL NS', amount: 40, amountUnit: 'units', volumeMl: 40 },
    ],
    doseRanges: [
      { min: 0, max: 0.03, label: 'Standard', description: 'Adjunct to norepinephrine', tone: 'emerald', receptors: ['V1'] },
      { min: 0.03, max: 0.04, label: 'Maximum', description: 'V1 vasoconstriction — mesenteric/digital ischemia risk', tone: 'rose', receptors: ['V1++'] },
    ],
    titrationTips: [
      'Fixed-dose adjunct — titrate the primary catecholamine, not vasopressin.',
      'Usually initiated once norepinephrine exceeds 0.25 mcg/kg/min.',
    ],
    safetyWarnings: [
      'Excessive V1 stimulation causes splanchnic and digital ischemia.',
    ],
  },
  {
    id: 'phenylephrine',
    name: 'Phenylephrine',
    category: 'Vasoactive / Inotropes',
    indication: 'Pure α1 vasopressor — anaesthesia-induced hypotension, tachycardia.',
    doseUnit: { amount: 'mcg', time: 'min', perKg: true },
    minDose: 0.1,
    maxDose: 1.0,
    step: 0.05,
    defaultWeightBasis: 'tbw',
    centralLineRequired: true,
    preps: [
      { label: '10 mg in 100 mL NS', amount: 10, amountUnit: 'mg', volumeMl: 100 },
      { label: '10 mg in 250 mL NS', amount: 10, amountUnit: 'mg', volumeMl: 250 },
    ],
    doseRanges: [
      { min: 0, max: 0.5, label: 'Low', description: 'Mild vasoconstriction', tone: 'emerald', receptors: ['α1'] },
      { min: 0.5, max: 1.0, label: 'High', description: 'Reflex bradycardia, reduced cardiac output', tone: 'amber', receptors: ['α1++'] },
    ],
    titrationTips: [
      'Pure alpha-1 agonist — beware reflex bradycardia and reduced CO.',
      'Preferentially useful when the patient is tachycardic or septic.',
    ],
    safetyWarnings: [
      'Peripheral vasoconstriction; extravasation causes necrosis.',
    ],
  },
  {
    id: 'milrinone',
    name: 'Milrinone',
    category: 'Vasoactive / Inotropes',
    indication: 'Inodilator for low-output heart failure / pulmonary hypertension.',
    doseUnit: { amount: 'mcg', time: 'min', perKg: true },
    minDose: 0.125,
    maxDose: 0.75,
    step: 0.025,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '20 mg in 100 mL NS', amount: 20, amountUnit: 'mg', volumeMl: 100 },
      { label: '10 mg in 50 mL NS', amount: 10, amountUnit: 'mg', volumeMl: 50 },
    ],
    doseRanges: [
      { min: 0, max: 0.375, label: 'Lower Maintenance', description: 'Renal impairment / elderly', tone: 'emerald', receptors: ['PDE3'] },
      { min: 0.375, max: 0.75, label: 'Standard Maintenance', description: 'Usual inodilator range', tone: 'sky', receptors: ['PDE3'] },
    ],
    titrationTips: [
      'Renally cleared — reduce dose in renal impairment.',
      'Loading dose (50 mcg/kg) is often omitted in shock to avoid hypotension.',
    ],
    safetyWarnings: [
      'Vasodilation and hypotension; thrombocytopenia with prolonged use.',
    ],
  },
  {
    id: 'nitroglycerin',
    name: 'Nitroglycerin (GTN)',
    category: 'Vasoactive / Inotropes',
    indication: 'Acute pulmonary oedema, ischaemia, hypertensive emergencies (not weight-based).',
    doseUnit: { amount: 'mcg', time: 'min', perKg: false },
    minDose: 5,
    maxDose: 200,
    step: 5,
    defaultWeightBasis: 'tbw',
    centralLineRequired: true,
    preps: [
      { label: '50 mg in 250 mL (0.2 mg/mL)', amount: 50, amountUnit: 'mg', volumeMl: 250 },
      { label: '10 mg in 100 mL (0.1 mg/mL)', amount: 10, amountUnit: 'mg', volumeMl: 100 },
    ],
    doseRanges: [
      { min: 0, max: 60, label: 'Venodilation', description: 'Predominant preload reduction', tone: 'emerald' },
      { min: 60, max: 200, label: 'Arterial Dilation', description: 'Afterload reduction, headache, hypotension', tone: 'amber' },
    ],
    titrationTips: [
      'Titrate to symptoms/BP; tachyphylaxis develops after 24-48 h.',
      'Use PVC-free, non-adsorbing tubing.',
    ],
    safetyWarnings: [
      'Contraindicated with PDE5 inhibitors (severe hypotension); methemoglobinemia at high dose.',
    ],
  },
  {
    id: 'propofol',
    name: 'Propofol (Diprivan 1%)',
    category: 'Sedation & Analgesia',
    indication: 'ICU Sedation in mechanically ventilated patients.',
    doseUnit: { amount: 'mg', time: 'h', perKg: true },
    minDose: 0.5,
    maxDose: 4.0,
    step: 0.1,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '500 mg in 50 mL (1%)', amount: 500, amountUnit: 'mg', volumeMl: 50 },
      { label: '1000 mg in 100 mL (1%)', amount: 1000, amountUnit: 'mg', volumeMl: 100 },
    ],
    doseRanges: [
      { min: 0, max: 1.5, label: 'Light Sedation', description: 'Targeted light sedation', tone: 'emerald' },
      { min: 1.5, max: 4, label: 'Deep Sedation', description: 'Standard ICU sedation', tone: 'sky' },
      { min: 4, max: 8, label: 'PRIS Risk', description: 'Avoid >4 mg/kg/h for >48 h', tone: 'rose' },
    ],
    titrationTips: [
      'Rapid onset and offset allows daily awakening sedation breaks.',
      'Provides 1.1 kcal/mL of lipid nutrition.',
    ],
    safetyWarnings: [
      'PRIS risk: Avoid doses >4 mg/kg/h for >48 hours.',
    ],
  },
  {
    id: 'dexmedetomidine',
    name: 'Dexmedetomidine (Precedex)',
    category: 'Sedation & Analgesia',
    indication: 'Light ICU Sedation & Ventilator weaning.',
    doseUnit: { amount: 'mcg', time: 'h', perKg: true },
    minDose: 0.2,
    maxDose: 1.4,
    step: 0.1,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '200 mcg in 50 mL NS', amount: 200, amountUnit: 'mcg', volumeMl: 50 },
      { label: '400 mcg in 100 mL NS', amount: 400, amountUnit: 'mcg', volumeMl: 100 },
    ],
    doseRanges: [
      { min: 0, max: 0.7, label: 'Light Sedation', description: 'Cooperative sedation', tone: 'emerald', receptors: ['α2'] },
      { min: 0.7, max: 1.4, label: 'Deep Sedation', description: 'Bradycardia & hypotension risk', tone: 'amber', receptors: ['α2++'] },
    ],
    titrationTips: [
      'Preserves respiratory drive without causing significant respiratory depression.',
    ],
    safetyWarnings: [
      'High incidence of dose-dependent bradycardia and hypotension.',
    ],
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    category: 'Sedation & Analgesia',
    indication: 'ICU sedation (haemodynamically unstable patients).',
    doseUnit: { amount: 'mg', time: 'h', perKg: true },
    minDose: 0.02,
    maxDose: 0.1,
    step: 0.01,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '50 mg in 50 mL NS', amount: 50, amountUnit: 'mg', volumeMl: 50 },
      { label: '100 mg in 100 mL NS', amount: 100, amountUnit: 'mg', volumeMl: 100 },
    ],
    doseRanges: [
      { min: 0, max: 0.05, label: 'Standard Sedation', description: 'Usual maintenance range', tone: 'emerald', receptors: ['GABA-A'] },
      { min: 0.05, max: 0.1, label: 'High', description: 'Accumulation & delirium risk', tone: 'amber', receptors: ['GABA-A'] },
    ],
    titrationTips: [
      'Accumulates in renal/hepatic impairment and obesity.',
      'Prefer propofol/dexmedetomidine for short-term sedation where possible.',
    ],
    safetyWarnings: [
      'Respiratory depression and hypotension; paradoxical agitation in the elderly.',
    ],
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    category: 'Sedation & Analgesia',
    indication: 'Analgesia in mechanically ventilated ICU patients.',
    doseUnit: { amount: 'mcg', time: 'h', perKg: true },
    minDose: 0.5,
    maxDose: 2,
    step: 0.1,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '500 mcg in 100 mL NS', amount: 500, amountUnit: 'mcg', volumeMl: 100 },
      { label: '1000 mcg in 100 mL NS', amount: 1000, amountUnit: 'mcg', volumeMl: 100 },
    ],
    doseRanges: [
      { min: 0, max: 1, label: 'Standard Analgesia', description: 'Usual maintenance range', tone: 'emerald', receptors: ['μ'] },
      { min: 1, max: 2, label: 'High', description: 'Tolerance / accumulation risk', tone: 'amber', receptors: ['μ'] },
    ],
    titrationTips: [
      'Rapid onset/offset; dose adjust for tolerance with prolonged infusion.',
      'Combine with propofol/dexmedetomidine for analgesia-sedation.',
    ],
    safetyWarnings: [
      'Chest-wall rigidity with rapid boluses; respiratory depression.',
    ],
  },
  {
    id: 'ketamine',
    name: 'Ketamine',
    category: 'Sedation & Analgesia',
    indication: 'Analgesia / sedation, bronchospasm, haemodynamic instability.',
    doseUnit: { amount: 'mg', time: 'h', perKg: true },
    minDose: 0.1,
    maxDose: 1.0,
    step: 0.05,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '500 mg in 50 mL (10 mg/mL)', amount: 500, amountUnit: 'mg', volumeMl: 50 },
      { label: '200 mg in 20 mL (10 mg/mL)', amount: 200, amountUnit: 'mg', volumeMl: 20 },
    ],
    doseRanges: [
      { min: 0, max: 0.3, label: 'Analgesic', description: 'Opioid-sparing subanaesthetic range', tone: 'emerald', receptors: ['NMDA'] },
      { min: 0.3, max: 1.0, label: 'Sedative', description: 'Dissociation, secretions, emergence phenomena', tone: 'amber', receptors: ['NMDA'] },
    ],
    titrationTips: [
      'Bronchodilator and sympathomimetic — useful in shock/asthma.',
      'Consider an antisialagogue; watch for emergence reactions.',
    ],
    safetyWarnings: [
      'Increases secretions and may raise intracranial/cardiac stimulatory effects.',
    ],
  },
  {
    id: 'heparin',
    name: 'Unfractionated Heparin',
    category: 'Anticoagulation & Metabolic',
    indication: 'Therapeutic anticoagulation (e.g. VTE, ACS) titrated to aPTT.',
    doseUnit: { amount: 'units', time: 'h', perKg: true },
    minDose: 12,
    maxDose: 18,
    step: 1,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '25 000 units in 500 mL NS', amount: 25000, amountUnit: 'units', volumeMl: 500 },
      { label: '25 000 units in 250 mL NS', amount: 25000, amountUnit: 'units', volumeMl: 250 },
    ],
    doseRanges: [
      { min: 0, max: 18, label: 'Therapeutic', description: 'Nomogram-based; titrate to aPTT 1.5-2.5x', tone: 'emerald' },
    ],
    titrationTips: [
      'Weight-based nomograms cap the initial rate (often 18 units/kg/h) in obesity.',
      'Monitor aPTT/anti-Xa and platelet count (HIT).',
    ],
    safetyWarnings: [
      'Bleeding, HIT, hyperkalaemia with prolonged use.',
    ],
  },
  {
    id: 'insulin',
    name: 'Insulin (Soluble)',
    category: 'Anticoagulation & Metabolic',
    indication: 'Glycaemic control — variable-rate intravenous insulin infusion (VRIII).',
    doseUnit: { amount: 'units', time: 'h', perKg: false },
    minDose: 0.5,
    maxDose: 10,
    step: 0.5,
    defaultWeightBasis: 'tbw',
    preps: [
      { label: '50 units in 50 mL NS (1 unit/mL)', amount: 50, amountUnit: 'units', volumeMl: 50 },
      { label: '100 units in 100 mL NS (1 unit/mL)', amount: 100, amountUnit: 'units', volumeMl: 100 },
    ],
    doseRanges: [
      { min: 0, max: 3, label: 'Standard', description: 'Typical starting rate (0.5-3 units/h)', tone: 'emerald' },
      { min: 3, max: 10, label: 'High', description: 'Insulin resistance — monitor K+ closely', tone: 'amber' },
    ],
    titrationTips: [
      'Titrate hourly per local VRIII chart; aim for glucose 6-10 mmol/L.',
      'Continue substrate (dextrose) to prevent hypoglycaemia/ketosis.',
    ],
    safetyWarnings: [
      'Hypoglycaemia and hypokalaemia; run a dedicated line and check compatibility.',
    ],
  },
];
