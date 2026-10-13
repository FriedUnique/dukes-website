import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dukes.ch',
  vite: { plugins: [tailwindcss()] },
});
