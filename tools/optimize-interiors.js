// tools/optimize-interiors.js - PNG -> WebP в двух ширинах.
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const dir = path.resolve(__dirname, '..', 'assets', 'interiors');
const src = path.join(dir, '_src');
const widths = [800, 1254];

(async () => {
  const files = fs.readdirSync(src).filter((f) => f.endsWith('.png'));
  for (const f of files) {
    const base = f.replace(/\.png$/, '');
    for (const w of widths) {
      const out = path.join(dir, `${base}-${w}.webp`);
      await sharp(path.join(src, f)).resize({ width: w }).webp({ quality: 78 }).toFile(out);
      const kb = Math.round(fs.statSync(out).size / 1024);
      console.log(`${base}-${w}.webp  ${kb} KB`);
    }
  }
  console.log('done: ' + files.length + ' files');
})().catch((e) => { console.error(e); process.exit(1); });
