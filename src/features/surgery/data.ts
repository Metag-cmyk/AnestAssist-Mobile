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
        guide: [
          { title: 'Approach', description: 'Laparoscopic (umbilical 10mm, suprapubic 5mm, left iliac fossa 5mm ports) or Open (McBurney\'s point or Lanz incision in the right iliac fossa).' },
          { title: 'Identification', description: 'Follow the taeniae coli of the cecum to their convergence at the base of the appendix. Mobilize the cecum if necessary to expose a retrocecal appendix.' },
          { title: 'Ligation', description: 'Use a harmonic scalpel, clips, or ties to divide the mesoappendix and its artery. Secure the base of the appendix with endoloops or a stapler, ensuring the stump is clear of the cecum.' },
          { title: 'Removal', description: 'Place the appendix in an extraction bag to prevent wound contamination. Irrigate the paracolic gutter and pelvis thoroughly with warm saline if perforation or pus is present.' }
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
        guide: [
          { title: 'Incision', description: 'Open (oblique groin incision) or Laparoscopic (TEP - Totally Extraperitoneal or TAPP - Transabdominal Preperitoneal approach).' },
          { title: 'Reduction', description: 'Identify the hernia sac (indirect, direct, or femoral). Carefully dissect the sac away from the spermatic cord structures (in males) and reduce contents into the peritoneal cavity.' },
          { title: 'Mesh Placement', description: 'Place a large-pore synthetic mesh to cover the entire myopectineal orifice. Secure with tacks (laparoscopic) or sutures (open), ensuring no tension.' },
          { title: 'Closure', description: 'In open repair, close the external oblique aponeurosis to reconstruct the inguinal canal. Layered closure of Scarpa\'s fascia and skin.' }
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
        guide: [
          { title: 'Incision', description: 'Perform a transverse elliptical (Stewart) incision encompassing the nipple-areola complex and any previous biopsy scars, ensuring adequate skin flaps for closure.' },
          { title: 'Dissection', description: 'Raise superior and inferior skin flaps in the plane between the subcutaneous fat and breast fascia. Dissect the breast tissue off the pectoralis major fascia from the clavicle to the inframammary fold.' },
          { title: 'Axilla', description: 'Identify the long thoracic and thoracodorsal nerves. Perform sentinel lymph node biopsy (using blue dye/radioisotope) or formal axillary lymph node dissection (Levels I and II) as indicated.' },
          { title: 'Closure', description: 'Ensure meticulous hemostasis using cautery or ties. Place one or two closed-suction drains (e.g., Jackson-Pratt) and close the skin in layers with absorbable sutures or staples.' }
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
        guide: [
          { title: 'Abdominal Phase', description: 'Mobilize the stomach, preserving the right gastroepiploic artery. Create a gastric conduit using linear staplers.' },
          { title: 'Thoracic Phase', description: 'Perform a right thoracotomy. Resect the esophagus and perform a radical mediastinal lymphadenectomy (Ivor-Lewis approach).' },
          { title: 'Anastomosis', description: 'Pull the gastric conduit into the chest (or neck) and perform a circular or hand-sewn esophagogastric anastomosis.' },
          { title: 'Closure', description: 'Place chest tubes, a mediastinal drain, and a feeding jejunostomy tube. Close the thoracotomy and laparotomy incisions.' }
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
        guide: [
          { title: 'Positioning', description: 'Steep reverse Trendelenburg to displace the liver and bowel inferiorly. Essential to strap securely and use a footboard.' },
          { title: 'Access & Pneumoperitoneum', description: 'Optical trocar or Veress for initial entry. Beware of increased baseline intra-abdominal pressure and rapidly escalating peak airway pressures.' },
          { title: 'Anastomosis', description: 'Creation of a small gastric pouch and gastrojejunostomy. Leak test usually performed with methylene blue or air under water seal.' }
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
        guide: [
          { title: 'Approach', description: 'Combined abdominal and perineal approach for low rectal cancers. Involves removing the rectum, anus, and sphincter complex.' },
          { title: 'Positioning', description: 'Lithotomy or Lloyd-Davies position with steep Trendelenburg during the abdominal phase, often flipped to prone jackknife for the perineal phase (or done simultaneously).' },
          { title: 'Stoma', description: 'Permanent end-colostomy is formed in the left iliac fossa.' }
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
        guide: [
          { title: 'Resection Phase', description: 'En-bloc removal of the pancreatic head, duodenum, proximal jejunum, gallbladder, and common bile duct. Major vessels (SMA, PV) are exposed and carefully preserved.' },
          { title: 'Reconstruction Phase', description: 'Three anastomoses: Pancreaticojejunostomy (pancreatic duct to jejunum), hepaticojejunostomy (bile duct to jejunum), and gastrojejunostomy (stomach to jejunum).' }
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
        guide: [
          { title: 'Mobilization', description: 'Divide hepatic ligaments to free the liver. Intraoperative ultrasound to define tumor margins and identify key vessels.' },
          { title: 'Pringle Manoeuvre', description: 'Temporary occlusion of the hepatoduodenal ligament (hepatic artery + portal vein) to reduce bleeding during parenchymal transection. Tolerated up to ~60 min intermittent.' },
          { title: 'Parenchymal Transection', description: 'Using CUSA (Cavitron Ultrasonic Surgical Aspirator), harmonic scalpel, or stapler. Bile ducts and vessels are ligated as encountered.' }
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
        guide: [
          { title: 'Entry', description: 'Midline laparotomy. Rapid systematic survey of all abdominal quadrants: inspect bowel from Ligament of Treitz to recto-sigmoid, assess solid organs, mesentery, and peritoneum.' },
          { title: 'Damage Control', description: 'In unstable patients: pack bleeding quadrants, staple bowel ends, close temporarily (Bogota bag or vacuum dressing). Return in 24-48h for definitive repair when physiology corrected.' }
        ],
        anestheticConsiderations: [
          'Often an emergency or semi-emergency. RSI mandatory - assume full stomach.',
          'Presentation ranges from stable (diagnostic) to actively dying (ruptured viscus, bowel ischemia). Prepare for both extremes.',
          'Avoid N2O (bowel distension), aggressive PEEP if hemodynamically compromised.'
        ],
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
          { title: 'Access', description: 'Perform a small curvilinear or omega incision around the umbilicus. Reduce hernia contents (fat or bowel).' },
          { title: 'Repair', description: 'Anatomical closure of the defect (Mayo repair) or, more commonly, placement of a sublay or onlay mesh for larger defects.' },
          { title: 'Closure', description: 'Invert the umbilicus and secure it to the fascia to restore cosmetic appearance.' }
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
          { title: 'Access', description: 'Multi-port laparoscopy. Medial-to-lateral mobilization of the sigmoid and rectum.' },
          { title: 'Ligation', description: 'Ligate the Inferior Mesenteric Artery (IMA) at its origin (high tie) and the vein at the pancreatic border.' },
          { title: 'Resection', description: 'Divide the rectum below the tumor (Total Mesorectal Excision - TME for low tumors) using a linear stapler.' },
          { title: 'Anastomosis', description: 'Restore continuity using a circular stapler (EEA). Perform a leak test (air under water).' }
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
        guide: [
          { title: 'Positioning', description: 'Fracture table in supine or lateral decubitus. Affected leg in traction boot with perineal post. The uninjured leg is placed in a well-leg holder.' },
          { title: 'Reduction & Reaming', description: 'Closed reduction under fluoroscopy. Guidewire is passed across the fracture, and the canal is reamed.' },
          { title: 'Nail Insertion', description: 'The IM nail is driven down the canal. Proximal and distal interlocking screws are placed.' }
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
        guide: [
          { title: 'Positioning', description: 'Beach-chair or lateral decubitus. Beach-chair requires strict head positioning to prevent cerebral hypoperfusion (keep MAP ≥ 65 at ear level, not at heart).' },
          { title: 'Approach', description: 'Deltopectoral approach. Subscapularis tendon takedown for exposure of glenohumeral joint.' },
          { title: 'Implantation', description: 'Humeral head resection, glenoid preparation and component implantation, humeral stem insertion and reduction.' }
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
        guide: [
          { title: 'Positioning', description: 'Prone on a Wilson frame or Jackson table. Meticulous padding of all pressure points. Eyes taped and checked every 30 min for pressure.' },
          { title: 'Instrumentation', description: 'Pedicle screw placement under fluoroscopic or navigation guidance. Multiple levels require extended retractor placement causing significant blood loss.' },
          { title: 'Decompression & Fusion', description: 'Laminectomy/discectomy at affected levels. Bone graft (autograft from iliac crest, or allograft) packed into disc spaces and posterolateral gutters.' }
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
        guide: [
          { title: 'Access', description: 'Posterior midline incision. Identify and protect the ulnar nerve (often transposed).' },
          { title: 'Preparation', description: 'Prepare the humeral and ulnar canals using sequential reamers.' },
          { title: 'Implantation', description: 'Cemented insertion of the humeral and ulnar components. Link the components (for semiconstrained prostheses).' }
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
        guide: [
          { title: 'Incision', description: 'Lateral or posterior approach. Resect the fractured femoral head.' },
          { title: 'Preparation', description: 'Ream the femoral canal manually or with progressive broaches.' },
          { title: 'Insertion', description: 'Insert the femoral prosthesis (Austin-Moore or Thompson, often cemented in the elderly) and reduce into the native acetabulum.' }
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
        guide: [
          { title: 'Access', description: 'Flank (retroperitoneal), subcostal, or midline incision (Open); or a multi-port laparoscopic approach (Transperitoneal).' },
          { title: 'Vascular Control', description: 'Identify and ligate the renal artery and then the renal vein early to minimize hematogenous tumor spread.' },
          { title: 'Resection', description: 'Remove the kidney within Gerota\'s fascia, including the adrenal gland (if indicated) and regional lymph nodes.' },
          { title: 'Extension Check', description: 'If there is a tumor thrombus in the IVC, coordinate with vascular/cardiac surgery for IVC control and thrombectomy.' }
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
        guide: [
          { title: 'Vascular Anastomosis', description: 'Perform end-to-side anastomoses of the donor renal vein to the external iliac vein and the donor renal artery to the external iliac artery.' },
          { title: 'Ureteral Anastomosis', description: 'Perform a ureteroneocystostomy (suturing the donor ureter to the recipient bladder) over a stent to prevent stenosis.' },
          { title: 'Reperfusion', description: 'Release clamps and monitor for "reperfusion syndrome" (hypotension, hyperkalemia, or bradycardia).' }
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
        guide: [
          { title: 'Positioning', description: 'Initial cystoscopy and retrograde catheter placement in lithotomy, then flipped to PRONE position for percutaneous kidney access.' },
          { title: 'Access', description: 'Under fluoroscopic and ultrasound guidance, a needle tracks into the renal calyx. The tract is dilated to allow a nephroscope.' },
          { title: 'Lithotripsy', description: 'Stones are fragmented using pneumatic, ultrasonic, or laser lithotripters. High-volume irrigation is used to flush fragments.' }
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
      },
      {
        id: 'robotic-cystectomy',
        name: 'Robotic Radical Cystectomy',
        guide: [
          { title: 'Access', description: '6-port robotic access. Steep Trendelenburg positioning.' },
          { title: 'Resection', description: 'Robotic dissection of the bladder and pelvic lymphadenectomy.' },
          { title: 'Diversion', description: 'Intracorporeal or extracorporeal ileal conduit or neobladder.' }
        ],
        anestheticConsiderations: [
          'STEEP Trendelenburg: monitor for airway/facial edema and cerebral venous congestion.',
          'Restrictive fluid strategy to optimize surgical view until diversion is complete.',
          'Large-bore IV access and arterial line mandatory.',
          'Maintain normocapnia despite high CO2 absorption.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime + Metronidazole',
          dosage: '1.5g + 500mg IV',
          timing: 'At induction',
          alternatives: 'Clindamycin + Gentamicin'
        },
        complications: {
          surgical: ['Ureteric injury', 'Bowel injury', 'Hemorrhage', 'Anastomotic leak'],
          anesthetic: ['Facial edema', 'Nerve injury', 'CO2 embolism', 'POVL']
        },
        management: {
          preOp: ['Review nutritional status (Albumin)', 'Renal function assessment'],
          intraOp: ['Restrict fluids (5-10 ml/kg/h)', 'Pressure point protection', 'A-line monitoring'],
          postOp: ['ERAS bowel protocol', 'Pain management (TAP/Rectus sheath)']
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
        id: 'craniotomy-tumor',
        name: 'Craniotomy for Tumor Resection',
        guide: [
          { title: 'Positioning', description: 'Head fixed in Mayfield frame, elevated to facilitate venous drainage.' },
          { title: 'Incision', description: 'Perform a scalp incision (e.g., horseshoe or linear) based on the tumor location. Reflect the scalp flap and secure it with Raney clips or bipolar cautery.' },
          { title: 'Bone Flap', description: 'Create burr holes and use a craniotome to cut a bone flap. Carefully separate the bone from the underlying dura mater.' },
          { title: 'Durotomy', description: 'Open the dura mater in a reflected fashion to expose the brain surface. Maintain hemostasis along the dural edges.' },
          { title: 'Resection', description: 'Use microscopic dissection, ultrasonic aspiration, and bipolar cautery to resect the tumor while preserving eloquent brain areas.' },
          { title: 'Closure', description: 'Close the dura mater (water-tight) with sutures or a dural substitute. Replace the bone flap and secure it with plates and screws. Perform a layered scalp closure.' }
        ],
        anestheticConsiderations: [
          'Total Intravenous Anesthesia (TIVA) often preferred (Propofol/Remifentanil)',
          'Maintain "slack brain" (Mannitol, hyperventilation to PaCO2 4.5-5.0 kPa)',
          'Smooth emergence (avoid coughing/straining)',
          'Precise blood pressure control'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime or Vancomycin',
          dosage: '1.5g or 1g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Intracranial hemorrhage', 'Brain edema', 'Neurological deficit', 'CSF leak'],
          anesthetic: ['Venous Air Embolism (especially in sitting position)', 'Seizures', 'Diabetes Insipidus']
        },
        management: {
          preOp: ['Administer Dexamethasone', 'Check electrolytes'],
          intraOp: [
            'Maintain stable cerebral perfusion pressure (CPP) and minimize intracranial pressure (ICP) throughout the procedure; avoid hypertension during dural opening and closure.',
            'Monitor for venous air embolism (VAE), particularly if the surgical site is above the level of the heart; maintain adequate venous return and use precordial Doppler.',
            'Ensure meticulous hemostasis to prevent post-operative intracranial hematoma; monitor for signs of brain swelling or herniation during resection.',
            'Utilize intra-operative neuromonitoring (e.g., motor or sensory evoked potentials) to protect eloquent brain regions during tumor removal.'
          ],
          postOp: ['ICU/HDU admission', 'Strict BP targets (e.g., SBP < 140)']
        }
      },
      {
        id: 'vp-shunt',
        name: 'Ventriculoperitoneal (VP) Shunt',
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
        guide: [
          { title: 'Incision', description: 'Perform a small longitudinal or curvilinear incision (2-3 cm) in the palm, centered over the carpal tunnel and aligned with the third web space.' },
          { title: 'Identification', description: 'Dissect through the palmar fascia to identify the transverse carpal ligament (TCL). Identify and protect the median nerve and its recurrent motor branch.' },
          { title: 'Release', description: 'Carefully divide the transverse carpal ligament from its proximal to distal extent to completely decompress the median nerve.' },
          { title: 'Closure', description: 'Irrigate the wound and check for hemostasis. Close the skin with non-absorbable sutures and apply a bulky, non-constrictive dressing.' }
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
        guide: [
          { title: 'Indication', description: 'Tumors or epileptic foci located in or near eloquent cortex (motor or speech areas).' },
          { title: 'Scalp Block', description: 'Crucial step. Bilateral blockade of scalp nerves (supraorbital, supratrochlear, auriculotemporal, greater/lesser occipital) to eliminate somatic pain.' },
          { title: 'Phases', description: 'Asleep-Awake-Asleep (AAA) or Conscious Sedation throughout. Patient must be awake and cooperative during cortical mapping.' }
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
        guide: [
          { title: 'Access', description: 'Perform a multi-level laminectomy or laminoplasty to expose the dura over the tumor site.' },
          { title: 'Durectomy', description: 'Incise the dura mater and use microscopic dissection to identify the tumor-spinal cord interface.' },
          { title: 'Resection', description: 'Use ultrasonic aspiration (CUSA) or microsurgical tools to debulk and remove the tumor while preserving cord tracts.' },
          { title: 'Closure', description: 'Perform a water-tight dural closure (often with a patch) and layered muscle/skin closure.' }
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
        guide: [
          { title: 'Frame Placement', description: 'Secure a stereotactic frame to the patient\'s skull under local anesthesia.' },
          { title: 'Targeting', description: 'Perform a CT/MRI to calculate the precise coordinates of the target (e.g., STN or GPi).' },
          { title: 'Lead Placement', description: 'Perform a burr hole and insert the microelectrode. Conduct microelectrode recording (MER) and clinical testing while the patient is awake.' },
          { title: 'IPG Placement', description: 'Under GA, tunnel the wires to a pulse generator (IPG) placed in the subclavicular region.' }
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
        guide: [
          { title: 'Access', description: 'Use an endonasal endoscopic approach to reach the sphenoid sinus and then the sella turcica.' },
          { title: 'The Sella', description: 'Remove the floor of the sella and incise the dura to expose the pituitary gland.' },
          { title: 'Resection', description: 'Identify and remove the adenoma, often using curettes and suction. Preserve the normal pituitary gland if possible.' },
          { title: 'Packing', description: 'Check for CSF leak (Valsalva). Pack the sella/sphenoid sinus with fat/fascia or a mucosal flap if leak present.' }
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
        guide: [
          { title: 'Positioning', description: 'Prone, Lateral, or Sitting position. Sitting position gives best access but highest risk of VAE.' },
          { title: 'Access', description: 'Perform a suboccipital craniectomy. C1 laminectomy may be needed for lower tumors.' },
          { title: 'Resection', description: 'Microsurgical debulking. Close monitoring of CN nuclei (V, VII, X, XII).' }
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
            'Maintain stable hemodynamics and optimize cardiac output during the weaning process, using inotropic support or vasopressors as indicated.'
          ],
          postOp: ['ICU management', 'Monitor for heart block (pacing wires)']
        }
      },
      {
        id: 'mitral-valve',
        name: 'Mitral Valve Repair/Replacement',
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
        guide: [
          { title: 'Access', description: 'Median sternotomy. Cannulation for CPB (often axillary or femoral for arch work).' },
          { title: 'Circulatory Arrest', description: 'Cool the patient to Deep Hypothermic Circulatory Arrest (DHCA) temperatures (18-24°C) if the arch is involved.' },
          { title: 'Resection', description: 'Excise the aneurysmal or dissected aorta. Perform a distal anastomosis to the arch under circulatory arrest (with antegrade cerebral perfusion).' },
          { title: 'Grafting', description: 'Perform the proximal anastomosis to the sinotubular junction or aortic root. Rewarm the patient slowly.' }
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
        guide: [
          { title: 'Access', description: 'Median sternotomy or bilateral thoracotomy (clamshell).' },
          { title: 'The Shell', description: 'Carefully dissect the thickened, calcified pericardium away from the heart ("eggshell" removal).' },
          { title: 'Extent', description: 'Free the ventricles first, then the atria and great vessels, to avoid sudden congestion.' }
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
        guide: [
          { title: 'Access', description: 'Median sternotomy. Establish CPB and cardiac arrest with cardioplegia.' },
          { title: 'Resection', description: 'Excise the aortic root, the aortic valve, and a portion of the ascending aorta.' },
          { title: 'Implantation', description: 'Suture a valved conduit (composite graft) into the aortic annulus. Re-implant the coronary ostia into the conduit.' }
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
        guide: [
          { title: 'Excision', description: 'Remove the recipient\'s heart while maintaining CPB, leaving the posterior atria (Biatrial) or just the cavae/pulmonary veins (Bicaval).' },
          { title: 'Anastomoses', description: 'Suture the donor heart: Left atrium first, then RA/IVC/SVC, followed by Pulmonary Artery and Aorta.' },
          { title: 'Reperfusion', description: 'De-air carefully and remove the aortic cross-clamp. Monitor the "new" heart for function and rejection.' }
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
        guide: [
          { title: 'Access', description: 'Median sternotomy. Rapid initiation of CPB (often femoral cannulation first if patient unstable).' },
          { title: 'Embolectomy', description: 'Incision into the main pulmonary artery. Use forceps and suction to remove "saddle" or branch emboli.' },
          { title: 'Closure', description: 'Close the arteriotomy. Wean from bypass. Place an IVC filter if indicated.' }
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
        guide: [
          { title: 'Access', description: 'Median sternotomy. Establish CPB.' },
          { title: 'The Pump', description: 'Core the apex of the left ventricle and insert the inflow cannula. Secure the pump.' },
          { title: 'Outflow', description: 'Anastomose the outflow graft to the ascending aorta.' },
          { title: 'Tunneling', description: 'Pass the driveline through a subcutaneous tunnel in the abdomen.' }
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
        name: 'TAVI / TAVR',
        guide: [
          { title: 'Access', description: 'Typically transfemoral (90%) but can be transapical or transaortic.' },
          { title: 'Pacing', description: 'Rapid ventricular pacing (180-220 bpm) to induce transient cardiac standstill for valve deployment.' },
          { title: 'Deployment', description: 'Expandable valve positioned under fluoroscopy and deployed.' }
        ],
        anestheticConsiderations: [
          'Anesthesia choice: Conscious Sedation vs. GA. GA allows for better TEE and patient immobility during critical deployment.',
          'Rapid Ventricular Pacing: Crucial period of no cardiac output. Maintain preload and be ready for prolonged arrest.',
          'Vascular Access: Risk of major iliac/femoral vascular injury or rupture.',
          'Monitor for heart block: High risk after deployment, require temporary pacing.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefazolin or Vancomycin',
          dosage: '2g or 1g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Vascular rupture', 'Valve migration', 'Annular rupture', 'Paravalvular leak'],
          anesthetic: ['Heart block', 'Stroke', 'Cardiac arrest', 'Myocardial infarction']
        },
        management: {
          preOp: ['Review aortic root diameter', 'Verify vascular access site plan'],
          intraOp: ['Aggressive MAP control', 'Check heart rhythm instantly after pacing stops', 'Prepare for emergency CPB if needed'],
          postOp: ['Monitor for neurology/vascular changes', 'Daily ECG for conduction changes']
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
        guide: [
          { title: 'Exposure', description: 'Mouth gag (Boyle-Davis) inserted to expose the oropharynx.' },
          { title: 'Dissection', description: 'Tonsils dissected from the tonsillar bed.' },
          { title: 'Hemostasis', description: 'Diathermy or ties used to control bleeding.' },
          { title: 'Inspection', description: 'Check for bleeding and remove mouth gag.' }
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
        guide: [
          { title: 'Incision', description: 'Intranasal incision (hemitransfixion).' },
          { title: 'Elevation', description: 'Elevation of the mucoperichondrial flap.' },
          { title: 'Resection', description: 'Straightening or resection of the deviated cartilage/bone.' },
          { title: 'Closure', description: 'Suturing of the flap and possible nasal packing/splints.' }
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
        guide: [
          { title: 'Access', description: 'Visualization of the tympanic membrane via an otoscope.' },
          { title: 'Incision', description: 'Small incision in the tympanic membrane (myringotomy).' },
          { title: 'Aspiration', description: 'Suctioning of fluid from the middle ear.' },
          { title: 'Insertion', description: 'Placement of a small ventilation tube (grommet).' }
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
          { title: 'Access', description: 'Endoscopic visualization of the nasal passages.' },
          { title: 'Debridement', description: 'Removal of polyps or diseased mucosa.' },
          { title: 'Ostium Enlargement', description: 'Opening and enlarging the natural sinus ostia.' },
          { title: 'Hemostasis', description: 'Packing or cautery to control bleeding.' }
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
        guide: [
          { title: 'Access', description: 'Suspension laryngoscope inserted to visualize the larynx.' },
          { title: 'Visualization', description: 'Use of the operating microscope for detailed inspection.' },
          { title: 'Biopsy', description: 'Removal of tissue samples from vocal cords or larynx.' },
          { title: 'Intervention', description: 'Laser ablation or injection (if indicated).' }
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
        guide: [
          { title: 'Access', description: 'Lip-splitting incision and mandibulotomy for exposure of the oral cavity and oropharynx.' },
          { title: 'Excision', description: 'En-bloc resection of the primary tumor (tongue/floor of mouth), segments of the mandible, and bilateral/unilateral neck nodes.' },
          { title: 'Reconstruction', description: 'Repair the defect using a free flap (e.g., Fibula or RFFF) or pedicled flap (Pectoralis major).' }
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
        guide: [
          { title: 'Access', description: 'Insert a 5 mm or 10 mm umbilical port for the laparoscope. Place 1-2 additional 5 mm accessory ports in the lower quadrants as needed for manipulation.' },
          { title: 'Inspection', description: 'Systematic inspection of the pelvic and abdominal organs, including the uterus, fallopian tubes, ovaries, and peritoneal surfaces, for pathology (e.g., ectopic pregnancy, endometriosis).' },
          { title: 'Intervention', description: 'Perform necessary interventions such as salpingectomy for an ectopic pregnancy, biopsy of suspicious lesions, or ablation of endometriotic implants.' },
          { title: 'Closure', description: 'Ensure meticulous hemostasis. Deflate the pneumoperitoneum completely to minimize post-operative shoulder pain. Close the port sites with absorbable sutures.' }
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
        guide: [
          { title: 'Access', description: 'Perform a wide, radical excision of the vulva, including the primary tumor and a margin of normal tissue.' },
          { title: 'Lymphectomies', description: 'Perform bilateral inguinal and femoral lymph node dissections through separate or confluent incisions.' },
          { title: 'Closure', description: 'Achieve a tension-free closure using rotational or transpositional flaps (e.g., V-Y plasty) if necessary. Meticulous hemostasis and drainage.' }
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
        guide: [
          { title: 'Access', description: 'Emergency midline or Pfannenstiel laparotomy. Rapid evacuation of hemoperitoneum.' },
          { title: 'Control', description: 'Identify the bleeding tube and clamp the mesosalpinx.' },
          { title: 'Resection', description: 'Perform a salpingectomy or salpingotomy. Thorough peritoneal lavage.' }
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
        guide: [
          { title: 'Preparation', description: 'Use a trephine to remove the diseased central portion of the patient\'s cornea (host cornea).' },
          { title: 'Donor Prep', description: 'Prepare a matching donor corneal button from the donor tissue using a trephine of the same or slightly larger size.' },
          { title: 'Suturing', description: 'Place the donor graft onto the host eye and secure it with multiple fine sutures (e.g., 10-0 or 11-0 Nylon) in a continuous or interrupted pattern.' },
          { title: 'Closure', description: 'Ensure the graft is watertight and centered. Reform the anterior chamber with balanced salt solution (BSS) or air. Apply topical antibiotics and steroids.' }
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
        guide: [
          { title: 'Access', description: 'Perform an "open" rhinoplasty with a small columellar incision and internal marginal incisions, or a "closed" approach with only internal incisions.' },
          { title: 'Reshaping', description: 'Elevate the nasal skin and soft tissue. Use specialized instruments to reshape the nasal bones (osteotomy) and modify the septal and alar cartilages.' },
          { title: 'Grafting', description: 'If necessary, harvest and place cartilage grafts (from the septum, ear, or rib) to provide structural support or improve nasal contour.' },
          { title: 'Closure', description: 'Close the columellar and internal incisions with fine sutures. Place internal nasal splints (if needed) and an external thermoplastic splint to maintain the new shape.' }
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
        guide: [
          { title: 'Access', description: 'Perform a laparoscopic (transperitoneal or retroperitoneal) approach for smaller tumors, or an open midline/subcostal incision for larger or malignant masses.' },
          { title: 'Mobilization', description: 'Carefully mobilize the adjacent organs (liver/spleen and kidney) to expose the adrenal gland and its vascular supply.' },
          { title: 'Vascular Control', description: 'Identify and ligated the adrenal vein early, especially in cases of pheochromocytoma, to prevent massive catecholamine release during manipulation.' },
          { title: 'Removal', description: 'Dissect the gland off the surrounding retroperitoneal fat and the superior pole of the kidney, ensuring the capsule remains intact.' }
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
        guide: [
          { title: 'Incision', description: 'Make a large cervical incision (e.g., MacFee, "Y" or "U" shaped) to provide broad exposure of the neck levels.' },
          { title: 'Dissection', description: 'Systematically remove lymph nodes and fibrofatty tissue from specific neck levels (I-V), depending on the extent of the disease (radical, modified radical, or selective).' },
          { title: 'Preservation', description: 'Carefully identify and preserve critical structures, such as the spinal accessory nerve (CN XI), internal jugular vein (IJV), and sternocleidomastoid muscle (SCM), if oncologically safe.' },
          { title: 'Closure', description: 'Ensure meticulous hemostasis. Place one or more large-bore suction drains to prevent hematoma or seroma formation. Close the skin in layers.' }
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
        guide: [
          { title: 'Access', description: 'Perform a transverse skin incision between the cricoid cartilage and the sternal notch, or use a percutaneous needle and dilator technique under bronchoscopic guidance.' },
          { title: 'Exposure', description: 'Dissect through the subcutaneous tissue and strap muscles. Divide or retract the thyroid isthmus if it obstructs the view of the trachea.' },
          { title: 'Incision', description: 'Creation of a tracheal window or slit, typically between the second and third or third and fourth tracheal rings.' },
          { title: 'Insertion', description: 'Insertion of the tracheostomy tube and confirmation of position.' }
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
        guide: [
          { title: 'Incision', description: 'Make a wide, "U-shaped" or "apron" cervical incision to expose the larynx and the major vessels of the neck.' },
          { title: 'Dissection', description: 'Mobilization of the larynx and division of attachments. Identify and preserve the carotid arteries and internal jugular veins.' },
          { title: 'Tracheostomy', description: 'Divide the trachea and create a permanent end-stoma (tracheostome) at the base of the neck.' },
          { title: 'Removal', description: 'Remove the entire larynx, including the thyroid and cricoid cartilages and the hyoid bone. Close the pharyngeal defect (neopharynx) in multiple layers.' }
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
        guide: [
          { title: 'Access', description: 'Perform a right posterolateral thoracotomy (usually via the 4th intercostal space) or a thoracoscopic approach to access the posterior mediastinum.' },
          { title: 'Ligation', description: 'Identify the tracheoesophageal fistula (TEF), typically at or just above the carina. Carefully ligated and divide the fistula.' },
          { title: 'Anastomosis', description: 'Mobilize the upper and lower esophageal pouches. Perform a primary end-to-end anastomosis using fine, absorbable sutures over a feeding tube.' },
          { title: 'Closure', description: 'Place a small chest drain near the anastomosis (but not touching it). Reapproximate the ribs and close the muscle layers and skin.' }
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
        guide: [
          { title: 'Access', description: 'Subcostal incision. Reduce abdominal contents (bowel, spleen, stomach) from the thorax.' },
          { title: 'Repair', description: 'Closure of the diaphragmatic defect (Bochdalek) using primary suture or a mesh patch.' },
          { title: 'Observation', description: 'Ensure the lung on the affected side has space to expand (though it is often hypoplastic).' }
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
        guide: [
          { title: 'Protection', description: 'Ensure the exposed bowel is covered with sterile, warm saline dressings or a silo immediately after birth.' },
          { title: 'Reduction', description: 'Gradually reduce the bowel into the abdominal cavity. This may be done in stages (Silo) or as a primary closure.' },
          { title: 'Closure', description: 'Perform an anatomical closure of the abdominal wall defect once the intra-abdominal pressure is safe.' }
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
        guide: [
          { title: 'Access', description: 'Transverse supra-umbilical incision. Identify segments of necrotic or perforated bowel.' },
          { title: 'Resection', description: 'Resect all non-viable bowel while preserving as much length as possible (to avoid Short Bowel Syndrome).' },
          { title: 'Stoma', description: 'Usually requires the creation of one or more enterostomies.' }
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
        guide: [
          { title: 'Access', description: 'Expose the oral cavity using a specialized mouth gag (e.g., Dingman).' },
          { title: 'Dissection', description: 'Mobilize the soft tissues and muscles (levator palati) of the lip or palate.' },
          { title: 'Repair', description: 'Perform a meticulous, layered anatomical reconstruction to restore function and appearance.' }
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
        guide: [
          { title: 'Access', description: 'Perform a right subcostal or midline laparotomy.' },
          { title: 'Excision', description: 'Systematically dissect and remove the dilated extrahepatic bile duct (choledochal cyst).' },
          { title: 'Reconstruction', description: 'Perform a Roux-en-Y hepaticojejunostomy to restore biliary drainage.' }
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
        guide: [
          { title: 'Access', description: 'Perform a midline laparotomy (in trauma) or a left subcostal (Kocher) incision for elective cases to provide optimal access to the left upper quadrant.' },
          { title: 'Mobilization', description: 'Systematically divide the splenocolic, splenorenal, splenophrenic, and gastrosplenic ligaments to fully mobilize the spleen from its attachments.' },
          { title: 'Vascular Control', description: 'Carefully identify and ligated the splenic artery and vein at the splenic hilum, taking care to avoid injury to the tail of the pancreas.' },
          { title: 'Removal', description: 'Remove the spleen and perform a thorough inspection of the splenic bed for any remaining bleeding points. Ensure the pancreatic tail is intact and dry.' }
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
        guide: [
          { title: 'Abbreviated Laparotomy', description: 'Perform a rapid midline incision. Stop massive hemorrhage (packing/clamping) and control contamination (ligation).' },
          { title: 'Temporary Closure', description: 'Perform "Bogota bag" or vacuum-assisted closure. Do NOT attempt definitive repair.' },
          { title: 'Resuscitation', description: 'Transfer patient to ICU for correction of the "Lethal Triad" (Acidosis, Coagulopathy, Hypothermia).' }
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
        guide: [
          { title: 'Incison', description: 'Left anterolateral thoracotomy in the 4th/5th intercostal space.' },
          { title: 'Access', description: 'Identify the heart. Pericardiotomy if tamponade suspected.' },
          { title: 'Intervention', description: 'Internal cardiac massage, cross-clamping of the descending aorta, or Repair of cardiac injury.' }
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
        guide: [
          { title: 'Incision', description: 'Perform a Pfannenstiel (horizontal) or Joel-Cohen incision to access the abdominal cavity. Systematically divide the subcutaneous tissue, fascia, and rectus muscles.' },
          { title: 'Uterotomy', description: 'Create a low transverse incision in the lower uterine segment. Carefully extend the incision laterally, taking care to avoid injury to the uterine vessels.' },
          { title: 'Delivery', description: 'Gently deliver the fetal head and body through the hysterotomy. Suction the neonate\'s airway if needed and perform delayed cord clamping if appropriate.' },
          { title: 'Closure', description: 'Perform a two-layer closure of the hysterotomy using absorbable sutures. Systematically close the peritoneum, fascia, and skin in a layered fashion.' }
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
        guide: [
          { title: 'Positioning', description: 'Place the patient in the lithotomy position and ensure adequate exposure of the cervix using a weighted speculum or retractors.' },
          { title: 'Exposure', description: 'Systematically visualize the cervix and identify the cervicovaginal junction. Carefully dissect the bladder away from the anterior cervix if needed.' },
          { title: 'Suturing', description: 'Place a non-absorbable suture (e.g., Mersilene tape) around the cervix at the level of the internal os using the McDonald or Shirodkar technique.' },
          { title: 'Closure', description: 'Securely tie the suture and ensure the cervix is sufficiently closed. Perform a final inspection for any bleeding or injury before removing the speculum.' }
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
        guide: [
          { title: 'Decision', description: 'Typically performed for intractable hemorrhage (e.g., Atony, Placenta Accreta Spectrum, Uterine Rupture).' },
          { title: 'Access', description: 'Extension of existing C-section incision or midline laparotomy.' },
          { title: 'Ligation', description: 'Rapid clamping and ligation of the broad ligament, uterine, and ovarian vessels.' },
          { title: 'Removal', description: 'Total or subtotal hysterectomy while managing massive blood loss.' }
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
        guide: [
          { title: 'Incision', description: 'Usually a Pfannenstiel or midline if high bleeding risk. Surgeon avoids the placenta during uterine incision.' },
          { title: 'Delivery', description: 'Rapid delivery of the neonate while managing placental hemorrhage.' },
          { title: 'Hemostasis', description: 'Meticulous control of the placental bed. High risk of placenta accreta spectrum.' }
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
          { title: 'Access', description: 'Perform a VATS approach or insert a chest drain (for chemical pleurodesis) into the pleural space.' },
          { title: 'Drainage', description: 'Ensure complete drainage of any pleural effusion or pneumothorax to allow the visceral and parietal pleura to come into contact.' },
          { title: 'Sclerosant', description: 'Instill a sclerosant (e.g., sterile talc, doxycycline, or bleomycin) or perform mechanical abrasion (pleural scrubbing) to induce inflammation.' },
          { title: 'Drainage', description: 'Re-insert or maintain the chest drain to ensure continuous drainage and maintain lung expansion while the pleurae adhere.' }
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
          { title: 'Exposure', description: 'Cervical incision +/- sternotomy to expose the stenotic or tumor-involved trachea.' },
          { title: 'Division', description: 'Divide the trachea below the lesion. Distal trachea is intubated "on the field" by the surgeon.' },
          { title: 'Anastomosis', description: 'The two ends of the trachea are sutured together. Chin-to-chest stitch (Grillo stitch) used to limit extension.' }
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
      {
        id: 'lung-transplant',
        name: 'Lung Transplantation (Single/Bilateral)',
        guide: [
          { title: 'Access', description: 'Lateral thoracotomy (Single) or Clamshell incision (Bilateral).' },
          { title: 'Isolation', description: 'Establishment of CPB or ECMO if the patient cannot tolerate one-lung ventilation of the native/failing lung.' },
          { title: 'Anastomoses', description: 'Bronchial first, then pulmonary artery, then left atrial cuff (pulmonary veins).' }
        ],
        anestheticConsiderations: [
          'Severe pulmonary hypertension: High risk of RV failure during cross-clamping of the pulmonary artery.',
          'Shared airway: Meticulous placement of Double Lumen Tube (DLT) or Bronchial Blocker.',
          'Fluids: Strict restriction to minimize reperfusion injury ("Primary Graft Dysfunction").',
          'CPB/ECMO standby: Critical for bilateral cases or if RV fails upon clamping.'
        ],
        antibioticProphylaxis: {
          drug: 'Piperacillin-Tazobactam + Caspofungin',
          dosage: '4.5g + 70mg IV',
          timing: 'At induction',
          alternatives: 'Meropenem'
        },
        complications: {
          surgical: ['Primary Graft Dysfunction (PGD)', 'Bronchial anastomotic leak', 'Hemorrhage', 'RV failure'],
          anesthetic: ['RV failure post-clamping', 'Hypoxia during OLV', 'Arrythmias']
        },
        management: {
          preOp: ['Review latest ABG/PFTs', 'Confirm HLA crossmatch'],
          intraOp: ['TEE for RV function', 'NO/Epoprostenol ready', 'Maintenance of high MAP (BP for RV)'],
          postOp: ['ICU management', 'Protective ventilation (low volumes)', 'Immunosuppression protocol']
        }
      }
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
          { title: 'Access', description: 'Percutaneous or minor cutdown of femoral arteries. Can be done under local/regional or general anesthesia.' },
          { title: 'Deployment', description: 'Stent-graft is advanced via fluoroscopy. Brief breath hold or transient induced hypotension may be required for precise deployment.' },
          { title: 'Completion', description: 'Confirm graft position and absence of endoleaks with contrast angiography.' }
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
          { title: 'Incision', description: 'Groin and lower leg incisions. High risk of blood loss if redo procedure or complex dissection.' },
          { title: 'Grafting', description: 'Saphenous vein harvest or synthetic graft. Heparinize prior to clamping.' },
          { title: 'Tunneling & Anastomosis', description: 'Tunneling is stimulating. Clamping in the leg causes less systemic change than aorta, but still risks reperfusion toxins upon unclamping.' }
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
          { title: 'Access & Wires', description: 'Femoral access, possible brachial access. Guide wires placed.' },
          { title: 'Spinal Drain placement', description: 'A lumbar CSF drain is often placed pre-op to prevent spinal cord ischemia (keep CSF pressure < 10-15 mmHg).' },
          { title: 'Deployment', description: 'Rapid Ventricular Pacing (RVP) or Adenosine may be used to temporarily stop cardiac output (induce transient asystole) for precise graft deployment in the moving aortic arch.' },
          { title: 'Completion', description: 'Reverse pacing, resuscitate if needed, confirm seal.' }
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
          { title: 'Vessel Mapping', description: 'Ultrasound mapping of arm veins and arteries.' },
          { title: 'Anastomosis', description: 'Connecting the artery and vein. Usually done in the forearm or upper arm.' }
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
          { title: 'Arrival', description: 'Patient presents in hemorrhagic shock. Do NOT induce anesthesia until the surgeon is scrubbed and holding a knife; loss of sympathetic tone upon induction will cause cardiovascular collapse.' },
          { title: 'Aortic Control', description: 'Immediate laparotomy and supra-celiac aortic cross-clamping to stop the bleeding, or REBOA (Resuscitative Endovascular Balloon Occlusion of the Aorta) deployment.' },
          { title: 'Resuscitation', description: 'Massive transfusion protocol (MTP). Treat coagulopathy, hypothermia, and acidosis (Lethal Triad).' },
          { title: 'Repair', description: 'Graft placement once bleeding is controlled.' }
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
          { title: 'Incision', description: 'Groin and distal leg incisions (often small for vein harvest).' },
          { title: 'Grafting', description: 'Creation of a bypass graft using the saphenous vein (in-situ or reversed) or a synthetic graft.' },
          { title: 'Anastomosis', description: 'Microvascular or fine suturing of the graft to a distal crural artery.' }
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
    id: 'dental-maxillofacial',
    name: 'Dental & Maxillofacial',
    generalConsiderations: {
      preOp: [
        'Assess for difficult airway (Micrognathia, limited opening)',
        'Check for loose teeth and dental work',
        'Assess for nasal patency (if nasal intubation planned)',
        'Review for OSA (Obstructive Sleep Apnea)'
      ],
      intraOp: [
        'Shared airway: Coordinate closely with the surgeon for tube placement and protection.',
        'Nasal Intubation: Use vasoconstrictors (e.g., Cocaine/Xylometazoline) and dilation to minimize epistaxis.',
        'Throat Pack: Ensure it is clearly documented upon insertion and removed before extubation.',
        'Vagal Reflexes: Monitor for bradycardia during surgical manipulation of the jaw or eyes.',
        'Anticipate significant bleeding during maxillary/mandibular osteotomies.'
      ],
      postOp: [
        'Smooth extubation with intact reflexes to prevent aspiration of blood/secretions.',
        'Wire Cutters: If the jaw is wired shut (IMMF), wire cutters MUST be at the bedside.',
        'Elevation: Keep the head of the bed elevated to reduce facial edema.',
        'Steroids: Administer Dexamethasone intra-operatively to minimize postoperative swelling.'
      ]
    },
    procedures: [
      {
        id: 'wisdom-teeth',
        name: 'Wisdom Teeth Extraction (Surgical)',
        guide: [
          { title: 'Access', description: 'Incision and flap elevation to expose the impacted tooth.' },
          { title: 'Removal', description: 'Bone removal (guttering) and tooth sectioning if necessary.' },
          { title: 'Closure', description: 'Irrigation and suturing of the socket/flap.' }
        ],
        anestheticConsiderations: [
          'Airway: Nasal ETT or Oral ETT (positioned away from surgical site).',
          'Bleeding: Risk of occult bleeding and aspiration into the pharynx.',
          'Post-op Pain: LA infiltration (e.g., Marcaine) significantly reduces emergence agitation.',
          'Avoid NSAIDs if bleeding is a concern.'
        ],
        antibioticProphylaxis: {
          drug: 'Amoxicillin + Clavulanic Acid',
          dosage: '1.2g IV',
          timing: 'At induction',
          alternatives: 'Clindamycin'
        },
        complications: {
          surgical: ['Nerve injury (Inferior Alveolar/Lingual)', 'Bleeding', 'Dry socket', 'Infection'],
          anesthetic: ['Shared airway issues', 'Laryngospasm', 'PONV']
        },
        management: {
          preOp: ['Confirm NPO', 'Review dental X-rays'],
          intraOp: ['Document throat pack', 'Gentle suctioning', 'Control BP'],
          postOp: ['Extubate in lateral position', 'Verify throat pack removal']
        }
      },
      {
        id: 'jaw-orif',
        name: 'Mandibular / Maxillary ORIF',
        guide: [
          { title: 'Access', description: 'Intraoral or extraoral incision to expose the fracture site.' },
          { title: 'Reduction', description: 'Manual or instrumental reduction of the fracture into anatomical position.' },
          { title: 'Fixation', description: 'Application of titanium plates and screws. Possible intermaxillary fixation (IMMF).' }
        ],
        anestheticConsiderations: [
          'Difficult Airway: Potential for limited mouth opening and blood in the airway.',
          'Nasal Intubation: Typically mandatory to allow for IMMF (wiring the jaw).',
          'Bleeding: Significant blood loss can occur with complex facial fractures.',
          'Wire Cutters: Essential at extubation if the patient is in IMMF.'
        ],
        antibioticProphylaxis: {
          drug: 'Clindamycin or Cefazolin',
          dosage: '600mg or 2g IV',
          timing: 'At induction',
          alternatives: 'Metronidazole'
        },
        complications: {
          surgical: ['Malocclusion', 'Nerve injury', 'Hardware infection', 'CSF leak (if skull base fracture)'],
          anesthetic: ['Nasal trauma/bleeding', 'Airway obstruction post-op']
        },
        management: {
          preOp: ['Assess for associated injuries (Head, Spine)', 'Check neck mobility'],
          intraOp: ['Nasal intubation (Fiberoptic or GlideScope)', 'Maintain high index of suspicion for VAE', 'Regular Hgb checks'],
          postOp: ['Ensure wire cutters at bedside', 'Steroids for edema', 'Analgesia (IV PCA)']
        }
      },
      {
        id: 'le-fort',
        name: 'Le Fort Osteotomy (Facial Advancement)',
        guide: [
          { title: 'Osteotomy', description: 'Systematic bone cuts (Le Fort I, II, or III) to separate the maxilla/midface from the skull base.' },
          { title: 'Mobilization', description: 'Downfracture and advancement of the facial segment into the desired position.' },
          { title: 'Fixation', description: 'Plating and grafting to secure the midface in its new position.' }
        ],
        anestheticConsiderations: [
          'Major hemorrhage: Significant risk of rapid, massive blood loss (Internal Maxillary Artery).',
          'Airway: Nasal intubation required. Risk of tube dislodgment during midface manipulation.',
          'Strict BP Control: Deliberate hypotension (MAP 60-65) to reduce surgical site bleeding.',
          'Post-op: Meticulous airway management; facial edema can be massive.'
        ],
        antibioticProphylaxis: {
          drug: 'Cefuroxime',
          dosage: '1.5g IV',
          timing: 'At induction',
          alternatives: 'Vancomycin'
        },
        complications: {
          surgical: ['Massive hemorrhage', 'Cranial nerve injury', 'Infection', 'Blindness (rare)'],
          anesthetic: ['Tube displacement', 'Fluid shifts', 'Difficult emergence']
        },
        management: {
          preOp: ['Crossmatch 2-4 units', 'Detailed airway plan'],
          intraOp: ['A-line mandatory', 'Deliberate hypotension', 'Tranexamic Acid (TXA)'],
          postOp: ['Keep intubated if edema severe', 'ICU level care', 'Wire cutters at bedside']
        }
      }
    ]
  },
  {
    id: 'nora-interventional',
    name: 'Interventional & NORA',
    generalConsiderations: {
      preOp: [
        'Assess for shared workspace and remote monitoring',
        'Review for NPO status (often overlooked in wards)',
        'Check for contrast allergy and renal function',
        'Confirm medical stability (patients often high-risk)'
      ],
      intraOp: [
        'Remote Monitoring: Use dedicated extension tubing and non-ferrous equipment (for MRI).',
        'Radiation Safety: Wear lead aprons and thyroid shields; maintain distance from source.',
        'Access: Patient access is significantly restricted (e.g., during MRI or IR procedures).',
        'Sedation vs GA: Tailor according to procedure duration, patient anxiety, and stability.'
      ],
      postOp: [
        'Establish clear recovery criteria (Modified Aldrete score).',
        'Monitor for contrast-induced nephropathy (CIN) or allergic reactions.',
        'Manage procedure-specific pain (e.g., after embolization).',
        'Ensure transport back to primary ward involves appropriate monitoring.'
      ]
    },
    procedures: [
      {
        id: 'ercp',
        name: 'ERCP (Endoscopic Retrograde Cholangiopancreatography)',
        guide: [
          { title: 'Access', description: 'Patient typically in prone or semi-prone position. Insertion of side-viewing endoscope.' },
          { title: 'Cannulation', description: 'Entering the Ampulla of Vater and injecting contrast for fluoroscopy.' },
          { title: 'Therapy', description: 'Sphincterotomy, stone extraction, or stent placement.' }
        ],
        anestheticConsiderations: [
          'Prone / Semi-prone position: High risk of airway loss and aspiration.',
          'Shared airway: Surgeon and anesthetist compete for the oral cavity.',
          'Aspiration: High risk due to procedure nature and potentially full stomach.',
          'Sedation vs GA: GA with ETT is safer for at-risk patients or long procedures.'
        ],
        antibioticProphylaxis: {
          drug: 'Gentamicin or Cefuroxime',
          dosage: '120mg or 1.5g IV',
          timing: 'If biliary obstruction present',
          alternatives: 'Ciprofloxacin'
        },
        complications: {
          surgical: ['Pancreatitis (common)', 'Perforation', 'Hemorrhage', 'Sepsis'],
          anesthetic: ['Aspiration', 'Hypoxia (positional)', 'PONV']
        },
        management: {
          preOp: ['Check coagulation (INR/Plt)', 'Review for difficult airway'],
          intraOp: ['Oxygen via nasal prongs (if sedation)', 'Suction ready', 'Monitoring for bradycardia'],
          postOp: ['Monitor for lipase rise/pancreatitis pain', 'Recovery in lateral position']
        }
      },
      {
        id: 'mri-sedation',
        name: 'MRI Sedation / General Anesthesia',
        guide: [
          { title: 'Preparation', description: 'Complete MRI safety screening (implants/pacemakers). Use non-ferrous equipment.' },
          { title: 'Monitoring', description: 'Fibreoptic pulse oximetry and specialized MRI-compatible ECG/BP cables.' },
          { title: 'Maintenance', description: 'Induction outside the magnet, then transport and maintain during scanning.' }
        ],
        anestheticConsiderations: [
          'Magnet Safety: ALL equipment must be MR-Conditional (Aluminium cylinders, non-ferrous pumps).',
          'Remote Access: Patient is 50-100 feet away in a tunnel; use long tubing and monitoring extensions.',
          'Hypothermia: MRI suites are kept cold; monitor and warm patient.',
          'Acoustic Noise: High decibel levels; provide ear protection for the patient.'
        ],
        antibioticProphylaxis: { drug: 'None routinely', dosage: '-', timing: '-', alternatives: '-' },
        complications: {
          surgical: ['Image artifact from patient movement'],
          anesthetic: ['Projectile incidents (from ferrite objects)', 'Burn injuries (from looped cables)', 'Loss of airway in the magnet']
        },
        management: {
          preOp: ['MRI safety questionnaire', 'Confirm non-ferrous monitors'],
          intraOp: ['TIVA preferred (avoids scavenging issues)', 'Strict cable management', 'Ear plugs'],
          postOp: ['Standard recovery monitoring', 'Monitor for thermal injury']
        }
      },
      {
        id: 'cardioversion',
        name: 'DCCV (Direct Current Cardioversion)',
        guide: [
          { title: 'Pads', description: 'Apply defibrillator pads in anterior-posterior or anterior-lateral position.' },
          { title: 'Shock', description: 'Under deep sedation/short GA, deliver a synchronized DC shock.' },
          { title: 'Recovery', description: 'Monitor for successful rhythm conversion and hemodynamic stability.' }
        ],
        anestheticConsiderations: [
          'Short GA: Propofol is usually used for a 3-5 minute duration of deep anesthesia.',
          'Airway: Rapid loss of airway patency; have BVM and simple adjuncts ready.',
          'Hemodynamics: Risk of sudden bradycardia, asystole, or thromboembolism upon conversion.',
          'Confirm anticoagulation status (INR target) before proceeding.'
        ],
        antibioticProphylaxis: { drug: 'None routinely', dosage: '-', timing: '-', alternatives: '-' },
        complications: {
          surgical: ['Failure to convert', 'Skin burns', 'Embolic stroke'],
          anesthetic: ['Respiratory depression', 'Apnea', 'Transient hypertension/hypotension']
        },
        management: {
          preOp: ['Check K+ and Mg2+', 'Confirm NPO', 'Confirm anticoagulation (INR/NOAC)'],
          intraOp: ['BVM with 100% O2', 'Propofol titrating to unresponsive state', 'Monitor ECG immediately post-shock'],
          postOp: ['Observe for 1-2h for rhythm stability', 'Monitor for neurology deficits']
        }
      }
    ]
  }
];
