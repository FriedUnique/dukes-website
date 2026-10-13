# dukes Website

Astro + Tailwind. `npm install`, dann `npm run dev` (lokal) bzw. `npm run build` (Ausgabe in `dist/`).

## Farben ändern
`src/styles/global.css` → Block `@theme` (z.B. `--color-ink`, `--color-gold`).

## Wochenmenü pflegen
Neue Datei in `src/content/wochenmenu/`, z.B. `2026-kw44.md`, nach Vorlage von `2026-kw43.md`.
`from` = Montag der Woche. Die Seite zeigt automatisch die aktuelle Woche; spätere Wochen erscheinen als Vorschau.

## Veranstaltungen pflegen
Neue Datei in `src/content/events/`, z.B. `2026-12-silvester.md` (Felder: title, date, time, area, price; Text darunter = Beschreibung).
Vergangene Events werden automatisch ausgeblendet (beim nächsten Build). Zum Löschen einfach die Datei entfernen.

Hinweis: Die Seite ist statisch – nach Änderungen neu bauen/deployen.
