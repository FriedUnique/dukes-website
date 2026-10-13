import { getCollection } from 'astro:content';

/** Aktuelle Woche (letzte, die schon begonnen hat), sonst die nächste. */
export async function getCurrentMenu() {
  const weeks = (await getCollection('wochenmenu')).sort((a, b) => +a.data.from - +b.data.from);
  const now = Date.now();
  return [...weeks].reverse().find((w) => +w.data.from <= now) ?? weeks[0];
}

/** Alle Veranstaltungen chronologisch; Entwürfe nur im Dev-Modus. */
export async function getEvents() {
  return (await getCollection('events', (e) => import.meta.env.DEV || !e.data.draft))
    .sort((a, b) => +a.data.date - +b.data.date);
}

export const isoDay = (d: Date) => d.toISOString().slice(0, 10);
export const fmtDay = (d: Date) => d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', timeZone: 'UTC' });
