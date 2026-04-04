export interface Drug {
  name: string;
  dose: string;
  indication: string;
  calculatedDose: string;
  infusionRates?: {
    mcgKgMin: string;
    mcgKgHr: string;
    mgHr: string;
  };
  notes?: string;
}

export interface Antibiotic {
  name: string;
  class: string;
  dose: string;
  interval: string;
  infusion?: {
    method: string;
    rate: string;
    alternative: string;
  };
  notes: string;
  baseWeight: string;
  spectrum: {
    gramPos: number;
    gramNeg: number;
    anaerobes: number;
    mrsa: number;
    pseudomonas: number;
  };
}

export interface EquipmentSizes {
  ett: string;
  depth: string;
  lma: number;
  blade: number;
}
