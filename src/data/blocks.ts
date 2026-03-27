import { RegionalBlock } from '../types';

export const REGIONAL_BLOCKS: RegionalBlock[] = [
  {
    id: 'interscalene-brachial-plexus',
    name: 'Interscalene Brachial Plexus Block',
    category: 'Upper Limb',
    indications: [
      'Shoulder surgery (Total shoulder replacement, rotator cuff repair)',
      'Humerus fractures (proximal)',
      'Clavicle surgery'
    ],
    contraindications: {
      absolute: ['Patient refusal', 'Local infection at injection site', 'Severe COPD (ipsilateral phrenic nerve palsy)'],
      relative: ['Coagulopathy', 'Pre-existing neurological deficit in the limb']
    },
    anatomy: [
      'Nerve roots: C5, C6, C7 (Brachial plexus trunks)',
      'Location: Between the anterior and middle scalene muscles',
      'Phrenic nerve: Lies on the anterior surface of the anterior scalene muscle'
    ],
    technique: [
      { title: 'Probe Position', description: 'Transverse orientation over the neck at the level of the cricoid cartilage (C6).' },
      { title: 'Approach', description: 'In-plane, needle directed from lateral to medial through the middle scalene muscle.' },
      { title: 'Injection', description: 'Target the C5-C7 nerve roots (the "cluster of grapes"); inject 10-15mL of local anesthetic surrounding the trunks.' }
    ],
    sonoAnatomyTips: [
      'Identify the "Stoplight" sign (C5-C7 nerve roots stacked vertically).',
      'Phrenic nerve tracking: Slide the probe cephalad/caudad to ensure the phrenic nerve isn\'t in the needle path.'
    ],
    complications: [
      'Ipsilateral phrenic nerve palsy (100% with standard volumes)',
      'Horner\'s syndrome',
      'Recurrent laryngeal nerve palsy (hoarseness)',
      'Vascular injection (Vertebral artery proximity)'
    ],
    suggestedVolume: '10 - 15 mL',
    maxDoseNote: 'Calculate max dose using weight-based limits (e.g., Ropivacaine 3mg/kg).',
    imagePrompt: 'Professional medical ultrasound illustration of the interscalene brachial plexus, showing the C5, C6, and C7 nerve roots between the anterior and middle scalene muscles, with a needle entering from lateral to medial.'
  },
  {
    id: 'fascia-iliaca-block',
    name: 'Fascia Iliaca Compartment Block (FIB)',
    category: 'Lower Limb',
    indications: [
      'Hip fractures (Neck of femur fractures)',
      'Hip surgery analgesia',
      'Femoral shaft fractures'
    ],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at injection site'],
      relative: ['Previous femoral artery bypass graft', 'Coagulopathy']
    },
    anatomy: [
      'Fascia iliaca: Covers the iliacus muscle',
      'Targets: Femoral nerve, Lateral Femoral Cutaneous Nerve (LFCN), Obturator nerve (partial)',
      'Vascular bundle: Femoral artery lies medial to the nerve'
    ],
    technique: [
      { title: 'Probe Position', description: 'Transverse orientation just distal to the inguinal ligament, lateral to the femoral artery.' },
      { title: 'Approach', description: 'In-plane approach, lateral to medial. The needle must pierce two levels of fascia: fascia lata and fascia iliaca.' },
      { title: 'Injection', description: 'Inject 20-40mL of dilute local anesthetic; observe the fluid lifting the fascia iliaca away from the muscle.' }
    ],
    sonoAnatomyTips: [
      'The "Bow-tie" appearance of the sartorius muscle over the iliopsoas.',
      'A "pop" is felt (and seen) as the needle traverses the fascia iliaca.'
    ],
    complications: [
      'Inadequate block (missed obturator coverage)',
      'Hematoma (proximity to femoral vessels)',
      'Quadriceps weakness (increases fall risk)',
      'LAST (high volume of LA used)'
    ],
    suggestedVolume: '30 - 40 mL (large volume block)',
    maxDoseNote: 'Given the large volume, use low concentration (e.g., 0.1% - 0.2% Ropivacaine or 0.125% - 0.25% Levobupivacaine) to stay within safety limits.',
    imagePrompt: 'Medical anatomical illustration of a fascia iliaca block, showing the needle tip beneath the fascia iliaca layer lateral to the femoral artery, with local anesthetic spreading in the plane above the iliacus muscle.'
  },
  {
    id: 'tap-block',
    name: 'Transversus Abdominis Plane (TAP) Block',
    category: 'Trunk',
    indications: [
      'Laparotomy / Large abdominal incisions',
      'Appendectomy',
      'Cesarean section analgesia',
      'Hernia repair'
    ],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Altered anatomy (previous surgeries)', 'Obesity (obscures muscle layers)']
    },
    anatomy: [
      'Abdominal wall layers (superficial to deep): EAC, IAC, TA muscle.',
      'The TAP plane: Interface between the Internal Oblique (IAC) and Transversus Abdominis (TA) muscles.',
      'Nerves: Terminal branches of T7-L1 intercostal nerves.'
    ],
    technique: [
      { title: 'Probe Position', description: 'Transverse across the mid-axillary line between the rib cage and iliac crest.' },
      { title: 'Approach', description: 'In-plane needle approach from medial to lateral (or vice versa).' },
      { title: 'Injection', description: 'Inject 20mL of LA on each side (bilateral) into the facial plane between the internal oblique and TA muscles.' }
    ],
    sonoAnatomyTips: [
      'Identify the three muscle layers. The TA muscle is usually the thinnest and deepest layer above the peritoneum.',
      'Confirm spread: The plane should open like a "zipper" as the local anesthetic is injected.'
    ],
    complications: [
      'Intraperitoneal injection (bowel injury)',
      'Liver/Spleen injury (avoid if organs are enlarged)',
      'LAST (multiple injections of high-volume LA)'
    ],
    suggestedVolume: '20 mL per side (Bilateral)',
    maxDoseNote: 'Ensure total dose (Left + Right side) does not exceed patient weight-based limits.',
    imagePrompt: 'Medical illustration showing the three muscle layers of the abdominal wall: External Oblique, Internal Oblique, and Transversus Abdominis. A needle is shown correctly positioned in the plane between the Internal Oblique and Transversus Abdominis muscle, with fluid spreading.'
  }
];
