import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * PROJECTS COLLECTION
 * ----------------------------------------------------------------------------
 * To add a project, drop a new .md file into src/content/projects/.
 * The frontmatter below becomes the card; the Markdown body becomes the
 * deep-dive that opens in the modal. Nothing else needs to change.
 * Files that start with an underscore (e.g. _draft.md) are ignored.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    // Card text
    title: z.string(),
    summary: z.string().describe('One or two sentences shown on the card.'),
    context: z.string().optional().describe('e.g. "Co-op at Leo Flight". Shown under the title.'),
    period: z.string().optional().describe('e.g. "Summer 2025". Shown in the modal.'),

    // Skill pills. These also drive the skills-matrix highlighting, so use the
    // same spelling as the skill names in src/data/profile.ts (case-insensitive).
    tags: z.array(z.string()).min(1),
    // Extra keywords that should match the skills matrix but not appear as pills.
    alsoUses: z.array(z.string()).default([]),

    // Polaroid photo. Either:
    //   - a path inside /public, e.g. "images/gyro-rig.jpg"  (base path is added for you)
    //   - a full URL, e.g. "https://example.com/photo.jpg"
    // Leave it out to show the blueprint placeholder.
    cover: z.string().optional(),
    coverAlt: z.string().default(''),
    caption: z.string().optional().describe('Handwritten caption under the photo.'),

    // Small stamp on the card, e.g. "2nd place".
    badge: z.string().optional(),

    // Buttons at the bottom of the modal (repo, demo, report PDF...).
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),

    // Lower numbers come first.
    order: z.number().default(99),
    // Set to true to hide a project without deleting the file.
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
