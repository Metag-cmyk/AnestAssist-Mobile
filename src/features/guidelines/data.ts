export interface StaticGuideline {
  id: string;
  title: string;
  source: 'ASA' | 'ESAIC' | 'ESICM' | 'OAA' | 'RCOG' | 'SOAP' | 'AHA' | 'ACC' | 'ASRA' | 'ERC';
  year: number;
  category: string;
  summary: string;
  /** Optional direct link; falls back to the society's guideline landing page. */
  link?: string;
}

/** Society guideline landing pages, used to link summary cards to their source. */
export const SOCIETY_LINKS: Record<string, string> = {
  ASA: 'https://www.asahq.org/standards-and-practice-parameters',
  ESAIC: 'https://www.esaic.org/guidelines/',
  ESICM: 'https://www.esicm.org/resources/guidelines/',
  OAA: 'https://www.oaa-anaes.ac.uk/',
  RCOG: 'https://www.rcog.org.uk/guidance/browse-all-guidance/',
  SOAP: 'https://soap.org/education/',
  AHA: 'https://www.heart.org/en/professional/quality-improvement/guidelines-and-statements',
  ACC: 'https://www.acc.org/guidelines',
  ASRA: 'https://www.asra.com/guidelines-articles',
  ERC: 'https://www.erc.edu/guidelines',
  DAS: 'https://das.uk.com/guidelines/',
};

