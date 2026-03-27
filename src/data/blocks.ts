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
    probePlacementImage: '/interscalene_probe_placement.png',
    ultrasoundGuideImage: '/interscalene_ultrasound_guide.png'
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
    probePlacementImage: '/fib_probe_placement.png',
    ultrasoundGuideImage: '/fib_ultrasound_guide.png'
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
    probePlacementImage: '/tap_probe_placement.png',
    ultrasoundGuideImage: '/tap_ultrasound_guide.png'
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
    probePlacementImage: '/supraclav_probe_placement.png',
    ultrasoundGuideImage: '/supraclav_ultrasound_guide.png'
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
    probePlacementImage: '/axillary_probe_placement.png',
    ultrasoundGuideImage: '/axillary_ultrasound_guide.png'
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
    maxDoseNote: 'Excellent for catheters due to muscle stabilization.'
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
    maxDoseNote: 'High volume required for longitudinal spread.'
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
    maxDoseNote: 'Systemic absorption from breast tissue is high.'
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
    maxDoseNote: 'Motor-sparing at low volumes.'
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
    maxDoseNote: 'Ideal for motor-sparing hip analgesia.'
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
    maxDoseNote: 'Commonly combined with a saphenous block for total foot coverage.'
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
    maxDoseNote: 'Usually combined with an Adductor Canal Block.'
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
    maxDoseNote: 'Large spread required for multiple rib coverage.'
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
    maxDoseNote: 'High motor block (quadriceps).'
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
    maxDoseNote: 'Often done bilaterally; double the dose calculation.'
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
    maxDoseNote: 'Equivalent to unilateral epidural.'
  },
  {
    id: 'spinal-anesthesia',
    name: 'Spinal Anesthesia',
    category: 'Neuraxial',
    indications: ['Lower limb surgery, C-section, Urology, Hernia repair'],
    contraindications: {
      absolute: ['Patient refusal', 'Infection at site', 'Raised ICP', 'Severe hypovolemia'],
      relative: ['Anticoagulation, Stenosis']
    },
    anatomy: ['Subarachnoid space (CSF)', 'Level: Below L2 (conus medullaris)'],
    technique: [
      { title: 'Position', description: 'Sitting or lateral decubitus.' },
      { title: 'Approach', description: 'Midline or paramedian; pierce ligamentum flavum and dura.' },
      { title: 'Injection', description: 'Confirm CSF flow; inject hyperbaric or isobaric Bupivacaine.' }
    ],
    sonoAnatomyTips: ['Use ultrasound to identify the "equal sign" of the dura in difficult backs.'],
    complications: ['Post-dural puncture headache (PDPH)', 'Hypotension', 'Bradycardia', 'Nerve injury'],
    suggestedVolume: '2 - 3.5 mL',
    maxDoseNote: 'Dosage depends on desired height (T10, T4).',
    probePlacementImage: '/spinal_surface_anatomy.png',
    ultrasoundGuideImage: '/spinal_technique_guide.png'
  },
  {
    id: 'epidural-anesthesia',
    name: 'Epidural Anesthesia/Analgesia',
    category: 'Neuraxial',
    indications: ['Labor analgesia, Major thoracic/abdominal surgery'],
    contraindications: {
      absolute: ['Patient refusal', 'Severe coagulopathy', 'Sepsis'],
      relative: ['Spinal hardware']
    },
    anatomy: ['Epidural space: Outside the dura mater'],
    technique: [
      { title: 'Identification', description: 'Loss of Resistance (LOR) to saline or air.' },
      { title: 'Catheter', description: 'Thread 3-5cm into the epidural space.' },
      { title: 'Test Dose', description: '3mL Lidocaine 1.5% with Epi 1:200k to rule out intravascular/spinal.' }
    ],
    sonoAnatomyTips: ['Measure the depth from skin to ligamentum flavum to avoid "over-shooting".'],
    complications: ['Dural puncture ("Wet tap")', 'Epidural hematoma/abscess', 'Inadequate block'],
    suggestedVolume: '10 - 20 mL (bolus)',
    maxDoseNote: 'Continuous infusion typically used.',
    probePlacementImage: '/epidural_surface_anatomy.png',
    ultrasoundGuideImage: '/epidural_technique_guide.png'
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
    maxDoseNote: 'Low volume to minimize spread to adjacent nerves.'
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
    maxDoseNote: 'High systemic absorption risk.'
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
    maxDoseNote: 'Weight-based safety limits.'
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
    maxDoseNote: 'Usually a component of a multi-nerve block.'
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
    maxDoseNote: 'Do NOT use Epinephrine (terminal circulation).'
  }
];
