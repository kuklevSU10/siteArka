// tools/sample-palette.js - средний доминирующий тон каждого проекта по hero-кадру.
const path = require('path');
const sharp = require('sharp');
const dir = path.resolve(__dirname, '..', 'assets', 'interiors', '_src');

const heroes = {
  '01 studio': 'arka-int01-studio-kitchen-living.png',
  '02 classic': 'arka-int02-classic-bedroom.png',
  '03 burgundy': 'arka-int03-burgundy-kitchen.png',
};

(async () => {
  for (const [name, file] of Object.entries(heroes)) {
    const { dominant } = await sharp(path.join(dir, file)).stats();
    const hex = '#' + [dominant.r, dominant.g, dominant.b]
      .map((v) => v.toString(16).padStart(2, '0')).join('');
    console.log(name + '  dominant ' + hex);
  }
})().catch((e) => { console.error(e); process.exit(1); });
