// Kopiert Sveltia CMS aus node_modules nach public/admin/vendor/,
// damit /admin ohne externes CDN läuft (Version fix über package-lock.json).
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const src = 'node_modules/@sveltia/cms/dist';
const dest = 'public/admin/vendor';

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(`${src}/sveltia-cms.js`, `${dest}/sveltia-cms.js`);
console.log('Sveltia CMS -> public/admin/vendor/');
