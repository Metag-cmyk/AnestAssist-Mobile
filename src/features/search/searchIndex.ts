import { CONDITIONS_DATA } from '../conditions/data';
import { SURGERY_DATA } from '../surgery/data';
import { REGIONAL_BLOCKS } from '../regional/data';
import { CLINICAL_SCORES } from '../scores/data';
import { DIAGRAM_GUIDELINES } from '../guidelines/data';
import { flattenStrings, splitTerms } from '../../lib/search';
import { STORAGE_KEYS } from '../../config/storageKeys';

export type SearchEntryType = 'Condition' | 'Procedure' | 'Block' | 'Score' | 'Guideline';

export interface SearchEntry {
  /** Unique key. */
  key: string;
  type: SearchEntryType;
  title: string;
  subtitle: string;
  /** Route to navigate to. */
  route: string;
  /** localStorage key + value used to pre-select the item in its module. */
  selectKey?: string;
  selectValue?: string;
  /** Lowercased searchable text (title + subtitle + nested strings). */
  haystack: string;
}

function makeEntry(
  type: SearchEntryType,
  route: string,
  id: string,
  title: string,
  subtitle: string,
  extra: unknown[],
  selectKey?: string,
): SearchEntry {
  const haystack = [title, subtitle, ...flattenStrings(extra)].join('\n').toLowerCase();
  return { key: `${type}:${id}`, type, title, subtitle, route, selectKey, selectValue: id, haystack };
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  CONDITIONS_DATA.forEach(c => entries.push(makeEntry(
    'Condition', '/conditions', c.id, c.name, c.category,
    [c.diagnosis, c.immediateActions, c.differentialDiagnosis ?? []],
    STORAGE_KEYS.CONDITIONS_SELECTED_ID,
  )));

  SURGERY_DATA.forEach(s => s.procedures.forEach(p => entries.push(makeEntry(
    'Procedure', '/surgery', p.id, p.name, s.name,
    [p.anestheticConsiderations, p.recommendedBlocks ?? [], p.guide.map(g => g.title)],
    STORAGE_KEYS.SURGERY_SELECTED_ID,
  ))));

  REGIONAL_BLOCKS.forEach(b => entries.push(makeEntry(
    'Block', '/regional', b.id, b.name, b.category,
    [b.indications, b.anatomy],
    STORAGE_KEYS.REGIONAL_SELECTED_ID,
  )));

  CLINICAL_SCORES.forEach(sc => entries.push(makeEntry(
    'Score', '/scores', sc.id, sc.name, sc.category,
    [sc.description],
    STORAGE_KEYS.SCORES_SELECTED_ID,
  )));

  DIAGRAM_GUIDELINES.forEach(g => entries.push(makeEntry(
    'Guideline', '/guidelines', g.id, g.title, `Guideline · ${g.source}`,
    [g.steps.map(step => [step.title, step.description])],
    STORAGE_KEYS.GUIDELINES_SELECTED_ID,
  )));

  return entries;
}

/** The full cross-module index. Loaded on demand with the search palette. */
export const SEARCH_INDEX: SearchEntry[] = buildIndex();

function scoreEntry(entry: SearchEntry, terms: string[]): number {
  if (!terms.every(t => entry.haystack.includes(t))) return 0;
  const title = entry.title.toLowerCase();
  let score = 1;
  terms.forEach(t => {
    if (title.includes(t)) score += 5;
    if (title.startsWith(t)) score += 3;
  });
  return score;
}

/**
 * Searches the whole library. Results are ranked by title relevance and capped
 * per content type so a single module cannot dominate the list.
 */
export function searchEntries(query: string, perTypeLimit = 6): SearchEntry[] {
  const terms = splitTerms(query);
  if (terms.length === 0) return [];

  const ranked = SEARCH_INDEX
    .map(entry => ({ entry, score: scoreEntry(entry, terms) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const counts: Partial<Record<SearchEntryType, number>> = {};
  const results: SearchEntry[] = [];
  for (const { entry } of ranked) {
    counts[entry.type] = (counts[entry.type] ?? 0) + 1;
    if (counts[entry.type]! <= perTypeLimit) results.push(entry);
  }
  return results;
}
