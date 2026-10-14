import { describe, it, expect, afterEach } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { PatientProvider } from '../contexts/PatientContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import MainContent from '../components/layout/MainContent';

/**
 * Renders every lazily-loaded route and asserts that its module mounts (its
 * marker text appears) and that the per-route ErrorBoundary did not trigger.
 */

const ROUTES: Array<{ path: string; marker: string }> = [
  { path: '/guidelines', marker: 'Select a Guideline' },
  { path: '/patient', marker: 'Clinical Indices' },
  { path: '/scores', marker: 'Select a Score' },
  { path: '/surgery', marker: 'Select Procedure' },
  { path: '/conditions', marker: 'Select a Protocol' },
  { path: '/therapies', marker: 'ICU & Anesthesia Therapies' },
  { path: '/ventilator', marker: 'Tidal Volume Reference' },
  { path: '/regional', marker: 'Block Library' },
  { path: '/airway', marker: 'LEMON Assessment' },
  { path: '/fluids', marker: 'Blood Management' },
  { path: '/preop', marker: 'Pre-operative Risk Summary' },
  { path: '/about', marker: 'content sources' },
];

let container: HTMLDivElement | null = null;
let root: Root | null = null;

afterEach(() => {
  if (root) {
    act(() => root!.unmount());
    root = null;
  }
  if (container) {
    container.remove();
    container = null;
  }
  localStorage.clear();
});

async function renderRoute(path: string): Promise<HTMLDivElement> {
  const el = document.createElement('div');
  document.body.appendChild(el);
  container = el;
  root = createRoot(el);
  await act(async () => {
    root!.render(
      <PatientProvider>
        <LanguageProvider>
          <MemoryRouter initialEntries={[path]}>
            <MainContent />
          </MemoryRouter>
        </LanguageProvider>
      </PatientProvider>
    );
  });
  return el;
}

async function waitForText(el: HTMLElement, text: string, timeoutMs = 8000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (el.textContent?.includes(text)) return true;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 25));
    });
  }
  return el.textContent?.includes(text) ?? false;
}

describe('route smoke tests', () => {
  it.each(ROUTES)('renders $path and mounts its module', async ({ path, marker }) => {
    const el = await renderRoute(path);
    const found = await waitForText(el, marker);
    const text = el.textContent ?? '';
    // The per-route ErrorBoundary fallback must not be present.
    expect(text).not.toContain('Something went wrong');
    expect(found, `expected marker "${marker}" to appear on ${path}`).toBe(true);
  }, 20000);
});
