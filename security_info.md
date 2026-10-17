# Security – quick overview

## Architecture (why it's safe by design)
- **Static site**: the web server only serves HTML/CSS/JS files. No PHP, no database, no login on the server → nothing to hack there (the old WordPress was the weak point).
- **Editor (`/admin`, Sveltia CMS)** runs entirely in the browser and saves to **GitHub**, not to the server.
- **GitHub Actions** builds the site and pushes the finished files to the server (`.github/workflows/deploy.yml`).
- Worst case "editor account stolen" = wrong/defaced text on the site. Can't run code on visitors' browsers or the server, and every change is in Git → one-click revert.

## Already done in the code
| Area | Measure |
|---|---|
| XSS | Content rendered as plain text only; CSP (`astro.config.mjs`) allows only our own hashed scripts |
| Content validation | Build fails on bad input (image paths only `/events/*`, length/format limits) → broken content never goes live |
| Embeds | Only `bookingwidget.local.ch` allowed as iframe; iframe sandboxed |
| Server (`public/.htaccess`) | HTTPS + HSTS, clickjacking block, PHP execution off, dotfiles blocked, WordPress paths → 410 |
| Editor page | Own strict CSP, no CDN scripts (bundle self-hosted from `node_modules`), `noindex` |
| Supply chain | Few dependencies, exact versions via `package-lock.json`, CI uses `npm ci --ignore-scripts` |

## To do before go-live
- [ ] **Server was hacked** → wipe web root completely, don't upload on top. Delete old WordPress files + DB.
- [ ] Rotate **all** credentials: hosting panel, FTP/SSH, DB, email.
- [ ] Hoster: check cron jobs/backdoors, set `ServerTokens Prod`; if they can't confirm it's clean → new hosting.
- [ ] Google Search Console: remove spam pages left from the hack.

## Accounts & access
- [ ] GitHub: **2FA mandatory** for everyone with write access. Bosses get their own accounts (no shared logins).
- [ ] Protect `main` branch: no force-push, no deletion.
- [ ] Editor login, pick one:
  - **Access token** (no extra service): fine-grained GitHub token, *only this repo*, *Contents: read/write*, expiry ≤ 1 year.
  - **"Sign in with GitHub"** (nicer for non-tech users): needs small OAuth helper (`sveltia-cms-auth` on Cloudflare Workers) → set `base_url` in `public/admin/config.yml`.
- [ ] Optional: extra HTTP Basic Auth on `/admin` (`.htaccess`) – hides the editor from bots.

## Deployment secrets (GitHub → Settings → Secrets)
- `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`
- Use a **dedicated SSH user** that can only write the web root (no shell/sudo if hoster allows). Key only for this purpose.
- Without secrets the workflow only builds (no deploy) – safe default.
- If hosting moves to Cloudflare Pages/Netlify: no SSH key needed at all, headers set there instead of `.htaccess`.

## Ongoing
- `npm audit` / Dependabot for updates (update `@sveltia/cms` and `astro` a few times a year).
- Optional hardening: pin GitHub Actions to commit SHAs instead of `@v4`.
- New external service (maps, analytics, video…) → must be added to the CSP, otherwise the browser blocks it. Think twice before adding trackers.

## Known trade-offs
- Editor CSP allows inline styles, UI texts from `unpkg.com` and fonts from `jsdelivr.net` (no executable code).
- local.ch widget shows its own cookie banner (their responsibility); loads only after clicking "Reservieren".
