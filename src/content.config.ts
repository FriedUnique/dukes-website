import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const dish = z.object({
  name: z.string(),                    // z.B. "Menü 2", "Monats-Special"
  tag: z.string().optional(),          // z.B. "Vegetarisch"
  dish: z.string(),
  description: z.string().optional(),
  price: z.string(),                   // z.B. "CHF 19.00"
});

// Eine Datei pro Woche in src/content/wochenmenu/, z.B. 2026-kw42.md
const wochenmenu = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wochenmenu' }),
  schema: z.object({
    week: z.string(),                  // Anzeigetitel, z.B. "KW 42"
    from: z.coerce.date(),             // Montag der Woche
    to: z.coerce.date(),               // Freitag der Woche
    note: z.string().default('Vorspeise inklusive Salat oder Suppe'),
    menu1Price: z.string(),            // Preis Menü 1 (gilt für alle Tage)
    daily: z.array(z.object({          // Menü 1 – wechselt täglich
      day: z.string(),                 // z.B. "Montag"
      soup: z.string().optional(),
      dish: z.string(),
    })),
    specials: z.array(dish).default([]), // z.B. Monats-Special, Dukes Bowle
    menus: z.array(dish).default([]),    // Menü 2 / Menü 3 – ganze Woche gleich
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
    image: z.string().optional(),      // z.B. /events/plakat.jpg (Datei in public/events/)
    price: z.string().optional(),
    draft: z.boolean().default(false), // true = nur lokal (npm run dev) sichtbar
  }),
});

export const collections = { wochenmenu, events };
