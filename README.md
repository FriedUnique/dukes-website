# dukes Website

Astro + Tailwind. `npm install`, dann `npm run dev` (lokal) bzw. `npm run build` (Ausgabe in `dist/`).

## Aufbau
- `/` – Startseite: Bereiche, Wochenmenü (`#wochenmenu`), nächste Veranstaltungen, Lokal mieten (`#lokal-mieten`)
- `/veranstaltungen` – alle Events mit Suche, Monat, Datumsbereich und „Mehr anzeigen“
- `/ueber-uns`, `/kontakt`
- Alte URLs (`/restaurant`, `/wochenmenue`, `/lokal-mieten`) leiten auf die Startseite um (`astro.config.mjs`).

## Farben ändern
`src/styles/global.css` → Block `@theme` (z.B. `--color-ink`, `--color-gold`).

## Wochenmenü pflegen
Neue Datei in `src/content/wochenmenu/`, z.B. `2026-kw43.md` – am einfachsten `2026-kw42.md` kopieren.

| Feld | Bedeutung |
|---|---|
| `week`, `from`, `to` | Titel und Montag/Freitag der Woche |
| `menu1Price` | Standardpreis Menü 1 (optional) – gilt für alle Tage ohne eigenen `price` |
| `daily` | **Menü 1** – pro Tag `day`, `soup`, `dish`, optional `price` (überschreibt `menu1Price`) |
| `specials` | z.B. Monats-Special, Dukes Bowle (`name`, `dish`, `description`, `price`) |
| `menus` | **Menü 2 / Menü 3** – gelten die ganze Woche (`name`, `tag`, `dish`, `price`) |

Angezeigt wird automatisch die aktuelle Woche (die letzte, deren `from` erreicht ist). Alte Dateien dürfen liegen bleiben.

## Veranstaltungen pflegen
Neue Datei in `src/content/events/`, z.B. `2026-12-silvester.md`:

```md
---
title: "Silvesterparty"
date: 2026-12-31
time: "21:00"
area: "Sihl3 Club"        # Eventsaal | Sihl3 Club | Saloon | Restaurant | Terrasse | Fonduestübli
price: "CHF 20.–"          # optional
image: "/events/silvester.jpg"  # optional, Datei in public/events/ ablegen
draft: false               # true = nur lokal sichtbar
---
Beschreibungstext …
```

Vergangene Events werden automatisch ausgeblendet (Startseite und Standardfilter „ab heute“), bleiben aber über den Filter auffindbar.
Wie viele Events vor „Mehr anzeigen“ erscheinen: `PAGE_SIZE` in `src/pages/veranstaltungen.astro`.

Hinweis: Die Seite ist statisch – nach Änderungen neu bauen/deployen.
