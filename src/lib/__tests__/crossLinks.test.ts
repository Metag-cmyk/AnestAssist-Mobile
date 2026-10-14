import { describe, it, expect } from 'vitest';
import {
  resolveBlockId,
  conditionIdForGuideline,
  conditionIdsForScore,
  guidelineIdsForCondition,
  scoreIdsForCondition,
  infusionIdsForCondition,
  CONDITION_INFUSION_LINKS,
  CRISIS_CONDITION_LINKS,
  SCORE_CONDITION_LINKS,
} from '../crossLinks';
import { REGIONAL_BLOCKS } from '../../features/regional/data';
import { CONDITIONS_DATA } from '../../features/conditions/data';
import { SURGERY_DATA } from '../../features/surgery/data';
import { DIAGRAM_GUIDELINES } from '../../features/guidelines/data';
import { CLINICAL_SCORES } from '../../features/scores/data';
import { INFUSION_PROTOCOLS } from '../../features/therapies/infusionProtocols';

const BLOCK_IDS = new Set(REGIONAL_BLOCKS.map(b => b.id));
const CONDITION_IDS = new Set(CONDITIONS_DATA.map(c => c.id));

describe('resolveBlockId', () => {
  it.each([
    ['ESP Block', 'erector-spinae-plane-block'],
    ['Erector Spinae Plane (ESP) Block', 'erector-spinae-plane-block'],
    ['Erector Spinae Plane (ESP) Block (Bilateral)', 'erector-spinae-plane-block'],
    ['TAP Block (Subcostal)', 'tap-block'],
    ['Bilateral TAP Block', 'tap-block'],
    ['Transversalis Fascia Block', 'tap-block'],
    ['Thoracic Epidural (T8-T10)', 'epidural-anesthesia'],
    ['Spinal Anesthesia (T10)', 'spinal-anesthesia'],
    ['Interscalene Block', 'interscalene-brachial-plexus'],
    ['Supraclavicular Brachial Plexus Block', 'supraclavicular-brachial-plexus'],
    ['Suprascapular + Axillary Block', 'axillary-brachial-plexus'],
    ['Fascia Iliaca Block (FIB)', 'fascia-iliaca-block'],
    ['Adductor Canal Block (ACB)', 'adductor-canal-block'],
    ['PENG Block', 'peng-block'],
    ['IPACK Block', 'ipack-block'],
    ['PECS I & II Blocks', 'pecs-i-ii-block'],
    ['Femoral Nerve Block / Inguinal Local Infiltration', 'femoral-nerve-block'],
    ['Femoral Triangle Block', 'rectus-femoris-nerve-block'],
    ['Popliteal Sciatic Block', 'popliteal-sciatic-block'],
    ['Quadratus Lumborum (QL) Block', 'quadratus-lumborum-block'],
    ['Serratus Anterior Plane Block', 'serratus-anterior-plane-block'],
    ['Rectus Sheath Block', 'rectus-sheath-block'],
    ['Paravertebral Block', 'paravertebral-block'],
    ['Superficial Cervical Plexus Block', 'superficial-cervical-plexus-block'],
    ['Caudal Block', 'caudal-anesthesia'],
    ['Ankle Block', 'ankle-block'],
  ])('maps "%s" to %s', (label, expected) => {
    expect(resolveBlockId(label)).toBe(expected);
  });

  it.each([
    'Local Infiltration',
    'Wound Infiltration',
    'Port-site Infiltration',
    'N/A',
    'N/A (Damage Control)',
    'None',
    'WALANT (Wide Awake Local)',
    'Bier Block (IVRA)',
    'Intrathecal Morphine (100-200 mcg)',
    'Systemic Analgesia (Spinal optional)',
    'Systemic Opioid TIVA (Avoid Regional due to severe coagulopathy)',
    'Donor site local infiltration / Regional Nerve Blocks',
    'Scalp Block (Bilateral 6-nerve block with Bupivacaine/Ropivacaine + Epinephrine)',
    'Peribulbar Block',
    'External Nasal Block',
  ])('does not invent a link for "%s"', (label) => {
    expect(resolveBlockId(label)).toBeUndefined();
  });

  it('never returns a non-existent block id for any recommended block in the dataset', () => {
    let resolved = 0;
    SURGERY_DATA.forEach(s => s.procedures.forEach(p => {
      (p.recommendedBlocks ?? []).forEach(label => {
        const id = resolveBlockId(label);
        if (id) {
          resolved += 1;
          expect(BLOCK_IDS.has(id), `${label} -> ${id}`).toBe(true);
        }
      });
    }));
    // Guard against the resolver silently regressing to "no links".
    expect(resolved).toBeGreaterThan(40);
  });
});

