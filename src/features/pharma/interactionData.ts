export type SeverityLevel = 'severe' | 'warning' | 'mild' | 'beneficial';

export interface DrugItem {
  id: string;
  name: string;
  category: string;
}

export interface DrugInteraction {
  id: string;
  drugIds: string[]; // typically exactly 2
  severity: SeverityLevel;
  description: string;
  management: string;
}

export const ANESTHESIA_DRUGS: DrugItem[] = [
  // Sedatives & Hypnotics
  { id: 'propofol', name: 'Propofol', category: 'Hypnotic' },
  { id: 'ketamine', name: 'Ketamine', category: 'Hypnotic / Analgesic' },
  { id: 'midazolam', name: 'Midazolam', category: 'Benzodiazepine' },
  { id: 'dexmedetomidine', name: 'Dexmedetomidine', category: 'Alpha-2 Agonist' },
  
  // Opioids
  { id: 'remifentanil', name: 'Remifentanil', category: 'Opioid' },
  { id: 'fentanyl', name: 'Fentanyl', category: 'Opioid' },
  
  // NMBAs and Reversals
  { id: 'rocuronium', name: 'Rocuronium', category: 'NMBA (Non-depolarizing)' },
  { id: 'succinylcholine', name: 'Succinylcholine', category: 'NMBA (Depolarizing)' },
  { id: 'sugammadex', name: 'Sugammadex', category: 'Reversal Agent' },
  { id: 'neostigmine', name: 'Neostigmine', category: 'Reversal Agent' },

  // Vasoactives
  { id: 'ephedrine', name: 'Ephedrine', category: 'Vasopressor (Indirect)' },
  { id: 'phenylephrine', name: 'Phenylephrine', category: 'Vasopressor (Direct)' },
  
  // Volatiles
  { id: 'sevoflurane', name: 'Sevoflurane', category: 'Volatile Anesthetic' },
  { id: 'desflurane', name: 'Desflurane', category: 'Volatile Anesthetic' },
  
  // Other / Co-existing
  { id: 'amiodarone', name: 'Amiodarone', category: 'Antiarrhythmic' },
  { id: 'beta_blockers', name: 'Beta-blockers', category: 'Cardiovascular' },
  { id: 'ccb', name: 'Calcium Channel Blockers', category: 'Cardiovascular' },
  { id: 'maoi', name: 'MAOIs', category: 'Antidepressant' },
  { id: 'ssri', name: 'SSRIs', category: 'Antidepressant' },
  { id: 'hormonal_contraceptives', name: 'Hormonal Contraceptives', category: 'Endocrine' },
  { id: 'magnesium', name: 'Magnesium Sulfate', category: 'Electrolyte' },
  { id: 'methylene_blue', name: 'Methylene Blue', category: 'Other' },
].sort((a, b) => a.name.localeCompare(b.name));

