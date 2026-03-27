export interface StaticGuideline {
  id: string;
  title: string;
  source: 'ASA' | 'ESAIC' | 'ESICM' | 'OAA' | 'RCOG' | 'SOAP' | 'AHA' | 'ACC' | 'ASRA' | 'ERC';
  year: number;
  category: string;
  summary: string;
}

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
  }
];
