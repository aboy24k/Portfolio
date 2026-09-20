/**
 * Prefix a site-relative path (e.g. "images/gyro.jpg" or "/resume.pdf") with
 * the configured `base`, so links keep working on a GitHub Pages project site
 * served from /<repo-name>/. Absolute URLs (https://...) pass through untouched.
 */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
