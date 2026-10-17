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
Beschreibungstext … (reiner Text, Leerzeile = neuer Absatz; HTML/Markdown wird nicht interpretiert)
```

Bilder müssen unter `public/events/` liegen (`/events/name.jpg|png|webp`), externe URLs werden beim Build abgelehnt.

Vergangene Events werden automatisch ausgeblendet (Startseite und Standardfilter „ab heute“), bleiben aber über den Filter auffindbar.
Wie viele Events vor „Mehr anzeigen“ erscheinen: `PAGE_SIZE` in `src/pages/veranstaltungen.astro`.

Hinweis: Die Seite ist statisch – nach Änderungen neu bauen/deployen.

## Deployment & Sicherheit
- Server braucht nur statische Dateien (Apache): `npm ci && npm run build`, Inhalt von `dist/` ins Web-Root.
  Vorher die alte WordPress-Installation **vollständig** entfernen (nicht drüberkopieren).
- `public/.htaccess` (landet in `dist/`): HTTPS-Zwang, HSTS, Clickjacking-Schutz, PHP-Ausführung gesperrt,
  versteckte Dateien gesperrt, 301-Weiterleitungen der alten URLs.
- Content-Security-Policy: `security.csp` in `astro.config.mjs` – nur eigene (gehashte) Skripte,
  iframes nur von `bookingwidget.local.ch`. Neue externe Quellen dort freigeben, sonst blockiert der Browser sie.
- Inhalte (Events, Menü) werden nie als HTML gerendert, Bildpfade sind auf `/events/` beschränkt.
