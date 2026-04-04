import { Sex, Ethnicity } from '../../contexts/PatientContext';

export interface Coefficients {
  b0: number;
  b1: number;
  b2: number;
  b3: number;
}

export const NHANES_III_COEFFS: Record<string, Record<Sex, Coefficients>> = {
  'fev1': {
    'male': { b0: 0.5536, b1: -0.01303, b2: -0.000172, b3: 0.00014098 },
    'female': { b0: 0.4333, b1: -0.00361, b2: -0.000191, b3: 0.00011496 }
  },
  'fvc': {
    'male': { b0: -0.1933, b1: 0.00063, b2: -0.000161, b3: 0.00018642 },
    'female': { b0: -0.3560, b1: 0.01870, b2: -0.000382, b3: 0.00014846 }
  }
};

export const ETHNICITY_FACTORS: Record<Ethnicity, number> = {
  'caucasian': 1.0,
  'african-american': 0.88,
  'mexican-american': 1.0,
  'other': 1.0
};

// More precise NHANES III coefficients including ethnicity
export const PRECISE_COEFFS: Record<string, Record<Ethnicity, Record<Sex, Coefficients>>> = {
  fev1: {
    caucasian: {
      male: { b0: 0.5536, b1: -0.01303, b2: -0.000172, b3: 0.00014098 },
      female: { b0: 0.4333, b1: -0.00361, b2: -0.000191, b3: 0.00011496 }
    },
    'african-american': {
      male: { b0: 0.3411, b1: -0.01315, b2: -0.000136, b3: 0.00011502 },
      female: { b0: 0.3433, b1: -0.01285, b2: -0.000097, b3: 0.00009630 }
    },
    'mexican-american': {
      male: { b0: 0.6344, b1: -0.01397, b2: -0.000128, b3: 0.00013125 },
      female: { b0: 0.4524, b1: -0.00417, b2: -0.000165, b3: 0.00010915 }
    },
    'other': {
      male: { b0: 0.5536, b1: -0.01303, b2: -0.000172, b3: 0.00014098 },
      female: { b0: 0.4333, b1: -0.00361, b2: -0.000191, b3: 0.00011496 }
    }
  },
  fvc: {
    caucasian: {
      male: { b0: -0.1933, b1: 0.00063, b2: -0.000161, b3: 0.00018642 },
      female: { b0: -0.3560, b1: 0.01870, b2: -0.000382, b3: 0.00014846 }
    },
    'african-american': {
      male: { b0: -0.1517, b1: 0.00204, b2: -0.000180, b3: 0.00015530 },
      female: { b0: -0.3039, b1: 0.00536, b2: -0.000265, b3: 0.00012732 }
    },
    'mexican-american': {
      male: { b0: -0.2376, b1: 0.00519, b2: -0.000174, b3: 0.00017415 },
      female: { b0: -0.3960, b1: 0.01864, b2: -0.000342, b3: 0.00014047 }
    },
    'other': {
      male: { b0: 0.5536, b1: -0.01303, b2: -0.000172, b3: 0.00014098 },
      female: { b0: 0.4333, b1: -0.00361, b2: -0.000191, b3: 0.00011496 }
    }
  }
};
