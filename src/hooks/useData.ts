import { 
  SurgerySpecialty, 
  RegionalBlock, 
  ConditionProtocol, 
  ClinicalScore, 
  Guideline, 
  ClinicalAlgorithm 
} from '../types';
import { SURGERY_DATA } from '../features/surgery/data';
import { REGIONAL_BLOCKS } from '../features/regional/data';
import { CONDITIONS_DATA } from '../features/conditions/data';
import { CLINICAL_SCORES } from '../features/scores/data';
import { STATIC_GUIDELINES, DIAGRAM_GUIDELINES, GuidelineDiagram } from '../features/guidelines/data';

export interface AppData {
  surgery: SurgerySpecialty[];
  regional: RegionalBlock[];
  conditions: ConditionProtocol[];
  scores: ClinicalScore[];
  guidelines: Guideline[];
  diagramGuidelines: GuidelineDiagram[];
}

export const useData = (): AppData => {
  return {
    surgery: SURGERY_DATA,
    regional: REGIONAL_BLOCKS,
    conditions: CONDITIONS_DATA,
    scores: CLINICAL_SCORES,
    guidelines: STATIC_GUIDELINES,
    diagramGuidelines: DIAGRAM_GUIDELINES
  };
};
