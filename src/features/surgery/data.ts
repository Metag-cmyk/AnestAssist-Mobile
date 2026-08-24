import { SurgerySpecialty } from '../../types';

export const SURGERY_DATA: SurgerySpecialty[] = [
  {
    id: 'general-surgery',
    name: 'General Surgery',
    generalConsiderations: {
      preOp: [
        'Confirm NPO status (6h solids, 2h clear fluids)',
        'Review recent bloods (FBC, U&E, LFTs if indicated)',
        'Assess for previous abdominal surgeries (adhesion risk)',
        'Confirm consent and site marking'
      ],
      intraOp: [
        'Standard ASA monitoring; consider invasive monitoring (Arterial line) for major resections or high-risk patients.',
        'Insert NG/OG tube for gastric decompression to improve surgical field and reduce risk of aspiration/injury during port placement.',
        'Monitor for pneumoperitoneum effects: increased peak airway pressures, decreased lung compliance, and hemodynamic fluctuations (decreased venous return, increased SVR).',
        'Maintain normothermia using forced-air warming and warmed IV fluids to prevent coagulopathy and surgical site infections.',
        'Ensure adequate neuromuscular blockade throughout the procedure to prevent patient movement and facilitate surgical access.'
      ],
      postOp: [
        'Multimodal analgesia (Paracetamol, NSAIDs, Opioids)',
        'PONV prophylaxis',
        'Early mobilization',
        'Monitor for port-site bleeding or visceral injury'
      ]
    },
    procedures: [
      {
        id: 'lap-chole',
        name: 'Laparoscopic Cholecystectomy',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + Standard GA (RSI if acute abdomen/full stomach)',
        recommendedBlocks: ['TAP Block (Subcostal)', 'Erector Spinae Plane (ESP) Block', 'Port-site Infiltration'],
        erasHighlights: ['Low-pressure pneumoperitoneum (8-10 mmHg)', 'Multi-modal PONV prophylaxis (Ondansetron + Dexamethasone)', 'Opioid-sparing multimodal analgesia'],
        guide: [
          { title: 'Positioning', description: 'Supine or reverse Trendelenburg with 15-20 degree left tilt to displace viscera away from the gallbladder. Ensure arms are tucked or abducted < 90 degrees to prevent brachial plexus injury.' },
          { title: 'Access', description: 'Veress needle or Hasson technique for umbilical port (10mm). Establish pneumoperitoneum (12-15 mmHg). Insert subxiphoid (10mm), and two right subcostal (5mm) ports under direct vision.' },
          { title: 'Dissection', description: 'Retract gallbladder fundus cephalad and Hartmann\'s pouch laterally. Use blunt and sharp dissection to clear Calot\'s triangle, identifying the "critical view of safety" (cystic duct and artery clearly separated from liver bed).' },
          { title: 'Clipping', description: 'Apply two clips proximally and one distally on both the cystic duct and cystic artery. Divide between clips using laparoscopic scissors.' },
          { title: 'Removal', description: 'Use a hook or spatula cautery to dissect the gallbladder from the cystic plate. Place in an endobag if needed and extract through the umbilical port, enlarging the incision if necessary for large stones.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with endotracheal intubation',
          'Muscle relaxation for optimal surgical conditions',
          'Monitor for CO2 embolism (rare but critical)',
          'Manage shoulder-tip pain (referred from diaphragm irritation)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction (within 60 mins of incision)',
          alternatives: 'Clindamycin 600mg IV if penicillin allergic'
        },
        complications: {
          surgical: ['Bile duct injury', 'Bleeding', 'Bowel perforation', 'Infection'],
          anesthetic: ['PONV', 'Aspiration', 'Pneumothorax (rare)', 'CO2 retention']
        },
        management: {
          preOp: ['Review LFTs and ultrasound results', 'Check for jaundice'],
          intraOp: [
            'Monitor for physiological effects of pneumoperitoneum: increased SVR, decreased venous return, and increased airway pressures. Adjust ventilator settings (e.g., increased minute ventilation) to manage CO2 absorption.',
            'Maintain deep neuromuscular blockade to facilitate low-pressure insufflation and prevent sudden patient movement.',
            'Monitor for surgical complications: bradycardia during insufflation (vagal response), gas embolism (sudden drop in EtCO2, "mill-wheel" murmur), and visceral or vascular injury during port insertion.',
            'Administer local anesthetic infiltration at port sites (e.g., Bupivacaine) and consider intraperitoneal local anesthetic to reduce post-operative pain.'
          ],
          postOp: ['Regular analgesia', 'Discharge planning for day-case']
        }
      },
      {
        id: 'appendectomy',
        name: 'Appendectomy (Laparoscopic/Open)',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + RSI (Rapid Sequence Induction) if acute abdomen/peritonitis',
        recommendedBlocks: ['TAP Block (Transversalis Plane)', 'Local Infiltration'],
        erasHighlights: ['Opioid-sparing analgesia', 'Early mobilization', 'Day-case discharge protocol if uncomplicated'],
        guide: [
          { title: 'Positioning & Port Access', description: 'Place patient supine with left tilt. Establish pneumoperitoneum and place umbilical (10mm), suprapubic (5mm), and left lower quadrant (5mm) ports under vision.' },
          { title: 'Cecal Mobilization & Identification', description: 'Follow the taeniae coli of the cecum distally to their convergence at the base of the appendix. Mobilize retrocecal appendix if bound by adhesions.' },
          { title: 'Mesoappendix Dissection & Ligation', description: 'Divide the mesoappendix and appendiceal artery using bipolar diathermy, harmonic scalpel, or titanium clips.' },
          { title: 'Stump Ligation & Appendectomy', description: 'Secure the base of the appendix with two proximal endoloops or an endoscopic stapler and transect the appendix.' },
          { title: 'Specimen Extraction & Peritoneal Lavage', description: 'Place the appendix in an extraction bag and retrieve through the umbilical port. Irrigate pelvis with warm saline and close port sites.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with RSI if suspected peritonitis or full stomach',
          'Adequate hydration (often dehydrated due to vomiting/pain)',
          'Pain management (TAP block or local infiltration)'
        ],
        antibioticProphylaxis: {
          drug: 'Metronidazole + Cefuroxime',
          dosage: '500mg + 1.5g IV',
          timing: 'At induction',
          alternatives: 'Gentamicin + Clindamycin'
        },
        complications: {
          surgical: ['Wound infection', 'Intra-abdominal abscess', 'Stump leak'],
          anesthetic: ['Aspiration risk', 'Sepsis-related hypotension']
        },
        management: {
          preOp: ['Fluid resuscitation', 'Analgesia (morphine titration)'],
          intraOp: [
            'Monitor for signs of sepsis or systemic inflammatory response syndrome (SIRS), including tachycardia and hypotension.',
            'Maintain adequate hydration with balanced crystalloids to compensate for pre-operative fasting and potential sepsis-related fluid shifts.',
            'Ensure rapid sequence induction (RSI) if the patient has symptoms of bowel obstruction or significant peritonitis.',
            'Administer intra-operative antibiotics (e.g., Metronidazole and Cefuroxime) to reduce the risk of post-operative abscess formation.'
          ],
          postOp: ['Antibiotic course if perforated', 'Monitor for return of bowel function']
        }
      },
      {
        id: 'inguinal-hernia',
        name: 'Inguinal Hernia Repair (Open/Laparoscopic)',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Second-Gen LMA (for elective open) or ETT (for lap TEP/TAPP or incarcerated)',
        recommendedBlocks: ['Ilioinguinal / Iliohypogastric Nerve Block', 'TAP Block', 'Transversalis Fascia Block'],
        erasHighlights: ['Day-case procedure', 'Opioid-sparing multi-modal analgesia', 'Early ambulation'],
        guide: [
          { title: 'Incision & Canal Access', description: 'Make an oblique groin incision 2 cm parallel to inguinal ligament. Divide subcutaneous tissues and incise external oblique aponeurosis to open inguinal canal.' },
          { title: 'Cord Structure Identification', description: 'Isolate the spermatic cord (or round ligament) on a Penrose drain. Identify ilioinguinal and iliohypogastric nerves to prevent entrapment.' },
          { title: 'Hernia Sac Dissection & Reduction', description: 'Dissect the indirect hernia sac away from vas deferens and testicular vessels up to internal ring. High ligate or reduce direct sac into retroperitoneum.' },
          { title: 'Mesh Prosthesis Placement', description: 'Position a tailored polypropylene mesh over the inguinal floor, securing to pubic tubercle and inguinal ligament with non-absorbable sutures.' },
          { title: 'Layered Canal Reconstruction & Closure', description: 'Reconstruct external oblique aponeurosis over the cord to restore internal ring tightness. Perform layered subcutaneous and skin closure.' }
        ],
        anestheticConsiderations: [
          'General anesthesia or Spinal/Local with sedation',
          'Manage post-operative pain (Ilioinguinal/Iliohypogastric nerve block)',
          'Monitor for urinary retention (especially after spinal)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Chronic pain', 'Recurrence', 'Hematoma', 'Infection'],
          anesthetic: ['Urinary retention', 'Post-spinal headache (if spinal used)']
        },
        management: {
          preOp: ['Review for chronic cough or constipation', 'Confirm site'],
          intraOp: [
            'Ensure adequate local infiltration if performing under local anesthesia with sedation; monitor for toxicity (LAST).',
            'Monitor for profound bradycardia (vagal response) during traction on the hernia sac or spermatic cord.',
            'Maintain stable hemodynamics and ensure the patient remains still, especially during mesh fixation.',
            'Consider bladder catheterization if the procedure is prolonged or if using spinal anesthesia to prevent retention.'
          ],
          postOp: ['Early mobilization', 'Scrotal support if needed']
        }
      },
      {
        id: 'mastectomy',
        name: 'Mastectomy (Simple/Radical)',
        estimatedBloodLoss: '100 - 300 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Second-Gen LMA or Oral ETT',
        recommendedBlocks: ['PECS I & II Blocks', 'Erector Spinae Plane (ESP) Block', 'Thoracic Paravertebral Block'],
        erasHighlights: ['Opioid-sparing multimodal protocol', 'PONV prophylaxis (Dual antiemetics)', 'Same-day / Early discharge'],
        guide: [
          { title: 'Incision & Flap Elevation', description: 'Perform horizontal elliptical Stewart incision enclosing nipple-areola complex. Elevate superior and inferior subcutaneous skin flaps to clavicle and inframammary fold.' },
          { title: 'Breast Gland Resection', description: 'Dissect breast tissue off the pectoralis major muscle fascia from lateral sternal border to latissimus dorsi muscle edge.' },
          { title: 'Sentinel Node / Axillary Dissection', description: 'Perform sentinel lymph node biopsy (using isosulfan blue/technetium) or Level I/II axillary lymphadenectomy, preserving long thoracic and thoracodorsal nerves.' },
          { title: 'Hemostasis & Cavity Irrigation', description: 'Achieve meticulous thermal cautery hemostasis over chest wall bed. Irrigate field with warm sterile saline.' },
          { title: 'Suction Drain Placement & Skin Closure', description: 'Insert one or two closed-suction Jackson-Pratt drains in axilla and subcutaneous space. Perform continuous intradermal skin closure.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with LMA or ETT',
          'Avoid IV access on the ipsilateral arm',
          'Consider PECS block or Paravertebral block for analgesia',
          'Smooth emergence to prevent hematoma'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Seroma', 'Hematoma', 'Lymphedema', 'Skin flap necrosis'],
          anesthetic: ['PONV', 'Chronic post-mastectomy pain syndrome']
        },
        management: {
          preOp: ['Psychological support', 'Review imaging and pathology'],
          intraOp: [
            'Maintain strict normothermia to prevent coagulopathy and promote wound healing.',
            'Avoid intravenous access, blood pressure monitoring, or needle sticks on the ipsilateral arm to reduce the risk of future lymphedema.',
            'Coordinate with the surgeon for the timing of sentinel lymph node mapping; monitor for rare anaphylactic reactions to isosulfan blue dye.',
            'Administer long-acting local anesthetic (e.g., Ropivacaine) via wound infiltration or regional blocks (PECS I/II or Paravertebral) to minimize post-operative opioid requirements.'
          ],
          postOp: ['Early mobilization of the arm', 'Drain management instructions']
        }
      },
      {
        id: 'hemicolectomy',
        name: 'Hemicolectomy (Right/Left)',
        estimatedBloodLoss: '150 - 400 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + Standard GA',
        recommendedBlocks: ['TAP Block (Bilateral)', 'Thoracic Epidural (T8-T10)', 'Quadratus Lumborum (QL) Block'],
        erasHighlights: ['Goal-Directed Fluid Therapy (GDFT)', 'Pre-op carbohydrate loading', 'Avoid routine nasogastric tubes & early oral intake'],
        guide: [
          { title: 'Access', description: 'Laparoscopic approach (umbilical camera port, 3-4 working ports) or a formal midline laparotomy for better exposure in complex cases.' },
          { title: 'Mobilization', description: 'Reflect the colon medially by dividing the lateral peritoneal attachments (White line of Toldt). Mobilize the hepatic (right) or splenic (left) flexure as required to ensure a tension-free anastomosis.' },
          { title: 'Vascular Ligation', description: 'Identify and ligate the primary feeding vessels (e.g., ileocolic and right colic for right hemicolectomy) at their origin to ensure radical lymphadenectomy.' },
          { title: 'Resection', description: 'Divide the bowel at proximal and distal margins (at least 5cm) using a linear stapler or bowel clamps.' },
          { title: 'Anastomosis', description: 'Perform an extracorporeal or intracorporeal anastomosis (side-to-side or end-to-end) using stapling devices or hand-sewn techniques. Check for orientation and tension.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Consider Epidural or TAP block for post-op analgesia',
          'Goal-directed fluid therapy (avoid fluid overload)',
          'Maintain normothermia'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Gentamicin + Clindamycin'
        },
        complications: {
          surgical: ['Anastomotic leak', 'Bleeding', 'Ureteric injury', 'Ileus'],
          anesthetic: ['PONV', 'Aspiration risk (if obstructed)', 'Fluid imbalance']
        },
        management: {
          preOp: ['Mechanical bowel prep (if indicated)', 'Review CT staging'],
          intraOp: [
            'Implement goal-directed fluid therapy (GDFT) using esophageal Doppler or pulse pressure variation to maintain optimal stroke volume while avoiding fluid overload and bowel edema.',
            'Maintain a mean arterial pressure (MAP) > 65 mmHg to ensure adequate perfusion of the new anastomosis.',
            'Monitor for blood loss, especially during mesenteric dissection; have blood products available for major or complex resections.',
            'Ensure the patient remains normothermic and normoglycemic to reduce the risk of anastomotic leak and surgical site infection.'
          ],
          postOp: ['ERAS protocol', 'Early mobilization', 'Monitor for return of bowel function']
        }
      },
      {
        id: 'gastrectomy',
        name: 'Gastrectomy (Total/Partial)',
        estimatedBloodLoss: '200 - 600 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + RSI (High aspiration risk)',
        recommendedBlocks: ['Thoracic Epidural (T7-T9)', 'TAP Block (Subcostal)', 'ESP Block'],
        erasHighlights: ['Goal-Directed Fluid Therapy', 'Avoid fluid overload to preserve anastomosis', 'Early post-op ambulation & jejunal feeding'],
        guide: [
          { title: 'Access', description: 'Upper midline laparotomy or multi-port laparoscopic approach (for partial gastrectomy).' },
          { title: 'Mobilization', description: 'Divide the greater and lesser omentum. Mobilize the stomach by dividing the short gastric vessels and the left gastric artery.' },
          { title: 'Vascular Ligation', description: 'Perform formal ligation of the left and right gastric arteries and the gastroepiploic vessels at their origins for oncological clearance.' },
          { title: 'Resection', description: 'Divide the duodenum distally and the esophagus (total) or stomach (partial) proximally using linear staplers. Perform D1 or D2 lymphadenectomy.' },
          { title: 'Reconstruction', description: 'Restore continuity using a Roux-en-Y esophagojejunostomy (total) or a Billroth II/Roux-en-Y gastrojejunostomy (partial).' }
        ],
        anestheticConsiderations: [
          'General anesthesia with RSI (high risk of aspiration)',
          'Thoracic epidural for analgesia',
          'Invasive monitoring (Arterial line)',
          'Manage nutritional deficiencies (Anemia, B12)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Anastomotic leak', 'Dumping syndrome', 'Bleeding', 'Vitamin deficiencies'],
          anesthetic: ['Aspiration', 'Pneumonia', 'Pain management challenges']
        },
        management: {
          preOp: ['Optimize nutritional status', 'Review staging'],
          intraOp: [
            'Maintain stable hemodynamics with invasive monitoring; expect significant fluid shifts and potential blood loss.',
            'Ensure deep neuromuscular blockade to facilitate upper abdominal exposure and safe stapling/anastomosis.',
            'Monitor for signs of aspiration during induction; perform rapid sequence induction (RSI) with cricoid pressure if indicated.',
            'Maintain normothermia and monitor urine output as a surrogate for visceral perfusion.'
          ],
          postOp: ['Jejunostomy feeding (if applicable)', 'Monitor for leak (tachycardia/pain)']
        }
      },
      {
        id: 'esophagectomy',
        name: 'Esophagectomy (Ivor-Lewis/McKeown)',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs',
        airwayStrategy: 'Left Double-Lumen Tube (DLT) or Bronchial Blocker for One-Lung Ventilation (OLV)',
        recommendedBlocks: ['Thoracic Epidural (T5-T7)', 'Paravertebral Block', 'ESP Block'],
        erasHighlights: ['Protective One-Lung Ventilation (4-6 mL/kg PBW + PEEP)', 'Strict fluid restriction', 'Early extubation in ICU'],
        guide: [
          { title: 'Abdominal Mobilization & Conduit Prep', description: 'Perform laparotomy or laparoscopy to mobilize stomach, preserving right gastroepiploic artery. Form tubular gastric conduit using endoscopic linear staplers.' },
          { title: 'Feeding Jejunostomy Placement', description: 'Insert needle-catheter enteral feeding jejunostomy tube 15 cm distal to ligament of Treitz for early postoperative nutritional support.' },
          { title: 'Thoracic Mobilization (One-Lung Ventilation)', description: 'Position patient in left lateral decubitus. Initiate OLV via DLT, perform right posterolateral thoracotomy, and dissect thoracic esophagus en-bloc with mediastinal nodes.' },
          { title: 'Esophagogastric Anastomosis', description: 'Pull gastric conduit into thoracic cavity or cervical incision. Perform intrathoracic or cervical end-to-side esophagogastric anastomosis using circular or hand-sewn technique.' },
          { title: 'Pleural Drainage & Layered Closure', description: 'Place apical and basal chest tubes in right hemithorax and mediastinal drain. Re-expand right lung under direct vision and close incisions in layers.' }
        ],
        anestheticConsiderations: [
          'Major surgery with two/three-field approach',
          'One-lung ventilation (OLV) required for thoracic phase',
          'Invasive monitoring and epidural analgesia',
          'Maintain stable hemodynamics and normothermia'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Anastomotic leak', 'Recurrent laryngeal nerve injury', 'Chylothorax', 'Pneumonia'],
          anesthetic: ['OLV-related hypoxia', 'Arrhythmias', 'Fluid overload']
        },
        management: {
          preOp: ['Optimize nutrition', 'Review respiratory function'],
          intraOp: [
            'Manage one-lung ventilation (OLV) carefully; monitor for hypoxia and hypercapnia. Use protective lung ventilation strategies (low tidal volume, PEEP).',
            'Maintain stable hemodynamics during the transition between abdominal and thoracic phases; expect significant fluid shifts.',
            'Ensure adequate analgesia via a thoracic epidural or paravertebral block to facilitate early extubation and prevent pulmonary complications.',
            'Monitor for arrhythmias and hemodynamic instability during mediastinal dissection and esophageal mobilization.'
          ],
          postOp: ['ICU admission', 'Monitor chest drain output']
        }
      },
      {
        id: 'liver-transplant',
        name: 'Liver Transplantation',
        estimatedBloodLoss: '1000 - 5000+ mL (Massive Hemorrhage Risk)',
        bloodProductPrep: 'Massive Transfusion Protocol (MTP): 10 Units PRBCs, 10 FFP, 2 Platelets, Cryoprecipitate',
        airwayStrategy: 'Oral ETT + RSI (High aspiration & encephalopathy risk)',
        recommendedBlocks: ['Systemic Opioid TIVA (Avoid Regional due to severe coagulopathy)'],
        erasHighlights: ['TEG/ROTEM guided transfusion', 'Post-reperfusion syndrome prophylaxis', 'Continuous TEE monitoring'],
        guide: [
          { title: 'Hepatectomy', description: 'Expose the liver via a Mercedes-Benz or bilateral subcostal incision. Mobilize and remove the diseased liver, preserving the IVC (Piggyback technique) or using veno-venous bypass.' },
          { title: 'Anhepatic Phase', description: 'Manage the period without a liver. Expect profound metabolic acidosis, hypocalcemia, and hemodynamic instability due to lack of venous return.' },
          { title: 'Implantation', description: 'Perform the suprahepatic and infrahepatic vena cava anastomoses, followed by the portal vein and hepatic artery reconstructions.' },
          { title: 'Reperfusion', description: 'Flush the graft to remove preservatives and air. Release clamps and monitor for "post-reperfusion syndrome" (hypotension, bradycardia, hyperkalemia).' },
          { title: 'Biliary Reconstruction', description: 'Perform a duct-to-duct anastomosis or a Roux-en-Y hepaticojejunostomy for biliary drainage.' }
        ],
        anestheticConsiderations: [
          'Extremely complex; high risk of massive hemorrhage and coagulopathy',
          'Manage the "Post-reperfusion syndrome" (Bradycardia, hypotension, hyperkalemia)',
          'TEE is essential for monitoring cardiac function and volume status',
          'Tight glucose, electrolyte, and temperature control'
        ],
        antibioticProphylaxis: {
          drug: 'Piperacillin/Tazobactam + Fluconazole',
          dosage: '4.5g + 400mg IV',
          timing: 'At induction',
          alternatives: 'Meropenem'
        },
        complications: {
          surgical: ['Primary non-function', 'Hepatic artery thrombosis', 'Biliary leak', 'Hemorrhage'],
          anesthetic: ['Massive transfusion-related complications', 'Electrolyte imbalance', 'Renal failure']
        },
        management: {
          preOp: ['Review MELD score and baseline labs', 'Optimize hemodynamics'],
          intraOp: [
            'Aggressively manage coagulopathy using TEG/ROTEM and rapid infusion systems; expect massive blood loss and transfusion requirements.',
            'Vigilantly monitor for and treat post-reperfusion syndrome: have calcium, bicarbonate, and vasopressors (e.g., Epinephrine) ready before clamp release.',
            'Maintain tight control of electrolytes (especially potassium and calcium) and acid-base balance during the anhepatic and reperfusion phases.',
            'Use Transesophageal Echocardiography (TEE) to assess right heart function and volume status throughout the procedure.'
          ],
          postOp: ['ICU management', 'Monitor for graft function']
        }
      },
      {
        id: 'gastric-bypass',
        name: 'Gastric Bypass (Roux-en-Y) / Bariatric Surgery',
        estimatedBloodLoss: '< 100 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + HELP (Head-Elevated Laryngoscopy Position) Ramp for OSA / Morbid Obesity',
        recommendedBlocks: ['TAP Block (Subcostal)', 'ESP Block', 'Wound Infiltration'],
        erasHighlights: ['Low-pressure pneumoperitoneum', 'Aggressive multi-modal PONV prophylaxis', 'Early CPAP & mobilization'],
        guide: [
          { title: 'Positioning & Access', description: 'Place patient in steep reverse Trendelenburg to displace viscera inferiorly. Establish pneumoperitoneum (12-15 mmHg) via optical trocar or Veress needle and place 5-6 laparoscopic ports.' },
          { title: 'Pouch Creation', description: 'Divide the lesser omentum near the nerve of Latarjet. Use laparoscopic linear staplers to create a small (15-30 mL) vertical gastric pouch over a calibration bougie, isolating it from the distal stomach.' },
          { title: 'Alimentary & Biliopancreatic Limbs', description: 'Identify the Ligament of Treitz. Measure an 75-100 cm biliopancreatic limb and divide the jejunum. Measure a 100-150 cm alimentary (Roux) limb and bring it antecolic to the gastric pouch.' },
          { title: 'Gastrojejunostomy', description: 'Perform an end-to-side or side-to-side gastrojejunostomy using a linear stapler or circular stapler, hand-sewing the enterotomy. Perform a side-to-side jejunostomy to connect the biliopancreatic limb.' },
          { title: 'Leak Test & Closure', description: 'Instill methylene blue or air via OGT under water seal to check for anastomotic leak. Close mesenteric defects to prevent internal hernia and resect/extract excess tissue if needed.' }
        ],
        anestheticConsiderations: [
          'High risk for difficult airway (OSA, short thick neck)',
          'Requires ramped position for intubation (HELP position)',
          'Altered pharmacokinetics (dose lipophilic drugs to Total Body Weight, hydrophilic to Ideal Body Weight)',
          'High risk of PONV and DVT'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '3g IV (weight > 120kg)',
          timing: 'At induction',
          alternatives: 'Clindamycin 900mg or Vancomycin'
        },
        complications: {
          surgical: ['Anastomotic leak', 'Bleeding', 'Bowel injury', 'Trocar site hernia'],
          anesthetic: ['Failed intubation', 'Atelectasis/Hypoxemia', 'Rhabdomyolysis (from prolonged pressure)']
        },
        management: {
          preOp: ['Screen for OSA (STOP-BANG)', 'Ensure CPAP machine is available post-op'],
          intraOp: [
            'Utilize lung-protective ventilation with recruitment maneuvers and PEEP (10-15 cmH2O) to combat severe atelectasis in steep reverse Trendelenburg.',
            'Monitor for rhabdomyolysis: ensure rigorous padding and avoid excessive procedure duration.',
            'Maintain strict fluid restriction to prevent bowel edema, which complicates the anastomosis.'
          ],
          postOp: ['Multimodal opioid-sparing analgesia', 'Early mobilization and CPAP']
        }
      },
      {
        id: 'apr',
        name: 'Abdominoperineal Resection (APR)',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs',
        airwayStrategy: 'Oral ETT + Standard GA',
        recommendedBlocks: ['Thoracic Epidural (T8-T10)', 'TAP Block', 'Pudendal Nerve Block (Perineal Phase)'],
        erasHighlights: ['Goal-Directed Fluid Therapy', 'Avoid routine NGT', 'Presacral plexus hemorrhage protocol'],
        guide: [
          { title: 'Positioning & Access', description: 'Place patient in Lloyd-Davies or lithotomy position with Trendelenburg. Perform a laparoscopic multi-port entry or lower midline laparotomy.' },
          { title: 'Abdominal Mobilization', description: 'Mobilize the left colon and sigmoid. High tie of the Inferior Mesenteric Artery (IMA) and vein. Perform Total Mesorectal Excision (TME) down to the pelvic floor levator muscles.' },
          { title: 'Perineal Phase', description: 'Position for perineal approach. Perform a circumferential elliptical incision around the anus. Dissect through the levator ani muscles to meet the abdominal plane.' },
          { title: 'Specimen Extraction & Stoma', description: 'Deliver the entire rectum, anal canal, and sphincter complex en-bloc through the perineal defect. Form a permanent end-colostomy in the left iliac fossa.' },
          { title: 'Pelvic Reconstruction & Closure', description: 'Perform meticulous hemostasis of the presacral venous plexus. Reconstruct the pelvic floor with biological mesh or primary closure over suction drains. Close perineal skin in layers.' }
        ],
        anestheticConsiderations: [
          'Prolonged surgery with significant fluid shifts',
          'High risk of massive blood loss',
          'Potential for intraoperative repositioning (supine to prone)',
          'High risk of nerve injury from lithotomy positioning'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g IV + 500mg IV',
          timing: 'At induction (redose Cefuroxime at 4 hours)',
          alternatives: 'Gentamicin + Clindamycin'
        },
        complications: {
          surgical: ['Hemorrhage (presacral venous plexus)', 'Ureteral/Bladder injury', 'Pelvic nerve damage'],
          anesthetic: ['Hypothermia', 'Compartment syndrome of calves', 'Unrecognized hypovolemia']
        },
        management: {
          preOp: ['Type and Cross 2-4 units PRBCs', 'Consider epidural placement if maintaining open approach'],
          intraOp: [
            'Place invasive monitoring (Arterial Line) early due to expected extensive fluid shifts and prolonged operating time.',
            'Actively warm the patient; exposed bowel and long duration rapidly lead to hypothermia and coagulopathy.',
            'Monitor for massive, sudden hemorrhage during the deep pelvic/presacral dissection phase.'
          ],
          postOp: ['Continuous epidural or IV PCA', 'Monitor colostomy perfusion']
        }
      },
      {
        id: 'whipple',
        name: 'Whipple Procedure (Pancreaticoduodenectomy)',
        estimatedBloodLoss: '500 - 1500 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + Cell Saver',
        airwayStrategy: 'Oral ETT + Invasive Arterial Line / CVP',
        recommendedBlocks: ['Thoracic Epidural (T7-T9)', 'Bilateral Subcostal TAP Block', 'Erector Spinae Plane (ESP) Block'],
        erasHighlights: ['Low CVP during resection', 'Strict GDFT in reconstruction phase', 'Tight glycemic control (target 100-140 mg/dL)'],
        guide: [
          { title: 'Access & Staging', description: 'Bilateral subcostal (Rooftopp) or upper midline laparotomy. Perform diagnostic laparoscopy/ultrasound to rule out peritoneal or liver metastases.' },
          { title: 'Kocherization & Dissection', description: 'Extensively mobilize the duodenum and pancreatic head (Kocher maneuver). Dissect the hepatoduodenal ligament, isolating the common bile duct, hepatic artery, and portal vein.' },
          { title: 'Resection', description: 'Divide the stomach/duodenum (pylorus-preserving or classic), common bile duct, proximal jejunum, and pancreatic neck over the portal vein tunnel en-bloc.' },
          { title: 'Pancreaticojejunostomy', description: 'Perform duct-to-mucosa or invagination pancreaticojejunostomy to the retrocolic jejunal loop as the primary reconstruction step.' },
          { title: 'Hepaticojejunostomy & Gastrojejunostomy', description: 'Perform an end-to-side hepaticojejunostomy distally on the jejunal loop, followed by an antecolic gastrojejunostomy/duodenojejunostomy.' },
          { title: 'Drainage & Layered Closure', description: 'Perform meticulous hemostasis and leak testing. Place closed-suction drains adjacent to the pancreatic and biliary anastomoses and close the abdominal wall in layers.' }
        ],
        anestheticConsiderations: [
          'One of the most physiologically demanding GI operations. Duration 4-8 hours.',
          'Thoracic epidural is strongly recommended for post-op pain control and enhanced recovery.',
          'Major blood loss risk during hepatic and portal vein dissection. Have cell saver running.'
        ],
        antibioticProphylaxis: {
          drug: 'Piperacillin-Tazobactam 4.5g',
          dosage: 'Single dose',
          timing: 'Within 60 min of incision. Re-dose every 4h.',
          alternatives: 'Cefazolin + Metronidazole'
        },
        complications: {
          surgical: ['Pancreatic fistula (most common)', 'Delayed gastric emptying', 'Bile leak', 'Post-pancreatectomy hemorrhage'],
          anesthetic: ['Massive hemorrhage', 'Hypothermia', 'Coagulopathy', 'Post-op liver dysfunction']
        },
        management: {
          preOp: ['Nutritional optimization', 'Biliary drainage if jaundiced', 'ERAS protocol initiation', 'Crossmatch 4 units PRBCs'],
          intraOp: ['Arterial line + Central line', 'Epidural catheter', 'Active warming', 'Goal-directed fluid therapy', 'Consider TEG if prolonged bleeding'],
          postOp: ['HDU or ICU Day 1', 'Epidural for 3-5 days', 'Monitor drains for amylase-rich fluid (pancreatic leak)', 'Early enteral feeding']
        }
      },
      {
        id: 'liver-resection',
        name: 'Liver Resection (Hepatectomy)',
        estimatedBloodLoss: '400 - 1200 mL',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs',
        airwayStrategy: 'Oral ETT + Low CVP (< 5 cmH2O) Target during transection',
        recommendedBlocks: ['Erector Spinae Plane (ESP) Block', 'TAP Block (Subcostal)', 'Intrathecal Morphine (100-200 mcg)'],
        erasHighlights: ['Controlled Low CVP anesthesia (< 5 mmHg)', 'Pringle Maneuver time monitoring', 'Fluid restriction until hemostasis'],
        guide: [
          { title: 'Access & Mobilization', description: 'Perform a right subcostal or Mercedes-Benz incision. Divide the triangular and falciform ligaments to mobilize the liver. Perform intraoperative ultrasound to map tumor margins.' },
          { title: 'Vascular Control & Pringle Prep', description: 'Isolate the inflow vessels (portal vein branch and hepatic artery branch). Encircle the hepatoduodenal ligament with a tourniquet for Pringle maneuver (inflow occlusion).' },
          { title: 'Parenchymal Transection', description: 'Perform parenchymal transection using CUSA (Cavitron Ultrasonic Surgical Aspirator), bipolar cautery, or linear staplers under low CVP (< 5 mmHg) to minimize venous bleeding.' },
          { title: 'Hemostasis & Bile Leak Test', description: 'Secure intrahepatic vascular and biliary structures with clips or ties. Perform a bile leak test by injecting air/fluorescein via the cystic duct or compressing the gallbladder.' },
          { title: 'Drainage & Layered Closure', description: 'Achieve complete surface hemostasis with topical hemostatic agents (e.g., fibrin sealant). Place closed-suction drains in the resection bed and perform a layered closure.' }
        ],
        anestheticConsiderations: [
          'Low CVP anaesthesia (CVP < 5 mmHg) during transection reduces hepatic venous bleeding significantly. Use position (head-up), volatile agents, and judicious fluid restriction.',
          'Risk of massive hemorrhage, particularly from hepatic veins or vena cava. Have massive transfusion protocol on standby.',
          'Post-operative liver function depends on the functional liver remnant (FLR). Risk of post-hepatectomy liver failure if FLR < 20-25%.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin 2g',
          dosage: 'Weight-based',
          timing: 'Within 60 min of incision',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Bile leak', 'Post-hepatectomy liver failure', 'Hemorrhage', 'Subphrenic abscess'],
          anesthetic: ['Coagulopathy (reduced hepatic synthetic function)', 'Hypoglycemia', 'Air embolism (hepatic vein injury)']
        },
        management: {
          preOp: ['LFTs, Coagulation screen, CT volumetry of remnant liver', 'Portal vein embolization if FLR insufficient'],
          intraOp: ['A-line essential', 'Target CVP 0-5 during transection', 'Switch to high-volume resuscitation after hemostasis', 'Glucose monitoring'],
          postOp: ['Daily LFTs, INR, Bilirubin', 'Monitor for coagulopathy', 'Nutritional support early']
        }
      },
      {
        id: 'exploratory-laparotomy',
        name: 'Exploratory Laparotomy',
        estimatedBloodLoss: '100 - 1000 mL (Condition Dependent)',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs',
        airwayStrategy: 'Oral ETT + Rapid Sequence Induction (RSI) mandatory',
        recommendedBlocks: ['Bilateral TAP Block', 'Erector Spinae Plane (ESP) Block', 'Wound Infiltration'],
        erasHighlights: ['Rapid warming & GDFT', 'Early extubation if non-septic', 'Opioid-sparing multimodal analgesia'],
        guide: [
          { title: 'Incision & Entry', description: 'Perform a rapid, generous midline laparotomy from xiphoid process to pubic symphysis. Eviscerate and perform immediate suctioning of blood, enteric contents, or purulent fluid.' },
          { title: 'Systematic Quadrant Exploration', description: 'Systematically run the entire small bowel from the Ligament of Treitz to the ileocecal valve. Inspect the stomach, duodenum, colon, liver, spleen, mesentery, and retroperitoneum.' },
          { title: 'Source Control & Hemostasis', description: 'Identify the underlying pathology (perforation, ischemia, bleeding, obstruction). Control hemorrhage with vascular clamping or packing, and control contamination with bowel clamps.' },
          { title: 'Definitive Repair or Resection', description: 'Perform bowel resection, primary anastomosis, stoma creation, or ulcer repair depending on viability and hemodynamic stability.' },
          { title: 'Abdominal Closure or Open Abdomen', description: 'Irrigate the peritoneal cavity with warm saline. Perform layered fascial closure, or implement temporary abdominal closure (e.g., Bogota bag or ABThera) if damage control is needed.' }
        ],
        anestheticConsiderations: [
          'Often an emergency or semi-emergency. RSI mandatory - assume full stomach.',
          'Presentation ranges from stable (diagnostic) to actively dying (ruptured viscus, bowel ischemia). Prepare for both extremes.',
          'Avoid N2O (bowel distension), aggressive PEEP if hemodynamically compromised.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Gentamicin + Clindamycin'
        },
        complications: {
          surgical: ['Bowel injury if adhesiolysis', 'Missed injury', 'Post-op ileus'],
          anesthetic: ['Aspiration', 'Hemodynamic collapse at induction (sepsis/hemorrhage)', 'Hypothermia']
        },
        management: {
          preOp: ['IV access x2 large bore', 'Fluid resuscitation', 'Bloods + Group & Save', 'NG tube'],
          intraOp: ['RSI with Ketamine/Rocuronium', 'A-line early', 'Warm fluids', 'Consider vasopressors if septic'],
          postOp: ['ICU if unstable or damage control', 'NGT decompression', 'Epidural or IV PCA']
        }
      },
      {
        id: 'paraumbilical-hernia',
        name: 'Paraumbilical Hernia Repair',
        guide: [
          { title: 'Incision & Dissection', description: 'Perform an infra-umbilical curvilinear or omega incision. Dissect subcutaneous tissue down to the hernia sac, taking care not to enter the bowel.' },
          { title: 'Sac Dissection & Reduction', description: 'Dissect the hernia sac away from the umbilical skin stalk and line of defect. Open the sac, inspect contents (omentum or small bowel), and reduce them into the peritoneal cavity.' },
          { title: 'Defect Preparation', description: 'Expose the anterior rectus sheath fascia surrounding the hernia defect for a distance of at least 2-3 cm in all directions.' },
          { title: 'Mesh Reinforcement', description: 'Place a macroporous synthetic mesh in the retromuscular (sublay) or preperitoneal space, securing it with non-absorbable sutures to overlap the defect.' },
          { title: 'Umbilical Reconstruction & Closure', description: 'Re-anchor the umbilical skin stalk down to the anterior fascia (tacking stitch). Perform layered subcutaneous closure and skin apposition.' }
        ],
        anestheticConsiderations: [
          'Often simple, but can be an emergency if incarcerated (assume full stomach).',
          'Chronic pain risk if mesh used.',
          'Local infiltration is highly effective for analgesia.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Seroma', 'Wound infection', 'Recurrence', 'Bowel injury (if incarcerated)'],
          anesthetic: ['PONV', 'Urinary retention']
        },
        management: {
          preOp: ['Confirm reducible vs non-reducible', 'Review BMI'],
          intraOp: ['Maintain depth during peritoneal handling', 'Local infiltration at closure'],
          postOp: ['Early mobilization', 'Avoid heavy lifting for 4-6 weeks']
        }
      },
      {
        id: 'lap-rectal-resection',
        name: 'Laparoscopic Anterior Resection (Dixon\'s)',
        guide: [
          { title: 'Positioning & Access', description: 'Place patient in Lloyd-Davies position with Trendelenburg and right tilt. Establish pneumoperitoneum (12-15 mmHg) and place 4-5 laparoscopic ports.' },
          { title: 'Medial-to-Lateral Dissection', description: 'Incise peritoneum over sacral promontory. High ligation of Inferior Mesenteric Artery (IMA) preserving autonomic nerves. Mobilize mesocolon off Gerota\'s fascia.' },
          { title: 'Total Mesorectal Excision (TME)', description: 'Enter embryological avascular mesorectal plane ("holy plane"). Dissect bilaterally down to pelvic floor levators, preserving hypogastric nerve plexuses.' },
          { title: 'Transection & Extraction', description: 'Transect rectum distal to tumor using a laparoscopic linear cutter-stapler. Make a small Pfannenstiel incision to extract specimen and place anvil in proximal colon.' },
          { title: 'Stapled Anastomosis & Leak Test', description: 'Re-establish pneumoperitoneum. Perform end-to-end double-stapled colorectal anastomosis with circular EEA stapler. Perform rigid sigmoidoscopy leak test under water seal.' }
        ],
        anestheticConsiderations: [
          'Major abdominal surgery, steep Trendelenburg, long duration.',
          'Goal-directed fluid therapy to protect the anastomosis.',
          'Restrictive fluid strategy to prevent bowel edema.',
          'Multimodal analgesia (TAP block or Epidural).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction. Redose q4h.',
          alternatives: 'Gentamicin + Clindamycin'
        },
        complications: {
          surgical: ['Anastomotic leak (high risk)', 'Ureteral injury', 'Presacral bleeding', 'Sexual dysfunction'],
          anesthetic: ['Compartment syndrome (lithotomy)', 'Airway edema (Trendelenburg)', 'PONV']
        },
        management: {
          preOp: ['Bowel prep if indicated', 'Review for anemia'],
          intraOp: ['A-line placement', 'Goal-directed fluids', 'Active warming'],
          postOp: ['ERAS protocol', 'Daily drain check', 'Early mobilization']
        }
      },
      {
        id: 'lap-sleeve-gastrectomy',
        name: 'Laparoscopic Sleeve Gastrectomy',
        guide: [
          { title: 'Access', description: 'Insert 5-6 laparoscopic ports in the upper abdomen. Establish pneumoperitoneum (12-15 mmHg).' },
          { title: 'Mobilization', description: 'Use a harmonic scalpel or bipolar device to divide the greater curvature attachments from the antrum to the Angle of His.' },
          { title: 'Resection', description: 'Insert a 36-40 Fr bougie into the stomach to guide the resection. Use laparoscopic linear staplers to divide the stomach vertically, creating a narrow tube.' },
          { title: 'Verification', description: 'Perform a leak test using methylene blue or air. Ensure the stapled edge is hemostatic.' },
          { title: 'Removal', description: 'Extract the resected stomach through the umbilical port using an extraction bag.' }
        ],
        anestheticConsiderations: [
          'High risk for difficult airway (OSA, short thick neck)',
          'Requires HELP (Head-Elevated Laryngoscopy Position) for induction',
          'Manage effects of steep reverse Trendelenburg on ventilation',
          'Multimodal opioid-sparing analgesia'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '3g IV (for weight > 120kg)',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Staple line leak', 'Hemorrhage', 'Gastric stenosis', 'Splenic injury'],
          anesthetic: ['Failed intubation', 'Atelectasis', 'Rhabdomyolysis']
        },
        management: {
          preOp: ['Screen for OSA (STOP-BANG)', 'Ensure large-bore IV access'],
          intraOp: [
            'Utilize pressure-controlled ventilation with high PEEP (10-15 cmH2O) and recruitment maneuvers to combat atelectasis in the obese patient.',
            'Communicate closely with the surgeon during bougie insertion and removal to prevent esophageal or gastric injury.',
            'Administer aggressive PONV prophylaxis, as bariatric patients are at very high risk.',
            'Maintain strict fluid restriction to prevent bowel edema and facilitate stapling.'
          ],
          postOp: ['Early mobilization', 'Continuous CPAP if OSA', 'Multimodal analgesia']
        }
      }
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedic Surgery',
    generalConsiderations: {
      preOp: [
        'Review cardiac and respiratory status (often elderly patients)',
        'Check for previous joint replacements (infection risk)',
        'Review anticoagulation status',
        'Confirm consent and site marking'
      ],
      intraOp: [
        'Prioritize regional anesthesia (Spinal or Epidural) combined with sedation to reduce blood loss, VTE risk, and post-operative cognitive dysfunction in the elderly.',
        'Vigilantly monitor for BCIS during medullary canal reaming and cement insertion; ensure the patient is well-hydrated and FiO2 is optimized before cementing.',
        'Maintain strict normothermia using forced-air warming blankets and warmed fluids to reduce the risk of surgical site infection and coagulopathy.',
        'Monitor blood loss accurately; use cell salvage for major procedures and consider invasive hemodynamic monitoring (Arterial line) for high-risk patients.',
        'Ensure meticulous surgical site preparation and antibiotic timing to minimize the risk of prosthetic joint infection.'
      ],
      postOp: [
        'VTE prophylaxis (LMWH, Aspirin, or mechanical)',
        'Effective pain management (Regional blocks, PCA)',
        'Early mobilization (Physiotherapy)',
        'Monitor for neurovascular compromise'
      ]
    },
    procedures: [
      {
        id: 'thr',
        name: 'Total Hip Replacement (THR)',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Spinal (Subarachnoid Block) + Sedation or ETT + Standard GA',
        recommendedBlocks: ['Fascia Iliaca Block (FIB)', 'PENG Block', 'Lumbar Plexus Block'],
        erasHighlights: ['Pre-op IV Tranexamic Acid (1g at induction)', 'Opioid-sparing multimodal analgesia', 'Early mobilization at 4-6 hours'],
        guide: [
          { title: 'Approach', description: 'Posterior (splitting gluteus maximus), Lateral (Hardinge), or Anterior (Smith-Petersen) approach. Each has specific risks for nerve injury (Sciatic vs. Femoral/LFCN).' },
          { title: 'Preparation', description: 'Perform a capsulotomy, dislocate the femoral head (usually by flexion and internal rotation), and resect the femoral neck at a predetermined level based on pre-operative templating.' },
          { title: 'Acetabulum', description: 'Clear the acetabular labrum and osteophytes. Progressively ream the acetabulum to the desired size and press-fit or cement the acetabular cup, ensuring correct version and inclination.' },
          { title: 'Femur', description: 'Use sequential broaches to prepare the femoral medullary canal. Insert the trial femoral stem and head to assess stability, range of motion, and leg length equality.' },
          { title: 'Reduction', description: 'Replace the trial components with final implants (cemented or uncemented). Reduce the hip joint and perform a final check of stability and impingement through a full range of motion.' }
        ],
        anestheticConsiderations: [
          'Spinal anesthesia is often preferred (decreased blood loss, VTE risk)',
          'Monitor for BCIS during femoral component insertion',
          'Manage blood loss (consider Tranexamic Acid)',
          'Positioning (lateral decubitus) - protect pressure points'
        ],
        antibioticProphylaxis: {
          drug: 'Flucloxacillin or Cefuroxime',
          dosage: '2g or 1.5g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin or Teicoplanin if MRSA risk'
        },
        complications: {
          surgical: ['Dislocation', 'Infection', 'Fracture', 'Nerve injury (Sciatic)'],
          anesthetic: ['VTE (PE/DVT)', 'BCIS', 'Hypotension', 'Urinary retention']
        },
        management: {
          preOp: ['Review pre-admission clinic notes', 'Optimize chronic conditions'],
          intraOp: [
            'Monitor for Bone Cement Implantation Syndrome (BCIS) during femoral preparation and cementing: sudden drop in EtCO2, hypotension, and hypoxia. Inform the surgeon immediately.',
            'Maintain stable hemodynamics (MAP > 65 mmHg) to ensure adequate organ perfusion, especially in elderly patients with comorbidities.',
            'Administer Tranexamic Acid (TXA) early (at induction and/or during closure) to reduce perioperative blood loss and transfusion requirements.',
            'Ensure meticulous positioning and padding in the lateral decubitus position to prevent pressure sores and nerve palsies (e.g., peroneal nerve at the fibular head).'
          ],
          postOp: ['Check hemoglobin levels', 'Ensure adequate analgesia for PT']
        }
      },
      {
        id: 'tkr',
        name: 'Total Knee Replacement (TKR)',
        estimatedBloodLoss: '100 - 300 mL (with Tourniquet)',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Spinal (Subarachnoid Block) + Sedation or ETT + Standard GA',
        recommendedBlocks: ['Adductor Canal Block (ACB)', 'IPACK Block', 'Femoral Triangle Block'],
        erasHighlights: ['Tourniquet time limit < 90 mins', 'Intra-articular LIA infiltration', 'Opioid-sparing recovery & early ambulation'],
        guide: [
          { title: 'Incision', description: 'Perform a midline skin incision followed by a medial parapatellar arthrotomy. Evert the patella to expose the femoral condyles and tibial plateau.' },
          { title: 'Bone Cuts', description: 'Use specialized cutting jigs to perform precise resection of the distal femur and proximal tibia, ensuring correct mechanical alignment and rotation.' },
          { title: 'Trialing', description: 'Insert trial components and assess ligamentous balance (medial/lateral stability) and patellar tracking through a full range of motion.' },
          { title: 'Cementing', description: 'Thoroughly lavage the bone surfaces. Apply bone cement and insert the final femoral, tibial, and patellar components. Maintain pressure until the cement has fully polymerized.' },
          { title: 'Closure', description: 'Deflate the tourniquet to ensure hemostasis. Perform a robust layered closure of the joint capsule, fascia, and skin.' }
        ],
        anestheticConsiderations: [
          'Spinal anesthesia is preferred',
          'Adductor canal block or Femoral nerve block for analgesia',
          'Monitor for BCIS during cementing',
          'Tourniquet management (monitor time and pressure)'
        ],
        antibioticProphylaxis: {
          drug: 'Flucloxacillin or Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Infection', 'Stiffness', 'Periprosthetic fracture', 'Nerve injury'],
          anesthetic: ['VTE', 'BCIS', 'Tourniquet-related pain/injury']
        },
        management: {
          preOp: ['Assess range of motion', 'Review dental health (infection risk)'],
          intraOp: [
            'Monitor tourniquet time and pressure closely; aim for < 90-120 minutes to minimize the risk of nerve injury and muscle ischemia.',
            'Watch for BCIS during the cementing of the femoral and tibial components, especially in patients with significant cardiovascular disease.',
            'Provide multimodal analgesia, including local anesthetic infiltration (LIA) and regional blocks (e.g., Adductor Canal Block), to facilitate early mobilization.',
            'Maintain stable hemodynamics during tourniquet deflation, as transient hypotension and metabolic changes (acidosis, hyperkalemia) may occur.'
          ],
          postOp: ['Continuous Passive Motion (CPM)', 'Aggressive VTE prophylaxis']
        }
      },
      {
        id: 'orif-ankle',
        name: 'ORIF Ankle Fracture',
        estimatedBloodLoss: '< 50 mL (Tourniquet)',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Second-Gen LMA / ETT / Spinal Anesthesia',
        recommendedBlocks: ['Popliteal Sciatic Block', 'Saphenous Nerve Block', 'Ankle Block'],
        erasHighlights: ['Day-case procedure', 'Multi-modal non-opioid baseline', 'Early limb elevation'],
        guide: [
          { title: 'Incision', description: 'Make a lateral incision over the fibula and/or a medial incision over the medial malleolus, taking care to preserve the superficial peroneal and saphenous nerves.' },
          { title: 'Reduction', description: 'Clear the fracture site of hematoma and debris. Use bone reduction forceps to achieve anatomic alignment of the fibula and/or tibia.' },
          { title: 'Fixation', description: 'Secure the fibula with a lag screw and neutralization plate. Fix the medial malleolus with partially threaded cancellous screws or a tension band wire.' },
          { title: 'Syndesmosis', description: 'Perform a "stress test" (Cotton test) to assess for syndesmotic instability. If unstable, insert one or two syndesmotic screws or a tightrope device.' },
          { title: 'Closure', description: 'Irrigate the wound and perform a meticulous layered closure. Apply a well-padded posterior backslab with the ankle in a neutral position.' }
        ],
        anestheticConsiderations: [
          'Spinal anesthesia or GA',
          'Popliteal and Saphenous nerve blocks for excellent analgesia',
          'Positioning (supine with sandbag under hip)',
          'Monitor for compartment syndrome'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Wound breakdown', 'Infection', 'Non-union', 'Hardware irritation'],
          anesthetic: ['VTE', 'Nerve injury from block']
        },
        management: {
          preOp: ['Elevation and ice to reduce swelling', 'Check neurovascular status'],
          intraOp: [
            'Ensure the patient is positioned correctly (supine with a bump under the ipsilateral hip) to facilitate access to the lateral malleolus.',
            'Monitor for signs of compartment syndrome, especially if the injury was high-energy or if there is significant soft tissue swelling.',
            'Utilize intra-operative fluoroscopy (C-arm) to confirm anatomic reduction and correct hardware placement before closure.',
            'Administer regional anesthesia (e.g., Popliteal and Saphenous blocks) to provide superior post-operative pain control and reduce opioid consumption.'
          ],
          postOp: ['Non-weight bearing instructions', 'Monitor for compartment syndrome']
        }
      },
      {
        id: 'acl-reconstruction',
        name: 'ACL Reconstruction',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Second-Gen LMA / ETT / Spinal Anesthesia',
        recommendedBlocks: ['Adductor Canal Block (ACB)', 'IPACK Block', 'Femoral Triangle Block'],
        erasHighlights: ['Day-case procedure', 'Opioid-sparing recovery', 'Early weight bearing as tolerated'],
        guide: [
          { title: 'Harvesting', description: 'Harvest the autograft (e.g., semitendinosus and gracilis tendons or bone-patellar tendon-bone) through a small incision. Prepare and tension the graft on a back table.' },
          { title: 'Arthroscopy', description: 'Perform a systematic diagnostic arthroscopy. Debride the torn ACL remnants and perform a notchplasty if necessary to prevent graft impingement.' },
          { title: 'Tunneling', description: 'Use specialized guides to drill femoral and tibial tunnels at the anatomic footprints of the ACL, ensuring correct orientation and diameter.' },
          { title: 'Graft Passage', description: 'Passing the graft through the tunnels and securing it.' },
          { title: 'Testing', description: 'Checking graft tension and knee stability.' }
        ],
        anestheticConsiderations: [
          'GA or Spinal',
          'Femoral nerve block or Adductor canal block',
          'Tourniquet management',
          'Day-case procedure usually'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Graft failure', 'Arthrofibrosis', 'Infection', 'Nerve injury (Saphenous)'],
          anesthetic: ['VTE', 'PONV', 'Block-related weakness']
        },
        management: {
          preOp: ['Assess pre-op range of motion', 'Confirm graft choice'],
          intraOp: [
            'Maintain a clear arthroscopic view by controlling pump pressure and using epinephrine in the irrigation fluid; monitor for fluid extravasation into the thigh or calf.',
            'Ensure the patient is positioned with the knee able to flex to at least 120 degrees to facilitate femoral tunnel drilling.',
            'Monitor tourniquet time and pressure; consider releasing the tourniquet before closure to ensure hemostasis and reduce post-operative swelling.',
            'Provide effective analgesia using an adductor canal block or femoral nerve block, supplemented by intra-articular local anesthetic.'
          ],
          postOp: ['Early weight bearing (as tolerated)', 'Physiotherapy']
        }
      },
      {
        id: 'shoulder-arthroscopy',
        name: 'Shoulder Arthroscopy (Decompression/Repair)',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT or LMA (Beach Chair position requires strict airway security)',
        recommendedBlocks: ['Interscalene Brachial Plexus Block (ISB)', 'Suprascapular + Axillary Block'],
        erasHighlights: ['Controlled BP to prevent cerebral hypoperfusion', 'Opioid-sparing pathway', 'Day-case discharge'],
        guide: [
          { title: 'Positioning', description: 'Secure the patient in the beach chair position (ensuring head and neck stability) or lateral decubitus position with arm traction.' },
          { title: 'Access', description: 'Establish a posterior portal for the camera. Create anterior and lateral portals under direct vision for instrument access and suture management.' },
          { title: 'Decompression', description: 'Perform a subacromial decompression by resecting the thickened bursa and using a burr to remove the undersurface of the acromion (acromioplasty).' },
          { title: 'Repair', description: 'For rotator cuff tears, debride the tendon edges and prepare the footprint on the greater tuberosity. Use suture anchors to reattach the tendon to the bone.' },
          { title: 'Closure', description: 'Irrigate the joint thoroughly. Remove portals and close the skin with simple sutures or adhesive strips. Apply a shoulder immobilizer or sling.' }
        ],
        anestheticConsiderations: [
          'GA + Interscalene block (gold standard for analgesia)',
          'Monitor for complications of interscalene block (Phrenic nerve palsy)',
          'Positioning (Beach chair) - monitor for cerebral hypoperfusion',
          'Manage irrigation fluid absorption'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Stiffness (Frozen shoulder)', 'Nerve injury', 'Infection', 'Hardware failure'],
          anesthetic: ['Phrenic nerve palsy', 'Cerebral hypoperfusion (in beach chair)', 'Pneumothorax (rare)']
        },
        management: {
          preOp: ['Assess neck mobility', 'Check for existing respiratory disease'],
          intraOp: [
            'Monitor for "Beach Chair" related complications: cerebral hypoperfusion (maintain MAP at brain level), air embolism, and pressure injuries to the head and neck.',
            'Maintain a clear surgical field by managing irrigation fluid pressure and using radiofrequency ablation for hemostasis; monitor for significant soft tissue swelling in the neck/chest.',
            'Ensure stable hemodynamics and avoid sudden changes in blood pressure, which can lead to "red out" (obscured vision due to bleeding) during the procedure.',
            'Provide excellent analgesia using an interscalene brachial plexus block; monitor for potential side effects like phrenic nerve palsy (Horner\'s syndrome).'
          ],
          postOp: ['Sling management', 'Monitor for block resolution']
        }
      },
      {
        id: 'shoulder-replacement',
        name: 'Total Shoulder Replacement',
        estimatedBloodLoss: '200 - 500 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT (Beach Chair Position)',
        recommendedBlocks: ['Interscalene Block', 'Suprascapular + Axillary Nerve Block'],
        erasHighlights: ['Pre-op IV Tranexamic Acid (1g)', 'Beach chair blood pressure monitoring at ear level', 'Early passive motion'],
        guide: [
          { title: 'Incision', description: 'Perform a deltopectoral incision, identifying and preserving the cephalic vein. Retract the deltoid and pectoralis major to expose the clavipectoral fascia.' },
          { title: 'Exposure', description: 'Divide the subscapularis tendon (or perform a lesser tuberosity osteotomy) to expose the shoulder joint. Perform a capsulotomy and dislocate the humeral head.' },
          { title: 'Preparation', description: 'Resect the humeral head at the anatomic neck. Ream the glenoid to the desired size and version, ensuring adequate bone stock for the glenoid component.' },
          { title: 'Insertion', description: 'Insert the trial components to assess stability, range of motion, and tension. Replace with final implants (cemented or uncemented humeral stem and glenoid component).' },
          { title: 'Closure', description: 'Anatomically repair the subscapularis tendon. Irrigate the joint and perform a layered closure of the fascia and skin. Apply a shoulder immobilizer.' }
        ],
        anestheticConsiderations: [
          'General anesthesia or Interscalene block + Sedation',
          'Positioning (Beach chair) - risk of cerebral hypoperfusion',
          'Monitor for BCIS if cemented',
          'Manage post-op pain with regional techniques'
        ],
        antibioticProphylaxis: {
          drug: 'Flucloxacillin or Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Instability/Dislocation', 'Infection', 'Nerve injury (Axillary)', 'Rotator cuff tear'],
          anesthetic: ['Cerebral hypoperfusion (Beach chair)', 'Phrenic nerve palsy (from block)']
        },
        management: {
          preOp: ['Review for cervical spine issues', 'Confirm side'],
          intraOp: [
            'Monitor for cerebral hypoperfusion in the beach chair position; maintain MAP at the level of the external auditory meatus to ensure adequate brain perfusion.',
            'Vigilantly watch for signs of air embolism and pressure injuries to the head and neck during the procedure.',
            'Provide effective analgesia using an interscalene brachial plexus block; monitor for phrenic nerve palsy and Horner\'s syndrome.',
            'Maintain stable hemodynamics and monitor for blood loss, which can be significant during humeral reaming and glenoid preparation.'
          ],
          postOp: ['Sling immobilization', 'Monitor neurovascular status']
        }
      },
      {
        id: 'im-nailing',
        name: 'Femoral Intramedullary (IM) Nailing',
        estimatedBloodLoss: '300 - 800 mL (Occult loss into thigh)',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT or Spinal Anesthesia',
        recommendedBlocks: ['Femoral Nerve Block', 'Fascia Iliaca Block (FIB)'],
        erasHighlights: ['Pre-op block for traction positioning pain', 'Tranexamic Acid 1g IV', 'Early mobilization'],
        guide: [
          { title: 'Positioning & Traction', description: 'Place patient on fracture table (supine or lateral decubitus). Apply traction via foot boot against perineal post to achieve initial closed fracture alignment.' },
          { title: 'Entry Point & Reaming', description: 'Make a 3-5 cm skin incision proximal to the greater trochanter. Insert entry awl and pass a flexible ball-tipped guidewire across the fracture site under fluoroscopy. Ream the medullary canal sequentially.' },
          { title: 'Nail Insertion', description: 'Select an appropriately sized intramedullary nail and drive it down the reamed femoral canal over the guidewire across the fracture line.' },
          { title: 'Interlocking Screws', description: 'Place proximal locking screws (or cephalomedullary hip screw) and distal interlocking screws using fluoroscopic targeting to prevent rotation and shortening.' },
          { title: 'Closure & Dressing', description: 'Remove guidewire and traction. Flush entry wounds and perform a layered closure of fascia, subcutaneous tissue, and skin over a simple sterile dressing.' }
        ],
        anestheticConsiderations: [
          'High risk of Fat Embolism Syndrome (FES) during canal reaming',
          'Severe pain on positioning prior to anesthesia/block',
          'Significant occult blood loss (1000ml+ often hidden in thigh compartment)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin or Vancomycin'
        },
        complications: {
          surgical: ['Compartment syndrome', 'Nerve injury (pudendal nerve from perineal post)', 'Malunion'],
          anesthetic: ['Fat Embolism', 'Hypoventilation from positioning', 'Hypovolemic shock']
        },
        management: {
          preOp: ['Consider Fascia Iliaca or Femoral Nerve Block for positioning pain', 'Crossmatch blood'],
          intraOp: [
            'Vigilantly monitor for Fat Embolism Syndrome during femoral reaming: sudden drop in EtCO2, tachycardia, hypoxia, and hypotension.',
            'Communicate with the surgeon regarding traction weight to avoid pudendal nerve crush injury against the perineal post.',
            'Anticipate significant occult blood loss in the thigh; maintain proactive fluid resuscitation.'
          ],
          postOp: ['Monitor for compartment syndrome', 'VTE prophylaxis (LMWH)']
        }
      },
      {
        id: 'total-shoulder-arthroplasty',
        name: 'Total Shoulder Arthroplasty (TSA)',
        estimatedBloodLoss: '200 - 500 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + Beach Chair position safety checks',
        recommendedBlocks: ['Interscalene Block', 'Suprascapular + Axillary Block'],
        erasHighlights: ['Phenylephrine infusion to maintain MAP at brain level', 'TXA 1g IV at induction'],
        guide: [
          { title: 'Positioning & Beach Chair Prep', description: 'Position patient in 45-60 degree beach chair position. Secure head in rigid headrest ensuring free neck positioning and zero pressure on eyes/ear lobules.' },
          { title: 'Deltopectoral Exposure', description: 'Make an anterior incision from coracoid process down toward deltoid insertion. Mobilize cephalic vein lateral, divide clavipectoral fascia, and perform subscapularis tenotomy.' },
          { title: 'Humeral Preparation', description: 'Dislocate humeral head anteriorly. Perform anatomical neck osteotomy. Sequential reaming and broaching of humeral medullary canal.' },
          { title: 'Glenoid Preparation & Implantation', description: 'Expose glenoid cavity using specialized retractors. Clear labrum, ream glenoid surface to correct version, drill anchoring peg holes, and cement high-density polyethylene glenoid component.' },
          { title: 'Humeral Stem Insertion & Subscapularis Repair', description: 'Insert trial humeral stem and head, verify stability and range of motion. Insert final prostheses, reattach subscapularis tendon with heavy non-absorbable sutures, and close in layers.' }
        ],
        anestheticConsiderations: [
          'Beach-chair position: high risk of cerebral hypoperfusion from orthostatic gradient. MAP at the Brain = measured MAP minus the vertical distance (in cmH2O converted to mmHg) between the transducer and the head.',
          'Interscalene brachial plexus block is the gold-standard regional technique; provides excellent intraoperative conditions and long-acting post-op analgesia (up to 18h).',
          'Interscalene block always causes ipsilateral phrenic nerve palsy (~100%). Avoid in patients with contralateral lung disease or single functioning lung.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin 2g',
          dosage: 'Weight based (3g if >120kg)',
          timing: 'Within 60 min of incision',
          alternatives: 'Vancomycin if MRSA history'
        },
        complications: {
          surgical: ['Axillary nerve injury', 'Glenoid component loosening', 'Rotator cuff tear', 'Infection'],
          anesthetic: ['Cerebral hypoperfusion (beach-chair)', 'Pneumothorax (interscalene block)', 'Local anesthetic toxicity', 'Air embolism']
        },
        management: {
          preOp: ['Interscalene block placement', 'Assess respiratory reserve', 'Establish MAP target for position'],
          intraOp: ['Transduce A-line at head level or correct for height difference', 'Phenylephrine infusion to maintain MAP', 'SSEP/MEP monitoring if concern'],
          postOp: ['Sling immobilization', 'Interscalene catheter for prolonged analgesia', 'Monitor neurovascular status of hand']
        }
      },
      {
        id: 'multilevel-spinal-fusion',
        name: 'Multi-level Spinal Fusion (≥3 levels)',
        estimatedBloodLoss: '500 - 2000 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + Cell Saver',
        airwayStrategy: 'Oral ETT + TIVA (Propofol/Remifentanil for IONM)',
        recommendedBlocks: ['Erector Spinae Plane (ESP) Block (Bilateral)', 'Thoracic Epidural'],
        erasHighlights: ['TIVA mandatory for neuromonitoring', 'TXA loading + continuous infusion', 'Logan prone positioning (eye protection)'],
        guide: [
          { title: 'Positioning & Eye Check', description: 'Log-roll patient prone onto Wilson frame or Jackson table. Ensure abdomen hangs free (prevents epidural venous engorgement). Meticulous eye offloading (prevent POVL).' },
          { title: 'Midline Exposure & Level Marking', description: 'Make a midline longitudinal incision over targeted spine segments. Subperiosteally strip paraspinal muscles from spinous processes and laminae. Confirm levels via C-arm fluoroscopy.' },
          { title: 'Pedicle Screw Placement', description: 'Prepare pedicle entry points under fluoroscopic/navigational guidance using gearshift probe. Tap pedicles and insert titanium pedicle screws across all targeted levels.' },
          { title: 'Decompression & Interbody Fusion (PLIF/TLIF)', description: 'Perform laminectomies and facetectomies. Carefully retract dural sac and nerve roots. Perform discectomy and pack interbody cage with bone graft into disc space.' },
          { title: 'Rod Fixation & Layered Closure', description: 'Contour titanium rods into lumbar lordosis and lock onto pedicle screw heads with set screws. Place decorticated posterolateral bone graft. Insert deep drain and close fascia in layers.' }
        ],
        anestheticConsiderations: [
          'Significant blood loss expected (500-2000mL+). Use Cell Saver, Tranexamic Acid (TXA) infusion, and consider deliberate hypotension (MAP 65-75) to reduce field bleeding.',
          'Intraoperative neuromonitoring (IONM): SSEP and MEP are mandatory. Avoid neuromuscular blocking agents once monitoring is established. Limit volatile agents (prefer TIVA with Propofol/Remifentanil).',
          'Post-operative vision loss (POVL) is a rare but catastrophic complication; maintain adequate MAP and Hgb, use Logan position (slight reverse Trendelenburg prone), and limit case duration.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin 2g',
          dosage: 'Weight based. Re-dose every 4h.',
          timing: 'Within 60 min of incision',
          alternatives: 'Vancomycin powder locally + Systemic Clindamycin'
        },
        complications: {
          surgical: ['Hardware failure', 'Adjacent segment disease', 'Dural tear/CSF leak', 'Infection (deep wound)'],
          anesthetic: ['Post-operative vision loss (POVL)', 'Massive hemorrhage', 'Prone position injuries (eyes, brachial plexus)', 'Airway edema']
        },
        management: {
          preOp: ['Autologous blood donation consideration', 'IONM team briefed', 'Discuss TIVA plan'],
          intraOp: ['TIVA (Propofol+Remifentanil)', 'TXA 1g loading + 1g infusion', 'Cell saver', 'Target MAP 65-75', 'Regular eye checks'],
          postOp: ['PACU visual check (ask patient to open eyes)', 'ICU if >6 levels or high blood loss', 'IV PCA or epidural']
        }
      },
      {
        id: 'total-elbow-replacement',
        name: 'Total Elbow Arthroplasty',
        estimatedBloodLoss: '100 - 300 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Second-Gen LMA / Oral ETT',
        recommendedBlocks: ['Supraclavicular Brachial Plexus Block', 'Infraclavicular Block'],
        erasHighlights: ['Supraclavicular block for opioid avoidance', 'Early controlled mobilization'],
        guide: [
          { title: 'Incision & Ulnar Nerve Transposition', description: 'Make a posterior midline incision curving laterally around olecranon. Identify, mobilize, and anteriorly transpose the ulnar nerve to prevent postoperative stretch palsy.' },
          { title: 'Joint Exposure & Resection', description: 'Reflect or split the triceps mechanism. Perform distal humeral and proximal ulnar osteotomies to expose the medullary canals.' },
          { title: 'Canal Preparation & Broaching', description: 'Sequentially ream and rasp the humeral and ulnar medullary canals to fit the semiconstrained stem components.' },
          { title: 'Cementing & Coupling', description: 'Pulse-lavage bone canals. Inject PMMA bone cement and insert humeral and ulnar components. Link the hinge pin mechanism once cement cures.' },
          { title: 'Triceps Repair & Closure', description: 'Reattach the triceps tendon to the olecranon using heavy non-absorbable sutures/anchors. Place a suction drain and close skin in layers.' }
        ],
        anestheticConsiderations: [
          'GA or Regional (Supraclavicular/Infraclavicular block).',
          'Positioning (lateral or supine over the chest) - protect the face and neck.',
          'High risk of postoperative pain; regional blocks are essential.'
        ],
        antibioticProphylaxis: {
          drug: 'Flucloxacillin or Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Ulnar nerve palsy', 'Infection', 'Instability', 'Triceps weakness'],
          anesthetic: ['Nerve injury from block', 'Pressure sores']
        },
        management: {
          preOp: ['Document baseline nerve function (Ulnar/Radial)', 'Review for rheumatoid arthritis'],
          intraOp: ['Careful limb positioning', 'Ensure the ulnar nerve is protected', 'Active warming'],
          postOp: ['Splint management', 'Early, controlled mobilization']
        }
      },
      {
        id: 'hip-hemiarthroplasty',
        name: 'Hip Hemiarthroplasty',
        estimatedBloodLoss: '200 - 500 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2 Units',
        airwayStrategy: 'Spinal (Subarachnoid Block) + Sedation or ETT',
        recommendedBlocks: ['Fascia Iliaca Block (FIB)', 'PENG Block'],
        erasHighlights: ['TXA 1g IV at induction', 'BCIS monitoring protocol during cementing', 'Early post-op mobilization at 6h'],
        guide: [
          { title: 'Incision & Capsulotomy', description: 'Perform a posterolateral (Hardinge) or direct lateral incision. Dissect down to the hip capsule and perform a T-shaped capsulotomy.' },
          { title: 'Femoral Head Resection', description: 'Dislocate the fractured femoral head. Measure head size with a gauge to select the appropriate prosthetic head diameter.' },
          { title: 'Canal Preparation & Broaching', description: 'Perform a femoral neck cut at the designated level. Sequentially broach the femoral canal manually to ensure axial and rotational stability.' },
          { title: 'Femoral Component Insertion', description: 'Thoroughly irrigate and dry the canal. Insert a cemented or uncemented stem (Austin-Moore / Thompson / Bipolar head prosthesis), monitoring closely for BCIS during cement pressurization.' },
          { title: 'Reduction & Layered Closure', description: 'Reduce the prosthetic head into the native acetabulum. Check range of motion and joint stability. Repair posterior capsule/rotators and close fascia and skin in layers.' }
        ],
        anestheticConsiderations: [
          'Typically elderly, frail patients with multiple comorbidities.',
          'High risk of BCIS during medullary reaming and cementing.',
          'Regional anesthesia (Spinal) associated with lower mortality and VTE risk.',
          'Optimize fluid status but avoid overload (risk of CCF).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Dislocation', 'Periprosthetic fracture', 'Infection', 'Leg length discrepancy'],
          anesthetic: ['BCIS', 'VTE', 'Delirium', 'Pneumonia']
        },
        management: {
          preOp: ['Optimize heart failure/COPD', 'Check electrolytes (K+)', 'Fast-track surgery (<36h)'],
          intraOp: ['Maintain stable BP (avoid >20% drop from baseline)', 'Monitor for BCIS', 'Administer TXA'],
          postOp: ['Early mobilization', 'Delirium screening', 'Monitor hemoglobin']
        }
      }
    ]
  },
  {
    id: 'urology',
    name: 'Urology',
    generalConsiderations: {
      preOp: [
        'Review renal function (U&Es, GFR)',
        'Check for UTI (urine dip/culture)',
        'Assess anticoagulation status (high bleeding risk in some procedures)',
        'Confirm NPO status'
      ],
      intraOp: [
        'Monitor for the "TURP Syndrome" (hyponatremia, fluid overload) when using glycine irrigation; prioritize isotonic irrigation (saline) with bipolar cautery where possible.',
        'Ensure the patient is positioned carefully in the lithotomy position to prevent nerve injuries (e.g., common peroneal nerve) and compartment syndrome of the legs.',
        'Maintain stable hemodynamics during changes in positioning (e.g., Trendelenburg or Lithotomy), as these can significantly impact venous return and airway pressures.',
        'Monitor for signs of bladder perforation or hemorrhage during endoscopic procedures; ensure adequate irrigation and hemostasis.',
        'Provide effective analgesia using regional techniques (e.g., Spinal or Caudal blocks) or local infiltration to minimize post-operative pain and facilitate recovery.'
      ],
      postOp: [
        'Monitor urine output and color (hematuria)',
        'Manage bladder spasms (Anticholinergics)',
        'VTE prophylaxis',
        'Monitor for post-obstructive diuresis'
      ]
    },
    procedures: [
      {
        id: 'turp',
        name: 'Transurethral Resection of Prostate (TURP)',
        estimatedBloodLoss: '100 - 400 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Spinal Anesthesia (T10 level) preferred / LMA if GA',
        recommendedBlocks: ['Spinal Anesthesia', 'Pudendal Nerve Block', 'Local Infiltration'],
        erasHighlights: ['Isotonic saline irrigation with bipolar loop', 'TURP syndrome surveillance (Na+ monitoring)', 'Early catheter trial'],
        guide: [
          { title: 'Access', description: 'Insert a resectoscope through the urethra into the bladder. Use continuous irrigation (glycine or saline) to maintain a clear view.' },
          { title: 'Resection', description: 'Systematically resect the obstructing prostatic tissue using an electrical loop (monopolar or bipolar), starting from the bladder neck and moving towards the verumontanum.' },
          { title: 'Irrigation', description: 'Continuous irrigation (Glycine or Saline) to maintain visibility.' },
          { title: 'Hemostasis', description: 'Identify and coagulate bleeding points in the prostatic bed.' },
          { title: 'Catheterization', description: 'Insert a large-bore three-way Foley catheter and initiate continuous bladder irrigation (CBI) to prevent clot formation.' }
        ],
        anestheticConsiderations: [
          'Spinal anesthesia (T10 level) is preferred (allows early detection of TURP syndrome)',
          'Monitor for signs of TURP syndrome (confusion, nausea, bradycardia, hypertension)',
          'Monitor for bladder perforation (referred shoulder pain if under spinal)',
          'Manage fluid absorption'
        ],
        antibioticProphylaxis: {
          drug: 'Gentamicin or Cefuroxime',
          dosage: '120mg or 1.5g IV',
          timing: 'At induction',
          alternatives: 'Ciprofloxacin'
        },
        complications: {
          surgical: ['Hemorrhage', 'Bladder perforation', 'Urethral stricture', 'Incontinence'],
          anesthetic: ['TURP Syndrome', 'Hypothermia', 'Spinal-related hypotension']
        },
        management: {
          preOp: ['Check electrolytes (baseline Sodium)', 'Review prostate size'],
          intraOp: [
            'Monitor for "TURP Syndrome" if using monopolar cautery and glycine irrigation: look for confusion, nausea, bradycardia, and hypertension (signs of hyponatremia and fluid overload).',
            'Maintain stable hemodynamics and monitor for significant blood loss, which can be difficult to quantify due to the irrigation fluid.',
            'Ensure the patient is positioned correctly in the lithotomy position to prevent pressure injuries and nerve palsies (e.g., common peroneal nerve).',
            'Monitor for signs of bladder or prostatic capsule perforation: sudden abdominal pain, hypotension, and inability to retrieve irrigation fluid.'
          ],
          postOp: ['Monitor Sodium levels', 'Ensure continuous irrigation is patent']
        }
      },
      {
        id: 'radical-nephrectomy',
        name: 'Radical Nephrectomy (Open/Laparoscopic)',
        estimatedBloodLoss: '200 - 600 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + Standard GA',
        recommendedBlocks: ['Paravertebral Block', 'Erector Spinae Plane (ESP) Block', 'TAP Block'],
        erasHighlights: ['Renal protective hydration', 'Early post-op ambulation', 'Opioid-sparing recovery'],
        guide: [
          { title: 'Positioning & Surgical Access', description: 'Place patient in lateral kidney position or supine. Perform subcostal, flank, or laparoscopic multi-port access to Gerota\'s space.' },
          { title: 'Renal Hilar Vascular Isolation', description: 'Identify and isolate the renal artery and renal vein early in the hilar dissection to minimize hematogenous tumor cell dissemination.' },
          { title: 'Vascular Ligation & Division', description: 'Double-ligate and divide the main renal artery followed by the main renal vein using heavy silk or endoscopic vascular staplers.' },
          { title: 'En-Bloc Nephrectomy & Gerota Dissection', description: 'Dissect the kidney en-bloc within intact Gerota\'s fascia, including ipsilateral adrenal gland (if involved) and regional retroperitoneal lymph nodes.' },
          { title: 'IVC Cavity Inspection & Layered Closure', description: 'Inspect renal vein stump and IVC for tumor thrombus or oozing. Place closed-suction retroperitoneal drain and close flank fascia in layers.' }
        ],
        anestheticConsiderations: [
          'Expect significant blood loss, especially for large tumors or those with IVC thrombus.',
          'Positioning (lateral/flank) - risk of nerve and pressure injuries.',
          'Manage the physiological effects of pneumoperitoneum (if laparoscopic) or major abdominal exposure (if open).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Gentamicin'
        },
        complications: {
          surgical: ['Hemorrhage (Renal vessels/IVC)', 'Pneumothorax', 'Bowel/Diaphragm injury', 'Adrenal insufficiency'],
          anesthetic: ['Fluid imbalance', 'Atelectasis (lateral position)', 'Hypothermia']
        },
        management: {
          preOp: ['Check baseline Creatinine/GFR', 'Review for IVC thrombus on imaging', 'Type & Screen'],
          intraOp: ['A-line placement', 'Manage fluid carefully to preserve remnant kidney function', 'Monitor for pneumothorax'],
          postOp: ['Monitor urine output and renal function', 'Maintain adequate MAP', 'Analgesia (TAP or Epidural)']
        }
      },
      {
        id: 'kidney-transplant',
        name: 'Kidney Transplantation',
        estimatedBloodLoss: '200 - 500 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + Standard GA (High K+ vigilance)',
        recommendedBlocks: ['TAP Block', 'Transversalis Fascia Block', 'Ilioinguinal / Iliohypogastric Block'],
        erasHighlights: ['Maintain MAP > 85-90 mmHg during vascular clamp release', 'Methylprednisolone loading', 'GDFT for graft perfusion'],
        guide: [
          { title: 'Incision & Exposure', description: 'Perform a Gibson or curvi-linear incision in the lower abdominal quadrant (iliac fossa). Dissect extraperitoneally down to the external iliac vessels.' },
          { title: 'Venous Anastomosis', description: 'Isolate the external iliac vein. Perform an end-to-side vascular anastomosis of the donor renal vein to the external iliac vein using 5-0 or 6-0 Prolene.' },
          { title: 'Arterial Anastomosis', description: 'Isolate the external or internal iliac artery. Perform an end-to-side (or end-to-end) arterial anastomosis using fine monofilament suture.' },
          { title: 'Reperfusion & Hemostasis', description: 'Release vascular clamps (venous first, then arterial). Monitor for color change ("pinking up"), turgor, immediate urine production, and any vascular suture line bleeding.' },
          { title: 'Ureteral Anastomosis & Closure', description: 'Perform an extravesical ureteroneocystostomy (Lich-Gregoir technique) connecting the donor ureter to the bladder mucosa over a double-J stent. Place a wound drain and close in layers.' }
        ],
        anestheticConsiderations: [
          'Patient typically has ESRD: manage high potassium, uremia, and volume status.',
          'Maintain a high MAP (> 80-90) during and after reperfusion to optimize early graft function.',
          'Avoid nephrotoxic agents (e.g., NSAIDs, Sevo and Desflurane if possible, though common). Isoflurane or Sevoflurane are generally acceptable.',
          'Meticulous fluid management: use CVP or other goal-directed monitors.'
        ],
        antibioticProphylaxis: {
          drug: 'Piperacillin-Tazobactam or Cefuroxime',
          dosage: '4.5g or 1.5g IV',
          timing: 'At induction',
          alternatives: 'Meropenem if high risk'
        },
        complications: {
          surgical: ['Hemorrhage', 'Ureteral leak/obstruction', 'Vascular thrombosis', 'Acute rejection'],
          anesthetic: ['Hyperkalemia', 'Fluid overload', 'Reperfusion injury', 'Infection']
        },
        management: {
          preOp: ['Review latest K+ and dialysis timing', 'Strict NPO', 'Confirm crossmatch negative'],
          intraOp: ['Aggressive MAP control', 'Check K+ and glucose regularly', 'Immunosuppression loading (e.g., Methylprednisolone)'],
          postOp: ['Strict fluid monitoring', 'Hourly urine output', 'Daily renal function check']
        }
      },
      {
        id: 'cystoscopy',
        name: 'Cystoscopy and Biopsy/TURBT',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Second-Gen LMA / ETT / Spinal Anesthesia',
        recommendedBlocks: ['Obturator Nerve Block (Mandatory for lateral wall TURBT)', 'Spinal Anesthesia (T10)'],
        erasHighlights: ['Day-case procedure', 'Obturator reflex prevention', 'Early oral fluid intake'],
        guide: [
          { title: 'Access', description: 'Lubricate and insert a flexible or rigid cystoscope through the urethra into the bladder under direct vision. Use continuous irrigation for visibility.' },
          { title: 'Inspection', description: 'Perform a systematic inspection of the entire bladder mucosa, identifying any suspicious areas, stones, or tumors.' },
          { title: 'Biopsy/Resection', description: 'Perform a biopsy of suspicious areas or a Transurethral Resection of Bladder Tumor (TURBT) using a resectoscope and electrical loop.' },
          { title: 'Hemostasis', description: 'Use diathermy (monopolar or bipolar) to coagulate any bleeding points in the bladder wall or tumor bed.' },
          { title: 'Completion', description: 'Drain the bladder and remove the cystoscope. Insert a Foley catheter if a significant resection was performed or if there is hematuria.' }
        ],
        anestheticConsiderations: [
          'GA or Spinal (T10 level)',
          'Obturator nerve reflex during lateral wall resection (can cause bladder perforation)',
          'Muscle relaxation or Obturator nerve block to prevent reflex',
          'Monitor for bladder perforation'
        ],
        antibioticProphylaxis: {
          drug: 'Gentamicin',
          dosage: '120mg IV',
          timing: 'At induction',
          alternatives: 'Ciprofloxacin'
        },
        complications: {
          surgical: ['Bladder perforation', 'Hematuria', 'Infection', 'Urethral trauma'],
          anesthetic: ['Obturator reflex-related injury', 'Spinal hypotension']
        },
        management: {
          preOp: ['Urine culture', 'Confirm NPO'],
          intraOp: [
            'Monitor for the "Obturator Nerve Reflex" during resection of the lateral bladder wall; this can cause sudden adduction of the leg and potential bladder perforation.',
            'Provide adequate muscle relaxation (if under GA) or perform an obturator nerve block to prevent the obturator reflex during TURBT.',
            'Maintain clear irrigation throughout the procedure to ensure visibility and prevent clot formation; monitor for signs of bladder perforation (e.g., sudden abdominal pain, hypotension).',
            'Ensure the patient is positioned correctly in the lithotomy position to prevent nerve injuries and pressure sores.'
          ],
          postOp: ['Monitor urine color', 'Encourage oral fluids']
        }
      },
      {
        id: 'prostatectomy',
        name: 'Radical Prostatectomy (Robotic/Open)',
        estimatedBloodLoss: '100 - 300 mL (Robotic) / 300 - 800 mL (Open)',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT (Steep Trendelenburg Position)',
        recommendedBlocks: ['TAP Block', 'Quadratus Lumborum (QL) Block'],
        erasHighlights: ['Restrictive fluid protocol (< 1.5L)', 'Deep Trendelenburg facial edema surveillance', 'Early catheter removal protocol'],
        guide: [
          { title: 'Access', description: 'Establish laparoscopic access (5-6 ports) or perform a midline/Pfannenstiel incision. Identify the Retzius space and mobilize the bladder.' },
          { title: 'Dissection', description: 'Carefully dissect the prostate from the bladder neck and the rectum. Identify and preserve the neurovascular bundles (nerve-sparing technique) if indicated.' },
          { title: 'Removal', description: 'Ligate the dorsal venous complex and divide the urethra. Remove the prostate and seminal vesicles.' },
          { title: 'Anastomosis', description: 'Perform a vesicourethral anastomosis (VUA) using continuous or interrupted sutures to reconnect the bladder to the urethra.' },
          { title: 'Closure', description: 'Irrigate the pelvis and check for hemostasis. Insert a pelvic drain and a Foley catheter. Perform a layered closure of the abdominal wall.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Steep Trendelenburg position (Robotic) - monitor for airway edema',
          'Restrictive fluid strategy to improve visualization',
          'Manage CO2 insufflation effects'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Gentamicin'
        },
        complications: {
          surgical: ['Incontinence', 'Erectile dysfunction', 'Urethrovesical leak', 'Bleeding'],
          anesthetic: ['Facial/Airway edema', 'Nerve injury (positioning)', 'CO2 retention']
        },
        management: {
          preOp: ['Review PSA and biopsy', 'Check renal function'],
          intraOp: [
            'Monitor for significant blood loss, especially during dissection of the dorsal venous complex; ensure adequate venous access and cross-matched blood.',
            'Maintain stable hemodynamics during steep Trendelenburg positioning, which can increase intracranial and intraocular pressure and impact ventilation.',
            'Vigilantly watch for signs of venous air embolism and CO2 embolism during laparoscopic or robotic-assisted dissection.',
            'Ensure meticulous hemostasis before performing the vesicourethral anastomosis to prevent post-operative hematoma and anastomotic leak.'
          ],
          postOp: ['Catheter care', 'Early mobilization']
        }
      },
      {
        id: 'ureteroscopy',
        name: 'Ureteroscopy and Laser Lithotripsy',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Second-Gen LMA / Oral ETT',
        recommendedBlocks: ['Systemic Analgesia (Spinal optional)'],
        erasHighlights: ['Day-case procedure', 'Zero muscle twitch during laser pulse', 'Hydration instructions'],
        guide: [
          { title: 'Access', description: 'Lubricate and insert a semi-rigid or flexible ureteroscope retrograde through the urethra and bladder into the ureter under fluoroscopic guidance.' },
          { title: 'Identification', description: 'Systematically inspect the ureter and renal pelvis to locate the stone(s). Use a safety wire to maintain access throughout the procedure.' },
          { title: 'Fragmentation', description: 'Use a Holmium:YAG laser or pneumatic lithotripter to fragment the stone into small pieces ("dusting" or "fragmenting").' },
          { title: 'Extraction', description: 'Use a specialized nitinol basket to retrieve larger stone fragments. Irrigate the ureter to clear smaller debris.' },
          { title: 'Stenting', description: 'Place a double-J (JJ) stent to ensure adequate urinary drainage and prevent ureteric obstruction from edema or residual fragments.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with LMA or ETT',
          'Ensure patient stillness (laser safety)',
          'Manage irrigation fluid',
          'Short procedure, rapid turnover'
        ],
        antibioticProphylaxis: {
          drug: 'Gentamicin',
          dosage: '120mg IV',
          timing: 'At induction',
          alternatives: 'Ciprofloxacin'
        },
        complications: {
          surgical: ['Ureteric injury/avulsion', 'Infection/Sepsis', 'Hematuria', 'Stent pain'],
          anesthetic: ['PONV', 'Aspiration (if emergency)']
        },
        management: {
          preOp: ['Review imaging for stone size/location', 'Check urine culture'],
          intraOp: [
            'Ensure the patient remains completely still during laser lithotripsy to prevent accidental injury to the ureteric wall; consider using a muscle relaxant if under GA.',
            'Maintain clear vision by managing irrigation fluid pressure; monitor for signs of sepsis, especially if the urine was infected or if the procedure is prolonged.',
            'Monitor for potential ureteric injury or avulsion, which can occur during scope passage or fragment extraction; use fluoroscopy to confirm stent placement.',
            'Ensure the patient is positioned correctly in the lithotomy position to prevent nerve injuries and pressure sores.'
          ],
          postOp: ['Encourage fluids', 'Explain stent symptoms']
        }
      },
      {
        id: 'radical-cystectomy',
        name: 'Radical Cystectomy and Urinary Diversion',
        estimatedBloodLoss: '400 - 1000 mL',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs',
        airwayStrategy: 'Oral ETT + Invasive Arterial Line / CVP',
        recommendedBlocks: ['Thoracic Epidural (T8-T10)', 'TAP Block (Bilateral)', 'Erector Spinae Plane (ESP) Block'],
        erasHighlights: ['Goal-Directed Fluid Therapy', 'Avoid routine NGT', 'Early bowel stimulation (Gum chewing & Alvimopan)'],
        guide: [
          { title: 'Cystectomy', description: 'Perform a radical cystectomy, removing the bladder and adjacent organs (prostate/seminal vesicles in men; uterus/ovaries/anterior vaginal wall in women).' },
          { title: 'Lymphadenectomy', description: 'Perform an extended pelvic lymph node dissection (PLND) to ensure adequate oncological staging and clearance.' },
          { title: 'Diversion', description: 'Create a urinary diversion, such as an ileal conduit (Bricker) or an orthotopic neobladder, using a segment of the small intestine (ileum).' },
          { title: 'Anastomosis', description: 'Perform a meticulous uretero-ileal anastomosis over stents to reconnect the ureters to the newly created urinary diversion.' },
          { title: 'Closure', description: 'Irrigate the pelvis and check for hemostasis. Insert pelvic drains and perform a layered closure of the abdominal wall. Apply a stoma appliance if an ileal conduit was created.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT and arterial line',
          'Manage potential for significant blood loss and fluid shifts',
          'Maintain normothermia during long procedure',
          'Consider epidural for postoperative analgesia'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Uretero-ileal leak', 'Bowel obstruction', 'Bleeding', 'Infection'],
          anesthetic: ['Fluid overload/depletion', 'Hypothermia', 'VTE']
        },
        management: {
          preOp: ['Review nutritional status', 'Check renal function'],
          intraOp: [
            'Monitor for significant blood loss, which can occur during pelvic dissection and lymphadenectomy; ensure large-bore IV access and have blood products available.',
            'Maintain stable hemodynamics and monitor for fluid shifts, especially during the creation of the urinary diversion and bowel anastomosis.',
            'Ensure meticulous hemostasis throughout the procedure to prevent post-operative hematoma and anastomotic leak.',
            'Monitor for potential injuries to adjacent structures (e.g., rectum, iliac vessels, nerves) during the extensive pelvic dissection.',
            'Provide effective analgesia using an epidural or other regional techniques to minimize post-operative pain and facilitate early mobilization.'
          ],
          postOp: ['ERAS protocol', 'Monitor for ileus']
        }
      },
      {
        id: 'pcnl',
        name: 'Percutaneous Nephrolithotomy (PCNL)',
        estimatedBloodLoss: '100 - 300 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + Prone positioning safety protocols',
        recommendedBlocks: ['Paravertebral Block', 'Erector Spinae Plane (ESP) Block', 'Intercostal Block'],
        erasHighlights: ['Prone position airway security', 'Continuous active warming', 'Pleural effusion surveillance'],
        guide: [
          { title: 'Retrograde Access & Positioning', description: 'Perform initial cystoscopy in lithotomy to place an open-ended ureteral catheter into the target renal pelvis. Reposition patient prone, offloading eyes and pressure points.' },
          { title: 'Fluoroscopic / US Percutaneous Access', description: 'Under fluoroscopic or ultrasound guidance, puncture the target renal calyx with an 18G diamond-tip needle below the 12th rib to avoid pleural transgression.' },
          { title: 'Tract Dilation', description: 'Pass a safety guidewire into the collecting system. Dilate the tract sequentially (using balloon dilator or metal Amplatz dilators) up to 24-30 Fr sheath size.' },
          { title: 'Nephroscopy & Lithotripsy', description: 'Insert rigid or flexible nephroscope. Fragment renal calculi using ultrasonic, pneumatic, or laser lithotripter and extract fragments with rigid graspers.' },
          { title: 'Nephrostomy & Stent Placement', description: 'Verify complete stone clearance via fluoroscopy/nephroscopy. Place a double-J ureteral stent and insert a 18-24 Fr re-entry nephrostomy tube for post-op drainage.' }
        ],
        anestheticConsiderations: [
          'High risk associated with the Prone position (airway loss, eye pressure)',
          'Fluid absorption risk from high-pressure renal irrigation',
          'Profound hypothermia from continuous cold/room temperature irrigation'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Gentamicin (often requested based on urine culture)'
        },
        complications: {
          surgical: ['Renal hemorrhage', 'Pleural injury resulting in hydrothorax/pneumothorax', 'Sepsis'],
          anesthetic: ['Fluid overload (TUR syndrome-like)', 'Hypothermia', 'Loss of airway in prone position']
        },
        management: {
          preOp: ['Verify negative urine culture', 'Prepare for prone positioning'],
          intraOp: [
            'Secure the endotracheal tube meticulously before flipping prone. Ensure eyes and pressure points are fully offloaded.',
            'Monitor for pleural injury (sudden drop in compliance, hypoxia) as the upper pole of the kidney lies exceptionally close to the pleura.',
            'Actively warm the patient. The constant flow of irrigation fluid can drop core temperature rapidly.',
            'Monitor for signs of systemic fluid absorption and electrolyte derangement if irrigation volumes are massive.'
          ],
          postOp: ['Chest radiograph if pleural injury suspected', 'Monitor for sepsis']
        }
      }
    ]
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    generalConsiderations: {
      preOp: [
        'Detailed neurological assessment (GCS, pupils, focal deficits)',
        'Review imaging (MRI/CT) for midline shift and edema',
        'Assess for signs of raised ICP (headache, vomiting, papilledema)',
        'Confirm steroid and anticonvulsant status'
      ],
      intraOp: [
        'Maintain cerebral perfusion pressure (CPP) by optimizing MAP and minimizing intracranial pressure (ICP); avoid sudden changes in blood pressure during critical steps.',
        'Monitor for signs of venous air embolism (VAE), especially in the sitting or semi-Fowler position; use precordial Doppler and end-tidal CO2 monitoring.',
        'Ensure meticulous fluid management to avoid cerebral edema; prioritize isotonic fluids and maintain normoglycemia and normocapnia.',
        'Provide neuroprotection by maintaining normothermia and avoiding factors that increase cerebral metabolic rate (e.g., seizures, hyperthermia).',
        'Utilize intra-operative neuromonitoring (e.g., SSEP, MEP, EEG) to identify and prevent potential nerve or spinal cord injury during dissection.'
      ],
      postOp: [
        'Frequent neurological observations',
        'Manage hypertension (avoid intracranial hemorrhage)',
        'Monitor for diabetes insipidus or SIADH',
        'Seizure prophylaxis'
      ]
    },
    procedures: [
      {
        id: 'craniotomy-brain-tumor',
        name: 'Craniotomy for Brain Tumor Resection',
        estimatedBloodLoss: '200 - 1000 mL',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs',
        airwayStrategy: 'Oral ETT + TIVA / Balanced GA',
        recommendedBlocks: ['Scalp Block (Bupivacaine with Epinephrine)', 'Local Infiltration of Pin Sites'],
        erasHighlights: ['TIVA (Propofol/Remifentanil)', 'Normocapnia (PaCO2 35-38 mmHg)', 'Mannitol 20% (0.5-1g/kg) for brain relaxation'],
        guide: [
          { title: 'Positioning & Head Frame', description: 'Position head in Mayfield 3-pin skull clamp. Elevate head 15-30 degrees.' },
          { title: 'Craniotomy', description: 'Curved skin incision, raise subgaleal flap. Drill burr holes, cut bone flap using craniotome.' },
          { title: 'Dural Entry & Resection', description: 'Incise dura, use neuronavigation and cavitron ultrasonic surgical aspirator (CUSA) to resect lesion.' },
          { title: 'Closure', description: 'Watertight dural closure, replace bone flap with titanium plates, galeal and skin closure.' }
        ],
        anestheticConsiderations: [
          'Tight BP control: avoid hypertension during incision/skull clamping and emergence',
          'Brain relaxation: Mannitol (0.5-1g/kg IV) or Hypertonic Saline 3%',
          'Avoid nitrous oxide (pneumocephalus risk)',
          'Prophylactic anticonvulsants (Levetiracetam 1g IV)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction (redose q4h)',
          alternatives: 'Vancomycin 15mg/kg'
        },
        complications: {
          surgical: ['Intracranial hemorrhage', 'Cerebral edema', 'Neurological deficit', 'CSF leak'],
          anesthetic: ['Elevated ICP', 'Venous air embolism (sitting position)', 'Seizures', 'Delayed emergence']
        },
        management: {
          preOp: ['Administer Dexamethasone 10mg IV for vasogenic edema', 'Verify type and crossmatch'],
          intraOp: [
            'Infiltrate scalp pin sites with local anesthetic before Mayfield application to prevent hypertensive surge.',
            'Maintain PaCO2 35-38 mmHg; avoid hypercapnia which increases CBV and ICP.',
            'Administer Mannitol 20% (0.5-1g/kg) prior to dural opening if brain is tight.',
            'Smooth emergence: use Labetalol or Esmolol to suppress coughing and HTN on extubation.'
          ],
          postOp: ['ICU or Neuro-HD unit monitoring', 'Serial GCS and pupil checks', 'CT head if GCS drops']
        }
      },
      {
        id: 'vp-shunt',
        name: 'Ventriculoperitoneal (VP) Shunt',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + Standard GA',
        recommendedBlocks: ['Scalp Block (Local Infiltration at cranial & abdominal sites)'],
        erasHighlights: ['Aseptic protocol', 'Smooth emergence to prevent ICP spike', 'Day-case / Short-stay'],
        guide: [
          { title: 'Access', description: 'Perform a small scalp incision (e.g., retroauricular or frontal) and create a burr hole. Make a small abdominal incision (e.g., paramedian or periumbilical) for peritoneal access.' },
          { title: 'Ventricular Lead', description: 'Insert the proximal catheter through the burr hole into the lateral ventricle using a stylet. Confirm CSF flow and measure the opening pressure.' },
          { title: 'Tunneling', description: 'Use a specialized tunneling tool to create a subcutaneous path from the head incision to the abdominal incision. Pass the distal catheter through the tunnel.' },
          { title: 'Peritoneal Lead', description: 'Insert the distal catheter into the peritoneal cavity through a small opening in the peritoneum. Ensure adequate length for growth (in children).' },
          { title: 'Testing', description: 'Connect the proximal and distal catheters to a valve (e.g., programmable or fixed-pressure). Confirm shunt function and set the desired pressure.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Avoid factors that increase ICP during induction',
          'Monitor for bradycardia during tunneling (vagal stimulation)',
          'Strict aseptic technique'
        ],
        antibioticProphylaxis: {
          drug: 'Vancomycin or Cefazolin',
          dosage: '1g or 2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Shunt infection', 'Shunt malfunction/blockage', 'Over-drainage', 'Intracranial hemorrhage'],
          anesthetic: ['ICP changes', 'Vagal-mediated bradycardia']
        },
        management: {
          preOp: ['Review imaging for ventricular size', 'Assess for signs of raised ICP'],
          intraOp: [
            'Monitor for vagal-mediated bradycardia or arrhythmias during subcutaneous tunneling, especially in pediatric patients; ensure adequate depth of anesthesia.',
            'Maintain stable intracranial pressure (ICP) during induction and throughout the procedure; avoid factors that increase ICP (e.g., hypercapnia, hypoxia).',
            'Ensure strict aseptic technique to prevent shunt infection, which is a major cause of shunt failure; minimize traffic in the operating room.',
            'Monitor for potential complications like intracranial hemorrhage or peritoneal injury during catheter placement.'
          ],
          postOp: ['Neurological observations', 'Monitor for shunt failure']
        }
      },
      {
        id: 'microdiscectomy',
        name: 'Lumbar Microdiscectomy',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + Prone Position',
        recommendedBlocks: ['Erector Spinae Plane (ESP) Block', 'Wound Infiltration'],
        erasHighlights: ['Opioid-sparing recovery', 'Early mobilization at 4 hours', 'Day-case protocol'],
        guide: [
          { title: 'Positioning', description: 'Place the patient in the prone position on a Wilson frame or Jackson table, ensuring the abdomen is free to reduce venous pressure and bleeding.' },
          { title: 'Incision', description: 'Perform a small midline incision (2-3 cm) over the affected lumbar level, confirmed by intra-operative fluoroscopy (C-arm).' },
          { title: 'Exposure', description: 'Use minimal muscle retraction and perform a partial laminotomy (removing a small portion of the lamina) to access the spinal canal.' },
          { title: 'Discectomy', description: 'Identify and carefully retract the nerve root. Use micro-instruments to remove the herniated disc fragment and any loose disc material.' },
          { title: 'Decompression', description: 'Confirm adequate decompression of the nerve root by ensuring it is free and mobile. Perform a final check for hemostasis and irrigate the wound.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Positioning (Prone) - protect eyes, face, and pressure points',
          'Avoid abdominal compression (decreases venous bleeding)',
          'Smooth emergence to avoid straining'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Dural tear (CSF leak)', 'Nerve root injury', 'Recurrent disc herniation', 'Infection'],
          anesthetic: ['Post-operative visual loss (POVL) - rare', 'Pressure sores', 'Venous air embolism']
        },
        management: {
          preOp: ['Confirm level and side', 'Review neurological deficits'],
          intraOp: [
            'Ensure the patient is positioned correctly in the prone position, with meticulous protection of the eyes, face, and all pressure points to prevent post-operative visual loss (POVL) and nerve injuries.',
            'Avoid abdominal compression by using a specialized frame; this reduces epidural venous pressure and surgical bleeding, improving visibility.',
            'Maintain stable hemodynamics and monitor for potential complications like dural tear (CSF leak) or nerve root injury during dissection.',
            'Ensure a smooth emergence from anesthesia to avoid straining and coughing, which can increase intracranial and spinal venous pressure.'
          ],
          postOp: ['Early mobilization', 'Monitor for CSF leak (headache/drainage)']
        }
      },
      {
        id: 'spinal-fusion',
        name: 'Lumbar Spinal Fusion (PLIF/TLIF)',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + TIVA (if IONM used)',
        recommendedBlocks: ['Erector Spinae Plane (ESP) Block (Bilateral)', 'Thoracic Epidural'],
        erasHighlights: ['TXA 1g IV loading + infusion', 'Multimodal opioid-sparing protocol', 'Early mobilization'],
        guide: [
          { title: 'Positioning', description: 'Place the patient in the prone position on a specialized radiolucent table (e.g., Jackson table), ensuring the abdomen is free and all pressure points are protected.' },
          { title: 'Exposure', description: 'Perform a midline incision over the affected levels, confirmed by fluoroscopy. Perform subperiosteal dissection of the paraspinal muscles to expose the lamina and facets.' },
          { title: 'Decompression', description: 'Perform a laminectomy and discectomy at the affected level to decompress the neural elements (thecal sac and nerve roots).' },
          { title: 'Fixation', description: 'Under fluoroscopic guidance, insert pedicle screws into the vertebral bodies. Connect the screws with rods to stabilize the spinal segment.' },
          { title: 'Fusion', description: 'Prepare the disc space and insert an interbody cage filled with bone graft (autograft or allograft). Place additional bone graft along the posterolateral gutters to promote fusion.' },
          { title: 'Closure', description: 'Irrigate the wound and check for hemostasis. Insert a subfascial drain and perform a meticulous layered closure of the fascia and skin.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Invasive monitoring (Arterial line)',
          'Neuromonitoring (MEP/SSEP) - avoid muscle relaxants',
          'Manage significant blood loss (consider Cell Saver/TXA)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin + Vancomycin',
          dosage: '2g + 1g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Nerve root injury', 'Dural tear', 'Hardware failure', 'Pseudoarthrosis'],
          anesthetic: ['POVL', 'Massive blood loss', 'Pressure injury']
        },
        management: {
          preOp: ['Check baseline neuro status', 'Optimize Hb'],
          intraOp: [
            'Monitor for significant blood loss, which can be substantial during multi-level fusion; ensure large-bore IV access and consider the use of Cell Saver and Tranexamic Acid (TXA).',
            'Utilize intra-operative neuromonitoring (MEP and SSEP) to protect the spinal cord and nerve roots; avoid or minimize the use of muscle relaxants after induction.',
            'Ensure the patient is positioned correctly in the prone position, with meticulous protection of the eyes and face to prevent post-operative visual loss (POVL).',
            'Maintain stable hemodynamics and monitor for potential complications like dural tear (CSF leak) or hardware malposition during screw insertion.'
          ],
          postOp: ['Neurological checks', 'Pain management (PCA)']
        }
      },
      {
        id: 'carpal-tunnel',
        name: 'Carpal Tunnel Release',
        estimatedBloodLoss: '< 10 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Monitored Anesthesia Care (MAC) / Local Anesthesia',
        recommendedBlocks: ['Median / Ulnar Wrist Block', 'Bier Block (IVRA)', 'WALANT (Wide Awake Local)'],
        erasHighlights: ['Day-case procedure', 'Zero opioid baseline', 'Immediate finger mobilization'],
        guide: [
          { title: 'Incision & Palmar Fascia Dissection', description: 'Perform 2-3 cm longitudinal incision over proximal palm aligned with ring finger ray. Divide subcutaneous fat and palmar aponeurosis.' },
          { title: 'Flexor Retinaculum / TCL Identification', description: 'Expose proximal edge of Transverse Carpal Ligament (TCL). Identify median nerve proximal to wrist crease to verify anatomical landmarks.' },
          { title: 'Transverse Carpal Ligament Release', description: 'Pass director under TCL. Divide TCL completely from proximal border to distal palmar fat pad under direct vision.' },
          { title: 'Median Nerve Decompression & Inspection', description: 'Inspect median nerve and recurrent motor branch for epineural compression, hourglass deformity, or persistent median artery.' },
          { title: 'Hemostasis & Skin Closure', description: 'Deflate forearm tourniquet. Verify absolute dry hemostasis. Perform interrupted non-absorbable skin closure and apply soft compression dressing.' }
        ],
        anestheticConsiderations: [
          'Local anesthesia with sedation or GA',
          'Bier block or wrist block',
          'Short procedure, day-case',
          'Tourniquet management (if used)'
        ],
        antibioticProphylaxis: {
          drug: 'None routinely',
          dosage: '-',
          timing: '-',
          alternatives: '-'
        },
        complications: {
          surgical: ['Median nerve injury', 'Incomplete release', 'Infection', 'Pillar pain'],
          anesthetic: ['Local anesthetic toxicity (if Bier block)', 'Tourniquet pain']
        },
        management: {
          preOp: ['Confirm side', 'Review symptoms'],
          intraOp: [
            'Ensure the patient is comfortable and still throughout the procedure, especially if performed under local anesthesia or a regional block (e.g., Bier block or wrist block).',
            'Monitor for potential local anesthetic systemic toxicity (LAST) if a Bier block is used; ensure the tourniquet is secure and the release is timed correctly.',
            'Maintain a clear surgical field by using a tourniquet (if indicated); monitor tourniquet time and pressure to prevent nerve injury and ischemia.',
            'Provide effective analgesia and consider the use of sedation to reduce patient anxiety and improve the surgical experience.'
          ],
          postOp: ['Hand elevation', 'Early finger movements']
        }
      },
      {
        id: 'aneurysm-clipping',
        name: 'Intracranial Aneurysm Clipping',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs',
        airwayStrategy: 'Oral ETT + TIVA + Invasive Arterial Line',
        recommendedBlocks: ['Scalp Block (Bupivacaine with Epinephrine)'],
        erasHighlights: ['Adenosine / Temporary clipping MAP protocol', 'Maintain SBP < 120 prior to clip placement', 'ICG Angiography check'],
        guide: [
          { title: 'Access', description: 'Perform a craniotomy (e.g., pterional or orbitozygomatic) to access the subarachnoid space and the Circle of Willis.' },
          { title: 'Dissection', description: 'Use microscopic dissection to open the basal cisterns and identify the parent artery and the aneurysm. Carefully separate the aneurysm from adjacent structures.' },
          { title: 'Clipping', description: 'Apply a titanium or cobalt-alloy clip across the neck of the aneurysm, ensuring complete occlusion while preserving the parent and branching arteries.' },
          { title: 'Verification', description: 'Confirm the clip position and distal arterial flow using intra-operative indocyanine green (ICG) angiography or micro-Doppler ultrasound.' },
          { title: 'Closure', description: 'Irrigate the surgical field and check for hemostasis. Close the dura mater (water-tight) and replace the bone flap. Perform a layered scalp closure.' }
        ],
        anestheticConsiderations: [
          'TIVA (Propofol/Remifentanil) for neuroprotection and stable hemodynamics',
          'Tight BP control (avoid HTN during dissection, avoid hypotension during clipping)',
          'Be prepared for intraoperative rupture (Adenosine or rapid hypotension)',
          'Maintain "slack brain" with Mannitol and hyperventilation'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Intraoperative rupture', 'Vasospasm', 'Ischemic stroke', 'Hydrocephalus'],
          anesthetic: ['Cerebral edema', 'Hypertension-related bleeding', 'Electrolyte imbalance']
        },
        management: {
          preOp: ['Review CT/Angiography for aneurysm size/location', 'Assess SAH grade (if applicable)'],
          intraOp: [
            'Maintain stable cerebral perfusion pressure (CPP) and avoid sudden changes in blood pressure, which can lead to premature aneurysm rupture or cerebral ischemia.',
            'Monitor for signs of aneurysm rupture during dissection; be prepared with temporary clips, adenosine (for transient cardiac standstill), and rapid fluid resuscitation.',
            'Ensure meticulous neuro-anesthesia management, including tight CO2 control (normocapnia) and neuroprotection (e.g., maintaining normothermia).',
            'Utilize intra-operative neuromonitoring (e.g., SSEP, MEP, EEG) to identify and prevent potential cerebral ischemia during temporary clipping or dissection.'
          ],
          postOp: ['ICU management', 'Monitor for vasospasm (Nimodipine)']
        }
      },
      {
        id: 'awake-craniotomy',
        name: 'Awake Craniotomy',
        estimatedBloodLoss: '100 - 300 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2 Units',
        airwayStrategy: 'Asleep-Awake-Asleep (AAA) with LMA rescue / Conscious Sedation',
        recommendedBlocks: ['Scalp Block (Bilateral 6-nerve block with Bupivacaine/Ropivacaine + Epinephrine)'],
        erasHighlights: ['Dexmedetomidine infusion baseline', 'Zero-seizure protocol during mapping', 'No long-acting opioids'],
        guide: [
          { title: 'Pre-incision Scalp Block', description: 'Perform comprehensive bilateral scalp block (supraorbital, supratrochlear, auriculotemporal, greater & lesser occipital nerves) with long-acting local anesthetic + Epinephrine.' },
          { title: 'Craniotomy Under Sedation', description: 'Position head in Mayfield frame with padded points. Induce conscious sedation or Asleep-Awake-Asleep (AAA) protocol. Perform skin incision, burr holes, and bone flap removal.' },
          { title: 'Dural Opening & Patient Awakening', description: 'Infiltrate dura along middle meningeal artery. Discontinue primary sedative (Propofol/Dexmedetomidine) to allow full patient awakening and orientation.' },
          { title: 'Cortical & Subcortical Mapping', description: 'Use bipolar Ojemann stimulator for direct cortical/subcortical electrical mapping while neuropsychologist assesses speech, counting, motor function, and visual fields.' },
          { title: 'Tumor Resection & Resedation', description: 'Resect tumor within functional boundaries mapped. Once resection complete, re-induce sedation/airway for dural closure, bone flap replacement, and scalp closure.' }
        ],
        anestheticConsiderations: [
          'Requires meticulous balance of sedation: deep enough for craniotomy, light enough to awaken smoothly without agitation.',
          'Airway access is severely restricted once the patient is pinned in the Mayfield frame.',
          'High risk for intraoperative seizures during cortical stimulation.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Brain swelling', 'Hemorrhage', 'Neurological deficit'],
          anesthetic: ['Intraoperative seizure (requires immediate cold saline)', 'Loss of airway', 'Agitation/Confusion compromising the field']
        },
        management: {
          preOp: ['Extensive patient counseling on what to expect', 'Establish rapport'],
          intraOp: [
            'Be prepared with an LMA/Fiberoptic bronchoscope for emergency airway rescue if the patient becomes obtunded or seizes uncontrollably.'
          ],
          postOp: ['ICU management', 'Neurological checks']
        }
      },
      {
        id: 'spinal-cord-tumor',
        name: 'Spinal Cord Tumor Resection',
        estimatedBloodLoss: '200 - 600 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + TIVA for IONM',
        recommendedBlocks: ['Erector Spinae Plane (ESP) Block', 'Wound Infiltration'],
        erasHighlights: ['Maintain MAP > 80-85 mmHg for spinal cord perfusion', 'TIVA protocol without neuromuscular blockade'],
        guide: [
          { title: 'Prone Positioning & Midline Exposure', description: 'Position patient prone with Wilson frame. Perform posterior midline incision over affected spinal level and elevate paraspinal muscles subperiosteally.' },
          { title: 'Laminectomy & Epidural Hemostasis', description: 'Perform multi-level laminectomy using Kerrison rongeurs. Achieve meticulous epidural hemostasis with bipolar cautery and Surgicel.' },
          { title: 'Durotomy & Arachnoid Opening', description: 'Incise dura mater in midline and tack back to muscle. Open arachnoid membrane to expose spinal cord and extramedullary/intramedullary tumor.' },
          { title: 'Microsurgical Tumor Resection (CUSA)', description: 'Establish tumor-cord plane under operating microscope. Debulk intramedullary mass using CUSA while preserving dorsal column pathways.' },
          { title: 'Water-tight Dural Closure & Layered Muscle Closure', description: 'Perform primary water-tight dural closure with 4-0 Neurolon/Prolene (or dural patch graft). Reapproximate paraspinal muscles and fascia in layers.' }
        ],
        anestheticConsiderations: [
          'Prone position - meticulous padding and eye protection.',
          'Intraoperative neuromonitoring (SSEP/MEP) is mandatory; avoid neuromuscular blockers.',
          'Maintain stable MAP to ensure spinal cord perfusion (avoid hypotension).',
          'TIVA (Propofol/Remifentanil) is preferred for better monitoring conditions.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['New neurological deficit', 'CSF leak', 'Spinal cord edema', 'Hemorrhage'],
          anesthetic: ['Positioning-related injuries', 'Total spinal (if dural breach and local used)', 'Autonomic dysreflexia (if high level)']
        },
        management: {
          preOp: ['Baseline neurological exam', 'Review imaging for cord compression level'],
          intraOp: ['TIVA management', 'Strict MAP targets (e.g., MAP > 80)', 'Frequent communication with monitoring team'],
          postOp: ['Flat for 24-48h if CSF leak risk', 'Neurological checks every 1-2h', 'Pain management (IV PCA)']
        }
      },
      {
        id: 'dbs-insertion',
        name: 'Deep Brain Stimulator (DBS) Insertion',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Local + Dexmedetomidine Conscious Sedation / ETT for IPG phase',
        recommendedBlocks: ['Scalp Block (Bupivacaine with Epinephrine)'],
        erasHighlights: ['Dexmedetomidine infusion (no GABA interference)', 'Strict SBP < 140 mmHg to prevent micro-hemorrhage'],
        guide: [
          { title: 'Stereotactic Frame Placement & CT/MRI Fusion', description: 'Affix CRW/Leksell stereotactic frame under local anesthesia. Perform high-resolution CT and fuse with pre-op MRI for target (STN/GPi) coordinate calculation.' },
          { title: 'Pre-coronal Burr Hole & Dural Opening', description: 'Make linear scalp incision anterior to coronal suture. Drill 14 mm precoronal burr hole, coagulate and incise dura mater, and seal pia with fibrin glue.' },
          { title: 'Microelectrode Recording (MER) & Testing', description: 'Advance microelectrodes via stereotactic drive. Perform electrophysiological recording (MER) and macrostimulation in awake patient to evaluate tremor control and side effects.' },
          { title: 'Permanent DBS Lead Implantation', description: 'Pass permanent quadripolar DBS lead to optimal target depth. Fix lead securely to skull using Stimloc cap/burr hole cover.' },
          { title: 'Subclavicular IPG Tunneling & Connection', description: 'Induce general anesthesia. Create infraclavicular subcutaneous pocket for Implantable Pulse Generator (IPG) and tunnel extension wires from scalp to chest.' }
        ],
        anestheticConsiderations: [
          'Awake phase: requires patient cooperation for clinical testing (tremor suppression/side effects).',
          'Avoid GABA-ergic drugs (Propofol/Benzos) during mapping as they interfere with MER.',
          'Strict BP control to prevent intracranial hemorrhage (keep SBP < 140).',
          'Manage patient comfort and anxiety during long hours in the frame.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Intracranial hemorrhage (most serious)', 'Infection', 'Lead malposition', 'Seizure'],
          anesthetic: ['Airway obstruction (in frame)', 'Hyperpnea/Hypoventilation', 'Restlessness']
        },
        management: {
          preOp: ['Hold anti-Parkinsonian meds (OFF state)', 'Explain the procedure phases'],
          intraOp: ['Dexmedetomidine for sedation (doesn\'t interfere with MER)', 'SBP control', 'Warm blankets'],
          postOp: ['Monitor for neurology/vision changes', 'CT brain to rule out hemorrhage']
        }
      },
      {
        id: 'pituitary-resection',
        name: 'Transsphenoidal Pituitary Resection',
        estimatedBloodLoss: '100 - 300 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT (Protected Shared Airway + Throat Pack)',
        recommendedBlocks: ['Sphenopalatine Ganglion Block', 'Local Infiltration'],
        erasHighlights: ['Avoid Nitrous Oxide', 'Smooth non-coughing emergence', 'Diabetes Insipidus hourly urine surveillance'],
        guide: [
          { title: 'Nasal Preparation & Endoscopic Entry', description: 'Pack nasal cavities with cocaine/epinephrine soaked gauze. Insert rigid 0-degree endoscope into right nostril to identify sphenoid ostium and choana.' },
          { title: 'Posterior Septetomy & Sphenoidotomy', description: 'Remove posterior nasal septum and anterior sphenoid wall to expose sphenoid sinus floor, sella turcica, carotid eminences, and optic recesses.' },
          { title: 'Sella Opening & Dural Incision', description: 'Remove sellar bone using micro-drill and Kerrison rongeurs. Incise sellar dura in cruciate fashion to expose pituitary adenoma.' },
          { title: 'Adenoma Resection & Gland Preservation', description: 'Resect adenoma systematically (inferior, lateral, then superior) using ring curettes and suction while preserving normal pituitary gland tissue.' },
          { title: 'Sellar Reconstruction & Nasal Packing', description: 'Inspect suprasellar diaphragm for CSF leak (perform intraoperative Valsalva). Reconstruct sellar floor with abdominal fat/fascia graft or nasoseptal flap.' }
        ],
        anestheticConsiderations: [
          'Shared airway (nose/mouth). Ensure ETT is secure and out of the surgical field.',
          'Avoid Nitrous Oxide (may cause tension pneumocephalus).',
          'Smooth emergence to avoid coughing/straining (prevents CSF leak).',
          'Monitor for Diabetes Insipidus (DI) intra- and post-operatively.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Gentamicin + Clindamycin'
        },
        complications: {
          surgical: ['CSF leak', 'Carotid artery injury', 'Meningitis', 'Visual loss'],
          anesthetic: ['Diabetes Insipidus (DI)', 'Hypopituitarism', 'Airway obstruction']
        },
        management: {
          preOp: ['Baseline visual field testing', 'Review endocrine status (Cortisol/Thyroid)'],
          intraOp: ['Strict fluid balance', 'Monitor electrolytes/osmolarity', 'Neurosurgical throat pack'],
          postOp: ['Monitor urine output hourly (for DI)', 'Check serum Sodium daily', 'Strict "No Blowing Nose"']
        }
      },
      {
        id: 'posterior-fossa-resection',
        name: 'Posterior Fossa Tumor Resection',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT (Armored) + TIVA + CVP/A-line',
        recommendedBlocks: ['Scalp Block', 'Greater Occipital Nerve Block'],
        erasHighlights: ['Precordial Doppler VAE monitoring', 'Brainstem trigeminal/vagal reflex monitoring', 'ICU extubation'],
        guide: [
          { title: 'Prone/Sitting Positioning & Fixation', description: 'Fix head in Mayfield skull clamp in prone or sitting position. Mark midline suboccipital skin incision from inion to C2.' },
          { title: 'Suboccipital Craniectomy', description: 'Perform posterior midline incision, dissect nuchal muscles off occipital bone, and create suboccipital craniectomy +/- C1 laminectomy.' },
          { title: 'Y-Shaped Durotomy', description: 'Incise dura mater in Y-shape over cerebellar hemispheres, ligate occipital sinus, and tack dura back to muscle.' },
          { title: 'Microsurgical Tumor Resection', description: 'Perform microsurgical tumor debulking under continuous cranial nerve (V, VII, IX, X, XII) and brainstem monitoring using CUSA and bipolar cautery.' },
          { title: 'Water-tight Dural Patch Closure', description: 'Perform water-tight dural closure using pericranium or fascia lata autograft to prevent CSF fistula. Reconstruct suboccipital musculature in layers.' }
        ],
        anestheticConsiderations: [
          'Highest risk of Venous Air Embolism (VAE); monitor with Precordial Doppler and TEE.',
          'Brainstem handling can cause sudden bradycardia/arrhythmias - inform surgeon immediately.',
          'Shared airway risk; specialized ETT (Armored) common.',
          'Tight BP control and neuroprotection (TIVA preferred).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Cranial nerve palsies', 'Hydrocephalus', 'Brainstem injury', 'Hemorrhage'],
          anesthetic: ['VAE', 'Pneumocephalus (especially if sitting)', 'Macroglossia (positioning)']
        },
        management: {
          preOp: ['Review MRI for brainstem involvement', 'Assess for baseline CN deficits'],
          intraOp: ['CVP line for VAE aspiration', 'Precordial doppler', 'Maintenance of normocapnia'],
          postOp: ['Delayed extubation if brainstem edema suspected', 'ICU level care']
        }
      },
      {
        id: 'burr-hole-sdh',
        name: 'Burr Hole Evacuation of Chronic SDH',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Local Anesthesia + Monitored Anesthesia Care (MAC) / ETT if uncooperative',
        recommendedBlocks: ['Scalp Infiltration / Scalp Block'],
        erasHighlights: ['Flat head positioning post-op for brain re-expansion', 'Correction of anticoagulation (INR < 1.3)'],
        guide: [
          { title: 'Local Scalp Infiltration & Incision', description: 'Infiltrate scalp over frontal/parietal eminences with Bupivacaine + Epinephrine. Perform 3 cm linear scalp incisions.' },
          { title: 'Burr Hole Drilling & Bone Waxing', description: 'Drill two 14 mm burr holes (frontal and parietal) using a perforator bit down to inner table. Apply bone wax to cut bone edges.' },
          { title: 'Dural Incision & Hematoma Evacuation', description: 'Coagulate and incise dura mater and outer subdural membrane in cruciate fashion. Evacuate dark liquefied hematoma under low pressure.' },
          { title: 'Subdural Saline Irrigation', description: 'Pass soft red rubber catheter into subdural space in all directions. Irrigate with copious warm saline until effluent is crystal clear.' },
          { title: 'Subdural Closed-System Drain Placement', description: 'Place a soft Jackson-Pratt subdural drain submerged under water seal. Perform 2-layer scalp closure with absorbable sutures and skin staples.' }
        ],
        anestheticConsiderations: [
          'Often performed on elderly patients with multiple comorbidities',
          'Can be performed under local anesthesia with sedation or general anesthesia',
          'Manage anticoagulation and antiplatelet status',
          'Monitor for sudden ICP changes upon evacuation'
        ],
        antibioticProphylaxis: {
          drug: 'Cazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Recurrence of hematoma', 'Seizure', 'Pneumocephalus', 'Infection'],
          anesthetic: ['Agitation (if under sedation)', 'Respiratory depression', 'Hemodynamic instability']
        },
        management: {
          preOp: ['Review coagulation status (INR/Platelets)', 'Assess baseline neurological status (GCS)'],
          intraOp: [
            'Maintain a flat or slightly head-down position (if tolerated) during evacuation to prevent pneumocephalus.',
            'Monitor for sudden bradycardia or hypertension (Cushing\'s triad) during dural opening and evacuation.',
            'Provide gentle sedation and effective local anesthesia to keep the patient calm and cooperative if not under GA.',
            'Ensure adequate hydration to facilitate brain re-expansion and reduce the risk of recurrence.'
          ],
          postOp: ['Maintain flat position for 24-48 hours', 'Frequent neurological observations', 'Monitor drain output']
        }
      }
    ]
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular Surgery',
    generalConsiderations: {
      preOp: [
        'Comprehensive cardiac assessment (Echo, Angiogram, EF)',
        'Review respiratory and renal function',
        'Assess for carotid artery disease',
        'Confirm blood products availability (Crossmatch 4-6 units)'
      ],
      intraOp: [
        'Utilize comprehensive invasive monitoring, including an arterial line, central venous catheter (CVC), pulmonary artery (PA) catheter, and transesophageal echocardiography (TEE) for real-time cardiac assessment.',
        'Manage systemic anticoagulation meticulously using heparin (monitored by ACT) before initiating cardiopulmonary bypass (CPB), and reverse with protamine after weaning from bypass.',
        'Maintain stable hemodynamics and monitor for potential complications like myocardial ischemia, arrhythmias, or bleeding during all phases of the procedure.',
        'Ensure meticulous management of the cardiopulmonary bypass (CPB) circuit, including monitoring of perfusion pressures, acid-base balance, and temperature (hypothermia/rewarming).',
        'Provide effective neuroprotection by maintaining adequate cerebral perfusion and monitoring for signs of cerebral emboli or ischemia during cannulation and bypass.'
      ],
      postOp: [
        'ICU admission for mechanical ventilation and inotropic support',
        'Monitor for tamponade or graft occlusion',
        'Tight glycemic control',
        'Early extubation (fast-track) if stable'
      ]
    },
    procedures: [
      {
        id: 'cabg',
        name: 'Coronary Artery Bypass Graft (CABG)',
        estimatedBloodLoss: '500 - 1200 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + Platelets + FFP + Cell Saver',
        airwayStrategy: 'Oral ETT + Full Invasive Monitoring (A-line, CVC, PA Catheter, TEE)',
        recommendedBlocks: ['High Thoracic Epidural', 'Erector Spinae Plane (ESP) Block', 'Parasternal Block'],
        erasHighlights: ['Heparinization (ACT > 400s)', 'TXA loading + infusion', 'Fast-track extubation within 6 hours'],
        guide: [
          { title: 'Access', description: 'Perform a median sternotomy to expose the heart and the great vessels. Harvest the conduit vessels (e.g., internal mammary artery, saphenous vein, or radial artery).' },
          { title: 'Cannulation', description: 'Establish cardiopulmonary bypass (CPB) by cannulating the ascending aorta and the right atrium (or venae cavae). Initiate bypass and cool the patient.' },
          { title: 'Cardioplegia', description: 'Cross-clamp the aorta and deliver cardioplegia solution (cold blood or crystalloid) into the coronary arteries to achieve cardiac standstill and myocardial protection.' },
          { title: 'Grafting', description: 'Perform microsurgical anastomoses of the harvested conduits to the coronary arteries distal to the stenotic lesions.' },
          { title: 'Weaning', description: 'De-air the heart and remove the aortic cross-clamp. Gradually wean the patient from CPB as the heart resumes its function. Reverse anticoagulation with protamine.' },
          { title: 'Closure', description: 'Ensure meticulous hemostasis and place mediastinal and pleural drains. Close the sternum with stainless steel wires and perform a layered closure of the soft tissues.' }
        ],
        anestheticConsiderations: [
          'High-dose opioid or balanced technique',
          'Maintain myocardial oxygen supply/demand balance',
          'Manage anticoagulation (ACT > 400s for CPB)',
          'Monitor for ischemia (ECG, TEE)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Vancomycin',
          dosage: '1.5g + 1g IV',
          timing: 'At induction',
          alternatives: 'Teicoplanin'
        },
        complications: {
          surgical: ['Graft failure', 'Bleeding/Tamponade', 'Sternal wound infection', 'Stroke'],
          anesthetic: ['Low Cardiac Output Syndrome (LCOS)', 'Arrhythmias (AF)', 'Renal failure', 'Vasoplegia']
        },
        management: {
          preOp: ['Review antiplatelet/anticoagulant timing', 'Optimize Hb'],
          intraOp: [
            'Monitor for myocardial ischemia and arrhythmias during all phases of the procedure, especially during induction, cannulation, and weaning from bypass.',
            'Manage systemic anticoagulation and its reversal meticulously; ensure the activated clotting time (ACT) is adequate before initiating CPB and returns to baseline after protamine administration.',
            'Utilize transesophageal echocardiography (TEE) to assess cardiac function, valvular integrity, and the adequacy of de-airing before weaning from bypass.',
            'Maintain stable hemodynamics and optimize preload, afterload, and contractility (using inotropes or vasopressors as needed) during the weaning process and post-bypass period.'
          ],
          postOp: ['Monitor chest drain output', 'Manage shivering and hypertension']
        }
      },
      {
        id: 'avr',
        name: 'Aortic Valve Replacement (AVR)',
        estimatedBloodLoss: '400 - 1000 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + Cell Saver',
        airwayStrategy: 'Oral ETT + Invasive A-line + CVC + TEE',
        recommendedBlocks: ['Parasternal Block', 'Erector Spinae Plane (ESP) Block'],
        erasHighlights: ['TEE assessment of prosthetic valve area & leak', 'Protamine reversal monitoring', 'Fast-track weaning'],
        guide: [
          { title: 'Access', description: 'Perform a median sternotomy or a minimally invasive approach (e.g., right mini-thoracotomy) to expose the ascending aorta and the heart.' },
          { title: 'Cannulation', description: 'Establish cardiopulmonary bypass (CPB) and initiate systemic cooling. Cross-clamp the aorta and deliver cardioplegia to achieve cardiac arrest.' },
          { title: 'Aortotomy', description: 'Perform a transverse or oblique incision in the ascending aorta just above the sinotubular junction to expose the aortic valve.' },
          { title: 'Resection', description: 'Carefully excise the diseased (stenotic or regurgitant) aortic valve leaflets and debride any annular calcium to prepare for the prosthesis.' },
          { title: 'Implantation', description: 'Suture the prosthetic valve (mechanical or bioprosthetic) into the aortic annulus using interrupted or continuous sutures.' },
          { title: 'Closure', description: 'Close the aortotomy with a double-layer suture technique. De-air the heart, remove the aortic cross-clamp, and wean the patient from CPB.' }
        ],
        anestheticConsiderations: [
          'Maintain hemodynamic stability (avoid tachycardia/hypotension)',
          'Monitor for ischemia and valve function with TEE',
          'Manage anticoagulation and CPB',
          'High-dose opioid or balanced technique'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin + Vancomycin',
          dosage: '2g + 1g IV',
          timing: 'At induction',
          alternatives: 'Teicoplanin'
        },
        complications: {
          surgical: ['Paravalvular leak', 'Heart block', 'Stroke', 'Bleeding'],
          anesthetic: ['Low cardiac output', 'Arrhythmias', 'Vasoplegia']
        },
        management: {
          preOp: ['Review Echo for valve area and gradient', 'Check dental health'],
          intraOp: [
            'Monitor for myocardial ischemia and arrhythmias, particularly during induction and weaning from bypass.',
            'Utilize transesophageal echocardiography (TEE) to assess the prosthetic valve function, check for paravalvular leaks, and ensure adequate de-airing of the left heart.',
            'Manage systemic anticoagulation and its reversal meticulously; ensure the activated clotting time (ACT) is adequate before initiating CPB.',
            'Maintain stable hemodynamics, taking care to avoid sudden drops in systemic vascular resistance (SVR) or extreme heart rates in patients with severe aortic stenosis or regurgitation.'
          ],
          postOp: ['ICU management', 'Monitor for conduction blocks']
        }
      },
      {
        id: 'mitral-valve',
        name: 'Mitral Valve Repair/Replacement',
        estimatedBloodLoss: '400 - 1000 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + Cell Saver',
        airwayStrategy: 'Oral ETT + Invasive A-line + CVC + TEE',
        recommendedBlocks: ['Parasternal Block', 'Erector Spinae Plane (ESP) Block'],
        erasHighlights: ['TEE assessment of repair/SAM', 'Protamine reversal monitoring', 'Fast-track weaning'],
        guide: [
          { title: 'Access', description: 'Perform a median sternotomy or a right mini-thoracotomy. Open the left atrium (usually via Sondergaard\'s groove) to expose the mitral valve.' },
          { title: 'Cannulation', description: 'Establish CPB with bicaval cannulation (superior and inferior venae cavae) to allow for a bloodless field in the left atrium.' },
          { title: 'Repair/Replacement', description: 'Assess the mitral valve. Perform a repair (e.g., annuloplasty, chordal replacement) or excise the leaflets if a replacement is necessary.' },
          { title: 'Implantation', description: 'Suture the prosthetic valve into the mitral annulus, ensuring preservation of the subvalvular apparatus if possible to maintain left ventricular function.' },
          { title: 'Closure', description: 'Close the left atriotomy. De-air the heart, remove the aortic cross-clamp, and wean the patient from CPB under TEE guidance.' }
        ],
        anestheticConsiderations: [
          'Maintain stable heart rate and rhythm',
          'Monitor for pulmonary hypertension',
          'TEE is essential for assessing repair success',
          'Manage anticoagulation and CPB'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin + Vancomycin',
          dosage: '2g + 1g IV',
          timing: 'At induction',
          alternatives: 'Teicoplanin'
        },
        complications: {
          surgical: ['SAM (Systolic Anterior Motion)', 'Residual leak', 'Heart block', 'Bleeding'],
          anesthetic: ['Right ventricular failure', 'Arrhythmias', 'Low cardiac output']
        },
        management: {
          preOp: ['Review Echo for severity and RV function', 'Optimize medications'],
          intraOp: [
            'Monitor for pulmonary hypertension and right ventricular dysfunction, which are common in patients with chronic mitral valve disease.',
            'Utilize transesophageal echocardiography (TEE) to assess the adequacy of the repair or the function of the replacement valve, and to monitor for systolic anterior motion (SAM) after repair.',
            'Manage systemic anticoagulation and its reversal meticulously; ensure the activated clotting time (ACT) is adequate before initiating CPB.',
            'Maintain stable hemodynamics and optimize preload and afterload during the weaning process, being mindful of the risk of left ventricular outflow tract (LVOT) obstruction after repair.'
          ],
          postOp: ['ICU management', 'Monitor for AF']
        }
      },
      {
        id: 'thoracic-aneurysm',
        name: 'Thoracic Aortic Aneurysm Repair (Open)',
        estimatedBloodLoss: '1000 - 3000 mL',
        bloodProductPrep: 'Massive Transfusion Protocol (MTP): 10 PRBCs, 10 FFP, 2 Platelets + Cell Saver',
        airwayStrategy: 'Left Double-Lumen Tube (DLT) + Full Invasive Lines + CSF Drain',
        recommendedBlocks: ['Thoracic Epidural (T5-T7)', 'Erector Spinae Plane (ESP) Block'],
        erasHighlights: ['Lumbar CSF drain monitoring (target CSF pressure < 10 cmH2O)', 'Distal aortic perfusion (Left Heart Bypass)', 'Hypothermic neuroprotection'],
        guide: [
          { title: 'Access', description: 'Left thoracotomy or thoracoabdominal incision.' },
          { title: 'Bypass', description: 'Establishment of Left Heart Bypass (LHB) or CPB.' },
          { title: 'Clamping', description: 'Cross-clamping of the aorta (proximal and distal to aneurysm).' },
          { title: 'Grafting', description: 'Replacement of the diseased aorta with a Dacron graft.' },
          { title: 'Reperfusion', description: 'Removal of clamps and restoration of flow.' }
        ],
        anestheticConsiderations: [
          'Extremely high risk; manage massive blood loss and fluid shifts',
          'One-Lung Ventilation (OLV) often required',
          'Spinal cord protection (CSF drainage, distal perfusion, hypothermia)',
          'Manage hypertension proximal to the clamp and hypotension distal'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin + Vancomycin',
          dosage: '2g + 1g IV',
          timing: 'At induction',
          alternatives: 'Teicoplanin'
        },
        complications: {
          surgical: ['Paraplegia (spinal cord ischemia)', 'Renal failure', 'Hemorrhage', 'Aortic dissection'],
          anesthetic: ['Myocardial ischemia', 'Coagulopathy', 'Respiratory failure']
        },
        management: {
          preOp: ['Review CT for anatomy', 'Optimize cardiac and renal function'],
          intraOp: ['Monitor CSF pressure', 'Aggressive blood conservation (Cell saver)'],
          postOp: ['ICU management', 'Monitor for neurological deficits']
        }
      },
      {
        id: 'ascending-aortic-replacement',
        name: 'Ascending Aortic Replacement / Hemiarch',
        estimatedBloodLoss: '800 - 2000 mL',
        bloodProductPrep: 'Crossmatch 6 Units PRBCs + Platelets + FFP + Cell Saver',
        airwayStrategy: 'Oral ETT + Bilateral Radial A-lines + NIRS + TEE',
        recommendedBlocks: ['Parasternal Block', 'ESP Block'],
        erasHighlights: ['Deep Hypothermic Circulatory Arrest (DHCA 18-24°C)', 'Antegrade Cerebral Perfusion (ACP)', 'NIRS monitoring'],
        guide: [
          { title: 'Median Sternotomy & Axillary Cannulation', description: 'Perform full median sternotomy. Cannulate right subclavian/axillary artery via 8mm Dacron side-graft and right atrium for arterial/venous CPB inflow.' },
          { title: 'Systemic Cooling to DHCA (18-24°C)', description: 'Initiate cardiopulmonary bypass and active core systemic cooling down to Deep Hypothermic Circulatory Arrest (DHCA) target temperature (18-24°C).' },
          { title: 'Antegrade Cerebral Perfusion (ACP)', description: 'Cross-clamp aorta, arrest heart with cold blood cardioplegia, drain blood volume into reservoir, and deliver selective ACP via right axillary cannula.' },
          { title: 'Distal & Proximal Dacron Graft Anastomoses', description: 'Transect diseased ascending aorta. Suture woven Dacron graft to distal hemiarch and proximal sinotubular junction using continuous 3-0 Prolene sutures.' },
          { title: 'Controlled Rewarming & CPB Weaning', description: 'De-air graft under TEE, remove aortic clamp, slowly rewarm patient (< 0.5°C/min), administer Protamine, and reverse coagulopathy before sternal closure.' }
        ],
        anestheticConsiderations: [
          'Manage DHCA: neuroprotection (head ice, steroids, thiopental), monitoring (EEG, SSEP, NIRS).',
          'Complex anticoagulation management (prolonged bypass and cooling).',
          'High risk for coagulopathy upon rewarming.',
          'Manage multiple pressure monitoring sites (e.g., Bilateral A-lines if axillary cannulation).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Vancomycin',
          dosage: '1.5g + 1g IV',
          timing: 'At induction',
          alternatives: 'Teicoplanin'
        },
        complications: {
          surgical: ['Stroke/Neurological injury', 'Bleeding/Coagulopathy', 'Renal failure', 'Phrenic nerve injury'],
          anesthetic: ['LCOS', 'Vasoplegia', 'Systemic inflammatory response']
        },
        management: {
          preOp: ['Detailed neuro/vascular exam', 'Check carotid dopplers', 'Verify blood availability'],
          intraOp: ['NIRS (Near-Infrared Spectroscopy) for brain', 'Bilateral A-lines', 'pH-stat vs alpha-stat management during cooling'],
          postOp: ['Slow rewarming', 'Aggressive clotting factor replacement', 'ICU management']
        }
      },
      {
        id: 'pericardiectomy',
        name: 'Pericardiectomy (Radical)',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + Cell Saver',
        airwayStrategy: 'Oral ETT + Invasive Lines + TEE',
        recommendedBlocks: ['Parasternal Block'],
        erasHighlights: ['Constrictive pericarditis hemodynamics (preload dependent)', 'TEE monitoring of ventricle expansion'],
        guide: [
          { title: 'Sternotomy & Exposure', description: 'Perform median sternotomy or posterolateral thoracotomy. Carefully expose the severely calcified, thickened constrictive pericardium.' },
          { title: 'Phrenic Nerve Identification', description: 'Identify, mobilize, and protect both left and right phrenic nerves with wet vessel loops to prevent postoperative diaphragmatic paralysis.' },
          { title: 'Ventricular Decortication', description: 'Systematically dissect and peel the rigid pericardial shell off the left ventricle first, then the right ventricle, releasing epicardial constriction.' },
          { title: 'Atrial & Great Vessel Release', description: 'Extend pericardial resection phrenic-to-phrenic, freeing the right atrium, left atrium, superior vena cava, and inferior vena cava.' },
          { title: 'Hemostasis & Drain Placement', description: 'Ensure complete epicardial hemostasis. Place pleural and mediastinal suction drains and perform rigid sternal wire closure.' }
        ],
        anestheticConsiderations: [
          'High risk of sudden cardiac rupture or major vessel injury during dissection.',
          'Hemodynamics can change rapidly as the "constriction" is released.',
          'Difficult monitoring (CVP/PA catheters may not accurately reflect transmural pressures).',
          'Be prepared for sudden, massive hemorrhage (blood in the room).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Myocardial injury/perforation', 'Phrenic nerve injury', 'Hemorrhage'],
          anesthetic: ['Low cardiac output post-bypass', 'Dysrhythmias', 'Right heart failure']
        },
        management: {
          preOp: ['Review Echo/CT for calcification', 'Optimize fluid status'],
          intraOp: ['TEE is essential', 'Maintain high index of suspicion for perforation', 'Inotropic support ready'],
          postOp: ['Monitor for "rebound" heart failure', 'ICU level care']
        }
      },
      {
        id: 'bentall-procedure',
        name: 'Bentall Procedure (Aortic Root Replacement)',
        estimatedBloodLoss: '500 - 1500 mL',
        bloodProductPrep: 'Crossmatch 4-6 Units PRBCs + Platelets + Cell Saver',
        airwayStrategy: 'Oral ETT + Invasive A-line + CVC + TEE',
        recommendedBlocks: ['Parasternal Block'],
        erasHighlights: ['TEE assessment of coronary ostial re-implantation', 'Protamine reversal surveillance'],
        guide: [
          { title: 'Sternotomy & CPB Initiation', description: 'Perform median sternotomy. Cannulate ascending aorta/arch and right atrium to establish CPB. Cross-clamp aorta and infuse cardioplegia into coronary ostia.' },
          { title: 'Root & Valve Resection', description: 'Excise diseased ascending aorta, aortic valve leaflets, and calcified annulus. Mobilize coronary ostia as circular "buttons" with surrounding aortic wall.' },
          { title: 'Valved Conduit Implantation', description: 'Implant a mechanical or bioprosthetic valved composite graft into the aortic annulus using interrupted pledgeted sutures.' },
          { title: 'Coronary Button Re-implantation', description: 'Re-implant the left and right coronary buttons into pre-cut openings in the composite graft using continuous 5-0 or 6-0 Prolene sutures.' },
          { title: 'Distal Anastomosis & De-airing', description: 'Perform end-to-end anastomosis of graft to distal ascending aorta. De-air heart, remove cross-clamp, reverse heparin with protamine, and close.' }
        ],
        anestheticConsiderations: [
          'Technically demanding with long bypass/cross-clamp times.',
          'Critical myocardial protection (selective coronary cardioplegia).',
          'Monitor for myocardial ischemia after re-implantation (ECG, TEE).',
          'High risk of bleeding from multiple suture lines.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Vancomycin',
          dosage: '1.5g + 1g IV',
          timing: 'At induction',
          alternatives: 'Teicoplanin'
        },
        complications: {
          surgical: ['Coronary ostial stenosis/occlusion', 'Bleeding', 'Heart block', 'Stroke'],
          anesthetic: ['Difficult weaning from bypass', 'Vasoplegia', 'Ischemia']
        },
        management: {
          preOp: ['Review coronary anatomy', 'Confirm valve type choice'],
          intraOp: ['TEE to assess valve and regional wall motion', 'Aggressive hemostasis', 'Manage bypass physiology'],
          postOp: ['Vigilant ECG monitoring', 'Tight BP control to protect suture lines']
        }
      },
      {
        id: 'heart-transplant',
        name: 'Orthotopic Heart Transplantation',
        estimatedBloodLoss: '800 - 2000 mL',
        bloodProductPrep: 'Crossmatch 6-8 Units PRBCs + MTP Protocol + Cell Saver',
        airwayStrategy: 'Oral ETT + Pulmonary Artery Catheter + TEE',
        recommendedBlocks: ['Sterile Intraoperative Local Infiltration'],
        erasHighlights: ['Denervated heart pharmacology (Use Isoproterenol / Epinephrine, NOT Atropine)', 'Inhaled Nitric Oxide for RV failure'],
        guide: [
          { title: 'Recipient Cardiectomy', description: 'Perform median sternotomy. Cannulate ascending aorta and bicaval CPB. Cross-clamp aorta, excise native heart leaving posterior atrial cuff (biatrial) or vena cava stumps (bicaval).' },
          { title: 'Left Atrial Anastomosis', description: 'Trim donor left atrium and perform continuous 3-0 monofilament anastomosis to recipient left atrial cuff/pulmonary vein confluence.' },
          { title: 'Venous Anastomoses', description: 'Perform inferior vena cava (IVC) and superior vena cava (SVC) end-to-end anastomoses (or right atrial cuff anastomosis).' },
          { title: 'Arterial Anastomoses', description: 'Perform end-to-end anastomoses of donor pulmonary artery to recipient pulmonary artery, followed by donor aorta to recipient aorta.' },
          { title: 'Reperfusion & De-airing', description: 'De-air left heart under TEE monitoring. Remove aortic cross-clamp, initiate epicardial pacing, administer inotropic/chronotropic support (Isoproterenol), and wean from CPB.' }
        ],
        anestheticConsiderations: [
          'Denervated donor heart: will not respond to Atropine or EPH; requires direct-acting agents (Isoproterenol, Adrenaline).',
          'High risk of Right Ventricular (RV) failure post-bypass due to recipient pulmonary hypertension.',
          'Strict aseptic technique (immunocompromised state).',
          'Manage the transition from failing heart to transplanted heart.'
        ],
        antibioticProphylaxis: {
          drug: 'Piperacillin-Tazobactam or Vancomycin',
          dosage: '4.5g IV',
          timing: 'At induction',
          alternatives: 'Caspofungin (if high risk)'
        },
        complications: {
          surgical: ['Acute rejection', 'Primary graft failure', 'RV failure', 'Bleeding'],
          anesthetic: ['Bradycardia (requires pacing)', 'Pulmonary HTN', 'Cerebral emboli']
        },
        management: {
          preOp: ['Rapid review of donor/recipient match', 'Hold anticoagulants', 'Strict sterile setup'],
          intraOp: ['Isoproterenol infusion ready', 'Nitric Oxide/Epoprostenol for RV support', 'Pacing wires ready'],
          postOp: ['Steroid boluses', 'Strict isolation', 'Continuous RV function monitoring']
        }
      },
      {
        id: 'pulmonary-embolectomy',
        name: 'Pulmonary Embolectomy (Acute)',
        estimatedBloodLoss: '500 - 1500 mL',
        bloodProductPrep: 'Crossmatch 4-6 Units PRBCs + MTP Protocol',
        airwayStrategy: 'Oral ETT + Invasive A-line + CVC + TEE',
        recommendedBlocks: ['Parasternal Block'],
        erasHighlights: ['High risk of cardiac arrest at induction', 'Inhaled Nitric Oxide / Epoprostenol for acute RV failure'],
        guide: [
          { title: 'Sternotomy & Emergency CPB', description: 'Perform rapid median sternotomy. Cannulate ascending aorta and right atrium/bicaval to initiate emergency CPB without cardiac arrest.' },
          { title: 'Pulmonary Trunk Arteriotomy', description: 'Cross-clamp aorta if needed and perform a longitudinal arteriotomy along main pulmonary artery trunk extending into main left/right branches.' },
          { title: 'Thrombus Extraction & Flushing', description: 'Use Randall forceps, polyp forceps, and suction to extract massive saddle emboli. Perform manual ventilation / saline lung flushing to mobilize distal arterial clots.' },
          { title: 'Arteriotomy Closure', description: 'Irrigate pulmonary vascular tree. Close main pulmonary arteriotomy with continuous 4-0 or 5-0 monofilament suture.' },
          { title: 'Weaning & RV Support', description: 'Wean from CPB under TEE monitoring of RV function. Administer pulmonary vasodilators (Nitric Oxide / Epoprostenol) and protamine reversal.' }
        ],
        anestheticConsiderations: [
          'CRITICAL risk of circulatory collapse at induction. Maintain preload and avoid vasodilation.',
          'Right heart failure management: keep RV afterload low (avoid hypoxia/hypercarbia).',
          'Be prepared for massive hemoptysis post-reperfusion.',
          'High risk of lung injury (reperfusion edema).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Gentamicin'
        },
        complications: {
          surgical: ['Residual emboli', 'Pulmonary artery rupture', 'Bleeding'],
          anesthetic: ['RV failure', 'Reperfusion lung injury', 'Cardiac arrest at induction']
        },
        management: {
          preOp: ['Inotropes/Vasopressors before induction', 'Review Echo for RV strain'],
          intraOp: ['Maintain high MAP', 'Nitric Oxide available', 'TEE to monitor RV function'],
          postOp: ['Slow weaning from ventilation', 'Monitor for pulmonary hemorrhage']
        }
      },
      {
        id: 'lvad-insertion',
        name: 'Left Ventricular Assist Device (LVAD) Insertion',
        estimatedBloodLoss: '500 - 1200 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + Platelets + FFP',
        airwayStrategy: 'Oral ETT + Invasive A-line + CVC + TEE',
        recommendedBlocks: ['Parasternal Block', 'ESP Block'],
        erasHighlights: ['TEE assessment of RV function & PFO exclusion', 'Continuous non-pulsatile MAP target (70-80 mmHg)'],
        guide: [
          { title: 'Sternotomy & CPB Access', description: 'Perform median sternotomy. Cannulate ascending aorta and right atrium to establish normothermic CPB on beating heart.' },
          { title: 'Apical Crotch & Inflow Ring Placement', description: 'Expose left ventricular apex. Secure sewing ring to LV apex with heavy felt-pledgeted mattress sutures and core apical myocardium using circular punch cutter.' },
          { title: 'Inflow Cannula & Pump Securing', description: 'Insert LVAD inflow cannula into left ventricle parallel to interventricular septum towards mitral valve. Secure pump housing to apical sewing ring.' },
          { title: 'Outflow Anastomosis & Driveline Tunnel', description: 'Anastomose Dacron outflow graft end-to-side to ascending aorta. Pass percutaneous driveline through subcutaneous tunnel to exit right upper abdominal quadrant.' },
          { title: 'De-airing & Pump Activation', description: 'De-air pump housing and outflow graft under TEE guidance. Slowly ramp up LVAD RPMs while weaning CPB, maintaining RV contractility and MAP 70-80 mmHg.' }
        ],
        anestheticConsiderations: [
          'Crucial to optimize RV function; the LVAD will only work if the RV can provide enough blood.',
          'TEE is mandatory to rule out ASD/PFO (causes R->L shunt after LVAD start) and aortic regurgitation.',
          'Manage the shift from pulsatile to continuous flow physiology.',
          'High risk of bleeding (anticoagulation/coagulopathy).'
        ],
        antibioticProphylaxis: {
          drug: 'Vancomycin + Cefazolin',
          dosage: '1g + 2g IV',
          timing: 'At induction',
          alternatives: 'Linezolid'
        },
        complications: {
          surgical: ['RV failure (most common)', 'Driveline infection', 'Stroke', 'Tamponade'],
          anesthetic: ['Suction events (low preload)', 'Arrhythmias', 'Vasoplegia']
        },
        management: {
          preOp: ['Strict fluid management', 'Review donor/recipient status (if bridge to transplant)'],
          intraOp: ['Nitric Oxide for RV', 'Inotropic support', 'TEE monitoring of septum position'],
          postOp: ['Maintain MAP 70-80 (non-pulsatile)', 'Monitor for RV failure symptoms']
        }
      },
      {
        id: 'tavi',
        name: 'Transcatheter Aortic Valve Implantation (TAVI/TAVR)',
        estimatedBloodLoss: '< 100 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2 Units standby',
        airwayStrategy: 'Monitored Anesthesia Care (MAC) with Local / Oral ETT if complex',
        recommendedBlocks: ['Femoral Nerve Block / Inguinal Local Infiltration'],
        erasHighlights: ['Rapid Ventricular Pacing (RVP 180-220 bpm)', 'Vascular closure site surveillance', 'Day 1 ambulation'],
        guide: [
          { title: 'Access', description: 'Establish femoral arterial access (usually) using a percutaneous approach or a small cutdown. Insert a temporary pacing wire.' },
          { title: 'Crossing the Valve', description: 'Pass a guidewire across the stenotic aortic valve into the left ventricle under fluoroscopic guidance.' },
          { title: 'Deployment', description: 'Position the prosthetic valve (balloon-expandable or self-expanding) within the native valve. Perform "Rapid Ventricular Pacing" (RVP) to reduce cardiac output during deployment.' },
          { title: 'Verification', description: 'Assess valve function and check for paravalvular leak using aortography and TEE/TTE.' },
          { title: 'Closure', description: 'Remove the delivery system and achieve hemostasis at the access site using vascular closure devices or sutures.' }
        ],
        anestheticConsiderations: [
          'Can be performed under conscious sedation or general anesthesia',
          'Manage the "Rapid Ventricular Pacing" (RVP) sequence (temporary asystole)',
          'High risk for sudden hemodynamic collapse or heart block',
          'Vigilant monitoring for vascular complications or stroke'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Vascular injury/bleeding', 'Stroke', 'Aortic rupture (rare but fatal)', 'Valve malposition'],
          anesthetic: ['Heart block requiring pacing', 'Myocardial ischemia', 'Contrast-induced nephropathy']
        },
        management: {
          preOp: ['Review Echo for valve area/gradient', 'Assess femoral access on CT', 'Crossmatch 2 units PRBCs'],
          intraOp: [
            'Communicate closely with the cardiology/surgical team during RVP; ensure the patient is ready for the transient period of asystole.',
            'Monitor for new-onset heart block or arrhythmias; have the temporary pacer set at the appropriate backup rate.',
            'Maintain stable MAP and be prepared for immediate conversion to open surgery if a catastrophic complication occurs.',
            'Monitor for signs of stroke or peripheral ischemia throughout the procedure.'
          ],
          postOp: ['Monitor for heart block and vascular site bleeding', 'Early mobilization', 'Check renal function']
        }
      }
    ]
  },
  {
    id: 'ent',
    name: 'ENT Surgery',
    generalConsiderations: {
      preOp: [
        'Assess for shared airway (surgeon and anesthetist)',
        'Review for difficult airway (Stridor, tumors, limited mouth opening)',
        'Check for OSA (Obstructive Sleep Apnea)',
        'Confirm NPO status'
      ],
      intraOp: [
        'Airway protection (Laser-safe tubes if applicable)',
        'Manage "shared airway" communication',
        'Avoid muscle relaxants if nerve monitoring is used',
        'Smooth emergence to avoid laryngospasm'
      ],
      postOp: [
        'Monitor for airway obstruction/edema',
        'Manage PONV (high risk)',
        'Monitor for bleeding (especially tonsillectomy)',
        'Humidified oxygen if indicated'
      ]
    },
    procedures: [
      {
        id: 'tonsillectomy',
        name: 'Tonsillectomy',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral RAE ETT + Shared Airway Protocol',
        recommendedBlocks: ['Glossopharyngeal Nerve Block', 'Peritonsillar Local Infiltration'],
        erasHighlights: ['Dexamethasone 0.15 mg/kg IV for airway edema', 'Dual antiemetic PONV prophylaxis', 'Awake extubation in lateral position'],
        guide: [
          { title: 'Exposure & Mouth Gag Placement', description: 'Place patient supine with head extended (Rose position). Insert Boyle-Davis mouth gag with appropriate tongue blade to expose the oropharynx, securing it to the Draffin rods.' },
          { title: 'Incision & Plane Identification', description: 'Grasp the upper pole of the tonsil with tonsil holding forceps and pull medially. Make an incision through the mucosal fold along the anterior tonsillar pillar.' },
          { title: 'Extracapsular Dissection', description: 'Using a Hurd dissector, coblator, or monopolar diathermy, dissect the tonsil out of the tonsillar fossa within the avascular peritonsillar space down to the lower pole.' },
          { title: 'Snaring & Lower Pole Resection', description: 'Pass an Eve tonsil snare around the lower pole pedicle or cut with diathermy to completely remove the tonsil en-bloc.' },
          { title: 'Fossa Hemostasis & Inspection', description: 'Pack fossae with gauze sponges. Apply targeted bipolar diathermy or ties to bleeding mucosal vessels. Remove mouth gag and check for active bleeding.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with RAE tube or LMA (if appropriate)',
          'High risk of PONV (blood in stomach)',
          'Dexamethasone for edema and PONV',
          'Extubation in lateral position (awake)'
        ],
        antibioticProphylaxis: {
          drug: 'None routinely',
          dosage: '-',
          timing: '-',
          alternatives: 'Consider if history of recurrent infections'
        },
        complications: {
          surgical: ['Primary/Secondary hemorrhage', 'Dehydration', 'Infection'],
          anesthetic: ['Laryngospasm', 'Aspiration of blood', 'Airway fire (if laser used)']
        },
        management: {
          preOp: ['Check for recent URTI', 'Review coagulation screen if indicated'],
          intraOp: ['Ensure adequate depth of anesthesia', 'Suction stomach before emergence'],
          postOp: ['Monitor for "frequent swallowing" (sign of bleeding)', 'Analgesia (regular paracetamol/ibuprofen)']
        }
      },
      {
        id: 'septoplasty',
        name: 'Septoplasty',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + Throat Pack',
        recommendedBlocks: ['Infraorbital Nerve Block', 'Sphenopalatine Block', 'Topical Cocaine / Phenylephrine'],
        erasHighlights: ['Throat pack removal verification', 'Controlled normotensive anesthesia', 'Day-case protocol'],
        guide: [
          { title: 'Topical Decongestant & Infiltration', description: 'Apply topical Cocaine or Epinephrine-soaked neuro-patties to nasal mucosa. Infiltrate nasal septum with 1% Lidocaine + 1:100,000 Epinephrine.' },
          { title: 'Freer Incision & Mucoperichondrial Flap', description: 'Perform a mucocutaneous junction incision (Freer hemitransfixion incision) in the caudal septum on the obstructed side.' },
          { title: 'Subperichondrial Dissection', description: 'Elevate the mucoperichondrial and mucoperiosteal flaps bilaterally off the quadrangular cartilage, vomer, and perpendicular plate of ethmoid.' },
          { title: 'Cartilage & Bone Resection / Correction', description: 'Excise or score the deviated quadrangular cartilage and spur bone using a chisel, gouge, or Jansen-Middleton forceps, preserving L-strut dorsal support.' },
          { title: 'Flap Re-approximation & Splinting', description: 'Re-approximate septal flaps using mattress quilting sutures. Insert bilateral silicone septal splints or anterior nasal packing.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT (throat pack used)',
          'Vasoconstrictors (Cocaine/Adrenaline) used topically (monitor for tachycardia/HTN)',
          'Smooth emergence to avoid bleeding',
          'Manage post-operative pain'
        ],
        antibioticProphylaxis: {
          drug: 'None routinely',
          dosage: '-',
          timing: '-',
          alternatives: 'Consider if packing used'
        },
        complications: {
          surgical: ['Septal perforation', 'Septal hematoma', 'Infection', 'Recurrence'],
          anesthetic: ['Laryngospasm', 'Aspiration of blood', 'Cocaine toxicity']
        },
        management: {
          preOp: ['Review for nasal obstruction', 'Confirm NPO'],
          intraOp: ['Monitor for arrhythmias', 'Ensure throat pack removal'],
          postOp: ['Monitor for bleeding', 'Avoid nose blowing']
        }
      },
      {
        id: 'myringotomy',
        name: 'Myringotomy and Grommet Insertion',
        estimatedBloodLoss: '< 20 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'LMA or Mask Ventilation',
        recommendedBlocks: ['None'],
        erasHighlights: ['Avoid Nitrous Oxide (N2O)', 'Rapid recovery/discharge'],
        guide: [
          { title: 'Otoscopy & Canal Clearance', description: 'Inspect external auditory canal under operating microscope. Clear earwax or debris using micro-forceps or suction.' },
          { title: 'Myringotomy Incision', description: 'Perform a radial radial incision in the anteroinferior quadrant of the tympanic membrane using a micro-myringotomy knife, avoiding ossicles and chorda tympani.' },
          { title: 'Middle Ear Aspiration', description: 'Insert fine microscopic suction tip (Baron #3/5) through the radial incision to thoroughly evacuate middle ear fluid ("glue").' },
          { title: 'Grommet Insertion', description: 'Grasp a fluoroplastic or silicone Shepard/Bobbin grommet (ventilation tube) with micro-forceps and seat its inner flange into the myringotomy incision.' },
          { title: 'Otoptic Drops & Inspection', description: 'Instill antibiotic/steroid ear drops into the canal. Confirm grommet position and patency under the microscope.' }
        ],
        anestheticConsiderations: [
          'General anesthesia (usually via mask or LMA)',
          'Short procedure, rapid turnover',
          'Manage pediatric anxiety',
          'Avoid Nitrous Oxide (can increase middle ear pressure)'
        ],
        antibioticProphylaxis: {
          drug: 'None routinely',
          dosage: '-',
          timing: '-',
          alternatives: '-'
        },
        complications: {
          surgical: ['Persistent perforation', 'Otorrhea', 'Tympanosclerosis', 'Grommet extrusion'],
          anesthetic: ['Laryngospasm', 'Agitation on emergence']
        },
        management: {
          preOp: ['Review for recent ear infections', 'Manage parental expectations'],
          intraOp: ['Ensure adequate depth for incision', 'Maintain airway'],
          postOp: ['Water precautions (ear plugs)', 'Audiology follow-up']
        }
      },
      {
        id: 'fess',
        name: 'Functional Endoscopic Sinus Surgery (FESS)',
        guide: [
          { title: 'Decongestant Packing & Rigid Endoscopy', description: 'Pack nasal cavities with 1:1,000 Epinephrine patties. Insert 0-degree rigid endoscope into nasal passage to visualize middle meatus.' },
          { title: 'Uncinate Resection & Maxillary Antrostomy', description: 'Perform uncinate process resection (uncinectomy) with sickle knife or microdebrider. Identify and enlarge natural maxillary sinus ostium.' },
          { title: 'Ethmoidectomy & Frontal Recess Entry', description: 'Perform anterior and posterior ethmoidectomy by opening ethmoid bulla and clearing inter-ethmoid septa to expose the frontal recess.' },
          { title: 'Sphenoidotomy & Polyp Debridement', description: 'Identify sphenoid sinus ostium medial to superior turbinate and widen it. Debride polyps and hypertrophic mucosa with microdebrider.' },
          { title: 'Hemostasis & Dissolvable Packing', description: 'Irrigate sinuses with saline. Place dissolvable hemostatic matrix (e.g., Nasopore or FloSeal) in middle meatus. Remove throat pack.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT (throat pack used)',
          'Maintain "bloodless field" (controlled hypotension, TIVA)',
          'Monitor for orbital or intracranial complications',
          'Smooth emergence'
        ],
        antibioticProphylaxis: {
          drug: 'Co-amoxiclav',
          dosage: '1.2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['CSF leak', 'Orbital injury/hematoma', 'Epistaxis', 'Synechiae'],
          anesthetic: ['Laryngospasm', 'Aspiration of blood', 'Controlled hypotension risks']
        },
        management: {
          preOp: ['Review CT sinuses', 'Optimize asthma/polyps (steroids)'],
          intraOp: ['Maintain low MAP (60-70 mmHg)', 'Ensure throat pack removal'],
          postOp: ['Nasal douching', 'Avoid straining']
        }
      },
      {
        id: 'mastoidectomy',
        name: 'Mastoidectomy',
        estimatedBloodLoss: '50 - 150 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT (No muscle relaxants for facial nerve monitoring)',
        recommendedBlocks: ['Great Auricular Nerve Block', 'Local Infiltration'],
        erasHighlights: ['Avoid Nitrous Oxide (N2O)', 'Dual PONV prophylaxis', 'Facial nerve monitoring protocol'],
        guide: [
          { title: 'Incision', description: 'Post-auricular incision.' },
          { title: 'Exposure', description: 'Elevation of the periosteum to expose the mastoid bone.' },
          { title: 'Drilling', description: 'Removal of mastoid air cells to expose the middle ear.' },
          { title: 'Intervention', description: 'Removal of cholesteatoma or placement of a cochlear implant.' },
          { title: 'Closure', description: 'Layered closure and mastoid dressing.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Avoid muscle relaxants (facial nerve monitoring)',
          'Avoid Nitrous Oxide (middle ear pressure)',
          'Manage PONV (high risk)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Facial nerve injury', 'Hearing loss', 'Vertigo', 'CSF leak'],
          anesthetic: ['PONV', 'Agitation on emergence']
        },
        management: {
          preOp: ['Review hearing tests', 'Check for vertigo'],
          intraOp: ['Monitor facial nerve signals', 'Maintain stable anesthesia'],
          postOp: ['Monitor for facial palsy', 'Manage dizziness']
        }
      },
      {
        id: 'myringoplasty',
        name: 'Myringoplasty (Tympanoplasty)',
        estimatedBloodLoss: '< 30 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'Oral ETT or Second-Gen LMA',
        recommendedBlocks: ['Great Auricular Nerve Block', 'Local Infiltration'],
        erasHighlights: ['Avoid Nitrous Oxide (N2O)', 'Smooth emergence to avoid graft displacement', 'Day-case protocol'],
        guide: [
          { title: 'Access', description: 'Transcanal or post-auricular approach.' },
          { title: 'Preparation', description: 'Freshening the edges of the tympanic membrane perforation.' },
          { title: 'Grafting', description: 'Placement of a graft (fascia or cartilage) under the perforation.' },
          { title: 'Packing', description: 'Securing the graft with Gelfoam or antibiotic-impregnated packing.' },
          { title: 'Closure', description: 'Closure of the incision (if post-auricular).' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Avoid Nitrous Oxide (can displace the graft)',
          'Maintain stable BP',
          'Smooth emergence'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Graft failure', 'Hearing loss', 'Tinnitus', 'Infection'],
          anesthetic: ['PONV', 'Laryngospasm']
        },
        management: {
          preOp: ['Review for recent ear infections', 'Check baseline hearing'],
          intraOp: ['Maintain stable anesthesia', 'Avoid N2O'],
          postOp: ['Water precautions', 'Avoid nose blowing']
        }
      },
      {
        id: 'laryngoscopy',
        name: 'Microlaryngoscopy and Biopsy',
        estimatedBloodLoss: '< 20 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Microlaryngeal ETT (MLT 5.0-6.0) / Jet Ventilation / Shared Airway',
        recommendedBlocks: ['Topical Lidocaine Spray (Laryngeal / Vocal Cords)'],
        erasHighlights: ['Laser-safe tube protocol', 'Deep muscle relaxation to prevent vocal cord motion', 'Dexamethasone 8mg IV for airway edema'],
        guide: [
          { title: 'Tooth Protection & Suspension Laryngoscopy', description: 'Insert plastic tooth guard over upper teeth. Introduce rigid suspension laryngoscope (e.g., Kleinsasser or Benjamin) to expose glottis and lock onto chest gallows.' },
          { title: 'Microscopic Inspection & Staging', description: 'Bring operating microscope equipped with 400mm lens into surgical field. Perform binocular inspection of anterior commissure, vocal folds, and subglottis.' },
          { title: 'Palpation & Micro-dissection', description: 'Palpate vocal cords with micro-probe to assess depth of submucosal lesion. Incise vocal fold mucosa along Reinke\'s space using micro-scissors.' },
          { title: 'Cold-Steel Biopsy / CO2 Laser Ablation', description: 'Obtain representative cold-steel cup biopsy of suspicious vocal cord mass, or perform CO2 laser ablation/excision with laser-safe airway protection.' },
          { title: 'Hemostasis & Suspension Removal', description: 'Apply topical Lidocaine/Epinephrine neuro-patty for mucosal hemostasis. Remove suspension laryngoscope and check upper teeth/oral mucosa for trauma.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with specialized tube (Microlaryngeal tube) or Jet Ventilation',
          'Shared airway; high risk of airway fire if laser used',
          'Ensure deep anesthesia and muscle relaxation (avoid coughing)',
          'Manage potential for airway edema'
        ],
        antibioticProphylaxis: {
          drug: 'None routinely',
          dosage: '-',
          timing: '-',
          alternatives: '-'
        },
        complications: {
          surgical: ['Airway edema/obstruction', 'Dental injury', 'Vocal cord scarring', 'Hemorrhage'],
          anesthetic: ['Airway fire (laser)', 'Hypoxia (during jet ventilation)', 'Laryngospasm']
        },
        management: {
          preOp: ['Review for stridor or airway obstruction', 'Check for loose teeth'],
          intraOp: ['Maintain stable anesthesia', 'Coordinate with surgeon for laser safety'],
          postOp: ['Monitor for airway obstruction', 'Voice rest']
        }
      },
      {
        id: 'commando-procedure',
        name: 'Commando Procedure (Glossectomy + Neck Dissection + Mandibulectomy)',
        estimatedBloodLoss: '500 - 1500 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs',
        airwayStrategy: 'Awake Fiberoptic Intubation / Elective Tracheostomy',
        recommendedBlocks: ['Cervical Plexus Block', 'Local Infiltration'],
        erasHighlights: ['Free flap perfusion management (avoid vasopressors)', 'Elective tracheostomy protocol', 'Strict temperature control'],
        guide: [
          { title: 'Airway Access & Tracheostomy', description: 'Perform elective surgical tracheostomy under local anesthesia / awake fiberoptic intubation. Secure tracheostomy tube to neck skin.' },
          { title: 'Neck Dissection Phase', description: 'Perform radical or modified radical neck dissection (Levels I-V). Isolate and preserve internal jugular vein, carotid artery, vagus nerve, and spinal accessory nerve.' },
          { title: 'Lip Split & Mandibulectomy', description: 'Perform midline lip-splitting incision extending into submandibular crease. Perform step-cut mandibulotomy or segmental mandibulectomy to expose oral cavity/oropharynx tumor.' },
          { title: 'En-Bloc Tumor Excision', description: 'Perform wide 1.5-2.0 cm margin en-bloc resection of primary oral mass (glossectomy / floor of mouth), specimen removed with bone and neck node packet.' },
          { title: 'Free Flap Reconstruction & Microvascular Anastomosis', description: 'Reconstruct oral defect using microvascular free flap (Radial Forearm or Anterolateral Thigh). Perform microvascular anastomoses to facial/superior thyroid vessels under microscope.' }
        ],
        anestheticConsiderations: [
          'Extremely difficult airway (often requires fiberoptic intubation or elective tracheostomy).',
          'Major blood loss and fluid shifts; large-bore access and A-line essential.',
          'Shared airway and complex surgical positioning.',
          'Manage free-flap physiology (avoid vasoconstrictors, maintain hydration).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Flap failure', 'Chyle leak', 'Nerve injury (CN XI, XII)', 'Oro-cutaneous fistula'],
          anesthetic: ['Airway obstruction', 'Aspiration', 'VAE (if large neck veins open)']
        },
        management: {
          preOp: ['Detailed airway assessment', 'Confirm tracheostomy tray presence'],
          intraOp: ['Strict fluid monitoring', 'Active warming', 'Avoid long-acting muscle relaxants'],
          postOp: ['ICU/HDU level care', 'Tracheostomy care', 'Nutrition support early']
        }
      }
    ]
  },

  {
    id: 'gynaecology',
    name: 'Gynaecology',
    generalConsiderations: {
      preOp: [
        'Review for anemia (heavy menstrual bleeding)',
        'Check pregnancy status (Urine HCG)',
        'Assess for previous pelvic surgeries',
        'Confirm NPO status'
      ],
      intraOp: [
        'Monitor for physiological changes associated with the steep Trendelenburg position and pneumoperitoneum, such as increased airway pressures and potential facial/airway edema.',
        'Ensure deep muscle relaxation throughout the procedure to optimize surgical visualization and prevent patient movement during critical dissection.',
        'Implement aggressive PONV prophylaxis, as this is a high-risk patient group; consider a multimodal approach including dexamethasone and ondansetron.',
        'Monitor end-tidal CO2 closely and adjust ventilation to manage hypercapnia resulting from CO2 absorption during laparoscopy.',
        'Maintain normothermia using forced-air warming and monitor for potential nerve injuries related to lithotomy positioning.'
      ],
      postOp: [
        'Manage PONV (high risk group)',
        'Effective analgesia (Multimodal)',
        'VTE prophylaxis',
        'Monitor for urinary retention'
      ]
    },
    procedures: [
      {
        id: 'tlh',
        name: 'Total Laparoscopic Hysterectomy (TLH)',
        estimatedBloodLoss: '100 - 300 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT (Steep Trendelenburg Position)',
        recommendedBlocks: ['TAP Block (Transversalis Plane)', 'Quadratus Lumborum (QL) Block'],
        erasHighlights: ['Low-pressure pneumoperitoneum', 'Dual PONV prophylaxis', 'Same-day / 24h discharge protocol'],
        guide: [
          { title: 'Access', description: 'Establish pneumoperitoneum and insert a 10 mm umbilical port for the camera. Place three additional 5 mm accessory ports in the lower abdomen. Insert a uterine manipulator to facilitate mobilization.' },
          { title: 'Ligation', description: 'Systematically identify and ligate the round ligaments, then the infundibulopelvic (or ovarian) ligaments, depending on whether the ovaries are to be removed.' },
          { title: 'Dissection', description: 'Mobilize the bladder off the lower uterine segment. Identify and ligate the uterine arteries at the level of the internal os.' },
          { title: 'Colpotomy', description: 'Perform a circumferential incision of the vagina at the level of the cervicovaginal junction using an energy device to remove the uterus.' },
          { title: 'Closure', description: 'Remove the uterus through the vagina. Close the vaginal vault laparoscopically with absorbable sutures. Deflate the abdomen and close the port sites.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with endotracheal intubation',
          'Steep Trendelenburg position (monitor airway pressures and facial edema)',
          'Muscle relaxation is essential',
          'Manage PONV aggressively'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Ureteric injury', 'Bladder/Bowel injury', 'Vault hematoma', 'Bleeding'],
          anesthetic: ['PONV', 'Nerve injury (Lithotomy position)', 'CO2 retention', 'Aspiration']
        },
        management: {
          preOp: ['Check hemoglobin', 'Review BMI'],
          intraOp: [
            'Monitor for physiological changes associated with the steep Trendelenburg position and pneumoperitoneum, such as increased airway pressures and potential facial/airway edema.',
            'Ensure deep muscle relaxation throughout the procedure to optimize surgical visualization and prevent patient movement during critical dissection.',
            'Implement aggressive PONV prophylaxis, as this is a high-risk patient group; consider a multimodal approach including dexamethasone and ondansetron.',
            'Monitor end-tidal CO2 closely and adjust ventilation to manage hypercapnia resulting from CO2 absorption during laparoscopy.'
          ],
          postOp: ['Early mobilization', 'Regular analgesia']
        }
      },
      {
        id: 'diagnostic-laparoscopy',
        name: 'Diagnostic Laparoscopy (Ectopic/Pelvic Pain)',
        estimatedBloodLoss: '50 - 500 mL (High if ruptured ectopic)',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2-4 Units if suspected ectopic rupture',
        airwayStrategy: 'Oral ETT + Trendelenburg',
        recommendedBlocks: ['TAP Block', 'Port-site Local Infiltration'],
        erasHighlights: ['Complete CO2 evacuation to prevent shoulder pain', 'Dual PONV prophylaxis', 'Day-case protocol'],
        guide: [
          { title: 'Umbilical Access & Insufflation', description: 'Perform 10 mm subumbilical Veress needle entry or open Hasson access. Establish pneumoperitoneum (12-14 mmHg) and insert primary 10 mm laparoscope.' },
          { title: 'Accessory Port Placement & Trendelenburg', description: 'Place patient in 20-degree Trendelenburg position. Insert two 5 mm accessory ports in right and left lower quadrants under direct visualization.' },
          { title: 'Systematic Pelvic Survey', description: 'Systematically inspect uterus, bilateral fallopian tubes, ovaries, pouch of Douglas, and paracolic gutters for ectopic pregnancy, endometriosis, or adhesions.' },
          { title: 'Targeted Surgical Intervention', description: 'Perform indicated therapeutic intervention (e.g., laparoscopic salpingectomy for ectopic pregnancy, diathermy of endometriotic implants, or adhesiolysis).' },
          { title: 'Pneumoperitoneum Evacuation & Closure', description: 'Perform copious pelvic irrigation. Evacuate all CO2 gas while in reverse Trendelenburg to prevent phrenic nerve shoulder pain. Infiltrate local anesthetic and close fascia/skin.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Manage potential for sudden hemorrhage (if ectopic)',
          'Muscle relaxation for visualization',
          'PONV prophylaxis'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Bowel/Vessel injury', 'Bleeding', 'Infection', 'Conversion to laparotomy'],
          anesthetic: ['PONV', 'Shoulder-tip pain', 'CO2 retention']
        },
        management: {
          preOp: ['Review HCG levels', 'Assess for hemodynamic stability'],
          intraOp: [
            'Be prepared for sudden, massive hemorrhage if the procedure is for a ruptured ectopic pregnancy; ensure large-bore IV access and blood products are available.',
            'Maintain adequate muscle relaxation to allow for thorough visualization of the pelvic structures and safe manipulation of instruments.',
            'Monitor for cardiovascular effects of pneumoperitoneum, especially in patients who may be hemodynamically unstable due to internal bleeding.',
            'Provide effective PONV prophylaxis and manage post-operative shoulder-tip pain by ensuring complete CO2 evacuation at the end of the procedure.'
          ],
          postOp: ['Monitor for vaginal bleeding', 'Analgesia']
        }
      },
      {
        id: 'radical-vulvectomy',
        name: 'Radical Vulvectomy and Bilateral Inguinal Lymphnode Dissection',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + Invasive A-line',
        recommendedBlocks: ['Epidural (L3-L4)', 'Pudendal Nerve Block', 'Quadratus Lumborum (QL) Block'],
        erasHighlights: ['Epidural analgesia for 48h', 'VTE thromboprophylaxis', 'Active normothermia management'],
        guide: [
          { title: 'Incision & Radical Vulvectomy', description: 'Perform a wide butterfly incision around the vulva down to the deep fascia of the urogenital diaphragm, incising to resect the primary vulvar neoplasm en-bloc.' },
          { title: 'Inguinal Node Access', description: 'Make separate bilateral groin incisions parallel to the inguinal ligament to access the superficial and deep inguinal lymph node basins.' },
          { title: 'Femoral & Inguinal Lymphadenectomy', description: 'Skeletonize the femoral sheath, remove the cloquet node, and dissect out the deep and superficial inguinal lymph node packets bilaterally.' },
          { title: 'Reconstruction & Flap Transposition', description: 'Reconstruct the perineal defect using V-Y advancement flaps or tensor fascia lata cutaneous transposition flaps to achieve tension-free closure.' },
          { title: 'Drainage & Layered Closure', description: 'Place closed-suction drains bilaterally in the groin and perineal pockets. Perform meticulous layered subcutaneous and skin closure over a Foley catheter.' }
        ],
        anestheticConsiderations: [
          'Major procedure with significant blood loss and fluid shifts.',
          'Positioning (lithotomy) with extended duration.',
          'Manage post-operative pain (Epidural or regional blocks).',
          'VTE prophylaxis is critical.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Wound dehiscence (high risk)', 'Lymphedema', 'Sepsis', 'Hemorrhage'],
          anesthetic: ['VTE', 'Nerve injury', 'PONV']
        },
        management: {
          preOp: ['Review staging', 'Check baseline hemoglobin', 'Plan for flaps'],
          intraOp: ['Maintain stable hemodynamics', 'Active warming', 'Manage fluid for flap survival'],
          postOp: ['VAC dressing often used', 'Strict VTE prophylaxis', 'Early mobilization']
        }
      },
      {
        id: 'ovarian-cystectomy',
        name: 'Laparoscopic Ovarian Cystectomy',
        estimatedBloodLoss: '< 100 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + Trendelenburg',
        recommendedBlocks: ['TAP Block', 'Port-site Local Infiltration'],
        erasHighlights: ['Low-pressure pneumoperitoneum', 'Anti-emetic multimodal bundle', 'Day-case discharge'],
        guide: [
          { title: 'Access', description: 'Establish pneumoperitoneum and insert a 10 mm umbilical port for the camera. Place 2-3 additional 5 mm accessory ports in the lower abdomen.' },
          { title: 'Cystotomy', description: 'Identify the affected ovary and make a small incision into the ovarian cortex using a needle electrode or scissors to expose the underlying cyst wall.' },
          { title: 'Dissection', description: 'Use a combination of blunt and sharp dissection to strip the cyst wall away from the surrounding normal ovarian tissue, aiming to keep the cyst intact.' },
          { title: 'Removal', description: 'Place the excised cyst into an endobag within the pelvic cavity. Remove the bag through one of the port sites (may require slight enlargement of the incision).' },
          { title: 'Hemostasis', description: 'Carefully inspect the ovarian bed for bleeding and achieve hemostasis using bipolar cautery or sutures. Irrigate the pelvis and close the port sites.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Muscle relaxation',
          'Trendelenburg position',
          'Manage PONV'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Ovarian injury', 'Cyst rupture/spillage', 'Bleeding', 'Infection'],
          anesthetic: ['PONV', 'Nerve injury', 'CO2 retention']
        },
        management: {
          preOp: ['Review tumor markers (CA-125)', 'Assess cyst size/nature'],
          intraOp: [
            'Meticulously avoid cyst rupture during dissection, especially if there is any suspicion of malignancy, to prevent peritoneal seeding of cells.',
            'Maintain stable hemodynamics and monitor for cardiovascular effects of pneumoperitoneum and Trendelenburg positioning throughout the procedure.',
            'Ensure adequate muscle relaxation to facilitate surgical visualization and safe manipulation of the ovaries and surrounding structures.',
            'Provide effective PONV prophylaxis and manage post-operative pain with a multimodal approach, including local anesthetic infiltration at port sites.'
          ],
          postOp: ['Monitor for pain', 'Early mobilization']
        }
      },
      {
        id: 'myomectomy',
        name: 'Myomectomy (Laparoscopic/Open)',
        estimatedBloodLoss: '200 - 800 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs + Cell Saver option',
        airwayStrategy: 'Oral ETT',
        recommendedBlocks: ['TAP Block', 'Quadratus Lumborum (QL) Block'],
        erasHighlights: ['Intramyometrial Vasopressin surveillance (watch for HTN/bradycardia)', 'Tranexamic Acid 1g IV', 'Multimodal analgesia'],
        guide: [
          { title: 'Access', description: 'For laparoscopic approach, use 4 ports; for open approach, perform a Pfannenstiel or midline laparotomy incision to expose the uterus.' },
          { title: 'Incision', description: 'Inject a dilute vasopressin solution into the myometrium to minimize bleeding. Make a linear incision over the most prominent part of the fibroid.' },
          { title: 'Enucleation', description: 'Use blunt and sharp dissection to enucleate the fibroid from its pseudocapsule. Multiple fibroids may be removed through the same or separate incisions.' },
          { title: 'Closure', description: 'Close the uterine defect in multiple layers using absorbable sutures to ensure a strong scar and meticulous hemostasis.' },
          { title: 'Removal', description: 'For laparoscopic myomectomy, use a morcellator to cut the fibroids into smaller pieces for removal through a port. For open surgery, remove fibroids directly.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Manage potential for significant blood loss',
          'Consider Vasopressin injection by surgeon (monitor for bradycardia/HTN)',
          'Muscle relaxation'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Hemorrhage', 'Uterine rupture (in future pregnancy)', 'Adhesions', 'Infection'],
          anesthetic: ['PONV', 'Blood loss-related hypotension', 'Vasopressin-related arrhythmias']
        },
        management: {
          preOp: ['Check hemoglobin', 'Review fibroid location/size'],
          intraOp: [
            'Closely monitor for significant blood loss, as myomectomy can be highly vascular; ensure adequate IV access and consider the use of cell salvage if appropriate.',
            'Monitor for cardiovascular effects of intramyometrial vasopressin injection, such as sudden bradycardia, hypertension, or pulmonary edema.',
            'Maintain deep muscle relaxation to facilitate surgical access and ensure a high-quality, multi-layer closure of the uterine defects.',
            'Provide effective analgesia (e.g., TAP block for open cases) and monitor for post-operative pain and signs of internal hemorrhage.'
          ],
          postOp: ['Monitor for pain', 'VTE prophylaxis']
        }
      },
      {
        id: 'hysterectomy-open',
        name: 'Total Abdominal Hysterectomy (Open)',
        estimatedBloodLoss: '200 - 500 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT',
        recommendedBlocks: ['TAP Block', 'Spinal Anesthesia / Thoracic Epidural (T10-L1)'],
        erasHighlights: ['Multimodal opioid-sparing analgesia', 'Early mobilization at 6 hours', 'Regular antiemetics'],
        guide: [
          { title: 'Incision', description: 'Perform a Pfannenstiel (transverse) or midline laparotomy incision to gain access to the pelvic cavity.' },
          { title: 'Mobilization', description: 'Systematically divide the round ligaments, the infundibulopelvic (or ovarian) ligaments, and the broad ligaments to mobilize the uterus.' },
          { title: 'Ligation', description: 'Identify and carefully ligate the uterine arteries and the cardinal ligaments at the level of the cervix.' },
          { title: 'Removal', description: 'Perform a circumferential incision at the cervicovaginal junction to remove the uterus (and cervix in a total hysterectomy).' },
          { title: 'Closure', description: 'Close the vaginal vault with absorbable sutures. Ensure meticulous hemostasis in the pelvis. Close the abdominal wall in layers (peritoneum, fascia, subcutaneous tissue, and skin).' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Consider TAP block or epidural for analgesia',
          'Manage potential for significant blood loss (if large fibroids)',
          'Muscle relaxation'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Ureteric injury', 'Hemorrhage', 'Infection', 'Vault hematoma'],
          anesthetic: ['PONV', 'VTE', 'Pain']
        },
        management: {
          preOp: ['Check hemoglobin', 'Review BMI'],
          intraOp: [
            'Monitor for significant blood loss, especially in cases with large fibroids or distorted anatomy; ensure adequate fluid resuscitation and consider blood transfusion if necessary.',
            'Maintain stable hemodynamics and optimize ventilation, as the open abdominal approach can impact respiratory mechanics and venous return.',
            'Provide effective analgesia using a multimodal approach, such as a thoracic epidural or TAP blocks, to facilitate early mobilization and recovery.',
            'Ensure adequate muscle relaxation throughout the procedure to provide optimal surgical exposure and facilitate safe dissection of pelvic structures.'
          ],
          postOp: ['VTE prophylaxis', 'Early mobilization']
        }
      },
      {
        id: 'ruptured-ectopic-laparotomy',
        name: 'Ruptured Ectopic Pregnancy (Laparotomy)',
        estimatedBloodLoss: '1000 - 2500 mL',
        bloodProductPrep: 'Massive Transfusion Protocol (MTP): 4-6 Units PRBCs + FFP',
        airwayStrategy: 'Rapid Sequence Induction (RSI) with Oral ETT',
        recommendedBlocks: ['TAP Block post-hemostasis'],
        erasHighlights: ['Emergency fluid resuscitation with warm fluids', 'Rapid surgical access & clamping', 'Correction of coagulopathy'],
        guide: [
          { title: 'Emergency Access & Evisceration', description: 'Perform rapid infraumbilical midline or Pfannenstiel laparotomy. Rapidly suction hemoperitoneum and eviscerate clot-filled pelvis to identify bleeding site.' },
          { title: 'Mesosalpinx Clamping & Hemostasis', description: 'Grasp the affected fallopian tube with Babcock forceps. Apply vascular clamps (Heaney or Mayo) across the mesosalpinx and cornual vascular supply for immediate hemostasis.' },
          { title: 'Salpingectomy / Resection', description: 'Excise the ruptured fallopian tube and ectopic pregnancy mass, ligating the mesosalpinx with continuous 2-0 absorbable suture.' },
          { title: 'Peritoneal Lavage & Contralateral Inspection', description: 'Perform copious warm saline irrigation to clear pelvic blood clots. Inspect the contralateral tube, ovary, and upper abdominal quadrants.' },
          { title: 'Hemostasis Verification & Layered Closure', description: 'Verify absolute dry hemostasis at the cornual stump and broad ligament. Perform rapid layered closure of the abdominal wall.' }
        ],
        anestheticConsiderations: [
          'LIFE-THREATENING emergency: assumption of hypovolemic shock.',
          'RSI is mandatory: full stomach and rapidly deteriorating clinical state.',
          'Large-bore IV access (x2 14/16G) and immediate availability of blood.',
          'Maintain MAP until surgical control is achieved.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'Rapidly at induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Hemorrhagic shock', 'Bowel/Bladder injury', 'Re-operation for bleeding'],
          anesthetic: ['Cardiac arrest at induction', 'DIC', 'Aspiration']
        },
        management: {
          preOp: ['Activate Major Hemorrhage Protocol', 'Type & Crossmatch 4-6 units', 'Large bore access'],
          intraOp: ['Ketamine-based induction (if shocked)', 'Rapid fluid resuscitation (Level 1)', 'Monitor for coagulopathy'],
          postOp: ['ICU/HDU for stabilization', 'Monitor Hb levels', 'Early ambulation once stable']
        }
      }    ]
  },
  {
    id: 'ophthalmic',
    name: 'Ophthalmic Surgery',
    generalConsiderations: {
      preOp: [
        'Assess for ability to lie flat and remain still',
        'Review for anticoagulation (often continued for cataract)',
        'Check for claustrophobia',
        'Confirm eye to be operated on'
      ],
      intraOp: [
        'Maintain a quiet and calm environment to ensure patient cooperation, especially if the procedure is performed under topical or local anesthesia.',
        'Monitor for the oculocardiac reflex (bradycardia) during any manipulation of the extraocular muscles or pressure on the globe.',
        'Ensure the patient remains perfectly still throughout the procedure to prevent sight-threatening complications like posterior capsule rupture.',
        'Manage intraocular pressure (IOP) by optimizing fluidics and ensuring the eye remains formed during the various stages of the surgery.',
        'Avoid the use of nitrous oxide if a gas tamponade is planned, as it can rapidly diffuse into the gas bubble and cause a dangerous increase in IOP.'
      ],
      postOp: [
        'Monitor for pain (may indicate high IOP)',
        'Manage nausea (avoid vomiting)',
        'Protect eye with shield',
        'Review discharge instructions'
      ]
    },
    procedures: [
      {
        id: 'cataract',
        name: 'Phacoemulsification (Cataract Surgery)',
        estimatedBloodLoss: '< 5 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'Topical / Local Anesthesia without intubation',
        recommendedBlocks: ['Sub-Tenon Block', 'Peribulbar Block', 'Topical Tetracaine/Lidocaine Gel'],
        erasHighlights: ['Zero systemic opioids', 'Day-case 30-minute discharge', 'Avoid coughing/straining'],
        guide: [
          { title: 'Incision', description: 'Create a small (2.2-2.75 mm) clear corneal or limbal incision using a diamond or steel blade.' },
          { title: 'Capsulorhexis', description: 'Perform a continuous curvilinear capsulorhexis (CCC) to create a circular opening in the anterior lens capsule.' },
          { title: 'Phaco', description: 'Use an ultrasonic probe to fragment (phacoemulsify) the cloudy lens and aspirate the pieces from the eye.' },
          { title: 'IOL Insertion', description: 'Inject a foldable intraocular lens (IOL) into the remaining lens capsule (the "bag") and ensure it is centered.' },
          { title: 'Hydration', description: 'Hydrate the corneal stroma at the incision edges with balanced salt solution (BSS) to ensure the wound is self-sealing.' }
        ],
        anestheticConsiderations: [
          'Topical or Sub-Tenon block is standard',
          'Minimal sedation to ensure patient cooperation',
          'Monitor for Oculocardiac reflex',
          'Ensure patient comfort and stillness'
        ],
        antibioticProphylaxis: {
          drug: 'Intracameral Cefuroxime',
          dosage: '1mg in 0.1mL',
          timing: 'End of procedure',
          alternatives: 'Moxifloxacin'
        },
        complications: {
          surgical: ['Posterior capsule rupture', 'Vitreous loss', 'Endophthalmitis', 'Suprachoroidal hemorrhage'],
          anesthetic: ['Retrobulbar hemorrhage (if block used)', 'Globe penetration', 'Oculocardiac reflex']
        },
        management: {
          preOp: ['Dilating drops', 'Confirm consent'],
          intraOp: [
            'Maintain a quiet and calm environment to ensure patient cooperation, especially if the procedure is performed under topical or local anesthesia.',
            'Monitor for the oculocardiac reflex (bradycardia) during any manipulation of the extraocular muscles or pressure on the globe.',
            'Ensure the patient remains perfectly still throughout the procedure to prevent sight-threatening complications like posterior capsule rupture.',
            'Manage intraocular pressure (IOP) by optimizing fluidics and ensuring the eye remains formed during the various stages of the surgery.'
          ],
          postOp: ['Topical antibiotics/steroids', 'Avoid heavy lifting']
        }
      },
      {
        id: 'vitrectomy',
        name: 'Pars Plana Vitrectomy',
        estimatedBloodLoss: '< 10 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'LMA or Oral ETT / Sub-Tenon Block with Sedation',
        recommendedBlocks: ['Sub-Tenon Block', 'Retrobulbar Block'],
        erasHighlights: ['Discontinue Nitrous Oxide if intraocular gas (SF6/C3F8) used', 'Strict post-operative positioning', 'IOP spike monitoring'],
        guide: [
          { title: 'Access', description: 'Create three small (23, 25, or 27 gauge) sclerotomies in the pars plana for the infusion line, light pipe, and vitrector.' },
          { title: 'Vitrectomy', description: 'Use a high-speed vitreous cutter to remove the vitreous gel, replacing it with balanced salt solution (BSS) to maintain eye pressure.' },
          { title: 'Intervention', description: 'Perform necessary maneuvers such as membrane peeling, endolaser photocoagulation, or repair of retinal detachments.' },
          { title: 'Tamponade', description: 'If required, exchange the fluid for a tamponade agent like air, long-acting gas (SF6 or C3F8), or silicone oil to support the retina.' },
          { title: 'Closure', description: 'Remove the instruments and close the sclerotomies. Modern small-gauge vitrectomy often uses sutureless, self-sealing incisions.' }
        ],
        anestheticConsiderations: [
          'Local (Sub-Tenon) or General anesthesia',
          'Avoid Nitrous Oxide if gas tamponade is used (can cause rapid increase in IOP)',
          'Maintain stable IOP and BP',
          'Ensure patient stillness'
        ],
        antibioticProphylaxis: {
          drug: 'Intravitreal antibiotics (e.g., Vancomycin/Ceftazidime)',
          dosage: 'Standard doses',
          timing: 'End of procedure',
          alternatives: '-'
        },
        complications: {
          surgical: ['Retinal tear/detachment', 'Cataract progression', 'Endophthalmitis', 'IOP spike'],
          anesthetic: ['Oculocardiac reflex', 'Nitrous-related IOP spike']
        },
        management: {
          preOp: ['Review for previous eye surgeries', 'Confirm gas type if planned'],
          intraOp: [
            'Avoid the use of nitrous oxide if a gas tamponade is planned, as it can rapidly diffuse into the gas bubble and cause a dangerous increase in intraocular pressure (IOP).',
            'Maintain stable intraocular pressure and blood pressure throughout the procedure to ensure adequate ocular perfusion and prevent choroidal hemorrhage.',
            'Monitor for the oculocardiac reflex, especially during instrument insertion or manipulation of the vitreous base.',
            'Ensure deep and stable anesthesia (if GA) or effective local block to prevent any patient movement, which could lead to catastrophic intraocular injury.'
          ],
          postOp: ['Posturing (if gas used)', 'Avoid air travel (if gas used)']
        }
      },
      {
        id: 'scleral-buckle',
        name: 'Scleral Buckle for Retinal Detachment',
        estimatedBloodLoss: '< 20 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'Oral ETT or LMA / Deep Anesthesia',
        recommendedBlocks: ['Peribulbar Block', 'Retrobulbar Block', 'Sub-Tenon Block'],
        erasHighlights: ['Oculocardiac reflex monitoring (bradycardia on rectus traction)', 'Aggressive PONV prevention', 'Postoperative pain multimodal bundle'],
        guide: [
          { title: 'Exposure', description: 'Perform a 360-degree conjunctival peritomy and isolate the four rectus muscles with silk sutures to expose the sclera.' },
          { title: 'Localization', description: 'Use an indirect ophthalmoscope to identify the retinal breaks and mark their location on the external surface of the sclera.' },
          { title: 'Cryotherapy', description: 'Apply cryoprobe to the marked sites to create a localized chorioretinal adhesion around the retinal breaks.' },
          { title: 'Buckling', description: 'Suture a silicone band or sponge (the buckle) onto the sclera, creating an inward indentation (buckle) to support the retinal breaks.' },
          { title: 'Drainage', description: 'If necessary, perform a controlled drainage of subretinal fluid through a small sclerotomy to allow the retina to settle against the buckle.' }
        ],
        anestheticConsiderations: [
          'General anesthesia or Local (Peribulbar)',
          'Monitor for Oculocardiac reflex (high risk during muscle manipulation)',
          'Maintain stable IOP',
          'Smooth emergence'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '1g IV',
          timing: 'At induction',
          alternatives: 'Gentamicin'
        },
        complications: {
          surgical: ['Scleral perforation', 'Infection', 'Double vision (diplopia)', 'Buckle extrusion'],
          anesthetic: ['Oculocardiac reflex', 'PONV']
        },
        management: {
          preOp: ['Confirm NPO', 'Review for cardiac disease'],
          intraOp: [
            'Monitor the heart rate very closely for the oculocardiac reflex, which is highly likely during the isolation and manipulation of the rectus muscles.',
            'Maintain stable intraocular pressure (IOP) and be prepared to manage sudden increases in pressure during buckle tightening or cryotherapy.',
            'Ensure a smooth emergence from general anesthesia to prevent coughing or straining, which could lead to intraocular hemorrhage or buckle displacement.',
            'Provide effective post-operative analgesia, as scleral buckling is generally more painful than other types of ophthalmic surgery.'
          ],
          postOp: ['Monitor for pain', 'Review activity restrictions']
        }
      },
      {
        id: 'corneal-transplant',
        name: 'Corneal Transplant (Keratoplasty)',
        estimatedBloodLoss: '< 10 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'Oral ETT with Smooth Emergence Protocol',
        recommendedBlocks: ['Sub-Tenon Block', 'Peribulbar Block'],
        erasHighlights: ['Smooth non-coughing extubation', 'Strict intraocular pressure (IOP) control', 'Day-case discharge'],
        guide: [
          { title: 'Trephination of Host Cornea', description: 'Center suction trephine on host cornea. Perform full-thickness or lamellar trephination to excise diseased host corneal button (open-sky phase).' },
          { title: 'Donor Graft Preparation', description: 'Punch matching donor corneal graft button from donor scleral rim using precision punch trephine of identical or 0.25 mm larger diameter.' },
          { title: 'Donor Graft Positioning & Anchoring', description: 'Transfer donor graft onto host corneal bed. Place 4 cardinal cardinal interrupted 10-0 Nylon sutures at 12, 6, 3, and 9 o\'clock positions.' },
          { title: 'Circumferential Suture Fixation', description: 'Complete 16-step interrupted or continuous running 10-0 Nylon suture fixation, burying knot knots into donor stroma to prevent irritation.' },
          { title: 'Anterior Chamber Reformation & IOP Verification', description: 'Reform anterior chamber with Balanced Salt Solution (BSS) and viscoelastic. Check water-tight seam integrity and verify normotensive IOP before applying eye shield.' }
        ],
        anestheticConsiderations: [
          'General anesthesia or Local (Peribulbar/Sub-Tenon)',
          'Avoid coughing/straining on emergence (can cause graft dehiscence)',
          'Maintain stable IOP',
          'Ensure patient stillness'
        ],
        antibioticProphylaxis: {
          drug: 'Topical and Subconjunctival antibiotics',
          dosage: 'Standard doses',
          timing: 'End of procedure',
          alternatives: '-'
        },
        complications: {
          surgical: ['Graft rejection', 'Astigmatism', 'Endophthalmitis', 'Glaucoma'],
          anesthetic: ['Oculocardiac reflex', 'Coughing on emergence']
        },
        management: {
          preOp: ['Confirm donor tissue availability', 'Dilating drops'],
          intraOp: [
            'Maintain stable intraocular pressure (IOP) throughout the procedure to prevent complications like suprachoroidal hemorrhage during the "open sky" phase.',
            'Ensure the patient remains perfectly still, as any movement during the trephination or suturing could lead to irreversible ocular damage.',
            'Monitor for the oculocardiac reflex, especially during any manipulation of the globe or extraocular muscles.',
            'Ensure a smooth emergence from general anesthesia to prevent coughing or straining, which could cause graft dehiscence or intraocular hemorrhage.'
          ],
          postOp: ['Topical steroids/antibiotics', 'Protect eye with shield']
        }
      },
      {
        id: 'strabismus-surgery',
        name: 'Strabismus Surgery (Squint Repair)',
        estimatedBloodLoss: '< 10 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'LMA or Oral ETT',
        recommendedBlocks: ['Sub-Tenon Block', 'Topical Tetracaine Drops'],
        erasHighlights: ['Atropine / Glycopyrrolate pre-treatment for OCR', 'Prophylactic Ondansetron + Dexamethasone bundle'],
        guide: [
          { title: 'Exposure', description: 'Perform a conjunctival incision and use muscle hooks to isolate the target extraocular muscle(s).' },
          { title: 'Recession', description: 'Weakening procedure: Detach the muscle from its original insertion and reattach it further back on the sclera using absorbable sutures.' },
          { title: 'Resection', description: 'Strengthening procedure: Remove a segment of the muscle and reattach the shortened muscle to its original insertion site.' },
          { title: 'Adjustment', description: 'If using adjustable sutures, leave the sutures long to allow for fine-tuning of the muscle position in the immediate post-operative period.' },
          { title: 'Closure', description: 'Close the conjunctiva with fine absorbable sutures. Apply antibiotic ointment and a patch if necessary.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with LMA or ETT',
          'High risk of Oculocardiac reflex (bradycardia)',
          'High risk of PONV (pediatric population)',
          'Avoid muscle relaxants if adjustable sutures are planned'
        ],
        antibioticProphylaxis: {
          drug: 'Topical antibiotics',
          dosage: 'Standard',
          timing: 'End of procedure',
          alternatives: '-'
        },
        complications: {
          surgical: ['Overcorrection/Undercorrection', 'Infection', 'Double vision', 'Scleral perforation'],
          anesthetic: ['Oculocardiac reflex', 'Severe PONV']
        },
        management: {
          preOp: ['Review for previous squint surgeries', 'Assess pediatric anxiety'],
          intraOp: [
            'Monitor the heart rate very closely for the oculocardiac reflex, which is extremely common during the isolation and manipulation of the extraocular muscles.',
            'Provide aggressive PONV prophylaxis, as strabismus surgery is associated with a very high incidence of post-operative nausea and vomiting, especially in children.',
            'Avoid the use of long-acting muscle relaxants if adjustable sutures are planned, as the patient needs to be able to move their eyes for the adjustment phase.',
            'Maintain stable anesthesia and ensure a smooth emergence to prevent any sudden increases in intraocular pressure or patient agitation.'
          ],
          postOp: ['Monitor for pain', 'Review eye drop instructions']
        }
      },
      {
        id: 'glaucoma-surgery',
        name: 'Trabeculectomy (Glaucoma Surgery)',
        estimatedBloodLoss: '< 10 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'LMA or Sub-Tenon Block with Sedation',
        recommendedBlocks: ['Sub-Tenon Block', 'Peribulbar Block'],
        erasHighlights: ['Avoid cough/straining on emergence', 'Maintain baseline normotension', 'Day-case discharge'],
        guide: [
          { title: 'Flap Creation', description: 'Create a partial-thickness scleral flap and apply an antimetabolite (e.g., Mitomycin-C) to the site to prevent scarring.' },
          { title: 'Sclerostomy', description: 'Remove a small piece of the underlying sclera and trabecular meshwork to create a new drainage pathway for aqueous humor.' },
          { title: 'Iridectomy', description: 'Perform a peripheral iridectomy to prevent the iris from blocking the new sclerostomy site.' },
          { title: 'Closure', description: 'Suture the scleral flap loosely to allow for controlled drainage of aqueous humor into the subconjunctival space.' },
          { title: 'Bleb Formation', description: 'Close the conjunctiva meticulously to ensure the formation of a "bleb" (a small reservoir of fluid) under the conjunctiva.' }
        ],
        anestheticConsiderations: [
          'Local anesthesia (Sub-Tenon) or General anesthesia',
          'Avoid factors that increase IOP (coughing, straining)',
          'Ensure patient stillness',
          'Maintain stable hemodynamics'
        ],
        antibioticProphylaxis: {
          drug: 'Topical antibiotics',
          dosage: 'Standard',
          timing: 'End of procedure',
          alternatives: '-'
        },
        complications: {
          surgical: ['Hypotony (low IOP)', 'Bleb leak', 'Infection (blebitis)', 'Cataract formation'],
          anesthetic: ['Oculocardiac reflex', 'PONV']
        },
        management: {
          preOp: ['Review current glaucoma medications', 'Check baseline IOP'],
          intraOp: [
            'Maintain stable intraocular pressure (IOP) and avoid any factors that could cause a sudden spike in pressure, such as coughing, straining, or bucking on the ETT.',
            'Ensure the patient remains perfectly still throughout the procedure to facilitate the precise microsurgical maneuvers required for flap creation and sclerostomy.',
            'Monitor for the oculocardiac reflex during any manipulation of the globe or iris.',
            'Provide effective post-operative analgesia and manage intraocular pressure closely in the immediate post-operative period.'
          ],
          postOp: ['Topical steroids/antibiotics', 'Monitor IOP closely']
        }
      },
    ]
  },
  {
    id: 'plastics',
    name: 'Plastics & Reconstructive Surgery',
    generalConsiderations: {
      preOp: [
        'Assess nutritional status',
        'Review smoking history (critical for flap survival)',
        'Check for peripheral vascular disease',
        'Confirm donor and recipient sites'
      ],
      intraOp: [
        'Maintain a high-normal mean arterial pressure (MAP) to ensure adequate perfusion pressure across microvascular anastomoses.',
        'Avoid the use of systemic vasoconstrictors (e.g., phenylephrine, norepinephrine) if possible, as they can cause vasospasm and flap failure.',
        'Implement active warming measures (e.g., forced-air warming, warmed fluids) to maintain core temperature > 36.5°C, which is essential for microvascular flow.',
        'Utilize goal-directed fluid therapy to maintain normovolemia and optimize blood rheology (aim for hematocrit 30-35%) to facilitate flap perfusion.',
        'Monitor for potential respiratory compromise after abdominal plication or tight closures, as increased intra-abdominal pressure can impact ventilation.'
      ],
      postOp: [
        'Frequent flap observations (color, temperature, capillary refill)',
        'Avoid pressure on the flap',
        'Maintain adequate hydration and BP',
        'Manage pain and anxiety'
      ]
    },
    procedures: [
      {
        id: 'free-flap',
        name: 'Free Flap Reconstruction',
        estimatedBloodLoss: '200 - 600 mL',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs',
        airwayStrategy: 'Oral ETT + Invasive A-line + CVC',
        recommendedBlocks: ['Regional Block based on donor site (e.g., Femoral/Sciatic for ALT, TAP for DIEP)'],
        erasHighlights: ['Strict active normothermia (> 36.5°C)', 'Maintain high-normal MAP (avoid vasopressors)', 'Goal-directed fluid resuscitation'],
        guide: [
          { title: 'Harvesting', description: 'Meticulously dissect the donor flap (e.g., radial forearm, anterolateral thigh, or fibula) along with its supplying artery and draining vein(s).' },
          { title: 'Preparation', description: 'Prepare the recipient site by debriding non-viable tissue and identifying suitable recipient vessels (artery and vein) for anastomosis.' },
          { title: 'Transfer', description: 'Isolate the flap pedicle, divide the vessels, and transfer the flap to the recipient site. Minimize ischemia time during this phase.' },
          { title: 'Anastomosis', description: 'Perform microvascular anastomosis of the flap artery and vein(s) to the recipient vessels using fine sutures (e.g., 8-0 to 10-0 Nylon) under a microscope.' },
          { title: 'Insetting', description: 'Once perfusion is confirmed (good color, capillary refill, and bleeding), suture the flap into its final position and close the donor site (may require a skin graft).' }
        ],
        anestheticConsiderations: [
          'Maintain high-normal MAP for flap perfusion',
          'Avoid vasoconstrictors (e.g., Phenylephrine) if possible',
          'Active warming to maintain core temp > 36.5°C',
          'Goal-directed fluid therapy'
        ],
        antibioticProphylaxis: {
          drug: 'Co-amoxiclav',
          dosage: '1.2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Venous congestion', 'Arterial insufficiency', 'Hematoma', 'Partial flap loss'],
          anesthetic: ['Hypothermia', 'Pressure sores', 'Fluid overload', 'VTE']
        },
        management: {
          preOp: ['Smoking cessation for 4-6 weeks', 'Optimize hemoglobin'],
          intraOp: [
            'Maintain a high-normal mean arterial pressure (MAP) to ensure adequate perfusion pressure across the microvascular anastomosis.',
            'Avoid the use of systemic vasoconstrictors (e.g., phenylephrine, norepinephrine) if possible, as they can cause vasospasm and flap failure.',
            'Implement active warming measures (e.g., forced-air warming, warmed fluids) to maintain core temperature > 36.5°C, which is essential for microvascular flow.',
            'Utilize goal-directed fluid therapy to maintain normovolemia and optimize blood rheology (aim for hematocrit 30-35%) to facilitate flap perfusion.'
          ],
          postOp: ['Hourly flap checks', 'Keep room warm']
        }
      },
      {
        id: 'abdominoplasty',
        name: 'Abdominoplasty (Tummy Tuck)',
        estimatedBloodLoss: '100 - 300 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT',
        recommendedBlocks: ['TAP Block', 'Quadratus Lumborum (QL) Block', 'Rectus Sheath Block'],
        erasHighlights: ['Flexed position (beach chair) post-op to reduce tension', 'Aggressive VTE thromboprophylaxis', 'Multimodal analgesia'],
        guide: [
          { title: 'Incision', description: 'Make a long, low transverse incision just above the pubic hairline, extending toward the iliac crests.' },
          { title: 'Dissection', description: 'Elevate the skin and subcutaneous fat flap off the abdominal wall fascia up to the level of the xiphoid process and costal margins.' },
          { title: 'Plication', description: 'Tightening of the rectus abdominis muscles by suturing the medial borders of the rectus sheaths together (plication) to treat diastasis recti.' },
          { title: 'Resection', description: 'Pull the abdominal flap downward, determine the amount of excess skin and fat, and resect it.' },
          { title: 'Closure', description: 'Create a new opening for the umbilicus (umbilicoplasty). Close the long abdominal incision in multiple layers to minimize tension and ensure a fine scar.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Consider TAP block or rectus sheath block for analgesia',
          'Maintain flexed position (beach chair) after closure to reduce tension',
          'Aggressive VTE prophylaxis'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Seroma', 'Hematoma', 'Skin necrosis', 'Wound dehiscence'],
          anesthetic: ['VTE (high risk)', 'PONV', 'Respiratory compromise (from plication)']
        },
        management: {
          preOp: ['Review BMI', 'Smoking cessation'],
          intraOp: [
            'Maintain the patient in a slightly flexed position (beach chair) after the plication and during closure to reduce tension on the abdominal wall and the incision.',
            'Monitor for potential respiratory compromise after rectus plication, as the increased intra-abdominal pressure can reduce functional residual capacity and compliance.',
            'Implement aggressive VTE prophylaxis (e.g., sequential compression devices, pharmacological prophylaxis), as abdominoplasty is a high-risk procedure for thromboembolism.',
            'Provide effective analgesia using a multimodal approach, such as TAP blocks or a rectus sheath block, to facilitate early mobilization and recovery.'
          ],
          postOp: ['Maintain flexed position', 'Early mobilization']
        }
      },
      {
        id: 'breast-reduction',
        name: 'Breast Reduction (Reduction Mammoplasty)',
        estimatedBloodLoss: '100 - 250 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT or LMA',
        recommendedBlocks: ['Pectoral Nerve (PECS I & II) Blocks', 'Serratus Anterior Plane (SAP) Block'],
        erasHighlights: ['Maintain strict normotension to prevent hematoma', 'PONV dual prophylaxis bundle', 'Day-case / 24h discharge'],
        guide: [
          { title: 'Marking', description: 'Use precise pre-operative markings to determine the new position of the nipple-areola complex (NAC) and the extent of skin resection.' },
          { title: 'Incision', description: 'Perform a Wise-pattern (anchor) or vertical incision around the areola, down to the inframammary fold, and along the fold.' },
          { title: 'Resection', description: 'Remove a predetermined amount of excess breast tissue and skin from the lower and lateral quadrants of the breast.' },
          { title: 'Transposition', description: 'Elevate the NAC on a superior, inferior, or medial pedicle of breast tissue to its new, higher position.' },
          { title: 'Closure', description: 'Reshape the remaining breast tissue and close the skin incisions in layers. Apply supportive dressings and ensure no tension on the NAC pedicle.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with LMA or ETT',
          'Maintain stable BP',
          'Consider intercostal nerve blocks or local infiltration',
          'PONV prophylaxis'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Nipple necrosis', 'Hematoma', 'Infection', 'Asymmetry'],
          anesthetic: ['PONV', 'Chronic pain']
        },
        management: {
          preOp: ['Review BMI', 'Smoking cessation'],
          intraOp: [
            'Maintain stable blood pressure and avoid hypertension to minimize the risk of post-operative hematoma formation, which can compromise NAC perfusion.',
            'Provide effective analgesia using a multimodal approach, including intercostal nerve blocks or local anesthetic infiltration by the surgeon.',
            'Monitor for signs of NAC ischemia (e.g., poor color, slow capillary refill) during and after transposition; communicate any concerns to the surgical team.',
            'Implement aggressive PONV prophylaxis, as breast surgery is associated with a high incidence of post-operative nausea and vomiting.'
          ],
          postOp: ['Supportive bra', 'Monitor for nipple perfusion']
        }
      },
      {
        id: 'rhinoplasty',
        name: 'Rhinoplasty',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + Throat Pack',
        recommendedBlocks: ['Infraorbital Nerve Block', 'External Nasal Block', 'Topical Cocaine / Epinephrine'],
        erasHighlights: ['Documented throat pack removal', 'Controlled mild normotension', 'Emergence smooth non-coughing protocol'],
        guide: [
          { title: 'Local Infiltration & Airway Protection', description: 'Place radiopaque throat pack. Infiltrate nasal septum, columella, and lateral nasal walls with 1% Lidocaine + 1:100,000 Epinephrine for hemostasis.' },
          { title: 'Incision & Soft Tissue Elevation', description: 'Perform inverted-V trans-columellar incision connected to bilateral marginal rim incisions. Elevate soft tissue envelope off nasal framework.' },
          { title: 'Septal Work & Cartilage Harvesting', description: 'Perform septoplasty to correct deviation and harvest quadrangular septal cartilage graft material while preserving a 1 cm L-strut.' },
          { title: 'Osseocartilaginous Reshaping & Osteotomies', description: 'Hump reduction of dorsal bony cap. Perform bilateral lateral percutaneous osteotomies to narrow nasal vault, placing spreader and rim grafts.' },
          { title: 'Splinting, Packing Removal & Emergence', description: 'Close columella with 6-0 Fast Absorbing gut. Suction hypopharynx and remove throat pack. Apply external thermoplastic dorsal splint and internal Doyle splints.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT (throat pack essential)',
          'Maintain stable BP (mild hypotension can reduce bleeding)',
          'Local infiltration with Adrenaline for hemostasis',
          'Smooth emergence to prevent epistaxis'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '1g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Epistaxis', 'Septal perforation', 'Asymmetry', 'Nasal obstruction'],
          anesthetic: ['Aspiration (if throat pack forgotten)', 'PONV', 'Laryngospasm']
        },
        management: {
          preOp: ['Review expectations', 'Smoking cessation'],
          intraOp: [
            'Ensure a throat pack is meticulously placed and its presence is clearly documented to prevent aspiration of blood or surgical debris during the procedure.',
            'Maintain stable blood pressure and consider mild controlled hypotension to reduce surgical field bleeding and improve visualization for the surgeon.',
            'Monitor for potential cardiovascular effects of local anesthetic infiltration containing adrenaline, such as tachycardia or hypertension.',
            'Ensure a smooth emergence from general anesthesia to prevent coughing, straining, or bucking, which could lead to post-operative epistaxis or hematoma.'
          ],
          postOp: ['Keep head elevated', 'Avoid nose blowing']
        }
      }
    ]
  },
  {
    id: 'endocrine',
    name: 'Endocrine Surgery',
    generalConsiderations: {
      preOp: [
        'Review thyroid/parathyroid function tests',
        'Assess for airway compression (Goitre)',
        'Check vocal cord function (Laryngoscopy)',
        'Optimize calcium levels'
      ],
      intraOp: [
        'Utilize a Nerve Integrity Monitor (NIM) endotracheal tube for recurrent laryngeal nerve monitoring; ensure correct placement and avoid long-acting muscle relaxants.',
        'Maintain the patient in a reverse Trendelenburg position with neck extension (using a shoulder roll) to improve surgical exposure and reduce venous congestion.',
        'Monitor for potential cardiovascular instability, especially in patients with hyperthyroidism (risk of thyroid storm) or pheochromocytoma (if applicable).',
        'Ensure a smooth emergence from general anesthesia to prevent coughing or straining, which could lead to a post-operative hematoma and acute airway obstruction.',
        'Administer dexamethasone intra-operatively to reduce laryngeal edema and minimize the risk of post-operative respiratory distress.'
      ],
      postOp: [
        'Monitor for airway obstruction (Hematoma)',
        'Check for hypocalcemia (Chvostek/Trousseau signs)',
        'Assess vocal cord function (Voice check)',
        'Manage pain'
      ]
    },
    procedures: [
      {
        id: 'thyroidectomy',
        name: 'Total Thyroidectomy',
        estimatedBloodLoss: '50 - 150 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral NIM ETT (Nerve Integrity Monitor for Recurrent Laryngeal Nerve)',
        recommendedBlocks: ['Superficial Cervical Plexus Block (Bilateral)', 'Local Infiltration'],
        erasHighlights: ['Avoid long-acting neuromuscular blockers (NIM monitoring)', 'Stitch-cutter at bedside for hematoma emergency', 'Dexamethasone 8mg IV for airway edema'],
        guide: [
          { title: 'Incision', description: 'Make a transverse "collar" incision in a natural skin crease approximately 2 cm above the sternal notch.' },
          { title: 'Exposure', description: 'Divide the platysma muscle and separate the strap muscles (sternohyoid and sternothyroid) in the midline to expose the thyroid gland.' },
          { title: 'Identification', description: 'Carefully identify and preserve the recurrent laryngeal nerves (RLN) and the superior and inferior parathyroid glands. Use nerve monitoring if available.' },
          { title: 'Resection', description: 'Ligate the superior and inferior thyroid vessels. Dissect the thyroid gland off the trachea and remove it (total or subtotal).' },
          { title: 'Closure', description: 'Ensure meticulous hemostasis. Reapproximate the strap muscles and platysma. Close the skin with fine sutures or clips. A small drain may be placed.' }
        ],
        anestheticConsiderations: [
          'Use NIM (Nerve Integrity Monitor) tube for RLN monitoring',
          'Avoid long-acting muscle relaxants',
          'Smooth emergence to prevent hematoma',
          'Dexamethasone for edema'
        ],
        antibioticProphylaxis: {
          drug: 'None routinely',
          dosage: '-',
          timing: '-',
          alternatives: 'Consider if high risk'
        },
        complications: {
          surgical: ['Recurrent Laryngeal Nerve injury', 'Hypoparathyroidism', 'Hematoma/Airway obstruction', 'Thyroid storm'],
          anesthetic: ['Laryngospasm', 'Tracheomalacia (rare)', 'Pneumothorax']
        },
        management: {
          preOp: ['Ensure euthyroid state', 'Review vocal cord mobility'],
          intraOp: [
            'Utilize a Nerve Integrity Monitor (NIM) endotracheal tube if recurrent laryngeal nerve monitoring is planned; avoid the use of long-acting muscle relaxants.',
            'Monitor for potential cardiovascular instability, especially in patients with hyperthyroidism (risk of thyroid storm), and be prepared to manage sudden tachycardia or hypertension.',
            'Ensure a smooth emergence from general anesthesia to prevent coughing or straining, which could lead to a post-operative hematoma and acute airway obstruction.',
            'Administer dexamethasone intra-operatively to reduce laryngeal edema and minimize the risk of post-operative respiratory distress.'
          ],
          postOp: ['Keep stitch cutter at bedside', 'Monitor Calcium levels']
        }
      },
      {
        id: 'parathyroidectomy',
        name: 'Parathyroidectomy',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT or NIM ETT',
        recommendedBlocks: ['Bilateral Superficial Cervical Plexus Block'],
        erasHighlights: ['Intraoperative PTH 10-minute drop protocol', 'Smooth non-coughing emergence', 'Serum calcium monitoring'],
        guide: [
          { title: 'Incision', description: 'Perform a small transverse collar incision, similar to a thyroidectomy but often smaller if the adenoma has been localized pre-operatively.' },
          { title: 'Exploration', description: 'Systematically explore the neck to identify all four parathyroid glands. Use pre-operative imaging (e.g., Sestamibi scan, ultrasound) for guidance.' },
          { title: 'Resection', description: 'Remove the enlarged parathyroid gland (adenoma). In cases of four-gland hyperplasia, remove 3.5 glands or all four with auto-transplantation.' },
          { title: 'Testing', description: 'Perform intra-operative parathyroid hormone (PTH) monitoring; a >50% drop in PTH from baseline 10 minutes after resection confirms success.' },
          { title: 'Closure', description: 'Ensure meticulous hemostasis in the thyroid bed. Close the incision in layers. Monitor for signs of recurrent laryngeal nerve injury or hematoma.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT or LMA',
          'Avoid muscle relaxants if nerve monitoring is used',
          'Maintain stable BP',
          'Smooth emergence'
        ],
        antibioticProphylaxis: {
          drug: 'None routinely',
          dosage: '-',
          timing: '-',
          alternatives: '-'
        },
        complications: {
          surgical: ['Hypocalcemia', 'Recurrent laryngeal nerve injury', 'Hematoma', 'Persistent hyperparathyroidism'],
          anesthetic: ['Laryngospasm', 'Airway obstruction']
        },
        management: {
          preOp: ['Review Calcium and PTH levels', 'Localizing scans (Sestamibi/US)'],
          intraOp: [
            'Maintain stable anesthesia and hemodynamics throughout the procedure, as precise dissection is required to identify the small parathyroid glands and avoid nerve injury.',
            'Avoid the use of muscle relaxants if recurrent laryngeal nerve monitoring is being utilized during the neck exploration.',
            'Monitor for a sudden drop in intra-operative PTH levels after resection, which indicates successful removal of the hyperfunctioning tissue.',
            'Ensure a smooth emergence from general anesthesia to minimize the risk of post-operative hematoma formation and potential airway compromise.'
          ],
          postOp: ['Monitor Calcium levels', 'Check for voice changes']
        }
      },
      {
        id: 'adrenalectomy',
        name: 'Adrenalectomy (Laparoscopic/Open)',
        estimatedBloodLoss: '100 - 400 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT + Invasive A-line (Pheochromocytoma protocol)',
        recommendedBlocks: ['TAP Block', 'Quadratus Lumborum (QL) Block', 'Thoracic Epidural (if open)'],
        erasHighlights: ['Alpha-blockade pre-treatment (Phentolamine/Phenoxybenzamine ready)', 'Post-ligation hypotension management (Norepinephrine ready)', 'Steroid stress coverage'],
        guide: [
          { title: 'Positioning & Port Access', description: 'Place patient in lateral decubitus (or prone retroperitoneal). Establish pneumoperitoneum and place 3-4 subcostal laparoscopic ports.' },
          { title: 'Visceral Mobilization & Exposure', description: 'Mobilize liver and hepatic flexure (right side) or spleen and pancreas (left side) to expose the adrenal gland within Gerota\'s fascia.' },
          { title: 'Adrenal Main Vein Isolation & Ligation', description: 'Identify and double-clip/ligate main adrenal vein early (right vein to IVC, left vein to renal vein) to arrest systemic catecholamine surges.' },
          { title: 'Parenchymal & Fatty Dissection', description: 'Dissect adrenal gland off upper renal pole and diaphragm using harmonic scalpel, clipping small arterial branches.' },
          { title: 'Specimen Bag Extraction & Closure', description: 'Place intact adrenal gland in extraction bag and retrieve via enlarged port site. Verify dry bed hemostasis and close port fascia.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Invasive monitoring (Arterial line)',
          'Manage hypertensive crises (if Pheochromocytoma) - Alpha/Beta blockade',
          'Manage post-resection hypotension'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Hemorrhage', 'Injury to adjacent organs', 'Pneumothorax', 'Addisonian crisis'],
          anesthetic: ['Hypertensive crisis', 'Post-op hypotension', 'Electrolyte imbalance']
        },
        management: {
          preOp: ['Review hormone levels', 'Optimize BP (Alpha-blockade for Pheo)'],
          intraOp: [
            'Utilize invasive arterial blood pressure monitoring for all cases; for pheochromocytoma, have rapid-acting vasodilators (e.g., phentolamine, sodium nitroprusside) immediately available.',
            'Monitor for a sudden and profound drop in blood pressure immediately after ligation of the adrenal vein in pheochromocytoma cases; be prepared to administer fluids and vasopressors.',
            'Manage potential hypertensive crises during gland manipulation with careful titration of anesthetic depth and vasodilators; avoid drugs that stimulate the sympathetic nervous system.',
            'Monitor for signs of acute adrenal insufficiency (Addisonian crisis) after bilateral adrenalectomy; administer stress-dose corticosteroids as indicated.'
          ],
          postOp: ['Monitor for adrenal insufficiency', 'Check electrolytes']
        }
      },
      {
        id: 'neck-dissection',
        name: 'Neck Dissection',
        estimatedBloodLoss: '200 - 500 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2 Units',
        airwayStrategy: 'Oral ETT or Tracheostomy',
        recommendedBlocks: ['Superficial Cervical Plexus Block'],
        erasHighlights: ['Carotid sinus reflex bradycardia protocol', 'Venous air embolism precautions', 'Drain volume monitoring'],
        guide: [
          { title: 'Cervical Incision & Flap Elevation', description: 'Perform wide Apron or MacFee skin incision. Elevate subplatysmal flaps superiorly to mandible and inferiorly to clavicle.' },
          { title: 'Submandibular & Upper Jugular Dissection (Levels I-II)', description: 'Clear submandibular triangle (Level I), preserving marginal mandibular nerve. Dissect fibrofatty tissue along upper IJV and CN XI (Level II).' },
          { title: 'Mid/Lower Jugular Node Removal (Levels III-IV)', description: 'Skeletonize internal jugular vein and carotid sheath, dissecting lymph nodes en-bloc off IJV from hyoid down to clavicle.' },
          { title: 'Posterior Triangle Dissection (Level V)', description: 'Dissect posterior triangle lymph nodes along spinal accessory nerve (CN XI), preserving nerve continuity and brachial plexus branches.' },
          { title: 'Hemostasis & Closed Suction Drainage', description: 'Irrigate neck, check for chyle leak at thoracic duct, place 2 Jackson-Pratt suction drains, and close platysma and skin.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Maintain stable BP',
          'Avoid muscle relaxants if nerve monitoring is used',
          'Monitor for air embolism (if IJV is opened)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Chyle leak', 'Nerve injury (CN XI, Marginal Mandibular)', 'Hemorrhage', 'Hematoma'],
          anesthetic: ['Air embolism', 'Airway edema', 'VTE']
        },
        management: {
          preOp: ['Review imaging for node involvement', 'Confirm consent'],
          intraOp: [
            'Monitor for potential bradycardia or asystole due to the carotid sinus reflex during dissection near the carotid bulb; communicate with the surgeon and consider local anesthetic infiltration.',
            'Avoid the use of muscle relaxants if nerve monitoring (e.g., for the spinal accessory or marginal mandibular nerve) is being utilized during the dissection.',
            'Monitor for signs of venous air embolism if the internal jugular vein or other large neck veins are inadvertently opened or during resection.',
            'Maintain stable hemodynamics and ensure adequate venous return, as head-up positioning and neck manipulation can impact cerebral perfusion and venous drainage.'
          ],
          postOp: ['Monitor drain output', 'Check for nerve function']
        }
      },
      {
        id: 'tracheostomy',
        name: 'Tracheostomy (Surgical/Percutaneous)',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT (Shared Airway Transition)',
        recommendedBlocks: ['Local Infiltration with Epinephrine'],
        erasHighlights: ['Pre-oxygenation with 100% O2', 'FiO2 < 30% during electrocautery to prevent airway fire', 'Bronchoscopic confirmation'],
        guide: [
          { title: 'Positioning & Neck Landmark Identification', description: 'Extend neck with shoulder roll. Palpate cricoid cartilage and sternal notch. Perform 2 cm transverse incision over 2nd-3rd tracheal rings.' },
          { title: 'Strap Muscle Dissection & Thyroid Isthmus Division', description: 'Divide midline linea alba, retract strap muscles laterally, and divide thyroid isthmus using suture ligation or electrocautery.' },
          { title: 'Tracheal Window Creation & FiO2 Reduction', description: 'Reduce FiO2 < 30% to prevent airway fire. Create horizontal/Bjork flap tracheal window between 2nd and 3rd rings under direct vision.' },
          { title: 'Controlled ETT Withdrawal & Cannula Insertion', description: 'Withdraw oral ETT under direct vision to just superior to tracheostomy window. Insert cuffed tracheostomy tube directly into trachea.' },
          { title: 'Capnography Verification & Tube Fixation', description: 'Connect circuit, verify EtCO2 wave and bilateral breath sounds. Secure tracheostomy flange to skin with 2-0 silk sutures and neck tape.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT (shared airway)',
          'Maintain 100% O2 during tracheal opening',
          'Monitor for "loss of airway" during tube exchange',
          'Manage potential for fire if using cautery near O2'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '1g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Hemorrhage', 'Pneumothorax', 'Tube displacement', 'Tracheal stenosis'],
          anesthetic: ['Loss of airway', 'Hypoxia', 'Hypercapnia']
        },
        management: {
          preOp: ['Review airway anatomy', 'Ensure all equipment is ready'],
          intraOp: [
            'Ensure 100% oxygen is administered prior to and during the tracheal opening; coordinate closely with the surgeon during the transition from the endotracheal tube to the tracheostomy tube.',
            'Monitor for a "loss of airway" or accidental decannulation during the tube exchange; have a smaller endotracheal tube and a bougie immediately available.',
            'Manage the risk of an airway fire by minimizing the inspired oxygen concentration (if safe) and avoiding the use of electrocautery when the trachea is being opened.',
            'Confirm correct tracheostomy tube position using capnography and, if possible, direct visualization through a bronchoscope before securing the tube.'
          ],
          postOp: ['Secure tube properly', 'Humidified oxygen']
        }
      },
      {
        id: 'laryngectomy',
        name: 'Total Laryngectomy',
        estimatedBloodLoss: '300 - 800 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Oral ETT -> End-tracheostome transition',
        recommendedBlocks: ['Superficial Cervical Plexus Block'],
        erasHighlights: ['Meticulous end-stoma creation', 'Smooth emergence to prevent pharyngeal suture line strain', 'ICU recovery'],
        guide: [
          { title: 'Apron Flap Incision & Exposure', description: 'Perform wide U-shaped apron skin flap from mastoid to mastoid. Elevate platysma flap to hyoid bone level.' },
          { title: 'Laryngeal & Hyoid Mobilization', description: 'Transect strap muscles, dissect suprahyoid muscles off hyoid bone, and mobilize thyroid gland lobes off anterior larynx.' },
          { title: 'Tracheal Transection & Stoma Creation', description: 'Transect trachea between 1st and 2nd rings. Bevel distal trachea and suture to lower skin edge to construct permanent end-tracheostome.' },
          { title: 'En-Bloc Larynx & Pharynx Resection', description: 'Incise pharyngeal mucosa, enter hypopharynx, and resect larynx, cricoid, thyroid cartilage, and hyoid bone en-bloc.' },
          { title: 'Neopharynx Closure & TEP Placement', description: 'Perform 3-layer watertight closure of pharyngeal defect (neopharynx) over NGT. Insert Tracheoesophageal Puncture (TEP) speech prosthesis.' }
        ],
        anestheticConsiderations: [
          'Major head and neck surgery with shared airway',
          'Difficult intubation likely',
          'Maintain stable hemodynamics',
          'Smooth emergence to avoid tension on closure'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Pharyngocutaneous fistula', 'Hemorrhage', 'Stomal stenosis', 'Chyle leak'],
          anesthetic: ['Airway management challenges', 'VTE', 'Aspiration']
        },
        management: {
          preOp: ['Review imaging and biopsy', 'Speech therapy consultation'],
          intraOp: [
            'Manage a complex shared airway; expect a difficult intubation and have advanced airway equipment (e.g., fiberoptic bronchoscope, videolaryngoscope) ready.',
            'Maintain stable hemodynamics and normothermia throughout the long procedure; utilize invasive monitoring (arterial line) for precise blood pressure control.',
            'Ensure a smooth emergence from general anesthesia to prevent coughing or straining, which could place excessive tension on the pharyngeal closure and the new stoma.',
            'Monitor for potential complications such as air embolism, carotid sinus reflex, or significant blood loss during the extensive neck dissection.'
          ],
          postOp: ['Stoma care', 'Monitor for fistula']
        }
      }
    ]
  },
  {
    id: 'pediatric',
    name: 'Pediatric Surgery',
    generalConsiderations: {
      preOp: [
        'Weight-based dosing for all drugs and fluids',
        'Assess for congenital anomalies',
        'Manage parental anxiety',
        'Strict NPO guidelines for age'
      ],
      intraOp: [
        'Maintain strict normothermia using active warming measures (e.g., forced-air warming, overhead heaters, warmed fluids), as infants have a high surface area-to-volume ratio and are prone to rapid heat loss.',
        'Implement precise fluid management using micro-drip sets, infusion pumps, or syringe drivers; calculate and replace fluid deficits, maintenance requirements, and surgical losses meticulously.',
        'Utilize size-appropriate airway equipment (e.g., uncuffed or cuffed endotracheal tubes, LMAs) and monitor airway pressures closely to minimize the risk of subglottic edema or barotrauma.',
        'Monitor blood glucose levels regularly, especially in neonates and infants, to prevent hypoglycemia during periods of fasting and surgical stress.',
        'Ensure adequate depth of anesthesia and analgesia to prevent the pediatric stress response, which can have significant physiological consequences.'
      ],
      postOp: [
        'Weight-based analgesia',
        'Monitor for respiratory depression',
        'Encourage early feeding if appropriate',
        'Parental involvement in recovery'
      ]
    },
    procedures: [
      {
        id: 'pyloromyotomy',
        name: 'Ramstedt Pyloromyotomy',
        estimatedBloodLoss: '< 10 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'Oral ETT + RSI (after 3-position OGT stomach suction)',
        recommendedBlocks: ['TAP Block', 'Local Infiltration'],
        erasHighlights: ['Preop correction of hypochloremic hypokalemic metabolic alkalosis', 'Feeding protocol at 6 hours post-op', 'Active warming (Overhead heater)'],
        guide: [
          { title: 'Access', description: 'Perform a small, 2-3 cm transverse skin incision in the right upper quadrant (RUQ) or a supra-umbilical "omega" incision for better cosmesis.' },
          { title: 'Exposure', description: 'Carefully deliver the hypertrophied pylorus into the surgical wound using gentle traction on the stomach and duodenum.' },
          { title: 'Incision', description: 'Perform a longitudinal seromyotomy (incision through the serosa and hypertrophied muscle) on the anterior surface of the pylorus.' },
          { title: 'Blunt Dissection', description: 'Use a pyloric spreader or a small hemostat to bluntly separate the muscle fibers until the underlying mucosa bulges freely and is seen to be intact.' },
          { title: 'Closure', description: 'Check for mucosal integrity by inflating the stomach with air. Replace the pylorus into the abdomen and close the fascia and skin in layers.' }
        ],
        anestheticConsiderations: [
          'MEDICAL EMERGENCY, not surgical (must correct electrolytes first)',
          'High risk of aspiration (stomach may be full of milk/barium)',
          'RSI or awake intubation in neonates',
          'Suction stomach in 3 positions before induction'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '30mg/kg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Mucosal perforation', 'Incomplete myotomy', 'Wound infection'],
          anesthetic: ['Aspiration', 'Hypothermia', 'Post-operative apnea']
        },
        management: {
          preOp: ['Correct hypochloremic hypokalemic metabolic alkalosis', 'Ensure adequate hydration'],
          intraOp: [
            'Recognize that this is a medical emergency, not a surgical one; ensure that hypochloremic, hypokalemic metabolic alkalosis and dehydration are fully corrected before proceeding to surgery.',
            'Manage the high risk of aspiration by assuming a full stomach (milk or barium); perform a rapid sequence induction (RSI) or an awake intubation in neonates after thorough stomach suctioning.',
            'Suction the stomach in three positions (left lateral, right lateral, and supine) using a large-bore orogastric tube immediately prior to induction to minimize gastric volume.',
            'Maintain strict normothermia and monitor blood glucose levels throughout the procedure; provide effective local anesthetic infiltration at the incision site for post-operative analgesia.'
          ],
          postOp: ['Start feeding protocol (e.g., 6 hours post-op)', 'Monitor for apnea']
        }
      },
      {
        id: 'orchidopexy',
        name: 'Orchidopexy (Undescended Testis)',
        estimatedBloodLoss: '< 10 mL',
        bloodProductPrep: 'N/A',
        airwayStrategy: 'LMA or Oral ETT',
        recommendedBlocks: ['Caudal Block', 'Ilioinguinal / Iliohypogastric Nerve Block'],
        erasHighlights: ['Caudal single-shot analgesia (Bupivacaine 0.25% 1 mL/kg)', 'Day-case surgery', 'Multimodal paracetamol/ibuprofen'],
        guide: [
          { title: 'Incision', description: 'Make a small transverse incision in the inguinal skin crease to access the inguinal canal and the undescended testis.' },
          { title: 'Mobilization', description: 'Carefully mobilize the testis and the spermatic cord (vas deferens and spermatic vessels) to provide sufficient length for tension-free scrotal placement.' },
          { title: 'Ligation', description: 'Identify and ligated the patent processus vaginalis (PPV) at the internal inguinal ring, as it is almost always present in these cases.' },
          { title: 'Fixation', description: 'Create a sub-dartos pouch in the scrotum. Pass the testis into the pouch and secure it with a fine suture to prevent retraction.' },
          { title: 'Closure', description: 'Close the inguinal fascia and the skin incisions (inguinal and scrotal) with fine, absorbable sutures. Apply a simple dressing.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with LMA or ETT',
          'Caudal block or local infiltration for excellent analgesia',
          'Manage pediatric anxiety',
          'Maintain normothermia'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '30mg/kg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Testicular atrophy', 'Recurrence', 'Hematoma', 'Infection'],
          anesthetic: ['Agitation on emergence', 'Laryngospasm']
        },
        management: {
          preOp: ['Review for associated anomalies', 'Confirm side'],
          intraOp: [
            'Provide excellent intra-operative and post-operative analgesia using a caudal block or ilioinguinal/iliohypogastric nerve blocks combined with local anesthetic infiltration.',
            'Maintain a stable depth of anesthesia to prevent movement during the delicate dissection of the spermatic cord and the creation of the scrotal pouch.',
            'Monitor for potential cardiovascular effects (e.g., bradycardia) during traction on the spermatic cord or manipulation of the testis (vagal response).',
            'Ensure a smooth emergence from general anesthesia to minimize the risk of agitation and potential injury to the surgical sites.'
          ],
          postOp: ['Avoid straddle toys', 'Regular analgesia']
        }
      },
      {
        id: 'intussusception-reduction',
        name: 'Intussusception Reduction (Surgical)',
        estimatedBloodLoss: '< 20 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral ETT + RSI (Bowel obstruction protocol)',
        recommendedBlocks: ['TAP Block', 'Local Infiltration'],
        erasHighlights: ['Isotonic fluid loading for third-spacing', 'Active normothermia preservation', 'Multimodal opioid-sparing analgesia'],
        guide: [
          { title: 'Access', description: 'Perform a right upper quadrant (RUQ) transverse incision or a midline laparotomy if the diagnosis is uncertain or if the patient is unstable.' },
          { title: 'Identification', description: 'Locate the intussusceptum (the prolapsed segment) and the intussuscipiens (the receiving segment), typically at the ileocolic junction.' },
          { title: 'Reduction', description: 'Gently reduce the intussusception by applying retrograde pressure ("milking") from the distal end; avoid pulling on the proximal bowel.' },
          { title: 'Assessment', description: 'Carefully inspect the reduced bowel for viability (color, peristalsis, and mesenteric pulsations) and search for a pathological lead point.' },
          { title: 'Closure', description: 'If the bowel is viable and reduced, perform a standard layered closure. If non-viable, resection and primary anastomosis may be required.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'RSI if bowel obstruction is suspected',
          'Maintain normothermia',
          'Fluid resuscitation (may have significant losses)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin + Metronidazole',
          dosage: '30mg/kg + 15mg/kg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Bowel perforation', 'Recurrence', 'Wound infection', 'Adhesions'],
          anesthetic: ['Aspiration', 'Hypothermia', 'Post-operative apnea']
        },
        management: {
          preOp: ['Fluid resuscitation', 'NG tube insertion'],
          intraOp: [
            'Perform a rapid sequence induction (RSI) with cricoid pressure, as these patients are at high risk for aspiration due to potential bowel obstruction and gastric distension.',
            'Implement aggressive fluid resuscitation and monitor electrolyte balance, as significant fluid shifts and third-spacing can occur in cases of bowel ischemia or obstruction.',
            'Maintain strict normothermia using active warming measures, as these procedures can be prolonged and involve significant heat loss from the exposed bowel.',
            'Provide effective analgesia using a multimodal approach, including local anesthetic infiltration and systemic opioids, while monitoring for respiratory depression.'
          ],
          postOp: ['Monitor for recurrence', 'Gradual feeding restart']
        }
      },
      {
        id: 'tef-repair',
        name: 'Esophageal Atresia / TEF Repair',
        estimatedBloodLoss: '< 15 mL',
        bloodProductPrep: 'Crossmatch 1 Unit PRBCs',
        airwayStrategy: 'Oral ETT (Distal to fistula before PPV)',
        recommendedBlocks: ['Intercostal Nerve Block', 'Paravertebral Block'],
        erasHighlights: ['Avoid positive pressure ventilation before fistula ligation', 'NICU temperature preservation', 'Arterial line blood gas surveillance'],
        guide: [
          { title: 'Access & Extrapleural Dissection', description: 'Perform right posterolateral thoracotomy via 4th intercostal space. Dissect in extrapleural plane to reach posterior mediastinum without entering pleural space.' },
          { title: 'Fistula Identification & Isolation', description: 'Identify distal tracheoesophageal fistula (TEF) taking origin from posterior tracheal wall near carina. Encircle fistula with vessel loop.' },
          { title: 'Fistula Ligation & Transection', description: 'Ligate fistula at tracheal origin using fine silk or titanium clip and transect, eliminating gastric inflation during positive pressure ventilation.' },
          { title: 'Pouch Mobilization & Trans-anastomotic Tube', description: 'Mobilize upper blind esophageal pouch. Pass 6 Fr trans-anastomotic nasogastric feeding tube into stomach under direct vision.' },
          { title: 'Primary Esophageal Anastomosis & Drainage', description: 'Perform end-to-end full-thickness esophageal anastomosis with interrupted 5-0 Vicryl. Place extrapleural retro-anastomotic drain and close chest in layers.' }
        ],
        anestheticConsiderations: [
          'Neonatal emergency with complex airway issues',
          'Avoid positive pressure ventilation before fistula ligation (gastric distension)',
          'Maintain normothermia and glucose levels',
          'Precise fluid management'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '30mg/kg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Anastomotic leak', 'Esophageal stricture', 'Recurrent fistula', 'Tracheomalacia'],
          anesthetic: ['Hypoxia', 'Difficult intubation', 'Hypothermia']
        },
        management: {
          preOp: ['Suction upper pouch', 'Review for VACTERL anomalies'],
          intraOp: [
            'Manage a complex neonatal airway; avoid positive pressure ventilation (PPV) before the fistula is ligated to prevent gastric distension and potential gastric rupture.',
            'Position the endotracheal tube (ETT) tip distal to the fistula (if possible) to ensure effective ventilation of the lungs while minimizing air entry into the stomach.',
            'Maintain strict normothermia and monitor blood glucose levels meticulously; utilize invasive monitoring (e.g., umbilical artery line) for continuous blood pressure and blood gas analysis.',
            'Provide precise fluid management and maintain stable hemodynamics, as these neonates often have associated congenital anomalies (VACTERL) that can impact their physiological reserve.'
          ],
          postOp: ['NICU admission', 'Avoid neck extension']
        }
      },
      {
        id: 'cdh-repair',
        name: 'Congenital Diaphragmatic Hernia (CDH) Repair',
        estimatedBloodLoss: '< 20 mL',
        bloodProductPrep: 'Crossmatch 1 Unit PRBCs',
        airwayStrategy: 'Oral ETT + Gentle Pressure-Controlled Ventilation',
        recommendedBlocks: ['TAP Block', 'Local Infiltration'],
        erasHighlights: ['Permissive hypercapnia', 'Pre/Post ductal SpO2 monitoring', 'Avoid contralateral pneumothorax barotrauma'],
        guide: [
          { title: 'Subcostal Access', description: 'Perform a left subcostal or transverse upper abdominal incision to access the peritoneal cavity.' },
          { title: 'Visceral Reduction', description: 'Gently reduce herniated viscera (small bowel, stomach, spleen, colon) from the hemithorax back into the abdominal cavity.' },
          { title: 'Defect Exposure', description: 'Identify and inspect the posterolateral diaphragmatic defect (Bochdalek hernia) and rim of normal diaphragmatic muscle.' },
          { title: 'Diaphragmatic Repair', description: 'Perform primary non-absorbable sutured closure of the defect; use a synthetic mesh patch (e.g., Gore-Tex) if the defect is too large for primary repair.' },
          { title: 'Abdominal Wall Closure', description: 'Inspect ipsilateral lung space. Perform primary abdominal wall closure over skin flaps if intra-abdominal pressure permits.' }
        ],
        anestheticConsiderations: [
          'Neonate with severe pulmonary hypoplasia and persistent pulmonary hypertension (PPHN).',
          'Avoid high airway pressures (Barotrauma to the "good" lung). Target low MAP/high rate ventilation.',
          'Allow "Permissive Hypercapnia" to minimize lung injury.',
          'Pre-ductal and Post-ductal saturation monitoring is mandatory.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefotaxime + Gentamicin',
          dosage: 'Age/Weight based',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Recurrence', 'Splenic injury', 'Bowel obstruction'],
          anesthetic: ['Pneumothorax of the contralateral lung (Fatal)', 'Worsening PPHN', 'Lability']
        },
        management: {
          preOp: ['Ensure stabilization in NICU first (Gentle ventilation)', 'ECHO to assess PPHN severity'],
          intraOp: ['Hand ventilation or pressure-controlled ventilation only', 'Inotropic support ready', 'Keep neonate warm'],
          postOp: ['Return to NICU; continue sedation and gentle ventilation', 'iNO often required']
        }
      },
      {
        id: 'gastroschisis-repair',
        name: 'Gastroschisis / Omphalocele Repair',
        estimatedBloodLoss: '< 30 mL',
        bloodProductPrep: 'Crossmatch 1 Unit PRBCs',
        airwayStrategy: 'Oral ETT + Muscle Relaxation',
        recommendedBlocks: ['Local Infiltration'],
        erasHighlights: ['Abdominal compartment pressure monitoring post-reduction', 'Overhead radiant warmer', 'Strict fluid balance'],
        guide: [
          { title: 'Bowel Inspection & Protection', description: 'Inspect exposed eviscerated bowel for atresia, ischemia, or necrosis. Wrap with warm saline-soaked gauze or place spring-loaded silo.' },
          { title: 'Silo Placement / Staged Reduction', description: 'If abdominal cavity is non-compliant, secure pre-formed spring-loaded silo over defect and perform daily sequential manual reduction.' },
          { title: 'Defect Exposure & Stretching', description: 'For primary repair, stretch anterior abdominal wall manually in all four quadrants to accommodate reduced bowel volume.' },
          { title: 'Intra-abdominal Pressure Monitoring', description: 'Reduce bowel into peritoneal cavity while monitoring airway pressure, peak inspiratory pressure, and distal perfusion to prevent compartment syndrome.' },
          { title: 'Sutured / Sutureless Closure', description: 'Perform primary fascial closure using continuous absorbable sutures or sutureless closure using the umbilical cord stump as a dressing.' }
        ],
        anestheticConsiderations: [
          'Neonate with significant fluid and heat loss from exposed bowel.',
          'High risk of Abdominal Compartment Syndrome (ACS) during reduction; monitor airway pressures and hemodynamic stability.',
          'RSI is mandatory due to ileus.',
          'Maintain high-normal MAP to ensure bowel perfusion.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefotaxime + Gentamicin + Metronidazole',
          dosage: 'Weight based',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Bowel ischemia', 'ACS', 'Wound dehiscence', 'Sepsis'],
          anesthetic: ['Renal failure (from ACS)', 'Ventilatory failure', 'Hypothermia']
        },
        management: {
          preOp: ['Aggressive fluid resuscitation', 'Maintain normothermia', 'Gastric decompression'],
          intraOp: ['Monitor airway pressures meticulously', 'Avoid nitrous oxide', 'Muscle relaxation essential'],
          postOp: ['NICU; monitor for ACS signs (urine output, ventilation)']
        }
      },
      {
        id: 'nec-laparotomy',
        name: 'Necrotizing Enterocolitis (NEC) Laparotomy',
        estimatedBloodLoss: '20 - 100 mL',
        bloodProductPrep: 'Crossmatch 2-4 Units PRBCs + Platelets + FFP',
        airwayStrategy: 'Oral ETT + Invasive A-line + CVC',
        recommendedBlocks: ['Local Infiltration'],
        erasHighlights: ['Septic shock resuscitation protocol', 'Correction of hyperkalemia/acidosis', 'Preserve maximum bowel length'],
        guide: [
          { title: 'Incision & Inspection', description: 'Perform a right transverse supra-umbilical incision. Carefully eviscerate abdomen and assess total bowel involvement and perforation sites.' },
          { title: 'Necrotic Bowel Resection', description: 'Systematically resect all frank gangrenous, non-viable, or perforated bowel segments, taking care to preserve all viable bowel length to prevent short bowel syndrome.' },
          { title: 'Stoma Creation', description: 'Bring proximal viable bowel end out as an enterostomy (ileostomy or jejunostomy) and distal end as a mucous fistula.' },
          { title: 'Peritoneal Decontamination', description: 'Copiously irrigate the peritoneal cavity with warm sterile saline to evacuate necrotic debris and purulent fluid.' },
          { title: 'Abdominal Closure', description: 'Perform loose layered closure of abdominal fascia and skin, leaving drains in place if generalized peritonitis persists.' }
        ],
        anestheticConsiderations: [
          'Extremely sick, septic neonate (often premature).',
          'Massive third-space fluid losses and hemodynamic instability.',
          'Coagulopathy and thrombocytopenia are common.',
          'High risk of Metabolic Acidosis and Hyperkalemia.'
        ],
        antibioticProphylaxis: {
          drug: 'Piperacillin-Tazobactam + Metronidazole',
          dosage: 'Weight based',
          timing: 'At induction',
          alternatives: 'Meropenem'
        },
        complications: {
          surgical: ['Short bowel syndrome', 'Recurrent perforation', 'Stricture formation'],
          anesthetic: ['Multi-organ failure', 'DIC', 'Cardiac arrest']
        },
        management: {
          preOp: ['Correct electrolytes and coagulopathy', 'Crossmatch 2-4 units PRBCs', 'Aggressive fluid loading'],
          intraOp: ['Invasive BP monitoring', 'Check blood gas and glucose regularly', 'Maintain normothermia'],
          postOp: ['NICU; intensive metabolic and hemodynamic support']
        }
      },
      {
        id: 'cleft-lip-palate',
        name: 'Cleft Lip and Palate Repair',
        estimatedBloodLoss: '< 30 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Oral RAE ETT / Armored ETT',
        recommendedBlocks: ['Infraorbital Nerve Block', 'Greater Palatine Block'],
        erasHighlights: ['Throat pack placement & removal verification', 'Elbow immobilizers post-op', 'Multimodal pain management'],
        guide: [
          { title: 'Positioning & Mouth Gag Placement', description: 'Place patient supine with neck extended. Insert Dingman mouth gag for palate repair or place head ring for lip repair. Infiltrate local anesthetic + Epinephrine.' },
          { title: 'Flap Incision & Dissection', description: 'Incise along cleft margins. Elevate mucoperiosteal flaps off the hard palate (Furlow or von Langenbeck technique) or mark Millard rotation-advancement lip flaps.' },
          { title: 'Muscle Reorientation (Intravelar Veloplasty)', description: 'Dissect the abnormal levator veli palatini muscle insertions off the posterior hard palate shelf and re-orient them transversely to form a functional muscle sling.' },
          { title: 'Layered Anatomical Closure', description: 'Perform meticulous 3-layer closure of nasal mucosa, levator muscle sling, and oral mucosa for palate; or Orbicularis oris muscle and skin for lip.' },
          { title: 'Airway Clearance & Inspection', description: 'Irrigate oral cavity, suction stomach contents, remove throat pack under direct vision, and inspect repair for hemostasis.' }
        ],
        anestheticConsiderations: [
          'Shared airway challenges; specialized tubes (RAE or armored) essentially.',
          'Risk of post-operative airway obstruction from edema or tongue swelling.',
          'Maintain deep anesthesia during surgical manipulation to avoid coughing.',
          'Caudal or local blocks provide excellent analgesia.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '30mg/kg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Fistula formation', 'Wound dehiscence', 'Symmetry issues'],
          anesthetic: ['Airway obstruction', 'Laryngospasm', 'Aspiration']
        },
        management: {
          preOp: ['Review for associated syndromes', 'Check baseline hemoglobin'],
          intraOp: ['Ensure throat pack is placed and removed', 'Manage shared airway communication', 'Monitor blood loss'],
          postOp: ['Avoid oral suctioning', 'Elbow splints', 'High-humidity oxygen']
        }
      },
      {
        id: 'choledochal-cyst',
        name: 'Choledochal Cyst Excision',
        estimatedBloodLoss: '50 - 150 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 1-2 Units',
        airwayStrategy: 'Oral ETT',
        recommendedBlocks: ['TAP Block', 'Epidural Anesthesia'],
        erasHighlights: ['Vitamin K optimization pre-op', 'Restrictive fluid strategy', 'Roux-en-Y anastomotic leak check'],
        guide: [
          { title: 'Incision & Calot Triangle Dissection', description: 'Perform a right subcostal (Kocher) incision. Dissect Calot\'s triangle to identify cystic duct, hepatic artery, and portal vein.' },
          { title: 'Cyst Dissection & Mobilization', description: 'Mobilize the choledochal cyst off the portal vein and hepatic artery from the duodenal head up to the common hepatic duct bifurcation.' },
          { title: 'Cyst Resection & Cholecystectomy', description: 'Ligate the distal common bile duct at the pancreatic head interface. Perform cholecystectomy and resect the fusiform/cystic extrahepatic bile duct.' },
          { title: 'Roux-en-Y Hepaticojejunostomy', description: 'Isolate a 30-40 cm Roux limb of jejunum. Perform an end-to-side mucosa-to-mucosa hepaticojejunostomy using fine 5-0 absorbable sutures.' },
          { title: 'Jejuno-Jejunostomy & Drain Placement', description: 'Reconstruct bowel continuity with an end-to-side jejuno-jejunostomy. Place a closed-suction drain near the biliary anastomosis and close fascia.' }
        ],
        anestheticConsiderations: [
          'Major pediatric abdominal procedure with significant duration.',
          'Maintain stable internal environment (normothermia, glucose).',
          'Manage potential for significant blood loss and fluid shifts.',
          'Effective post-operative analgesia (Epidural or TAP blocks).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '30mg/kg IV',
          timing: 'At induction',
          alternatives: 'Gentamicin'
        },
        complications: {
          surgical: ['Biliary leak', 'Ascending cholangitis', 'Bowel obstruction'],
          anesthetic: ['Hypothermia', 'Pain', 'PONV']
        },
        management: {
          preOp: ['Review LFTs and Vitamin K status', 'Optimize nutrition'],
          intraOp: ['A-line placement for major cases', 'Aggressive warming', 'Restrictive fluid strategy'],
          postOp: ['NPO until bowel function returns', 'Monitor LFTs and bilirubin']
        }
      },
    ]
  },
  {
    id: 'trauma',
    name: 'Trauma Surgery',
    generalConsiderations: {
      preOp: [
        'ATLS approach (Primary/Secondary survey)',
        'Damage Control Resuscitation (DCR)',
        'Massive Transfusion Protocol (MTP) activation',
        'Assess for associated injuries (Head, Spine, Chest)'
      ],
      intraOp: [
        'Prioritize "Damage Control Surgery" (DCS) to rapidly stop life-threatening hemorrhage and control gastrointestinal contamination; avoid definitive repairs in the initial phase.',
        'Aggressively manage the "Lethal Triad" (acidosis, coagulopathy, and hypothermia) through rapid warming, balanced blood product resuscitation, and correction of metabolic derangements.',
        'Implement "Permissive Hypotension" (maintaining a palpable radial pulse or MAP 50-60 mmHg) in patients with active non-compressible hemorrhage until surgical control is achieved.',
        'Perform a rapid sequence induction (RSI) with cricoid pressure for all trauma patients, assuming a full stomach and potential cervical spine injury.',
        'Utilize massive transfusion protocols (MTP) with a high ratio of plasma and platelets to packed red blood cells (e.g., 1:1:1) to prevent and treat trauma-induced coagulopathy.'
      ],
      postOp: [
        'ICU admission for physiological optimization',
        'Monitor for Abdominal Compartment Syndrome',
        'Planned re-operation (take-back)',
        'VTE prophylaxis (when safe)'
      ]
    },
    procedures: [
      {
        id: 'trauma-laparotomy',
        name: 'Exploratory Laparotomy for Trauma',
        estimatedBloodLoss: '500 - 4000 mL',
        bloodProductPrep: 'Massive Transfusion Protocol (MTP): 10 PRBCs, 10 FFP, 2 Platelets + Cell Saver',
        airwayStrategy: 'Rapid Sequence Induction (RSI) with Oral ETT + Full Lines',
        recommendedBlocks: ['TAP Block post-hemostasis'],
        erasHighlights: ['Damage Control Resuscitation (Permissive Hypotension MAP 50-60)', 'Lethal Triad prevention (Warmed fluids & air)', '4-quadrant packing protocol'],
        guide: [
          { title: 'Incision', description: 'Perform a rapid, full-length midline laparotomy from the xiphoid process to the pubic symphysis to provide maximum exposure of the abdominal cavity.' },
          { title: 'Packing', description: 'Immediately perform four-quadrant packing with large laparotomy sponges to temporarily control diffuse hemorrhage and allow for initial assessment.' },
          { title: 'Assessment', description: 'Systematic search for and prioritize life-threatening injuries, focusing on major vascular structures, solid organs (liver, spleen), and the hollow viscus.' },
          { title: 'Control', description: 'Achieve rapid control of hemorrhage (e.g., clamping, ligation, or shunting) and contamination (e.g., stapling or simple ligation of bowel perforations).' },
          { title: 'Temporary Closure', description: 'If the patient is physiologically unstable, perform a temporary abdominal closure (e.g., Bogota bag or negative pressure wound therapy) to prevent abdominal compartment syndrome.' }
        ],
        anestheticConsiderations: [
          'Resuscitation is simultaneous with surgery',
          'Avoid Nitrous Oxide (bowel distension)',
          'Maintain "Lethal Triad" awareness',
          'Rapid access (large bore IVs, Level 1 infuser)'
        ],
        antibioticProphylaxis: {
          drug: 'Co-amoxiclav + Gentamicin',
          dosage: '1.2g + 5mg/kg IV',
          timing: 'As soon as possible',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Missed injury', 'Ongoing hemorrhage', 'Abdominal compartment syndrome', 'Sepsis'],
          anesthetic: ['Coagulopathy', 'Hypothermia', 'Multi-organ failure', 'Aspiration']
        },
        management: {
          preOp: ['Activate MTP', 'Crossmatch 10+ units'],
          intraOp: [
            'Coordinate resuscitation and surgery simultaneously; maintain close communication with the surgical team regarding blood loss, coagulopathy, and physiological status.',
            'Avoid the use of nitrous oxide to prevent bowel distension, which can complicate surgical exposure and increase intra-abdominal pressure.',
            'Utilize rapid-infusion devices (e.g., Level 1 or Belmont) and large-bore intravenous access for the rapid administration of warmed blood products and fluids.',
            'Monitor for signs of the "Lethal Triad" (acidosis, coagulopathy, hypothermia) and adjust resuscitation strategies accordingly (e.g., administering TXA, calcium, and clotting factors).'
          ],
          postOp: ['ICU stabilization', 'Monitor bladder pressure (ICP)']
        }
      },
      {
        id: 'splenectomy',
        name: 'Splenectomy (Trauma/Elective)',
        estimatedBloodLoss: '300 - 2000 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + MTP standby',
        airwayStrategy: 'Oral ETT + RSI (if trauma)',
        recommendedBlocks: ['TAP Block', 'Left Serratus Anterior Plane Block'],
        erasHighlights: ['Post-splenectomy encapsulated bacteria vaccination protocol', 'Platelet monitoring (Thrombocytosis surveillance)', 'Tranexamic Acid 1g IV'],
        guide: [
          { title: 'Left Upper Quadrant Access', description: 'Perform rapid upper midline laparotomy (trauma) or left subcostal Kocher incision (elective) to access the left upper quadrant.' },
          { title: 'Splenophrenic & Splenorenal Ligament Division', description: 'Tract spleen medially and incise lateral avascular peritoneal attachments (splenophrenic and splenorenal ligaments) to deliver spleen into wound.' },
          { title: 'Short Gastric Vessel Ligation', description: 'Dissect gastrosplenic ligament and double-ligate short gastric arteries using silk ties or Harmonic scalpel along greater stomach curvature.' },
          { title: 'Splenic Hilar Vascular Ligation', description: 'Isolate main splenic artery and vein at splenic hilum. Ligate artery first to allow splenic autotransfusion, then vein, preserving pancreatic tail.' },
          { title: 'Splenic Bed Inspection & Drainage', description: 'Inspect left upper quadrant and pancreatic tail for bleeding or injury. Place closed-suction drain in splenic fossa and close abdominal wall.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT',
          'Manage massive hemorrhage (if trauma)',
          'Monitor for OPSI (Overwhelming Post-Splenectomy Infection) risk',
          'Maintain stable hemodynamics'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Hemorrhage', 'Pancreatic injury', 'OPSI', 'Thrombocytosis'],
          anesthetic: ['Hypovolemia', 'Coagulopathy', 'Aspiration']
        },
        management: {
          preOp: ['Vaccinations (Pneumococcal, Meningococcal, Hib)', 'Check platelets'],
          intraOp: [
            'Be prepared for massive hemorrhage and rapid hemodynamic collapse in trauma cases; ensure adequate large-bore venous access and immediate availability of blood products.',
            'Monitor for potential injury to the tail of the pancreas during hilar dissection, which can lead to post-operative pancreatitis or a pancreatic fistula.',
            'Maintain stable hemodynamics and normothermia throughout the procedure; utilize invasive monitoring (arterial line) for continuous blood pressure assessment.',
            'Recognize the long-term risk of Overwhelming Post-Splenectomy Infection (OPSI) and ensure the patient receives appropriate vaccinations and education post-operatively.'
          ],
          postOp: ['Post-splenectomy vaccinations', 'Life-long antibiotic prophylaxis (if indicated)']
        }
      },
      {
        id: 'pelvic-orif',
        name: 'Pelvic Fracture ORIF',
        estimatedBloodLoss: '500 - 2500 mL',
        bloodProductPrep: 'Crossmatch 4-6 Units PRBCs + Cell Saver',
        airwayStrategy: 'Oral ETT + Invasive A-line + CVC',
        recommendedBlocks: ['Quadratus Lumborum (QL) Block', 'Lumbar Plexus Block'],
        erasHighlights: ['Pre-op pelvic binder until surgical fixation', 'Cell saver blood salvage', 'Aggressive VTE prophylaxis'],
        guide: [
          { title: 'Access', description: 'Use an anterior approach (e.g., ilioinguinal, Stoppa, or Smith-Petersen) or a posterior approach (e.g., Kocher-Langenbeck) depending on the fracture pattern.' },
          { title: 'Reduction', description: 'Achieve anatomical or near-anatomical realignment of the pelvic ring or acetabulum using specialized reduction clamps, traction, and bone hooks.' },
          { title: 'Fixation', description: 'Secure the reduction with internal fixation devices, such as reconstruction plates and screws, placed across the fracture lines or the sacroiliac joint.' },
          { title: 'Verification', description: 'Use intra-operative fluoroscopy (C-arm) to confirm the adequacy of the reduction and the correct placement of all hardware before closure.' },
          { title: 'Closure', description: 'Perform a meticulous, layered closure over suction drains to minimize the risk of hematoma formation and deep surgical site infection.' }
        ],
        anestheticConsiderations: [
          'General anesthesia with ETT and invasive monitoring',
          'Manage potential for massive hemorrhage (if acute trauma)',
          'Consider cell saver',
          'Muscle relaxation'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Nerve injury (Sciatic/Obturator)', 'Vascular injury', 'Infection', 'Non-union'],
          anesthetic: ['VTE/PE (high risk)', 'Blood loss-related complications', 'Pressure injury']
        },
        management: {
          preOp: ['Review fracture pattern on CT', 'Check hemoglobin and crossmatch'],
          intraOp: [
            'Manage the potential for significant and sometimes massive blood loss, especially in complex pelvic fractures; utilize invasive monitoring and consider the use of a cell saver.',
            'Provide profound muscle relaxation to facilitate the difficult reduction of the pelvic ring and acetabular fragments.',
            'Monitor for potential nerve injury (e.g., sciatic, obturator, or femoral nerves) during the extensive dissection and hardware placement.',
            'Implement aggressive VTE prophylaxis (e.g., sequential compression devices) intra-operatively, as pelvic fractures carry an exceptionally high risk of thromboembolism.'
          ],
          postOp: ['Aggressive VTE prophylaxis', 'Early mobilization (if stable)']
        }
      },
      {
        id: 'damage-control-lap',
        name: 'Damage Control Laparotomy (Trauma)',
        estimatedBloodLoss: '1000 - 5000 mL',
        bloodProductPrep: 'Massive Transfusion Protocol (MTP): 1:1:1 Ratio PRBC/FFP/Platelets',
        airwayStrategy: 'Oral ETT + RSI + Rapid Infuser',
        recommendedBlocks: ['N/A (Damage Control)'],
        erasHighlights: ['Bogota bag / Abthera open abdominal closure', 'Zero-crystalloid resuscitation protocol', 'ICU take-back in 24-48h'],
        guide: [
          { title: 'Rapid Exposure & Evisceration', description: 'Perform rapid full-length midline laparotomy. Eviscerate bowel and suction hemoperitoneum.' },
          { title: 'Four-Quadrant Packing', description: 'Pack all four abdominal quadrants immediately with laparotomy pads to control diffuse venous and parenchymal bleeding.' },
          { title: 'Surgical Source Control', description: 'Unpack quadrants systematically. Control arterial bleeding with vascular clamps/shunts and staple bowel perforations without anastomosis.' },
          { title: 'Repacking & Hemostasis Check', description: 'Re-pack solid organs (liver/spleen) tightly. Verify rapid hemostasis and absence of surgical arterial spurting.' },
          { title: 'Temporary Abdominal Closure (TAC)', description: 'Apply negative-pressure temporary abdominal closure (e.g., ABThera or Bogota bag). Transfer immediately to ICU for resuscitation.' }
        ],
        anestheticConsiderations: [
          'Ultrafast induction (often simple Ketamine/Succinylcholine) once surgeon is ready.',
          'Immediate Massive Transfusion Protocol (MTP). Avoid Crystalloids.',
          'Permissive hypotension (MAP 50-60) until surgical control of bleeding.',
          'Assume full stomach and severe physiological exhaustion.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin + Metronidazole',
          dosage: '2g + 500mg IV',
          timing: 'ASAP',
          alternatives: 'Gentamicin + Clindamycin'
        },
        complications: {
          surgical: ['Ongoing hemorrhage', 'Abdominal compartment syndrome', 'Bowel ischemia'],
          anesthetic: ['Cardiac arrest', 'DIC', 'TRALI/TACO']
        },
        management: {
          preOp: ['Activate MTP', 'Prep Rapid Infuser', 'Zero-delay to OR'],
          intraOp: ['Aggressive warming', 'TEG/ROTEM guided resuscitation', 'Check Ca2+ regularly'],
          postOp: ['ICU; return to OR for definitive repair in 24-48h once stable']
        }
      },
      {
        id: 'er-thoracotomy',
        name: 'Emergency Department / ER Thoracotomy',
        estimatedBloodLoss: '> 2000 mL',
        bloodProductPrep: 'MTP Protocol (Uncrossmatched O-Negative PRBCs & AB FFP)',
        airwayStrategy: 'Immediate ETT without induction drugs (Agonal state)',
        recommendedBlocks: ['N/A'],
        erasHighlights: ['Left 5th ICS anterolateral incision', 'Aortic cross-clamping for brain/heart perfusion', 'Open cardiac massage'],
        guide: [
          { title: 'Anterolateral Thoracotomy Incision', description: 'Perform a rapid left 4th or 5th intercostal space anterolateral thoracotomy incision from sternum to mid-axillary line.' },
          { title: 'Intercostal Entry & Rib Spreading', description: 'Divide intercostal muscles with scalpel/trauma shears. Insert Finochietto rib retractor with handle directed towards axilla and open widely.' },
          { title: 'Pericardiotomy & Evacuation', description: 'Identify phrenic nerve. Incise pericardium longitudinally anterior and parallel to phrenic nerve to evacuate cardiac tamponade hemopericardium.' },
          { title: 'Internal Cardiac Massage & Defibrillation', description: 'Perform bimanual internal cardiac massage. Apply internal defibrillation paddles directly to ventricles (10-20 Joules) if ventricular fibrillation occurs.' },
          { title: 'Cross-Clamping & Cardiorrhaphy', description: 'Cross-clamp descending thoracic aorta above diaphragm with DeBakey clamp. Control cardiac wound with digital occlusion and 3-0 Prolene pledgeted sutures.' }
        ],
        anestheticConsiderations: [
          'Performed on patients in profound shock or traumatic arrest.',
          'Anesthesia is often NOT required initially; patient is unconscious.',
          'Intubate immediately with 100% O2; no induction drugs usually.',
          'Prioritize large-bore access (Cordis) and MTP.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'ASAP',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Internal mammary artery bleeding', 'Clamping of the esophagus', 'Phrenic nerve injury'],
          anesthetic: ['Death (high mortality)', 'Extreme metabolic acidosis', 'Air embolism']
        },
        management: {
          preOp: ['Zero time; Scoop and run from ED to OR'],
          intraOp: ['Internal defibrillation if needed', 'Aggressive warming', 'High-dose adrenaline'],
          postOp: ['ICU if survived; usually high-acuity multisystem support']
        }
      },
    ]
  },
  {
    id: 'burns',
    name: 'Burns Surgery',
    generalConsiderations: {
      preOp: [
        'Assess % TBSA (Total Body Surface Area) and depth',
        'Evaluate for inhalation injury (Stridor, soot, singed hair)',
        'Review fluid resuscitation status (Parkland formula)',
        'Check for circumferential burns (Escharotomy needed?)'
      ],
      intraOp: [
        'Maintain a high ambient operating room temperature (typically > 28-30°C) and use active warming measures to prevent hypothermia, as burn patients have lost their primary thermoregulatory barrier.',
        'Implement aggressive and precise fluid management to compensate for high evaporative losses and ongoing fluid shifts; utilize goal-directed therapy and monitor urine output closely.',
        'Anticipate and prepare for a difficult airway due to potential inhalation injury or significant facial and neck edema; have advanced airway equipment and a surgical airway kit ready.',
        'Manage significant and sometimes rapid blood loss during surgical debridement and excision; ensure adequate venous access and immediate availability of blood products.',
        'Utilize a multimodal analgesic approach, as burn patients often have high opioid requirements and significant procedural pain.'
      ],
      postOp: [
        'Continue fluid resuscitation and electrolyte monitoring',
        'High caloric nutritional support',
        'Pain and anxiety management',
        'Monitor for sepsis (high risk)'
      ]
    },
    procedures: [
      {
        id: 'burn-debridement',
        name: 'Debridement and Skin Grafting',
        estimatedBloodLoss: '500 - 2000 mL (1 mL per cm2 excised)',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + Platelets',
        airwayStrategy: 'Oral ETT (Subglottic edema surveillance)',
        recommendedBlocks: ['Donor site local infiltration / Regional Nerve Blocks'],
        erasHighlights: ['OR ambient temperature > 28-30°C', 'Succinylcholine CONTRAINDICATED (> 24-48h post-burn)', 'Parkland fluid resuscitation formula'],
        guide: [
          { title: 'Excision', description: 'Perform tangential excision (removing thin layers of burnt tissue until viable tissue is reached) or fascial excision (removing all tissue down to the muscle fascia).' },
          { title: 'Hemostasis', description: 'Achieve rapid control of bleeding from the large raw surfaces using adrenaline-soaked swabs, topical thrombin, electrocautery, or limb tourniquets.' },
          { title: 'Harvesting', description: 'Use a dermatome to harvest split-thickness skin grafts (STSG) from unburnt donor sites. Adjust settings for desired graft thickness.' },
          { title: 'Grafting', description: 'Apply the harvested skin grafts to the excised areas. Grafts may be meshed (to cover larger areas) or applied as solid sheets for better cosmesis.' },
          { title: 'Dressing', description: 'Secure the grafts with staples, sutures, or fibrin glue. Apply non-adherent, antimicrobial dressings and ensure immobilization to promote graft take.' }
        ],
        anestheticConsiderations: [
          'High risk of hypothermia (keep OR > 28°C)',
          'Difficult venous access (may need CVC/IO)',
          'Altered pharmacology (resistance to non-depolarizing relaxants)',
          'Succinylcholine is CONTRAINDICATED after 24-48 hours (hyperkalemia risk)'
        ],
        antibioticProphylaxis: {
          drug: 'Flucloxacillin or Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin if MRSA risk'
        },
        complications: {
          surgical: ['Graft failure', 'Infection', 'Hemorrhage', 'Donor site morbidity'],
          anesthetic: ['Hypothermia', 'Hyperkalemia (Succinylcholine)', 'Fluid/Electrolyte imbalance']
        },
        management: {
          preOp: ['Optimize fluid status', 'Check coagulation'],
          intraOp: [
            'Recognize the high risk of hypothermia; maintain a warm environment and use warmed fluids and gases. Monitor core temperature continuously using an esophageal or bladder probe.',
            'Establish reliable, large-bore venous access, which may be challenging in patients with extensive burns; consider the use of central venous or intraosseous access if needed.',
            'Be aware of altered pharmacology in burn patients, such as resistance to non-depolarizing muscle relaxants and increased requirements for many anesthetic agents.',
            'Remember that succinylcholine is strictly contraindicated after the first 24-48 hours post-burn due to the risk of life-threatening hyperkalemia.'
          ],
          postOp: ['Splinting of grafted areas', 'Monitor for graft take']
        }
      }
    ]
  },
  {
    id: 'obstetrics',
    name: 'Obstetrics',
    generalConsiderations: {
      preOp: [
        'Assess both mother and fetus',
        'Review pregnancy-related complications (Pre-eclampsia, Gestational Diabetes)',
        'Confirm NPO status (though often considered full stomach)',
        'Aspiration prophylaxis (H2 blockers, Sodium Citrate)'
      ],
      intraOp: [
        'Maintain a high index of suspicion for Aortocaval Compression Syndrome; ensure the patient is positioned with a 15-degree left lateral tilt to optimize venous return and cardiac output.',
        'Be prepared for rapid and significant blood loss, especially in cases of placenta previa or accreta; ensure immediate availability of blood products and consider the use of cell salvage.',
        'Monitor for signs of Amniotic Fluid Embolism (AFE), a rare but catastrophic complication characterized by sudden cardiovascular collapse, hypoxia, and coagulopathy.',
        'Coordinate closely with the obstetric and neonatal teams during delivery to ensure a smooth transition of care for the newborn and immediate management of any maternal complications.',
        'Utilize a multimodal analgesic approach for post-operative pain management, considering the impact of medications on breastfeeding and maternal-infant bonding.'
      ],
      postOp: [
        'Monitor for Postpartum Hemorrhage (PPH)',
        'VTE prophylaxis (high risk in pregnancy)',
        'Encourage breastfeeding and early bonding',
        'Manage post-spinal headache if applicable'
      ]
    },
    procedures: [
      {
        id: 'c-section',
        name: 'Caesarean Section',
        estimatedBloodLoss: '500 - 1000 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Spinal Anesthesia Primary; ETT + RSI if emergency/failed block',
        recommendedBlocks: ['Spinal Anesthesia (Bupivacaine + Fentanyl + Morphine)', 'TAP Block (post-op)'],
        erasHighlights: ['Left lateral tilt 15°', 'Active warming', 'Prophylactic Phenylephrine infusion', 'Intrathecal Morphine 100mcg for 24h analgesia'],
        guide: [
          { title: 'Positioning & Abdominal Incision', description: 'Position patient with 15-degree left tilt. Perform Pfannenstiel or Joel-Cohen transverse skin incision, divide fascia, and retract rectus muscles.' },
          { title: 'Parietal Peritoneum & Bladder Flap', description: 'Incise parietal peritoneum. Create a gentle bladder flap by incising vesicouterine peritoneum and mobilizing bladder inferiorly.' },
          { title: 'Lower Segment Uterotomy', description: 'Perform a low transverse incision into the lower uterine segment with scalpel, extending laterally using blunt digital traction.' },
          { title: 'Neonatal Delivery & Cord Clamping', description: 'Gently disimpact and elevate fetal head, deliver body, perform delayed cord clamping (60s), and hand neonate to pediatric team.' },
          { title: 'Uterine Reconstruction & Hemostasis', description: 'Deliver placenta via controlled cord traction. Perform 2-layer continuous hysterotomy closure with absorbable suture, administer Oxytocin 5 IU IV, and close fascia.' }
        ],
        anestheticConsiderations: [
          'Regional anesthesia (Spinal/Epidural) is the gold standard',
          'General anesthesia for emergencies or contraindications to regional',
          'Manage rapid onset of hypotension after spinal',
          'Ensure uterine displacement (left tilt)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'Before skin incision',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['PPH', 'Bladder injury', 'Infection', 'Uterine atony'],
          anesthetic: ['Failed intubation (higher risk)', 'Aspiration', 'Total spinal', 'Awareness (under GA)']
        },
        management: {
          preOp: ['Check blood group and save', 'Review latest Hb and platelets'],
          intraOp: [
            'Maintain stable maternal hemodynamics and avoid hypotension, which can compromise placental perfusion and fetal well-being; utilize phenylephrine or ephedrine as needed.',
            'Monitor for uterine atony and postpartum hemorrhage (PPH) following delivery; administer uterotonic agents (e.g., oxytocin, ergometrine, or carboprost) as indicated.',
            'Be aware of the potential for high spinal or total spinal anesthesia, which can lead to rapid respiratory and cardiovascular collapse; ensure immediate availability of resuscitation equipment.',
            'Coordinate with the neonatal team for immediate assessment and resuscitation of the newborn, especially in cases of fetal distress or prematurity.'
          ],
          postOp: ['Regular observations', 'Uterine fundal check']
        }
      },
      {
        id: 'cervical-cerclage',
        name: 'Cervical Cerclage',
        estimatedBloodLoss: '< 50 mL',
        bloodProductPrep: 'Group & Save (G&S)',
        airwayStrategy: 'Spinal Anesthesia / LMA if GA required',
        recommendedBlocks: ['Spinal Anesthesia (Low dose Bupivacaine)'],
        erasHighlights: ['Avoid uterine stimulants', 'Left lateral tilt', 'Same-day discharge'],
        guide: [
          { title: 'Lithotomy Positioning & Speculum Exposure', description: 'Place patient in dorsal lithotomy position with left tilt. Insert weighted vaginal speculum and anterior vaginal retractor to expose cervix.' },
          { title: 'Cervical Grasping & Bladder Reflection', description: 'Grasp anterior and posterior lips of cervix with ring forceps. Refect bladder mucosa superiorly off anterior cervicovaginal junction if performing Shirodkar technique.' },
          { title: 'Mersilene Tape Purse-String Placement', description: 'Pass 5 mm Mersilene purse-string tape subepithelially around cervix at level of internal os (McDonald/Shirodkar technique) taking care to avoid membranes.' },
          { title: 'Tying Knot & Os Compression Verification', description: 'Tie Mersilene tape firmly posterior (or anteriorly), placing 4-5 knots. Verify internal os closure without membrane herniation or mucosal ischemia.' },
          { title: 'Fetal Heart Monitoring & Speculum Removal', description: 'Inspect vaginal mucosa for bleeding. Remove speculum and perform bedside ultrasound to confirm fetal heart rate and intact amniotic sac.' }
        ],
        anestheticConsiderations: [
          'Regional anesthesia (Spinal) is preferred',
          'General anesthesia if regional is contraindicated',
          'Avoid uterine stimulants',
          'Maintain stable BP'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '1g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Rupture of membranes', 'Preterm labor', 'Infection', 'Cervical injury'],
          anesthetic: ['Hypotension (after spinal)', 'PONV']
        },
        management: {
          preOp: ['Confirm fetal viability (US)', 'Review for infection'],
          intraOp: [
            'Utilize regional anesthesia (spinal) as the preferred technique, providing excellent surgical conditions and minimizing fetal exposure to anesthetic agents.',
            'Avoid the use of uterine stimulants (e.g., oxytocin) during the procedure, as uterine contractions can complicate the placement of the cerclage and increase the risk of membrane rupture.',
            'Maintain stable maternal blood pressure and avoid significant hypotension, which can potentially impact placental blood flow.',
            'Monitor for signs of premature rupture of membranes (PROM) or preterm labor during the procedure, and be prepared to manage these complications if they occur.'
          ],
          postOp: ['Monitor for contractions', 'Avoid heavy lifting']
        }
      },
      {
        id: 'peripartum-hysterectomy',
        name: 'Emergency Peripartum Hysterectomy',
        estimatedBloodLoss: '1500 - 5000 mL',
        bloodProductPrep: 'Massive Transfusion Protocol (MTP): 6-10 Units PRBCs + Platelets + FFP + Cell Saver',
        airwayStrategy: 'Oral ETT + RSI + Invasive Arterial/CVC Lines',
        recommendedBlocks: ['TAP Block post-op'],
        erasHighlights: ['Conversion from neuraxial to GA early upon instability', 'Cell saver autotransfusion', 'Uterine artery ligation'],
        guide: [
          { title: 'Emergency Exposure & Uterine Evisceration', description: 'Extend abdominal incision upwards into midline laparotomy. Exteriorize bleeding uterus to gain circumferential access to uterine pedicles.' },
          { title: 'Round & Infundibulopelvic Ligament Clamping', description: 'Apply heavy Kocher clamps across round ligaments and infundibulopelvic (or utero-ovarian) ligaments, ligate and cut with 0-Vicryl.' },
          { title: 'Uterine Artery Ligation', description: 'Skeletonize and double-clamp uterine vessels at internal os level bilaterally. Ligate with 0-chromic or Vicryl sutures.' },
          { title: 'Cervical Dissection / Subtotal Hysterectomy', description: 'Perform subtotal supracervical or total hysterectomy, resecting uterus off vaginal vault while protecting ureters.' },
          { title: 'Vault Closure & Pelvic Packing', description: 'Close vaginal cuff with continuous 0-Vicryl. Inspect retroperitoneum for active oozing. Place pelvic drains or pack if coagulopathic.' }
        ],
        anestheticConsiderations: [
          'High maternal mortality. Massive Transfusion Protocol is the priority.',
          'Consider conversion from Neuraxial to General Anesthesia early if instability occurs.',
          'Manage DIC and coagulopathy of pregnancy.',
          'Uterine blood flow is ~700-800ml/min; bleeding can be catastrophic.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Ureteric injury', 'Bladder injury', 'Consumptive coagulopathy'],
          anesthetic: ['Multi-organ failure', 'Transfusion-related injury (TRALI/TACO)']
        },
        management: {
          preOp: ['Identify high-risk cases (Accreta) pre-operatively', 'Blood in room'],
          intraOp: ['Cell saver if available and appropriate', 'Thromboelastography (TEG/ROTEM) guided transfusion', 'Uterine artery embolization if stable'],
          postOp: ['ICU management', 'Monitor for secondary hemorrhage']
        }
      },
      {
        id: 'placenta-previa-csection',
        name: 'Total Placenta Previa C-Section',
        estimatedBloodLoss: '1000 - 3000 mL',
        bloodProductPrep: 'Crossmatch 4 Units PRBCs + MTP Protocol standby',
        airwayStrategy: 'Spinal/CSE or Oral ETT + RSI (if massive bleeding)',
        recommendedBlocks: ['Spinal Anesthesia', 'TAP Block (post-op)'],
        erasHighlights: ['Pre-operative arterial line placement', 'Invasive hemodynamic monitoring', 'Uterotonic bundle ready'],
        guide: [
          { title: 'Pre-incision Vascular Prep', description: 'Perform Pfannenstiel or high midline incision. Verify blood products in room and ensure cell saver line is primed.' },
          { title: 'High / Fundal Hysterotomy', description: 'Perform hysterotomy superior to upper margin of anterior placenta (or cut directly through placenta if transmural extension).' },
          { title: 'Rapid Fetal Delivery', description: 'Deliver fetus rapidly to minimize fetal blood loss from transected placental sinuses. Clamp cord immediately.' },
          { title: 'Placental Manual Extraction', description: 'Manually extract placenta; if firm accreta adherence is identified, abort detachment and proceed to peripartum hysterectomy.' },
          { title: 'Placental Bed Hemostasis', description: 'Apply figure-of-eight hemostatic sutures to lower segment bleeding bed, place intrauterine Bakri balloon, and close hysterotomy.' }
        ],
        anestheticConsiderations: [
          'High risk of massive hemorrhage. General anesthesia is often preferred if active bleeding or hemodynamic instability.',
          'MTP should be active. Have blood in the room.',
          'Large bore IV access mandatory.',
          'Consider arterial line and cell saver pre-emptively.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Massive Hemorrhage', 'Emergency Hysterectomy', 'DIC'],
          anesthetic: ['Cardiac arrest', 'Aspiration', 'Uterine atony']
        },
        management: {
          preOp: ['Type & Crossmatch 4-6 units PRBCs', 'Detailed anesthetic discussion with patient', 'Confirm Placenta location'],
          intraOp: ['Aggressive fluid/blood resuscitation', 'Inotropes ready', 'Manage coagulopathy'],
          postOp: ['Monitor for secondary hemorrhage', 'HDU monitoring']
        }
      },
    ]
  },
  {
    id: 'thoracic',
    name: 'Thoracic Surgery',
    generalConsiderations: {
      preOp: [
        'Perform mandatory preoperative pulmonary evaluation (Spirometry, DLCO).',
        'Review recent Chest CT for tumor staging and anatomical anomalies.',
        'Assess cardiac risk (often high-risk patients with COPD/smoking history).',
        'Plan for single-lung ventilation (SLV) - size Double Lumen Tube (DLT) or Bronchial Blocker.'
      ],
      intraOp: [
        'Secure airway with a Double Lumen Tube (DLT) or Bronchial Blocker. Confirm placement with flexible bronchoscopy.',
        'Manage Hypoxic Pulmonary Vasoconstriction (HPV) during One-Lung Ventilation (OLV). Use low tidal volumes (4-6 mL/kg PBW) and apply PEEP (5-10 cmH2O) to the ventilated lung.',
        'Apply CPAP (2-5 cmH2O) to the non-ventilated lung if hypoxia occurs during OLV.',
        'Consider placement of an Arterial Line for continuous ABG sampling and BP monitoring.',
        'Employ multimodal, opioid-sparing analgesia (Thoracic Epidural, Paravertebral Block, or Erector Spinae Plane Block) to prevent postoperative pulmonary complications.'
      ],
      postOp: [
        'Encourage early mobilization and aggressive pulmonary toilet (Incentive Spirometry, early coughing).',
        'Ensure continuous multimodal analgesia to prevent splinting and atelectasis.',
        'Monitor chest tube output for hemorrhage, prolonged air leak, or chylothorax.',
        'Monitor for signs of Post-Pneumonectomy Pulmonary Edema or right heart failure.'
      ]
    },
    procedures: [
      {
        id: 'lobectomy',
        name: 'VATS Lobectomy',
        estimatedBloodLoss: '100 - 300 mL',
        bloodProductPrep: 'Crossmatch 2 Units PRBCs',
        airwayStrategy: 'Left Double-Lumen Tube (DLT) or Bronchial Blocker + Bronchoscopy',
        recommendedBlocks: ['Thoracic Epidural (T5-T8)', 'Thoracic Paravertebral Block', 'Serratus Anterior Plane Block'],
        erasHighlights: ['One-Lung Ventilation (OLV) low VT (4-6 mL/kg) + PEEP', 'Fluid restriction (< 2 mL/kg/h)', 'Early mobilization day 1'],
        guide: [
          { title: 'Positioning', description: 'Place patient in the lateral decubitus position. Pad all pressure points carefully (axillary roll, peroneal nerve).' },
          { title: 'Access', description: 'Create 1 to 3 small incisions (ports) in the intercostal spaces. Establish One-Lung Ventilation (OLV) and collapse the operative lung.' },
          { title: 'Vascular Dissection', description: 'Carefully dissect and isolate the specific pulmonary artery and pulmonary vein branches supplying the target lobe.' },
          { title: 'Bronchial Transection', description: 'Identify and isolate the lobar bronchus. Divide vessels and bronchus using endoscopic vascular and thick-tissue linear staplers.' },
          { title: 'Fissure Completion', description: 'Complete the interlobar fissures. Extract the lobe in a protective endobag. Perform a mandatory lymph node dissection (mediastinal sampling/clearance).' },
          { title: 'Closure', description: 'Perform an underwater seal ("leak test") by re-expanding the lung to check the bronchial stump. Insert 1-2 chest tubes and close incisions.' }
        ],
        anestheticConsiderations: [
          'Mandatory Single Lung Ventilation (DLT typically preferred over blocker).',
          'Calculate predicted postoperative (ppo) FEV1 and DLCO to assess CPET requirement.',
          'High risk for intraoperative conversion to open Thoracotomy (keep cross-matched blood ready).',
          'Prevent fluid overload to reduce risk of ALI/Pulmonary Edema.',
          'Gold standard analgesia: Thoracic Epidural (T5-T8) or Paravertebral blockade.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin 600mg IV'
        },
        complications: {
          surgical: ['Severe hemorrhage (PA tear)', 'Prolonged air leak', 'Bronchopleural fistula', 'Chylothorax'],
          anesthetic: ['Refractory hypoxia during OLV', 'Post-expansion pulmonary edema', 'Vocal cord/RLN injury (if large tumor)']
        },
        management: {
          preOp: ['Calculate ppoFEV1 & ppoDLCO', 'Cease smoking > 4 weeks if possible', 'Optimize bronchodilators'],
          intraOp: [
            'Confirm left-sided DLT placement with fiberoptic bronchoscope immediately after turning patient lateral.',
            'During OLV, if profound hypoxia (SpO2 < 90%) occurs: 1. Confirm DLT position, 2. Apply PEEP to dependent lung, 3. Apply CPAP to non-dependent lung, 4. Clamp PA early.',
            'Administer restrictive fluid therapy (< 1-2 mL/kg/hr) to mitigate risk of lung injury and edema.'
          ],
          postOp: ['Maintain thoracic epidural/block running', 'Continuous SpO2 monitoring', 'Very early mobilization']
        }
      },
      {
        id: 'pneumonectomy',
        name: 'Pneumonectomy',
        guide: [
          { title: 'Access', description: 'Standard posterolateral thoracotomy (or rarely VATS for small central lesions). Collapse the operative lung via OLV.' },
          { title: 'Hilar Dissection', description: 'Expose the pulmonary hilum. Dissect the main pulmonary artery and superior/inferior pulmonary veins centrally.' },
          { title: 'Ligation', description: 'Clamp, staple, and divide the massive pulmonary vessels sequentially. Great care is taken to avoid slipping of the primary pulmonary artery stump.' },
          { title: 'Bronchial Division', description: 'Staple and divide the mainstem bronchus close to the carina to avoid a long blind stump (prevents pooling of secretions). Reinforce the stump with a pleural, pericardial, or muscle flap to prevent fistula.' },
          { title: 'Extraction & Closure', description: 'Remove the entire lung. Assess hemostasis. Usually no chest tube is placed (to allow pleural space to fill with fluid), or a clamped tube is placed to balance mediastinal shift.' }
        ],
        anestheticConsiderations: [
          'High risk. SLV is mandatory (DLT strongly preferred). Left DLT can be used for Right Pneumonectomy, but Left Pneumonectomy requires pulling back the Left DLT before stapling the bronchus.',
          'Massive reduction in pulmonary vascular bed leads to acute Right Ventricular (RV) strain.',
          'Limit fluids massively (avoid Post-Pneumonectomy Pulmonary Edema syndrome).',
          'Calculate ppoFEV1 rigorously (removing ~45% functional tissue for left, ~55% for right).'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Catastrophic hemorrhage', 'Bronchopleural fistula (lethal)', 'Cardiac herniation', 'Post-pneumonectomy syndrome'],
          anesthetic: ['Acute RV failure', 'Post-Pneumonectomy Pulmonary Edema (fatal)', 'Severe hypoxia']
        },
        management: {
          preOp: ['Mandatory quantitative V/Q scan if pre-op FEV1 or DLCO < 80%', 'Echo to assess baseline RV function'],
          intraOp: [
            'For Left Pneumonectomy with a Left DLT: You MUST withdraw the DLT into the trachea before the surgeon staples the left main bronchus so you do not staple the tube itself!',
            'Monitor closely for acute RV failure/cor pulmonale immediately following clamping of the main pulmonary artery.',
            'Clamp IVF tightly. Excessive fluid is the primary driver of catastrophic post-pneumonectomy pulmonary edema in the remaining lung.'
          ],
          postOp: ['ICU Admission mandatory', 'Position patient strictly on the OPERATIVE side to avoid flooding the remaining lung if a fistula occurs', 'Keep pleural space neutral (verify mediastinal alignment on CXR)']
        }
      },
      {
        id: 'pleurodesis',
        name: 'Pleurodesis (VATS/Chemical)',
        guide: [
          { title: 'VATS Port Access & Effusion Evacuation', description: 'Perform single/multi-port VATS under one-lung ventilation. Completely aspirate all pleural effusion fluid and break up loculations.' },
          { title: 'Pleural Inspection & Biopsy', description: 'Systematically inspect visceral and parietal pleura. Obtain representative parietal pleural punch biopsies of nodules or thickened pleura.' },
          { title: 'Mechanical Abrasion (Pleural Scrubbing)', description: 'Scrub parietal pleura aggressively with a Marlex mesh or gauze pucker attached to ring forceps to induce uniform inflammatory exudate.' },
          { title: 'Talc Poudrage / Chemical Sclerosant Application', description: 'Insufflate 4-5g of sterile asbestos-free talc powder (talc poudrage) under direct thoracoscopic vision into all pleural recesses.' },
          { title: 'Lung Re-expansion & Chest Tube Drainage', description: 'Re-expand lung under direct vision to ensure complete apposition of visceral and parietal pleura. Insert 24-28 Fr chest tube connected to negative suction.' }
        ],
        anestheticConsiderations: [
          'GA with OLV (for VATS) or sedation (for chemical)',
          'Manage pain (highly painful procedure)',
          'Monitor for inflammatory response to sclerosant',
          'Ensure lung re-expansion'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Failure of pleurodesis', 'Infection (Empyema)', 'Persistent air leak', 'Bleeding'],
          anesthetic: ['Acute Lung Injury (rare)', 'Pain', 'Hypoxemia during OLV']
        },
        management: {
          preOp: ['Review imaging', 'Assess lung function'],
          intraOp: [
            'Provide effective analgesia, as pleurodesis (especially mechanical) is highly painful; consider the use of regional blocks or systemic opioids.',
            'Monitor for a systemic inflammatory response to the sclerosant, which can manifest as fever, tachycardia, or rarely, acute lung injury (ALI).',
            'Ensure continuous lung expansion throughout the procedure and in the immediate post-operative period to facilitate successful pleurodesis.',
            'Manage one-lung ventilation (OLV) if VATS is used, and monitor for hypoxia and hemodynamic stability during lung manipulation.'
          ],
          postOp: ['Chest drain management', 'Regular analgesia']
        }
      },
      {
        id: 'tracheal-resection',
        name: 'Tracheal Resection and Reconstruction',
        guide: [
          { title: 'Cervical Exposure & Mobilization', description: 'Perform collar incision +/- upper sternotomy. Mobilize anterior tracheal wall carefully, avoiding lateral pedicle devascularization.' },
          { title: 'Tracheal Division & Cross-Field Ventilation', description: 'Transect trachea distal to stenosis/tumor. Pass sterile armored ETT into distal open trachea on surgical field and connect to secondary circuit.' },
          { title: 'Stenotic Segment Resection', description: 'Resect diseased tracheal rings en-bloc with clear cartilage margins, preserving recurrent laryngeal nerves bilaterally.' },
          { title: 'End-to-End Anastomosis', description: 'Perform interrupted 4-0 Vicryl/PDS circumferential anastomosis, transitioning ventilation back to oral ETT before anterior wall completion.' },
          { title: 'Guardian / Grillo Stitch & Flexed Closure', description: 'Perform leak test under saline. Place heavy submental-to-manubrium chin-to-chest stitch (Grillo stitch) to prevent neck extension.' }
        ],
        anestheticConsiderations: [
          'THE ultimate airway challenge. Cooperation between anesthetist and surgeon is vital.',
          'Requires "cross-field ventilation": switching between the ETT and surgical field tubing.',
          'Spontaneous ventilation/TIVA often used during induction to maintain airway patency if the lesion is critical.',
          'Extubation must be smooth to avoid tension on the suture line.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Anastomotic dehiscence (lethal)', 'Recurrent laryngeal nerve palsy', 'Tracheo-innominate fistula'],
          anesthetic: ['Total loss of airway', 'Hypoxia during cross-field ventilation', 'Hypercapnia']
        },
        management: {
          preOp: ['Review CT/Bronchoscopy', 'Ensure multiple sizes of ETT and flexometallic tubes available'],
          intraOp: ['TIVA with short-acting agents', 'Continuous ETCO2 from whichever site is ventilating', 'Limit neck extension'],
          postOp: ['Maintain neck flexion (Grillo stitch)', 'Often extubated awake on the table']
        }
      },
    ]
  },
  {
    id: 'vascular',
    name: 'Vascular Surgery',
    generalConsiderations: {
      preOp: [
        'Comprehensive cardiac and respiratory assessment is mandatory; these patients have a high prevalence of severe systemic atherosclerosis, CAD, and COPD.',
        'Optimize antiplatelets and statins per guidelines. Many will remain on Aspirin.',
        'Assess the patient’s renal function carefully (risk of contrast-induced nephropathy and aortic cross-clamping ischemia).',
        'Ensure robust peripheral IV access and type & crossmatch blood products early.'
      ],
      intraOp: [
        'Invasive hemodynamic monitoring (Arterial line, CVP, large bore access) is essential for major procedures.',
        'Prepare for rapid fluid or blood shifts and ischemia-reperfusion injuries upon clamping/unclamping.',
        'Heparinization is universally required (ACT > 200-250s) before clamping. Have Protamine available (1mg per 100 U Heparin reversed).',
        'Renal protection strategies (e.g., maintaining adequate perfusion pressure, avoiding nephrotoxins) should be employed.'
      ],
      postOp: [
        'Close ICU/HDU monitoring is often required due to cardiovascular instability and high risk of bleeding or graft thrombosis.',
        'Vigilant monitoring for signs of distal embolization ("trash foot"), spinal cord ischemia, or compartment syndrome.',
        'Aggressive continuous pain management to prevent sympathetic surges (epidural or PCA).'
      ]
    },
    procedures: [
      {
        id: 'aaa-repair-open',
        name: 'Open Abdominal Aortic Aneurysm (AAA) Repair',
        guide: [
          { title: 'Pre-incision', description: 'Place arterial line and large bore IVs (Level 1 infuser). Consider thoracic epidural for post-op pain.' },
          { title: 'Heparinization', description: 'Administer systemic heparin (50-100 U/kg) ~3-5 mins before aortic cross-clamping. Check ACT.' },
          { title: 'Cross-clamping', description: 'Prepare for sudden increase in SVR and afterload. Use vasodilators (SNP, NTG) or deep anesthesia if hemodynamically compromised.' },
          { title: 'Unclamping', description: 'Prepare for "declamping shock" (sudden hypotension, acidosis, hyperkalemia). Fluid load, lessen anesthesia, have vasopressors ready (Phenylephrine, Norepinephrine).' },
          { title: 'Closure', description: 'Reverse heparin with protamine if requested, slowly to avoid pulmonary hypertension, anaphylaxis, or hypotension.' }
        ],
        anestheticConsiderations: [
          'Declamping shock: Washout of anaerobic metabolites (lactic acid) and vasodilators from the ischemic lower body.',
          'Renal protection: Mainstay is maintaining euvolemia and renal perfusion pressure, especially if suprarenal clamping occurs.',
          'Spinal cord ischemia: Risk increases if clamp time is prolonged or lumbar arteries are sacrificed.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin 2-3g',
          dosage: 'Weight-based',
          timing: 'Within 60 min of incision. Re-dose after 4h or >1500ml blood loss.',
          alternatives: 'Vancomycin + Clindamycin/Gentamicin'
        },
        complications: {
          surgical: ['Hemorrhage', 'Graft thrombosis/infection', 'Bowel ischemia', 'Limb ischemia', 'Ureteral injury'],
          anesthetic: ['Myocardial infarction', 'Renal failure', 'Paraplegia (spinal cord ischemia)', 'Declamping shock']
        },
        management: {
          preOp: ['ECHO, stress test', 'Baseline Cr', 'Crossmatch 4-6 units PRBCs'],
          intraOp: ['A-line, CVP, TEE', 'Vasoactive drips ready', 'Active warming', 'Cell saver'],
          postOp: ['ICU admission', 'Epidural PCA', 'Keep MAP narrow to protect graft and organs']
        }
      },
      {
        id: 'evar',
        name: 'Endovascular Aneurysm Repair (EVAR)',
        guide: [
          { title: 'Femoral Access & Sheath Placement', description: 'Perform percutaneous ultrasound-guided access or cutdown of bilateral common femoral arteries. Insert large-bore arterial sheaths (12-20 Fr).' },
          { title: 'Angiography & Guideline Placement', description: 'Advance stiff guidewires (e.g., Supra Core) into abdominal aorta under fluoroscopy. Perform diagnostic abdominal aortogram to identify renal artery origins.' },
          { title: 'Main Body Stent Deployment', description: 'Advance and deploy main bifurcated aortic stent-graft just inferior to lowest renal artery, ensuring complete seal without coverage of renal ostia.' },
          { title: 'Contralateral Limb Cannulation & Extension', description: 'Cannulate contralateral gate from opposite femoral artery. Advance and deploy contralateral and ipsilateral iliac limb extension grafts.' },
          { title: 'Balloon Dilatation & Completion Angiography', description: 'Perform balloon modeling of graft overlap zones and attachment sites. Perform completion angiography to exclude Type I or III endoleaks.' }
        ],
        anestheticConsiderations: [
          'Significantly less physiologic stress than open repair, but can quickly convert to an open rupture if the aneurysm bursts during wire manipulation.',
          'Contrast load can be immense. Hydrate adequately, monitor urine output.',
          'Type of anesthesia depends on patient ability to lie flat and cooperate; General is common for patient immobility.'
        ],
        complications: {
          surgical: ['Endoleaks', 'Access site hematoma/pseudoaneurysm', 'Device migration', 'Iliac rupture'],
          anesthetic: ['Contrast-induced nephropathy', 'Allergic reaction to contrast', 'Sudden hemorrhage (conversion to Open)']
        },
        management: {
          preOp: ['Evaluate contrast allergy', 'Renal function check', 'Type & Screen'],
          intraOp: ['Standard monitoring; A-line if cardiac comorbidities exist', 'Maintain immobility'],
          postOp: ['Usually goes to PACU and floor, avoiding ICU', 'Monitor access site bleeding']
        }
      },
      {
        id: 'carotid-endarterectomy',
        name: 'Carotid Endarterectomy (CEA)',
        guide: [
          { title: 'Incision & Dissection', description: 'Surgeon exposes the carotid bifurcation. Bradycardia can occur from carotid sinus manipulation (have Glycopyrrolate/Atropine ready or ask surgeon to inject local anesthetic locally).' },
          { title: 'Heparinization', description: 'Give Heparin (usually 5000 units or weight-based), verify ACT before clamping.' },
          { title: 'Cross-clamping', description: 'Maintain high-normal BP (typically 20% above baseline) to push collateral blood flow through the Circle of Willis.' },
          { title: 'Plaque Removal', description: 'Surgeon cleans the artery. Neuromonitoring (EEG, SSEP) if under GA, or clinical wakefulness if under Regional anesthesia.' },
          { title: 'Closure', description: 'Unclamp. Strict blood pressure control required (<160 SBP) to prevent reperfusion injury/hematoma.' }
        ],
        anestheticConsiderations: [
          'Blood pressure management is the cornerstone: High during clamping for cerebral perfusion, low/normal after unclamping to prevent neck hematoma and airway compromise.',
          'Choice of anesthesia (Regional/Cervical Plexus Block vs GA): Regional allows direct neurologic monitoring, GA allows strictly controlled PaCO2 and airway protection.',
          'Post-operative neck hematoma is a lethal airway emergency.'
        ],
        complications: {
          surgical: ['Neck hematoma', 'Cranial nerve injuries (X, XII, VII)', 'Stroke (embolic)', 'Carotid rupture'],
          anesthetic: ['Hemodynamic lability (baroreceptor disruption)', 'Airway compromise (hematoma)', 'Cerebral hyperperfusion syndrome']
        },
        management: {
          preOp: ['Determine baseline BP and neuro exam', 'Continue Aspirin'],
          intraOp: ['A-line placement (often awake)', 'Careful positioning (neck extension)', 'Vasopressor/Vasodilator tight control'],
          postOp: ['PACU or ICU for strict BP monitoring', 'Observe for stridor or swelling']
        }
      },
      {
        id: 'fem-pop-bypass',
        name: 'Femoropopliteal Bypass (Fem-Pop)',
        guide: [
          { title: 'Groin & Popliteal Incisions', description: 'Make longitudinal groin incision over femoral triangle and distal leg incision over above-knee or below-knee popliteal fossa.' },
          { title: 'Conduit Harvesting & Preparation', description: 'Harvest ipsilateral great saphenous vein (GSV) or prepare synthetic PTFE / Dacron graft. Systematically distend and valvulotome GSV.' },
          { title: 'Heparinization & Vascular Clamping', description: 'Administer systemic Heparin (100 U/kg, target ACT > 200s). Clamp common femoral, deep femoral, and popliteal arteries.' },
          { title: 'Proximal & Distal Anastomoses', description: 'Perform end-to-side proximal anastomosis to common femoral artery and distal anastomosis to popliteal artery using continuous 5-0 or 6-0 Prolene.' },
          { title: 'De-airing & Flow Verification', description: 'Flush and de-air graft prior to final knot tying. Remove clamps, assess distal pedal pulses with Doppler ultrasound, and close incisions.' }
        ],
        anestheticConsiderations: [
          'Regional anesthesia (Spinal/Epidural) is excellent; it causes sympathectomy-induced vasodilation improving graft flow and decreases hypercoagulability post-op.',
          'Positioning can be painful pre-induction if severe ischemic rest pain exists.'
        ],
        complications: {
          surgical: ['Graft thrombosis', 'Surgical site infection', 'Compartment syndrome'],
          anesthetic: ['Post-op cognitive dysfunction in elderly', 'Cardiopulmonary stress', 'Epidural hematoma (careful timing of heparin)']
        },
        management: {
          preOp: ['Cardiac optimization', 'Evaluate for regional vs general anesthesia'],
          intraOp: ['Heparin management', 'Keep patient warm', 'Aggressive hydration to keep graft open'],
          postOp: ['Maintain BP to support graft flow', 'Monitor pedal pulses']
        }
      },
      {
        id: 'tevar',
        name: 'Thoracic Endovascular Aortic Repair (TEVAR)',
        guide: [
          { title: 'CSF Lumbar Drain & Arterial Line Placement', description: 'Insert lumbar spinal catheter to maintain CSF pressure < 10 mmHg. Place right radial arterial line to monitor cerebral perfusion during subclavian deployment.' },
          { title: 'Femoral Vascular Access & Angiography', description: 'Expose or percutaneously access common femoral artery. Advance pigtail catheter via brachial/femoral access into ascending aorta for baseline angiogram.' },
          { title: 'Rapid Ventricular Pacing (RVP) / Hypotension', description: 'Initiate RVP at 160-180 bpm (or Adenosine bolus) to achieve transient cardiac arrest / MAP < 50 mmHg during graft deployment to prevent wind-sail effect.' },
          { title: 'Endograft Deployment & Proximal Landing Zone', description: 'Deploy thoracic endograft precisely in descending aorta, ensuring proximal landing zone distal to left subclavian artery (Zone 2/3).' },
          { title: 'Completion Angiography & Re-perfusion', description: 'Discontinue pacing. Perform balloon molding and completion angiography to verify graft exclusion of aneurysm/dissection and lack of Type I/III endoleak.' }
        ],
        anestheticConsiderations: [
          'High risk procedure often done for descending aortic aneurysms or dissections.',
          'Spinal cord perfusion pressure = MAP - CSF Pressure. Thus, we want high MAP and low CSF pressure.',
          'RVP requires placement of a temporary transvenous pacing wire or pacing via CVC.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin 2g',
          dosage: 'Standard',
          timing: 'Pre-incision',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Endoleak', 'Aortic rupture (catastrophic)', 'Stroke', 'Spinal cord ischemia / Paraplegia'],
          anesthetic: ['Failure to recover from induced cardiac arrest/RVP', 'Massive hemorrhage']
        },
        management: {
          preOp: ['Lumbar drain placement', 'A-line (right radial often preferred)', 'Large bore IVs'],
          intraOp: ['Manage RVP or Adenosine sequence', 'Maintain MAP > 80-90'],
          postOp: ['ICU', 'Neurologic checks for lower extremities', 'Maintain spinal drain']
        }
      },
      {
        id: 'av-fistula',
        name: 'AV Fistula Creation',
        guide: [
          { title: 'Pre-procedure Vessel Mapping', description: 'Perform high-resolution ultrasound mapping to measure radial/brachial artery and cephalic/basilic vein lumen diameters (> 2.0 mm).' },
          { title: 'Surgical Exposure', description: 'Make a longitudinal incision over the non-dominant wrist (radiocephalic Cimino-Brescia) or antecubital fossa (brachiocephalic).' },
          { title: 'Mobilization & Heparinization', description: 'Dissect out the artery and vein, mobilising vein length. Administer 3,000-5,000 units IV Heparin.' },
          { title: 'End-to-Side Anastomosis', description: 'Perform side-to-side or end-to-side arterialized anastomosis using continuous 6-0 or 7-0 Prolene sutures under optical loupe magnification.' },
          { title: 'Flow Check & Thrill Verification', description: 'Release vascular clamps. Verify palpable continuous thrill and soft venous augmentation without twist or kinking before skin closure.' }
        ],
        anestheticConsiderations: [
          'Patients have End Stage Renal Disease (ESRD) - high potassium, uremia, poor platelet function, no IV access in the targeted arm.',
          'Brachial plexus block (axillary or supraclavicular) is the gold standard. It provides anesthesia, excellent post-op analgesia, and profound sympathectomy which dilates the veins, significantly increasing surgical success rates.'
        ],
        complications: {
          surgical: ['Failure to mature', 'Steal syndrome (hand ischemia)', 'Bleeding'],
          anesthetic: ['Local Anesthetic Systemic Toxicity (LAST) during block', 'Hyperkalemic arrays during GA (avoid succinylcholine)']
        },
        management: {
          preOp: ['Check Potassium (K+)', 'NO blood pressures or IVs in the operative arm'],
          intraOp: ['Regional Anesthesia preferred', 'Sedation as tolerated'],
          postOp: ['Protect the arm', 'Avoid tight dressings']
        }
      },
      {
        id: 'ruptured-aaa',
        name: 'Ruptured AAA Repair',
        guide: [
          { title: 'Emergency Exposure & Supraceliac Clamping', description: 'Perform rapid full-length midline laparotomy. Manual compression of subdiaphragmatic aorta at aortic hiatus followed by supraceliac vascular cross-clamp.' },
          { title: 'Hematoma Evacuation & Neck Dissection', description: 'Open retroperitoneal hematoma, expose infrarenal aortic neck, and isolate bilateral common iliac arteries.' },
          { title: 'Infraceliac Cross-Clamping Transition', description: 'Move cross-clamp down to infrarenal neck once distal iliac vascular clamps are positioned to minimize visceral ischemia.' },
          { title: 'Graft Interposition & Anastomoses', description: 'Suture Dacron/PTFE tube or bifurcated graft to proximal neck and distal iliac arteries with continuous 3-0/4-0 Prolene.' },
          { title: 'Declamping & Damage Control Closure', description: 'Slowly remove clamps while volume loading. Verify hemostasis. Perform temporary abdominal closure (Bogota bag/Abthera) if coagulopathic or tight.' }
        ],
        anestheticConsiderations: [
          'True anesthetic emergency. High mortality.',
          'Permissive hypotension (SBP ~80) prior to clamping avoids "popping the clot" and worsening the blowout.',
          'Induction is often Ketamine or Etomidate with drastically reduced doses, or simply no anesthetic at all until aortic control is achieved.'
        ],
        complications: {
          surgical: ['Exsanguination', 'Abdominal compartment syndrome', 'Multi-organ failure'],
          anesthetic: ['Cardiac arrest upon induction', 'Severe coagulopathy', 'Hypothermia']
        },
        management: {
          preOp: ['Activate MTP', 'Prep Rapid Infuser', 'Place Cordis (large central access) if time permits, otherwise large peripheral'],
          intraOp: ['Awake a-line if possible', 'Surgeon ready before pushing induction drugs', 'Calcemias, Acidosis management'],
          postOp: ['ICU, Open abdomen often', 'Continued resuscitation']
        }
      },
      {
        id: 'fem-distal-bypass',
        name: 'Femoral-Distal Bypass (Fem-TIB/Fem-Pedal)',
        guide: [
          { title: 'Incision & Target Vessel Exposure', description: 'Make longitudinal groin incision for common femoral artery access and distal ankle/foot incision over target tibial or pedal artery (anterior/posterior tibial or dorsalis pedis).' },
          { title: 'Saphenous Vein Harvest & Preparation', description: 'Harvest non-reversed or reversed great saphenous vein (GSV) / arm vein using longitudinal incisions or endoscopic vein harvesting.' },
          { title: 'Systemic Heparinization & Clamping', description: 'Administer systemic Heparin (100 U/kg, target ACT > 200s). Clamp inflow common femoral artery and outflow distal crural target vessel.' },
          { title: 'Micro-Anastomoses (Proximal & Distal)', description: 'Perform microvascular end-to-side anastomoses using fine 6-0 or 7-0 Prolene continuous sutures under optical loupes.' },
          { title: 'Re-perfusion & Doppler Pulsatility Check', description: 'De-air graft, release clamps, and evaluate distal pedal flow using continuous-wave Doppler ultrasound. Verify absence of compartment syndrome.' }
        ],
        anestheticConsiderations: [
          'Typically elderly with severe vascular disease and CAD.',
          'Regional anesthesia (Spinal or Combined Spinal-Epidural) is ideal for graft perfusion and pain.',
          'Maintain high-normal MAP to ensure distal graft flow.',
          'Manage heparinization and potential for redo-vascular instability.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Graft thrombosis', 'Hematoma', 'Compartment syndrome'],
          anesthetic: ['Myocardial ischemia', 'Delirium', 'Epidural hematoma (careful timing)']
        },
        management: {
          preOp: ['Review for antiplatelet status', 'Assess cardiac reserve'],
          intraOp: ['Maintain stable hemodynamics', 'Tight MAP control', 'Check distal pulses'],
          postOp: ['Hourly pedal pulse checks', 'Pain management', 'Early mobilization']
        }
      }
    ]
  },
  {
    id: 'maxillofacial',
    name: 'Maxillofacial Surgery',
    generalConsiderations: {
      preOp: [
        'Detailed airway assessment (shared airway)',
        'Check for restricted mouth opening (Trismus)',
        'Review imaging (CT facial bones) for fracture site',
        'Assess for C-spine injury in trauma patients'
      ],
      intraOp: [
        'Manage "shared airway" communication with the surgical team; ensure the ETT is secure and out of the surgical field (often nasal intubation).',
        'Use a throat pack to prevent aspiration of blood and debris; ensure a clear marker is visible and the pack is removed before extubation.',
        'Avoid or minimize muscle relaxation if nerve monitoring (e.g., facial nerve) is used during the procedure.',
        'Provide effective analgesia using local anesthetic blocks (e.g., mandibular or infraorbital blocks) to minimize post-operative pain.'
      ],
      postOp: [
        'Monitor for airway obstruction/edema; ensure wire cutters are at the bedside if Maxillomandibular Fixation (MMF) is used.',
        'Aggressive PONV prophylaxis (high risk due to swallowed blood).',
        'Monitor for facial nerve function (if at risk).',
        'Provide humidified oxygen and suctioning as needed.'
      ]
    },
    procedures: [
      {
        id: 'mandibular-orif',
        name: 'Mandibular Fracture ORIF',
        guide: [
          { title: 'Nasal Intubation & Throat Pack', description: 'Perform RAE nasal intubation. Place radiopaque throat pack in the hypopharynx to prevent aspiration of blood/bone fragments.' },
          { title: 'Incision & Fracture Exposure', description: 'Perform intraoral gingivobuccal sulcus incision (or extraoral submandibular incision) and elevate mucoperiosteum to expose fracture lines.' },
          { title: 'Maxillomandibular Fixation (MMF)', description: 'Apply Erich arch bars or IMF speed screws to upper and lower dentition. Wire teeth into temporary occlusion to establish proper dental alignment.' },
          { title: 'Rigid Internal Fixation (Plating)', description: 'Contour 2.0 mm titanium mini-plates along Champy\'s ideal lines of osteosynthesis across mandibular fracture and secure with monocortical/bicortical screws.' },
          { title: 'MMF Release & Throat Pack Removal', description: 'Cut MMF wires to release jaws (unless elastic traction indicated). Confirm dental occlusion, suction pharynx, and remove throat pack before extubation.' }
        ],
        anestheticConsiderations: [
          'Shared airway; nasal intubation is frequently required',
          'Throat pack is mandatory to prevent aspiration of blood',
          'High risk for PONV (blood in stomach)',
          'Manage potential for Maxillomandibular Fixation (MMF) - jaws wired shut'
        ],
        antibioticProphylaxis: {
          drug: 'Co-amoxiclav',
          dosage: '1.2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Infection', 'Nerve injury (Mental nerve)', 'Malocclusion', 'Hardware failure'],
          anesthetic: ['Airway obstruction (post-op)', 'PONV', 'Aspiration of blood']
        },
        management: {
          preOp: ['Confirm NPO', 'Review C-spine status in trauma'],
          intraOp: [
            'Ensure the nasal ETT is well-secured and doesn\'t exert excessive pressure on the nares to prevent pressure necrosis.',
            'Administer dexamethasone (8-10mg) to reduce facial and airway edema.',
            'Ensure the throat pack is removed and documented before emergence.',
            'Suction the stomach thoroughly before extubation to reduce the risk of PONV.'
          ],
          postOp: [
            'Ensure wire cutters are taped to the head of the bed or accompany the patient if the jaws are wired (MMF).',
            'Extubate when fully awake with airway reflexes intact.',
            'Provide regular anti-emetics and multimodal analgesia.'
          ]
        }
      }
    ]
  },
  {
    id: 'obstetrics-gynecology',
    name: 'Obstetrics & Gynecology',
    generalConsiderations: {
      preOp: [
        'Assess airway carefully (increased risk of difficult intubation in pregnancy due to mucosal edema).',
        'Check full blood count (FBC) and blood type/crossmatch; assess for preeclampsia/HELLP syndrome.',
        'Ensure left lateral tilt (15 degrees) after 20 weeks gestation to prevent aortocaval compression.',
        'Review fetal monitoring (CTG) prior to regional block or general anesthesia.'
      ],
      intraOp: [
        'Spinal/Epidural neuraxial anesthesia is preferred for Cesarean section to minimize airway manipulation and fetal drug exposure.',
        'Pre-treat with IV fluid bolus and co-administer Phenylephrine/Ephedrine infusion to prevent spinal hypotension.',
        'Administer Oxytocin (5 IU slow IV) following delivery of the fetus, followed by continuous infusion.',
        'RSI with cricoid pressure is mandatory if general anesthesia is required (high aspiration risk).'
      ],
      postOp: [
        'Monitor uterine tone and vaginal bleeding (postpartum hemorrhage surveillance).',
        'Multimodal analgesia (TAP block, intrathecal morphine 100-150mcg, paracetamol, NSAIDs).',
        'Early thromboprophylaxis and mobilization.'
      ]
    },
    procedures: [
      {
        id: 'cesarean-section',
        name: 'Cesarean Section (Elective / Emergency Category 1-4)',
        estimatedBloodLoss: '500 - 1000 mL',
        bloodProductPrep: 'Group & Save (G&S) / Crossmatch 2 Units PRBCs for high risk',
        airwayStrategy: 'Neuraxial (Spinal/CSE) Primary; ETT + RSI (Rapid Sequence) if Emergency/GA',
        recommendedBlocks: ['Spinal Anesthesia (0.5% Heavy Bupivacaine 2.2-2.6mL + Fentanyl + Morphine)', 'TAP Block (post-op)', 'Epidural Top-up'],
        erasHighlights: ['Left lateral tilt 15°', 'Active warming', 'Prophylactic Phenylephrine infusion', 'Intrathecal Morphine 100mcg for 24h analgesia'],
        guide: [
          { title: 'Incision', description: 'Pfannenstiel (transverse lower abdominal) or Joel-Cohen incision. Dissect through subcutaneous fat and fascia.' },
          { title: 'Uterine Access', description: 'Incise parietal peritoneum and lower uterine segment (hysterotomy). Rupture membranes and deliver fetal head.' },
          { title: 'Delivery & Placenta', description: 'Deliver fetus, double-clamp and divide umbilical cord. Administer Oxytocin IV. Manual or traction delivery of placenta.' },
          { title: 'Closure', description: 'Two-layer uterine closure, repair visceral peritoneum, and layered abdominal wall closure.' }
        ],
        anestheticConsiderations: [
          'High risk of rapid desaturation and difficult intubation during GA',
          'Spinal hypotension requires active vasopressor management (Phenylephrine infusion)',
          'High risk for postpartum hemorrhage (PPH); prepare uterotonics (Oxytocin, Ergometrine, Carboprost, Misoprostol)',
          'Acid aspiration prophylaxis (Sodium Citrate 30mL oral pre-op)'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin',
          dosage: '2g IV (3g if weight > 120kg)',
          timing: 'Within 60 mins before skin incision',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Postpartum hemorrhage (PPH)', 'Bladder/Ureteral injury', 'Uterine atony', 'Infection'],
          anesthetic: ['High spinal block', 'Failed intubation', 'Aspiration', 'Spinal hypotension']
        },
        management: {
          preOp: ['Administer 0.3M Sodium Citrate 30mL', 'Confirm CTG', 'Check platelet count if preeclamptic'],
          intraOp: [
            'Maintain left lateral tilt until fetus is delivered.',
            'Run prophylactic Phenylephrine infusion to maintain MAP at baseline.',
            'Administer Oxytocin 5 IU slow IV over 2 minutes upon shoulder delivery.',
            'If PPH occurs, escalate to second-line uterotonics (Ergometrine 500mcg IM, Carboprost 250mcg IM, Misoprostol 800mcg PR) and TXA 1g IV.'
          ],
          postOp: ['Monitor vital signs and lochia q15m for 1 hour', 'Assess spinal block regression', 'Early skin-to-skin and breastfeeding']
        }
      }
    ]
  }
];
