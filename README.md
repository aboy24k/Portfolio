# Engineering Scrapbook Portfolio

Astro 7 + Tailwind CSS 4. A single-page portfolio with a paper theme and a blueprint theme.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321/YOUR-REPO-NAME/
npm run build      # outputs to dist/
```

Needs Node 22.12 or newer.

## Things to fill in (search the code for TODO)

| What | Where |
| --- | --- |
| GitHub username and repo name | `astro.config.mjs` (`site` and `base`) |
| LinkedIn URL | `src/data/profile.ts` |
| Resume PDF | save as `public/resume.pdf` |
| Dates for the co-op and degree | `src/data/profile.ts` (`timeline`, `period`) |
| Project photos | `public/images/`, then `cover:` in each project's frontmatter |
| Results, photos, and extra detail | the Markdown body of each file in `src/content/projects/` |

## Add a project

Drop a new `.md` file into `src/content/projects/`. The frontmatter becomes the card and the body becomes the modal. Fields are defined in `src/content.config.ts`:

```md
---
title: My new project
summary: One or two sentences for the card.
context: Where it happened
order: 5
tags: [SolidWorks, Arduino]
alsoUses: [Rapid Prototyping]   # matches the skills matrix, not shown as pills
cover: images/my-photo.jpg
caption: handwritten caption
badge: 1st place                # optional stamp
links:
  - label: View report
    url: /reports/my-report.pdf
---

## What I built
...
```

### Photos and figures

- **Card photo:** put the image in `public/images/` and set `cover: images/your-file.jpg` in the frontmatter. An `.svg` works too.
- **Photos inside the case study:** put them in `src/assets/projects/<project-name>/` and reference them from the Markdown body with a relative path:
  `![What the photo shows](../../assets/projects/<project-name>/photo.jpg)`.
  Astro compresses them and adds your GitHub Pages base path automatically. An italic line straight after an image becomes its handwritten caption, and two images in the same paragraph sit side by side.

To make a new tag show up in the skills matrix, add the same word to `skillGroups` in `src/data/profile.ts`. Files starting with `_` and projects with `draft: true` are hidden.

## Deploy to GitHub Pages

1. Set `site` and `base` in `astro.config.mjs`.
2. Push to `main`.
3. In the repo, go to Settings, then Pages, and set Source to "GitHub Actions".

`.github/workflows/deploy.yml` builds and publishes on every push.

## Project map

```
astro.config.mjs               GitHub Pages config, Tailwind plugin
src/content.config.ts          Project frontmatter schema
src/content/projects/*.md      Case studies
src/data/profile.ts            Name, contact, skills, timeline
src/pages/index.astro          The page
src/components/ProjectCard.astro   Polaroid card and modal
src/components/SkillsMatrix.astro  Pins and project highlighting
src/components/Scope.astro         Hero oscilloscope trace
src/components/StampRing.astro     Round rubber stamp with rim text
src/styles/global.css          Tokens (both themes) and component styles
```
