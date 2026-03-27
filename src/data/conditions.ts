import { ConditionProtocol } from '../types';

export const CONDITIONS_DATA: ConditionProtocol[] = [
  {
    id: 'dka',
    name: 'Diabetic Ketoacidosis (DKA)',
    category: 'Endocrine > Metabolic',
    severity: 'urgent',
    diagnosis: [
      'Blood Glucose > 11 mmol/L (200 mg/dL)',
      'Venous pH < 7.3 or Bicarbonate < 15 mmol/L',
      'Ketonemia (Capillary ketones > 3 mmol/L) or Ketonuria (2+)'
    ],
    immediateActions: [
      'Fluid Resuscitation: 1L 0.9% NaCl over 1 hour',
      'Insulin Infusion: Fixed rate 0.1 units/kg/hr',
      'Potassium Replacement: Start if K+ < 5.5 mmol/L',
      'Monitor: Hourly glucose and ketones'
    ],
    secondaryManagement: [
      'Continue long-acting insulin if already on it',
      'Add 5% Glucose once BG < 14 mmol/L',
      'Switch to SC insulin once pH > 7.3 and eating'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride (Initial)', '5% Dextrose (when BG < 14 mmol/L)', '0.45% NaCl (if hypernatremic)'],
      targets: ['Systolic BP > 90 mmHg', 'Urine output > 0.5 mL/kg/hr', 'Resolution of ketosis'],
      monitoring: ['Hourly blood glucose', '2-hourly electrolytes (K+, Na+)', 'Fluid balance chart']
    },
    diagram: [
      { title: 'Confirm Diagnosis', description: 'Glucose >11 mmol/L, pH <7.3, Ketones >3 mmol/L. Assess for precipitating cause (infection, non-compliance, MI, or new-onset T1DM).', type: 'decision' },
      { title: 'Fluid Resuscitation', description: '1L 0.9% NaCl over 1 hour; then 250-500 mL/hr. Adjust based on clinical state, BP, and fluid balance. Aim for 3-6L deficit replacement over 24h.', type: 'action' },
      { title: 'Insulin Infusion', description: 'Fixed rate 0.1 units/kg/hr (max 15 units/hr); do not delay unless K+ <3.3. Target glucose fall of 3-5 mmol/L/hr and ketone fall of 0.5 mmol/L/hr.', type: 'action' },
      { title: 'Potassium Replacement', description: 'Maintain K+ 4.0-5.0; add 40 mmol/L to fluids if K+ <5.5. Monitor K+ every 1 hour initially, then every 2 hours.', type: 'warning' },
      { title: 'Hourly Monitoring', description: 'Check BG, ketones, and fluid balance every hour. Monitor venous pH, bicarbonate, and electrolytes every 2-4 hours.', type: 'info' },
      { title: 'Add 5% Glucose', description: 'Start 5% or 10% Glucose when BG <14 mmol/L to prevent hypoglycemia while continuing insulin to clear ketones.', type: 'decision' },
      { title: 'Resolution Criteria', description: 'pH >7.3, ketones <0.6 mmol/L, bicarbonate >15 mmol/L, and patient clinically stable and eating/drinking.', type: 'decision' },
      { title: 'Transition to SC', description: 'Overlap SC insulin with IV for 30-60 mins. Use basal-bolus regimen. Give fast-acting SC insulin with a meal before stopping IV.', type: 'action' }
    ],
    normalLabRanges: {
      'Blood Glucose': '4.0 - 7.0 mmol/L',
      'Venous pH': '7.35 - 7.45',
      'Bicarbonate': '22 - 28 mmol/L',
      'Serum Ketones': '< 0.6 mmol/L',
      'Potassium': '3.5 - 5.0 mmol/L',
      'Anion Gap': '8 - 12 mmol/L'
    }
  },
  {
    id: 'thyroid-storm',
    name: 'Thyroid Storm',
    category: 'Endocrine > Emergency',
    severity: 'critical',
    diagnosis: [
      'Burch-Wartofsky Score > 45 (Highly suggestive)',
      'Hyperthermia, Tachycardia (out of proportion to fever), Agitation/Delirium',
      'High T3/T4, Low TSH (though diagnosis is clinical)'
    ],
    immediateActions: [
      'Beta-blockade: Propranolol (blocks T4 to T3 conversion) or Esmolol',
      'Thionamides: PTU (preferred) or Methimazole (blocks new hormone synthesis)',
      'Iodine (Lugol\'s solution): Give 1h AFTER thionamides (Wolff-Chaikoff effect)',
      'Steroids: Hydrocortisone 100mg IV q8h (blocks T4 to T3 conversion)'
    ],
    secondaryManagement: [
      'Cooling measures (avoid aspirin as it displaces T4 from TBG)',
      'Treat precipitating cause (Infection, Surgery, Trauma, Iodine load)',
      'Plasmapheresis (if refractory)'
    ],
    ivFluidManagement: {
      choices: ['Normal Saline with 5% Dextrose (to replenish glycogen)', 'Aggressive fluid replacement'],
      targets: ['Correct dehydration', 'Maintain MAP > 65 mmHg', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Core temperature', 'Heart rate/rhythm (AF common)', 'Serum electrolytes']
    },
    diagram: [
      { title: 'Clinical Diagnosis', description: 'Do not wait for labs. Use Burch-Wartofsky criteria (Temp, HR, CNS, GI, CHF).', type: 'info' },
      { title: 'Step 1: Beta-block', description: 'Propranolol 60-80mg PO q4h or Esmolol infusion. Controls adrenergic symptoms.', type: 'action' },
      { title: 'Step 2: Thionamide', description: 'PTU 200mg q4h. Blocks synthesis AND peripheral conversion of T4 to T3.', type: 'action' },
      { title: 'Step 3: Iodine', description: 'Lugol\'s solution 5-10 drops q8h. MUST wait 1h after PTU to prevent "Jod-Basedow" effect.', type: 'warning' },
      { title: 'Step 4: Steroids', description: 'Hydrocortisone 100mg IV q8h. Treats relative adrenal insufficiency and blocks T4 conversion.', type: 'action' }
    ],
    normalLabRanges: {
      'TSH': '0.4 - 4.0 mIU/L',
      'Free T4': '12 - 22 pmol/L',
      'Temperature': '< 37.5 C'
    }
  },
  {
    id: 'cardiac-tamponade',
    name: 'Cardiac Tamponade',
    category: 'Cardiovascular > Critical Care',
    severity: 'critical',
    diagnosis: [
      'Beck\'s Triad: Hypotension, JVP distension, Muffled heart sounds',
      'Pulsus Paradoxus (>10mmHg drop in SBP on inspiration)',
      'Echo: Diastolic collapse of RV/RA'
    ],
    immediateActions: [
      'Fluid Bolus (Maintain preload)',
      'Avoid Positive Pressure Ventilation (decreases venous return)',
      'Emergency Pericardiocentesis',
      'Surgical Pericardial Window'
    ],
    secondaryManagement: [
      'Treat underlying cause (Trauma, Uremia, Malignancy)',
      'Monitor for recurrence',
      'Post-procedure Echo'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride', 'Balanced Crystalloids'],
      targets: ['Maintain RV preload', 'SBP > 90 mmHg', 'CVP 10-15 mmHg (pre-drainage)'],
      monitoring: ['Invasive arterial BP', 'CVP monitoring', 'Frequent Echo assessment']
    },
    diagram: [
      { title: 'Beck\'s Triad', description: 'Hypotension + JVP distension + Muffled Heart Sounds. Also look for Pulsus Paradoxus (>10mmHg drop in SBP on inspiration) and Kussmaul sign.', type: 'decision' },
      { title: 'Fluid Loading', description: 'Maintain RV filling pressure with 500-1000 mL crystalloid bolus. Avoid diuretics and positive pressure ventilation if possible.', type: 'action' },
      { title: 'Echo Guided', description: 'Confirm effusion and RV/RA diastolic collapse. Assess IVC distension (plethora) and respiratory variation in mitral/tricuspid flow.', type: 'action' },
      { title: 'Drainage', description: 'Emergency Pericardiocentesis (subxiphoid or apical) or Surgical Window. Use ultrasound guidance to minimize complications.', type: 'action' },
      { title: 'Post-Drainage', description: 'Monitor for recurrence and re-expansion pulmonary edema. Send fluid for cytology, culture, and biochemistry (LDH, protein).', type: 'info' }
    ],
    normalLabRanges: {
      'CVP': '2 - 6 mmHg',
      'SBP': '> 90 mmHg',
      'RV Diastolic Pressure': '2 - 8 mmHg'
    }
  },
  {
    id: 'anaphylaxis',
    name: 'Anaphylaxis (Perioperative)',
    category: 'Emergency > Resuscitation',
    severity: 'critical',
    diagnosis: [
      'Sudden Hypotension / Cardiovascular Collapse',
      'Bronchospasm / Increased Airway Pressures',
      'Skin changes (Rash, Urticaria) - often late or absent',
      'Angioedema'
    ],
    immediateActions: [
      'Stop Trigger (Latex, Antibiotics, NMBAs)',
      'Adrenaline: 10-50mcg IV (titrate) or 0.5mg IM',
      'Fluid: 20ml/kg crystalloid bolus',
      'Airway: 100% Oxygen, early intubation if needed'
    ],
    secondaryManagement: [
      'Antihistamines (Chlorphenamine)',
      'Steroids (Hydrocortisone 200mg or Methylprednisolone 40-80mg)',
      'Mast Cell Tryptase (Immediate, 2h, 24h)',
      'Allergy Clinic Referral'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids (Hartmann\'s or Plasmalyte)', '0.9% Sodium Chloride'],
      targets: ['MAP > 65 mmHg', 'Reversal of tachycardia', 'Improved peripheral perfusion'],
      monitoring: ['Continuous ECG', 'Non-invasive BP every 2-5 mins', 'Oxygen saturations']
    },
    diagram: [
      { title: 'Stop Trigger', description: 'Disconnect all infusions, remove latex, stop volatile agents if MH suspected. Inform surgeon to stop procedure if possible.', type: 'action' },
      { title: 'Adrenaline', description: 'IV bolus 10-50mcg (titrate to BP). If arrest, follow ACLS with 1mg doses. IM 0.5mg if no IV access. Start infusion if refractory.', type: 'action' },
      { title: 'Fluid Bolus', description: 'Aggressive volume replacement (20 mL/kg crystalloid) to counteract vasodilation and capillary leak. Use warm fluids if hypothermic.', type: 'action' },
      { title: 'Tryptase', description: 'Draw first sample immediately (within 1h), second at 2-4h, third at 24h for baseline. Label clearly with time of collection.', type: 'info' },
      { title: 'Secondary Meds', description: 'Chlorphenamine 10mg IV + Hydrocortisone 200mg IV (or Methylprednisolone 40-80mg). Consider Salbutamol nebs for bronchospasm and Glucagon if on Beta-blockers.', type: 'action' }
    ],
    normalLabRanges: {
      'Serum Tryptase': '2 - 14 mcg/L',
      'Mast Cell Tryptase (Peak)': '> (1.2 x baseline) + 2 mcg/L'
    }
  },
  {
    id: 'pheochromocytoma',
    name: 'Pheochromocytoma Crisis',
    category: 'Endocrine > Metabolic',
    severity: 'critical',
    diagnosis: [
      'Classic Triad: Episodic headache, sweating, tachycardia',
      'Severe Hypertension (>200/110 mmHg)',
      'Elevated plasma/urinary metanephrines'
    ],
    immediateActions: [
      'Alpha-Blockade FIRST: Phentolamine 1-5mg IV or Phenoxybenzamine',
      'Beta-Blockade SECOND: Only after adequate alpha-blockade',
      'Fluid Resuscitation: Correct volume depletion',
      'Vasodilators: Sodium Nitroprusside if needed'
    ],
    secondaryManagement: [
      'Surgical resection after 10-14 days of medical prep',
      'Maintain high salt diet pre-op',
      'Monitor for post-op hypoglycemia and hypotension'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride', 'High-salt diet (pre-op)'],
      targets: ['Correct chronic volume depletion', 'Target CVP 8-12 mmHg', 'Optimize stroke volume'],
      monitoring: ['Invasive arterial BP', 'CVP or SVV monitoring', 'Serial Hct (to monitor expansion)']
    },
    diagram: [
      { title: 'Alpha-Blocker', description: 'Phentolamine 1-5mg IV boluses or Phenoxybenzamine 10mg PO BD. Must block alpha receptors before beta to prevent hypertensive crisis.', type: 'action' },
      { title: 'Fluid Loading', description: 'Correct severe volume depletion caused by chronic vasoconstriction. Target CVP 8-12 mmHg or stroke volume optimization.', type: 'action' },
      { title: 'Beta-Blocker', description: 'ONLY after adequate alpha-blockade (usually 2-3 days) to control tachycardia. Propranolol or Atenolol are common choices.', type: 'warning' },
      { title: 'Vasodilators', description: 'Sodium Nitroprusside (0.5-5 mcg/kg/min) or Nicardipine infusion if SBP remains >160 mmHg despite alpha-blockade.', type: 'action' },
      { title: 'Surgery', description: 'Definitive adrenalectomy after 10-14 days of medical preparation, volume expansion, and high-salt diet.', type: 'action' }
    ],
    normalLabRanges: {
      'Plasma Metanephrines': '< 0.5 nmol/L',
      'Plasma Normetanephrines': '< 0.9 nmol/L',
      '24h Urine Metanephrines': '< 1.5 umol/24h',
      '24h Urine VMA': '< 35 umol/24h'
    }
  },
  {
    id: 'acute-hf',
    name: 'Acute Heart Failure / Pulmonary Edema',
    category: 'Cardiovascular > Cardiology',
    severity: 'urgent',
    diagnosis: [
      'Dyspnea, Orthopnea, PND',
      'Crackles on auscultation, S3 gallop',
      'CXR: Pulmonary venous congestion, Kerley B lines',
      'Elevated BNP/NT-proBNP'
    ],
    immediateActions: [
      'Oxygen / CPAP (Non-invasive ventilation)',
      'Diuretics: Furosemide 40-80mg IV',
      'Vasodilators: GTN infusion if SBP > 110',
      'Position: Sit patient upright'
    ],
    secondaryManagement: [
      'Identify trigger (Ischemia, Arrhythmia, Infection)',
      'Inotropes (Dobutamine/Milrinone) if cardiogenic shock',
      'Long-term ACEi/Beta-blocker titration'
    ],
    ivFluidManagement: {
      choices: ['Restrict fluids', 'Diuretics (Furosemide)'],
      targets: ['Negative fluid balance', 'Resolution of pulmonary crackles', 'Improved oxygenation'],
      monitoring: ['Strict fluid balance chart', 'Daily weights', 'Serum electrolytes (K+, Na+)']
    },
    diagram: [
      { title: 'Sit Upright', description: 'Decrease venous return (preload) and improve lung mechanics. Legs down if possible. High-flow O2 via non-rebreather mask.', type: 'action' },
      { title: 'Oxygen / CPAP', description: 'Maintain SpO2 > 94%. CPAP 5-10 cmH2O reduces preload, afterload, and work of breathing. Monitor for exhaustion.', type: 'action' },
      { title: 'IV Furosemide', description: '40-80mg IV (or 2.5x oral dose). Causes immediate venodilation followed by diuresis within 20-30 mins. Monitor K+.', type: 'action' },
      { title: 'Vasodilators', description: 'GTN infusion (start 10-20 mcg/min, titrate up) if SBP > 110 to reduce afterload and preload. Avoid if SBP < 90.', type: 'action' },
      { title: 'Inotropes', description: 'Dobutamine or Milrinone if cardiogenic shock (SBP < 90, poor perfusion) despite optimization. Consider IABP or Impella.', type: 'warning' }
    ],
    normalLabRanges: {
      'BNP': '< 100 pg/mL',
      'NT-proBNP': '< 300 pg/mL',
      'Troponin T': '< 14 ng/L',
      'SpO2': '94 - 98%'
    }
  },
  {
    id: 'malignant-hyperthermia',
    name: 'Malignant Hyperthermia (MH)',
    category: 'Anesthesia > Critical Care',
    severity: 'critical',
    diagnosis: [
      'Unexplained rise in ETCO2 (earliest sign)',
      'Tachycardia, Tachypnea',
      'Masseter muscle rigidity (after sux)',
      'Hyperthermia (late sign)',
      'Mixed respiratory/metabolic acidosis'
    ],
    immediateActions: [
      'Stop Volatile Anesthetics & Succinylcholine',
      'Hyperventilate with 100% O2 (High flows >10L/min)',
      'Dantrolene: 2.5 mg/kg IV (repeat up to 10mg/kg)',
      'Cooling: Cold IV fluids, surface cooling'
    ],
    secondaryManagement: [
      'Treat hyperkalemia (Insulin/Glucose, Calcium)',
      'Monitor for DIC and Myoglobinuria (maintain urine output)',
      'Transfer to ICU for 24-48h monitoring'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride', 'Cold IV fluids (4°C) for cooling'],
      targets: ['Urine output > 2 mL/kg/hr (prevent AKI)', 'Target temp < 38.5°C', 'Normal pH'],
      monitoring: ['Hourly urine output', 'Serum Creatine Kinase (CK)', 'Core temperature']
    },
    diagram: [
      { title: 'Stop Volatiles', description: 'Switch to TIVA (Propofol), change circuit/CO2 absorber if possible. Do not delay Dantrolene for circuit change.', type: 'action' },
      { title: 'Hyperventilate', description: '100% O2, high flows (>10L/min) to wash out agent and treat hypercapnia. Aim for ETCO2 in normal range.', type: 'action' },
      { title: 'Dantrolene', description: '2.5 mg/kg IV bolus immediately. Repeat every 5-10 mins until symptoms subside. Max dose 10mg/kg (more if needed).', type: 'action' },
      { title: 'Cool Patient', description: 'Cold IV fluids (4°C), surface cooling (ice to axilla/groin). Stop when temp < 38.5°C to avoid iatrogenic hypothermia.', type: 'warning' },
      { title: 'Treat Complications', description: 'Hyperkalemia (Calcium, Insulin/Glucose), Arrhythmias (avoid CCBs), and maintain urine output > 2mL/kg/hr.', type: 'info' }
    ],
    normalLabRanges: {
      'ETCO2': '4.5 - 6.0 kPa',
      'Creatine Kinase (CK)': '< 200 U/L',
      'Venous pH': '7.35 - 7.45',
      'Potassium': '3.5 - 5.0 mmol/L'
    }
  },
  {
    id: 'last',
    name: 'Local Anesthetic Systemic Toxicity (LAST)',
    category: 'Anesthesia > Critical Care',
    severity: 'critical',
    diagnosis: [
      'CNS: Perioral numbness, metallic taste, seizures, coma',
      'CVS: Arrhythmias, bradycardia, hypotension, cardiac arrest',
      'Often occurs within 1-5 mins of injection'
    ],
    immediateActions: [
      'Stop LA injection / infusion',
      'Airway Management: 100% O2, avoid hypercapnia',
      'Seizure Control: Benzodiazepines or low-dose Propofol',
      'Lipid Emulsion (20%): 1.5 mL/kg bolus over 1 min'
    ],
    secondaryManagement: [
      'Lipid Infusion: 0.25 mL/kg/min for at least 10 mins',
      'Avoid Vasopressin, Calcium Channel Blockers, Beta-Blockers',
      'Reduce Adrenaline dose (<1 mcg/kg) during ACLS'
    ],
    diagram: [
      { title: 'Stop LA', description: 'Immediate cessation of all local anesthetics. Call for LAST rescue kit and alert bypass/ECMO team if available.', type: 'action' },
      { title: 'Airway / O2', description: '100% O2. Prevent hypoxia, hypercapnia, and acidosis which worsen LA toxicity. Hyperventilate if needed.', type: 'action' },
      { title: 'Lipid 20%', description: '1.5 mL/kg bolus over 1 min + 0.25 mL/kg/min infusion. Repeat bolus up to 2 times if unstable. Max 12 mL/kg.', type: 'action' },
      { title: 'ACLS Mod', description: 'Low dose Adrenaline (<1mcg/kg), avoid Vasopressin, CCBs, and Beta-blockers. Prolonged CPR (>60 mins) may be needed.', type: 'warning' },
      { title: 'Seizure Control', description: 'Benzodiazepines preferred (Midazolam 2-5mg). Avoid large doses of Propofol if hemodynamically unstable.', type: 'action' }
    ],
    normalLabRanges: {
      'SpO2': '94 - 100%',
      'ETCO2': '4.5 - 6.0 kPa'
    }
  },
  {
    id: 'difficult-airway',
    name: 'Unanticipated Difficult Airway',
    category: 'Anesthesia > Airway',
    severity: 'critical',
    diagnosis: [
      'Failure to intubate after 1-2 attempts',
      'Poor view on laryngoscopy (Grade 3/4)',
      'Difficulty maintaining SpO2 with bag-mask'
    ],
    immediateActions: [
      'Call for Help early',
      'Maintain Oxygenation (Bag-mask or SAD)',
      'Limit Intubation Attempts (Max 3)',
      'Declare "Can\'t Intubate, Can\'t Oxygenate" (CICO) if needed'
    ],
    secondaryManagement: [
      'SAD (LMA) as a rescue device',
      'Wake patient up if elective',
      'Emergency Front of Neck Access (eFONA) if CICO'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids (Maintenance)'],
      targets: ['Euvolemia while NPO', 'Maintain BP during induction'],
      monitoring: ['Clinical assessment of hydration', 'Urine output']
    },
    diagram: [
      { title: 'Plan A: Intubate', description: 'Max 3 attempts (expert +1). Use bougie/stylet, optimize position (sniffing), consider VL. Maintain oxygenation between attempts.', type: 'decision' },
      { title: 'Plan B: SAD', description: 'Rescue with 2nd gen LMA if intubation fails. Max 3 attempts at placement. If successful, consider waking patient.', type: 'action' },
      { title: 'Plan C: Mask', description: 'Final attempt at bag-mask ventilation. Use 2-person technique, oral/nasal airways, and optimize neuromuscular blockade.', type: 'action' },
      { title: 'Plan D: eFONA', description: 'Scalpel-bougie-tube technique in the cricothyroid membrane if CICO declared. "Stab, Twist, Bougie, Tube".', type: 'warning' }
    ],
    normalLabRanges: {
      'SpO2': '> 94%',
      'ETCO2': '4.5 - 6.0 kPa'
    }
  },
  {
    id: 'sepsis-shock',
    name: 'Sepsis & Septic Shock',
    category: 'Intensive Care > Critical Care',
    severity: 'critical',
    diagnosis: [
      'Suspected Infection + Organ Dysfunction (SOFA score)',
      'Septic Shock: Lactate > 2 mmol/L + Vasopressor required',
      'Hypotension (MAP < 65 mmHg)'
    ],
    immediateActions: [
      'Measure Lactate level',
      'Obtain Blood Cultures (prior to antibiotics)',
      'Broad-spectrum Antibiotics (within 1 hour)',
      'Fluid Resuscitation: 30 mL/kg crystalloid'
    ],
    secondaryManagement: [
      'Vasopressors (Noradrenaline) to maintain MAP > 65',
      'Source Control (Surgery, Drainage, Line removal)',
      'Steroids (Hydrocortisone 200mg/day) if refractory to vasopressors',
      'Targeted therapy based on cultures'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids (Preferred)', 'Albumin 5% (if large volumes needed)'],
      targets: ['MAP 65-70 mmHg', 'Lactate clearance > 10% per 2h', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Invasive arterial BP', 'Central Venous Pressure (CVP)', 'ScvO2 (if available)']
    },
    diagram: [
      { title: 'Sepsis Six', description: 'Give: O2, IV Fluids, Abx. Take: Cultures, Lactate, Urine Output. Complete within 1 hour. Use a checklist.', type: 'action' },
      { title: 'Antibiotics', description: 'Administer broad-spectrum IV antibiotics within 60 mins. Tailor to source (e.g., Pip/Taz for abdominal). Review daily.', type: 'action' },
      { title: 'Fluid Bolus', description: '30 mL/kg crystalloid if hypotensive or lactate > 4. Assess for fluid responsiveness (PLR or SVV). Avoid over-resuscitation.', type: 'action' },
      { title: 'Vasopressors', description: 'Start Noradrenaline early via central line (or peripheral temporarily) if MAP < 65. Target MAP 65-70 mmHg.', type: 'decision' },
      { title: 'Source Control', description: 'Identify and treat source within 6-12 hours (drain abscess, remove infected lines, debride necrotic tissue).', type: 'info' }
    ],
    normalLabRanges: {
      'Lactate': '< 2.0 mmol/L',
      'WBC': '4.0 - 11.0 x10^9/L',
      'CRP': '< 5 mg/L',
      'Procalcitonin': '< 0.5 ng/mL',
      'MAP': '70 - 100 mmHg'
    }
  },
  {
    id: 'ards',
    name: 'ARDS Management',
    category: 'Intensive Care > Respiratory',
    severity: 'urgent',
    diagnosis: [
      'Acute onset (< 1 week)',
      'Bilateral opacities on CXR/CT',
      'PaO2/FiO2 ratio < 300 mmHg',
      'Not fully explained by heart failure'
    ],
    immediateActions: [
      'Lung Protective Ventilation (6 mL/kg PBW)',
      'Plateau Pressure < 30 cmH2O',
      'Conservative Fluid Strategy',
      'PEEP titration (High PEEP for moderate/severe)'
    ],
    secondaryManagement: [
      'Prone Positioning (16h/day) if P/F < 150',
      'Neuromuscular Blockade (Cisatracurium)',
      'Recruitment Maneuvers',
      'Consider ECMO if refractory'
    ],
    ivFluidManagement: {
      choices: ['Restrictive fluid strategy', 'Albumin (if hypoproteinemic)'],
      targets: ['Negative fluid balance', 'Improve P/F ratio', 'CVP 4-8 mmHg'],
      monitoring: ['Strict fluid balance', 'Daily weights', 'Extravascular Lung Water (EVLW) if available']
    },
    diagram: [
      { title: 'Low TV', description: 'Start at 6 mL/kg Predicted Body Weight. Target Plateau Pressure < 30 cmH2O and Driving Pressure < 15 cmH2O.', type: 'action' },
      { title: 'PEEP Titration', description: 'Use high PEEP strategy for moderate/severe ARDS. Monitor for barotrauma and hemodynamic compromise.', type: 'action' },
      { title: 'P/F < 150?', description: 'Yes -> Prone Position for 16-20h/day + Neuromuscular Blockade (Cisatracurium infusion).', type: 'decision' },
      { title: 'Prone 16h', description: 'Improves V/Q matching, recruits dorsal lung, and reduces ventilator-induced lung injury. Requires expert team for turning.', type: 'action' },
      { title: 'ECMO?', description: 'Consider VV-ECMO if P/F < 80 for > 6h despite optimization (CESAR/EOLIA criteria). Early referral is key.', type: 'info' }
    ],
    normalLabRanges: {
      'PaO2/FiO2 Ratio': '> 400 mmHg',
      'Plateau Pressure': '< 30 cmH2O',
      'Driving Pressure': '< 15 cmH2O',
      'pH': '7.35 - 7.45'
    }
  },
  {
    id: 'status-epilepticus',
    name: 'Status Epilepticus',
    category: 'Neurological > Emergency',
    severity: 'critical',
    diagnosis: [
      'Seizure lasting > 5 minutes (T1)',
      'Two or more seizures without full recovery of consciousness',
      'Non-convulsive status (requires EEG diagnosis)'
    ],
    immediateActions: [
      'ABC: Airway protection, high-flow O2, check glucose',
      'First-line: Benzodiazepines (Lorazepam 4mg IV or Midazolam 10mg IM)',
      'Second-line: Phenytoin (20mg/kg), Levetiracetam (60mg/kg), or Valproate (40mg/kg)',
      'Third-line: General Anesthesia (Propofol, Midazolam, or Thiopental)'
    ],
    secondaryManagement: [
      'EEG monitoring (continuous if possible)',
      'Identify underlying cause (Infection, Stroke, Metabolic, Drug withdrawal)',
      'Neuro-imaging (CT/MRI)'
    ],
    ivFluidManagement: {
      choices: ['Normal Saline', 'Avoid hypotonic fluids'],
      targets: ['Maintain MAP > 65 mmHg', 'Avoid cerebral edema', 'Euvolemia'],
      monitoring: ['Invasive BP (if on GA)', 'Serum electrolytes', 'Glucose']
    },
    diagram: [
      { title: 'Time is Brain', description: 'T1 (5 min): Start treatment. T2 (30 min): Risk of permanent neuronal injury.', type: 'warning' },
      { title: 'Initial Phase', description: 'Lorazepam 4mg IV (repeat once if needed). If no IV access: Midazolam 10mg IM.', type: 'action' },
      { title: 'Second Phase', description: 'Levetiracetam (60mg/kg, max 4.5g) or Phenytoin (20mg/kg, max 2g). Infuse over 15-20 mins.', type: 'action' },
      { title: 'Refractory Phase', description: 'If seizures continue > 30-60 mins, intubate and start Propofol or Midazolam infusion.', type: 'warning' },
      { title: 'EEG Goal', description: 'Burst suppression or complete seizure control on EEG. Monitor for 24-48h.', type: 'info' }
    ],
    normalLabRanges: {
      'Glucose': '4.0 - 7.0 mmol/L',
      'Sodium': '135 - 145 mmol/L',
      'Phenytoin Level': '10 - 20 mg/L'
    }
  },
  {
    id: 'tension-pneumothorax',
    name: 'Tension Pneumothorax',
    category: 'Emergency > Resuscitation',
    severity: 'critical',
    diagnosis: [
      'Respiratory Distress + Hypotension (Obstructive Shock)',
      'Tracheal deviation (away from affected side)',
      'Absent breath sounds + Hyper-resonance on percussion',
      'Distended neck veins'
    ],
    immediateActions: [
      'High-flow Oxygen',
      'Immediate Needle Decompression (2nd ICS MCL or 5th ICS AAL)',
      'Followed by Intercostal Chest Drain (ICD)'
    ],
    secondaryManagement: [
      'CXR to confirm re-expansion',
      'Analgesia for chest drain',
      'Monitor for re-expansion pulmonary edema'
    ],
    ivFluidManagement: {
      choices: ['Crystalloid Bolus (500mL) if hypotensive'],
      targets: ['SBP > 90 mmHg', 'Reversal of obstructive shock signs'],
      monitoring: ['Continuous ECG', 'Non-invasive BP (q2-5 mins)', 'SpO2']
    },
    diagram: [
      { title: 'Clinical Dx', description: 'Hypotension + Respiratory Distress + Tracheal Deviation + Absent Breath Sounds. Do NOT wait for CXR.', type: 'warning' },
      { title: 'Decompress', description: 'Large bore needle (14G) in 2nd ICS MCL or 5th ICS AAL. Listen for hiss of air. Leave in place until drain is in.', type: 'action' },
      { title: 'Chest Drain', description: 'Insert 28-32Fr drain (large for trauma, small for air) in "Safe Triangle". Confirm with bubbling and swing.', type: 'action' },
      { title: 'Confirm', description: 'Post-procedure CXR to confirm re-expansion and drain position. Monitor for re-expansion pulmonary edema.', type: 'info' }
    ],
    normalLabRanges: {
      'SpO2': '> 94%',
      'SBP': '> 90 mmHg'
    }
  },
  {
    id: 'aki',
    name: 'Acute Kidney Injury (AKI)',
    category: 'Intensive Care > Renal',
    severity: 'standard',
    diagnosis: [
      'Rise in Creatinine > 26.5 umol/L within 48h',
      'Rise in Creatinine > 1.5x baseline within 7 days',
      'Urine output < 0.5 mL/kg/h for 6 hours'
    ],
    immediateActions: [
      'Assess Fluid Status (Hypovolemia vs Overload)',
      'Review & Stop Nephrotoxic Drugs (NSAIDs, ACEi, Gentamicin)',
      'Urinary Catheterization to monitor output',
      'Urinalysis + Renal Ultrasound'
    ],
    secondaryManagement: [
      'Treat Hyperkalemia / Acidosis',
      'Optimize Hemodynamics (MAP > 65)',
      'Renal Replacement Therapy (RRT) if AEIOU criteria met'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids (avoid 0.9% NaCl if hyperchloremic)', 'Diuretics (only if overloaded)'],
      targets: ['Euvolemia', 'Maintain MAP > 65 mmHg', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Strict fluid balance', 'Daily weights', 'Serum electrolytes (K+, Na+, Cl-)']
    },
    diagram: [
      { title: 'Stage AKI', description: 'KDIGO criteria: Stage 1 (Cr 1.5-1.9x), Stage 2 (2-2.9x), Stage 3 (>3x or RRT). Monitor urine output (<0.5mL/kg/hr).', type: 'decision' },
      { title: 'Stop Toxins', description: 'Pause ACEi, ARBs, NSAIDs, Metformin, Gentamicin. Adjust all drug doses for current GFR. Avoid contrast.', type: 'action' },
      { title: 'Fluid Balance', description: 'Optimize preload with crystalloids if hypovolemic. Use diuretics ONLY if volume overloaded. Target MAP > 65.', type: 'action' },
      { title: 'RRT?', description: 'AEIOU: Acidosis (pH <7.2), Electrolytes (K+ >6.5), Ingestion, Overload (refractory), Uremia (Encephalopathy).', type: 'info' },
      { title: 'Renal Imaging', description: 'Urgent Renal Ultrasound within 24h to rule out obstruction (post-renal causes).', type: 'action' }
    ],
    normalLabRanges: {
      'Serum Creatinine': '60 - 110 umol/L',
      'Urea': '2.5 - 7.8 mmol/L',
      'Potassium': '3.5 - 5.0 mmol/L',
      'Urine Output': '> 0.5 mL/kg/hr'
    }
  },
  {
    id: 'pulmonary-embolism',
    name: 'Pulmonary Embolism (PE)',
    category: 'Cardiovascular > Emergency',
    severity: 'critical',
    diagnosis: [
      'Sudden onset dyspnea, pleuritic chest pain',
      'Tachycardia, Tachypnea, Hypoxia',
      'ECG: S1Q3T3 (rare), RBBB, T-wave inversion V1-V4',
      'Echo: RV strain / McConnell\'s sign'
    ],
    immediateActions: [
      'High-flow Oxygen',
      'Anticoagulation: Unfractionated Heparin (UFH) or LMWH',
      'Fluid Resuscitation (cautious, avoid RV overload)',
      'Thrombolysis (Alteplase) if hemodynamically unstable'
    ],
    secondaryManagement: [
      'Long-term anticoagulation (DOACs/Warfarin)',
      'IVC filter if anticoagulation contraindicated',
      'Thrombectomy (Surgical or Catheter-directed) if refractory'
    ],
    ivFluidManagement: {
      choices: ['Cautious Crystalloid Bolus (250-500mL)', 'Avoid over-resuscitation'],
      targets: ['Maintain RV preload without distension', 'SBP > 90 mmHg', 'MAP > 65 mmHg'],
      monitoring: ['Invasive arterial BP', 'CVP monitoring', 'Frequent Echo (RV size/function)']
    },
    diagram: [
      { title: 'Assess Risk', description: 'Wells Score or Geneva Score. D-dimer if low/intermediate probability. If high risk, proceed directly to imaging.', type: 'decision' },
      { title: 'Anticoagulate', description: 'Start LMWH (Enoxaparin 1.5mg/kg) or UFH immediately if suspicion high and no contraindications.', type: 'action' },
      { title: 'CTPA / VQ', description: 'Confirm diagnosis. CTPA is gold standard; VQ if renal failure (CrCl < 30) or severe contrast allergy.', type: 'action' },
      { title: 'Thrombolysis', description: 'Indicated for "Massive" PE (SBP < 90). Alteplase 100mg over 2h. Consider for "Submassive" if RV strain + biomarker rise.', type: 'warning' },
      { title: 'RV Support', description: 'Cautious fluids (250-500mL). Early vasopressors (Noradrenaline) to maintain RV perfusion pressure.', type: 'action' }
    ],
    normalLabRanges: {
      'D-dimer': '< 500 ng/mL',
      'Troponin T': '< 14 ng/L',
      'BNP': '< 100 pg/mL',
      'PaO2': '11 - 13 kPa'
    }
  },
  {
    id: 'hyperkalemia',
    name: 'Hyperkalemia',
    category: 'Endocrine > Metabolic',
    severity: 'critical',
    diagnosis: [
      'K+ > 5.5 mmol/L (Mild), > 6.0 (Moderate), > 6.5 (Severe)',
      'ECG: Peaked T-waves, PR prolongation, Wide QRS, Sine wave',
      'Muscle weakness, paralysis, arrhythmias'
    ],
    immediateActions: [
      'Calcium Gluconate/Chloride 10-30mL 10% (Stabilize membrane)',
      'Insulin (10 units) + Glucose (50mL 50%)',
      'Salbutamol Nebulizer (10-20mg)',
      'Sodium Bicarbonate (if metabolic acidosis)'
    ],
    secondaryManagement: [
      'Potassium binders (Patiromer, Lokelma)',
      'Loop Diuretics (Furosemide)',
      'Hemodialysis if refractory or severe AKI'
    ],
    ivFluidManagement: {
      choices: ['10% Calcium Gluconate (Stabilization)', '10% Dextrose (with Insulin)'],
      targets: ['Normalization of ECG', 'Serum K+ < 5.5 mmol/L', 'Euvolemia'],
      monitoring: ['Continuous ECG', 'Serial electrolytes (K+)', 'Blood glucose (if using insulin)']
    },
    diagram: [
      { title: 'ECG Changes?', description: 'Peaked T, Wide QRS, Sine Wave. If present, give Calcium immediately to protect heart membrane.', type: 'decision' },
      { title: 'Calcium IV', description: '10mL 10% Calcium Gluconate (or 10mL 10% Chloride via central line) over 5-10 mins. Repeat if ECG doesn\'t normalize.', type: 'action' },
      { title: 'Insulin/Glucose', description: '10 units Actrapid + 50mL 50% Dextrose (or 100mL 20%). Shifts K+ into cells. Onset 15-30 mins, duration 4-6h.', type: 'action' },
      { title: 'Salbutamol', description: '10-20mg via nebulizer. Synergistic with insulin. Avoid if tachycardic or ischemic heart disease.', type: 'action' },
      { title: 'Remove K+', description: 'Loop diuretics (Furosemide), K+ binders (Lokelma 10g TDS), or Hemodialysis for definitive removal.', type: 'info' }
    ],
    normalLabRanges: {
      'Potassium': '3.5 - 5.0 mmol/L',
      'ECG': 'Normal sinus rhythm'
    }
  },
  {
    id: 'massive-hemorrhage',
    name: 'Massive Hemorrhage Protocol (MHP)',
    category: 'Emergency > Resuscitation',
    severity: 'critical',
    diagnosis: [
      'Loss of > 50% blood volume in 3 hours',
      'Rate of loss > 150 mL/min',
      'Hypotension, Tachycardia, Poor perfusion'
    ],
    immediateActions: [
      'Activate MHP / Call for Blood',
      'Direct Pressure / Tourniquet / Surgical Control',
      'Tranexamic Acid (TXA) 1g bolus + 1g infusion',
      'Transfuse 1:1:1 (RBC:FFP:Platelets)'
    ],
    secondaryManagement: [
      'Maintain Normothermia (Fluid warmers)',
      'Correct Hypocalcemia (Calcium Chloride)',
      'Monitor TEG/ROTEM for targeted replacement'
    ],
    ivFluidManagement: {
      choices: ['Warm Crystalloids', 'Blood Products (RBC, FFP, Platelets)', 'Cryoprecipitate'],
      targets: ['MAP 65 mmHg (Permissive hypotension)', 'Temp > 36°C', 'Hb > 7-9 g/dL'],
      monitoring: ['Invasive arterial BP', 'Core temperature', 'Serial Coagulation/TEG']
    },
    diagram: [
      { title: 'Activate MHP', description: 'Call blood bank, specify "Massive Hemorrhage". Assign a dedicated runner and a protocol coordinator.', type: 'action' },
      { title: 'Stop Bleeding', description: 'Surgical, interventional radiology, or mechanical control (tourniquet/packing/REBOA).', type: 'action' },
      { title: 'TXA 1g', description: 'Give within 3 hours of injury. 1g bolus over 10 mins, then 1g over 8 hours (CRASH-2 trial).', type: 'action' },
      { title: '1:1:1 Ratio', description: 'Balanced transfusion (RBC:FFP:Platelets) to prevent dilutional coagulopathy. Aim for MAP 65 (permissive hypotension).', type: 'warning' },
      { title: 'Monitor Coag', description: 'Check FBC, PT/APTT, Fibrinogen every 30-60 mins. Use TEG/ROTEM for targeted therapy (Cryo/Prothrombinex).', type: 'info' }
    ],
    normalLabRanges: {
      'Hemoglobin': '130 - 170 g/L (M), 120 - 150 g/L (F)',
      'PT': '11 - 14 seconds',
      'aPTT': '25 - 35 seconds',
      'Fibrinogen': '2.0 - 4.0 g/L',
      'Platelets': '150 - 400 x10^9/L',
      'Ionized Calcium': '1.1 - 1.3 mmol/L'
    }
  },
  {
    id: 'stroke',
    name: 'Acute Ischemic Stroke',
    category: 'Neurological > Emergency',
    severity: 'critical',
    diagnosis: [
      'Sudden focal neurological deficit (FAST)',
      'NIHSS score assessment',
      'CT Brain (Non-contrast) to rule out hemorrhage'
    ],
    immediateActions: [
      'Maintain SpO2 > 94%',
      'Blood Glucose check (Rule out hypoglycemia)',
      'Thrombolysis (Alteplase) within 4.5h if eligible',
      'Thrombectomy within 6-24h for large vessel occlusion'
    ],
    secondaryManagement: [
      'Aspirin 300mg (after 24h if thrombolysed)',
      'Blood pressure management (SBP < 185/110 for lysis)',
      'Swallow assessment / NPO'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride (Euvolemia)', 'Avoid Dextrose (unless hypoglycemic)'],
      targets: ['Euvolemia', 'Blood Glucose 4-10 mmol/L', 'SBP < 185/110 (pre-lysis)'],
      monitoring: ['Strict fluid balance', 'Blood glucose', 'Neurological status']
    },
    diagram: [
      { title: 'FAST Positive', description: 'Face drooping, Arm weakness, Speech difficulty, Time to call emergency. Assess NIHSS score (0-42).', type: 'decision' },
      { title: 'CT Brain', description: 'Non-contrast CT to rule out hemorrhage. Perform within 20 mins of arrival. Consider CT Angiogram (CTA) for LVO.', type: 'action' },
      { title: 'Lysis Window', description: 'IV Alteplase (0.9mg/kg, max 90mg) if < 4.5 hours from "last seen well". Target BP < 185/110 before lysis.', type: 'decision' },
      { title: 'Thrombectomy', description: 'Mechanical thrombectomy for Large Vessel Occlusion (LVO) up to 24h in selected patients (DAWN/DEFUSE-3 criteria).', type: 'info' },
      { title: 'Post-Lysis', description: 'Monitor neuro status and BP every 15 mins for 2h. Maintain BP < 180/105. Delay antiplatelets for 24h.', type: 'warning' }
    ],
    normalLabRanges: {
      'Blood Glucose': '4.0 - 7.0 mmol/L',
      'Blood Pressure': '< 140/90 mmHg'
    }
  },
  {
    id: 'myasthenia-crisis',
    name: 'Myasthenic Crisis',
    category: 'Neurological > Critical Care',
    severity: 'critical',
    diagnosis: [
      'Worsening muscle weakness leading to respiratory failure',
      'Bulbar weakness (difficulty swallowing/speaking)',
      'Ptosis and Diplopia',
      'Triggered by infection, surgery, or medications'
    ],
    immediateActions: [
      'Early Intubation if respiratory effort is poor (VC < 15mL/kg, NIF < -20)',
      'Stop Anticholinesterases (Pyridostigmine) temporarily to reduce secretions',
      'Plasmapheresis (PLEX) or IVIG (2g/kg)',
      'High-dose Steroids (Methylprednisolone 500mg-1g or Prednisolone 60-80mg)'
    ],
    secondaryManagement: [
      'Identify and treat trigger (e.g., Antibiotics - avoid aminoglycosides)',
      'Chest physiotherapy and aspiration precautions',
      'Slow weaning from ventilation'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'Avoid aspiration'],
      monitoring: ['Vital Capacity (VC)', 'Negative Inspiratory Force (NIF)', 'Swallowing assessment']
    },
    diagram: [
      { title: 'Assess Airway', description: 'Check Vital Capacity (< 15mL/kg or 20% drop) and NIF (< -20 cmH2O). Monitor for "20/30/40" rule (VC <20, NIF <30, MEP <40).', type: 'decision' },
      { title: 'Intubate', description: 'Early elective intubation to avoid emergency crash. Use RSI with caution (avoid Sux, reduce NDMR dose).', type: 'action' },
      { title: 'PLEX / IVIG', description: 'Plasmapheresis (5-7 exchanges over 10-14 days) or IVIG (2g/kg over 2-5 days) to remove/neutralize antibodies.', type: 'action' },
      { title: 'Steroids', description: 'Start Prednisolone (60-80mg) or Methylprednisolone (500mg-1g) after PLEX/IVIG initiated to avoid initial transient weakness. Monitor for improvement.', type: 'warning' },
      { title: 'Treat Trigger', description: 'Identify and treat infection (avoid aminoglycosides, fluoroquinolones). Review all medications for NMJ interference.', type: 'info' }
    ],
    normalLabRanges: {
      'Vital Capacity (VC)': '> 60 mL/kg',
      'Negative Inspiratory Force (NIF)': '< -60 cmH2O',
      'Max Expiratory Pressure (MEP)': '> 60 cmH2O'
    }
  },
  {
    id: 'ponv',
    name: 'Post-Operative Nausea & Vomiting (PONV)',
    category: 'Anesthesia > Post-op',
    severity: 'standard',
    diagnosis: [
      'Nausea or vomiting in the PACU or ward',
      'Risk factors: Female, Non-smoker, History of PONV, Opioids'
    ],
    immediateActions: [
      'Ondansetron 4mg IV',
      'Dexamethasone 4-8mg IV (usually at induction)',
      'Droperidol 0.625mg IV',
      'Hydration (Crystalloids)'
    ],
    secondaryManagement: [
      'Acupressure (P6 point)',
      'Propofol TIVA (for future cases)',
      'Avoid Nitrous Oxide and Volatiles'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids (10-20 mL/kg)'],
      targets: ['Euvolemia', 'Reduction in nausea symptoms'],
      monitoring: ['Clinical assessment', 'Fluid balance']
    },
    diagram: [
      { title: 'Risk Score', description: 'Apfel Score: Female, Non-smoker, Hx of PONV/Motion Sickness, Post-op Opioids. 1 point each.', type: 'decision' },
      { title: 'Prophylaxis', description: 'Score 1-2: Dexamethasone 4-8mg. Score 3-4: Add Ondansetron 4mg + Droperidol 0.625mg. Consider TIVA.', type: 'action' },
      { title: 'Rescue Meds', description: 'Use different class (e.g., Cyclizine 50mg, Prochlorperazine 12.5mg, or low-dose Propofol) if prophylaxis fails.', type: 'action' },
      { title: 'Hydration', description: 'Ensure adequate IV crystalloids (10-20 mL/kg) and optimize analgesia (opioid-sparing) to reduce baseline nausea.', type: 'info' }
    ],
    normalLabRanges: {
      'Hydration Status': 'Euvolemic'
    }
  },
  {
    id: 'hypoglycemia',
    name: 'Severe Hypoglycemia',
    category: 'Endocrine > Metabolic',
    severity: 'urgent',
    diagnosis: [
      'Blood Glucose < 3.9 mmol/L (70 mg/dL)',
      'Whipple\'s Triad: Symptoms, Low BG, Relief with glucose',
      'Sweating, Tremor, Confusion, Seizures, Coma'
    ],
    immediateActions: [
      'If conscious: 15-20g rapid-acting carb (Juice, Tablets)',
      'If unconscious: 100mL 10% Glucose IV or 1mg Glucagon IM',
      'Re-check BG in 15 mins',
      'Long-acting carb once stable'
    ],
    secondaryManagement: [
      'Identify cause (Insulin error, Sepsis, Liver failure)',
      'Adjust insulin/oral hypoglycemics',
      'Continuous glucose monitoring'
    ],
    ivFluidManagement: {
      choices: ['10% Dextrose (100mL bolus)', '10% Dextrose infusion (if refractory)'],
      targets: ['Blood Glucose > 4.0 mmol/L', 'Resolution of neuroglycopenia'],
      monitoring: ['Frequent BG checks (q15-30 mins)', 'Serum K+ (if prolonged infusion)']
    },
    diagram: [
      { title: 'Check BG', description: 'Confirm < 3.9 mmol/L (70 mg/dL). Assess for neuroglycopenic symptoms (confusion, seizures, focal deficits).', type: 'decision' },
      { title: 'IV Glucose', description: '100mL 10% Dextrose (or 25-50mL 50% via large vein) over 5-10 mins. Repeat if BG remains <4.0.', type: 'action' },
      { title: 'Re-check 15m', description: 'Target BG > 4.0 mmol/L. Monitor for rebound hypoglycemia, especially with long-acting insulin or sulfonylureas.', type: 'action' },
      { title: 'Long-acting', description: 'Complex carbohydrate (e.g., toast, meal) once patient is alert. Consider 10% Dextrose infusion if refractory.', type: 'info' }
    ],
    normalLabRanges: {
      'Blood Glucose': '4.0 - 7.0 mmol/L'
    }
  },
  {
    id: 'raised-icp',
    name: 'Raised Intracranial Pressure (ICP)',
    category: 'Neurological > Critical Care',
    severity: 'critical',
    diagnosis: [
      'Headache, Vomiting, Papilledema',
      'Cushing\'s Triad: Hypertension, Bradycardia, Irregular breathing',
      'Decreased GCS, Dilated pupil (unilateral)'
    ],
    immediateActions: [
      'Head up 30 degrees',
      'Maintain Normocapnia (PaCO2 4.5-5.0 kPa)',
      'Hypertonic Saline (3-5%) or Mannitol (20%)',
      'Sedation / Muscle relaxation'
    ],
    secondaryManagement: [
      'Emergency CT Brain',
      'Neurosurgical consultation (EVD / Decompression)',
      'Target MAP to maintain CPP > 60 mmHg'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride', 'Hypertonic Saline (3-5%)', 'Mannitol (20%)'],
      targets: ['Euvolemia', 'Na+ 145-155 mmol/L', 'Serum Osmolality < 320 mOsm/kg'],
      monitoring: ['Serum Na+ (q4-6h)', 'Serum Osmolality', 'CVP or SVV']
    },
    diagram: [
      { title: 'Positioning', description: 'Head up 30°, Neutral neck position to optimize venous drainage. Avoid tight ETT ties and minimize suctioning.', type: 'action' },
      { title: 'Osmotherapy', description: 'Mannitol 0.5-1g/kg (monitor osmolar gap) or 3-5% Hypertonic Saline (250mL bolus). Target Na+ 145-155.', type: 'action' },
      { title: 'Ventilation', description: 'Maintain PaCO2 4.5-5.0 kPa. Brief hyperventilation (PaCO2 4.0) only for acute herniation. Avoid hypoxia.', type: 'action' },
      { title: 'Sedation', description: 'Deep sedation (Propofol/Fentanyl) to reduce CMRO2. Consider Thiopental coma if refractory to other measures.', type: 'warning' },
      { title: 'CT / Surgery', description: 'Urgent CT Brain. Neurosurgical intervention (EVD, Decompressive Craniectomy, or evacuation of mass) if indicated.', type: 'decision' }
    ],
    normalLabRanges: {
      'ICP': '< 15 mmHg',
      'CPP': '60 - 80 mmHg',
      'Sodium': '135 - 145 mmol/L',
      'Serum Osmolality': '275 - 295 mOsm/kg'
    }
  },
  {
    id: 'transfusion-reactions',
    name: 'Acute Transfusion Reactions (TRALI/TACO)',
    category: 'Emergency > Resuscitation',
    severity: 'urgent',
    diagnosis: [
      'TRALI: Acute lung injury within 6h of transfusion, Non-cardiogenic',
      'TACO: Pulmonary edema due to volume overload, High JVP',
      'Fever, Chills, Urticaria, Dyspnea'
    ],
    immediateActions: [
      'STOP Transfusion immediately',
      'ABC, Oxygen, Fluid support',
      'TACO: Diuretics (Furosemide)',
      'TRALI: Supportive ventilation, avoid diuretics'
    ],
    secondaryManagement: [
      'Notify Blood Bank',
      'Send transfusion bag + post-transfusion samples',
      'Antihistamines / Steroids for allergic reactions'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride (to maintain line)', 'Aggressive fluids for Hemolysis'],
      targets: ['Urine output > 1-2 mL/kg/hr (if hemolysis)', 'Euvolemia'],
      monitoring: ['Urine color/output', 'Serum K+', 'Coagulation profile']
    },
    diagram: [
      { title: 'Stop Blood', description: 'Disconnect transfusion immediately. Keep IV line open with 0.9% Saline using new administration set.', type: 'action' },
      { title: 'Assess Lungs', description: 'Crackles? JVP? TACO (overload) vs TRALI (injury). Check for fever, hives, or flank pain (hemolysis).', type: 'decision' },
      { title: 'TACO: Diuresis', description: 'IV Furosemide 20-40mg + Sit upright + Oxygen. Consider CPAP. Slow future transfusions.', type: 'action' },
      { title: 'TRALI: Support', description: 'Supportive ventilation (Low TV). Avoid diuretics. Notify blood bank to screen donor for HLA/HNA antibodies.', type: 'action' },
      { title: 'Hemolytic?', description: 'Check for ABO mismatch. Give aggressive fluids, maintain urine output, and monitor for DIC/Renal failure.', type: 'warning' }
    ],
    normalLabRanges: {
      'JVP': '6 - 8 cmH2O',
      'Temperature': '36.5 - 37.5 °C',
      'Urine Output': '> 0.5 mL/kg/hr'
    }
  },
  {
    id: 'anaphylaxis-periop',
    name: 'Perioperative Anaphylaxis',
    category: 'Anesthesia > Critical Care',
    severity: 'critical',
    diagnosis: [
      'Sudden hypotension, tachycardia, bronchospasm',
      'Skin: Rash, urticaria, angioedema (may be hidden by drapes)',
      'Increased airway pressures',
      'Decreased ETCO2 (due to low cardiac output)'
    ],
    immediateActions: [
      'Stop potential triggers (Antibiotics, Neuromuscular blockers, Latex)',
      'Call for Help',
      'Adrenaline: 50 mcg IV bolus (titrate) or 0.5mg IM',
      'Fluid Resuscitation: Large volume crystalloid (2-4L)'
    ],
    secondaryManagement: [
      'Hydrocortisone 200mg IV (or Methylprednisolone 40-80mg)',
      'Chlorphenamine 10mg IV',
      'Mast Cell Tryptase: Take samples at 1h, 4h, and 24h'
    ],
    diagram: [
      { title: 'Recognize', description: 'Hypotension + Bronchospasm + Rash. Be aware that rash may be hidden by drapes. Check for increased airway pressures.', type: 'decision' },
      { title: 'Stop Triggers', description: 'Cease all drugs, switch to TIVA (Propofol) if needed. Remove latex if present. Inform surgeon to stop/finish quickly.', type: 'action' },
      { title: 'Adrenaline', description: '50 mcg IV bolus, repeat as needed (titrate to SBP > 90). Start infusion (0.05-0.1 mcg/kg/min) if refractory.', type: 'action' },
      { title: 'Fluids', description: 'Aggressive volume expansion (20 mL/kg crystalloid). May need 2-4L in severe cases. Monitor for fluid overload.', type: 'action' },
      { title: 'Tryptase', description: 'Take samples at 1h, 4h, and 24h. First sample is for confirmation, second for peak, third for baseline.', type: 'info' }
    ],
    normalLabRanges: {
      'Serum Tryptase': '2 - 14 mcg/L',
      'ETCO2': '4.5 - 6.0 kPa'
    }
  },
  {
    id: 'hypernatremia',
    name: 'Hypernatremia',
    category: 'Intensive Care > Metabolic',
    severity: 'urgent',
    diagnosis: [
      'Na+ > 145 mmol/L',
      'Thirst, Dry mucous membranes, poor skin turgor',
      'Confusion, irritability, seizures, coma',
      'Assess volume status (Hypovolemic, Euvolemic, Hypervolemic)'
    ],
    immediateActions: [
      'Calculate Free Water Deficit: 0.6 x Weight x (Na/140 - 1)',
      'Correct Na+ slowly: Max 10 mmol/L per 24h (0.5 mmol/L/hr)',
      'Hypovolemic: 0.9% NaCl until stable, then 0.45% NaCl or 5% Dextrose',
      'Euvolemic (DI): Desmopressin if Central DI'
    ],
    secondaryManagement: [
      'Monitor Na+ every 4-6 hours',
      'Avoid rapid correction (Risk of Cerebral Edema)',
      'Treat underlying cause (e.g., stopping diuretics, treating DI)'
    ],
    ivFluidManagement: {
      choices: ['5% Dextrose', '0.45% Sodium Chloride', 'Enteral Water (via NGT/PO)'],
      targets: ['Na+ correction < 10 mmol/L per 24h', 'Euvolemia'],
      monitoring: ['Serum Na+ (q4-6h)', 'Urine Osmolality', 'Fluid balance']
    },
    diagram: [
      { title: 'Assess Volume', description: 'Hypo, Eu, or Hypervolemic? Check JVP, skin turgor, and urine osmolarity/Na+. Rule out Diabetes Insipidus.', type: 'decision' },
      { title: 'Free Water', description: 'Calculate deficit: 0.6 x Weight x (Na/140 - 1). Replace 50% of deficit in first 24 hours.', type: 'action' },
      { title: 'Slow Correction', description: 'Target < 0.5 mmol/L/hr decrease. Max 10 mmol/L/day to avoid cerebral edema. Use 5% Dextrose or 0.45% Saline.', type: 'warning' },
      { title: 'Monitor', description: 'Frequent Na+ checks (every 4-6h) to avoid overshoot. Monitor for neurological changes during correction.', type: 'info' }
    ],
    normalLabRanges: {
      'Sodium': '135 - 145 mmol/L',
      'Serum Osmolality': '275 - 295 mOsm/kg',
      'Urine Osmolality': '300 - 900 mOsm/kg'
    }
  },
  {
    id: 'acs',
    name: 'Acute Coronary Syndrome (ACS)',
    category: 'Cardiovascular > Cardiology',
    severity: 'critical',
    diagnosis: [
      'Ischemic chest pain, radiating to jaw/arm',
      'ECG: ST elevation (STEMI) or ST depression/T-wave inversion (NSTEMI)',
      'Elevated Troponin'
    ],
    immediateActions: [
      'Oxygen (if SpO2 < 94%)',
      'Aspirin 300mg + Ticagrelor/Clopidogrel',
      'GTN Sublingual or IV',
      'Morphine for pain'
    ],
    secondaryManagement: [
      'STEMI: Immediate PCI (within 90 mins) or Fibrinolysis',
      'NSTEMI: Risk stratify (GRACE score), Heparin/LMWH',
      'Beta-blockers, ACEi, Statins'
    ],
    ivFluidManagement: {
      choices: ['Cautious Crystalloids (if hypotensive)', 'Avoid overload'],
      targets: ['Euvolemia', 'MAP > 65 mmHg', 'Avoid pulmonary edema'],
      monitoring: ['Lung auscultation', 'Fluid balance', 'ECG']
    },
    diagram: [
      { title: 'ECG', description: 'STEMI (ST elevation in 2+ leads) vs NSTEMI (ST depression/T inversion). Perform within 10 mins of arrival.', type: 'decision' },
      { title: 'MONA', description: 'Morphine (2-5mg IV), Oxygen (if SpO2 < 94%), Nitrates (GTN SL or spray), Aspirin (300mg chewed).', type: 'action' },
      { title: 'STEMI -> PCI', description: 'Emergency cath lab activation. Target door-to-balloon time < 90 mins. Give P2Y12 inhibitor (Ticagrelor 180mg).', type: 'warning' },
      { title: 'NSTEMI -> Meds', description: 'Anticoagulation (Fondaparinux or LMWH) + DAPT (Ticagrelor). Risk stratify with GRACE score.', type: 'info' },
      { title: 'Secondary Prev', description: 'Start Beta-blocker, ACEi, High-intensity Statin, and Dual Antiplatelet Therapy (DAPT) for 12 months.', type: 'action' }
    ],
    normalLabRanges: {
      'Troponin T': '< 14 ng/L',
      'CK-MB': '< 5 ng/mL',
      'Blood Glucose': '4.0 - 7.0 mmol/L'
    }
  },
  {
    id: 'cap',
    name: 'Community-Acquired Pneumonia (CAP)',
    category: 'Respiratory > Infectious',
    severity: 'urgent',
    diagnosis: [
      'Cough, fever, pleuritic chest pain, dyspnea',
      'CXR: New focal consolidation (lobar or multi-lobar)',
      'CURB-65 Score: Confusion, Urea > 7, RR >= 30, BP < 90/60, Age >= 65',
      'Physical signs: Dullness to percussion, bronchial breathing, crackles',
      'Leukocytosis (WBC > 11) or Leukopenia (WBC < 4)',
      'Elevated CRP and Procalcitonin'
    ],
    immediateActions: [
      'Oxygen (target SpO2 94-98% or 88-92% in COPD)',
      'Antibiotics within 4h: Mild (Amoxicillin 1g TDS PO); Mod/Severe (Co-amoxiclav 1.2g TDS IV + Clarithromycin 500mg BD IV)',
      'Fluid resuscitation (30 mL/kg crystalloid) if hypotensive or lactate > 4',
      'Sputum and Blood Cultures (ideally before antibiotics)',
      'Urinary antigens for Legionella and Pneumococcus',
      'Assess for septic shock (NEWS2 / qSOFA)'
    ],
    secondaryManagement: [
      'Review antibiotics based on cultures (de-escalate if possible)',
      'Monitor for complications (Pleural effusion, Empyema, Lung abscess)',
      'If intubated: Lung-protective ventilation (TV 6 mL/kg PBW, Plateau < 30 cmH2O)',
      'Early mobilization and chest physiotherapy',
      'Follow-up CXR in 6 weeks to rule out underlying malignancy'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'MAP > 65 mmHg', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Fluid balance', 'BP/HR', 'Urine output']
    },
    diagram: [
      { title: 'CURB-65', description: 'C(onfusion), U(rea>7), R(R>30), B(P<90/60), 65(Age). Score 0-1: Outpatient. 2: Inpatient. 3+: Consider ICU.', type: 'decision' },
      { title: 'Antibiotics', description: 'Give within 4 hours. Amoxicillin (mild) or Amoxicillin + Macrolide (moderate/severe). Use Levofloxacin if penicillin allergic.', type: 'action' },
      { title: 'Oxygen', description: 'Titrate to 94-98% (or 88-92% in COPD). Consider NIV or HFNC if respiratory failure persists.', type: 'action' },
      { title: 'Cultures', description: 'Blood and sputum cultures before antibiotics. Urinary antigens for Legionella and Pneumococcus in moderate/severe cases.', type: 'info' }
    ],
    normalLabRanges: {
      'WBC': '4.0 - 11.0 x10^9/L',
      'CRP': '< 5 mg/L',
      'Urea': '2.5 - 7.8 mmol/L',
      'PaO2/FiO2 Ratio': '> 400 mmHg'
    }
  },
  {
    id: 'hap-vap',
    name: 'HAP / Ventilator-Associated Pneumonia (VAP)',
    category: 'Intensive Care > Respiratory',
    severity: 'urgent',
    diagnosis: [
      'New infiltrate on CXR after 48h in hospital/on ventilator',
      'Fever, purulent secretions, leukocytosis',
      'Decreased oxygenation (P/F ratio)'
    ],
    immediateActions: [
      'Tracheal aspirate or BAL for culture',
      'Broad-spectrum Antibiotics (Piperacillin/Tazobactam or Meropenem)',
      'Optimize ventilator settings',
      'Suctioning and oral care'
    ],
    secondaryManagement: [
      'De-escalate antibiotics based on sensitivities',
      'Head of bed 30-45 degrees',
      'Daily sedation vacation and weaning assessment'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids', 'Restrictive strategy once stable'],
      targets: ['Euvolemia', 'Avoid positive fluid balance', 'Optimize oxygenation'],
      monitoring: ['Fluid balance', 'Daily weights', 'CVP (if available)']
    },
    diagram: [
      { title: 'New Infiltrate', description: 'CXR/CT + fever/purulent secretions after 48h in hospital. Assess severity and risk for MDR organisms.', type: 'decision' },
      { title: 'BAL / Aspirate', description: 'Obtain deep respiratory sample for microbiology before changing antibiotics. Consider Gram stain to guide therapy.', type: 'action' },
      { title: 'Empiric Abx', description: 'Broad-spectrum (Pip/Taz 4.5g q6h or Meropenem 1g q8h). Add Vancomycin or Linezolid if MRSA risk.', type: 'action' },
      { title: 'VAP Bundle', description: 'HOB 30-45°, oral chlorhexidine, subglottic suction, daily sedation vacation, and DVT/stress ulcer prophylaxis.', type: 'info' }
    ],
    normalLabRanges: {
      'WBC': '4.0 - 11.0 x10^9/L',
      'CRP': '< 5 mg/L',
      'Procalcitonin': '< 0.5 ng/mL',
      'PaO2/FiO2 Ratio': '> 400 mmHg'
    }
  },
  {
    id: 'aspiration-pneumonia',
    name: 'Aspiration Pneumonia',
    category: 'Respiratory > Critical Care',
    severity: 'urgent',
    diagnosis: [
      'History of witnessed aspiration or risk factors (GCS < 8, dysphagia)',
      'CXR: Consolidation in dependent segments (RLL, RUL)',
      'Fever, cough, hypoxemia'
    ],
    immediateActions: [
      'Suctioning of oropharynx',
      'Oxygen / Respiratory support',
      'Antibiotics: Amoxicillin-Clavulanate or Metronidazole + Ceftriaxone',
      'NPO / Speech therapy consult'
    ],
    secondaryManagement: [
      'Positioning (Head up)',
      'Optimize gastric emptying',
      'Chest physiotherapy'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids', 'Avoid over-hydration (prevent ARDS)'],
      targets: ['Euvolemia', 'MAP > 65 mmHg', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Fluid balance', 'Lung auscultation', 'Oxygen saturations']
    },
    diagram: [
      { title: 'Risk Factors', description: 'Decreased GCS, vomiting, swallowing issues (stroke/dementia), poor dental hygiene, or supine positioning.', type: 'decision' },
      { title: 'Suction', description: 'Clear oropharynx immediately. Consider bronchoscopy if solid food aspirated or if there is persistent collapse.', type: 'action' },
      { title: 'Antibiotics', description: 'Amoxicillin-Clavulanate 1.2g q8h. Cover anaerobes (Metronidazole) if putrid sputum or lung abscess suspected.', type: 'action' },
      { title: 'Prevention', description: 'HOB 30°, feeding assessment (SALT), prokinetics, avoid over-sedation, and optimize oral hygiene.', type: 'info' }
    ],
    normalLabRanges: {
      'WBC': '4.0 - 11.0 x10^9/L',
      'CRP': '< 5 mg/L',
      'PaO2/FiO2 Ratio': '> 400 mmHg'
    }
  },
  {
    id: 'c-diff',
    name: 'Clostridioides difficile (C. diff)',
    category: 'Gastrointestinal > Infectious',
    severity: 'standard',
    diagnosis: [
      'Profuse watery diarrhea (3+ loose stools in 24h)',
      'Recent antibiotic use',
      'C. diff toxin/GDH positive in stool',
      'Leukocytosis, abdominal pain'
    ],
    immediateActions: [
      'Isolate patient (Contact precautions)',
      'Stop inciting antibiotics if possible',
      'Oral Vancomycin 125mg qid or Fidaxomicin',
      'Monitor for toxic megacolon'
    ],
    secondaryManagement: [
      'IV Metronidazole if severe/complicated',
      'Surgical consult if peritonitis or megacolon',
      'Hand hygiene with soap and water (alcohol gel ineffective)'
    ],
    diagram: [
      { title: 'Toxin Test', description: 'Confirm C. diff toxin or GDH in loose stool. Do not test formed stools. Repeat testing is not recommended.', type: 'decision' },
      { title: 'Isolation', description: 'Contact precautions (gloves/gown) + soap and water hand wash. Use chlorine-based cleaners for the environment.', type: 'action' },
      { title: 'Oral Vanco', description: '125mg QID for 10 days. Fidaxomicin 200mg BD is preferred if high risk of recurrence. Avoid anti-motility agents.', type: 'action' },
      { title: 'Monitor', description: 'Watch for toxic megacolon (distension, pain, WBC >15, Cr >133). Urgent surgical review if peritonitis or megacolon.', type: 'warning' }
    ],
    normalLabRanges: {
      'WBC': '4.0 - 11.0 x10^9/L',
      'Serum Creatinine': '60 - 110 umol/L',
      'Albumin': '35 - 50 g/L'
    }
  },
  {
    id: 'paracetamol-od',
    name: 'Paracetamol (Acetaminophen) Overdose',
    category: 'Emergency > Toxicology',
    severity: 'urgent',
    diagnosis: [
      'History of ingestion',
      'Nausea, vomiting, RUQ pain',
      'Elevated ALT/AST (late), Jaundice',
      'Paracetamol level (check at 4h post-ingestion)'
    ],
    immediateActions: [
      'Activated Charcoal (if within 1 hour)',
      'N-Acetylcysteine (NAC) based on nomogram',
      'Monitor LFTs, INR, Creatinine',
      'Psychiatric evaluation'
    ],
    secondaryManagement: [
      'Liver transplant consult if King\'s College Criteria met',
      'Supportive care for liver failure',
      'Monitor for hypoglycemia and acidosis'
    ],
    diagram: [
      { title: 'Check Level', description: 'Check at 4h post-ingestion (or immediately if >4h). Plot on nomogram. Check ALT, INR, and Creatinine.', type: 'decision' },
      { title: 'Nomogram', description: 'Determine if NAC is required based on the 100mg/L treatment line. If ingestion time unknown, start NAC.', type: 'decision' },
      { title: 'NAC Infusion', description: 'N-Acetylcysteine IV. 3-stage infusion (21 hours). Monitor for anaphylactoid reaction (slow infusion if occurs).', type: 'action' },
      { title: 'Monitor LFTs', description: 'Watch for ALT rise, INR > 1.3, and encephalopathy. Monitor Creatinine for AKI. Check King\'s College Criteria.', type: 'info' },
      { title: 'King\'s Criteria', description: 'pH <7.3 OR (INR >6.5 + Cr >300 + Encephalopathy). If met, urgent referral for liver transplant.', type: 'warning' }
    ],
    normalLabRanges: {
      'Paracetamol Level': '0 (Undetectable)',
      'ALT': '10 - 40 U/L',
      'INR': '0.8 - 1.2',
      'Serum Creatinine': '60 - 110 umol/L'
    }
  },
  {
    id: 'opioid-od',
    name: 'Opioid Overdose',
    category: 'Emergency > Toxicology',
    severity: 'critical',
    diagnosis: [
      'Pinpoint pupils (Miosis)',
      'Respiratory depression (RR < 8-10)',
      'Decreased GCS / Coma',
      'Needle marks / History'
    ],
    immediateActions: [
      'Airway / Bag-mask ventilation',
      'Naloxone: 400 mcg IV/IM (titrate to RR)',
      'Oxygen support',
      'Check Blood Glucose'
    ],
    secondaryManagement: [
      'Monitor for rebound toxicity (Naloxone has short half-life)',
      'Watch for non-cardiogenic pulmonary edema',
      'Observation for 6-12h (longer for long-acting opioids)'
    ],
    diagram: [
      { title: 'RR < 10?', description: 'Assess for respiratory failure, pinpoint pupils, and decreased GCS. Check for needle marks or patches.', type: 'decision' },
      { title: 'Ventilate', description: 'Support with BVM and 100% O2. Protect airway if GCS is low. Aim for RR > 12 and SpO2 > 94%.', type: 'action' },
      { title: 'Naloxone', description: '400mcg IV/IM/SC. Titrate in 100-200mcg increments to restore respiratory effort rather than full consciousness.', type: 'action' },
      { title: 'Observation', description: 'Watch for rebound sedation (Naloxone half-life 30-60 mins). Monitor for non-cardiogenic pulmonary edema.', type: 'warning' }
    ],
    normalLabRanges: {
      'Respiratory Rate': '12 - 20 breaths/min',
      'SpO2': '> 94%',
      'Blood Glucose': '4.0 - 7.0 mmol/L'
    }
  },
  {
    id: 'bb-ccb-toxicity',
    name: 'Beta-Blocker / CCB Toxicity',
    category: 'Emergency > Toxicology',
    severity: 'critical',
    diagnosis: [
      'Bradycardia, Hypotension, Heart block',
      'CCB: Hyperglycemia (inhibits insulin release)',
      'BB: Hypoglycemia (sometimes)',
      'Decreased contractility / Cardiogenic shock'
    ],
    immediateActions: [
      'Atropine 0.5-1mg IV',
      'Calcium Gluconate/Chloride (especially for CCB)',
      'Glucagon 5-10mg IV (especially for BB)',
      'High-Dose Insulin Euglycemic Therapy (HIET)'
    ],
    secondaryManagement: [
      'Vasopressors (Adrenaline/Noradrenaline)',
      'Intralipid therapy',
      'Pacing (Transcutaneous or Transvenous)',
      'ECMO in refractory cases'
    ],
    diagram: [
      { title: 'Bradycardia', description: 'Assess hemodynamics, rhythm, and glucose. CCB often causes hyperglycemia; BB may cause hypoglycemia.', type: 'decision' },
      { title: 'Calcium / Glucagon', description: 'Calcium (10-20mL 10% Gluconate) for CCB. Glucagon (5-10mg IV) for BB. Follow with infusion if responsive.', type: 'action' },
      { title: 'HIET', description: 'High-dose insulin (1 unit/kg bolus + 1-10 units/kg/hr) + 50% Dextrose to maintain euglycemia. Monitor K+ hourly.', type: 'action' },
      { title: 'Pacing / ECMO', description: 'Transcutaneous/transvenous pacing if meds fail. Consider VA-ECMO or IABP for refractory cardiogenic shock.', type: 'warning' }
    ],
    normalLabRanges: {
      'Blood Glucose': '4.0 - 7.0 mmol/L',
      'Potassium': '3.5 - 5.0 mmol/L',
      'Ionized Calcium': '1.1 - 1.3 mmol/L'
    }
  },
  {
    id: 'upper-gi-bleeding',
    name: 'Upper Gastrointestinal Bleeding (UGIB)',
    category: 'Gastrointestinal > Emergency',
    severity: 'critical',
    diagnosis: [
      'Hematemesis (bright red or coffee-ground)',
      'Melena (black, tarry stools)',
      'Hematochezia (if massive bleeding)',
      'Signs of hypovolemia (tachycardia, hypotension)',
      'Glasgow-Blatchford Score (GBS) for risk stratification'
    ],
    immediateActions: [
      'ABCs: Protect airway if massive hematemesis or decreased GCS',
      'Two large-bore IV cannulae (14-16G)',
      'Fluid resuscitation to maintain hemodynamics',
      'Cross-match (4-6 units), check FBC, Coag, LFTs, Urea',
      'Activate Massive Hemorrhage Protocol if unstable'
    ],
    secondaryManagement: [
      'Urgent Endoscopy (OGD) within 24 hours (sooner if unstable)',
      'IV Proton Pump Inhibitor (e.g., Omeprazole 80mg bolus + 8mg/hr)',
      'Terlipressin and Prophylactic Antibiotics if variceal bleed suspected',
      'Surgical or IR intervention if endoscopic therapy fails'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids', 'O-Negative blood (if emergency)', 'Cross-matched blood'],
      targets: ['MAP > 65 mmHg', 'Hb 7-9 g/dL (restrictive strategy)', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Invasive arterial BP (if unstable)', 'Serial Hb/Hct', 'Fluid balance chart']
    },
    diagram: [
      { title: 'Assess Stability', description: 'Check BP, HR, and GCS. If unstable, move to resuscitation area and call for help.', type: 'decision' },
      { title: 'Resuscitate', description: 'Large-bore IV access, crystalloid bolus, and early blood transfusion. Activate MHP if needed.', type: 'action' },
      { title: 'Risk Score', description: 'Calculate Glasgow-Blatchford Score. GBS 0-1 may be suitable for outpatient management.', type: 'info' },
      { title: 'Endoscopy', description: 'Urgent OGD within 24h. If variceal suspected, give Terlipressin + Ceftriaxone before OGD.', type: 'action' },
      { title: 'Definitive Care', description: 'Hemostasis via clips, thermal, or injection. Monitor for re-bleeding and start high-dose PPI.', type: 'action' }
    ],
    normalLabRanges: {
      'Hemoglobin': '130 - 170 g/L (M), 120 - 150 g/L (F)',
      'Urea': '2.5 - 7.8 mmol/L',
      'INR': '0.8 - 1.2',
      'Platelets': '150 - 400 x10^9/L'
    },
    notes: 'Restrictive transfusion strategy (target Hb 7-9 g/dL) is associated with better outcomes than liberal strategy in non-massive UGIB.'
  },
  {
    id: 'viral-pneumonia',
    name: 'Viral Pneumonia (COVID-19 / Influenza)',
    category: 'Respiratory > Infectious',
    severity: 'urgent',
    diagnosis: [
      'Dry cough, fever, myalgia, fatigue',
      'CXR: Bilateral ground-glass opacities / interstitial patterns',
      'PCR confirmation (Nasal/Pharyngeal swab)',
      'Lymphopenia, elevated CRP/LDH'
    ],
    immediateActions: [
      'Oxygen (target 92-96%, or 88-92% in chronic lung disease)',
      'Antivirals (e.g., Remdesivir for COVID, Oseltamivir for Flu)',
      'Steroids (Dexamethasone 6mg) if requiring oxygen',
      'Prone positioning (awake or intubated)'
    ],
    secondaryManagement: [
      'Anticoagulation (Prophylactic LMWH)',
      'Monitor for secondary bacterial infection',
      'NIV or High-Flow Nasal Oxygen (HFNO) if refractory'
    ],
    ivFluidManagement: {
      choices: ['Restrictive fluid strategy (Preferred)', 'Balanced Crystalloids'],
      targets: ['Neutral to slightly negative fluid balance', 'Avoid pulmonary edema', 'Maintain renal perfusion'],
      monitoring: ['Strict fluid balance', 'Daily weights', 'Oxygen requirements']
    },
    diagram: [
      { title: 'Diagnosis', description: 'Clinical symptoms + PCR + Imaging. Assess for respiratory failure and need for escalation.', type: 'decision' },
      { title: 'Oxygenation', description: 'Start O2 via nasal cannulae. Escalate to HFNO or CPAP if FiO2 > 40% or work of breathing increases.', type: 'action' },
      { title: 'Steroids', description: 'Dexamethasone 6mg daily for 10 days if patient requires supplemental oxygen.', type: 'action' },
      { title: 'Prone Position', description: 'Encourage awake prone positioning for at least 6-12 hours per day to improve V/Q matching.', type: 'info' },
      { title: 'Escalation', description: 'Intubate if persistent hypoxia (PaO2/FiO2 < 150) or signs of exhaustion. Follow ARDS protocol.', type: 'warning' }
    ],
    normalLabRanges: {
      'P/F Ratio': '> 400 mmHg',
      'Oxygen Saturation (SpO2)': '94 - 98%',
      'C-Reactive Protein (CRP)': '< 5 mg/L',
      'Lymphocyte Count': '1.0 - 4.0 x10^9/L'
    },
    notes: 'Fluid restriction is crucial in viral pneumonia to prevent worsening of lung injury and progression to ARDS.'
  },
  {
    id: 'acute-mesenteric-ischemia',
    name: 'Acute Mesenteric Ischemia',
    category: 'Gastrointestinal > Emergency',
    severity: 'critical',
    diagnosis: [
      'Severe abdominal pain "out of proportion" to physical findings',
      'Risk factors: Atrial fibrillation, recent MI, atherosclerosis',
      'CT Angiography (CTA) of abdomen/pelvis (Gold Standard)',
      'Elevated Lactate (late sign, indicates bowel necrosis)'
    ],
    immediateActions: [
      'NPO and Nasogastric tube (NGT) for decompression',
      'Aggressive IV fluid resuscitation',
      'Broad-spectrum IV antibiotics (e.g., Piperacillin/Tazobactam)',
      'IV Heparin infusion (unless contraindicated)',
      'Urgent Surgical or Interventional Radiology (IR) consult'
    ],
    secondaryManagement: [
      'Emergency laparotomy for revascularization or bowel resection',
      'Endovascular therapy (thrombectomy/stenting) if suitable',
      'ICU admission for hemodynamic monitoring',
      'Second-look laparotomy often required at 24-48 hours'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Maintain MAP > 65 mmHg', 'Optimize mesenteric perfusion', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Invasive arterial BP', 'Serial Lactate', 'Fluid balance']
    },
    diagram: [
      { title: 'Clinical Suspicion', description: 'Sudden severe pain + risk factors (AFib). Pain out of proportion to exam is the classic hallmark.', type: 'decision' },
      { title: 'Urgent CTA', description: 'Perform CT Angiogram immediately. Do not wait for lactate to rise. Look for arterial/venous occlusion.', type: 'action' },
      { title: 'Resuscitate', description: 'Aggressive fluids, NPO, NGT, and start Heparin + broad-spectrum antibiotics.', type: 'action' },
      { title: 'Intervention', description: 'Urgent surgery (laparotomy) or IR (thrombectomy). Goal is to restore flow and resect dead bowel.', type: 'warning' }
    ],
    normalLabRanges: {
      'Lactate': '< 2.0 mmol/L',
      'WBC': '4.0 - 11.0 x10^9/L',
      'pH': '7.35 - 7.45',
      'Amylase': '28 - 100 U/L'
    },
    notes: 'Time is bowel. Early diagnosis via CTA and rapid intervention are critical to prevent massive bowel necrosis and death.'
  },
  {
    id: 'dic',
    name: 'Disseminated Intravascular Coagulation (DIC)',
    category: 'Intensive Care > Hematology',
    severity: 'critical',
    diagnosis: [
      'Underlying trigger: Sepsis (most common), trauma, malignancy, obstetric complications',
      'Thrombocytopenia (low platelets)',
      'Prolonged PT and aPTT',
      'Low Fibrinogen (< 1.5 g/L)',
      'Elevated D-dimer / FDPs'
    ],
    immediateActions: [
      'Treat the underlying cause (e.g., Antibiotics for sepsis, surgery for trauma)',
      'Platelet transfusion if < 50 x 10^9/L and bleeding',
      'Fresh Frozen Plasma (FFP) if PT/aPTT > 1.5x normal and bleeding',
      'Cryoprecipitate if Fibrinogen < 1.0-1.5 g/L and bleeding'
    ],
    secondaryManagement: [
      'Serial monitoring of coagulation profile (q6-12h)',
      'Consider Heparin only in chronic/thrombotic DIC (e.g., malignancy)',
      'Supportive care for multi-organ failure'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids', 'Blood Products (FFP, Platelets, Cryo)'],
      targets: ['Maintain perfusion', 'Correct coagulopathy if bleeding', 'Hb 7-9 g/dL'],
      monitoring: ['Coagulation profile', 'Platelet count', 'Fibrinogen levels']
    },
    diagram: [
      { title: 'Identify Trigger', description: 'DIC is always secondary. Look for sepsis, major trauma, or obstetric emergencies.', type: 'decision' },
      { title: 'Coag Profile', description: 'Check FBC, PT, aPTT, Fibrinogen, and D-dimer. Use ISTH DIC score for diagnosis.', type: 'action' },
      { title: 'Treat Cause', description: 'Primary goal is treating the underlying condition. DIC will not resolve until the trigger is removed.', type: 'action' },
      { title: 'Replacement', description: 'If bleeding: Give Platelets (target >50), FFP (target PT <1.5x), and Cryo (target Fib >1.5).', type: 'info' }
    ],
    normalLabRanges: {
      'Platelets': '150 - 400 x10^9/L',
      'Fibrinogen': '2.0 - 4.0 g/L',
      'PT': '11 - 14 seconds',
      'aPTT': '25 - 35 seconds',
      'D-dimer': '< 500 ng/mL'
    },
    notes: 'DIC is a consumptive coagulopathy. Management focuses on treating the underlying cause and replacing consumed factors only if bleeding or pre-procedure.'
  },
  {
    id: 'adrenal-crisis',
    name: 'Acute Adrenal Crisis',
    category: 'Endocrine > Metabolic',
    severity: 'critical',
    diagnosis: [
      'Hypotension / Shock refractory to vasopressors',
      'Nausea, vomiting, abdominal pain',
      'Hyponatremia, Hyperkalemia, Hypoglycemia',
      'History of steroid use or Addison\'s disease'
    ],
    immediateActions: [
      'Hydrocortisone 100mg IV bolus (Immediate)',
      'Fluid Resuscitation: 1L 0.9% NaCl (rapidly)',
      'Hydrocortisone 200mg/24h (continuous or 50mg q6h)',
      'Correct hypoglycemia with 10% Dextrose'
    ],
    secondaryManagement: [
      'Identify trigger (Infection, Surgery, Trauma)',
      'Taper steroids once stable',
      'Endocrine consultation for long-term management'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride', '5% Dextrose in 0.9% NaCl'],
      targets: ['MAP > 65 mmHg', 'Correction of hyponatremia', 'Euvolemia'],
      monitoring: ['Serum electrolytes (Na+, K+)', 'Blood glucose', 'Fluid balance']
    },
    diagram: [
      { title: 'Suspect Crisis', description: 'Refractory shock + history of steroid use. Do not wait for cortisol levels to start treatment.', type: 'decision' },
      { title: 'Hydrocortisone', description: '100mg IV stat, then 200mg/24h. Has both glucocorticoid and mineralocorticoid activity.', type: 'action' },
      { title: 'Fluid Resuscitation', description: 'Aggressive 0.9% NaCl to correct hypovolemia and hyponatremia. Monitor for fluid overload.', type: 'action' },
      { title: 'Identify Trigger', description: 'Search for infection, MI, or other stressors. Resume maintenance steroids once crisis resolves.', type: 'info' }
    ],
    normalLabRanges: {
      'Sodium': '135 - 145 mmol/L',
      'Potassium': '3.5 - 5.0 mmol/L',
      'Blood Glucose': '4.0 - 7.0 mmol/L',
      'Cortisol (Random)': '> 500 nmol/L (rules out crisis)'
    }
  },
  {
    id: 'acute-asthma',
    name: 'Acute Severe Asthma',
    category: 'Respiratory > Critical Care',
    severity: 'critical',
    diagnosis: [
      'PEFR 33-50% best or predicted',
      'Respiratory rate >= 25/min',
      'Heart rate >= 110/min',
      'Inability to complete sentences in one breath'
    ],
    immediateActions: [
      'Oxygen: Target SpO2 94-98%',
      'Salbutamol 5mg + Ipratropium 0.5mg (Nebulized)',
      'Steroids: Prednisolone 40-50mg PO or Hydrocortisone 100mg IV',
      'Magnesium Sulfate 2g IV over 20 mins'
    ],
    secondaryManagement: [
      'Aminophylline infusion (if refractory)',
      'Intubation + Ventilation (if life-threatening features)',
      'Serial PEFR monitoring'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'Correction of dehydration from tachypnea'],
      monitoring: ['Fluid balance', 'Potassium (Salbutamol causes hypokalemia)']
    },
    diagram: [
      { title: 'Assess Severity', description: 'Moderate, Severe (PEFR 33-50%), or Life-threatening (PEFR <33%, silent chest, cyanosis, exhaustion).', type: 'decision' },
      { title: 'Nebulizers', description: 'Salbutamol 5mg + Ipratropium 0.5mg. Repeat every 15-30 mins if needed. Use O2 as driving gas.', type: 'action' },
      { title: 'Steroids', description: 'Prednisolone 40-50mg PO or Hydrocortisone 100mg IV q6h. Continue for at least 5 days.', type: 'action' },
      { title: 'IV Magnesium', description: '2g IV over 20 mins for severe/life-threatening cases not responding to initial nebs.', type: 'action' },
      { title: 'Escalation', description: 'Call ICU if life-threatening features develop. Intubation is high risk (dynamic hyperinflation).', type: 'warning' }
    ],
    normalLabRanges: {
      'PEFR': '> 80% predicted',
      'PaO2': '> 11 kPa',
      'PaCO2': '4.5 - 6.0 kPa (Rising CO2 is a danger sign)',
      'pH': '7.35 - 7.45'
    }
  },
  {
    id: 'copd-exacerbation',
    name: 'COPD Exacerbation',
    category: 'Respiratory > Critical Care',
    severity: 'urgent',
    diagnosis: [
      'Increased breathlessness, cough, and sputum production',
      'Increased sputum purulence',
      'Tachypnea, wheeze, use of accessory muscles',
      'CXR to rule out pneumonia/pneumothorax'
    ],
    immediateActions: [
      'Controlled Oxygen: Target SpO2 88-92%',
      'Salbutamol 5mg + Ipratropium 0.5mg (Nebulized)',
      'Steroids: Prednisolone 30mg PO or Hydrocortisone 100mg IV',
      'Antibiotics if sputum is purulent'
    ],
    secondaryManagement: [
      'Non-Invasive Ventilation (NIV) if pH < 7.35 and pCO2 > 6.0',
      'Doxapram (if NIV not available/appropriate)',
      'Smoking cessation advice'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia'],
      monitoring: ['Fluid balance', 'Potassium']
    },
    diagram: [
      { title: 'Oxygen Therapy', description: 'Start with 24% or 28% Venturi mask. Target SpO2 88-92% in patients at risk of hypercapnic respiratory failure.', type: 'action' },
      { title: 'Nebulizers', description: 'Salbutamol 5mg + Ipratropium 0.5mg. Use air as driving gas if hypercapnic.', type: 'action' },
      { title: 'ABG', description: 'Perform ABG within 30-60 mins of starting oxygen. Check for respiratory acidosis (pH < 7.35).', type: 'decision' },
      { title: 'NIV', description: 'Indicated for persistent respiratory acidosis (pH 7.25-7.35). If pH < 7.25, consider ICU/Intubation.', type: 'warning' }
    ],
    normalLabRanges: {
      'PaO2': '8 - 10 kPa (on air)',
      'PaCO2': '4.5 - 6.0 kPa',
      'pH': '7.35 - 7.45'
    }
  },
  {
    id: 'acute-pancreatitis',
    name: 'Acute Pancreatitis',
    category: 'Gastrointestinal > Emergency',
    severity: 'urgent',
    diagnosis: [
      'Acute epigastric pain (often radiating to back)',
      'Serum Amylase/Lipase > 3x upper limit of normal',
      'Imaging (CT/MRI) consistent with pancreatitis',
      'Assess severity (Glasgow-Imrie or Ranson criteria)'
    ],
    immediateActions: [
      'Aggressive Fluid Resuscitation (250-500 mL/h crystalloid)',
      'Analgesia: IV Opioids (Fentanyl or Morphine)',
      'Oxygen: Maintain SpO2 > 94%',
      'NPO (Nil Per Os) initially'
    ],
    secondaryManagement: [
      'Identify trigger (Gallstones, Alcohol, Hypertriglyceridemia)',
      'Enteral nutrition (early, if tolerated)',
      'ERCP within 24h if gallstone pancreatitis + cholangitis'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids (Ringer\'s Lactate preferred)'],
      targets: ['Urine output > 0.5 mL/kg/hr', 'MAP > 65 mmHg', 'Reduction in Hct/BUN'],
      monitoring: ['Fluid balance', 'Serum electrolytes (Ca2+, Mg2+)', 'Blood glucose']
    },
    diagram: [
      { title: 'Diagnosis', description: 'Pain + Amylase/Lipase > 3x ULN. If diagnosis unclear, perform CT with contrast after 48-72h.', type: 'decision' },
      { title: 'Fluid Loading', description: 'Aggressive resuscitation (250-500 mL/h) in first 12-24h. Ringer\'s Lactate may reduce systemic inflammation.', type: 'action' },
      { title: 'Analgesia', description: 'IV Opioids (Fentanyl/Morphine). Avoid NSAIDs if renal risk. Consider epidural if severe and coagulopathy absent.', type: 'action' },
      { title: 'Nutrition', description: 'Early enteral nutrition (within 24h) is preferred over parenteral. Start with low-fat solid diet as tolerated.', type: 'info' }
    ],
    normalLabRanges: {
      'Amylase': '< 100 U/L',
      'Lipase': '< 60 U/L',
      'Calcium': '2.1 - 2.6 mmol/L',
      'CRP': '< 150 mg/L (at 48h suggests severe)'
    }
  },
  {
    id: 'preeclampsia-eclampsia',
    name: 'Preeclampsia & Eclampsia',
    category: 'Obstetrics > Emergency',
    severity: 'critical',
    diagnosis: [
      'Hypertension (SBP >= 140 or DBP >= 90) after 20 weeks',
      'Proteinuria or End-organ dysfunction (Renal, Hepatic, CNS)',
      'Eclampsia: New-onset generalized seizures in preeclampsia'
    ],
    immediateActions: [
      'Seizure Control: Magnesium Sulfate 4g IV (loading) + 1g/h (infusion)',
      'Antihypertensives: Labetalol (IV/PO) or Hydralazine (IV)',
      'Fluid Management: Restricted (80 mL/h) to prevent pulmonary edema',
      'Plan for Delivery: The only definitive treatment'
    ],
    secondaryManagement: [
      'Monitor for HELLP syndrome (Hemolysis, Elevated Liver enzymes, Low Platelets)',
      'Fetal monitoring (CTG)',
      'Postpartum monitoring for 24-48 hours'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['MAP < 110 mmHg', 'Urine output > 0.5 mL/kg/hr', 'Avoid fluid overload'],
      monitoring: ['Strict fluid balance', 'Respiratory rate (Mg toxicity)', 'Reflexes']
    },
    diagram: [
      { title: 'Diagnosis', description: 'Hypertension + Proteinuria/End-organ damage. Severe if SBP > 160 or DBP > 110.', type: 'decision' },
      { title: 'MgS04 Loading', description: '4g IV over 10-15 mins. If seizure recurs, give further 2g bolus. Monitor for toxicity (loss of reflexes, RR < 12).', type: 'action' },
      { title: 'BP Control', description: 'Target SBP 140-150 and DBP 90-100. Use Labetalol 200mg PO or 20mg IV boluses. Avoid rapid drops.', type: 'action' },
      { title: 'Delivery', description: 'Stabilize mother first. Deliver if > 37 weeks, or earlier if severe features or fetal distress.', type: 'warning' }
    ],
    normalLabRanges: {
      'Platelets': '> 150 x10^9/L',
      'ALT/AST': '< 40 U/L',
      'Creatinine': '< 90 umol/L',
      'Uric Acid': '< 350 umol/L'
    }
  },
  {
    id: 'postpartum-hemorrhage',
    name: 'Postpartum Hemorrhage (PPH)',
    category: 'Obstetrics > Emergency',
    severity: 'critical',
    diagnosis: [
      'Blood loss > 500 mL (vaginal) or > 1000 mL (C-section)',
      'Tachycardia, Hypotension, Pallor',
      'Uterine atony (most common cause)'
    ],
    immediateActions: [
      'Call for Help (Obstetric Emergency)',
      'Uterine Massage + Bimanual compression',
      'Oxytocin: 5 units IV (slow) + 40 units infusion',
      'Tranexamic Acid: 1g IV'
    ],
    secondaryManagement: [
      'Ergometrine 0.5mg IM (if no hypertension)',
      'Carboprost 0.25mg IM (q15 mins, max 8 doses)',
      'Surgical: B-Lynch suture, Uterine artery ligation, Hysterectomy'
    ],
    ivFluidManagement: {
      choices: ['Warm Balanced Crystalloids', 'Blood Products (MHP)'],
      targets: ['MAP > 65 mmHg', 'Hb > 70-90 g/L', 'Fibrinogen > 2 g/L'],
      monitoring: ['Invasive BP', 'Coagulation profile (ROTEM/TEG)', 'Urine output']
    },
    diagram: [
      { title: 'Recognize PPH', description: 'Visible blood loss or signs of shock. Start "Major Obstetric Hemorrhage" protocol.', type: 'decision' },
      { title: 'Uterotonics', description: 'Oxytocin 5u IV + 40u infusion. Ergometrine 0.5mg IM. Carboprost 0.25mg IM. Misoprostol 800mcg PR.', type: 'action' },
      { title: 'Resuscitation', description: '2x large bore IVs. Warm fluids. Crossmatch 4-6 units. Activate MHP if bleeding persistent.', type: 'action' },
      { title: 'Intervention', description: 'Intrauterine balloon (Bakri). If fails, laparotomy for B-Lynch or Hysterectomy. Involve senior staff early.', type: 'warning' }
    ],
    normalLabRanges: {
      'Hemoglobin': '110 - 150 g/L',
      'Fibrinogen': '2.0 - 4.0 g/L',
      'Platelets': '150 - 450 x10^9/L'
    }
  },
  {
    id: 'amniotic-fluid-embolism',
    name: 'Amniotic Fluid Embolism (AFE)',
    category: 'Obstetrics > Emergency',
    severity: 'critical',
    diagnosis: [
      'Sudden cardiovascular collapse / Cardiac arrest',
      'Severe hypoxia / Respiratory failure',
      'Disseminated Intravascular Coagulation (DIC)',
      'Occurs during labor, delivery, or within 30 mins postpartum'
    ],
    immediateActions: [
      'Call for Help (Code Blue / Obstetric Emergency)',
      'High-quality CPR (displace uterus to the left)',
      'Intubation + 100% Oxygen',
      'Aggressive management of DIC (Fibrinogen, Cryoprecipitate)'
    ],
    secondaryManagement: [
      'Inotropes / Vasopressors (Milrinone, Noradrenaline)',
      'Echocardiography (assess RV failure)',
      'Consider ECMO if refractory'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids', 'Blood Products'],
      targets: ['Maintain RV function', 'Correct coagulopathy', 'MAP > 65 mmHg'],
      monitoring: ['Invasive BP', 'CVP / Pulmonary artery catheter', 'Continuous Echo']
    },
    diagram: [
      { title: 'Sudden Collapse', description: 'Hypotension + Hypoxia + Coagulopathy. High index of suspicion in peripartum period.', type: 'decision' },
      { title: 'Resuscitation', description: 'A-B-C. Left uterine displacement if undelivered. High-flow O2. Large bore access.', type: 'action' },
      { title: 'A-OK Protocol', description: 'Consider Atropine (0.8mg), Ondansetron (4mg), and Ketorolac (30mg) to block vagal/serotonin/thromboxane response.', type: 'action' },
      { title: 'Manage DIC', description: 'Early and aggressive replacement of fibrinogen. AFE is often associated with catastrophic hemorrhage.', type: 'warning' }
    ],
    normalLabRanges: {
      'Fibrinogen': '2.0 - 4.0 g/L',
      'Platelets': '150 - 450 x10^9/L',
      'PT / APTT': 'Normal range'
    }
  },
  {
    id: 'pediatric-cardiac-arrest',
    name: 'Pediatric Cardiac Arrest',
    category: 'Pediatrics > Emergency',
    severity: 'critical',
    diagnosis: [
      'Unresponsive, no breathing or only gasping',
      'No pulse felt within 10 seconds',
      'Common causes: Respiratory failure, Shock, SIDS, Trauma'
    ],
    immediateActions: [
      'Start CPR (15:2 ratio if 2 rescuers)',
      'Oxygenate and Ventilate (100% O2)',
      'Attach Defibrillator / Monitor',
      'Adrenaline 10 mcg/kg (0.1 mL/kg of 1:10,000) IV/IO'
    ],
    secondaryManagement: [
      'Advanced Airway (ETT or LMA)',
      'Identify and treat reversible causes (4Hs & 4Ts)',
      'Post-resuscitation care: Target normoglycemia and normothermia'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['ROSC (Return of Spontaneous Circulation)', 'Maintain MAP > 50th percentile for age'],
      monitoring: ['ETCO2 (aim > 15 mmHg during CPR)', 'Continuous ECG', 'Invasive BP']
    },
    diagram: [
      { title: 'Shout for Help', description: 'Assess responsiveness. Start CPR. Give 5 rescue breaths first in children.', type: 'action' },
      { title: 'CPR 15:2', description: 'Push hard (>1/3 chest depth) and fast (100-120 bpm). Minimize interruptions.', type: 'action' },
      { title: 'Rhythm Check', description: 'Shockable (VF/pVT): 4 J/kg. Non-shockable (PEA/Asystole): Give Adrenaline immediately.', type: 'decision' },
      { title: 'Adrenaline', description: '10 mcg/kg IV/IO every 3-5 mins. If no IV/IO, consider ETT route (100 mcg/kg).', type: 'action' },
      { title: 'Reversible Causes', description: 'Hypoxia, Hypovolemia, Hypo/Hyperkalemia, Hypothermia. Tension Pneumo, Tamponade, Toxins, Thrombosis.', type: 'info' }
    ],
    normalLabRanges: {
      'ETCO2': '35 - 45 mmHg',
      'Blood Glucose': '4.0 - 8.0 mmol/L',
      'Potassium': '3.5 - 5.0 mmol/L'
    }
  },
  {
    id: 'croup-severe',
    name: 'Severe Croup (Laryngotracheobronchitis)',
    category: 'Pediatrics > Respiratory',
    severity: 'urgent',
    diagnosis: [
      'Barking cough, inspiratory stridor',
      'Hoarseness, respiratory distress',
      'Severe: Stridor at rest, significant recession, agitation/lethargy'
    ],
    immediateActions: [
      'Keep child calm (avoid distressing procedures)',
      'Dexamethasone 0.6 mg/kg (PO/IM/IV)',
      'Nebulized Adrenaline (5 mL of 1:1000)',
      'Oxygen if SpO2 < 92%'
    ],
    secondaryManagement: [
      'Observe for at least 4 hours after Adrenaline',
      'Consider Heliox if refractory',
      'Involve ENT/Anesthesia if airway obstruction imminent'
    ],
    ivFluidManagement: {
      choices: ['Oral fluids preferred', '0.9% NaCl if IV needed'],
      targets: ['Hydration', 'Normal capillary refill'],
      monitoring: ['Respiratory rate', 'Work of breathing (Westley Croup Score)']
    },
    diagram: [
      { title: 'Assessment', description: 'Barking cough + Stridor. Assess for "Red Flags": Drooling, toxic appearance (suggests Epiglottitis).', type: 'decision' },
      { title: 'Dexamethasone', description: '0.15 - 0.6 mg/kg (max 12mg). Single dose is usually sufficient. Effective within 2-4 hours.', type: 'action' },
      { title: 'Nebulized Adrenaline', description: '5 mL of 1:1000 (undiluted). Rapid onset (10-30 mins). Temporary effect, watch for rebound.', type: 'action' },
      { title: 'Airway Emergency', description: 'If worsening: Call senior Anesthesia/ENT. Prepare for difficult intubation (smaller ETT needed).', type: 'warning' }
    ],
    normalLabRanges: {
      'Respiratory Rate': 'Age-dependent',
      'Heart Rate': 'Age-dependent'
    }
  },
  {
    id: 'pediatric-sepsis',
    name: 'Pediatric Sepsis & Septic Shock',
    category: 'Pediatrics > Critical Care',
    severity: 'critical',
    diagnosis: [
      'Suspected infection + Organ dysfunction',
      'Abnormal temperature (>38.5 or <36)',
      'Tachycardia or Bradycardia (in infants)',
      'Altered mental status, prolonged capillary refill (>2s)'
    ],
    immediateActions: [
      'High-flow Oxygen',
      'IV/IO access (within 5 mins)',
      'Fluid Bolus: 20 mL/kg balanced crystalloid',
      'Antibiotics: Broad-spectrum (within 1 hour)'
    ],
    secondaryManagement: [
      'Vasoactive support (Adrenaline or Noradrenaline) if fluid refractory',
      'Correct hypoglycemia and hypocalcemia',
      'Source control'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids (Plasmalyte/Hartmann\'s)'],
      targets: ['Capillary refill < 2s', 'Normal BP for age', 'Urine output > 1 mL/kg/hr'],
      monitoring: ['Continuous ECG, SpO2', 'Invasive BP', 'Frequent Lactate checks']
    },
    diagram: [
      { title: 'Recognition', description: 'Fever/Hypothermia + Tachycardia + Poor perfusion. Don\'t wait for hypotension (late sign in children).', type: 'decision' },
      { title: 'Oxygen & Access', description: '100% O2 via non-rebreathe. 2x IV or 1x IO access. Take bloods (Culture, Lactate, Glucose).', type: 'action' },
      { title: 'Fluid Bolus', description: '20 mL/kg over 5-10 mins. Repeat up to 40-60 mL/kg if no signs of fluid overload (hepatomegaly/crackles).', type: 'action' },
      { title: 'Antibiotics', description: 'Give within 60 mins. Ceftriaxone 80mg/kg (max 2g). Add Vancomycin if MRSA suspected.', type: 'action' },
      { title: 'Inotropes', description: 'If shock persists after 40-60 mL/kg: Start Adrenaline (0.05-0.3 mcg/kg/min) via peripheral or IO if needed.', type: 'warning' }
    ],
    normalLabRanges: {
      'Lactate': '< 2.0 mmol/L',
      'Blood Glucose': '4.0 - 8.0 mmol/L',
      'Ionized Calcium': '1.1 - 1.3 mmol/L'
    }
  },
  {
    id: 'pediatric-anaphylaxis',
    name: 'Pediatric Anaphylaxis',
    category: 'Pediatrics > Emergency',
    severity: 'critical',
    diagnosis: [
      'Sudden onset of airway/breathing/circulation problems',
      'Skin/Mucosal changes (Hives, Angioedema) - absent in 20%',
      'Exposure to known/likely allergen'
    ],
    immediateActions: [
      'Remove allergen',
      'IM Adrenaline: 0.01 mg/kg (0.01 mL/kg of 1:1000)',
      'High-flow Oxygen',
      'Fluid Bolus: 20 mL/kg if hypotensive'
    ],
    secondaryManagement: [
      'Nebulized Salbutamol if bronchospasm persists',
      'Steroids: Dexamethasone 0.15-0.6 mg/kg',
      'Antihistamines: Chlorphenamine (age-dependent dose)'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride', 'Balanced Crystalloids'],
      targets: ['Resolution of hypotension', 'Stable airway'],
      monitoring: ['Continuous ECG, SpO2, BP', 'Observe for at least 6-12 hours (biphasic reaction)']
    },
    diagram: [
      { title: 'IM Adrenaline', description: 'Give immediately in mid-outer thigh. <6 months: 100-150 mcg; 6m-6y: 150 mcg; 6y-12y: 300 mcg; >12y: 500 mcg.', type: 'action' },
      { title: 'Positioning', description: 'Lie flat with legs elevated. Do not stand or sit up suddenly (risk of cardiac arrest).', type: 'warning' },
      { title: 'Airway', description: 'If stridor/airway edema: Early involvement of senior anesthesia. Prepare for difficult airway.', type: 'warning' },
      { title: 'IV Adrenaline', description: 'Only by experienced clinicians. 1 mcg/kg/min infusion. Titrate to effect.', type: 'info' }
    ],
    normalLabRanges: {
      'Tryptase': 'Take at 1h, 2h, and 24h'
    }
  },
  {
    id: 'upper-gi-bleed',
    name: 'Acute Upper GI Bleeding',
    category: 'Gastrointestinal > Emergency',
    severity: 'critical',
    diagnosis: [
      'Hematemesis (bright red or coffee-ground)',
      'Melena',
      'Hemodynamic instability (Tachycardia, Hypotension)',
      'Glasgow-Blatchford Score for risk stratification'
    ],
    immediateActions: [
      'ABC: Airway protection if massive hematemesis',
      'Fluid Resuscitation: 2x large-bore IV access',
      'Transfusion: Target Hb > 7 g/dL (8 g/dL in CVD)',
      'Proton Pump Inhibitor: Omeprazole 80mg bolus + 8mg/hr infusion'
    ],
    secondaryManagement: [
      'Urgent Endoscopy (within 24h)',
      'Terlipressin/Octreotide + Antibiotics if variceal bleed suspected',
      'Identify and treat cause (Ulcer, Varices, Mallory-Weiss)'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids', 'Blood Products'],
      targets: ['SBP > 90 mmHg', 'MAP > 65 mmHg', 'Hb 7-9 g/dL'],
      monitoring: ['Frequent BP/HR monitoring', 'Urine output', 'Serial Hemoglobin']
    },
    diagram: [
      { title: 'Risk Stratify', description: 'Use Glasgow-Blatchford Score (GBS). GBS 0-1 may be suitable for outpatient management.', type: 'decision' },
      { title: 'Resuscitate', description: '2x 14-16G IVs. Crystalloids to maintain MAP. Transfuse if Hb < 70 g/L (restrictive strategy). Correct coagulopathy.', type: 'action' },
      { title: 'PPI / Vasoactive', description: 'Start high-dose PPI. If variceal suspected: Terlipressin 2mg IV q4h + prophylactic antibiotics (Ceftriaxone).', type: 'action' },
      { title: 'Endoscopy', description: 'Perform within 24h. If hemodynamically unstable, perform as soon as possible after resuscitation.', type: 'action' },
      { title: 'Source Control', description: 'Endoscopic clipping, banding, or thermal therapy. If fails, consider IR (embolization) or surgery.', type: 'warning' }
    ],
    normalLabRanges: {
      'Hemoglobin': '130 - 170 g/L',
      'Urea': '2.5 - 7.8 mmol/L',
      'INR': '0.8 - 1.2'
    }
  },
  {
    id: 'aortic-dissection',
    name: 'Acute Aortic Dissection',
    category: 'Cardiovascular > Emergency',
    severity: 'critical',
    diagnosis: [
      'Sudden onset "tearing" or "ripping" chest/back pain',
      'Pulse deficit or BP differential (>20mmHg) between arms',
      'New aortic regurgitation murmur',
      'CT Angiogram (Gold standard)'
    ],
    immediateActions: [
      'Heart Rate Control: Target HR 60-80 bpm (Esmolol or Labetalol)',
      'Blood Pressure Control: Target SBP 100-120 mmHg (Nitroprusside or Nicardipine)',
      'Pain Control: IV Opioids',
      'Urgent Surgical Consultation'
    ],
    secondaryManagement: [
      'Stanford Type A: Emergency Surgery',
      'Stanford Type B: Medical management unless complicated',
      'Monitor for end-organ ischemia (Renal, Mesenteric, Limb)'
    ],
    ivFluidManagement: {
      choices: ['Restrictive fluids', 'Maintain euvolemia'],
      targets: ['SBP 100-120 mmHg', 'HR 60-80 bpm', 'Adequate organ perfusion'],
      monitoring: ['Invasive arterial BP (Right arm preferred)', 'Continuous ECG', 'Urine output']
    },
    diagram: [
      { title: 'Clinical Suspicion', description: 'Tearing pain + Pulse deficit + New AR murmur. Perform urgent CTA of chest/abdomen/pelvis.', type: 'decision' },
      { title: 'HR Control', description: 'Beta-blockers (Esmolol infusion or Labetalol) to reduce dP/dt (shear stress). Target HR 60-80 bpm.', type: 'action' },
      { title: 'BP Control', description: 'Target SBP 100-120 mmHg. Add vasodilators (Nitroprusside/Nicardipine) ONLY after HR is controlled to avoid reflex tachycardia.', type: 'action' },
      { title: 'Type A vs B', description: 'Type A (Involves Ascending Aorta) -> Emergency Surgery. Type B (Descending only) -> Medical management.', type: 'decision' },
      { title: 'Monitor Malperfusion', description: 'Assess for stroke, MI, AKI, bowel ischemia, or limb ischemia. Escalate to surgery/stenting if Type B becomes complicated.', type: 'warning' }
    ],
    normalLabRanges: {
      'Heart Rate': '60 - 100 bpm',
      'Systolic BP': '100 - 120 mmHg (Target)',
      'D-dimer': 'High sensitivity but low specificity'
    }
  },
  {
    id: 'air-embolism',
    name: 'Venous Air Embolism (VAE)',
    category: 'Cardiovascular > Emergency',
    severity: 'critical',
    diagnosis: [
      'Sudden drop in ETCO2',
      'Mill-wheel murmur (late)',
      'Hypotension',
      'Hypoxia',
      'Tachycardia or Bradycardia'
    ],
    immediateActions: [
      'Flood surgical field with saline',
      '100% Oxygen',
      'Left lateral decubitus (Durant\'s position) + Trendelenburg',
      'Aspirate air from CVC if present',
      'Stop Nitrous Oxide (N2O)'
    ],
    secondaryManagement: [
      'Inotropes / Vasopressors',
      'Hyperbaric oxygen if cerebral symptoms',
      'Chest compressions if cardiac arrest'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['MAP > 65 mmHg', 'Restoration of cardiac output'],
      monitoring: ['Invasive BP', 'Continuous ECG', 'ETCO2']
    },
    diagram: [
      { title: 'Recognition', description: 'Sudden drop in ETCO2 + Hypotension. High risk in neurosurgery (sitting position) and CVC insertion.', type: 'decision' },
      { title: 'Immediate Action', description: 'Flood field. 100% O2. Stop N2O. Durant\'s position (Left lateral + Trendelenburg) to trap air in RV apex.', type: 'action' },
      { title: 'Aspiration', description: 'Attempt to aspirate air via multi-port CVC if already in place. Do not delay other resuscitation.', type: 'action' },
      { title: 'Supportive Care', description: 'Vasopressors to maintain BP. CPR if arrest. Consider hyperbaric oxygen for arterial air embolism.', type: 'info' }
    ],
    normalLabRanges: {
      'ETCO2': '35 - 45 mmHg',
      'PaO2': '> 80 mmHg'
    }
  },
  {
    id: 'fat-embolism',
    name: 'Fat Embolism Syndrome (FES)',
    category: 'Cardiovascular > Emergency',
    severity: 'critical',
    diagnosis: [
      'Gurd\'s Criteria: Petechial rash (axilla/neck), Respiratory distress, CNS symptoms',
      'Tachycardia',
      'Fever',
      'Thrombocytopenia'
    ],
    immediateActions: [
      '100% Oxygen / Intubation if severe',
      'Aggressive fluid resuscitation',
      'Early surgical fixation of fractures',
      'Supportive care'
    ],
    secondaryManagement: [
      'Methylprednisolone (controversial)',
      'Monitor for ARDS',
      'Serial ABGs'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'Maintain organ perfusion'],
      monitoring: ['Pulse oximetry', 'Fluid balance', 'Neurological status']
    },
    diagram: [
      { title: 'Recognition', description: 'Classic triad: Hypoxia + Neurological changes + Petechial rash. Usually 24-72h after long bone fracture.', type: 'decision' },
      { title: 'Oxygenation', description: 'Maintain SpO2 > 94%. Early intubation and PEEP if ARDS develops.', type: 'action' },
      { title: 'Fracture Fixation', description: 'Early operative stabilization of long bone fractures reduces the risk of FES.', type: 'action' },
      { title: 'Supportive Care', description: 'Maintain euvolemia. Steroids are not routinely recommended but may be considered in severe cases.', type: 'info' }
    ],
    normalLabRanges: {
      'Platelets': '150 - 450 x10^9/L',
      'PaO2': '> 80 mmHg'
    }
  },
  {
    id: 'high-spinal',
    name: 'High Spinal / Total Spinal',
    category: 'Anesthesia > Emergency',
    severity: 'critical',
    diagnosis: [
      'Rapidly ascending sensory/motor block',
      'Hypotension',
      'Bradycardia',
      'Respiratory distress / Apnea',
      'Loss of consciousness / Dilated pupils'
    ],
    immediateActions: [
      'Call for Help',
      '100% Oxygen / Intubation',
      'Vasopressors (Ephedrine / Phenylephrine / Adrenaline)',
      'Atropine for bradycardia',
      'IV Fluids'
    ],
    secondaryManagement: [
      'Supportive ventilation until block recedes',
      'Sedation if intubated',
      'Monitor for cardiovascular stability'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['MAP > 65 mmHg', 'Heart Rate > 60 bpm'],
      monitoring: ['Continuous ECG', 'Invasive BP', 'Level of sensory block']
    },
    diagram: [
      { title: 'Recognition', description: 'Sudden hypotension + Bradycardia + Respiratory failure after neuraxial block. "Total spinal" includes loss of consciousness.', type: 'decision' },
      { title: 'Airway & Breathing', description: '100% O2. Assist ventilation. Intubate if apnea or unable to protect airway.', type: 'action' },
      { title: 'Circulation', description: 'Aggressive fluids. Vasopressors (Ephedrine 6-12mg or Adrenaline 10-100mcg if severe). Atropine 0.5mg for bradycardia.', type: 'action' },
      { title: 'Maintenance', description: 'Continue supportive care until block recedes (usually 2-4 hours). Sedate if intubated.', type: 'info' }
    ],
    normalLabRanges: {
      'Heart Rate': '60 - 100 bpm',
      'MAP': '> 65 mmHg'
    }
  },
  {
    id: 'myxedema-coma',
    name: 'Myxedema Coma',
    category: 'Endocrine > Emergency',
    severity: 'critical',
    diagnosis: [
      'Altered mental status (Coma/Lethargy)',
      'Hypothermia (often < 35 C), Bradycardia, Hypoventilation',
      'Hyponatremia, Hypoglycemia, High TSH, Low T4'
    ],
    immediateActions: [
      'Thyroid replacement: Levothyroxine (T4) 200-400mcg IV bolus, then 50-100mcg daily',
      'Liothyronine (T3): Consider 5-20mcg IV bolus (faster onset, risk of arrhythmia)',
      'Steroids: Hydrocortisone 100mg IV q8h (must give BEFORE thyroid to avoid adrenal crisis)',
      'Supportive: Passive rewarming, mechanical ventilation if needed'
    ],
    secondaryManagement: [
      'Treat precipitating cause (Cold exposure, Infection, MI, Sedatives)',
      'Fluid resuscitation (cautious due to risk of hyponatremia/CHF)',
      'Monitor for arrhythmias'
    ],
    ivFluidManagement: {
      choices: ['Normal Saline (if hyponatremic)', 'Avoid excessive free water'],
      targets: ['Correct hyponatremia slowly', 'Maintain MAP > 65 mmHg', 'Euvolemia'],
      monitoring: ['Core temperature', 'Serum Sodium', 'Thyroid function tests']
    },
    diagram: [
      { title: 'Classic Triad', description: 'Altered mental status + Hypothermia + Precipitating event.', type: 'info' },
      { title: 'Steroids First', description: 'Hydrocortisone 100mg IV. Thyroid hormone increases metabolism and can trigger adrenal crisis.', type: 'warning' },
      { title: 'Thyroid Loading', description: 'T4 200-400mcg IV. T3 is controversial but may be added in severe cases.', type: 'action' },
      { title: 'Rewarming', description: 'Passive rewarming only (blankets). Active rewarming can cause vasodilation and shock.', type: 'warning' },
      { title: 'Ventilation', description: 'High risk of hypercapnic respiratory failure due to decreased drive and macroglossia.', type: 'info' }
    ],
    normalLabRanges: {
      'TSH': '0.4 - 4.0 mIU/L',
      'Free T4': '12 - 22 pmol/L',
      'Sodium': '135 - 145 mmol/L'
    }
  },
  {
    id: 'pheochromocytoma-crisis',
    name: 'Pheochromocytoma Crisis',
    category: 'Endocrine > Emergency',
    severity: 'critical',
    diagnosis: [
      'Classic Triad: Headache, Sweating, Palpitations',
      'Severe Hypertension (often paroxysmal), Tachycardia',
      'Elevated plasma/urine metanephrines'
    ],
    immediateActions: [
      'Alpha-blockade FIRST: Phentolamine (IV) or Phenoxybenzamine (PO)',
      'Beta-blockade SECOND: Only AFTER adequate alpha-blockade (to avoid unopposed alpha)',
      'Vasodilators: Sodium Nitroprusside or Nicardipine for hypertensive crisis',
      'Volume expansion: Patients are often severely volume depleted'
    ],
    secondaryManagement: [
      'Surgical resection (once stable and alpha-blocked for 10-14 days)',
      'Localization (CT/MRI/MIBG scan)',
      'Long-term BP management'
    ],
    ivFluidManagement: {
      choices: ['Normal Saline', 'Aggressive volume expansion'],
      targets: ['Restore intravascular volume', 'Counteract vasoconstriction', 'Maintain MAP'],
      monitoring: ['Invasive arterial BP', 'CVP/Stroke Volume Variation', 'Urine output']
    },
    diagram: [
      { title: 'Alpha Before Beta', description: 'NEVER give beta-blockers first. Unopposed alpha-stimulation can cause catastrophic hypertension.', type: 'warning' },
      { title: 'Acute Control', description: 'Phentolamine 1-5mg IV boluses or Nitroprusside infusion. Aim for rapid but controlled reduction.', type: 'action' },
      { title: 'Volume Loading', description: 'Start NS early. Alpha-blockade causes vasodilation in a volume-depleted system, leading to shock.', type: 'warning' },
      { title: 'Pre-op Prep', description: 'Phenoxybenzamine 10mg BID, titrated. Goal: BP < 130/80 and orthostatic hypotension.', type: 'info' },
      { title: 'Intra-op Risk', description: 'Extreme BP swings during tumor manipulation. Requires rapid-acting vasodilators and vasopressors.', type: 'info' }
    ],
    normalLabRanges: {
      'Plasma Metanephrines': '< 0.5 nmol/L',
      'Plasma Normetanephrines': '< 0.9 nmol/L',
      'Systolic BP': '< 140 mmHg'
    }
  },
  {
    id: 'acute-liver-failure',
    name: 'Acute Liver Failure (ALF)',
    category: 'Gastrointestinal > Emergency',
    severity: 'critical',
    diagnosis: [
      'Encephalopathy (Altered mental status)',
      'Coagulopathy (INR > 1.5)',
      'Jaundice',
      'No pre-existing cirrhosis'
    ],
    immediateActions: [
      'N-Acetylcysteine (NAC) infusion',
      'Correct hypoglycemia',
      'Monitor for cerebral edema',
      'Avoid sedation'
    ],
    secondaryManagement: [
      'Lactulose / Rifaximin',
      'Vitamin K / FFP (only if bleeding)',
      'Early referral to transplant center',
      'Identify cause (Viral, Toxins, Drugs)'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids', '5% or 10% Dextrose'],
      targets: ['Euvolemia', 'Blood Glucose > 4.0 mmol/L', 'MAP > 65 mmHg'],
      monitoring: ['Hourly glucose', 'INR / Coagulation profile', 'Neurological status (GCS)']
    },
    diagram: [
      { title: 'Recognition', description: 'Acute jaundice + Coagulopathy + Encephalopathy. Hyperacute (<7d), Acute (7-28d), or Subacute (5-26wks).', type: 'decision' },
      { title: 'NAC Therapy', description: 'N-Acetylcysteine infusion (Parvolex) improves outcomes even in non-paracetamol ALF.', type: 'action' },
      { title: 'Cerebral Edema', description: 'Major cause of death. Maintain CPP > 60. Consider Mannitol or Hypertonic Saline if ICP rises. Keep head up 30°.', type: 'warning' },
      { title: 'Metabolic Support', description: 'High risk of hypoglycemia. Maintain glucose 5-10 mmol/L. Correct electrolytes (K+, Mg2+, PO4-).', type: 'info' }
    ],
    normalLabRanges: {
      'INR': '< 1.1',
      'Bilirubin': '< 21 umol/L',
      'ALT / AST': '< 40 U/L',
      'Ammonia': '< 50 umol/L'
    }
  },
  {
    id: 'aspiration-pneumonitis',
    name: 'Aspiration Pneumonitis',
    category: 'Respiratory > Emergency',
    severity: 'urgent',
    diagnosis: [
      'Witnessed aspiration or risk factors',
      'Hypoxia / Tachypnea',
      'Bronchospasm',
      'CXR: Infiltrates (often right lower lobe)'
    ],
    immediateActions: [
      'Suction oropharynx',
      '100% Oxygen',
      'Head down / Lateral position',
      'Bronchoscopy if solid matter suspected'
    ],
    secondaryManagement: [
      'Supportive ventilation (CPAP/PEEP)',
      'Antibiotics ONLY if signs of infection after 48h',
      'Steroids NOT recommended'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'Avoid fluid overload (ARDS risk)'],
      monitoring: ['SpO2 / ABGs', 'Respiratory rate', 'Chest X-ray']
    },
    diagram: [
      { title: 'Immediate Action', description: 'Suction. Position head down/lateral. 100% O2. Intubate if unable to protect airway or severe hypoxia.', type: 'action' },
      { title: 'Assessment', description: 'Check for bronchospasm. CXR may be normal initially; repeat at 6-12 hours.', type: 'decision' },
      { title: 'Ventilation', description: 'Support with CPAP or PEEP if hypoxic. Aim for SpO2 > 94%.', type: 'action' },
      { title: 'Antibiotics?', description: 'Do not give prophylactic antibiotics. Start only if no improvement or new fever/WBC rise after 48h.', type: 'warning' }
    ],
    normalLabRanges: {
      'SpO2': '> 94%',
      'PaO2': '> 80 mmHg'
    }
  },
  {
    id: 'bronchospasm',
    name: 'Intraoperative Bronchospasm',
    category: 'Respiratory > Emergency',
    severity: 'urgent',
    diagnosis: [
      'Increased peak airway pressures',
      'Wheeze on auscultation',
      'Up-sloping ETCO2 waveform',
      'Hypoxia'
    ],
    immediateActions: [
      '100% Oxygen',
      'Deepen anesthesia (Volatile or Propofol)',
      'Salbutamol (MDI or neb)',
      'Consider IV Salbutamol / Aminophylline / Magnesium'
    ],
    secondaryManagement: [
      'Hydrocortisone 200mg IV',
      'Identify trigger (Anaphylaxis, ETT position, Aspiration)',
      'Lidocaine IV'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia'],
      monitoring: ['Airway pressures', 'ETCO2 waveform', 'SpO2']
    },
    diagram: [
      { title: 'Recognition', description: 'High peak pressures + Wheeze + Sloping ETCO2. Rule out: ETT kink, endobronchial intubation, tension pneumo.', type: 'decision' },
      { title: 'Initial Action', description: '100% O2. Deepen anesthesia (Volatiles are bronchodilators). Hand ventilate to feel compliance.', type: 'action' },
      { title: 'Bronchodilators', description: 'Salbutamol 8-10 puffs via MDI into circuit or 5mg nebulized. Consider IV Magnesium 2g or Aminophylline.', type: 'action' },
      { title: 'Refractory', description: 'Consider IV Adrenaline (10-50mcg boluses) if life-threatening. Hydrocortisone 200mg IV for late effect.', type: 'warning' }
    ],
    normalLabRanges: {
      'Peak Pressure': '< 30 cmH2O',
      'ETCO2': '35 - 45 mmHg'
    }
  },
  {
    id: 'laryngospasm',
    name: 'Laryngospasm',
    category: 'Respiratory > Emergency',
    severity: 'critical',
    diagnosis: [
      'Inspiratory stridor (partial)',
      'Silent chest (complete)',
      'Paradoxical chest wall movement',
      'Hypoxia / Bradycardia'
    ],
    immediateActions: [
      '100% Oxygen + CPAP (Larson\'s maneuver)',
      'Deepen anesthesia (Propofol)',
      'Suxamethonium 0.1-0.5 mg/kg IV',
      'Atropine if bradycardic'
    ],
    secondaryManagement: [
      'Monitor for negative pressure pulmonary edema',
      'Suction secretions',
      'Re-intubate if necessary'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia'],
      monitoring: ['SpO2', 'Heart rate', 'Respiratory effort']
    },
    diagram: [
      { title: 'Recognition', description: 'Stridor or silence + Paradoxical breathing. Usually occurs during emergence or light anesthesia.', type: 'decision' },
      { title: 'Larson\'s Maneuver', description: 'Firm pressure at "laryngospasm notch" (behind earlobe) + 100% O2 with CPAP (10-20 cmH2O).', type: 'action' },
      { title: 'Propofol', description: 'Small dose (0.5 mg/kg) may break spasm if partial. If complete or hypoxic: move to Suxamethonium.', type: 'action' },
      { title: 'Suxamethonium', description: '0.1 - 0.5 mg/kg IV (low dose often sufficient). If no IV: 2-4 mg/kg IM. Prepare to intubate.', type: 'warning' }
    ],
    normalLabRanges: {
      'SpO2': '> 94%',
      'Heart Rate': '60 - 100 bpm'
    }
  },
  {
    id: 'hyponatremia',
    name: 'Hyponatremia (Acute / Severe)',
    category: 'Endocrine > Metabolic',
    severity: 'urgent',
    diagnosis: [
      'Serum Na+ < 135 mmol/L',
      'Severe (<125): Seizures, Coma, Respiratory arrest',
      'Moderate: Nausea, Confusion, Headache, Lethargy'
    ],
    immediateActions: [
      'Hypertonic Saline (3%) 100-150 mL IV over 20 mins',
      'Repeat up to 3 times if symptoms persist',
      'Target 4-6 mmol/L increase in Na+ within 24 hours',
      'Stop all non-essential fluids'
    ],
    secondaryManagement: [
      'Fluid restriction (if euvolemic / hypervolemic)',
      'Identify and treat cause (SIADH, Diuretics, Heart Failure)',
      'Frequent Na+ monitoring (every 2-4 hours initially)'
    ],
    ivFluidManagement: {
      choices: ['3% Hypertonic Saline (Emergency)', '0.9% NaCl (if hypovolemic)'],
      targets: ['Resolution of neurological symptoms', 'Avoid rapid correction (>10 mmol/L in 24h)'],
      monitoring: ['Serum Na+ every 2-4 hours', 'Neurological status', 'Fluid balance']
    },
    diagram: [
      { title: 'Recognition', description: 'Na+ < 135. Symptoms usually occur when Na+ falls rapidly or is < 125. Severe symptoms are a medical emergency.', type: 'decision' },
      { title: 'Hypertonic Saline', description: 'Give 100-150 mL of 3% NaCl over 20 mins. Aim for 5 mmol/L rise to stop seizures/coma. Repeat if needed.', type: 'action' },
      { title: 'Correction Rate', description: 'Do not exceed 10 mmol/L rise in 24h (or 18 in 48h) to prevent Osmotic Demyelination Syndrome (ODS).', type: 'warning' },
      { title: 'Maintenance', description: 'Treat underlying cause. Fluid restrict if SIADH. Give 0.9% NaCl only if patient is truly hypovolemic.', type: 'info' }
    ],
    normalLabRanges: {
      'Sodium (Na+)': '135 - 145 mmol/L',
      'Serum Osmolality': '275 - 295 mOsm/kg'
    }
  },
  {
    id: 'diabetes-insipidus',
    name: 'Diabetes Insipidus (DI)',
    category: 'Endocrine > Metabolic',
    severity: 'urgent',
    diagnosis: [
      'Polyuria (> 3L / 24 hours)',
      'Low urine osmolality (< 300 mOsm/kg)',
      'High serum osmolality (> 295 mOsm/kg)',
      'Hypernatremia (often present)'
    ],
    immediateActions: [
      'Desmopressin (DDAVP) 1-2 mcg IV/SC or 10-20 mcg intranasal',
      'Free water replacement (PO/NG/IV)',
      'Monitor fluid balance and Na+ hourly'
    ],
    secondaryManagement: [
      'Identify cause (Central vs Nephrogenic)',
      'Water deprivation test (only if stable and diagnosis unclear)',
      'MRI Brain if central DI suspected (post-op, trauma)'
    ],
    ivFluidManagement: {
      choices: ['5% Dextrose', 'Water (PO/NG)'],
      targets: ['Maintain euvolemia', 'Normalize serum Na+', 'Reduce urine output'],
      monitoring: ['Hourly urine output', 'Serum Na+ every 4-6 hours', 'Urine osmolality']
    },
    diagram: [
      { title: 'Recognition', description: 'Massive polyuria + Dilute urine. Common after pituitary surgery or traumatic brain injury.', type: 'decision' },
      { title: 'DDAVP', description: 'Desmopressin 1-2 mcg IV/SC. If urine output drops and osmolality rises, diagnosis is Central DI.', type: 'action' },
      { title: 'Fluid Replacement', description: 'Replace urine output mL-for-mL with 5% Dextrose or water to prevent severe hypernatremia.', type: 'action' },
      { title: 'Monitoring', description: 'Watch for hyponatremia after DDAVP. Monitor Na+ closely. Ensure patient has free access to water.', type: 'warning' }
    ],
    normalLabRanges: {
      'Urine Osmolality': '300 - 900 mOsm/kg',
      'Serum Sodium': '135 - 145 mmol/L',
      'Urine Output': '< 2 mL/kg/hr'
    }
  },
  {
    id: 'siadh',
    name: 'SIADH',
    category: 'Endocrine > Metabolic',
    severity: 'urgent',
    diagnosis: [
      'Hyponatremia (Na+ < 135)',
      'Low serum osmolality (< 275 mOsm/kg)',
      'High urine osmolality (> 100 mOsm/kg)',
      'Urine Na+ > 30 mmol/L',
      'Euvolemia (no signs of edema or dehydration)'
    ],
    immediateActions: [
      'Fluid restriction (500 - 1000 mL / 24 hours)',
      'Identify and treat underlying cause',
      'Hypertonic saline ONLY if severe neurological symptoms'
    ],
    secondaryManagement: [
      'Oral salt tablets',
      'Tolvaptan (V2 receptor antagonist)',
      'Demeclocycline (inhibits ADH action in kidney)'
    ],
    ivFluidManagement: {
      choices: ['Fluid restriction is primary', '3% Hypertonic Saline (if symptomatic)'],
      targets: ['Slow increase in serum Na+', 'Avoid fluid overload'],
      monitoring: ['Serum Na+ every 6-12 hours', 'Strict fluid balance', 'Urine osmolality']
    },
    diagram: [
      { title: 'Recognition', description: 'Hyponatremia + Concentrated urine in an euvolemic patient. Rule out hypothyroidism and adrenal insufficiency.', type: 'decision' },
      { title: 'Fluid Restriction', description: 'Limit total intake to 500-1000 mL/day. This is the first-line treatment for most cases.', type: 'action' },
      { title: 'Identify Cause', description: 'Look for: Small cell lung cancer, CNS disorders (stroke, trauma), Drugs (SSRIs, Carbamazepine), or Lung disease.', type: 'info' },
      { title: 'Severe Symptoms', description: 'If seizures/coma: Give 3% Hypertonic Saline 100mL bolus. Do not over-correct (>10 mmol/L/day).', type: 'warning' }
    ],
    normalLabRanges: {
      'Serum Sodium': '135 - 145 mmol/L',
      'Serum Osmolality': '275 - 295 mOsm/kg',
      'Urine Sodium': '> 30 mmol/L'
    }
  },
  {
    id: 'bacterial-meningitis',
    name: 'Acute Bacterial Meningitis',
    category: 'Neurological > Emergency',
    severity: 'critical',
    diagnosis: [
      'Fever, Headache, Neck stiffness (Meningism)',
      'Altered mental status, Photophobia',
      'Non-blanching petechial rash (Meningococcal)',
      'CSF: High WBC (neutrophils), Low Glucose, High Protein'
    ],
    immediateActions: [
      'Antibiotics: Ceftriaxone 2g IV + Benzylpenicillin (if <3m or >50y)',
      'Steroids: Dexamethasone 10mg IV (give with or before first Abx)',
      'Lumbar Puncture (unless contraindicated by high ICP)',
      'Droplet precautions'
    ],
    secondaryManagement: [
      'Identify organism (Gram stain, PCR, Culture)',
      'Monitor for complications (Seizures, Cerebral edema, SIADH)',
      'Notify Public Health'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'Maintain MAP for cerebral perfusion'],
      monitoring: ['Neurological status (GCS)', 'Fluid balance', 'Serum Na+ (watch for SIADH)']
    },
    diagram: [
      { title: 'Recognition', description: 'Fever + Headache + Neck stiffness. If petechial rash present, start treatment immediately.', type: 'decision' },
      { title: 'Antibiotics', description: 'Do not delay for LP if patient is unstable or rash is present. Ceftriaxone 2g IV q12h. Add Vancomycin if resistant S.pneumo suspected.', type: 'action' },
      { title: 'Dexamethasone', description: '10mg IV q6h for 4 days. Reduces hearing loss and neurological sequelae in S.pneumo meningitis.', type: 'action' },
      { title: 'Lumbar Puncture', description: 'Perform unless: Signs of high ICP (papilledema, focal neuro signs, GCS < 12), shock, or coagulopathy.', type: 'warning' }
    ],
    normalLabRanges: {
      'CSF WBC': '< 5 cells/uL',
      'CSF Glucose': '> 60% of blood glucose',
      'CSF Protein': '0.15 - 0.45 g/L'
    }
  },
  {
    id: 'guillain-barre',
    name: 'Guillain-Barré Syndrome (GBS)',
    category: 'Neurological > Emergency',
    severity: 'urgent',
    diagnosis: [
      'Progressive, symmetrical, ascending weakness',
      'Areflexia (loss of tendon reflexes)',
      'Paresthesia / Sensory loss',
      'CSF: Albuminocytologic dissociation (High protein, normal WBC)'
    ],
    immediateActions: [
      'Monitor Vital Capacity (VC) and Peak Flow',
      'IV Immunoglobulin (IVIG) 0.4g/kg/day for 5 days',
      'Or Plasmapheresis',
      'DVT Prophylaxis'
    ],
    secondaryManagement: [
      'Monitor for autonomic dysfunction (BP swings, arrhythmias)',
      'Pain management (Neuropathic pain)',
      'Early physiotherapy and rehabilitation'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'Avoid fluid overload if respiratory failure'],
      monitoring: ['Vital Capacity (q4-6h)', 'Continuous ECG (autonomic instability)', 'Blood pressure']
    },
    diagram: [
      { title: 'Recognition', description: 'Ascending weakness + Areflexia. Often follows a viral respiratory or GI infection (e.g., Campylobacter).', type: 'decision' },
      { title: 'Respiratory Watch', description: 'Monitor VC. If VC < 15-20 mL/kg or signs of bulbous palsy: Intubate early. Do not wait for hypoxia.', type: 'warning' },
      { title: 'Treatment', description: 'IVIG or Plasmapheresis are equally effective. Do not use both. Steroids are NOT effective in GBS.', type: 'action' },
      { title: 'Autonomic Care', description: 'Watch for sudden bradycardia or hypertension. Be cautious with vasoactive drugs due to hypersensitivity.', type: 'info' }
    ],
    normalLabRanges: {
      'Vital Capacity': '> 60 mL/kg (normal)',
      'CSF Protein': '0.15 - 0.45 g/L (normal)'
    }
  },
  {
    id: 'neurogenic-shock',
    name: 'Neurogenic Shock',
    category: 'Cardiovascular > Emergency',
    severity: 'critical',
    diagnosis: [
      'Hypotension + Bradycardia (classic)',
      'Warm, dry skin (due to vasodilation)',
      'History of spinal cord injury (usually above T6)',
      'Neurological deficits consistent with spinal injury'
    ],
    immediateActions: [
      'C-spine stabilization',
      'Fluid resuscitation (cautious)',
      'Vasopressors (Noradrenaline / Phenylephrine)',
      'Atropine for bradycardia'
    ],
    secondaryManagement: [
      'MAP target 85-90 mmHg (for spinal cord perfusion)',
      'Monitor for autonomic dysreflexia (later phase)',
      'Surgical stabilization of the spine'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['MAP 85-90 mmHg (first 7 days)', 'Heart Rate > 60 bpm'],
      monitoring: ['Invasive arterial BP', 'Continuous ECG', 'Neurological checks']
    },
    diagram: [
      { title: 'Recognition', description: 'Hypotension + Bradycardia + Warm skin after spinal trauma. Loss of sympathetic tone below the level of injury.', type: 'decision' },
      { title: 'Stabilization', description: 'Maintain strict spinal precautions. 100% O2. Large bore IV access.', type: 'action' },
      { title: 'Circulation', description: 'Give 1-2L crystalloid. If MAP still < 85: Start Noradrenaline or Phenylephrine. Use Atropine for symptomatic bradycardia.', type: 'action' },
      { title: 'Perfusion Target', description: 'Maintain MAP 85-90 mmHg for 7 days to optimize spinal cord blood flow and reduce secondary injury.', type: 'warning' }
    ],
    normalLabRanges: {
      'MAP': '70 - 100 mmHg (normal)',
      'Heart Rate': '60 - 100 bpm'
    }
  },
  {
    id: 'rhabdomyolysis',
    name: 'Rhabdomyolysis',
    category: 'Renal > Emergency',
    severity: 'urgent',
    diagnosis: [
      'Myalgia (muscle pain), Weakness, Dark urine (tea-colored)',
      'Serum Creatine Kinase (CK) > 5x upper limit (usually > 5000 U/L)',
      'Myoglobinuria (positive dipstick for blood but no RBCs on microscopy)',
      'Hyperkalemia, Hyperphosphatemia, Hypocalcemia (early)'
    ],
    immediateActions: [
      'Aggressive IV Fluid Resuscitation (target UO 200-300 mL/h)',
      'Treat life-threatening Hyperkalemia',
      'Monitor for Compartment Syndrome',
      'Stop precipitating drugs (Statins, etc.)'
    ],
    secondaryManagement: [
      'Alkalinization of urine (controversial, target pH > 6.5)',
      'Renal Replacement Therapy (if AKI or refractory hyperkalemia)',
      'Identify cause (Trauma, Ischemia, Drugs, Infection)'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride', 'Balanced Crystalloids'],
      targets: ['Urine output 200 - 300 mL/hr', 'Correction of electrolytes'],
      monitoring: ['Hourly urine output', 'Serum CK every 6-12 hours', 'Serum K+, Ca2+, Creatinine']
    },
    diagram: [
      { title: 'Recognition', description: 'Muscle pain + Dark urine + High CK. Common after crush injury, prolonged immobilization, or extreme exercise.', type: 'decision' },
      { title: 'Fluid Loading', description: 'Start 0.9% NaCl or Hartmann\'s at 400-600 mL/h. Aim for high urine output to flush myoglobin from renal tubules.', type: 'action' },
      { title: 'Electrolytes', description: 'Hyperkalemia is the most dangerous early complication. Hypocalcemia should only be treated if symptomatic.', type: 'warning' },
      { title: 'Urine pH', description: 'Consider adding Bicarbonate to fluids if pH < 6.5. This may reduce myoglobin toxicity but watch for worsening hypocalcemia.', type: 'info' }
    ],
    normalLabRanges: {
      'Creatine Kinase (CK)': '< 200 U/L',
      'Potassium': '3.5 - 5.0 mmol/L',
      'Creatinine': '60 - 110 umol/L'
    }
  },
  {
    id: 'tumor-lysis-syndrome',
    name: 'Tumor Lysis Syndrome (TLS)',
    category: 'Oncology > Emergency',
    severity: 'critical',
    diagnosis: [
      'Hyperuricemia, Hyperkalemia, Hyperphosphatemia',
      'Hypocalcemia',
      'Acute Kidney Injury (AKI)',
      'Usually occurs after chemotherapy for high-grade hematological cancers'
    ],
    immediateActions: [
      'Aggressive IV Hydration (3L/m2/day)',
      'Hypouricemic agents: Rasburicase or Allopurinol',
      'Treat Hyperkalemia',
      'Monitor electrolytes every 4-6 hours'
    ],
    secondaryManagement: [
      'Renal Replacement Therapy if AKI persists',
      'Avoid calcium administration unless symptomatic (risk of calcium-phosphate precipitation)',
      'Cardiac monitoring for arrhythmias'
    ],
    ivFluidManagement: {
      choices: ['0.9% Sodium Chloride (without potassium)'],
      targets: ['Urine output > 100 mL/hr', 'Normalization of Uric Acid and K+'],
      monitoring: ['Strict fluid balance', 'Serum electrolytes every 4-6 hours', 'Uric Acid']
    },
    diagram: [
      { title: 'Recognition', description: 'Rapid cell breakdown releasing intracellular contents. High risk in Burkitt\'s lymphoma, ALL, and bulky tumors.', type: 'decision' },
      { title: 'Hydration', description: 'Aggressive IV fluids (without K+) to maintain high urine output. Aim for 2.5-3.0 L/m2 per day.', type: 'action' },
      { title: 'Rasburicase', description: 'Recombinant urate oxidase. Rapidly lowers uric acid. Use in high-risk patients. Caution in G6PD deficiency.', type: 'action' },
      { title: 'Electrolytes', description: 'Hyperkalemia and Hyperphosphatemia are common. Avoid IV Calcium unless seizures/tetany occur due to precipitation risk.', type: 'warning' }
    ],
    normalLabRanges: {
      'Uric Acid': '< 450 umol/L',
      'Potassium': '3.5 - 5.0 mmol/L',
      'Phosphate': '0.8 - 1.5 mmol/L',
      'Calcium': '2.1 - 2.6 mmol/L'
    }
  },
  {
    id: 'neutropenic-sepsis',
    name: 'Neutropenic Sepsis',
    category: 'Oncology > Emergency',
    severity: 'critical',
    diagnosis: [
      'Fever (> 38.0°C) or signs of sepsis',
      'Neutrophil count < 0.5 x 10^9/L (or expected to fall)',
      'History of recent chemotherapy'
    ],
    immediateActions: [
      'Antibiotics: Broad-spectrum (e.g., Piperacillin/Tazobactam) within 1 hour',
      'Blood cultures (including from any central lines)',
      'Fluid resuscitation if signs of shock',
      'Identify source of infection'
    ],
    secondaryManagement: [
      'G-CSF (Granulocyte colony-stimulating factor) in selected cases',
      'Monitor for fungal infections if fever persists',
      'Isolation / Protective environment'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['MAP > 65 mmHg', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Frequent vital signs', 'Lactate', 'Full blood count']
    },
    diagram: [
      { title: 'Recognition', description: 'Fever in a neutropenic patient is a medical emergency. Do not wait for other signs of sepsis.', type: 'decision' },
      { title: 'Door-to-Needle', description: 'Give first dose of broad-spectrum IV antibiotics within 60 minutes of arrival. Tazocin is often first-line.', type: 'action' },
      { title: 'Cultures', description: 'Take peripheral and central line blood cultures. Swab any suspicious sites (wounds, exit sites).', type: 'action' },
      { title: 'Monitoring', description: 'Watch for rapid deterioration. Escalate to ICU early if shock or respiratory failure develops.', type: 'warning' }
    ],
    normalLabRanges: {
      'Neutrophils': '1.5 - 7.5 x10^9/L',
      'Lactate': '< 2.0 mmol/L'
    }
  },
  {
    id: 'svco',
    name: 'Superior Vena Cava Obstruction (SVCO)',
    category: 'Oncology > Emergency',
    severity: 'urgent',
    diagnosis: [
      'Facial swelling, Neck vein distension',
      'Dyspnea, Cough, Hoarseness',
      'Arm swelling, Pemberton\'s sign (facial flushing when arms raised)',
      'Imaging: CT Chest with contrast (shows compression/thrombosis)'
    ],
    immediateActions: [
      'Sit patient upright',
      'Oxygen therapy',
      'Dexamethasone 16mg daily (divided doses)',
      'Urgent Oncology / Interventional Radiology referral'
    ],
    secondaryManagement: [
      'SVC Stenting (rapid symptom relief)',
      'Radiotherapy or Chemotherapy (depending on tumor type)',
      'Anticoagulation if thrombosis present'
    ],
    ivFluidManagement: {
      choices: ['Avoid upper limb IV access if possible'],
      targets: ['Maintain euvolemia', 'Avoid fluid overload (worsens swelling)'],
      monitoring: ['Respiratory status', 'Neurological checks (cerebral edema risk)']
    },
    diagram: [
      { title: 'Recognition', description: 'Facial/Neck swelling + Distended veins. Most common in lung cancer and lymphoma.', type: 'decision' },
      { title: 'Positioning', description: 'Keep patient sitting upright. Avoid lying flat as this increases venous pressure and worsens symptoms.', type: 'action' },
      { title: 'Steroids', description: 'Dexamethasone 8mg BD or 16mg OD. Reduces edema around the tumor. Give with PPI cover.', type: 'action' },
      { title: 'Intervention', description: 'Stenting provides rapid relief (within 24-48h). Definitive treatment depends on the underlying malignancy.', type: 'info' }
    ],
    normalLabRanges: {
      'Respiratory Rate': '12 - 20 bpm'
    }
  },
  {
    id: 'mscc',
    name: 'Malignant Spinal Cord Compression (MSCC)',
    category: 'Oncology > Emergency',
    severity: 'critical',
    diagnosis: [
      'New back pain (often nocturnal or radicular)',
      'Limb weakness, Sensory loss',
      'Bladder/Bowel dysfunction (late sign)',
      'Imaging: Urgent MRI of whole spine (within 24h)'
    ],
    immediateActions: [
      'Dexamethasone 16mg daily (with PPI)',
      'Bed rest / Spinal precautions until stable',
      'Urgent Neurosurgery / Oncology referral',
      'Pain management'
    ],
    secondaryManagement: [
      'Surgical decompression + Stabilization',
      'Radiotherapy',
      'Rehabilitation'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia'],
      monitoring: ['Neurological status (hourly)', 'Bladder scan / Catheterization']
    },
    diagram: [
      { title: 'Recognition', description: 'Back pain + Neurological signs in a patient with known or suspected cancer. High index of suspicion is vital.', type: 'decision' },
      { title: 'Steroids', description: 'Dexamethasone 16mg daily. Start immediately if MSCC is suspected. Do not wait for MRI.', type: 'action' },
      { title: 'MRI Whole Spine', description: 'MRI must be performed within 24 hours. 1/3 of patients have multiple levels of compression.', type: 'warning' },
      { title: 'Definitive Care', description: 'Surgery is often preferred for single-level compression in fit patients. Radiotherapy for others.', type: 'info' }
    ],
    normalLabRanges: {
      'Neurological Power': '5/5 (normal)'
    }
  },
  {
    id: 'opioid-overdose',
    name: 'Opioid Overdose',
    category: 'Toxicology > Emergency',
    severity: 'critical',
    diagnosis: [
      'Triad: Pinpoint pupils (miosis), Respiratory depression, Coma',
      'Cyanosis, Bradycardia, Hypotension',
      'Track marks or history of drug use'
    ],
    immediateActions: [
      'Airway protection / Bag-valve-mask ventilation',
      'Naloxone 400mcg IV/IM (titrate to respiratory rate)',
      'Oxygen 100%',
      'Monitor for rebound sedation'
    ],
    secondaryManagement: [
      'Naloxone infusion if long-acting opioid (e.g., Methadone)',
      'Identify co-ingestants',
      'Observe for at least 2-4 hours after last Naloxone dose'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['MAP > 65 mmHg', 'Maintain organ perfusion'],
      monitoring: ['Respiratory rate (target > 12)', 'SpO2', 'GCS']
    },
    diagram: [
      { title: 'Recognition', description: 'Unresponsive + Pinpoint pupils + Slow/absent breathing. Assume opioid overdose until proven otherwise.', type: 'decision' },
      { title: 'Ventilation', description: 'Support breathing with BVM and 100% O2. Do not wait for Naloxone if patient is apneic.', type: 'action' },
      { title: 'Naloxone', description: 'Give 400mcg IV/IM. Repeat every 2-3 mins until RR > 12. Aim for adequate ventilation, not full consciousness.', type: 'action' },
      { title: 'Rebound Sedation', description: 'Naloxone has a shorter half-life (30-60 mins) than most opioids. Monitor closely for recurrence of symptoms.', type: 'warning' }
    ],
    normalLabRanges: {
      'Respiratory Rate': '12 - 20 bpm',
      'SpO2': '> 94%'
    }
  },
  {
    id: 'serotonin-syndrome',
    name: 'Serotonin Syndrome',
    category: 'Toxicology > Emergency',
    severity: 'critical',
    diagnosis: [
      'Triad: Neuromuscular (Clonus, Hyperreflexia), Autonomic (Fever, Tachycardia), Mental Status (Agitation)',
      'Inducible or spontaneous clonus is the most important sign',
      'History of serotonergic drug use (SSRIs, MAOIs, Tramadol, MDMA)'
    ],
    immediateActions: [
      'Stop all serotonergic agents',
      'Sedation with Benzodiazepines (Diazepam 5-10mg IV)',
      'Aggressive cooling for hyperthermia',
      'Cyproheptadine (Serotonin antagonist) if severe'
    ],
    secondaryManagement: [
      'Monitor for Rhabdomyolysis and DIC',
      'Avoid physical restraints (worsens hyperthermia)',
      'Intubation and paralysis if temperature > 41°C'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'Maintain urine output (prevent AKI from rhabdo)'],
      monitoring: ['Continuous temperature', 'Serum CK', 'Continuous ECG']
    },
    diagram: [
      { title: 'Recognition', description: 'Hunter Criteria: Spontaneous clonus, or inducible clonus + agitation/diaphoresis. Look for "wet" skin and hyperreflexia.', type: 'decision' },
      { title: 'Benzodiazepines', description: 'Diazepam 5-10mg IV. Essential for controlling agitation, muscle activity, and autonomic instability.', type: 'action' },
      { title: 'Hyperthermia', description: 'If Temp > 41°C: Immediate intubation, paralysis, and active cooling. High risk of multi-organ failure.', type: 'warning' },
      { title: 'Cyproheptadine', description: 'Consider 12mg PO/NG loading dose, then 2mg every 2 hours until stable. Specific serotonin antagonist.', type: 'info' }
    ],
    normalLabRanges: {
      'Temperature': '36.5 - 37.5 °C',
      'Creatine Kinase (CK)': '< 200 U/L'
    }
  },
  {
    id: 'alcohol-withdrawal',
    name: 'Alcohol Withdrawal & Delirium Tremens',
    category: 'Toxicology > Emergency',
    severity: 'urgent',
    diagnosis: [
      'Tremor, Sweating, Tachycardia, Anxiety (6-24h)',
      'Seizures (12-48h)',
      'Hallucinations (visual/tactile)',
      'Delirium Tremens (DTs): Confusion, Fever, Severe Autonomic Overactivity (48-96h)'
    ],
    immediateActions: [
      'Benzodiazepines: Diazepam (symptom-triggered or fixed-dose)',
      'Thiamine (Vitamin B1) IV/IM (Pabrinex) - give BEFORE glucose',
      'Correct electrolyte imbalances (Mg2+, K+, PO4-)',
      'Quiet, well-lit environment'
    ],
    secondaryManagement: [
      'Identify and treat precipitating cause (Infection, Trauma)',
      'Monitor for Wernicke\'s Encephalopathy',
      'Long-term rehabilitation referral'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids', '5% Dextrose (if hypoglycemic)'],
      targets: ['Euvolemia', 'Correction of electrolytes'],
      monitoring: ['CIWA-Ar score', 'Frequent vital signs', 'Fluid balance']
    },
    diagram: [
      { title: 'Recognition', description: 'History of heavy use + Tremor/Tachycardia. DTs is a medical emergency with 5% mortality.', type: 'decision' },
      { title: 'Benzodiazepines', description: 'Diazepam 10-20mg PO/IV every 1-2 hours until sedated but rousable. Use CIWA-Ar to guide dosing.', type: 'action' },
      { title: 'Pabrinex', description: '2 pairs IV TDS for 3 days. Essential to prevent Wernicke\'s. Always give before any glucose-containing fluids.', type: 'warning' },
      { title: 'Refractory DTs', description: 'If massive doses of Benzos fail: Consider Phenobarbital or Propofol infusion in ICU.', type: 'info' }
    ],
    normalLabRanges: {
      'Magnesium': '0.7 - 1.0 mmol/L',
      'Potassium': '3.5 - 5.0 mmol/L'
    }
  },
  {
    id: 'carbon-monoxide',
    name: 'Carbon Monoxide (CO) Poisoning',
    category: 'Toxicology > Emergency',
    severity: 'urgent',
    diagnosis: [
      'Headache, Nausea, Dizziness, Confusion',
      'History of exposure (fire, faulty heater, exhaust)',
      'Carboxyhemoglobin (COHb) > 3% (non-smokers) or > 10% (smokers)',
      'Note: Pulse oximetry (SpO2) is FALSELY NORMAL'
    ],
    immediateActions: [
      'Remove from source',
      '100% Oxygen via non-rebreathe mask',
      'ABG for COHb and Lactate',
      'Consider Hyperbaric Oxygen (HBO)'
    ],
    secondaryManagement: [
      'Monitor for delayed neurological sequelae',
      'Cardiac monitoring (CO causes myocardial ischemia)',
      'Identify and treat other fire-related injuries (Cyanide, Burns)'
    ],
    ivFluidManagement: {
      choices: ['Balanced Crystalloids'],
      targets: ['Euvolemia', 'Maintain MAP > 65'],
      monitoring: ['COHb levels', 'Continuous ECG', 'Neurological status']
    },
    diagram: [
      { title: 'Recognition', description: 'Headache/Confusion + Exposure. SpO2 is unreliable as it cannot distinguish COHb from OxyHb.', type: 'decision' },
      { title: '100% Oxygen', description: 'Reduces COHb half-life from 300 mins (air) to 90 mins. Continue until COHb < 5% and symptoms resolve.', type: 'action' },
      { title: 'Hyperbaric O2', description: 'Consider if: COHb > 25% (>15% in pregnancy), loss of consciousness, seizures, or myocardial ischemia.', type: 'info' },
      { title: 'Cyanide?', description: 'In house fires, always consider co-poisoning with Cyanide if patient has severe lactic acidosis.', type: 'warning' }
    ],
    normalLabRanges: {
      'COHb': '< 3% (Non-smoker)',
      'Lactate': '< 2.0 mmol/L'
    }
  },
  {
    id: 'hypertensive-emergency',
    name: 'Hypertensive Emergency',
    category: 'Cardiovascular > Emergency',
    severity: 'critical',
    diagnosis: [
      'Severe Hypertension (usually SBP > 180 or DBP > 120 mmHg)',
      'Evidence of acute end-organ damage (Brain, Heart, Kidney, Eye)',
      'Encephalopathy, MI, Pulmonary Edema, AKI, Retinopathy'
    ],
    immediateActions: [
      'Reduce MAP by no more than 25% in the first hour',
      'Target BP 160/100-110 mmHg over next 2-6 hours',
      'IV Vasodilators: Labetalol, Nicardipine, or Nitroprusside',
      'Exceptions: Stroke, Aortic Dissection (require faster/different targets)'
    ],
    secondaryManagement: [
      'Switch to oral therapy once stable',
      'Identify secondary causes (Renal artery stenosis, Pheo)',
      'Long-term BP control'
    ],
    ivFluidManagement: {
      choices: ['Maintain euvolemia', 'Avoid volume depletion'],
      targets: ['Controlled BP reduction', 'Maintain cerebral perfusion', 'Urine output > 0.5 mL/kg/hr'],
      monitoring: ['Invasive arterial BP', 'Neurological checks', 'Serum Creatinine']
    },
    diagram: [
      { title: 'Confirm Emergency', description: 'Severe BP + End-organ damage. If no end-organ damage, it is "Hypertensive Urgency" (treat with oral meds).', type: 'decision' },
      { title: 'Initial Target', description: 'Reduce MAP by max 25% in 1h. Rapid drops can cause cerebral/coronary ischemia due to shifted autoregulation.', type: 'warning' },
      { title: 'IV Infusion', description: 'Labetalol (20-80mg boluses or 1-2mg/min) or Nicardipine (5-15mg/hr). Nitroprusside for refractory cases.', type: 'action' },
      { title: 'Specific Targets', description: 'Aortic Dissection: SBP < 120 in 20 mins. Ischemic Stroke: SBP < 185 if lysing. Hemorrhagic Stroke: SBP 140-180.', type: 'info' },
      { title: 'Transition', description: 'Start oral antihypertensives once BP is stable for 6-12h. Aim for normal BP over weeks, not hours.', type: 'action' }
    ],
    normalLabRanges: {
      'Systolic BP': '< 140 mmHg',
      'Diastolic BP': '< 90 mmHg',
      'Creatinine': '60 - 110 umol/L'
    }
  },
];
