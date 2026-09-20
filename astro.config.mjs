// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * GITHUB PAGES DEPLOYMENT
 * ----------------------------------------------------------------------------
 * There are two kinds of GitHub Pages sites. Pick the one that matches you:
 *
 * A) PROJECT SITE  ->  https://<username>.github.io/<repo-name>/
 *      site: 'https://<username>.github.io'
 *      base: '/<repo-name>'
 *
 * B) USER SITE     ->  https://<username>.github.io/
 *    (the repo must be named exactly <username>.github.io)
 *      site: 'https://<username>.github.io'
 *      base: '/'
 *
 * The values below are placeholders. Replace YOUR-GITHUB-USERNAME and
 * YOUR-REPO-NAME, then push to `main`. The workflow in
 * .github/workflows/deploy.yml builds and publishes automatically.
 * (In the repo: Settings -> Pages -> Source -> "GitHub Actions".)
 */
export default defineConfig({
  site: 'https://YOUR-GITHUB-USERNAME.github.io',
  base: '/YOUR-REPO-NAME',

  vite: {
    // Tailwind CSS v4 runs as a Vite plugin (no tailwind.config.js needed).
    // Design tokens live in src/styles/global.css inside the @theme block.
    plugins: [tailwindcss()],
  },
});
