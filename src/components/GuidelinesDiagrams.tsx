import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Step {
  title: string;
  description: string;
  type: 'action' | 'decision' | 'warning' | 'info';
}

interface GuidelineDiagram {
  id: string;
  title: string;
  source: 'ASA' | 'ESAIC' | 'ESICM' | 'OAA' | 'RCOG' | 'SOAP';
  year: number;
  steps: Step[];
  link: string;
}

const guidelines: GuidelineDiagram[] = [
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

export default function GuidelinesDiagrams() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { t } = useLanguage();

  const sortedGuidelines = [...guidelines].sort((a, b) => b.year - a.year);

  const getTypeStyles = (type: Step['type']) => {
    switch (type) {
      case 'action': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'decision': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'warning': return 'bg-rose-50 border-rose-200 text-rose-700';
      case 'info': return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const getTypeIcon = (type: Step['type']) => {
    switch (type) {
      case 'action': return <CheckCircle2 className="w-4 h-4" />;
      case 'decision': return <ChevronRight className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar List */}
      <div className="lg:col-span-4 space-y-3">
        {sortedGuidelines.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedId(g.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedId === g.id 
                ? 'bg-medical-primary text-white border-medical-primary shadow-md' 
                : 'bg-white text-slate-600 border-medical-border hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                selectedId === g.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {g.source}
              </span>
              <span className="text-[10px] opacity-60 font-medium">{g.year}</span>
            </div>
            <h3 className="font-bold text-sm leading-tight">{g.title}</h3>
          </button>
        ))}
      </div>

      {/* Diagram View */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {selectedId ? (
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl border border-medical-border shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-medical-border bg-slate-50 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 text-medical-accent text-xs font-bold uppercase tracking-widest mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    {t('common.visualAlgorithm')}
                  </div>
                  <h2 className="text-xl font-bold text-medical-primary">
                    {sortedGuidelines.find(g => g.id === selectedId)?.title}
                  </h2>
                </div>
                <a 
                  href={sortedGuidelines.find(g => g.id === selectedId)?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-medical-accent transition-colors"
                  title={t('common.viewFull')}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="p-8">
                <div className="relative space-y-8">
                  {sortedGuidelines.find(g => g.id === selectedId)?.steps.map((step, i, arr) => (
                    <div key={i} className="relative">
                      {/* Connector Line */}
                      {i < arr.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-100 -mb-8 flex flex-col items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-slate-300 rotate-90" />
                        </div>
                      )}

                      <div className={`flex items-start gap-4 p-4 rounded-xl border-2 ${getTypeStyles(step.type)}`}>
                        <div className="mt-1 p-2 rounded-lg bg-white/50">
                          {getTypeIcon(step.type)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-wide">{step.title}</h4>
                          <p className="text-sm opacity-90 mt-0.5">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <BookOpen className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-400">{t('common.selectGuideline')}</h3>
              <p className="text-sm text-slate-400 max-w-xs mt-1">
                {t('common.selectGuidelineDesc')}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
