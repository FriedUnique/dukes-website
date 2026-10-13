import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Eine Datei pro Woche in src/content/wochenmenu/, z.B. 2026-kw43.md
const wochenmenu = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wochenmenu' }),
  schema: z.object({
    week: z.string(),            // Anzeigetitel, z.B. "KW 43"
    from: z.coerce.date(),       // Montag der Woche
    items: z.array(z.object({
      day: z.string(),           // z.B. "Montag" oder "Täglich"
      dish: z.string(),
      description: z.string().optional(),
      price: z.string(),         // z.B. "CHF 19.50"
      vegetarian: z.boolean().default(false),
    })),
  }),
});

// Eine Datei pro Veranstaltung in src/content/events/
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),       // z.B. "20:00"
    area: z.enum(['Eventsaal', 'Sihl3 Club', 'Saloon', 'Restaurant', 'Terrasse', 'Fonduestübli']).default('Sihl3 Club'),
    image: z.string().optional(),      // URL oder /pfad in public/
    price: z.string().optional(),
  }),
});

export const collections = { wochenmenu, events };
