import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dukes.ch',
  // Alte Unterseiten zeigen auf die Abschnitte der Startseite
  redirects: {
    '/restaurant': '/#bereiche',
    '/wochenmenu': '/#wochenmenu',
    '/wochenmenue': '/#wochenmenu',
    '/lokal-mieten': '/#lokal-mieten',
  },
  vite: { plugins: [tailwindcss()] },
});