export const STATIC_GUIDELINES: StaticGuideline[] = [
  {
    id: 'asa-difficult-airway',
    title: 'Management of the Difficult Airway',
    source: 'ASA',
    year: 2022,
    category: 'Airway',
    summary: 'Focuses on pre-procedure assessment, preparation, and management of the difficult airway. Key updates include emphasis on oxygenation throughout the process, use of videolaryngoscopy as a primary tool, and clear "exit" strategies for failed intubation.'
  },
  {
    id: 'esaic-preop-eval',
    title: 'Pre-operative Evaluation of Adults',
    source: 'ESAIC',
    year: 2018,
    category: 'Pre-op',
    summary: 'Comprehensive guide on assessing cardiovascular risk, pulmonary risk, and laboratory testing. Recommends against routine testing in healthy patients and emphasizes functional capacity assessment.'
  },
  {
    id: 'esicm-sepsis-2026',
    title: 'Surviving Sepsis Campaign 2026',
    source: 'ESICM',
    year: 2026,
    category: 'ICU',
    summary: 'Latest consensus on sepsis management. Key updates: 1. Personalized fluid resuscitation based on dynamic responsiveness (PLR, stroke volume variation). 2. Ultra-early vasopressor initiation (within 1h) via peripheral access if central line delayed. 3. Emphasis on "Sepsis Phenotypes" to tailor antibiotic and steroid therapy. 4. Balanced crystalloids strongly preferred over saline. 5. Target MAP 65-70 mmHg, but consider higher in chronic hypertensives.'
  },
  {
    id: 'esaic-postop-delirium',
    title: 'Postoperative Delirium Guidelines',
    source: 'ESAIC',
    year: 2017,
    category: 'Post-op',
    summary: 'Focuses on screening, prevention, and treatment. Recommends multi-modal approaches, avoiding benzodiazepines in elderly, and ensuring adequate pain control and early mobilization.'
  },
  {
    id: 'asa-fasting',
    title: 'Preoperative Fasting Guidelines',
    source: 'ASA',
    year: 2017,
    category: 'Pre-op',
    summary: 'Clear liquids (2h), Breast milk (4h), Infant formula (6h), Light meal (6h), Fatty/Fried meal (8h). Recent updates allow for clear liquids up to 2 hours before elective procedures.'
  },
  {
    id: 'esicm-ards',
    title: 'Clinical Practice Guideline: ARDS',
    source: 'ESICM',
    year: 2023,
    category: 'ICU',
    summary: 'Strong recommendations for low tidal volume ventilation (6mL/kg PBW), prone positioning for >16h/day in severe ARDS, and conservative fluid management.'
  },
  {
    id: 'asa-osa-2023',
    title: 'Perioperative Management of Patients with Obstructive Sleep Apnea',
    source: 'ASA',
    year: 2023,
    category: 'Pre-op',
    summary: 'Updated recommendations for screening (STOP-BANG), perioperative CPAP use, and multimodal analgesia to minimize opioid-induced respiratory depression. Emphasizes monitoring and post-discharge criteria.'
  },
  {
    id: 'esaic-nmb-2023',
    title: 'Perioperative Management of Neuromuscular Blockade',
    source: 'ESAIC',
    year: 2023,
    category: 'Intra-op',
    summary: 'Strong recommendation for quantitative neuromuscular monitoring (TOF ratio > 0.9) before extubation. Recommends Sugammadex for rapid reversal of deep or moderate rocuronium/vecuronium block.'
  },
  {
    id: 'esicm-brain-injury-2022',
    title: 'Management of Patients with Acute Brain Injury',
    source: 'ESICM',
    year: 2022,
    category: 'ICU',
    summary: 'Focuses on tiered management of intracranial hypertension, target MAP for cerebral perfusion pressure (60-70 mmHg), and avoiding prophylactic hyperventilation.'
  },
  {
    id: 'asa-obstetric-2020',
    title: 'Practice Guidelines for Obstetric Anesthesia',
    source: 'ASA',
    year: 2020,
    category: 'Obstetrics',
    summary: 'Comprehensive guide on neuraxial analgesia for labor, management of failed intubation in pregnancy, and prevention/treatment of spinal-induced hypotension using phenylephrine.'
  },
  {
    id: 'esaic-bleeding-2022',
    title: 'Management of Severe Perioperative Bleeding',
    source: 'ESAIC',
    year: 2022,
    category: 'Intra-op',
    summary: 'Emphasizes goal-directed therapy using viscoelastic tests (TEG/ROTEM), early use of tranexamic acid, and maintaining normothermia and physiological pH/calcium levels.'
  },
  {
    id: 'esicm-arf-2023',
    title: 'Management of Acute Respiratory Failure in ICU',
    source: 'ESICM',
    year: 2023,
    category: 'ICU',
    summary: 'Recommendations for non-invasive ventilation (NIV) and high-flow nasal oxygen (HFNO) in various etiologies of ARF. Highlights the importance of monitoring for NIV failure and timely intubation.'
  },
  {
    id: 'oaa-difficult-airway-2015',
    title: 'Obstetric Difficult Airway Guidelines',
    source: 'OAA',
    year: 2015,
    category: 'Obstetrics',
    summary: 'Joint OAA/DAS guidelines for the management of difficult and failed intubation in obstetrics. Emphasizes the use of supraglottic airway devices (SADs) and early decision-making for front-of-neck access.'
  },
  {
    id: 'rcog-pph-2016',
    title: 'Prevention and Management of Postpartum Haemorrhage',
    source: 'RCOG',
    year: 2016,
    category: 'Obstetrics',
    summary: 'Comprehensive management of PPH, including the use of uterotonics (oxytocin, ergometrine, carboprost), tranexamic acid, and surgical interventions like B-Lynch sutures and hysterectomy.'
  },
  {
    id: 'soap-pas-2023',
    title: 'Anesthesia for Placenta Accreta Spectrum (PAS)',
    source: 'SOAP',
    year: 2023,
    category: 'Obstetrics',
    summary: 'Consensus statement on the multidisciplinary management of PAS. Recommends specialized centers, preoperative planning, and strategies for massive transfusion and hemorrhage control.'
  },
  {
    id: 'esicm-ards-nuances-2024',
    title: 'ARDS Management: Nuances and Phenotypes',
    source: 'ESICM',
    year: 2024,
    category: 'ICU',
    summary: 'Focuses on sub-phenotyping ARDS (Hyper-inflammatory vs. Hypo-inflammatory) to tailor PEEP and fluid strategies. Emphasizes driving pressure-limited ventilation (<15 cmH2O) and early consideration of ECMO in "non-responders" to prone positioning.'
  },
  {
    id: 'ssc-sepsis-update-2026',
    title: 'Sepsis Management: 2026 Focused Update',
    source: 'ESICM',
    year: 2026,
    category: 'ICU',
    summary: 'Updates on the "Hour-1 Bundle". Recommends capillary refill time (CRT) as a primary target for resuscitation. Highlights the role of Vitamin C/Thiamine as "not recommended" and clarifies the use of Angiotensin II in refractory shock.'
  },
  {
    id: 'esc-cardiogenic-shock-2024',
    title: 'Management of Cardiogenic Shock',
    source: 'ESAIC',
    year: 2024,
    category: 'ICU',
    summary: 'Comprehensive algorithm for cardiogenic shock. Recommends early revascularization, cautious use of inotropes (Dobutamine first-line), and early multidisciplinary "Shock Team" activation for mechanical circulatory support (MCS) decisions.'
  },
  {
    id: 'esicm-obstructive-shock-2023',
    title: 'Management of Obstructive Shock States',
    source: 'ESICM',
    year: 2023,
    category: 'ICU',
    summary: 'Guidelines for Tension Pneumothorax, Cardiac Tamponade, and Massive PE. Emphasizes rapid point-of-care ultrasound (POCUS) for diagnosis and immediate procedural intervention (decompression/drainage/thrombolysis) as the primary treatment.'
  },
  {
    id: 'esicm-neurogenic-shock-2024',
    title: 'Management of Neurogenic Shock',
    source: 'ESICM',
    year: 2024,
    category: 'ICU',
    summary: 'Focuses on maintaining spinal cord perfusion (MAP 85-90 mmHg for 7 days). Recommends early vasopressors (Norepinephrine or Dopamine) and atropine for bradycardia. Emphasizes the importance of differentiating from hypovolemic shock in trauma patients.'
  },
  {
    id: 'esaic-anaphylaxis-2023',
    title: 'Management of Perioperative Anaphylaxis',
    source: 'ESAIC',
    year: 2023,
    category: 'Intra-op',
    summary: 'Strong recommendation for early Adrenaline (IM or IV bolus/infusion). Recommends aggressive fluid resuscitation (20-50 mL/kg), bronchodilators for refractory bronchospasm, and tryptase sampling (1-2h and 24h post-event).'
  },
  {
    id: 'esicm-trauma-shock-2023',
    title: 'Management of Hypovolemic Shock in Trauma',
    source: 'ESICM',
    year: 2023,
    category: 'ICU',
    summary: 'Emphasizes "Permissive Hypotension" (MAP 50-60 mmHg) until surgical control. Recommends early 1:1:1 blood product ratio, TXA within 3h, and maintaining normothermia and calcium levels (>1.1 mmol/L).'
  },
  {
    id: 'esicm-obesity-vent-2024',
    title: 'Mechanical Ventilation in the Obese Patient',
    source: 'ESICM',
    year: 2024,
    category: 'ICU',
    summary: 'Recommends higher PEEP (often >10 cmH2O) to counteract pleural pressure, recruitment maneuvers, and prone positioning. Emphasizes using Ideal Body Weight (IBW) for tidal volume calculation (6 mL/kg IBW).'
  },
  {
    id: 'esicm-copd-vent-2023',
    title: 'Ventilation in Obstructive Lung Disease (COPD/Asthma)',
    source: 'ESICM',
    year: 2023,
    category: 'ICU',
    summary: 'Focuses on minimizing dynamic hyperinflation (Auto-PEEP). Recommends low respiratory rates, long expiratory times (I:E 1:3 or 1:4), and permissive hypercapnia. Emphasizes monitoring plateau and peak-to-plateau pressures.'
  },
  {
    id: 'esaic-right-heart-2024',
    title: 'Management of Right Heart Failure in ICU',
    source: 'ESAIC',
    year: 2024,
    category: 'ICU',
    summary: 'Focuses on optimizing RV preload (often restrictive), reducing RV afterload (pulmonary vasodilators like iNO), and maintaining RV perfusion (MAP > PAP). Recommends Dobutamine or Milrinone for RV inotropy.'
  },
  {
    id: 'asa-regional-2021',
    title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy',
    source: 'ASA',
    year: 2021,
    category: 'Regional',
    summary: 'Provides detailed time intervals for neuraxial block placement and catheter removal after the administration of various anticoagulants (e.g., LMWH, DOACs). Emphasizes shared decision making and comprehensive risk assessment.'
  },
  {
    id: 'esaic-fluid-2022',
    title: 'Perioperative Goal-Directed Fluid Management',
    source: 'ESAIC',
    year: 2022,
    category: 'Intra-op',
    summary: 'Recommends individualized fluid therapy directed by advanced hemodynamic monitoring (e.g., pulse pressure variation, stroke volume) rather than fixed-volume regimens for major surgery to reduce postoperative complications.'
  },
  {
    id: 'esicm-nutrition-2023',
    title: 'Nutritional Support in the Critically Ill',
    source: 'ESICM',
    year: 2023,
    category: 'ICU',
    summary: 'Promotes early enteral nutrition within 24-48 hours. Strongly advises against early parenteral nutrition if enteral is structurally possible. Emphasizes protein targets (1.2-2.0 g/kg/d) while avoiding early caloric overfeeding.'
  },
  {
    id: 'asa-peds-fasting-2023',
    title: 'Pediatric Fasting Guidelines: Updates for Clear Liquids',
    source: 'ASA',
    year: 2023,
    category: 'Pediatrics',
    summary: 'Updated to safely reduce clear liquid fasting times from 2 hours down to 1 hour prior to elective procedures in healthy children, aiming to reduce agitation, hypoglycemia, and dehydration without increasing aspiration risk.'
  },
  {
    id: 'soap-cardiac-arrest-2020',
    title: 'Management of Maternal Cardiac Arrest',
    source: 'SOAP',
    year: 2020,
    category: 'Obstetrics',
    summary: 'Standardized approach focusing on left uterine displacement, immediate high-quality CPR, early airway management, and preparation for perimortem cesarean delivery (resuscitative hysterotomy) within 4-5 minutes of arrest.'
  },
  {
    id: 'rcog-eclampsia-2022',
    title: 'Management of Severe Preeclampsia and Eclampsia',
    source: 'RCOG',
    year: 2022,
    category: 'Obstetrics',
    summary: 'Recommends IV magnesium sulfate as first-line therapy to prevent and treat eclamptic seizures, alongside aggressive BP control (labetalol, nifedipine, or hydralazine) targeting <150/100 mmHg.'
  },
  {
    id: 'esaic-pain-2021',
    title: 'Postoperative Pain Management: Multimodal Approaches',
    source: 'ESAIC',
    year: 2021,
    category: 'Post-op',
    summary: 'Strongly recommends procedure-specific, opioid-sparing multimodal analgesia. Endorses the routine use of paracetamol, NSAIDs/COX-2 inhibitors, and regional blocks over systemic opioid-only strategies.'
  },
  {
    id: 'asa-moderate-sedation-2018',
    title: 'Guidelines for Moderate Procedural Sedation',
    source: 'ASA',
    year: 2018,
    category: 'Intra-op',
    summary: 'Mandates dedicated personnel strictly for monitoring ventilation and hemodynamics, immediately available reversal agents, and capnography monitoring to detect early respiratory depression.'
  },
  {
    id: 'esicm-ecmo-2021',
    title: 'Veno-Venous ECMO in Severe ARDS',
    source: 'ESICM',
    year: 2021,
    category: 'ICU',
    summary: 'Provides criteria for VV-ECMO initiation (e.g., PaO2/FiO2 < 50 for >3 hrs or < 80 for >6 hrs despite optimization) and standardizes ultra-protective mechanical ventilation settings once ECMO target flows are achieved.'
  },
  {
    id: 'oaa-cs-analgesia-2022',
    title: 'Analgesia for Caesarean Section',
    source: 'OAA',
    year: 2022,
    category: 'Obstetrics',
    summary: 'Recommends single-shot spinal anesthesia as the gold standard for elective sections. Focuses on intrathecal opioids (e.g., fentanyl and morphine) for extended postoperative analgesia and active prevention of spinal-induced hypotension.'
  },
  {
    id: 'acc-aha-perioperative-eval',
    title: 'Perioperative Cardiovascular Evaluation and Management',
    source: 'ACC',
    year: 2014,
    category: 'Pre-op',
    summary: 'Focuses on step-wise evaluation of patients undergoing noncardiac surgery. Emphasizes calculating RCRI or NSQIP risk, continuing beta-blockers in chronic users (but NOT initiating on day of surgery), and delaying elective surgery after acute MI (60 days) or bare-metal stent (30 days) vs drug-eluting stent (typically 6 months).'
  },
  {
    id: 'esaic-vte-prophylaxis',
    title: 'Perioperative Venous Thromboembolism (VTE) Prophylaxis',
    source: 'ESAIC',
    year: 2018,
    category: 'Pre-op',
    summary: 'Comprehensive approach to mechanical and pharmacological VTE prophylaxis. Stratifies risk by surgery type (Caprini score) and balances against bleeding risk. Strong recommendations for LMWH in high-risk general surgery and orthopedic patients.'
  },
  {
    id: 'erc-aha-als-2025',
    title: 'Advanced Life Support (ALS) Guidelines Updates',
    source: 'ERC',
    year: 2021,
    category: 'ICU',
    summary: 'Emphasizes high-quality continuous chest compressions, early defibrillation (for VF/pVT), and administration of epinephrine as soon as venous access is secured in non-shockable rhythms, or after the second shock for shockable rhythms. Highlights the role of point-of-care ultrasound (POCUS) to identify reversible causes during arrest.'
  },
  {
    id: 'asra-neuraxial-antithrombotics',
    title: 'Regional Anesthesia in the Patient Receiving Antithrombotic Therapy',
    source: 'ASRA',
    year: 2018,
    category: 'Intra-op',
    summary: 'Crucial timelines for neuraxial catheter placement and removal. Discontinue Clopidogrel 5-7 days prior, Ticagrelor 3-5 days prior. DOACs like Rivaroxaban/Apixaban require 72h hold. Prophylactic LMWH requires 12h hold, therapeutic LMWH requires 24h hold before neuraxial block.'
  },
  {
    id: 'asa-difficult-airway-2022',
    title: 'Difficult Airway Algorithm (2022 Update)',
    source: 'ASA',
    year: 2022,
    category: 'Airway',
    summary: 'Updated cognitive aid for managing both anticipated and unanticipated difficult airways. Key updates: (1) Videolaryngoscopy (VL) is recommended as a primary or first-attempt tool in patients with anticipated difficult airways. (2) Emphasis on pre-oxygenation / apneic oxygenation (HFNO) throughout. (3) Clear 4-plan framework (A: Oral intubation, B: Supraglottic airway, C: Bag-mask, D: Emergency Front of Neck Access/eFONA). (4) Scalpel-bougie-tube eFONA technique is the recommended rescue method. (5) A strict limit of 3 intubation attempts before escalating to the next plan is reinforced. Decision to wake the patient versus proceed via SAD is explicitly included in the algorithm.'
  },
  {
    id: 'kdigo-aki-periop',
    title: 'KDIGO AKI - Perioperative Renal Protection',
    source: 'ESICM',
    year: 2023,
    category: 'Renal',
    summary: 'KDIGO-aligned perioperative renal protection strategies: (1) Haemodynamic optimization: maintain MAP > 65-70 mmHg to protect renal autoregulation, particularly in patients with pre-existing CKD. (2) Fluid strategy: use balanced crystalloids (Plasmalyte or Hartmann\'s) over 0.9% NaCl to prevent hyperchloremic acidosis and renal vasoconstriction. (3) Avoid nephrotoxins: stop NSAIDs, ACEi/ARBs (24-48h pre-op), and aminoglycosides. Limit contrast volume; consider N-acetylcysteine and sodium bicarbonate pre-hydration for high-risk contrast procedures. (4) Monitor urinary output (target > 0.5 mL/kg/hr), creatinine, and electrolytes at 6-24h intervals post-op. (5) CRRT should be initiated if AEIOU criteria are met (Acidosis pH < 7.2, Electrolyte disturbance K+ > 6.5, Ingestion, Overload refractory, Uremia with encephalopathy).'
  },
  {
    id: 'aha-acc-dapt-2021',
    title: 'AHA/ACC 2021 Coronary Revascularization & DAPT Management',
    source: 'AHA',
    year: 2021,
    category: 'Cardiovascular',
    summary: 'Dual Antiplatelet Therapy (DAPT) perioperative management for patients with recent PCI or ACS: (1) Timing of surgery: Elective surgery should be deferred for a minimum of 1 month after bare-metal stenting and 6 months after drug-eluting stenting. If surgery is urgent, continue Aspirin throughout and resume P2Y12 inhibitors as soon as safely possible post-op. (2) Continue Aspirin perioperatively unless risk of surgical bleeding is prohibitive (e.g., neurosurgery, spine surgery). (3) Stopping P2Y12 inhibitors: Clopidogrel 5 days, Ticagrelor 3-5 days, Prasugrel 7 days before surgery to allow platelet recovery. (4) Bridging: IV Cangrelor or GP IIb/IIIa inhibitors are occasionally used as a bridge during the perioperative cessation window in very high-risk patients, in close consultation with cardiology. (5) Post-op: Resume P2Y12 inhibitors as soon as possible (ideally within 24-48h) to prevent stent thrombosis.'
  }
];

