# AnestAssist — Anesthesia & ICU Trainee Companion

An offline-first clinical reference and calculator for anaesthesia and intensive-care
trainees. Built as a React + Vite PWA and packaged for Android with Capacitor.

> **Educational use only.** All content is a study/reference aid. Always verify against your
> local hospital protocols, the primary source guidance, and a senior clinician before
> clinical application. Doses and infusion rates must be independently double-checked.

## Features

| Module | Contents |
|---|---|
| **Guidelines** | Visual algorithms and emergency "crisis cards" (ASA, ESAIC, ESICM, DAS, AHA…) |
| **Patient** | IBW/BMI/CrCl, emergency & induction drug doses, antibiotic spectrum matrix |
| **Scores** | 17 clinical scores plus bespoke Thoracic-FIT, Spirometry and Acid–Base calculators |
| **Surgery** | 122 procedures across 18 specialties with airway/EBL/ERAS/block guidance |
| **Conditions** | 76 protocol cards with diagnostic triggers and a differential matrix |
| **Therapies** | Prismaflex CVVHDF, vasoactive infusions (unit-safe rate converter), invasive haemodynamics |
| **Ventilator** | Condition-based lung-protective ventilation targets and waveform teaching |
| **Regional** | 30 ultrasound-guided blocks with LA safety calculator |
| **Airway** | LEMON difficult-airway assessment and age-based equipment sizing |
| **Fluids** | MABL, 4-2-1 maintenance fluids and massive-transfusion reference |

## Tech stack

React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · `motion` · `lucide-react` ·
`react-router-dom` (HashRouter) · `vite-plugin-pwa` · Capacitor 8 (Android).

## Getting started

Prerequisites: Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production bundle in dist/
npm run preview    # preview the build
```

No environment variables are required — the app is fully client-side.

## Quality gates

```bash
npm run lint       # tsc --noEmit (type-check)
npm run test       # vitest: calculators, data integrity, route smoke tests
```

CI runs the type-check, tests and a web build, then produces a debug Android APK
(`.github/workflows/android_build.yml`).

## Project layout

```
src/
  components/     shared UI (layout, patient card, search highlight)
  config/         navigation + central localStorage keys
  contexts/       PatientContext, LanguageContext
  features/       one folder per module (component + static data)
  lib/            pure calculators (dosing, infusion rates, renal, blocks, search)
  data/__tests__/ data-integrity tests
```

## Adding a new infusion drug

Add an entry to `src/features/therapies/infusionProtocols.ts` describing its dose unit
(`{ amount: 'mcg'|'mg'|'units', time: 'min'|'h', perKg }`), therapeutic range, preparations
and safety text. The rate maths in `src/lib/infusionRates.ts` handles the rest.

## Data & privacy

The app collects no personal data, has no analytics and makes no network requests at
runtime. Patient values entered into calculators are stored **only** in your browser's
`localStorage` and never leave the device. "Reset" clears them.

## Licence & attribution

Created as a passion project by **Georgi Georgiev**. Clinical content is compiled from
published society guidance for educational use; consult the original sources before use.
