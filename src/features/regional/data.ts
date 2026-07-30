import { RegionalBlock } from '../../types';

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
    probePlacementImage: '/interscalene_probe_placement.webp',
    ultrasoundGuideImage: '/interscalene_ultrasound_guide.webp'
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
    probePlacementImage: '/fib_probe_placement.webp',
    ultrasoundGuideImage: '/fib_ultrasound_guide.webp'
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
    probePlacementImage: '/tap_probe_placement.webp',
    ultrasoundGuideImage: '/tap_ultrasound_guide.webp'
  },
  {
    id: 'supraclavicular-brachial-plexus',
    name: 'Supraclavicular Brachial Plexus Block',
    category: 'Upper Limb',
    indications: ['Elbow, forearm, and hand surgery'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site', 'Contralateral phrenic nerve palsy'],
      relative: ['Severe lung disease (pneumothorax risk)']
    },
    anatomy: ['Division level of the brachial plexus', 'Superior to the first rib', 'Posterolateral to the subclavian artery'],
    technique: [
      { title: 'Probe Position', description: 'Transverse in the supraclavicular fossa, angled caudad.' },
      { title: 'Approach', description: 'In-plane, lateral to medial.' },
      { title: 'Injection', description: 'Target the "corner pocket" between the artery and the first rib.' }
    ],
    sonoAnatomyTips: ['Identify the first rib and pleura clearly before needle insertion.'],
    complications: ['Pneumothorax', 'Phrenic nerve palsy (50%)', 'Subclavian artery puncture'],
    suggestedVolume: '20 - 25 mL',
    maxDoseNote: 'Standard weight-based limits.',
    probePlacementImage: '/supraclav_probe_placement.webp',
    ultrasoundGuideImage: '/supraclav_ultrasound_guide.webp'
  },
  {
    id: 'axillary-brachial-plexus',
    name: 'Axillary Brachial Plexus Block',
    category: 'Upper Limb',
    indications: ['Forearm and hand surgery'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Axillary lymphadenopathy']
    },
    anatomy: ['Nerves: Radial, Ulnar, Median surrounding the axillary artery', 'Musculocutaneous nerve: Within the coracobrachialis muscle'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the axillary artery in the axilla.' },
      { title: 'Approach', description: 'In-plane, cephalad to caudad.' },
      { title: 'Injection', description: 'Separate injections around the artery and within coracobrachialis.' }
    ],
    sonoAnatomyTips: ['The musculocutaneous nerve often "dives" deep early; check coracobrachialis muscle.'],
    complications: ['Intravascular injection', 'Hematoma'],
    suggestedVolume: '20 - 30 mL (total)',
    maxDoseNote: 'Multiple injections require careful dose tracking.',
    probePlacementImage: '/axillary_probe_placement.webp',
    ultrasoundGuideImage: '/axillary_ultrasound_guide.webp'
  },
  {
    id: 'infraclavicular-brachial-plexus',
    name: 'Infraclavicular Brachial Plexus Block',
    category: 'Upper Limb',
    indications: ['Elbow, forearm, and hand surgery', 'Indwelling catheter for analgesia'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Pectoral implants']
    },
    anatomy: ['Cords: Lateral, Medial, and Posterior surrounding the axillary artery'],
    technique: [
      { title: 'Probe Position', description: 'Parasagittal, medial to the coracoid process, inferior to the clavicle.' },
      { title: 'Approach', description: 'In-plane, cephalad to caudad.' },
      { title: 'Injection', description: 'Posterior to the artery at 6 o\'clock position for U-shaped spread.' }
    ],
    sonoAnatomyTips: ['Deeper block; use a curvilinear probe in obese patients.'],
    complications: ['Vascular puncture', 'Pneumothorax (rare)'],
    suggestedVolume: '20 - 30 mL',
    maxDoseNote: 'Excellent for catheters due to muscle stabilization.',
    probePlacementImage: '/infraclavicular_probe_placement.webp',
    ultrasoundGuideImage: '/axillary_ultrasound_guide.webp'
  },

  {
    id: 'erector-spinae-plane-block',
    name: 'Erector Spinae Plane (ESP) Block',
    category: 'Trunk',
    indications: ['Thoracic surgery, Rib fractures, Breast surgery (T4-T5)', 'Laparotomy (T7-T9)', 'Hip surgery (L2-L4)'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Major spinal deformity']
    },
    anatomy: ['Deep to the erector spinae muscle', 'Superficial to the transverse process of the vertebra'],
    technique: [
      { title: 'Probe Position', description: 'Paramedian sagittal over the target transverse process.' },
      { title: 'Approach', description: 'In-plane, cephalad to caudad.' },
      { title: 'Injection', description: 'Between the muscle and the transverse process tip.' }
    ],
    sonoAnatomyTips: ['Look for the "square-off" transverse process rather than the "pointed" rib.'],
    complications: ['Failed block', 'Muscle injury'],
    suggestedVolume: '20 - 30 mL',
    maxDoseNote: 'High volume required for longitudinal spread.',
    probePlacementImage: '/esp_probe_placement.webp',
    ultrasoundGuideImage: '/esp_ultrasound_guide.webp'
  },
  {
    id: 'pecs-i-ii-block',
    name: 'PECS I & II Blocks',
    category: 'Trunk',
    indications: ['Breast surgery (Mastectomy, augmentation)', 'ICD/Pacemaker insertion'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Pectoral implants']
    },
    anatomy: ['PECS I: Between Pectoralis Major and Minor', 'PECS II: Between Pectoralis Minor and Serratus Anterior'],
    technique: [
      { title: 'Probe Position', description: 'Infra-clavicular, oblique, at the mid-clavicular line.' },
      { title: 'Approach', description: 'In-plane, medial to lateral.' },
      { title: 'Injection', description: '10mL for PECS I, 15-20mL for PECS II.' }
    ],
    sonoAnatomyTips: ['Identify the thoracoacromial artery for PECS I landmark.'],
    complications: ['Pneumothorax', 'Vascular injury'],
    suggestedVolume: '25 - 30 mL',
    maxDoseNote: 'Systemic absorption from breast tissue is high.',
    probePlacementImage: '/pecs_probe_placement.webp',
    ultrasoundGuideImage: '/pecs_ultrasound_guide.webp'
  },
  {
    id: 'adductor-canal-block',
    name: 'Adductor Canal Block (ACB)',
    category: 'Lower Limb',
    indications: ['Knee surgery analgesia (TKA, ACL repair)'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Pre-existing femoral nerve deficit']
    },
    anatomy: ['Deep to the sartorius muscle', 'Saphenous nerve lateral to the femoral artery'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the mid-thigh.' },
      { title: 'Approach', description: 'In-plane, lateral to medial.' },
      { title: 'Injection', description: 'Next to the femoral artery, beneath sartorius muscle.' }
    ],
    sonoAnatomyTips: ['Confirm the "Vasovastus" fascia; the nerve is often small/hyperechoic.'],
    complications: ['Inadequate analgesia', 'Quadriceps weakness if volume > 20mL'],
    suggestedVolume: '15 - 20 mL',
    maxDoseNote: 'Motor-sparing at low volumes.',
    probePlacementImage: '/acb_probe_placement.webp',
    ultrasoundGuideImage: '/acb_ultrasound_guide.webp'
  },
  {
    id: 'peng-block',
    name: 'PENG (Pericapsular Nerve Group) Block',
    category: 'Lower Limb',
    indications: ['Hip fracture analgesia', 'Hip arthroplasty'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Coagulopathy']
    },
    anatomy: ['Deep to psoas tendon', 'On the iliopubic eminence'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the AIIS (Anterior Inferior Iliac Spine).' },
      { title: 'Approach', description: 'In-plane, lateral to medial.' },
      { title: 'Injection', description: 'In the plane between psoas tendon and pubic bone.' }
    ],
    sonoAnatomyTips: ['Ensure the needle is deep to the psoas tendon to hit the articular branches.'],
    complications: ['Muscle weakness (femoral nerve spread)'],
    suggestedVolume: '20 mL',
    maxDoseNote: 'Ideal for motor-sparing hip analgesia.',
    probePlacementImage: '/peng_probe_placement.webp',
    ultrasoundGuideImage: '/peng_ultrasound_guide.webp'
  },
  {
    id: 'popliteal-sciatic-block',
    name: 'Popliteal Sciatic Block',
    category: 'Lower Limb',
    indications: ['Ankle and foot surgery'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Peripheral neuropathy']
    },
    anatomy: ['Sciatic nerve division (Tibial and Common Peroneal)', 'Superior to the popliteal fossa'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the posterior thigh, proximal to the popliteal crease.' },
      { title: 'Approach', description: 'In-plane, lateral to medial.' },
      { title: 'Injection', description: 'Within the V-shaped division of the nerve.' }
    ],
    sonoAnatomyTips: ['Look for the "honeycomb" nerve structure superior to the popliteal artery.'],
    complications: ['Nerve injury', 'Vascular puncture'],
    suggestedVolume: '20 - 25 mL',
    maxDoseNote: 'Commonly combined with a saphenous block for total foot coverage.',
    probePlacementImage: '/pop_sciatic_probe_placement.webp',
    ultrasoundGuideImage: '/pop_sciatic_ultrasound_guide.webp'
  },
  {
    id: 'ipack-block',
    name: 'IPACK Block',
    category: 'Lower Limb',
    indications: ['Posterior knee pain after TKA'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Severe vascular disease of the leg']
    },
    anatomy: ['Between the popliteal artery and the posterior femur capsule'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the popliteal crease.' },
      { title: 'Approach', description: 'In-plane, medial to lateral.' },
      { title: 'Injection', description: 'LA spread across the space between artery and femur.' }
    ],
    sonoAnatomyTips: ['Scan proximal to the condyles for optimal space.'],
    complications: ['Tibial or common peroneal nerve palsy'],
    suggestedVolume: '15 - 20 mL',
    maxDoseNote: 'Usually combined with an Adductor Canal Block.',
    probePlacementImage: '/pop_sciatic_probe_placement.webp',
    ultrasoundGuideImage: '/pop_sciatic_ultrasound_guide.webp'
  },
  {
    id: 'serratus-anterior-plane-block',
    name: 'Serratus Anterior Plane (SAP) Block',
    category: 'Trunk',
    indications: ['Rib fractures, Lateral chest wall surgery'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Low BMI (muscle layers very thin)']
    },
    anatomy: ['On the surface of the serratus anterior muscle', 'Mid-axillary line, 4th-5th rib level'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the mid-axillary line at T4-T5.' },
      { title: 'Approach', description: 'In-plane, cephalad to caudad.' },
      { title: 'Injection', description: 'Between latissimus dorsi and serratus anterior (superficial) or deep to serratus.' }
    ],
    sonoAnatomyTips: ['Watch for the long thoracic nerve; it often sits on the muscle surface.'],
    complications: ['Pneumothorax'],
    suggestedVolume: '20 - 30 mL',
    maxDoseNote: 'Large spread required for multiple rib coverage.',
    probePlacementImage: '/sap_probe_placement.webp',
    ultrasoundGuideImage: '/sap_ultrasound_guide.webp'
  },
  {
    id: 'femoral-nerve-block',
    name: 'Femoral Nerve Block',
    category: 'Lower Limb',
    indications: ['Femur fractures, Knee surgery'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Previous femoral bypass']
    },
    anatomy: ['Lateral to the femoral artery', 'Deep to fascia iliaca'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the inguinal crease.' },
      { title: 'Approach', description: 'In-plane, lateral to medial.' },
      { title: 'Injection', description: 'Surround the nerve (scallops appearance) with LA.' }
    ],
    sonoAnatomyTips: ['Nerve looks like a "wedge" lateral to the pulsatile artery.'],
    complications: ['Vascular puncture', 'Nerve injury'],
    suggestedVolume: '15 - 20 mL',
    maxDoseNote: 'High motor block (quadriceps).',
    probePlacementImage: '/fib_probe_placement.webp',
    ultrasoundGuideImage: '/femoral_nerve_guide.jpg'
  },
  {
    id: 'rectus-sheath-block',
    name: 'Rectus Sheath Block',
    category: 'Trunk',
    indications: ['Umbilical hernia, Midline laparotomy analgesia'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Abdominal wall stomas']
    },
    anatomy: ['Deep to the rectus abdominis muscle', 'Superficial to the posterior rectus sheath'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the rectus muscle.' },
      { title: 'Approach', description: 'In-plane, lateral to medial.' },
      { title: 'Injection', description: 'Between the muscle and the posterior sheath.' }
    ],
    sonoAnatomyTips: ['Ensure the needle does not cross the posterior sheath into the peritoneum.'],
    complications: ['Peritoneal puncture', 'Bowel injury'],
    suggestedVolume: '15 - 20 mL (bilateral)',
    maxDoseNote: 'Often done bilaterally; double the dose calculation.',
    probePlacementImage: '/rectus_sheath_probe_placement.webp',
    ultrasoundGuideImage: '/rectus_sheath_ultrasound_guide.webp'
  },
  {
    id: 'paravertebral-block',
    name: 'Paravertebral Block (Thoracic)',
    category: 'Trunk',
    indications: ['Thoracotomy, Breast surgery, Renal surgery'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Pleural disease, anticoagulation']
    },
    anatomy: ['Paravertebral space: Wedge-shaped space beside the vertebrae'],
    technique: [
      { title: 'Probe Position', description: 'Paramedian sagittal just lateral to the spinous process.' },
      { title: 'Approach', description: 'In-plane, cephalad to caudad.' },
      { title: 'Injection', description: 'Between the superior costotransverse ligament and the pleura.' }
    ],
    sonoAnatomyTips: ['Watch for the pleura "diving" away as LA is injected.'],
    complications: ['Pneumothorax', 'Total spinal (rare)', 'Vascular puncture'],
    suggestedVolume: '15 - 20 mL',
    maxDoseNote: 'Equivalent to unilateral epidural.',
    probePlacementImage: '/esp_probe_placement.webp',
    ultrasoundGuideImage: '/esp_ultrasound_guide.webp'
  },
  {
    id: 'spinal-anesthesia',
    name: 'Spinal Anesthesia (Subarachnoid Block)',
    category: 'Neuraxial',
    indications: [
      'Lower abdominal surgery',
      'Lower limb orthopedic surgery (Hip/Knee/Ankle)',
      'Obstetric surgery (C-section)',
      'Urological/Gynecological procedures',
      'Hernia repairs'
    ],
    contraindications: {
      absolute: [
        'Patient refusal',
        'Infection at the needle entry site',
        'Severe coagulopathy / active anticoagulation',
        'Increased Intracranial Pressure (ICP)',
        'Severe fixed-output cardiac states (e.g., Critical Aortic Stenosis)'
      ],
      relative: [
        'Pre-existing neurological disease',
        'Severe spinal deformity / hardware',
        'Sepsis (distant from site)',
        'Chronic back pain'
      ]
    },
    anatomy: [
      'L3-L4 or L4-L5 interspaces are preferred (terminal spinal cord L1-L2).',
      'Ligaments pierced (midline): Skin, Subcutaneous, Supraspinous, Interspinous, Ligamentum flavum.',
      'Dura-arachnoid membrane: Piercing gives the "pop" and allows CSF flow.'
    ],
    technique: [
      { title: 'Preparation', description: 'Standard aseptic prep. Infiltration of skin with 1-2% Lidocaine.' },
      { title: 'Approaches', description: 'Midline (easiest) or Paramedian (for elderly/calcified ligaments).' },
      { title: 'Injection', description: 'Aspirate to confirm CSF. Inject slowly without further barbotage.' }
    ],
    sonoAnatomyTips: [
      'Use a curvilinear probe (2-5 MHz) in the transverse and sagittal planes.',
      'Identify the "Bat Sign" (transverse process/lamina) and the "Equal Sign" (Dura/Ligamentum Flavum).'
    ],
    complications: [
      'High/Total Spinal (respiratory arrest)',
      'Post-Dural Puncture Headache (PDPH)',
      'Hypotension and Bradycardia (Bezold-Jarisch reflex)',
      'Spinal Hematoma/Abscess',
      'Transient Neurological Symptoms (TNS)'
    ],
    suggestedVolume: '2.0 - 4.0 mL (0.5% Bupivacaine Heavy or Isobaric)',
    maxDoseNote: 'Standard Dose: 10-15mg (2-3mL) 0.5% Bupivacaine. Add Fentanyl (10-25mcg) or Morphine (100mcg) for enhanced analgesia.',
    probePlacementImage: '/spinal_surface_anatomy.webp',
    ultrasoundGuideImage: '/spinal_technique_guide.webp'
  },
  {
    id: 'epidural-anesthesia',
    name: 'Epidural Anesthesia / Analgesia',
    category: 'Neuraxial',
    indications: [
      'Postoperative analgesia for major thoracic or abdominal surgery',
      'Labor analgesia (Continuous infusion)',
      'Chronic pain management',
      'Surgical anesthesia (often with light GA)'
    ],
    contraindications: {
      absolute: [
        'Patient refusal',
        'Uncorrected hypovolemia',
        'Coagulopathy',
        'Infection at site'
      ],
      relative: [
        'Spinal hardware or previous fusion',
        'Neurological deficits',
        'Stenosis'
      ]
    },
    anatomy: [
      'Epidural space lies between the ligamentum flavum and the dura mater.',
      'Contains fat, lymphatics, and internal vertebral venous plexus (Batson\'s plexus).',
      'Space is most generous in the midline (3-6 mm).'
    ],
    technique: [
      { title: 'LOR', description: 'Loss of Resistance (LOR) to Saline (preferred for reliability) or Air.' },
      { title: 'Catheter', description: 'Thread 4-5cm into the space. Avoid multi-perforated catheters being backed out into skin.' },
      { title: 'Test Dose', description: '3mL Lidocaine 1.5% with 1:200k Epi. Monitor for HR increase (+20 bpm) or spinal signals.' }
    ],
    sonoAnatomyTips: [
      'Measure skin-to-ligamentum flavum (S-L) distance on US to set expectations on the Tuohy needle.',
      'Identify the "Pirogoff\'s angle" for needle trajectory.'
    ],
    complications: [
      'Accidental Dural Puncture (Wet tap)',
      'Post-Dural Puncture Headache (PDPH)',
      'Intravascular injection (LAST)',
      'Epidural Hematoma / Abscess',
      'Inadequate or patchy block'
    ],
    suggestedVolume: '8 - 15 mL bolus (0.25% - 0.5% Bupivacaine)',
    maxDoseNote: 'Concentration: 0.1% - 0.125% Bupivacaine/Ropivacaine for analgesia; 0.5% for surgical block. Volume: 1-1.5mL per segment to be blocked.',
    probePlacementImage: '/epidural_surface_anatomy.webp',
    ultrasoundGuideImage: '/epidural_technique_guide.webp'
  },
  {
    id: 'cse-anesthesia',
    name: 'Combined Spinal-Epidural (CSE)',
    category: 'Neuraxial',
    indications: [
      'Labor analgesia (Rapid onset + flexibility)',
      'Long orthopedic / pelvic surgeries',
      'Extended high-quality postoperative analgesia'
    ],
    contraindications: {
      absolute: ['Same as Spinal and Epidural'],
      relative: ['Technical difficulty (Double-space vs Needle-through-needle)']
    },
    anatomy: ['Uses the Epidural space as a conduit for the spinal needle.'],
    technique: [
      { title: 'Needle-through-Needle', description: 'Place Tuohy needle in epidural space (LOR). Pass long spinal needle until dural puncture. Inject Spinal LA. Withdraw spinal needle; thread epidural catheter.' }
    ],
    sonoAnatomyTips: ['Crucial for identifying the optimal level in maternity patients.'],
    complications: ['Similar to both techniques. Increased risk of spinal-to-epidural spread of LA.'],
    suggestedVolume: 'Spinal (1.5-2.0mL) + Epidural (Top-ups as needed)',
    maxDoseNote: 'Allows low-dose spinal for faster recovery while maintaining depth via the catheter.',
    probePlacementImage: '/epidural_surface_anatomy.webp',
    ultrasoundGuideImage: '/epidural_technique_guide.webp'
  },
  {
    id: 'caudal-anesthesia',
    name: 'Caudal Epidural Anesthesia',
    category: 'Neuraxial',
    indications: ['Pediatric surgery (inguinal hernia, circumcision)', 'Chronic low back pain / Sacral nerve root pain'],
    contraindications: {
      absolute: ['Refusal', 'Sepsis', 'Coagulopathy'],
      relative: ['Pilonidal cyst']
    },
    anatomy: ['Entry through the sacral hiatus, covered by the sacrococcygeal ligament.'],
    technique: [
      { title: 'Position', description: 'Prone (adults) or lateral (pediatrics).' },
      { title: 'Needle', description: 'Identify sacral cornua. Insert needle at 45-60 degrees. Drop angle once ligament is pierced.' }
    ],
    sonoAnatomyTips: ['Acoustic shadowing from sacral cornua helps identify the hiatus.'],
    complications: ['Intra-osseous injection', 'Vascular injection', 'Dural puncture (rare)'],
    suggestedVolume: '0.5 - 1.0 mL/kg (Pediatric)',
    maxDoseNote: 'Pediatrics: 0.125% - 0.25% Bupivacaine. Adults: 20mL of 0.25% for chronic pain.',
    probePlacementImage: '/caudal_probe_placement.jpg',
    ultrasoundGuideImage: '/caudal_ultrasound_guide.jpg'
  },
  {
    id: 'stellate-ganglion-block',
    name: 'Stellate Ganglion Block',
    category: 'Head & Neck',
    indications: ['Complex Regional Pain Syndrome (CRPS) Type I & II', 'Hyperhidrosis'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Recent MI, severe cardiac disease']
    },
    anatomy: ['Cervical sympathetic chain', 'Anterior to Chassaignac\'s tubercle (C6 transverse process)'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the neck at C6 level.' },
      { title: 'Approach', description: 'In-plane, lateral to medial.' },
      { title: 'Injection', description: 'On the surface of the Longus Colli muscle, deep to the prevertebral fascia.' }
    ],
    sonoAnatomyTips: ['Identify the carotid artery and internal jugular vein clearly.'],
    complications: ['Horner\'s syndrome (intended)', 'Recurrent laryngeal nerve palsy', 'Vertebral artery injection'],
    suggestedVolume: '5 mL',
    maxDoseNote: 'Low volume to minimize spread to adjacent nerves.',
    probePlacementImage: '/stellate_probe_placement.jpg',
    ultrasoundGuideImage: '/stellate_ultrasound_guide.jpg'
  },

  {
    id: 'superficial-cervical-plexus-block',
    name: 'Superficial Cervical Plexus Block',
    category: 'Head & Neck',
    indications: ['Carotid endarterectomy, Clavicle fractures'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Contralateral phrenic nerve palsy']
    },
    anatomy: ['Posterior border of the sternocleidomastoid muscle (SCM)'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the mid-portion of the SCM.' },
      { title: 'Approach', description: 'In-plane, posterior to anterior.' },
      { title: 'Injection', description: 'Beneath the SCM muscle, targeting the plexus.' }
    ],
    sonoAnatomyTips: ['Look for the "punctum fixum" where the nerves emerge.'],
    complications: ['Phrenic nerve palsy', 'Deep cervical plexus spread'],
    suggestedVolume: '10 - 15 mL',
    maxDoseNote: 'High systemic absorption risk.',
    probePlacementImage: '/interscalene_probe_placement.webp',
    ultrasoundGuideImage: '/interscalene_ultrasound_guide.webp'
  },
  {
    id: 'rectus-femoris-nerve-block',
    name: 'Femoral Triangle Block',
    category: 'Lower Limb',
    indications: ['Knee analgesia (proximal to Adductor Canal)'],
    contraindications: {
      absolute: ['Patient refusal'],
      relative: ['Anticoagulation']
    },
    anatomy: ['Proximal to the adductor canal', 'Beneath the sartorius muscle'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the proximal thigh.' },
      { title: 'Approach', description: 'In-plane approach.' },
      { title: 'Injection', description: 'Around the femoral artery in the femoral triangle apex.' }
    ],
    sonoAnatomyTips: ['Provides broader knee coverage than the AC block.'],
    complications: ['Motor block (partial)'],
    suggestedVolume: '15 - 20 mL',
    maxDoseNote: 'Weight-based safety limits.',
    probePlacementImage: '/acb_probe_placement.webp',
    ultrasoundGuideImage: '/acb_ultrasound_guide.webp'
  },
  {
    id: 'radial-nerve-block',
    name: 'Radial Nerve Block (Elbow)',
    category: 'Upper Limb',
    indications: ['Hand surgery (dorsal radial aspect)'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection'],
      relative: ['Pre-existing palsy']
    },
    anatomy: ['Between the brachialis and brachioradialis muscles'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the lateral aspect of the elbow.' },
      { title: 'Approach', description: 'In-plane.' },
      { title: 'Injection', description: 'As the nerve emerges into the forearm.' }
    ],
    sonoAnatomyTips: ['Follow the nerve up from the wrist to identify clearly.'],
    complications: ['Direct nerve trauma'],
    suggestedVolume: '5 - 8 mL',
    maxDoseNote: 'Usually a component of a multi-nerve block.',
    probePlacementImage: '/axillary_probe_placement.webp',
    ultrasoundGuideImage: '/axillary_ultrasound_guide.webp'
  },
  {
    id: 'ankle-block',
    name: 'Ankle Block (Multi-nerve)',
    category: 'Lower Limb',
    indications: ['Foot surgery (Total)'],
    contraindications: {
      absolute: ['Patient refusal'],
      relative: ['Severe peripheral vascular disease']
    },
    anatomy: ['5 Nerves: Tibial, Deep Peroneal, Superficial Peroneal, Sural, Saphenous'],
    technique: [
      { title: 'Approach', description: 'Multiple injections at the level of the malleoli.' },
      { title: 'Tibial', description: 'Posterior to the medial malleolus near the artery.' },
      { title: 'Peroneal', description: 'Next to the EHL tendon (Deep) and subcutaneous (Superficial).' }
    ],
    sonoAnatomyTips: ['Deep peroneal nerve sits on the anterior surface of the tibia.'],
    complications: ['Failed block (must hit all 5)', 'Ischemia (avoid Epi)'],
    suggestedVolume: '20 - 25 mL (Total)',
    maxDoseNote: 'Do NOT use Epinephrine (terminal circulation).',
    probePlacementImage: '/pop_sciatic_probe_placement.webp',
    ultrasoundGuideImage: '/pop_sciatic_ultrasound_guide.webp'
  },
  {
    id: 'quadratus-lumborum-block',
    name: 'Quadratus Lumborum (QL) Block',
    category: 'Trunk',
    indications: ['Laparotomy, Hip surgery, Nephrectomy', 'Visceral abdominal pain'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Coagulopathy (deep location)']
    },
    anatomy: ['QL muscle: Lateral to the Psoas Major', 'Shamrock sign: Psoas, QL, and Erector Spinae around the L4 TP'],
    technique: [
      { title: 'QL 1 (Lateral)', description: 'Injection lateral to the QL muscle, at its junction with the transversalis fascia.' },
      { title: 'QL 2 (Posterior)', description: 'Injection on the posterior surface of the QL, between QL and Erector Spinae.' },
      { title: 'QL 3 (Anterior/Transmuscular)', description: 'Injection between the QL and Psoas Major muscles.' }
    ],
    sonoAnatomyTips: ['Use a curvilinear probe for better depth. Identify the L4 transverse process for the Shamrock view.'],
    complications: ['Muscle weakness (lumbar plexus spread)', 'Hematoma (deep, non-compressible space)'],
    suggestedVolume: '20 - 30 mL (Bilateral)',
    maxDoseNote: 'High volume required for visceral coverage.',
    probePlacementImage: '/ql_probe_placement.webp',
    ultrasoundGuideImage: '/ql_ultrasound_guide.webp'
  },
  {
    id: 'deep-cervical-plexus-block',
    name: 'Deep Cervical Plexus Block',
    category: 'Head & Neck',
    indications: ['Carotid endarterectomy (CEA)', 'Deep neck surgeries'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site', 'Contralateral phrenic nerve palsy'],
      relative: ['Severe COPD']
    },
    anatomy: ['C2-C4 nerve roots emerging from the transverse processes'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the mid-neck to identify the C4 transverse process.' },
      { title: 'Approach', description: 'In-plane, posterior to anterior.' },
      { title: 'Injection', description: 'At the depth of the transverse process sulcus, outside the foramen.' }
    ],
    sonoAnatomyTips: ['Distinguish the anterior and posterior tubercles of the transverse processes.'],
    complications: ['Vertebral artery injection', 'Total spinal (dural sleeve spread)', 'Phrenic nerve palsy (100%)'],
    suggestedVolume: '5 - 10 mL',
    maxDoseNote: 'Small volume, high-stakes location.',
    probePlacementImage: '/interscalene_probe_placement.webp',
    ultrasoundGuideImage: '/interscalene_ultrasound_guide.webp'
  },
  {
    id: 'median-nerve-block',
    name: 'Median Nerve Block (Wrist/Elbow)',
    category: 'Upper Limb',
    indications: ['Carpal tunnel release, Hand surgery (Palmar aspects)'],
    contraindications: {
      absolute: ['Patient refusal'],
      relative: ['Pre-existing carpal tunnel syndrome']
    },
    anatomy: ['Wrist: Between FCR and PL tendons', 'Elbow: Medial to the Brachial artery'],
    technique: [
      { title: 'Wrist Approach', description: 'Short-axis view between the flexor tendons; in-plane approach.' },
      { title: 'Elbow Approach', description: 'Identify the nerve medial to the artery in the antecubital fossa.' }
    ],
    sonoAnatomyTips: ['The nerve has a "honeycomb" appearance and doesn\'t pulsate.'],
    complications: ['Direct nerve trauma', 'Hematoma'],
    suggestedVolume: '3 - 5 mL',
    maxDoseNote: 'Often used for sensory "rescue" in the hand.',
    probePlacementImage: '/axillary_probe_placement.webp',
    ultrasoundGuideImage: '/axillary_ultrasound_guide.webp'
  },
  {
    id: 'ulnar-nerve-block',
    name: 'Ulnar Nerve Block (Wrist/Elbow)',
    category: 'Upper Limb',
    indications: ['Hand surgery (5th digit and ulnar aspect)'],
    contraindications: {
      absolute: ['Patient refusal'],
      relative: ['Ulnar nerve transposition history']
    },
    anatomy: ['Wrist: Medial to the ulnar artery', 'Elbow: Within the ulnar groove (cubital tunnel)'],
    technique: [
      { title: 'Wrist Approach', description: 'In-plane approach from the ulnar side, lateral to the artery.' },
      { title: 'Elbow Approach', description: 'Identify in the groove between the olecranon and medial epicondyle.' }
    ],
    sonoAnatomyTips: ['At the wrist, the nerve is always medial (ulnar) to the artery.'],
    complications: ['Neuritis (especially at the elbow)'],
    suggestedVolume: '3 - 5 mL',
    maxDoseNote: 'Wrist approach is safer for avoiding compression in the tight ulnar groove.',
    probePlacementImage: '/axillary_probe_placement.webp',
    ultrasoundGuideImage: '/axillary_ultrasound_guide.webp'
  },
  {
    id: 'sciatic-subgluteal-block',
    name: 'Sciatic Nerve Block (Subgluteal)',
    category: 'Lower Limb',
    indications: ['Ankle and foot surgery (when popliteal is inaccessible)'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site'],
      relative: ['Deep vein thrombosis (proximal)']
    },
    anatomy: ['Sciatic nerve between the greater trochanter and ischial tuberosity'],
    technique: [
      { title: 'Probe Position', description: 'Transverse over the subgluteal fold.' },
      { title: 'Approach', description: 'In-plane, lateral to medial.' },
      { title: 'Injection', description: 'Between the gluteus maximus and the quadratus femoris muscles.' }
    ],
    sonoAnatomyTips: ['Look for the large, hyperechoic oval nerve deep to the gluteus maximus muscle.'],
    complications: ['Nerve injury', 'Hematoma (deep)'],
    suggestedVolume: '20 - 25 mL',
    maxDoseNote: 'Large nerve requires significant volume for complete anesthesia.',
    probePlacementImage: '/pop_sciatic_probe_placement.webp',
    ultrasoundGuideImage: '/pop_sciatic_ultrasound_guide.webp'
  }
];
