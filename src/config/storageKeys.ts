/**
 * Central registry of every localStorage key used by the app. Keys are grouped
 * by module and prefixed with `anestassist_` to avoid collisions.
 */
export const STORAGE_KEYS = {
  // Patient profile (shared context)
  PATIENT_WEIGHT: 'anestassist_patient_weight',
  PATIENT_HEIGHT: 'anestassist_patient_height',
  PATIENT_AGE: 'anestassist_patient_age',
  PATIENT_GENDER: 'anestassist_patient_gender',

  // Patient calculator (IBW/CrCl tool)
  PATIENT_CALC_TYPE: 'anestassist_patient_calc_type',
  PATIENT_USE_IBW: 'anestassist_patient_use_ibw',
  PATIENT_MANUAL_CRCL: 'anestassist_patient_manual_crcl',

  // Guidelines
  GUIDELINES_SEARCH: 'anestassist_guidelines_search_term',
  GUIDELINES_SELECTED_ID: 'anestassist_guidelines_selected_id',

  // Conditions
  CONDITIONS_SEARCH: 'anestassist_conditions_search_term',
  CONDITIONS_SELECTED_ID: 'anestassist_conditions_selected_id',
  CONDITIONS_ACTIVE_CATEGORY: 'anestassist_conditions_active_category',

  // Surgery
  SURGERY_SEARCH: 'anestassist_surgery_search_term',
  SURGERY_SELECTED_ID: 'anestassist_surgery_selected_id',
  SURGERY_SPECIALTY: 'anestassist_surgery_specialty',

  // Clinical scores
  SCORES_SEARCH: 'anestassist_scores_search_term',
  SCORES_SELECTED_ID: 'anestassist_scores_selected_id',
  SCORES_SELECTIONS: 'anestassist_scores_selections',

  // Regional anaesthesia
  REGIONAL_SEARCH: 'anestassist_regional_search_term',
  REGIONAL_SELECTED_ID: 'anestassist_regional_selected_id',
  REGIONAL_ACTIVE_TAB: 'anestassist_regional_active_tab',

  // Ventilator
  VENTILATOR_CONDITION: 'anestassist_ventilator_condition',

  // Therapies — CVVHDF + infusions + haemodynamics
  THERAPIES_ACTIVE_TAB: 'anestassist_therapies_active_tab',
  INFUSION_DRUG: 'anestassist_infusion_drug',
  INFUSION_WEIGHT_BASIS: 'anestassist_infusion_weight_basis',
  INFUSION_MODE: 'anestassist_infusion_mode',
  INFUSION_DOSE: 'anestassist_infusion_dose',
  INFUSION_RATE: 'anestassist_infusion_rate',
  INFUSION_PREP_INDEX: 'anestassist_infusion_prep_index',
  INFUSION_PUMP_STEP: 'anestassist_infusion_pump_step',
  HEMO_MAP: 'anestassist_hemo_map',
  HEMO_CVP: 'anestassist_hemo_cvp',
  HEMO_MPAP: 'anestassist_hemo_mpap',
  HEMO_PAOP: 'anestassist_hemo_paop',
  HEMO_CO: 'anestassist_hemo_co',
  HEMO_HR: 'anestassist_hemo_hr',
  HEMO_DAMPING: 'anestassist_hemo_damping',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
