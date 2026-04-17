import fs from 'fs';
const p = new URL('../src/i18n/locales/gu.json', import.meta.url);
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  /("integrity"\s*:\s*\{\s*"title"\s*:\s*")[^"]+("\s*,\s*"desc")/,
  '$1ઈમાનદારી$2'
);
if (s === fs.readFileSync(p, 'utf8')) {
  console.error('replace failed');
  process.exit(1);
}
fs.writeFileSync(p, s);
console.log('ok');
