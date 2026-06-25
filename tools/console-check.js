// tools/console-check.js - грузит index.html и печатает console-error / requestfailed.
const path = require('path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push('CONSOLE ' + m.text()));
  page.on('requestfailed', (r) => errs.push('FAIL ' + r.url()));
  await page.goto('file://' + path.join(root, 'index.html'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  console.log(errs.length ? errs.join('\n') : 'no console errors');
  await browser.close();
  process.exit(errs.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
