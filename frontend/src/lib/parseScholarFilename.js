const PERCENT_PATTERN = /^(\d{1,3}(?:\.\d{1,2})?%)\s+(.+)$/;
const DASH_PREFIX_PATTERN = /^.+?\s-\s+(.+)$/;

// Best-effort guess at a scholar's name (and score, if present) from a photo
// filename like "90.17%  Mahima Galani.png" or "Univ - Anjali Lilwani.png".
// Anything it gets wrong is meant to be corrected by hand in the bulk-upload
// preview table, so this stays a helpful default rather than a strict parser.
export function parseScholarFilename(filename) {
  const withoutExtension = filename.replace(/\.[^.]+$/, '').trim();

  const percentMatch = withoutExtension.match(PERCENT_PATTERN);
  if (percentMatch) {
    return { score: percentMatch[1], name: percentMatch[2].trim().replace(/\s+/g, ' ') };
  }

  const dashMatch = withoutExtension.match(DASH_PREFIX_PATTERN);
  if (dashMatch) {
    return { score: '', name: dashMatch[1].trim().replace(/\s+/g, ' ') };
  }

  return { score: '', name: withoutExtension.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim() };
}
