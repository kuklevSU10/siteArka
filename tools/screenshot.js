// tools/screenshot.js - рендерит локальный index.html в PNG заданной ширины.
// Использование: node tools/screenshot.js <name> <width> [full]
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const name = process.argv[2] || 'page';
const width = parseInt(process.argv[3] || '1440', 10);
const fullPage = process.argv[4] === 'full';
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'output', 'shots');

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width, height: Math.round(width * 0.66) }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(root, 'index.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(700);
  const out = path.join(outDir, name + '-' + width + '.png');
  await page.screenshot({ path: out, fullPage });
  console.log('saved ' + out);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