describe('crisis -> condition links', () => {
  it('every mapped condition exists', () => {
    Object.values(CRISIS_CONDITION_LINKS).forEach(id => {
      expect(CONDITION_IDS.has(id), id).toBe(true);
    });
  });

  it('resolves known crisis guides', () => {
    expect(conditionIdForGuideline('crisis-last-rescue')).toBe('last');
    expect(conditionIdForGuideline('crisis-anaphylaxis-ga')).toBe('anaphylaxis');
    expect(conditionIdForGuideline('crisis-malignant-hyperthermia')).toBe('malignant-hyperthermia');
  });

  it('returns undefined for a crisis guide without a protocol', () => {
    expect(conditionIdForGuideline('crisis-cico-efona')).toBeUndefined();
    expect(conditionIdForGuideline('not-a-guideline')).toBeUndefined();
  });
});

describe('score -> condition links', () => {
  it('every mapped condition exists', () => {
    Object.values(SCORE_CONDITION_LINKS).flat().forEach(id => {
      expect(CONDITION_IDS.has(id), id).toBe(true);
    });
  });

  it('links screening scores to their protocol', () => {
    expect(conditionIdsForScore('qsofa')).toEqual(['sepsis-shock']);
    expect(conditionIdsForScore('glasgow-blatchford')).toEqual(['upper-gi-bleeding']);
    expect(conditionIdsForScore('unknown-score')).toEqual([]);
  });
});

describe('reverse maps', () => {
  const GUIDELINE_IDS = new Set(DIAGRAM_GUIDELINES.map(g => g.id));
  const SCORE_IDS = new Set(CLINICAL_SCORES.map(s => s.id));
  const INFUSION_IDS = new Set(INFUSION_PROTOCOLS.map(p => p.id));

  it('resolves a condition back to its crisis/guideline card', () => {
    expect(guidelineIdsForCondition('last')).toContain('crisis-last-rescue');
    expect(guidelineIdsForCondition('anaphylaxis')).toContain('crisis-anaphylaxis-ga');
    expect(guidelineIdsForCondition('not-a-condition')).toEqual([]);
  });

  it('resolves a condition back to its screening scores', () => {
    expect(scoreIdsForCondition('sepsis-shock').sort()).toEqual(['qsofa', 'sofa']);
    expect(scoreIdsForCondition('difficult-airway')).toEqual(['composite-difficult-airway']);
    expect(scoreIdsForCondition('not-a-condition')).toEqual([]);
  });

  it('only references existing guideline, score and infusion ids', () => {
    Object.entries(CRISIS_CONDITION_LINKS).forEach(([, c]) => expect(CONDITION_IDS.has(c), c).toBe(true));
    guidelineIdsForCondition('last').forEach(id => expect(GUIDELINE_IDS.has(id), id).toBe(true));
    scoreIdsForCondition('sepsis-shock').forEach(id => expect(SCORE_IDS.has(id), id).toBe(true));
    Object.values(CONDITION_INFUSION_LINKS).flat().forEach(id => {
      expect(INFUSION_IDS.has(id), id).toBe(true);
    });
    Object.keys(CONDITION_INFUSION_LINKS).forEach(c => expect(CONDITION_IDS.has(c), c).toBe(true));
  });

  it('maps a few conditions to infusions', () => {
    expect(infusionIdsForCondition('sepsis-shock')).toContain('norepinephrine');
    expect(infusionIdsForCondition('anaphylaxis')).toContain('epinephrine');
    expect(infusionIdsForCondition('not-a-condition')).toEqual([]);
  });
});