export interface Step {
  title: string;
  description: string;
  type: 'action' | 'decision' | 'warning' | 'info';
}

export interface GuidelineDiagram {
  id: string;
  title: string;
  source: 'ASA' | 'ESAIC' | 'ESICM' | 'OAA' | 'RCOG' | 'SOAP' | 'AHA' | 'ACC' | 'ASRA' | 'ERC' | 'CRISIS' | 'DAS';
  year: number;
  steps: Step[];
  link: string;
  isCrisis?: boolean;
  category?: 'crisis' | 'algorithm';
}

export const DIAGRAM_GUIDELINES: GuidelineDiagram[] = [
  {
    id: 'crisis-malignant-hyperthermia',
    title: 'Malignant Hyperthermia (MH) Emergency Rescue',
    source: 'CRISIS',
    year: 2024,
    isCrisis: true,
    category: 'crisis',
    link: 'https://www.mhaus.org/healthcare-professionals/mhaus-treatment-protocol/',
    steps: [
      { title: '1. Call for Help & Stop Triggers', description: 'Discontinue all volatile anesthetics and Succinylcholine. Call for MH Cart & senior help. Hyperventilate with 100% O2 at 10-15 L/min flow. Insert activated charcoal filters.', type: 'warning' },
      { title: '2. Dantrolene Administration', description: 'Administer Dantrolene 2.5 mg/kg IV push rapidly. Repeat 2.5 mg/kg q5-10m until hypermetabolism subsides (max dose 10 mg/kg). (For Ryanodex: 1 vial 250mg in 5ml sterile water).', type: 'action' },
      { title: '3. Active Cooling Protocol', description: 'Initiate active cooling for core temp > 38.5°C using iced cold saline 1000 mL IV, surface ice packs to axillae/groin, and cold gastric lavage. Stop cooling at 38.0°C.', type: 'action' },
      { title: '4. Treat Severe Hyperkalemia', description: 'Give Calcium Chloride 10 mg/kg IV, Glucose 50% 50 mL + Regular Insulin 10 IU IV, and Sodium Bicarbonate 1-2 mEq/kg for severe metabolic acidosis.', type: 'action' },
      { title: '5. Post-Crisis ICU Care', description: 'Monitor in ICU for 24-48h. Continue Dantrolene 1 mg/kg q6h. Check serial CK, myoglobinuria, TEG/coagulation panel for DIC, and maintain urine output > 2 mL/kg/h.', type: 'info' }
    ]
  },
  {
    id: 'crisis-last-rescue',
    title: 'Local Anesthetic Systemic Toxicity (LAST) Rescue',
    source: 'ASRA',
    year: 2024,
    isCrisis: true,
    category: 'crisis',
    link: 'https://www.asra.com/advisory-guidelines/local-anesthetic-systemic-toxicity-last',
    steps: [
      { title: '1. Stop LA & Call for LAST Kit', description: 'Immediately stop local anesthetic injection/infusion. Call for senior assistance and the LAST Rescue Kit containing 20% Lipid Emulsion.', type: 'warning' },
      { title: '2. Airway & Seizure Suppression', description: 'Hyperoxygenate with 100% O2. Suppress seizures using Benzodiazepines (Midazolam 0.05-0.1 mg/kg IV). Avoid Propofol if hemodynamically unstable.', type: 'action' },
      { title: '3. 20% Lipid Emulsion Bolus', description: 'Administer 20% Lipid Emulsion 1.5 mL/kg IV over 1 min (~100 mL bolus for 70 kg adult). Repeat bolus once or twice for persistent cardiovascular collapse.', type: 'action' },
      { title: '4. 20% Lipid Emulsion Infusion', description: 'Start 20% Lipid Emulsion continuous infusion at 0.25 mL/kg/min (~18 mL/min or 1000 mL/h). Double infusion rate to 0.5 mL/kg/min if hypotension persists.', type: 'action' },
      { title: '5. ACLS Modifications', description: 'Avoid Vasopressin, Calcium channel blockers, and Beta-blockers. Reduce Epinephrine boluses to small doses (< 1 mcg/kg or 10-100 mcg IV).', type: 'warning' }
    ]
  },
  {
    id: 'crisis-cico-efona',
    title: 'Can\'t Intubate, Can\'t Oxygenate (CICO) eFONA',
    source: 'DAS',
    year: 2022,
    isCrisis: true,
    category: 'crisis',
    link: 'https://das.uk.com/guidelines/',
    steps: [
      { title: '1. Declare CICO Emergency', description: 'Declare "Can\'t Intubate, Can\'t Oxygenate". Call for senior help and eFONA kit. Ensure 100% O2 via 2-person bag-mask with OPA/NPA.', type: 'warning' },
      { title: '2. Patient Neck Extension', description: 'Extend neck fully ("laryngeal handshake" position) to identify cricothyroid membrane (CTM).', type: 'action' },
      { title: '3. Scalpel Stab Incision', description: 'Perform transverse stab incision through CTM with #10 scalpel blade. Turn blade 90 degrees with cutting edge caudal.', type: 'action' },
      { title: '4. Bougie Insertion', description: 'Pass coudé-tip tracheostomy/endotracheal bougie alongside scalpel blade into trachea (advance 10-15 cm until feeling tracheal hold-up).', type: 'action' },
      { title: '5. Railroad ETT & Verify', description: 'Railroad a size 6.0 mm cuffed ETT over bougie into trachea. Inflate cuff, confirm EtCO2 wave, and secure tube.', type: 'action' }
    ]
  },
  {
    id: 'crisis-anaphylaxis-ga',
    title: 'Anaphylaxis Under General Anesthesia',
    source: 'ESAIC',
    year: 2023,
    isCrisis: true,
    category: 'crisis',
    link: 'https://www.esaic.org/anaphylaxis-guidelines',
    steps: [
      { title: '1. Immediate Trigger Cessation', description: 'Stop administration of all suspected causative agents (antibiotics, NMBDs, IV colloids, chlorhexidine, blood products).', type: 'warning' },
      { title: '2. 100% O2 & Discontinue Volatiles', description: 'Call for help. Increase O2 to 100% at high flow. Discontinue volatile anesthetics to avoid compounding vasodilation.', type: 'action' },
      { title: '3. Epinephrine IV Titration', description: 'Grade II (Moderate): Epinephrine 10-20 mcg IV. Grade III (Life-threatening): Epinephrine 100-200 mcg IV q1-2 min or infusion 0.05-0.4 mcg/kg/min. Grade IV: 1 mg IV.', type: 'warning' },
      { title: '4. Aggressive Fluid Resuscitation', description: 'Rapid IV bolus of 20-30 mL/kg balanced crystalloids (Plasma-Lyte/LR) to combat severe distributive vasodilation.', type: 'action' },
      { title: '5. Secondary Therapies & Tryptase', description: 'Hydrocortisone 200 mg IV + Chlorphenamine 10 mg IV. Draw Serum Tryptase sample 1 at 1-2h post-event and sample 2 at 24h.', type: 'info' }
    ]
  },
  {
    id: 'crisis-high-spinal',
    title: 'High / Total Spinal Anesthesia Rescue',
    source: 'ASA',
    year: 2023,
    isCrisis: true,
    category: 'crisis',
    link: 'https://pubs.asahq.org/anesthesiology',
    steps: [
      { title: '1. Early Recognition', description: 'Detect ascending sensory level above T4, sudden severe bradycardia, profound hypotension, aphonia, dyspnea, and loss of consciousness.', type: 'warning' },
      { title: '2. Positioning & Airway', description: 'Call for help. Maintain 15° left lateral tilt. Keep head slightly elevated to prevent further cephalad block spread while preserving venous return.', type: 'action' },
      { title: '3. Immediate Airway Control', description: 'Administer 100% O2 via bag-mask; perform rapid sequence endotracheal intubation if spontaneous respiration or airway reflexes fail.', type: 'action' },
      { title: '4. Hemodynamic Resuscitation', description: 'Ephedrine 10-15 mg IV or Phenylephrine 100 mcg IV. Escalate to Epinephrine 10-50 mcg IV for profound bradycardia/hypotension.', type: 'warning' },
      { title: '5. Atropine & Fluid Loading', description: 'Atropine 0.5-1.0 mg IV for bradycardia (HR < 50). Rapid crystalloid bolus 10-15 mL/kg. Continue mechanical ventilation until motor block regresses.', type: 'info' }
    ]
  },
  {
    id: 'crisis-massive-hemorrhage',
    title: 'Massive Hemorrhage Protocol (MHP)',
    source: 'ESAIC',
    year: 2023,
    isCrisis: true,
    category: 'crisis',
    link: 'https://journals.lww.com/ejanaesthesiology',
    steps: [
      { title: '1. MHP Activation', description: 'Call blood bank to trigger Massive Hemorrhage Protocol. Assign blood runner and transfusion controller.', type: 'warning' },
      { title: '2. Empiric 1:1:1 Transfusion', description: 'Transfuse Pack 1 (4 U PRBCs, 4 U FFP, 1 Pool Platelets) via rapid blood warmer/infuser.', type: 'action' },
      { title: '3. Antifibrinolytic Administration', description: 'Tranexamic Acid (TXA) 1g IV over 10 min immediately (within 3h of bleeding onset).', type: 'action' },
      { title: '4. Lethal Triad Prevention', description: 'Maintain temp > 36°C (forced air + warm fluids), pH > 7.20, and ionized Ca²⁺ > 1.1 mmol/L (administer 1g Calcium Chloride per 4 U blood).', type: 'action' },
      { title: '5. Viscoelastic Target Replacement', description: 'Guide with TEG/ROTEM: Fibrinogen concentrate 2-4g if FIBTEM A5 < 10mm (or fibrinogen < 1.5 g/L), PCC 25-50 IU/kg if EXTEM CT prolonged.', type: 'info' }
    ]
  },
  {
    id: 'crisis-delayed-emergence',
    title: 'Delayed Emergence / Unexplained Coma',
    source: 'ASA',
    year: 2024,
    isCrisis: true,
    category: 'crisis',
    link: 'https://pubs.asahq.org/anesthesiology',
    steps: [
      { title: '1. Ventilation & Temperature Check', description: 'Verify EtCO2, normocapnia, SpO2 > 98%, and core temp > 35.5°C.', type: 'action' },
      { title: '2. Quantitative Twitch Monitoring', description: 'Check TOF ratio at adductor pollicis using quantitative NMT monitor. Rule out residual neuromuscular block.', type: 'action' },
      { title: '3. Point-of-Care ABG / Electrolytes', description: 'Measure glucose (rule out severe hypoglycemia), PaCO2 (rule out CO2 narcosis > 70 mmHg), and Sodium (rule out hyponatremia).', type: 'action' },
      { title: '4. Targeted Pharmacological Reversal', description: 'Sugammadex 2-4 mg/kg IV for residual rocuronium; Naloxone 40-100 mcg IV for suspected opioid excess; Flumazenil 0.2 mg IV for suspected benzodiazepine excess.', type: 'warning' },
      { title: '5. Stat Neuroimaging', description: 'If unresponsive despite normal POCT labs and full reversal, order urgent non-contrast Head CT to rule out ischemic stroke, ICH, or cerebral edema.', type: 'info' }
    ]
  },
  {
    id: 'asa-difficult-airway',
    title: 'Difficult Airway Management (2022)',
    source: 'ASA',
    year: 2022,
    link: 'https://pubs.asahq.org/anesthesiology/article/136/1/31/117930/2022-American-Society-of-Anesthesiologists',
    steps: [
      { title: 'Pre-induction Optimization', description: 'Assess predictors (e.g., Mallampati > III, TMD < 6cm). Elevate head in ramping position. Pre-oxygenate aiming for ETO2 > 90% or SpO2 100% for 3 mins.', type: 'action' },
      { title: 'Plan A: Direct/Video Laryngoscopy', description: 'Limit to 3 attempts total (+1 by a more experienced colleague). Ensure full neuromuscular blockade before attempt. Use continuous videolaryngoscopy over DL.', type: 'action' },
      { title: 'Evaluate Oxygenation', description: 'Is oxygenation (SpO2 > 90%) maintained during attempts?', type: 'decision' },
      { title: 'Plan B: Supraglottic Airway (SAD)', description: 'Insert 2nd-generation LMA. Limit to 3 insertion attempts. If adequate ventilation achieved, consider waking the patient or proceeding via SAD intubation.', type: 'action' },
      { title: 'Plan C: Facemask Ventilation', description: 'Attempt two-person, four-hand bag-mask ventilation with OPA/NPA inserted. Maximize jaw thrust.', type: 'action' },
      { title: 'CICO Declared', description: 'Can\'t Intubate, Can\'t Oxygenate. Call for surgical help immediately. Prepare eFONA kit.', type: 'warning' },
      { title: 'Plan D: eFONA', description: 'Emergency Front of Neck Access. Scalpel-Bougie-Tube technique: Transverse stab of cricothyroid membrane, insert bougie, railroad size 6.0 cuffed tube.', type: 'warning' }
    ]
  },
  {
    id: 'esaic-bleeding',
    title: 'Management of Severe Perioperative Bleeding (2023)',
    source: 'ESAIC',
    year: 2023,
    link: 'https://journals.lww.com/ejanaesthesiology/fulltext/2023/04000/management_of_severe_perioperative_bleeding_.4.aspx',
    steps: [
      { title: 'Rapid Initial Management', description: 'Assess active bleeding rate. Insert 2x large-bore IVs (14G/16G). Activate Massive Hemorrhage Protocol (MHP).', type: 'action' },
      { title: 'Physiological Preservation', description: 'Aggressively treat the lethal triad: maintain normothermia (>36.0°C), correct acidemia (pH >7.20), and maintain ionized Ca2+ > 1.1 mmol/L (give 1g Calcium Chloride).', type: 'action' },
      { title: 'Viscoelastic Testing Trigger', description: 'Draw TEG/ROTEM immediately. Do not wait for standard coagulation labs (PT/aPTT) to initiate empiric MHP if exsanguinating.', type: 'decision' },
      { title: 'Antifibrinolytics', description: 'Administer Tranexamic Acid (TXA): 1g IV over 10 mins immediately, followed by 1g over 8 hours.', type: 'action' },
      { title: 'Fibrinogen First', description: 'If FIBTEM A5 < 10mm or fibrinogen < 1.5-2.0 g/L, administer 2-4g Fibrinogen Concentrate (or cryoprecipitate).', type: 'action' },
      { title: 'Factor/Platelet Replacement', description: 'If EXTEM CT > 80s, give PCC (25-50 IU/kg). If INTEM CT prolonged, consider FFP. Transfuse matched platelets if count < 50x10^9/L.', type: 'action' },
      { title: 'Surgical Control Mandate', description: 'If medical management fails and bleeding exceeds >150 mL/min, immediate surgical/interventional damage control is required.', type: 'warning' }
    ]
  },
  {
    id: 'esicm-sepsis',
    title: 'Surviving Sepsis Campaign (2026)',
    source: 'ESICM',
    year: 2026,
    link: 'https://www.esicm.org/surviving-sepsis-campaign-2026-guidelines/',
    steps: [
      { title: 'Immediate Recognition', description: 'Screen systemic signs (qSOFA/NEWS2). Complete the "1-Hour Bundle": Measure lactate, draw blood cultures BEFORE antibiotics, start broad-spectrum empirical therapy.', type: 'action' },
      { title: 'Fluid Resuscitation', description: 'Initial weight-based bolus: 30 mL/kg of balanced crystalloids (Plasma-Lyte/LR) within the first 3 hours for hypoperfusion or lactate > 4 mmol/L.', type: 'action' },
      { title: 'Dynamic Responsiveness', description: 'Is the patient fluid responsive based on PLR (Passive Leg Raise) + SV/VTI monitoring?', type: 'decision' },
      { title: 'Early Vasopressors', description: 'Start Noradrenaline early via peripheral IV (max 24h) to target MAP > 65 mmHg while central access is obtained. Add Vasopressin (0.03 U/min) if refractory.', type: 'action' },
      { title: 'Adjunctive Corticosteroids', description: 'If shock is refractory (requiring escalating NE doses > 0.25 mcg/kg/min), start IV Hydrocortisone 200mg/day as continuous infusion.', type: 'info' },
      { title: 'Metabolic & Source Control', description: 'Secure definitive source control (surgery, drainage) within 6-12 hours. Maintain strict glucose control (144-180 mg/dL).', type: 'warning' }
    ]
  },
  {
    id: 'asa-osa-2023',
    title: 'OSA Perioperative Management (2023)',
    source: 'ASA',
    year: 2023,
    link: 'https://pubs.asahq.org/anesthesiology/article/138/1/1/137452/Practice-Guidelines-for-the-Perioperative',
    steps: [
      { title: 'Preoperative Screening', description: 'Administer STOP-BANG questionnaire. A score > 5 indicates high risk. Ensure the patient brings their home CPAP machine continuously.', type: 'action' },
      { title: 'Anesthetic Strategy', description: 'Strict priority for Regional/Neuraxial anesthesia over General Anesthesia to avoid total airway collapse. Avoid deep sedation if unsecured airway.', type: 'action' },
      { title: 'Extubation Criteria', description: 'Patient must be fully awake, following commands, and reversed with TOF ratio > 0.9. Extubate strictly in a semi-upright (30+ degree) position.', type: 'warning' },
      { title: 'Postoperative Analgesia', description: 'Implement mandatory opioid-sparing multimodal analgesia: Ketamine, Dexmedetomidine, Paracetamol, Gabapentinoids.', type: 'action' },
      { title: 'Monitoring Duration', description: 'Continuous pulse oximetry or capnography monitoring post-op. Do not discharge from PACU until saturation remains > 92% on room air for > 2 hours.', type: 'decision' }
    ]
  },
  {
    id: 'esaic-nmb-2023',
    title: 'Neuromuscular Blockade Management (2023)',
    source: 'ESAIC',
    year: 2023,
    link: 'https://journals.lww.com/ejanaesthesiology/fulltext/2023/02000/european_society_of_anaesthesiology_and_intensive.4.aspx',
    steps: [
      { title: 'Quantitative Monitoring', description: 'Apply AMG/EMG quantitative monitor to the ulnar nerve measuring the adductor pollicis before induction.', type: 'action' },
      { title: 'Deep Block Criteria', description: 'Maintain PTC 1-2 only if specifically requested by surgeon for optimal view in laparoscopy.', type: 'info' },
      { title: 'Reversal Strategy Selection', description: 'Evaluate current block depth (TOF count vs PTC).', type: 'decision' },
      { title: 'Moderate Block Reversal', description: 'If TOF 1-3: Administer Sugammadex 2 mg/kg ideal body weight for Rocuronium/Vecuronium block.', type: 'action' },
      { title: 'Deep Block Reversal', description: 'If PTC 1-2: Administer Sugammadex 4 mg/kg ideal body weight. (16 mg/kg only for emergency rescue).', type: 'warning' },
      { title: 'Alternative Reversal', description: 'Neostigmine 40-50 mcg/kg + Glycopyrrolate ONLY if TOF ratio > 0.4. Do not use for deep blockade.', type: 'info' },
      { title: 'Safe Extubation Check', description: 'Strict extubation threshold: TOF ratio strictly > 0.9 (preferably 1.0) to prevent residual curarization.', type: 'warning' }
    ]
  },
  {
    id: 'esicm-brain-injury-2022',
    title: 'Acute Brain Injury Management (2022)',
    source: 'ESICM',
    year: 2022,
    link: 'https://www.esicm.org/acute-brain-injury-guidelines/',
    steps: [
      { title: 'Tier 1 Interventions', description: 'Head of bed elevated 30-45°. Strict normothermia (<37.5°C). Avoid jugular compression. Optimized sedation (Propofol) and analgesia.', type: 'action' },
      { title: 'Invasive Monitoring', description: 'Insert ICP monitor for GCS < 8 with abnormal CT. Target ICP strictly < 22 mmHg.', type: 'action' },
      { title: 'Refractory ICP Crisis', description: 'Does the ICP consistently stay > 22 mmHg for > 15 mins despite Tier 1?', type: 'decision' },
      { title: 'Tier 2 Escalation (Osmotherapy)', description: 'Administer Hypertonic Saline (e.g., 3% NaCl 250ml bolus) or Mannitol (0.5-1 g/kg). Consider CSF drainage via EVD.', type: 'action' },
      { title: 'Tier 3 Final Salvage', description: 'Consider Barbiturate Coma (Thiopental burst suppression), decompressive craniectomy, or targeted mild hypothermia.', type: 'warning' },
      { title: 'Perfusion Target', description: 'Maintain Cerebral Perfusion Pressure (CPP = MAP - ICP) between 60-70 mmHg. Use Vasopressors if needed.', type: 'info' }
    ]
  },
  {
    id: 'oaa-difficult-airway',
    title: 'Obstetric Difficult Airway Guidelines (2015)',
    source: 'OAA',
    year: 2015,
    link: 'https://www.oaa-anaes.ac.uk/Difficult_Airway_Guidelines',
    steps: [
      { title: 'Maternal Assessment', description: 'Assess airway acknowledging pregnancy-induced changes (edema, friability). Strict 30-degree head elevation. Apply cricoid pressure only if safely tolerated.', type: 'action' },
      { title: 'Induction Strategy', description: 'Pre-oxygenate to ETO2 > 90%. Use low-threshold for videolaryngoscopy on first attempt. Limit attempts to exactly 2.', type: 'action' },
      { title: 'Failed Intubation', description: 'If unable to intubate after 2 attempts, immediately declare Failed Intubation.', type: 'decision' },
      { title: 'Rescue Ventilation', description: 'Insert 2nd-generation SAD (e.g., i-Gel). Ensure SpO2 > 90%.', type: 'action' },
      { title: 'Maternal Resuscitation Override', description: 'If fetal distress is critical but airway is lost (CICO), maternal oxygenation massively supersedes fetal delivery. Execute eFONA immediately.', type: 'warning' },
      { title: 'Wake Up vs Proceed', description: 'If SAD is successful but intubation failed, discuss with obstetrician: either wake mother up safely OR proceed with surgery utilizing regional/SAD if extremely urgent.', type: 'decision' }
    ]
  },
  {
    id: 'rcog-pph',
    title: 'Prevention and Management of Postpartum Haemorrhage (2016)',
    source: 'RCOG',
    year: 2016,
    link: 'https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/prevention-and-management-of-postpartum-haemorrhage-green-top-guideline-no-52/',
    steps: [
      { title: 'Trigger Thresholds', description: 'Minor PPH: 500-1000 mL. Major PPH: > 1000 mL or signs of clinical shock. Call for senior help immediately.', type: 'action' },
      { title: 'The "Four Ts" Assessment', description: 'Determine cause: Tone (Uterine Atony - 70%), Trauma (Lacerations), Tissue (Retained Placenta), Thrombin (Coagulopathy).', type: 'decision' },
      { title: 'Pharmacological Uterotonics', description: 'Administer: Oxytocin 5 IU IV slow bolus + 40 IU in 500 mL infusion. Ergometrine 0.5 mg IM/IV (avoid in hypertension). Carboprost 0.25 mg IM q15m (max 8 doses, avoid in asthma). Misoprostol 800 mcg PR/SL.', type: 'action' },
      { title: 'Hemostatic Adjuncts', description: 'Administer Tranexamic Acid (TXA) 1g IV immediately, repeat if needed. Initiate MHP crossmatching 4-6 units PRBCs.', type: 'action' },
      { title: 'Mechanical Tamponade', description: 'Insert Intrauterine Balloon (Bakri) filled with 300-500 mL of saline. Apply bimanual compression while waiting.', type: 'action' },
      { title: 'Final Surgical Control', description: 'Proceed to laparotomy for B-Lynch compression sutures, uterine artery embolization, or definitive subtotal hysterectomy.', type: 'warning' }
    ]
  },
  {
    id: 'soap-pas',
    title: 'Anesthesia for Placenta Accreta Spectrum (PAS) (2023)',
    source: 'SOAP',
    year: 2023,
    link: 'https://www.soap.org/pas-guidelines',
    steps: [
      { title: 'Specialized Center Triage', description: 'Ensure birth takes place in a Level 3/4 maternal care center with interventional radiology, cell salvage, and urology readily available.', type: 'action' },
      { title: 'Massive Hemorrhage Prep', description: 'Minimum access: 2x 14G/16G peripheral IVs, central line. Pre-stage rapid infusor (Level 1/Belmont) and order uncrossmatched O-negative blood in the room.', type: 'warning' },
      { title: 'Anesthetic Selection', description: 'Neuraxial (Epidural/CSE) preferred for simple cases to allow patient binding; however, standard is converting to GETA for prolonged, massive hemorrhagic hysterectomies.', type: 'decision' },
      { title: 'Interventional Control', description: 'Consider prophylactic REBOA (Resuscitative Endovascular Balloon Occlusion of the Aorta) or Iliac balloon placement prior to incision.', type: 'action' },
      { title: 'Intra-Op Management', description: 'Utilize intra-operative cell salvage (auto-transfusion) heavily. Maintain fibrinogen > 2.0 g/L strictly early in the case.', type: 'info' }
    ]
  },
  {
    id: 'asa-regional-2021',
    title: 'Regional Anesthesia under Antithrombotic Therapy (2021)',
    source: 'ASA',
    year: 2021,
    link: 'https://pubs.asahq.org/anesthesiology/article/135/6/1020/117931/Regional-Anesthesia-in-the-Patient-Receiving',
    steps: [
      { title: 'Pre-Block Risk Assessment', description: 'Check patient PT/INR/aPTT and verify exact timeline of last anticoagulant/antiplatelet dose.', type: 'action' },
      { title: 'LMWH Prophylactic Dosing', description: 'Last dose must be > 12 hours prior to needle placement or epidural catheter removal.', type: 'warning' },
      { title: 'LMWH Therapeutic Dosing', description: 'Last dose must be strictly > 24 hours prior to needle placement or epidural catheter removal.', type: 'warning' },
      { title: 'DOACs Delay', description: 'Apixaban, Rivaroxaban, Dabigatran require a strict 72-hour delay (up to 5 days depending on renal function) before neuraxial block.', type: 'action' },
      { title: 'Post-Procedure Timing', description: 'Do not restart LMWH until exactly 4-6 hours post-catheter removal. Delay DOACs until 24 hours post-removal if high risk.', type: 'decision' },
      { title: 'Neurological Monitoring', description: 'Mandatory active surveillance for epidural hematoma. Monitor for back pain, progressive motor block, or bowel/bladder dysfunction.', type: 'info' }
    ]
  },
  {
    id: 'esaic-fluid-2022',
    title: 'Perioperative Goal-Directed Fluid Management (2022)',
    source: 'ESAIC',
    year: 2022,
    link: 'https://journals.lww.com/ejanaesthesiology/fulltext/2022/07000/esaic_guidelines_on_perioperative_goal_directed.1.aspx',
    steps: [
      { title: 'Basal Hydration Rate', description: 'Administer background maintenance crystalloids at a restrictive rate of 1-3 ml/kg/h for major surgeries.', type: 'action' },
      { title: 'Dynamic Responsiveness Test', description: 'For signs of hypoperfusion, use dynamic parameters (Pulse Pressure Variation [PPV] > 12%, Stroke Volume Variation [SVV]) if tidal volume > 8ml/kg and patient is closed-chest.', type: 'decision' },
      { title: 'Fluid Challenge Execution', description: 'Administer rapid 250ml IV fluid bolus (crystalloid/colloid) delivered over exclusively 5 minutes.', type: 'action' },
      { title: 'Volume Evaluator', description: 'Did Stroke Volume (SV) or Cardiac Output (CO) rise by more than > 10-15%?', type: 'decision' },
      { title: 'Fluid Responder', description: 'Patient is on steep portion of Starling curve. Allow further fluid challenges if hypoperfusion signs remain present.', type: 'info' },
      { title: 'Non-Responding Warning', description: 'Stop fluid loading. Patient is non-responsive. Switch immediately to Vasopressors (e.g., Norepinephrine) or Inotropes.', type: 'warning' }
    ]
  },
  {
    id: 'esicm-nutrition-2023',
    title: 'Nutritional Support in the Critically Ill (2023)',
    source: 'ESICM',
    year: 2023,
    link: 'https://www.esicm.org/nutrition-guidelines/',
    steps: [
      { title: 'Risk Stratification', description: 'Evaluate severity using NUTRIC score or NRS-2002 upon ICU admission.', type: 'action' },
      { title: 'Enteral Initiation Target', description: 'Start ultra-early Enteral Nutrition (EN) via NGT/OGT within 24-48 hours. Target 70% of resting energy expenditure slowly.', type: 'action' },
      { title: 'Monitoring Tolerance', description: 'Monitor Gastric Residual Volumes (GRV). Intervention required only if GRV > 500 mL/6hrs (e.g., start Metoclopramide/Erythromycin).', type: 'decision' },
      { title: 'Parenteral Nutrition Warning', description: 'Strictly avoid supplemental Parenteral Nutrition (PN) prior to Day 7 in ICU, as early PN increases infection rates and ICU mortality.', type: 'warning' },
      { title: 'Protein Delivery Mandate', description: 'Regardless of hypocaloric strategy, maintain high protein targets (1.2 to 2.0 g/kg/day) to prevent extensive critical illness myopathy.', type: 'info' }
    ]
  },
  {
    id: 'asa-peds-fasting-2023',
    title: 'Pediatric Fasting Guidelines: Updates for Clear Liquids (2023)',
    source: 'ASA',
    year: 2023,
    link: 'https://pubs.asahq.org/anesthesiology/article/138/2/132/136980/Practice-Guidelines-for-Preoperative-Fasting',
    steps: [
      { title: 'Solid Food & Heavy Meals', description: 'Completely stop fried foods, fatty meats, and heavy solids exactly 8 hours before the procedure.', type: 'warning' },
      { title: 'Light Meals & Formulas', description: 'Stop light meals (toast, clear liquids) and non-human infant formula precisely 6 hours prior.', type: 'action' },
      { title: 'Breast Milk Standard', description: 'Breast milk can be safely consumed up to 4 hours prior to elective induction.', type: 'info' },
      { title: 'Clear Liquids (The 1-Hour Rule)', description: 'Healthy children without GERD/Diabetes may actively consume CLEAR liquids (water, clear apple juice, no pulp) up to 1 hour before Anesthesia.', type: 'action' },
      { title: 'Comorbidity Veto', description: 'If the patient has delayed gastric emptying conditions (severe obesity, anatomic anomalies), override the 1-hour rule and revert to the traditional 2-hour clear liquid window.', type: 'decision' }
    ]
  },
  {
    id: 'soap-cardiac-arrest-2020',
    title: 'Management of Maternal Cardiac Arrest (2020)',
    source: 'SOAP',
    year: 2020,
    link: 'https://www.soap.org/maternal-cardiac-arrest',
    steps: [
      { title: 'Immediate Activation', description: 'Call Code Blue. Activate the Obstetric Emergency / Maternal Cardiac Arrest Team.', type: 'action' },
      { title: 'Hemodynamic Positioning', description: 'Manual Left Uterine Displacement (LUD) is critical. Pull uterus to the left to relieve massive aortocaval compression allowing venous return to heart.', type: 'warning' },
      { title: 'Modified CPR', description: 'Place hands slightly higher on the sternum (due to diaphragm elevation). Compress 100-120/min at least 5cm depth.', type: 'action' },
      { title: 'Airway & Defibrillation', description: 'Intubate early (pregnancy causes rapid desaturation). Defibrillation energy remains exactly the same as non-pregnant adults. Remove fetal monitors if shocking.', type: 'action' },
      { title: 'The 4-Minute Incision Trigger', description: 'If Return of Spontaneous Circulation (ROSC) is not achieved within exactly 4 minutes, the decision to perform Perimortem Cesarean Delivery (PMCD) MUST be made immediately.', type: 'decision' },
      { title: '5-Minute Delivery Goal', description: 'Execute Resuscitative Hysterotomy. Goal is baby delivered by minute 5. This is a resuscitative maneuver for the MOTHER.', type: 'warning' }
    ]
  },
  {
    id: 'rcog-eclampsia-2022',
    title: 'Management of Severe Preeclampsia and Eclampsia (2022)',
    source: 'RCOG',
    year: 2022,
    link: 'https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/management-of-hypertensive-disorders-of-pregnancy/',
    steps: [
      { title: 'Eclamptic Seizure Control', description: 'Immediately administer Magnesium Sulfate IV. Loading dose: 4g over 5-10 minutes. Maintenance: 1 g/hour IV infusion.', type: 'action' },
      { title: 'Recurrent Seizures', description: 'If seizures persist, give an additional 2g IV bolus of Magnesium Sulfate.', type: 'decision' },
      { title: 'Hypertension Management', description: 'Treat BP aggressively if > 160/110 mmHg. First-line therapies: IV Labetalol (20mg, then 40mg, max 300mg), IV Hydralazine, or Oral Nifedipine.', type: 'action' },
      { title: 'Toxicity Monitoring Check', description: 'Monitor for Mg2+ toxicity: loss of patellar reflexes (early sign), respiratory rate < 12/min, or oliguria < 30 mL/hr.', type: 'warning' },
      { title: 'Definitive Cure', description: 'Expedite delivery. The placenta must be delivered to resolve the pathophysiological cause. Do not delay if condition remains unstable.', type: 'action' }
    ]
  },
  {
    id: 'esaic-pain-2021',
    title: 'Postoperative Pain Management: Multimodal Approaches (2021)',
    source: 'ESAIC',
    year: 2021,
    link: 'https://journals.lww.com/ejanaesthesiology/fulltext/2021/01000/postoperative_pain_management.1.aspx',
    steps: [
      { title: 'PROSPECT Guidelines Match', description: 'Cross-reference procedure-specific evidence (e.g., using transversus abdominis plane blocks specifically for laparotomy).', type: 'info' },
      { title: 'Universal Baseline Analgesia', description: 'Unless strictly contraindicated, schedule IV Paracetamol 1g Q6H combined with an NSAID (Ibuprofen 400mg) or specific COX-2 inhibitor around the clock.', type: 'action' },
      { title: 'Locoregional First', description: 'Prioritize fascial plane blocks, neuraxial analgesia, or local wound infiltration utilizing long-acting anesthetics (e.g., Ropivacaine / Liposomal Bupivacaine) prior to systemic opioids.', type: 'action' },
      { title: 'Systemic Opioid Sparing', description: 'Introduce Ketamine infusions (0.15 mg/kg/h) or IV Lidocaine protocols to radically limit opioid requirement.', type: 'decision' },
      { title: 'Rescue Strategy', description: 'Reserve immediate-release opioids (Fentanyl/Morphine PO or IV PCA) exclusively for breakthrough VAS pain scores > 4/10.', type: 'warning' }
    ]
  },
  {
    id: 'asa-moderate-sedation-2018',
    title: 'Guidelines for Moderate Procedural Sedation (2018)',
    source: 'ASA',
    year: 2018,
    link: 'https://pubs.asahq.org/anesthesiology/article/128/3/437/18804/Practice-Guidelines-for-Moderate-Procedural',
    steps: [
      { title: 'Mandatory Resourcing', description: 'Assign an independent, fully-dedicated practitioner whose sole responsibility is monitoring depth of sedation and respiratory/hemodynamic variables.', type: 'warning' },
      { title: 'Continuous Assessment', description: 'Apply pulse oximetry tone, non-invasive BP (cycling every 5 minutes maximum), and ECG if patient has active cardiovascular disease.', type: 'action' },
      { title: 'Mandatory Capnography', description: 'Monitor ETCO2 actively via nasal cannula. Capnography detects early respiratory depression (apnea) far before pulse oximetry desaturation occurs.', type: 'action' },
      { title: 'Pharmacological Titration', description: 'Administer short-acting agents (Propofol/Fentanyl/Midazolam) in small, incremental doses. Allow 2-3 minutes for peak effect before re-dosing.', type: 'decision' },
      { title: 'Immediate Rescue Preparedness', description: 'Naloxone (0.04-0.4mg) and Flumazenil (0.2mg) must be drawn up, physically present, and immediately available in the room alongside an Ambu bag.', type: 'warning' }
    ]
  },
  {
    id: 'esicm-ecmo-2021',
    title: 'Veno-Venous ECMO in Severe ARDS (2021)',
    source: 'ESICM',
    year: 2021,
    link: 'https://www.esicm.org/vv-ecmo-guidelines/',
    steps: [
      { title: 'Pre-ECMO Optimization Exhaustion', description: 'Ensure exhaustive failure of medical therapies: Prone positioning > 16hr/day, continuous NMB infusion, and high PEEP alveolar recruitment maneuvers.', type: 'decision' },
      { title: 'EOLIA Trial Inclusion Criteria', description: 'Is PaO2/FiO2 < 50 for > 3 hours? OR PaO2/FiO2 < 80 for > 6 hours? OR severe acidemia (pH < 7.20) with PaCO2 > 80 mmHg despite RR 35?', type: 'action' },
      { title: 'Ultrasound Guided Cannulation', description: 'Utilize TEE/TTE during percutaneous placement (typically Right Femoral vein draining, Right Internal Jugular vein returning).', type: 'action' },
      { title: 'Initiate Ultra-Protective "Rest" Settings', description: 'Once ECMO flow sweeps efficiently, radically drop ventilator parameters to protect lungs: Tidal Volume 3-4 mL/kg, RR 10 bpm, PEEP 10-15 cmH2O, FiO2 < 40%.', type: 'warning' },
      { title: 'Hemocompatibility Check', description: 'Initiate systemic anticoagulation immediately (Heparin gtt) targeting an aPTT of 40-60 seconds or ACT of 160-180 seconds to prevent circuit thrombosis.', type: 'info' }
    ]
  },
  {
    id: 'oaa-cs-analgesia-2022',
    title: 'Analgesia for Caesarean Section (2022)',
    source: 'OAA',
    year: 2022,
    link: 'https://www.oaa-anaes.ac.uk/Analgesia_CS',
    steps: [
      { title: 'The Gold Standard Selection', description: 'Single-shot spinal anesthesia (Subarachnoid Block) is overwhelmingly established as the absolute standard of care over epidural or GETA for elective sections.', type: 'info' },
      { title: 'Intrathecal "Cocktail" Mixture', description: 'Standard hyperbaric Bupivacaine 0.5% (2.0-2.5 mL) mixed with Fentanyl (10-25 mcg) and strictly long-acting preservative-free Morphine (100-150 mcg) for prolonged 24h analgesia.', type: 'action' },
      { title: 'Hypotension Elimination Target', description: 'Immediately start prophylactic Phenylephrine infusion (25-50 mcg/min) concurrent with block placement. Maintain MAP > 90% of baseline. Prevent maternal nausea by stabilizing BP.', type: 'warning' },
      { title: 'Uterine Exteriorization Pain', description: 'If visceral pain occurs during uterine manipulation, do not jump to opioids. Administer IV Ondansetron and low-dose Ketamine or Nitrous Oxide first.', type: 'decision' },
      { title: 'Discharge Analgesic Taper', description: 'Provide multi-modal cocktail post-op. Standardize continuous PO Paracetamol 1g and Ibuprofen 600mg. Issue exactly 5-10 tabs of short-acting Oxycodone strictly for rescue.', type: 'action' }
    ]
  }
];
