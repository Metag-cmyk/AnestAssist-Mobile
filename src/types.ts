export interface TreatmentStep {
  title: string;
  description: string;
  type: 'action' | 'decision' | 'warning' | 'info';
}

export interface IVFluidManagement {
  choices: string[];
  targets: string[];
  monitoring: string[];
}

export interface ConditionProtocol {
  id: string;
  name: string;
  category: string;
  severity: 'critical' | 'urgent' | 'standard';
  diagnosis: string[];
  immediateActions: string[];
  secondaryManagement: string[];
  diagram?: TreatmentStep[];
  notes?: string;
  ivFluidManagement?: IVFluidManagement;
  normalLabRanges?: { [key: string]: string };
  diagnosticCriteria?: string[];
  expectedLabDeviations?: { [key: string]: string };
  differentialDiagnosis?: string[];
}

export interface Guideline {
  id: string;
  title: string;
  source: 'ASA' | 'ESAIC' | 'ESICM' | 'OAA' | 'RCOG' | 'SOAP' | 'AHA' | 'ACC' | 'ASRA' | 'ERC';
  year: number;
  summary: string;
}

export interface ScoreCriterion {
  id: string;
  label: string;
  options: {
    label: string;
    points: number;
    description?: string;
  }[];
}

export interface ScoreRiskLevel {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
}

export interface ClinicalScore {
  id: string;
  name: string;
  description: string;
  criteria: ScoreCriterion[];
  riskLevels: ScoreRiskLevel[];
  category: 'Respiratory' | 'Sepsis' | 'General' | 'Cardiac' | 'Neurological' | 'Cardiovascular' | 'Vascular' | 'Gastrointestinal' | 'Anesthesia' | 'ICU';
}

export interface SurgeryStep {
  title: string;
  description: string;
}

export interface SurgeryProcedure {
  id: string;
  name: string;
  guide: SurgeryStep[];
  anestheticConsiderations: string[];
  antibioticProphylaxis?: {
    drug: string;
    dosage: string;
    timing: string;
    alternatives?: string;
  };
  complications: {
    surgical: string[];
    anesthetic: string[];
  };
  management: {
    preOp: string[];
    intraOp: string[];
    postOp: string[];
  };
}

export interface SurgerySpecialty {
  id: string;
  name: string;
  generalConsiderations: {
    preOp: string[];
    intraOp: string[];
    postOp: string[];
  };
  procedures: SurgeryProcedure[];
}

export interface BlockTechnique {
  title: string;
  description: string;
}

export interface RegionalBlock {
  id: string;
  name: string;
  category: 'Upper Limb' | 'Lower Limb' | 'Trunk' | 'Neuraxial' | 'Head & Neck';
  indications: string[];
  contraindications: {
    absolute: string[];
    relative: string[];
  };
  anatomy: string[];
  technique: BlockTechnique[];
  sonoAnatomyTips: string[];
  complications: string[];
  suggestedVolume: string;
  maxDoseNote: string;
  probePlacementImage?: string; // Image of the probe on the patient's body
  ultrasoundGuideImage?: string; // The US image with needle and injection points
}

export interface AlgorithmOption {
  label: string;
  nextStepId: string;
}

export interface AlgorithmStep {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'decision' | 'warning' | 'info';
  nextStepId?: string; // For linear steps
  options?: AlgorithmOption[]; // For branching steps
}

export interface ClinicalAlgorithm {
  id: string;
  name: string;
  category: string;
  severity: 'critical' | 'urgent';
  description: string;
  steps: AlgorithmStep[];
  startingStepId: string;
}

export type TabType = 'guidelines' | 'conditions' | 'patient' | 'scores' | 'surgery' | 'ventilator' | 'regional' | 'therapies';
