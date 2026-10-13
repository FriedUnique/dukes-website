import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const wochenmenu = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wochenmenu' }),
  schema: z.object({
    week: z.string(),
    items: z.array(z.object({ day: z.string(), dish: z.string(), price: z.string() })),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    area: z.string().optional(),
  }),
});

export const collections = { wochenmenu, events };
