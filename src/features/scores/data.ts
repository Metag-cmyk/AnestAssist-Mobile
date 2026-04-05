import { ClinicalScore } from '../../types';

export const CLINICAL_SCORES: ClinicalScore[] = [
  {
    id: 'curb-65',
    name: 'CURB-65',
    description: 'Confusion, Urea, Respiratory rate, Blood pressure, Age ≥ 65. Used to predict mortality in community-acquired pneumonia.',
    category: 'Respiratory',
    criteria: [
      {
        id: 'confusion',
        label: 'Confusion',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes (New mental confusion)', points: 1 }
        ]
      },
      {
        id: 'urea',
        label: 'Urea > 7 mmol/L (19 mg/dL)',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'rr',
        label: 'Respiratory Rate ≥ 30/min',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'bp',
        label: 'Systolic BP < 90 or Diastolic BP ≤ 60 mmHg',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'age',
        label: 'Age ≥ 65 years',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 1, label: 'low', description: 'Low risk, consider outpatient treatment.', color: 'bg-green-100 text-green-700' },
      { min: 2, max: 2, label: 'moderate', description: 'Moderate risk, consider short-stay inpatient treatment or closely monitored outpatient treatment.', color: 'bg-amber-100 text-amber-700' },
      { min: 3, max: 5, label: 'high', description: 'High risk, severe pneumonia; hospitalize and consider ICU admission.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'news2',
    name: 'NEWS2',
    description: 'National Early Warning Score 2. Standardized assessment of acute-illness severity.',
    category: 'General',
    criteria: [
      {
        id: 'rr',
        label: 'Respiration Rate (per min)',
        options: [
          { label: '≤ 8', points: 3 },
          { label: '9 - 11', points: 1 },
          { label: '12 - 20', points: 0 },
          { label: '21 - 24', points: 2 },
          { label: '≥ 25', points: 3 }
        ]
      },
      {
        id: 'spo2_1',
        label: 'SpO2 Scale 1 (%)',
        options: [
          { label: '≤ 91', points: 3 },
          { label: '92 - 93', points: 2 },
          { label: '94 - 95', points: 1 },
          { label: '≥ 96', points: 0 }
        ]
      },
      {
        id: 'air_o2',
        label: 'Air or Oxygen?',
        options: [
          { label: 'Air', points: 0 },
          { label: 'Oxygen', points: 2 }
        ]
      },
      {
        id: 'sbp',
        label: 'Systolic Blood Pressure (mmHg)',
        options: [
          { label: '≤ 90', points: 3 },
          { label: '91 - 100', points: 2 },
          { label: '101 - 110', points: 1 },
          { label: '111 - 219', points: 0 },
          { label: '≥ 220', points: 3 }
        ]
      },
      {
        id: 'pulse',
        label: 'Pulse (per min)',
        options: [
          { label: '≤ 40', points: 3 },
          { label: '41 - 50', points: 1 },
          { label: '51 - 90', points: 0 },
          { label: '91 - 110', points: 1 },
          { label: '111 - 130', points: 2 },
          { label: '≥ 131', points: 3 }
        ]
      },
      {
        id: 'consciousness',
        label: 'Consciousness (ACVPU)',
        options: [
          { label: 'Alert', points: 0 },
          { label: 'CVPU (New Confusion, Voice, Pain, Unresponsive)', points: 3 }
        ]
      },
      {
        id: 'temp',
        label: 'Temperature (°C)',
        options: [
          { label: '≤ 35.0', points: 3 },
          { label: '35.1 - 36.0', points: 1 },
          { label: '36.1 - 38.0', points: 0 },
          { label: '38.1 - 39.0', points: 1 },
          { label: '≥ 39.1', points: 2 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 4, label: 'low', description: 'Low clinical risk. Ward-based response.', color: 'bg-green-100 text-green-700' },
      { min: 5, max: 6, label: 'moderate', description: 'Medium clinical risk. Urgent response by clinician.', color: 'bg-amber-100 text-amber-700' },
      { min: 7, max: 20, label: 'high', description: 'High clinical risk. Emergency response by critical care team.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'sofa',
    name: 'SOFA',
    description: 'Sequential Organ Failure Assessment. Used to track a person\'s status during the stay in an ICU.',
    category: 'Sepsis',
    criteria: [
      {
        id: 'pao2_fio2',
        label: 'Respiration: PaO2/FiO2 (mmHg)',
        options: [
          { label: '≥ 400', points: 0 },
          { label: '< 400', points: 1 },
          { label: '< 300', points: 2 },
          { label: '< 200 (with respiratory support)', points: 3 },
          { label: '< 100 (with respiratory support)', points: 4 }
        ]
      },
      {
        id: 'platelets',
        label: 'Coagulation: Platelets (x10³/µL)',
        options: [
          { label: '≥ 150', points: 0 },
          { label: '< 150', points: 1 },
          { label: '< 100', points: 2 },
          { label: '< 50', points: 3 },
          { label: '< 20', points: 4 }
        ]
      },
      {
        id: 'bilirubin',
        label: 'Liver: Bilirubin (mg/dL)',
        options: [
          { label: '< 1.2', points: 0 },
          { label: '1.2 - 1.9', points: 1 },
          { label: '2.0 - 5.9', points: 2 },
          { label: '6.0 - 11.9', points: 3 },
          { label: '> 12.0', points: 4 }
        ]
      },
      {
        id: 'cvs',
        label: 'Cardiovascular: MAP or Vasopressors',
        options: [
          { label: 'MAP ≥ 70 mmHg', points: 0 },
          { label: 'MAP < 70 mmHg', points: 1 },
          { label: 'Dopamine ≤ 5 or Dobutamine (any dose)', points: 2 },
          { label: 'Dopamine > 5 or Noradrenaline ≤ 0.1', points: 3 },
          { label: 'Dopamine > 15 or Noradrenaline > 0.1', points: 4 }
        ]
      },
      {
        id: 'gcs',
        label: 'Neurological: Glasgow Coma Scale',
        options: [
          { label: '15', points: 0 },
          { label: '13 - 14', points: 1 },
          { label: '10 - 12', points: 2 },
          { label: '6 - 9', points: 3 },
          { label: '< 6', points: 4 }
        ]
      },
      {
        id: 'creatinine',
        label: 'Renal: Creatinine (mg/dL) or Urine Output',
        options: [
          { label: '< 1.2', points: 0 },
          { label: '1.2 - 1.9', points: 1 },
          { label: '2.0 - 3.4', points: 2 },
          { label: '3.5 - 4.9 or < 500 mL/day', points: 3 },
          { label: '> 5.0 or < 200 mL/day', points: 4 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 6, label: 'low', description: 'Low mortality risk (< 10%).', color: 'bg-green-100 text-green-700' },
      { min: 7, max: 12, label: 'moderate', description: 'Moderate mortality risk (15-30%).', color: 'bg-amber-100 text-amber-700' },
      { min: 13, max: 24, label: 'high', description: 'High mortality risk (> 50-90%).', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'qsofa',
    name: 'qSOFA',
    description: 'Quick SOFA Score. Identifies patients outside the ICU who are at high risk for poor outcomes.',
    category: 'Sepsis',
    criteria: [
      {
        id: 'rr',
        label: 'Respiratory Rate ≥ 22/min',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'consciousness',
        label: 'Altered Mentation (GCS < 15)',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'sbp',
        label: 'Systolic BP ≤ 100 mmHg',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 1, label: 'low', description: 'Low risk of poor outcome.', color: 'bg-green-100 text-green-700' },
      { min: 2, max: 3, label: 'high', description: 'High risk of poor outcome. Consider sepsis and escalate care.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'news',
    name: 'NEWS (Original)',
    description: 'National Early Warning Score. The original version before NEWS2.',
    category: 'General',
    criteria: [
      {
        id: 'rr',
        label: 'Respiration Rate (per min)',
        options: [
          { label: '≤ 8', points: 3 },
          { label: '9 - 11', points: 1 },
          { label: '12 - 20', points: 0 },
          { label: '21 - 24', points: 2 },
          { label: '≥ 25', points: 3 }
        ]
      },
      {
        id: 'spo2',
        label: 'SpO2 (%)',
        options: [
          { label: '≤ 91', points: 3 },
          { label: '92 - 93', points: 2 },
          { label: '94 - 95', points: 1 },
          { label: '≥ 96', points: 0 }
        ]
      },
      {
        id: 'air_o2',
        label: 'Air or Oxygen?',
        options: [
          { label: 'Air', points: 0 },
          { label: 'Oxygen', points: 2 }
        ]
      },
      {
        id: 'sbp',
        label: 'Systolic Blood Pressure (mmHg)',
        options: [
          { label: '≤ 90', points: 3 },
          { label: '91 - 100', points: 2 },
          { label: '101 - 110', points: 1 },
          { label: '111 - 219', points: 0 },
          { label: '≥ 220', points: 3 }
        ]
      },
      {
        id: 'pulse',
        label: 'Pulse (per min)',
        options: [
          { label: '≤ 40', points: 3 },
          { label: '41 - 50', points: 1 },
          { label: '51 - 90', points: 0 },
          { label: '91 - 110', points: 1 },
          { label: '111 - 130', points: 2 },
          { label: '≥ 131', points: 3 }
        ]
      },
      {
        id: 'consciousness',
        label: 'Consciousness (AVPU)',
        options: [
          { label: 'Alert', points: 0 },
          { label: 'V, P, or U', points: 3 }
        ]
      },
      {
        id: 'temp',
        label: 'Temperature (°C)',
        options: [
          { label: '≤ 35.0', points: 3 },
          { label: '35.1 - 36.0', points: 1 },
          { label: '36.1 - 38.0', points: 0 },
          { label: '38.1 - 39.0', points: 1 },
          { label: '≥ 39.1', points: 2 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 4, label: 'low', description: 'Low clinical risk.', color: 'bg-green-100 text-green-700' },
      { min: 5, max: 6, label: 'moderate', description: 'Medium clinical risk.', color: 'bg-amber-100 text-amber-700' },
      { min: 7, max: 20, label: 'high', description: 'High clinical risk.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'gcs',
    name: 'GCS',
    description: 'Glasgow Coma Scale. Used to describe the level of consciousness in a person following a traumatic brain injury.',
    category: 'Neurological',
    criteria: [
      {
        id: 'eyes',
        label: 'Eye Opening',
        options: [
          { label: 'None', points: 1 },
          { label: 'To pressure', points: 2 },
          { label: 'To sound', points: 3 },
          { label: 'Spontaneous', points: 4 }
        ]
      },
      {
        id: 'verbal',
        label: 'Verbal Response',
        options: [
          { label: 'None', points: 1 },
          { label: 'Incomprehensible sounds', points: 2 },
          { label: 'Inappropriate words', points: 3 },
          { label: 'Confused', points: 4 },
          { label: 'Oriented', points: 5 }
        ]
      },
      {
        id: 'motor',
        label: 'Motor Response',
        options: [
          { label: 'None', points: 1 },
          { label: 'Extension (Decerebrate)', points: 2 },
          { label: 'Abnormal flexion (Decorticate)', points: 3 },
          { label: 'Normal flexion (Withdrawal)', points: 4 },
          { label: 'Localizing', points: 5 },
          { label: 'Obeys commands', points: 6 }
        ]
      }
    ],
    riskLevels: [
      { min: 3, max: 8, label: 'severe', description: 'Severe brain injury. GCS ≤ 8 usually requires intubation.', color: 'bg-rose-100 text-rose-700' },
      { min: 9, max: 12, label: 'moderate', description: 'Moderate brain injury.', color: 'bg-amber-100 text-amber-700' },
      { min: 13, max: 15, label: 'mild', description: 'Mild brain injury or normal.', color: 'bg-green-100 text-green-700' }
    ]
  },
  {
    id: 'cha2ds2-vasc',
    name: 'CHA2DS2-VASc',
    description: 'Stroke risk in patients with atrial fibrillation.',
    category: 'Cardiovascular',
    criteria: [
      {
        id: 'heart_failure',
        label: 'Congestive Heart Failure',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'hypertension',
        label: 'Hypertension',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'age',
        label: 'Age',
        options: [
          { label: '< 65', points: 0 },
          { label: '65 - 74', points: 1 },
          { label: '≥ 75', points: 2 }
        ]
      },
      {
        id: 'diabetes',
        label: 'Diabetes Mellitus',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'stroke',
        label: 'Stroke / TIA / Thromboembolism',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 2 }
        ]
      },
      {
        id: 'vascular',
        label: 'Vascular Disease (Prior MI, PAD, or aortic plaque)',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'sex',
        label: 'Sex',
        options: [
          { label: 'Male', points: 0 },
          { label: 'Female', points: 1 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 0, label: 'low', description: 'Low risk. Anticoagulation may not be needed.', color: 'bg-green-100 text-green-700' },
      { min: 1, max: 1, label: 'moderate', description: 'Moderate risk. Consider anticoagulation.', color: 'bg-amber-100 text-amber-700' },
      { min: 2, max: 9, label: 'high', description: 'High risk. Anticoagulation recommended.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'wells-dvt',
    name: 'Wells\' Criteria (DVT)',
    description: 'Clinical probability of deep vein thrombosis.',
    category: 'Vascular',
    criteria: [
      {
        id: 'cancer',
        label: 'Active cancer (treatment within 6 months or palliative)',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'paralysis',
        label: 'Paralysis, paresis, or recent plaster immobilization of the lower extremities',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'bedridden',
        label: 'Recently bedridden > 3 days or major surgery within 12 weeks',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'tenderness',
        label: 'Localized tenderness along the distribution of the deep venous system',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'swelling_entire',
        label: 'Entire leg swollen',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'swelling_calf',
        label: 'Calf swelling > 3 cm compared with asymptomatic leg',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'pitting',
        label: 'Pitting edema confined to the symptomatic leg',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'veins',
        label: 'Collateral superficial veins (non-varicose)',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'alternative',
        label: 'Alternative diagnosis at least as likely as DVT',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: -2 }
        ]
      }
    ],
    riskLevels: [
      { min: -2, max: 0, label: 'low', description: 'DVT unlikely (3-10% probability). Consider D-dimer.', color: 'bg-green-100 text-green-700' },
      { min: 1, max: 2, label: 'moderate', description: 'Moderate probability (17-33%).', color: 'bg-amber-100 text-amber-700' },
      { min: 3, max: 9, label: 'high', description: 'DVT likely (50-75% probability). Consider ultrasound.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'gbs',
    name: 'Glasgow-Blatchford Score',
    description: 'Risk stratification for patients with upper GI bleeding.',
    category: 'Gastrointestinal',
    criteria: [
      {
        id: 'urea',
        label: 'Blood Urea (mmol/L)',
        options: [
          { label: '< 6.5', points: 0 },
          { label: '6.5 - 7.9', points: 2 },
          { label: '8.0 - 9.9', points: 3 },
          { label: '10.0 - 24.9', points: 4 },
          { label: '≥ 25', points: 6 }
        ]
      },
      {
        id: 'hb_male',
        label: 'Hemoglobin - Male (g/L)',
        options: [
          { label: '≥ 130', points: 0 },
          { label: '120 - 129', points: 1 },
          { label: '100 - 119', points: 3 },
          { label: '< 100', points: 6 }
        ]
      },
      {
        id: 'hb_female',
        label: 'Hemoglobin - Female (g/L)',
        options: [
          { label: '≥ 120', points: 0 },
          { label: '100 - 119', points: 1 },
          { label: '< 100', points: 6 }
        ]
      },
      {
        id: 'sbp',
        label: 'Systolic BP (mmHg)',
        options: [
          { label: '≥ 110', points: 0 },
          { label: '100 - 109', points: 1 },
          { label: '90 - 99', points: 2 },
          { label: '< 90', points: 3 }
        ]
      },
      {
        id: 'other',
        label: 'Other Markers',
        options: [
          { label: 'Pulse ≥ 100/min', points: 1 },
          { label: 'Melena', points: 1 },
          { label: 'Syncope', points: 2 },
          { label: 'Hepatic Disease', points: 2 },
          { label: 'Cardiac Failure', points: 2 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 0, label: 'low', description: 'Low risk. May be suitable for outpatient management.', color: 'bg-green-100 text-green-700' },
      { min: 1, max: 20, label: 'high', description: 'High risk. Requires hospital admission and urgent endoscopy.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'asa-ps',
    name: 'ASA Physical Status',
    description: 'Classification system for assessing the fitness of patients before surgery.',
    category: 'Anesthesia',
    criteria: [
      {
        id: 'status',
        label: 'Physical Status',
        options: [
          { label: 'ASA I: Normal healthy patient', points: 1 },
          { label: 'ASA II: Mild systemic disease', points: 2 },
          { label: 'ASA III: Severe systemic disease', points: 3 },
          { label: 'ASA IV: Severe systemic disease that is a constant threat to life', points: 4 },
          { label: 'ASA V: Moribund patient not expected to survive without operation', points: 5 },
          { label: 'ASA VI: Declared brain-dead patient whose organs are being removed for donor purposes', points: 6 }
        ]
      },
      {
        id: 'emergency',
        label: 'Emergency Case',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes (Add E to status)', points: 0 }
        ]
      }
    ],
    riskLevels: [
      { min: 1, max: 2, label: 'low', description: 'Low perioperative risk.', color: 'bg-green-100 text-green-700' },
      { min: 3, max: 4, label: 'moderate', description: 'Significant perioperative risk.', color: 'bg-amber-100 text-amber-700' },
      { min: 5, max: 6, label: 'high', description: 'High perioperative risk.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'mallampati',
    name: 'Mallampati Score',
    description: 'Used to predict the ease of endotracheal intubation.',
    category: 'Anesthesia',
    criteria: [
      {
        id: 'class',
        label: 'Visibility of Oropharyngeal Structures',
        options: [
          { label: 'Class I: Soft palate, fauces, uvula, pillars visible', points: 1 },
          { label: 'Class II: Soft palate, fauces, portion of uvula visible', points: 2 },
          { label: 'Class III: Soft palate, base of uvula visible', points: 3 },
          { label: 'Class IV: Only hard palate visible', points: 4 }
        ]
      }
    ],
    riskLevels: [
      { min: 1, max: 2, label: 'low', description: 'Likely easy intubation.', color: 'bg-green-100 text-green-700' },
      { min: 3, max: 3, label: 'moderate', description: 'Potential difficult intubation.', color: 'bg-amber-100 text-amber-700' },
      { min: 4, max: 4, label: 'severe', description: 'Likely difficult intubation.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'aldrete',
    name: 'Aldrete Score',
    description: 'Post-anesthesia recovery score.',
    category: 'Anesthesia',
    criteria: [
      {
        id: 'activity',
        label: 'Activity (Able to move voluntarily or on command)',
        options: [
          { label: '4 extremities', points: 2 },
          { label: '2 extremities', points: 1 },
          { label: '0 extremities', points: 0 }
        ]
      },
      {
        id: 'respiration',
        label: 'Respiration',
        options: [
          { label: 'Able to breathe deeply and cough freely', points: 2 },
          { label: 'Dyspnea, shallow or limited breathing', points: 1 },
          { label: 'Apneic', points: 0 }
        ]
      },
      {
        id: 'circulation',
        label: 'Circulation (BP vs pre-anesthetic level)',
        options: [
          { label: 'BP ± 20% of pre-anesthetic level', points: 2 },
          { label: 'BP ± 20-50% of pre-anesthetic level', points: 1 },
          { label: 'BP ± 50% of pre-anesthetic level', points: 0 }
        ]
      },
      {
        id: 'consciousness',
        label: 'Consciousness',
        options: [
          { label: 'Fully awake', points: 2 },
          { label: 'Arousable on calling', points: 1 },
          { label: 'Not responding', points: 0 }
        ]
      },
      {
        id: 'oxygen',
        label: 'Oxygen Saturation (SpO2)',
        options: [
          { label: 'SpO2 > 92% on room air', points: 2 },
          { label: 'Needs O2 inhalation to maintain SpO2 > 90%', points: 1 },
          { label: 'SpO2 < 90% even with O2 supplement', points: 0 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 8, label: 'severe', description: 'Patient requires continued close monitoring in PACU.', color: 'bg-rose-100 text-rose-700' },
      { min: 9, max: 10, label: 'mild', description: 'Patient may be fit for discharge from PACU.', color: 'bg-green-100 text-green-700' }
    ]
  },
  {
    id: 'child-pugh',
    name: 'Child-Pugh Score',
    description: 'Assesses the prognosis of chronic liver disease, mainly cirrhosis.',
    category: 'ICU',
    criteria: [
      {
        id: 'bilirubin',
        label: 'Total Bilirubin (umol/L)',
        options: [
          { label: '< 34', points: 1 },
          { label: '34 - 50', points: 2 },
          { label: '> 50', points: 3 }
        ]
      },
      {
        id: 'albumin',
        label: 'Serum Albumin (g/L)',
        options: [
          { label: '> 35', points: 1 },
          { label: '28 - 35', points: 2 },
          { label: '< 28', points: 3 }
        ]
      },
      {
        id: 'inr',
        label: 'INR',
        options: [
          { label: '< 1.7', points: 1 },
          { label: '1.7 - 2.3', points: 2 },
          { label: '> 2.3', points: 3 }
        ]
      },
      {
        id: 'ascites',
        label: 'Ascites',
        options: [
          { label: 'None', points: 1 },
          { label: 'Mild (or controlled by meds)', points: 2 },
          { label: 'Moderate to Severe', points: 3 }
        ]
      },
      {
        id: 'encephalopathy',
        label: 'Encephalopathy',
        options: [
          { label: 'None', points: 1 },
          { label: 'Grade 1-2', points: 2 },
          { label: 'Grade 3-4', points: 3 }
        ]
      }
    ],
    riskLevels: [
      { min: 5, max: 6, label: 'low', description: 'Class A: Good operative risk.', color: 'bg-green-100 text-green-700' },
      { min: 7, max: 9, label: 'moderate', description: 'Class B: Moderate operative risk.', color: 'bg-amber-100 text-amber-700' },
      { min: 10, max: 15, label: 'high', description: 'Class C: Poor operative risk.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'rass',
    name: 'RASS',
    description: 'Richmond Agitation-Sedation Scale. Used to describe a patient\'s level of alertness and agitation.',
    category: 'ICU',
    criteria: [
      {
        id: 'score',
        label: 'Level of Sedation or Agitation',
        options: [
          { label: '+4 Combative', points: 4, description: 'Overtly combative or violent; immediate danger to staff' },
          { label: '+3 Very agitated', points: 3, description: 'Pulls on or removes tube(s) or catheter(s) or has aggressive behavior toward staff' },
          { label: '+2 Agitated', points: 2, description: 'Frequent nonpurposeful movement or patient-ventilator dyssynchrony' },
          { label: '+1 Restless', points: 1, description: 'Anxious or apprehensive but movements not aggressive or vigorous' },
          { label: '0 Alert and calm', points: 0, description: 'Normal' },
          { label: '-1 Drowsy', points: -1, description: 'Not fully alert, but has sustained (more than 10 seconds) awakening, with eye contact, to voice' },
          { label: '-2 Light sedation', points: -2, description: 'Briefly (less than 10 seconds) awakens with eye contact to voice' },
          { label: '-3 Moderate sedation', points: -3, description: 'Any movement (but no eye contact) to voice' },
          { label: '-4 Deep sedation', points: -4, description: 'No response to voice, but any movement to physical stimulation' },
          { label: '-5 Unarousable', points: -5, description: 'No response to voice or physical stimulation' }
        ]
      }
    ],
    riskLevels: [
      { min: 1, max: 4, label: 'agitated', description: 'Patient is agitated or combative. Consider sedation or physical restraint if necessary.', color: 'bg-rose-100 text-rose-700' },
      { min: 0, max: 0, label: 'normal', description: 'Patient is alert and calm.', color: 'bg-green-100 text-green-700' },
      { min: -3, max: -1, label: 'sedated', description: 'Patient is sedated. Monitor for respiratory depression.', color: 'bg-amber-100 text-amber-700' },
      { min: -5, max: -4, label: 'deeply sedated', description: 'Patient is deeply sedated or unarousable. High risk of airway obstruction.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'cam-icu',
    name: 'CAM-ICU',
    description: 'Confusion Assessment Method for the ICU. Used to diagnose delirium in ICU patients.',
    category: 'ICU',
    criteria: [
      {
        id: 'acute_onset',
        label: '1. Acute Onset or Fluctuating Course',
        options: [
          { label: 'No', points: 0 },
          { label: 'Yes', points: 1 }
        ]
      },
      {
        id: 'inattention',
        label: '2. Inattention (ASE Letter Test)',
        options: [
          { label: '0-2 errors', points: 0 },
          { label: '> 2 errors', points: 1 }
        ]
      },
      {
        id: 'altered_consciousness',
        label: '3. Altered Level of Consciousness (RASS ≠ 0)',
        options: [
          { label: 'No (RASS = 0)', points: 0 },
          { label: 'Yes (RASS ≠ 0)', points: 1 }
        ]
      },
      {
        id: 'disorganized_thinking',
        label: '4. Disorganized Thinking',
        options: [
          { label: '0-1 errors', points: 0 },
          { label: '> 1 error', points: 1 }
        ]
      }
    ],
    riskLevels: [
      { min: 0, max: 2, label: 'negative', description: 'CAM-ICU Negative. Delirium not present.', color: 'bg-green-100 text-green-700' },
      { min: 3, max: 4, label: 'positive', description: 'CAM-ICU Positive. Delirium present (Requires Feature 1 AND 2, AND either 3 OR 4). Note: This score is a simplification; clinical diagnosis requires the specific combination.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'thoracic-fit',
    name: 'Thoracic FIT Assessment',
    description: 'The "Three-Legged Stool" framework for preoperative risk assessment in lung resection (Mechanics, Gas Exchange, and Cardiorespiratory Reserve).',
    category: 'Respiratory',
    criteria: [], // Custom renderer will handle this
    riskLevels: [] // Custom renderer will handle this
  },
  {
    id: 'spirometry',
    name: 'Spirometry Calculator',
    description: 'Interpretation of pulmonary function tests (PFTs) based on NHANES III reference equations and GOLD criteria.',
    category: 'Respiratory',
    criteria: [], // Custom renderer will handle this
    riskLevels: [] // Custom renderer will handle this
  },
  {
    id: 'acid-base',
    name: 'Acid-Base Interpreter',
    description: 'Systematic analysis of ABG and electrolytes to identify simple and mixed acid-base disorders.',
    category: 'General',
    criteria: [], // Custom renderer will handle this
    riskLevels: [] // Custom renderer will handle this
  },
  {
    id: 'stop-bang',
    name: 'STOP-BANG',
    description: 'Obstructive Sleep Apnea (OSA) screening tool for surgical patients.',
    category: 'Anesthesia',
    criteria: [
      { id: 'snoring', label: 'Snoring (Loud enough to be heard through closed doors)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'tired', label: 'Tired (Often feel tired, fatigued, or sleepy during the day)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'observed', label: 'Observed (Has anyone observed you stop breathing during sleep)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'pressure', label: 'Pressure (Do you have or are you being treated for high blood pressure)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'bmi', label: 'BMI > 35 kg/m²?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'age', label: 'Age > 50 years?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'neck', label: 'Neck circumference > 40 cm?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'gender', label: 'Gender (Male)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] }
    ],
    riskLevels: [
      { min: 0, max: 2, label: 'low', description: 'Low risk of OSA.', color: 'bg-green-100 text-green-700' },
      { min: 3, max: 4, label: 'intermediate', description: 'Intermediate risk of OSA.', color: 'bg-amber-100 text-amber-700' },
      { min: 5, max: 8, label: 'high', description: 'High risk of OSA. Consider preoperative sleep study or CPAP.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'rcri',
    name: 'Revised Cardiac Risk Index (RCRI)',
    description: 'Lee\'s Criteria. Used to estimate the risk of cardiac complications after non-cardiac surgery.',
    category: 'Anesthesia',
    criteria: [
      { id: 'high_risk', label: 'High-risk surgery (Intraperitoneal, intrathoracic, or suprainguinal vascular)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'ihd', label: 'Ischemic Heart Disease (History of MI, positive stress test, or use of nitrates)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'chf', label: 'Congestive Heart Failure (History of heart failure, pulmonary edema, or paroxysmal nocturnal dyspnea)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'cvd', label: 'Cerebrovascular Disease (History of TIA or stroke)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'diabetes', label: 'Diabetes Mellitus requiring Insulin?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'creatinine', label: 'Preoperative Creatinine > 2 mg/dL (177 µmol/L)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] }
    ],
    riskLevels: [
      { min: 0, max: 0, label: 'Class I', description: '0.4% risk of major cardiac complication.', color: 'bg-green-100 text-green-700' },
      { min: 1, max: 1, label: 'Class II', description: '0.9% risk of major cardiac complication.', color: 'bg-emerald-100 text-emerald-700' },
      { min: 2, max: 2, label: 'Class III', description: '6.6% risk of major cardiac complication.', color: 'bg-amber-100 text-amber-700' },
      { min: 3, max: 6, label: 'Class IV', description: '>11% risk of major cardiac complication.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'has-bled',
    name: 'HAS-BLED',
    description: 'Assesses the risk of major bleeding in patients with Atrial Fibrillation.',
    category: 'Cardiovascular',
    criteria: [
      { id: 'h', label: 'Hypertension (SBP > 160 mmHg)', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'a', label: 'Abnormal Renal OR Liver Function (1 point for each)', options: [{ label: 'None', points: 0 }, { label: 'Either Renal or Liver', points: 1 }, { label: 'Both Renal and Liver', points: 2 }] },
      { id: 's', label: 'Stroke history', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'b', label: 'Prior Bleeding or predisposition', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'l', label: 'Labile INR (time in therapeutic range < 60%)', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'e', label: 'Elderly (Age > 65 years)', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'd', label: 'Drugs or Alcohol (1 point for each)', options: [{ label: 'None', points: 0 }, { label: 'Either Drugs or Alcohol', points: 1 }, { label: 'Both Drugs and Alcohol', points: 2 }] }
    ],
    riskLevels: [
      { min: 0, max: 2, label: 'low/moderate', description: 'Low to moderate risk of major bleeding.', color: 'bg-green-100 text-green-700' },
      { min: 3, max: 9, label: 'high', description: 'High bleeding risk (≥ 3.7% risk per year). Caution and regular review recommended.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'meld',
    name: 'MELD Score',
    description: 'Model for End-Stage Liver Disease. Predicts 90-day survival in liver disease.',
    category: 'ICU',
    criteria: [
      { id: 'creatinine', label: 'Creatinine (mg/dL)', options: [{ label: '< 1.0', points: 0 }, { label: '1.0 - 1.9', points: 10 }, { label: '2.0 - 2.9', points: 20 }, { label: '≥ 3.0', points: 30 }] },
      { id: 'bilirubin', label: 'Bilirubin (mg/dL)', options: [{ label: '< 2.0', points: 0 }, { label: '2.0 - 5.0', points: 5 }, { label: '5.1 - 10.0', points: 10 }, { label: '> 10.0', points: 15 }] },
      { id: 'inr', label: 'INR', options: [{ label: '< 1.1', points: 0 }, { label: '1.1 - 2.0', points: 10 }, { label: '2.1 - 3.0', points: 20 }, { label: '> 3.0', points: 30 }] },
      { id: 'sodium', label: 'Sodium (mmol/L)', options: [{ label: '> 135', points: 0 }, { label: '130 - 135', points: 2 }, { label: '< 130', points: 5 }] }
    ],
    riskLevels: [
      { min: 0, max: 9, label: 'low', description: 'Low mortality risk (1.9%).', color: 'bg-green-100 text-green-700' },
      { min: 10, max: 19, label: 'moderate', description: 'Moderate mortality risk (6.0%).', color: 'bg-amber-100 text-amber-700' },
      { min: 20, max: 29, label: 'high', description: 'Significant mortality risk (19.6%).', color: 'bg-orange-100 text-orange-700' },
      { min: 30, max: 99, label: 'critical', description: 'Severe mortality risk (> 50%).', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'wells-pe',
    name: 'Wells\' Criteria (PE)',
    description: 'Clinical probability of pulmonary embolism.',
    category: 'Respiratory',
    criteria: [
      { id: 'pe_signs', label: 'Clinical signs of DVT?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 3 }] },
      { id: 'alternate', label: 'PE is #1 diagnosis or equally likely?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 3 }] },
      { id: 'hr', label: 'Heart rate > 100 beats/min?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1.5 }] },
      { id: 'surgery', label: 'Immobilization (> 3 days) or surgery (4 weeks)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1.5 }] },
      { id: 'prior_pe', label: 'Prior PE or DVT history?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1.5 }] },
      { id: 'hemoptysis', label: 'Hemoptysis?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'cancer', label: 'Active cancer (treatment or palliative)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] }
    ],
    riskLevels: [
      { min: 0, max: 1.9, label: 'PE unlikely', description: 'Low risk (1.3%). Consider D-dimer.', color: 'bg-green-100 text-green-700' },
      { min: 2, max: 6, label: 'Moderate', description: 'Moderate risk (16.2%).', color: 'bg-amber-100 text-amber-700' },
      { min: 6.5, max: 12.5, label: 'PE Likely', description: 'High probability (37.5%). Consider CTPA.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'geneva',
    name: 'Geneva Score (Simplified)',
    description: 'Alternative risk assessment for pulmonary embolism.',
    category: 'Respiratory',
    criteria: [
      { id: 'age', label: 'Age > 65 years?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'prior_pe', label: 'Prior PE or DVT history?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'surgery', label: 'Surgery or lower limb fracture (1 month)?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'cancer', label: 'Active malignancy?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'leg_pain', label: 'Unilateral lower limb pain?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'hemoptysis', label: 'Hemoptysis?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] },
      { id: 'hr', label: 'Heart rate 75-94 (1 pt) or ≥ 95 (2 pts)?', options: [{ label: '< 75', points: 0 }, { label: '75 - 94', points: 1 }, { label: '≥ 95', points: 2 }] },
      { id: 'calf_pain', label: 'Pain on deep leg vein palpation?', options: [{ label: 'No', points: 0 }, { label: 'Yes', points: 1 }] }
    ],
    riskLevels: [
      { min: 0, max: 2, label: 'low', description: 'Low probability. D-dimer recommended.', color: 'bg-green-100 text-green-700' },
      { min: 3, max: 4, label: 'intermediate', description: 'Intermediate probability.', color: 'bg-amber-100 text-amber-700' },
      { min: 5, max: 9, label: 'high', description: 'High probability. CTPA recommended.', color: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    id: 'bishop',
    name: 'BISHOP Score',
    description: 'Cervical assessment to predict the likelihood of successful labor induction.',
    category: 'Obstetrics',
    criteria: [
      { id: 'dilation', label: 'Dilation (cm)', options: [{ label: 'Closed', points: 0 }, { label: '1 - 2', points: 1 }, { label: '3 - 4', points: 2 }, { label: '≥ 5', points: 3 }] },
      { id: 'effacement', label: 'Effacement (%)', options: [{ label: '0 - 30%', points: 0 }, { label: '40 - 50%', points: 1 }, { label: '60 - 70%', points: 2 }, { label: '≥ 80%', points: 3 }] },
      { id: 'station', label: 'Station (-3 to +3)', options: [{ label: '-3', points: 0 }, { label: '-2', points: 1 }, { label: '-1, 0', points: 2 }, { label: '+1, +2', points: 3 }] },
      { id: 'consistency', label: 'Consistency', options: [{ label: 'Firm', points: 0 }, { label: 'Medium', points: 1 }, { label: 'Soft', points: 2 }] },
      { id: 'position', label: 'Position', options: [{ label: 'Posterior', points: 0 }, { label: 'Mid-position', points: 1 }, { label: 'Anterior', points: 2 }] }
    ],
    riskLevels: [
      { min: 0, max: 5, label: 'unripe', description: 'Unfavorable cervix. Induction unlikely to succeed.', color: 'bg-rose-100 text-rose-700' },
      { min: 6, max: 8, label: 'intermediate', description: 'Predictor of successful induction.', color: 'bg-amber-100 text-amber-700' },
      { min: 9, max: 13, label: 'favorable', description: 'Favorable cervix. High likelihood of successful induction.', color: 'bg-green-100 text-green-700' }
    ]
  },
  {
    id: 'ramsay',
    name: 'Ramsay Sedation Scale',
    description: 'Used to assess the level of sedation in medical and surgical ICU patients.',
    category: 'ICU',
    criteria: [
      {
        id: 'level',
        label: 'Level of Sedation',
        options: [
          { label: 'Level 1: Anxious, agitated, or restless', points: 1 },
          { label: 'Level 2: Cooperative, oriented, and tranquil', points: 2 },
          { label: 'Level 3: Responds only to commands', points: 3 },
          { label: 'Level 4: Brisk response to a light glabellar tap', points: 4 },
          { label: 'Level 5: Sluggish response to a light glabellar tap', points: 5 },
          { label: 'Level 6: No response', points: 6 }
        ]
      }
    ],
    riskLevels: [
      { min: 1, max: 1, label: 'agitated', description: 'Undersedated.', color: 'bg-rose-100 text-rose-700' },
      { min: 2, max: 3, label: 'ideal', description: 'Adequate sedation.', color: 'bg-green-100 text-green-700' },
      { min: 4, max: 6, label: 'oversedated', description: 'Deeply sedated. Review requirements.', color: 'bg-amber-100 text-amber-700' }
    ]
  },
  {
    id: 'cpot',
    name: 'CPOT',
    description: 'Critical-Care Pain Observation Tool. For assessing pain in non-verbal/sedated patients.',
    category: 'ICU',
    criteria: [
      { id: 'face', label: 'Facial expression (Neutral to grimacing)?', options: [{ label: 'Relaxed (0)', points: 0 }, { label: 'Tense (1)', points: 1 }, { label: 'Grimacing (2)', points: 2 }] },
      { id: 'body', label: 'Body movements (None to restlessness)?', options: [{ label: 'Absence (0)', points: 0 }, { label: 'Protection (1)', points: 1 }, { label: 'Restless (2)', points: 2 }] },
      { id: 'muscle', label: 'Muscle tension (Relaxed to very tense)?', options: [{ label: 'Relaxed (0)', points: 0 }, { label: 'Tense (1)', points: 1 }, { label: 'Very Tense/Rigid (2)', points: 2 }] },
      { id: 'vent', label: 'Compliance with Ventilator (or Vocalization)?', options: [{ label: 'Tolerating/Relaxed (0)', points: 0 }, { label: 'Coughing/Alarms (1)', points: 1 }, { label: 'Fighting vent (2)', points: 2 }] }
    ],
    riskLevels: [
      { min: 0, max: 2, label: 'Minimal Pain', description: 'Low pain likely.', color: 'bg-green-100 text-green-700' },
      { min: 3, max: 8, label: 'Significant Pain', description: 'High pain likely. Consider analgesia or procedural support.', color: 'bg-rose-100 text-rose-700' }
    ]
  }
];