export const ANESTHESIA_INTERACTIONS: DrugInteraction[] = [
  {
    id: 'int_propofol_remi',
    drugIds: ['propofol', 'remifentanil'],
    severity: 'warning',
    description: 'Synergistic respiratory depression, bradycardia, and hypotension.',
    management: 'Reduce doses of both agents. Titrate carefully. Consider anticholinergic (Glycopyrrolate/Atropine) for bradycardia.'
  },
  {
    id: 'int_maoi_ephedrine',
    drugIds: ['maoi', 'ephedrine'],
    severity: 'severe',
    description: 'Risk of hypertensive crisis due to exaggerated release of accumulated norepinephrine.',
    management: 'Avoid indirect-acting sympathomimetics (Ephedrine). Use direct-acting agents (Phenylephrine, Norepinephrine) at reduced doses and titrate carefully.'
  },
  {
    id: 'int_sugammadex_contraceptives',
    drugIds: ['sugammadex', 'hormonal_contraceptives'],
    severity: 'warning',
    description: 'Sugammadex encapsulates progesterone, potentially decreasing the efficacy of hormonal contraceptives.',
    management: 'Inform patient to use an additional non-hormonal method of contraception for 7 days post-administration.'
  },
  {
    id: 'int_ketamine_propofol',
    drugIds: ['ketamine', 'propofol'],
    severity: 'beneficial',
    description: '"Ketofol" combination. Ketamine preserves respiratory drive and blood pressure, mitigating propofol-induced hypotension and apnea.',
    management: 'Commonly mixed in the same syringe or given sequentially for balanced procedural sedation.'
  },
  {
    id: 'int_sevo_sux',
    drugIds: ['sevoflurane', 'succinylcholine'],
    severity: 'severe',
    description: 'Known triggers for Malignant Hyperthermia (MH) in susceptible patients.',
    management: 'If patient has MH history, avoid both. Use TIVA and non-depolarizing NMBAs. Have Dantrolene available if signs of MH develop.'
  },
  {
    id: 'int_des_sux',
    drugIds: ['desflurane', 'succinylcholine'],
    severity: 'severe',
    description: 'Known triggers for Malignant Hyperthermia (MH) in susceptible patients.',
    management: 'If patient has MH history, avoid both. Ensure clean machine, use TIVA.'
  },
  {
    id: 'int_volatiles_amiodarone',
    drugIds: ['sevoflurane', 'amiodarone'],
    severity: 'warning',
    description: 'Increased risk of profound bradycardia, heart block, and myocardial depression.',
    management: 'Titrate volatile agents carefully. Have pacing and chronotropic agents (Isoprenaline/Atropine) ready.'
  },
  {
    id: 'int_volatiles_amiodarone_des',
    drugIds: ['desflurane', 'amiodarone'],
    severity: 'warning',
    description: 'Increased risk of profound bradycardia, heart block, and myocardial depression.',
    management: 'Titrate volatile agents carefully. Have pacing and chronotropic agents ready.'
  },
  {
    id: 'int_fentanyl_maoi',
    drugIds: ['fentanyl', 'maoi'],
    severity: 'severe',
    description: 'Risk of Serotonin Syndrome or severe cardiovascular instability (historically more associated with Meperidine/Pethidine, but caution with Fentanyl).',
    management: 'Use with extreme caution; titrate carefully. Consider alternative analgesics. Monitor for hyperthermia, rigidity, and autonomic instability.'
  },
  {
    id: 'int_ssri_methylene_blue',
    drugIds: ['ssri', 'methylene_blue'],
    severity: 'severe',
    description: 'Methylene blue is a potent MAOI. Combination with SSRIs can trigger fatal Serotonin Syndrome.',
    management: 'Avoid Methylene Blue in patients on SSRIs, SNRIs, or other serotonergic agents if possible.'
  },
  {
    id: 'int_dex_beta',
    drugIds: ['dexmedetomidine', 'beta_blockers'],
    severity: 'warning',
    description: 'Additive bradycardia and potential heart block.',
    management: 'Use reduced loading dose of Dexmedetomidine or omit loading dose entirely. Monitor HR closely.'
  },
  {
    id: 'int_magnesium_roc',
    drugIds: ['magnesium', 'rocuronium'],
    severity: 'warning',
    description: 'Magnesium impairs presynaptic acetylcholine release, significantly prolonging the duration of non-depolarizing NMBAs.',
    management: 'Reduce NMBA dose. Monitor closely with quantitative neuromuscular transmission (NMT) monitoring before redosing or reversal.'
  },
  {
    id: 'int_ccb_volatiles',
    drugIds: ['ccb', 'sevoflurane'],
    severity: 'warning',
    description: 'Additive myocardial depression and vasodilation leading to severe hypotension.',
    management: 'Titrate volatile anesthetics carefully. Treat hypotension with appropriate vasoactive agents.'
  },
  {
    id: 'int_ccb_volatiles_des',
    drugIds: ['ccb', 'desflurane'],
    severity: 'warning',
    description: 'Additive myocardial depression and vasodilation leading to severe hypotension.',
    management: 'Titrate volatile anesthetics carefully. Treat hypotension appropriately.'
  }
];
