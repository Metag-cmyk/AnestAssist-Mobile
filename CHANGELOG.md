# Changelog

All notable changes to AnestAssist are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/); versioning: Semantic Versioning.

## [Unreleased]

### Added
- **24 new Conditions protocols** (76 → 99): perioperative (adult cardiac arrest, perioperative
  arrhythmias, post-extubation stridor, airway angioedema, suxamethonium apnoea, residual
  neuromuscular blockade, operating-room fire, post-dural puncture headache, awareness under
  anaesthesia); a new **Hematology** category (HIT, anticoagulation reversal/major bleeding,
  sickle-cell acute chest syndrome); obstetric emergencies (maternal cardiac arrest, placental
  abruption, cord prolapse, shoulder dystocia, magnesium toxicity, uterine rupture); and
  toxicology (TCA overdose, salicylate poisoning, toxic alcohols, organophosphate poisoning,
  digoxin toxicity, cocaine/sympathomimetic toxicity).
- Conditions now link out to related content: the matching crisis/guideline card,
  screening scores (e.g. Sepsis → SOFA/qSOFA) and infusion protocols, via reverse
  cross-links in `lib/crossLinks.ts`.
- **Guidelines library**: surfaced the 58 written guideline summaries (merged with their
  diagrams where a guideline has both), added filter-by-society and filter-by-category,
  and linked each summary to its source society.
- **Trust layer**: per-module content provenance with source links and a review date,
  rendered as a "Sources & review" footer on every page, a "report an error" action,
  and an About & Sources page (app/content version, per-module sources, data & privacy).
- **Airway depth**: DAS-style Plan A–D difficult-airway algorithm, a rapid-sequence
  induction checklist and extubation criteria / high-risk strategy, with cross-links
  to the SARI score and the Pre-op assessment.
- **Fluids depth**: fluid-responsiveness panel (PPV calculator + dynamic-index
  reference) and electrolyte corrections (albumin-corrected calcium, glucose-corrected
  sodium, potassium replacement guide).
- **Pre-op Assessment** module: guided ASA-PS, RCRI, ARISCAT, STOP-BANG, airway and
  Apfel PONV scoring with a live consolidated risk summary, flags/actions and copy.
- Ventilator depth: PBW tidal-volume table, ARDSNet PEEP/FiO₂ ladders, respiratory
  mechanics & oxygenation indices (driving pressure, static compliance, P/F + Berlin
  severity, RSBI) and a spontaneous-breathing-trial readiness checklist.
- Route smoke tests covering all 10 routes (render + no ErrorBoundary fallback).
- Unit tests for the dosing/rate/renal calculators and the differential-diagnosis resolver.
- Deep, nested search (indications, notes, titles…) with in-list match highlighting.
- Unit-safe infusion engine: `lib/infusionRates.ts` with forward/reverse rate maths and
  non-mass `units` support; structured, multi-concentration preparations.
- Expanded infusion formulary (vasopressin, phenylephrine, milrinone, nitroglycerin,
  midazolam, fentanyl, ketamine, heparin, insulin) with clinical dose-range bands.
- Adjusted Body Weight (ABW) as a third dosing-weight basis.
- High-alert confirmation gate, pump-increment rounding and a copy double-check summary.
- Airway (LEMON) and Fluids (MABL / 4-2-1 / MTP) modules are now routed and reachable.

### Changed
- Redesigned the Conditions tab: immediate actions shown first, a severity filter with
  live counts, a category select, a list grouped into sticky category sections with
  per-item action counts, recently-viewed quick chips and favourites, a master–detail
  flow on mobile, and print-friendly output (`print:hidden` chrome + a print button).
- Redesigned the Guidelines layout for clarity: search first, faceted type tabs with
  live counts, society/category filters, a results count with a Clear action, a list
  grouped into sticky category sections with summary previews, and a master–detail
  flow (list → detail with a back button) on mobile.
- Split clinical data so each lazy route loads only its own dataset (removed the 581 KB shared chunk).
- Centralised every `localStorage` key in `src/config/storageKeys.ts`; the infusion and
  haemodynamics tools now persist across navigation.
- Switched to `HashRouter` for correct deep links / cold starts in the Capacitor shell.
- Committed to English: removed the `isTranslationKey` heuristic; all navigation strings are
  translation keys.
- Self-hosted Inter / JetBrains Mono (bundled) so the PWA works fully offline.
- Type-check (`npm run lint`) is now enforced in CI.

### Removed
- Duplicate `pheochromocytoma-crisis` Conditions entry (identical to `pheochromocytoma`).
- Unused `diagnosticTriggers` / `differentialMatrix` fields from `ConditionProtocol`
  (never populated); the differential panel derives entirely from the keyword resolver.
- Dead code: `hooks/useData`, `features/converter`, `features/renal`, `DrugDosageCalculator`,
  `ConfirmationModal`, `lib/RenalCalculators` duplication, the unused Gemini service and its
  dependencies (`@google/genai`, `dotenv`).

### Fixed
- Propofol infusion was weight-independent (70× under-dose) — corrected to mg/kg/h.
- Glasgow-Blatchford Score risk band capped at 20 while the scale reaches 23.
- `calculateIHD` could return a negative Kt/V when post-dialysis urea was not lower.
- Differential resolver misclassified e.g. "Pericardial effusion" as pulmonary embolism.

## [1.0.0] - 2026-10-14

### Added
- Initial AnestAssist release: guidelines/crisis cards, conditions, clinical scores,
  surgery, ventilator, regional anaesthesia, therapies (CVVHDF), patient dosing, PWA + Android.
