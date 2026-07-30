export interface LAAgent {
  name: string;
  maxDoseKg: number; // mg/kg
  maxDoseKgEpinephrine: number; // mg/kg
  commonConcs: number[]; // % concentrations e.g. [0.5, 0.75, 1.0, 2.0]
}

export const LA_AGENTS: Record<string, LAAgent> = {
  'lidocaine': {
    name: 'Lidocaine',
    maxDoseKg: 5,
    maxDoseKgEpinephrine: 7,
    commonConcs: [1, 2]
  },
  'bupivacaine': {
    name: 'Bupivacaine',
    maxDoseKg: 2,
    maxDoseKgEpinephrine: 2.5,
    commonConcs: [0.25, 0.5]
  },
  'ropivacaine': {
    name: 'Ropivacaine',
    maxDoseKg: 3,
    maxDoseKgEpinephrine: 3.5,
    commonConcs: [0.2, 0.5, 0.75, 1.0]
  },
  'levobupivacaine': {
    name: 'Levobupivacaine',
    maxDoseKg: 2,
    maxDoseKgEpinephrine: 3,
    commonConcs: [0.25, 0.5, 0.75]
  }
};

/**
 * Calculates max safe dose based on weight and epinephrine status.
 * @returns max dose in milligrams (mg)
 */
export const calculateMaxLADose = (weight: number, agentId: string, hasEpinephrine: boolean): number => {
  const agent = LA_AGENTS[agentId];
  if (!agent) return 0;
  
  const limit = hasEpinephrine ? agent.maxDoseKgEpinephrine : agent.maxDoseKg;
  return weight * limit;
};

/**
 * Converts mg dose to volume based on percentage concentration.
 * Rule: 1% = 10mg/mL
 * @returns volume in mL
 */
export const doseToVolume = (mg: number, percentageConc: number): number => {
  if (percentageConc <= 0) return 0;
  const mgPerML = percentageConc * 10;
  return mg / mgPerML;
};
