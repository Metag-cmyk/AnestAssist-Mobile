import React from 'react';
import { matchRanges } from '../lib/search';

interface HighlightProps {
  text: string;
  query: string;
  className?: string;
}

/**
 * Renders `text` with every occurrence of the search `query` highlighted.
 * Non-matching text is returned untouched, so it is safe to use unconditionally.
 */
export function Highlight({ text, query, className }: HighlightProps) {
  const ranges = matchRanges(text, query);
  if (ranges.length === 0) return <>{text}</>;

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach(([start, end], i) => {
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <mark key={i} className={className ?? 'bg-amber-200/70 text-inherit rounded-sm'}>
        {text.slice(start, end)}
      </mark>
    );
    cursor = end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));

  return <>{nodes}</>;
}

export default Highlight;
