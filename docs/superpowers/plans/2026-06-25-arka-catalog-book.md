# АРКА Каталог-книга Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить после hero интерактивную книгу-каталог: закрытая терракотовая книга, клик открывает её в разворот, страницы листаются по клику/свайпу/клавишам; внутри 3 проекта по 4 кадра в стиле печатной монографии.

**Architecture:** Чистый HTML/CSS/JS без сборщика. Книга = изолированный модуль `book.js`, строящий DOM из данных `book-data.js`, поверх библиотеки StPageFlip (self-host UMD). Картинки оптимизируются в WebP скриптом на sharp. Реализация и git в репозитории `siteArka`, деплой на GitHub Pages.

**Tech Stack:** Vanilla JS (UMD StPageFlip `page-flip`), CSS 3D/clip, sharp (WebP), Playwright (скриншот-верификация через системный google-chrome), node `assert` (тест инварианта данных).

---

## Контекст для исполнителя (прочитать до старта)

- **Источник истины по дизайну:** `docs/superpowers/specs/2026-06-25-arka-catalog-book-design.md`. По бренду: `../Arka/BRANDBOOK.md`.
- **Рабочая директория:** `/home/h2e/Root/siteArka` (git, ветка `main`, remote alias `github-sitearka`, push в main = деплой на Pages).
- **Существующие файлы сайта:** `index.html` (152 строки), `styles.css` (~31 КБ), `script.js` (168 строк). Hero-секция = `<section class="hero" ...>` заканчивается на строке ~80, далее `<section id="about" ...>`.
- **12 кадров:** `assets/interiors/arka-int0{1,2,3}-*.png`, все 1254x1254. Шрифты self-host (Cormorant Garamond + Manrope) уже подключены через `assets/fonts/fonts.css`.
- **Токены** в `styles.css` `:root`: `--paper #f8f6f2`, `--ink #111`, `--muted`, `--navy #0f223d`, `--burgundy #8c1d27`, `--gold #c8a968`, `--serif` (Cormorant), `--sans` (Manrope), `--ease`, `--line`, `--header-height`, `--radius`.
- **ЗАПРЕТ:** ни одного символа em/en-dash (`—` / `–`) в `index.html`, `styles.css`, `script.js`, `book.js`, `book-data.js`. Использовать дефис `-`, двоеточие или точку. Это стережёт `test-site.js`.
- **Нет git-коммитов без запроса не требуется:** этот план явно разрешает коммит в конце каждой задачи (мы на ветке `main` в отдельном репозитории сайта; деплой произойдёт только если кто-то запушит, push в плане не делаем).
- **Sharp** установлен в `node_modules`. `cwebp`/ImageMagick отсутствуют. Playwright установлен; системный Chrome `/usr/bin/google-chrome`.

### Стандартные блоки проверки

**Гейт A (статический):** `cd /home/h2e/Root/siteArka && node test-site.js` → `Arka site static checks passed.` (после Задачи 0).

**Гейт B (скриншот):** `cd /home/h2e/Root/siteArka && node tools/screenshot.js <name> <width> [full]` → открыть `output/shots/<name>-<width>.png` (Read tool) и сверить с критерием.

**Гейт C (консоль):** `cd /home/h2e/Root/siteArka && node tools/console-check.js` → `no console errors` (после Задачи 0).

---

## File Structure

| Файл | Ответственность | Действие |
|---|---|---|
| `tools/screenshot.js` | Рендер index.html в PNG заданной ширины | Create (T0) |
| `tools/console-check.js` | Загрузка страницы, сбор console-error и requestfailed | Create (T0) |
| `test-site.js` | Статический гейт качества (порт из Arka + расширение) | Create (T0) |
| `tools/optimize-interiors.js` | PNG -> WebP (sharp), 2 ширины | Create (T1) |
| `tools/sample-palette.js` | Доминирующий тон проекта -> hex для палитр глав | Create (T1) |
| `.gitignore` | Исключить `_ref/`, `assets/interiors/_src/` | Modify (T1) |
| `vendor/page-flip/page-flip.browser.js` (+ `.css` если есть) | Self-host StPageFlip | Create (T2) |
| `book-data.js` | Контент: массив PROJECTS (dual CommonJS/browser) | Create (T3) |
| `tools/test-book-data.js` | Тест инварианта данных (4 кадра/проект, 12 уникальных) | Create (T3) |
| `index.html` | Секция `#works`, пункт меню, подключение vendor + book.js, noscript-сетка | Modify (T4..) |
| `styles.css` | Блок `.book-*`, новые токены | Modify (T4..) |
| `book.js` | buildPages / initFlip / wireNav / wireLazy / wireSound | Create (T5..) |
| `assets/interiors/*-800.webp`, `*-1254.webp` | Оптимизированные кадры | Create (T1) |
| `assets/interiors/_src/*.png` | Исходники (gitignored) | Move (T1) |

---

## Task 0: Верификационная оснастка (screenshot, console-check, gate)

**Files:**
- Create: `tools/screenshot.js`, `tools/console-check.js`, `test-site.js`

- [ ] **Step 1: Создать `tools/screenshot.js`**

```javascript
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
```

- [ ] **Step 2: Создать `tools/console-check.js`**

```javascript
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
```

- [ ] **Step 3: Создать `test-site.js` (порт из Arka + новые проверки)**

```javascript
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const assert = (c, m) => { if (!c) throw new Error(m); };
const read = (p) => { assert(fs.existsSync(p), `Missing file: ${path.relative(root, p)}`); return fs.readFileSync(p, "utf8"); };

const html = read(path.join(root, "index.html"));
const css = read(path.join(root, "styles.css"));
const js = read(path.join(root, "script.js"));
const bookJs = fs.existsSync(path.join(root, "book.js")) ? read(path.join(root, "book.js")) : "";
const bookData = fs.existsSync(path.join(root, "book-data.js")) ? read(path.join(root, "book-data.js")) : "";
const allText = `${html}\n${css}\n${js}\n${bookJs}\n${bookData}`;

[
  "АРКА | Архитектура и дизайн интерьеров",
  "Студия архитектуры и дизайна интерьеров.",
  "Что мы создаём",
  "info@arkastudio.ru",
].forEach((n) => assert(html.includes(n), `Missing required copy: ${n}`));

["#about", "#expertise", "#contact", "#works"].forEach((a) =>
  assert(html.includes(`href="${a}"`), `Missing navigation anchor: ${a}`));

assert(html.includes('id="works"'), "Missing #works section");
assert(html.includes("Работы"), "Missing 'Работы' nav label");

[
  "assets/arka-hero-interior.png",
  "assets/arka-hospitality.png",
  "assets/arka-office.png",
].forEach((a) => {
  assert(html.includes(a), `HTML does not reference asset: ${a}`);
  assert(fs.existsSync(path.join(root, a)), `Missing asset file: ${a}`);
});

assert(!/[—–]/.test(allText), "Visible/code output contains an em dash or en dash");
assert(!/AI-purple|glassmorphism|Acme|Jane Doe|Scroll to explore/i.test(allText), "Contains banned generic AI design language");
assert(!/h-screen/.test(allText), "Use min-height with dynamic viewport units instead of h-screen");
assert(/@media\s*\(max-width:\s*767px\)/.test(css), "Missing explicit mobile breakpoint");
assert(/prefers-reduced-motion/.test(css), "Missing reduced motion handling");
assert(/IntersectionObserver/.test(js), "Missing progressive reveal behavior");

console.log("Arka site static checks passed.");
```

- [ ] **Step 4: Прогнать все три гейта на текущем (немодифицированном) сайте**

Run: `cd /home/h2e/Root/siteArka && node test-site.js`
Expected: упадёт с `Missing navigation anchor: #works` (секции ещё нет). Это подтверждает, что новые проверки активны. Запомнить, что гейт A станет зелёным после Задачи 4.

Run: `cd /home/h2e/Root/siteArka && node tools/screenshot.js baseline 1440`
Expected: `saved .../output/shots/baseline-1440.png`. Открыть (Read) - текущий лендинг (hero c видео). Базлайн зафиксирован.

Run: `cd /home/h2e/Root/siteArka && node tools/console-check.js`
Expected: `no console errors` (или без критичных).

- [ ] **Step 5: Commit**

```bash
cd /home/h2e/Root/siteArka
git add tools/screenshot.js tools/console-check.js test-site.js
git commit -m "Add verification harness (screenshot, console-check, static gate)"
```

---

## Task 1: Пайплайн картинок (WebP) + сэмплер палитры

**Files:**
- Create: `tools/optimize-interiors.js`, `tools/sample-palette.js`
- Modify: `.gitignore`
- Move: `assets/interiors/*.png` -> `assets/interiors/_src/`

- [ ] **Step 1: Переместить исходники в `_src/`**

Run:
```bash
cd /home/h2e/Root/siteArka
mkdir -p assets/interiors/_src
git mv assets/interiors/*.png assets/interiors/_src/
ls assets/interiors/_src | wc -l
```
Expected: `12`.

- [ ] **Step 2: Обновить `.gitignore`**

Дописать в конец `.gitignore` (создать, если файла нет):
```
_ref/
assets/interiors/_src/
output/
```

- [ ] **Step 3: Снять `_src` из git-индекса (чтобы исходники не коммитились и не уезжали в прод)**

Run:
```bash
cd /home/h2e/Root/siteArka
git rm -r --cached assets/interiors/_src
echo "untracked _src: $(git status --porcelain assets/interiors/_src | wc -l)"
```
Expected: исходники больше не в индексе (останутся на диске).

- [ ] **Step 4: Создать `tools/optimize-interiors.js`**

```javascript
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
```

- [ ] **Step 5: Запустить оптимизацию**

Run: `cd /home/h2e/Root/siteArka && node tools/optimize-interiors.js`
Expected: 24 строки (12 кадров x 2 ширины), каждый файл ориентировочно 80-350 КБ; финал `done: 12 files`.

- [ ] **Step 6: Создать `tools/sample-palette.js` (помощник для CSS-палитр глав)**

```javascript
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
```

- [ ] **Step 7: Запустить сэмплер и записать значения**

Run: `cd /home/h2e/Root/siteArka && node tools/sample-palette.js`
Expected: 3 строки с hex. Записать их - они станут ориентиром для `--book-ch1/2` и подтверждением `--book-terracotta` в Задаче 4 (доминанты как правило приглушённые; для страниц-опенеров берём осветлённый вариант тона).

- [ ] **Step 8: Commit**

```bash
cd /home/h2e/Root/siteArka
git add .gitignore tools/optimize-interiors.js tools/sample-palette.js assets/interiors/*.webp
git commit -m "Image pipeline: PNG sources to _src (gitignored), generate WebP, palette sampler"
```

---

## Task 2: Self-host StPageFlip

**Files:**
- Create: `vendor/page-flip/page-flip.browser.js` (+ `page-flip.css` если присутствует в пакете)

- [ ] **Step 1: Установить пакет и определить имя dist + глобал**

Run:
```bash
cd /home/h2e/Root/siteArka
npm install page-flip@^2.0.7 >/dev/null 2>&1; echo "exit $?"
ls node_modules/page-flip/dist
```
Expected: каталог `dist/` содержит `page-flip.browser.js` (UMD) и, возможно, `page-flip.browser.css`.

- [ ] **Step 2: Скопировать dist в `vendor/`**

Run:
```bash
cd /home/h2e/Root/siteArka
mkdir -p vendor/page-flip
cp node_modules/page-flip/dist/page-flip.browser.js vendor/page-flip/
[ -f node_modules/page-flip/dist/page-flip.browser.css ] && cp node_modules/page-flip/dist/page-flip.browser.css vendor/page-flip/ || echo "no css in dist (ok, StPageFlip injects styles)"
ls -la vendor/page-flip
```

- [ ] **Step 3: Определить имя глобала UMD**

Run:
```bash
cd /home/h2e/Root/siteArka
grep -oE '(self|window|globalThis)\.[A-Za-z]+\s*=|(typeof exports)' vendor/page-flip/page-flip.browser.js | head
grep -oE '"PageFlip"|St\b' vendor/page-flip/page-flip.browser.js | head
```
Expected: подтверждение, что UMD вешает глобал `St` с полем `PageFlip` (т.е. в браузере `window.St.PageFlip`). Если имя иное (например `window.PageFlip`), зафиксировать его - в Задаче 6 использовать фактическое имя.

- [ ] **Step 4: Smoke-тест загрузки глобала**

Создать временный файл `vendor/page-flip/_smoke.html`:
```html
<!doctype html><meta charset="utf-8">
<script src="page-flip.browser.js"></script>
<script>
  var ok = (window.St && window.St.PageFlip) || window.PageFlip;
  document.title = ok ? 'PAGEFLIP-OK' : 'PAGEFLIP-MISSING';
</script>
```
Run:
```bash
cd /home/h2e/Root/siteArka
node -e "const{chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage();await p.goto('file://'+process.cwd()+'/vendor/page-flip/_smoke.html');console.log(await p.title());await b.close();})()"
rm vendor/page-flip/_smoke.html
```
Expected: `PAGEFLIP-OK`.

- [ ] **Step 5: Commit**

```bash
cd /home/h2e/Root/siteArka
git add vendor/page-flip
git commit -m "Vendor self-hosted StPageFlip UMD build"
```

(Примечание: `node_modules/` уже игнорируется штатным `.gitignore` сайта; если нет - добавить `node_modules/` в `.gitignore`.)

---

## Task 3: Контент-данные (book-data.js) + тест инварианта

**Files:**
- Create: `book-data.js`, `tools/test-book-data.js`

- [ ] **Step 1: Написать тест инварианта `tools/test-book-data.js`**

```javascript
const assert = require('node:assert');
const { PROJECTS } = require('../book-data.js');

assert.equal(PROJECTS.length, 3, '3 projects');
const all = [];
for (const p of PROJECTS) {
  assert.ok(p.number && p.name && p.description, 'project meta: ' + p.name);
  assert.ok(Array.isArray(p.palette) && p.palette.length === 3, 'palette of 3: ' + p.name);
  const imgs = [p.hero].concat(p.photos);
  assert.equal(imgs.length, 4, p.name + ' must have exactly 4 photos');
  for (const im of imgs) {
    assert.ok(im.src && im.caption, 'photo needs src+caption in ' + p.name);
    all.push(im.src);
  }
}
assert.equal(all.length, 12, '12 photos total');
assert.equal(new Set(all).size, 12, 'all 12 unique');
console.log('book-data invariant OK');
```

- [ ] **Step 2: Запустить тест - убедиться, что падает (файла данных нет)**

Run: `cd /home/h2e/Root/siteArka && node tools/test-book-data.js`
Expected: FAIL `Cannot find module '../book-data.js'`.

- [ ] **Step 3: Создать `book-data.js` (dual CommonJS/browser)**

Базовый путь кадра задаётся без ширины; `book.js` подставит `-800`/`-1254`. Значения `pageBg`/`accent` - ориентиры из Задачи 1 (приглушённый осветлённый тон).

```javascript
// book-data.js - контент каталога. Меняется только здесь при появлении реальных данных.
var PROJECTS = [
  {
    number: "01",
    name: "Studio",
    subtitle: "Светлый сценарий",
    description: "Тёплый нейтральный фон, дерево и пыльно-голубой акцент. Открытая планировка, где кухня, гостиная и зона сна собраны в одну спокойную среду.",
    palette: ["#E7E1D6", "#9DB0BE", "#8C6A4A"],
    pageBg: "#E7E1D6",
    accent: "#7E94A4",
    text: "#1A1A1A",
    layout: "stack",
    hero: { src: "assets/interiors/arka-int01-studio-kitchen-living", caption: "Кухня-гостиная" },
    photos: [
      { src: "assets/interiors/arka-int01-studio-living-sleep", caption: "Гостиная-спальня" },
      { src: "assets/interiors/arka-int01-studio-kitchen", caption: "Кухня" },
      { src: "assets/interiors/arka-int01-studio-blue-bath", caption: "Ванная" }
    ]
  },
  {
    number: "02",
    name: "Classic",
    subtitle: "Неоклассика без избыточности",
    description: "Лепнина, фарфорово-голубой рисунок и кремовая палитра. Пропорция и свет важнее декора.",
    palette: ["#EDE7DB", "#9FB3C7", "#C8A968"],
    pageBg: "#EDE7DB",
    accent: "#8FA6BC",
    text: "#1A1A1A",
    layout: "band",
    hero: { src: "assets/interiors/arka-int02-classic-bedroom", caption: "Спальня" },
    photos: [
      { src: "assets/interiors/arka-int02-classic-kitchen-living", caption: "Кухня-гостиная" },
      { src: "assets/interiors/arka-int02-classic-kids", caption: "Детская" },
      { src: "assets/interiors/arka-int02-classic-bath", caption: "Ванная" }
    ]
  },
  {
    number: "03",
    name: "Burgundy",
    subtitle: "Тёмная тёплая палитра",
    description: "Морёное дерево, терракота и приглушённый свет. Камерная среда, где статус считывается через материал.",
    palette: ["#A6442E", "#C8A968", "#3A2A22"],
    pageBg: "#A6442E",
    accent: "#C8A968",
    text: "#F8F6F2",
    layout: "climax",
    hero: { src: "assets/interiors/arka-int03-burgundy-kitchen", caption: "Кухня" },
    photos: [
      { src: "assets/interiors/arka-int03-burgundy-bedroom", caption: "Спальня" },
      { src: "assets/interiors/arka-int03-burgundy-shower", caption: "Душевая" },
      { src: "assets/interiors/arka-int03-burgundy-wardrobe", caption: "Гардеробная" }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = { PROJECTS: PROJECTS }; }
if (typeof window !== "undefined") { window.ARKA_PROJECTS = PROJECTS; }
```

- [ ] **Step 4: Запустить тест - убедиться, что проходит**

Run: `cd /home/h2e/Root/siteArka && node tools/test-book-data.js`
Expected: `book-data invariant OK`.

- [ ] **Step 5: Commit**

```bash
cd /home/h2e/Root/siteArka
git add book-data.js tools/test-book-data.js
git commit -m "Catalog content data model + invariant test (4 photos/project, 12 unique)"
```

---

## Task 4: Секция #works, закрытая книга, меню, noscript, базовые стили

**Files:**
- Modify: `index.html`, `styles.css`

- [ ] **Step 1: Добавить пункт меню «Работы»**

В `index.html` в `<nav class="site-nav" ...>` (после ссылки `<a href="#expertise">Для бизнеса</a>`) добавить:
```html
          <a href="#works">Работы</a>
```

- [ ] **Step 2: Вставить секцию `#works` между hero и about**

В `index.html` сразу после закрывающего `</section>` hero (перед `<section id="about" ...>`) вставить:
```html
      <section id="works" class="works-section" aria-labelledby="works-title">
        <div class="works-head" data-reveal>
          <p class="works-eyebrow">Каталог</p>
          <h2 id="works-title">Избранные интерьеры</h2>
          <p class="works-lead">Три проекта в трёх палитрах. Нажмите на книгу, чтобы открыть и листать.</p>
        </div>

        <div class="book-stage">
          <div class="book-closed" role="button" tabindex="0" aria-label="Открыть каталог работ">
            <span class="book-edge" aria-hidden="true"></span>
            <span class="book-cover">
              <img class="book-cover-mark" src="assets/arka-logo.svg" alt="АРКА"
                   onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'book-cover-word',textContent:'АРКА'}))">
              <span class="book-cover-sub">Избранные интерьеры</span>
              <span class="book-cover-line" aria-hidden="true"></span>
              <span class="book-cover-foot">Каталог</span>
            </span>
            <span class="book-band" aria-hidden="true"><span>Пространства, которые переживут тренды</span></span>
            <span class="book-open-hint">нажмите, чтобы открыть</span>
          </div>

          <div class="book-mount" aria-hidden="true"></div>

          <div class="book-controls" hidden>
            <button class="book-prev" type="button" aria-label="Предыдущая страница">&#8249;</button>
            <span class="book-indicator" aria-live="polite">01 / 01</span>
            <button class="book-next" type="button" aria-label="Следующая страница">&#8250;</button>
            <button class="book-close" type="button" aria-label="Закрыть книгу">Закрыть</button>
          </div>
        </div>

        <noscript>
          <div class="works-fallback">
            <img src="assets/interiors/arka-int01-studio-kitchen-living-1254.webp" alt="Studio. Кухня-гостиная" width="1254" height="1254">
            <img src="assets/interiors/arka-int02-classic-bedroom-1254.webp" alt="Classic. Спальня" width="1254" height="1254">
            <img src="assets/interiors/arka-int03-burgundy-kitchen-1254.webp" alt="Burgundy. Кухня" width="1254" height="1254">
          </div>
        </noscript>
      </section>
```

- [ ] **Step 3: Подключить скрипты книги перед `</body>`**

В `index.html` рядом со `<script src="script.js" defer></script>` добавить ПЕРЕД ним:
```html
    <script src="vendor/page-flip/page-flip.browser.js" defer></script>
    <script src="book-data.js" defer></script>
    <script src="book.js" defer></script>
```
(book.js появится в Задаче 5; пока подключение не вредит - 404 на book.js до Задачи 5 допустим, но чтобы гейт C был чист, создать пустой `book.js` командой ниже.)

Run: `cd /home/h2e/Root/siteArka && [ -f book.js ] || printf '// placeholder\n' > book.js`

- [ ] **Step 4: Базовые стили секции и закрытой книги**

В `styles.css` в `:root` дописать токены:
```css
  --book-terracotta: #a6442e;
  --book-ch1: #e7e1d6;
  --book-ch2: #ede7db;
  --book-stage: #efece6;
  --book-page-edge: #efe7d8;
```

В конец `styles.css` (до первого `@media`, в основной зоне) добавить:
```css
.works-section { padding: clamp(4rem, 9vw, 8rem) clamp(1.2rem, 4vw, 3.5rem); background: var(--paper); }
.works-head { max-width: 40rem; margin: 0 auto clamp(2rem, 5vw, 4rem); text-align: center; }
.works-eyebrow { font-size: 0.7rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--muted); margin: 0 0 0.8rem; }
.works-head h2 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 500; line-height: 0.96; margin: 0 0 1rem; }
.works-lead { color: rgba(17,17,17,0.66); font-weight: 300; margin: 0; }

.book-stage {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  min-height: min(86vh, 760px);
  padding: clamp(1rem, 4vw, 3rem);
  background: radial-gradient(120% 90% at 50% 30%, #f3f1ec 0%, var(--book-stage) 70%);
  border-radius: var(--radius);
  perspective: 2200px;
}

/* закрытая книга как объект */
.book-closed {
  position: relative;
  width: min(64vw, 420px);
  aspect-ratio: 1 / 1.15;
  cursor: pointer;
  transform: rotateX(8deg) rotateZ(-1deg);
  transform-style: preserve-3d;
  transition: transform 600ms var(--ease), opacity 500ms var(--ease);
  filter: drop-shadow(0 38px 50px rgba(28,18,12,0.30)) drop-shadow(0 10px 16px rgba(28,18,12,0.18));
}
.book-closed:hover { transform: rotateX(6deg) rotateZ(-1deg) translateY(-4px); }
.book-edge {
  position: absolute; top: 1.4%; bottom: 1.4%; right: -10px; width: 12px;
  background: repeating-linear-gradient(to bottom, var(--book-page-edge) 0 2px, #e4dccb 2px 3px);
  border-radius: 0 2px 2px 0; transform: translateZ(-1px);
}
.book-cover {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;
  background: var(--book-terracotta);
  border-radius: 2px 6px 6px 2px;
  box-shadow: inset 8px 0 18px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.06);
  color: #fbf7f0;
  text-align: center;
  padding: 2rem;
}
.book-cover-mark { width: auto; height: 2.4rem; filter: brightness(0) invert(1); opacity: 0.96; }
.book-cover-word { font-family: var(--serif); font-size: 2.4rem; letter-spacing: 0.18em; }
.book-cover-sub { font-family: var(--serif); font-style: italic; font-size: 1.05rem; opacity: 0.92; }
.book-cover-line { width: 56px; height: 1px; background: var(--gold); opacity: 0.85; }
.book-cover-foot { font-family: var(--sans); font-size: 0.66rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.8; }
.book-band {
  position: absolute; left: -3%; right: -3%; bottom: 16%;
  padding: 0.55rem 0; text-align: center;
  background: #f4efe7; color: var(--ink);
  box-shadow: 0 6px 14px rgba(28,18,12,0.18);
  transition: transform 500ms var(--ease), opacity 400ms var(--ease);
}
.book-band span { font-family: var(--serif); font-style: italic; font-size: 0.9rem; letter-spacing: 0.01em; }
.book-open-hint {
  position: absolute; left: 0; right: 0; bottom: -2.2rem; text-align: center;
  font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted);
}

.book-mount { position: relative; width: 100%; max-width: 980px; display: none; }
.works-fallback { display: grid; gap: 1rem; max-width: 720px; margin: 0 auto; }
.works-fallback img { width: 100%; height: auto; border-radius: var(--radius); }
```

- [ ] **Step 5: Гейт A + скриншот закрытой книги**

Run: `cd /home/h2e/Root/siteArka && node test-site.js`
Expected: `Arka site static checks passed.`

Run: `cd /home/h2e/Root/siteArka && node tools/screenshot.js book-closed 1440`
Открыть PNG. Критерий: по центру секции лежит терракотовая книга с вордмарком, манжеткой и видимым торцом-стопкой; лёгкий наклон и тень; подсказка снизу. Без горизонтального скролла.

Run: `cd /home/h2e/Root/siteArka && node tools/screenshot.js book-closed 390`
Критерий: на мобиле книга помещается, подписи не обрезаны.

- [ ] **Step 6: Commit**

```bash
cd /home/h2e/Root/siteArka
git add index.html styles.css book.js
git commit -m "Works section: closed book object, menu link, noscript grid, base styles"
```

---

## Task 5: Построение страниц (book.js buildPages)

**Files:**
- Modify: `book.js`, `styles.css`

- [ ] **Step 1: Реализовать построение DOM в `book.js`**

Заменить содержимое `book.js` на:
```javascript
// book.js - сборка и поведение книги-каталога.
(function () {
  "use strict";
  var SRC = (typeof window !== "undefined" && window.ARKA_PROJECTS) || [];
  var mount = document.querySelector(".book-mount");
  var stage = document.querySelector(".book-stage");
  if (!mount || !stage || !SRC.length) return;

  function pic(base, alt, eager) {
    var loading = eager ? "eager" : "lazy";
    return (
      '<img class="book-img" alt="' + alt + '" width="1254" height="1254" loading="' + loading + '"' +
      ' src="' + (eager ? base + "-1254.webp" : "") + '"' +
      ' data-src="' + base + '-1254.webp"' +
      ' data-srcset="' + base + "-800.webp 800w, " + base + '-1254.webp 1254w"' +
      ' sizes="(max-width: 767px) 92vw, 460px">'
    );
  }

  function runner(left, right) {
    return '<span class="book-runner"><span>' + left + '</span><span>' + right + '</span></span>';
  }
  function folio(n) { return '<span class="book-folio">' + n + "</span>"; }

  function page(cls, density, inner) {
    return '<div class="book-page ' + cls + '"' + (density ? ' data-density="' + density + '"' : "") + ">" +
      '<div class="book-page-inner">' + inner + "</div></div>";
  }

  function build() {
    var html = "";
    var folioN = 0;
    function nextFolio() { folioN += 1; return ("0" + folioN).slice(-2); }

    // 1. Обложка (hard)
    html += page("book-page-cover", "hard",
      '<span class="book-cover-mark2">АРКА</span>' +
      '<span class="book-cover-sub2">Избранные интерьеры</span>' +
      '<span class="book-cover-line2"></span>' +
      '<span class="book-cover-foot2">Каталог</span>');

    // 2-3. Содержание (разворот)
    html += page("book-page-paper", "", runner("АРКА \\\\ Каталог", "") +
      '<p class="book-intro-k">Каталог - 2026</p>' +
      '<p class="book-intro">Три интерьерных проекта. Форма, свет и материал, собранные в спокойную среду.</p>' +
      folio(nextFolio()));
    var toc = "";
    SRC.forEach(function (p) {
      toc += '<li><b>' + p.number + "</b> <span>" + p.name + "</span><i>" + p.subtitle + "</i></li>";
    });
    html += page("book-page-paper", "", runner("", "Содержание") +
      '<ul class="book-toc">' + toc + "</ul>" + folio(nextFolio()));

    // Главы
    SRC.forEach(function (p) {
      var label = p.number + " " + p.name;
      // опенер: лево = идентичность, право = герой в арке
      html += page("book-page-chapter", "", runner("АРКА \\\\ Каталог", "") +
        '<span class="book-ghost">' + p.number + "</span>" +
        '<div class="book-chapter-copy">' +
          "<h3>" + p.name + "</h3>" +
          '<p class="book-chapter-sub">' + p.subtitle + "</p>" +
          "<p>" + p.description + "</p>" +
          '<span class="book-swatches">' +
            p.palette.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") +
          "</span>" +
        "</div>" + folio(nextFolio()),
        { bg: p.pageBg, color: p.text });
      html += page("book-page-paper book-hero-page", "", runner("", "Избранные работы \\\\ " + label) +
        '<figure class="book-arch arch-top arch-top-frame">' + pic(p.hero.src, p.name + ". " + p.hero.caption) +
        '</figure><figcaption class="book-cap">' + p.hero.caption + "</figcaption>" + folio(nextFolio()));

      if (p.layout === "climax") {
        // двойной кадр через корешок (две половины одного снимка)
        var d = p.photos[0];
        html += page("book-page-paper book-spread-l", "",
          '<span class="book-spread-img" style="background-image:url(' + d.src + '-1254.webp)"></span>' + folio(nextFolio()));
        html += page("book-page-paper book-spread-r", "",
          '<span class="book-spread-img" style="background-image:url(' + d.src + '-1254.webp)"></span>' + folio(nextFolio()));
        // пара
        html += page("book-page-paper", "", runner("АРКА \\\\ Каталог", "") +
          '<figure class="book-tall">' + pic(p.photos[1].src, p.name + ". " + p.photos[1].caption) +
          '</figure><figcaption class="book-cap">' + p.photos[1].caption + "</figcaption>" + folio(nextFolio()));
        html += page("book-page-paper", "", runner("", label) +
          '<figure class="book-tall">' + pic(p.photos[2].src, p.name + ". " + p.photos[2].caption) +
          '</figure><figcaption class="book-cap">' + p.photos[2].caption + "</figcaption>" + folio(nextFolio()));
      } else {
        // галерея: 1 крупный слева, 2 стопкой справа
        html += page("book-page-paper", "", runner("АРКА \\\\ Каталог", "") +
          '<figure class="book-gal-big">' + pic(p.photos[0].src, p.name + ". " + p.photos[0].caption) +
          '<figcaption class="book-cap">' + p.photos[0].caption + "</figcaption></figure>" + folio(nextFolio()));
        html += page("book-page-paper", "", runner("", label) +
          '<figure class="book-gal-sm">' + pic(p.photos[1].src, p.name + ". " + p.photos[1].caption) +
          '<figcaption class="book-cap">' + p.photos[1].caption + "</figcaption></figure>" +
          '<figure class="book-gal-sm">' + pic(p.photos[2].src, p.name + ". " + p.photos[2].caption) +
          '<figcaption class="book-cap">' + p.photos[2].caption + "</figcaption></figure>" + folio(nextFolio()));
      }
    });

    // Финал (разворот)
    html += page("book-page-paper", "", runner("АРКА \\\\ Каталог", "") +
      '<p class="book-quote">Пространства, которые переживут тренды.</p>' + folio(nextFolio()));
    html += page("book-page-paper book-cta-page", "", runner("", "Контакт") +
      '<div class="book-cta"><p>Расскажите о пространстве, которое хотите создать.</p>' +
      '<a class="button button-primary" href="#contact">Обсудить проект</a></div>' + folio(nextFolio()));

    // Задняя обложка (hard)
    html += page("book-page-cover book-page-back", "hard",
      '<span class="book-cover-mark2">АРКА</span><span class="book-cover-foot2">Архитектура и дизайн интерьеров</span>');

    // выровнять до чётного числа страниц (StPageFlip)
    var pageCount = (html.match(/book-page /g) || []).length;
    if (pageCount % 2 !== 0) html += page("book-page-paper book-page-blank", "", "");

    mount.innerHTML = html;
    applyChapterColors();
  }

  function applyChapterColors() {
    var pages = mount.querySelectorAll(".book-page-chapter");
    var i = 0;
    SRC.forEach(function (p) {
      var el = pages[i]; i += 1;
      if (!el) return;
      el.style.setProperty("--page-bg", p.pageBg);
      el.style.setProperty("--page-color", p.text);
      el.style.setProperty("--page-accent", p.accent);
    });
  }

  // экспортируем для следующих задач
  window.ARKA_BOOK = { build: build, mount: mount, stage: stage };
  build();
})();
```

Примечание: 4-й аргумент `page(...)` (объект `{bg,color}`) для опенеров фактически применяется через `applyChapterColors()` после вставки (так надёжнее, чем инлайн в строке). Лишний аргумент в вызове `page()` игнорируется - оставлен для читаемости; при желании убрать.

- [ ] **Step 2: Стили страниц книги**

В `styles.css` добавить:
```css
.book-page { background: var(--paper); color: var(--ink); overflow: hidden; }
.book-page-inner { position: relative; width: 100%; height: 100%; padding: clamp(0.9rem, 2vw, 1.6rem); box-sizing: border-box; display: flex; flex-direction: column; }
.book-page-paper { background: var(--paper); }
.book-page-chapter { background: var(--page-bg, var(--book-ch1)); color: var(--page-color, var(--ink)); }
.book-page-cover { background: var(--book-terracotta); color: #fbf7f0; align-items: center; justify-content: center; text-align: center; }
.book-page-cover .book-page-inner { align-items: center; justify-content: center; gap: 0.9rem; }
.book-cover-mark2 { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem); letter-spacing: 0.16em; }
.book-cover-sub2 { font-family: var(--serif); font-style: italic; }
.book-cover-line2 { width: 54px; height: 1px; background: var(--gold); }
.book-cover-foot2 { font-family: var(--sans); font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.85; }

.book-runner { display: flex; justify-content: space-between; font-family: var(--sans); font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
.book-folio { position: absolute; bottom: 0.7rem; right: 1rem; font-size: 0.62rem; letter-spacing: 0.12em; color: var(--muted); }
.book-page-chapter .book-folio, .book-page-chapter .book-runner { color: color-mix(in srgb, var(--page-color, #111) 60%, transparent); }

.book-ghost { position: absolute; right: -0.4rem; top: 18%; font-family: var(--serif); font-weight: 500; font-size: clamp(7rem, 16vw, 13rem); line-height: 0.8; color: color-mix(in srgb, var(--page-color, #111) 12%, transparent); pointer-events: none; }
.book-chapter-copy { margin-top: auto; max-width: 84%; }
.book-chapter-copy h3 { font-family: var(--serif); font-weight: 500; font-size: clamp(1.8rem, 3.4vw, 2.8rem); margin: 0 0 0.3rem; }
.book-chapter-sub { font-family: var(--serif); font-style: italic; margin: 0 0 0.7rem; opacity: 0.85; }
.book-chapter-copy p { font-size: 0.82rem; line-height: 1.5; font-weight: 300; }
.book-swatches { display: inline-flex; gap: 0.4rem; margin-top: 0.9rem; }
.book-swatches i { width: 16px; height: 16px; border-radius: 50%; display: inline-block; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.12); }

.book-img { width: 100%; height: 100%; object-fit: cover; display: block; background: #ece7df; }
.book-cap { font-family: var(--sans); font-size: 0.64rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-top: 0.5rem; }
.book-hero-page .book-arch { flex: 1; margin: 0; min-height: 0; }
.book-arch.arch-top { border-radius: 50% 50% 0 0 / 22% 22% 0 0; overflow: hidden; }
.book-arch.arch-top-frame::after { content: ""; position: absolute; inset: -7px -7px 0 -7px; border: 1px solid var(--gold); border-bottom: 0; border-radius: 50% 50% 0 0 / 22% 22% 0 0; pointer-events: none; }
.book-tall, .book-gal-big { flex: 1; margin: 0; min-height: 0; position: relative; }
.book-gal-sm { flex: 1; margin: 0 0 0.6rem; min-height: 0; position: relative; }
.book-gal-sm:last-of-type { margin-bottom: 0; }

.book-spread-img { position: absolute; inset: 0; background-size: 200% 100%; background-position: left center; }
.book-spread-r .book-spread-img { background-position: right center; }

.book-quote { margin: auto 0; font-family: var(--serif); font-weight: 500; font-size: clamp(1.6rem, 3.4vw, 2.8rem); line-height: 1.04; max-width: 16ch; }
.book-cta { margin: auto 0; }
.book-cta p { font-family: var(--serif); font-style: italic; font-size: 1.1rem; margin: 0 0 1.2rem; }
.book-toc { list-style: none; margin: auto 0 0; padding: 0; }
.book-toc li { display: flex; align-items: baseline; gap: 0.6rem; padding: 0.6rem 0; border-top: 1px solid var(--line); font-size: 0.9rem; }
.book-toc b { font-family: var(--serif); font-size: 1.4rem; font-weight: 500; }
.book-toc i { margin-left: auto; color: var(--muted); font-style: italic; font-size: 0.78rem; }
.book-intro-k { font-size: 0.66rem; letter-spacing: 0.26em; text-transform: uppercase; color: var(--muted); }
.book-intro { font-family: var(--serif); font-size: 1.1rem; line-height: 1.4; max-width: 22ch; }
```

- [ ] **Step 3: Гейт A**

Run: `cd /home/h2e/Root/siteArka && node test-site.js`
Expected: `Arka site static checks passed.` (если упадёт на dash - искать `—`/`–` в book.js и заменить на `-`).

- [ ] **Step 4: Проверить, что страницы построились (через Playwright, без флипа)**

Run:
```bash
cd /home/h2e/Root/siteArka
node -e "const{chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage();await p.goto('file://'+process.cwd()+'/index.html',{waitUntil:'networkidle'});const n=await p.evaluate(()=>document.querySelectorAll('.book-mount .book-page').length);console.log('pages built: '+n);await b.close();})()"
```
Expected: `pages built: 20` (чётное; если 19 - проверить blank-добивку; если 0 - проверить window.ARKA_PROJECTS / порядок подключения скриптов).

- [ ] **Step 5: Commit**

```bash
cd /home/h2e/Root/siteArka
git add book.js styles.css
git commit -m "Book: build pages from data (cover, contents, chapters, gallery, final)"
```

---

## Task 6: Инициализация StPageFlip по клику (initFlip)

**Files:**
- Modify: `book.js`, `styles.css`

- [ ] **Step 1: Добавить инициализацию флипа**

В `book.js` ВНУТРИ IIFE, перед строкой `window.ARKA_BOOK = ...`, добавить:
```javascript
  var Flip = (window.St && window.St.PageFlip) || window.PageFlip || null;
  var pageFlip = null;

  function makeVisibleSizing() {
    // StPageFlip требует измеримый контейнер: показываем mount до init
    mount.style.display = "block";
  }

  function initFlip() {
    if (pageFlip || !Flip) return;
    makeVisibleSizing();
    pageFlip = new Flip(mount, {
      width: 460, height: 530,
      size: "stretch",
      minWidth: 280, maxWidth: 720,
      minHeight: 320, maxHeight: 820,
      maxShadowOpacity: 0.22,
      drawShadow: true,
      flippingTime: 720,
      usePortrait: true,
      showCover: true,
      mobileScrollSupport: false,
      useMouseEvents: true,
      clickEventForward: false,
      disableFlipByClick: true,
      showPageCorners: true
    });
    pageFlip.loadFromHTML(mount.querySelectorAll(".book-page"));
    document.querySelector(".book-stage").classList.add("is-open");
    var controls = document.querySelector(".book-controls");
    if (controls) controls.hidden = false;
    if (window.ARKA_BOOK.onFlipReady) window.ARKA_BOOK.onFlipReady(pageFlip);
  }

  function openBook() {
    var closed = document.querySelector(".book-closed");
    if (closed) closed.classList.add("is-gone");
    initFlip();
  }

  var closedEl = document.querySelector(".book-closed");
  if (closedEl) {
    closedEl.addEventListener("click", openBook);
    closedEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBook(); }
    });
  }
```
И в объект экспорта добавить ссылки:
```javascript
  window.ARKA_BOOK = { build: build, mount: mount, stage: stage, initFlip: initFlip, getFlip: function () { return pageFlip; } };
```

- [ ] **Step 2: Стили открытия (стейдж раскрыт, обложка ушла)**

В `styles.css` добавить:
```css
.book-closed.is-gone { opacity: 0; transform: rotateX(2deg) scale(0.96); pointer-events: none; }
.book-stage.is-open .book-closed { display: none; }
.book-stage.is-open .book-mount { display: block; }
.book-controls { position: absolute; bottom: 0.6rem; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 0.8rem; }
.book-controls button { background: none; border: 0; cursor: pointer; font-family: var(--sans); color: var(--ink); }
.book-prev, .book-next { font-size: 1.6rem; line-height: 1; color: var(--gold); padding: 0 0.4rem; }
.book-indicator { font-size: 0.7rem; letter-spacing: 0.16em; color: var(--muted); min-width: 5ch; text-align: center; }
.book-close { font-size: 0.66rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
```

- [ ] **Step 3: Скриншот открытого разворота (через Playwright со скриптом-кликом)**

Создать `tools/shot-open.js`:
```javascript
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const width = parseInt(process.argv[2] || '1440', 10);
(async () => {
  fs.mkdirSync(path.join(root, 'output', 'shots'), { recursive: true });
  const b = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width, height: Math.round(width * 0.7) }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(root, 'index.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts && document.fonts.ready);
  await p.click('.book-closed');
  await p.waitForTimeout(1200);
  const out = path.join(root, 'output', 'shots', 'book-open-' + width + '.png');
  await p.screenshot({ path: out });
  console.log('saved ' + out);
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
```
Run: `cd /home/h2e/Root/siteArka && node tools/shot-open.js 1440`
Открыть PNG. Критерий: открытая книга с двумя видимыми страницами (обложка/первый разворот), корешок, мягкая тень; не пустая. Если пусто - проверить имя глобала Flip (Задача 2 Step 3) и что `mount` имел размер при init.

- [ ] **Step 4: Гейт A + консоль**

Run: `cd /home/h2e/Root/siteArka && node test-site.js` -> pass.
Run: `cd /home/h2e/Root/siteArka && node tools/console-check.js` -> `no console errors`.

- [ ] **Step 5: Commit**

```bash
cd /home/h2e/Root/siteArka
git add book.js styles.css tools/shot-open.js
git commit -m "Book: mount StPageFlip on cover click (matte settings, portrait)"
```

---

## Task 7: Навигация (клик-половины, стрелки, клавиши, индикатор, закрытие, содержание)

**Files:**
- Modify: `book.js`

- [ ] **Step 1: Реализовать wireNav и подключить к initFlip**

В `book.js` добавить функцию (перед `window.ARKA_BOOK = ...`):
```javascript
  function pad2(n) { return ("0" + n).slice(-2); }

  function wireNav(flip) {
    var total = flip.getPageCount();
    var indicator = document.querySelector(".book-indicator");
    var prev = document.querySelector(".book-prev");
    var next = document.querySelector(".book-next");
    var close = document.querySelector(".book-close");

    function refresh() {
      var i = flip.getCurrentPageIndex() + 1;
      if (indicator) indicator.textContent = pad2(i) + " / " + pad2(total);
    }
    flip.on("flip", refresh);
    refresh();

    if (prev) prev.addEventListener("click", function () { flip.flipPrev(); });
    if (next) next.addEventListener("click", function () { flip.flipNext(); });

    // клик по половинам разворота
    mount.addEventListener("click", function (e) {
      var rect = mount.getBoundingClientRect();
      if (e.clientX < rect.left + rect.width / 2) flip.flipPrev();
      else flip.flipNext();
    });

    // клавиатура (только когда секция в фокусе/видна)
    document.addEventListener("keydown", function (e) {
      if (document.querySelector(".book-stage.is-open") == null) return;
      if (e.key === "ArrowLeft") flip.flipPrev();
      if (e.key === "ArrowRight") flip.flipNext();
    });

    // содержание: клик по пункту -> переход к опенеру главы
    var openerIndex = {};
    var pages = mount.querySelectorAll(".book-page");
    var ci = 0;
    pages.forEach(function (el, idx) {
      if (el.classList.contains("book-page-chapter")) { openerIndex[ci] = idx; ci += 1; }
    });
    var tocItems = mount.querySelectorAll(".book-toc li");
    tocItems.forEach(function (li, k) {
      li.style.cursor = "pointer";
      li.addEventListener("click", function (e) {
        e.stopPropagation();
        if (openerIndex[k] != null) flip.turnToPage(openerIndex[k]);
      });
    });

    if (close) close.addEventListener("click", function () {
      var stageEl = document.querySelector(".book-stage");
      stageEl.classList.remove("is-open");
      var closedEl2 = document.querySelector(".book-closed");
      if (closedEl2) closedEl2.classList.remove("is-gone");
      var controls = document.querySelector(".book-controls");
      if (controls) controls.hidden = true;
    });
  }

  window.ARKA_BOOK = window.ARKA_BOOK || {};
  window.ARKA_BOOK.onFlipReady = function (flip) { wireNav(flip); };
```

ВАЖНО: убедиться, что `onFlipReady` определён ДО вызова `initFlip()`. Поскольку клик происходит позже, порядок в файле допускает определение после, но безопаснее присвоить `window.ARKA_BOOK.onFlipReady` сразу после объявления `wireNav`. Проверить, что в initFlip есть вызов `if (window.ARKA_BOOK.onFlipReady) window.ARKA_BOOK.onFlipReady(pageFlip);` (добавлен в Задаче 6).

- [ ] **Step 2: Проверка навигации (Playwright: открыть, листнуть, прочитать индикатор)**

Run:
```bash
cd /home/h2e/Root/siteArka
node -e "const{chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto('file://'+process.cwd()+'/index.html',{waitUntil:'networkidle'});await p.click('.book-closed');await p.waitForTimeout(900);await p.click('.book-next');await p.waitForTimeout(900);const t=await p.evaluate(()=>document.querySelector('.book-indicator').textContent);console.log('indicator after next: '+t);await b.close();})()"
```
Expected: индикатор изменился с `01 / 20` (страница продвинулась, например `03 / 20` для разворота). Любое продвижение = успех.

- [ ] **Step 3: Гейт A + консоль**

Run: `node test-site.js` -> pass. Run: `node tools/console-check.js` -> ok.

- [ ] **Step 4: Commit**

```bash
cd /home/h2e/Root/siteArka
git add book.js
git commit -m "Book navigation: half-click, arrows, keyboard, indicator, contents jump, close"
```

---

## Task 8: Ленивая загрузка соседних страниц (wireLazy)

**Files:**
- Modify: `book.js`

- [ ] **Step 1: Реализовать wireLazy**

В `book.js` добавить:
```javascript
  function wireLazy(flip) {
    var imgs = Array.prototype.slice.call(mount.querySelectorAll(".book-img"));
    function loadAround(centerIndex) {
      // грузим текущий разворот и соседний (по 4 страницы вперёд/назад)
      imgs.forEach(function (img) {
        var pageEl = img.closest(".book-page");
        var idx = Array.prototype.indexOf.call(mount.children, pageEl);
        if (Math.abs(idx - centerIndex) <= 4 && img.dataset.src && !img.src) {
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        }
      });
    }
    loadAround(0);
    flip.on("flip", function (e) { loadAround(e.data); });
  }
```
И вызвать её внутри `onFlipReady` рядом с `wireNav`:
```javascript
  window.ARKA_BOOK.onFlipReady = function (flip) { wireNav(flip); wireLazy(flip); };
```

- [ ] **Step 2: Проверка, что соседние картинки получают src после флипа**

Run:
```bash
cd /home/h2e/Root/siteArka
node -e "const{chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto('file://'+process.cwd()+'/index.html',{waitUntil:'networkidle'});await p.click('.book-closed');await p.waitForTimeout(800);const before=await p.evaluate(()=>[...document.querySelectorAll('.book-img')].filter(i=>i.src).length);await p.click('.book-next');await p.waitForTimeout(800);await p.click('.book-next');await p.waitForTimeout(800);const after=await p.evaluate(()=>[...document.querySelectorAll('.book-img')].filter(i=>i.src).length);console.log('loaded before:'+before+' after:'+after);await b.close();})()"
```
Expected: `after` больше `before` (по мере листания подгружаются соседи); не все 12 сразу.

- [ ] **Step 3: Гейт A + консоль -> pass. Commit**

```bash
cd /home/h2e/Root/siteArka
git add book.js
git commit -m "Book: lazy-load images around current spread"
```

---

## Task 9: Звук перелистывания (wireSound, тумблер, по умолчанию выкл)

**Files:**
- Modify: `book.js`, `index.html`, `styles.css`

- [ ] **Step 1: Добавить тумблер звука в контролы**

В `index.html` внутри `.book-controls` после `.book-close` добавить:
```html
            <button class="book-sound" type="button" aria-pressed="false" aria-label="Звук перелистывания">Звук</button>
```

- [ ] **Step 2: Реализовать wireSound**

В `book.js` добавить:
```javascript
  function wireSound(flip) {
    var btn = document.querySelector(".book-sound");
    if (!btn) return;
    var on = false;
    try { on = localStorage.getItem("arka-book-sound") === "1"; } catch (e) {}
    var audio = null;
    function ensureAudio() {
      if (audio) return audio;
      audio = new Audio("assets/sound/page-turn.mp3");
      audio.volume = 0.4;
      return audio;
    }
    function reflect() {
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("is-on", on);
    }
    reflect();
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      on = !on;
      try { localStorage.setItem("arka-book-sound", on ? "1" : "0"); } catch (e2) {}
      reflect();
    });
    flip.on("flip", function () {
      if (!on) return;
      var a = ensureAudio();
      try { a.currentTime = 0; a.play().catch(function () {}); } catch (e3) {}
    });
  }
```
Вызвать в `onFlipReady`:
```javascript
  window.ARKA_BOOK.onFlipReady = function (flip) { wireNav(flip); wireLazy(flip); wireSound(flip); };
```

- [ ] **Step 3: Стиль активного тумблера**

В `styles.css` добавить:
```css
.book-sound { font-size: 0.66rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
.book-sound.is-on { color: var(--gold); }
```

- [ ] **Step 4: Проверка тумблера (без файла звука ошибок быть не должно)**

Файл `assets/sound/page-turn.mp3` - внешний вход (см. спека §12). До его появления отсутствие файла НЕ должно ломать страницу (play().catch гасит ошибку; 404 при выключенном звуке не запрашивается, т.к. audio создаётся лениво только при включённом звуке и первом флипе).

Run: `cd /home/h2e/Root/siteArka && node tools/console-check.js`
Expected: `no console errors` (звук по умолчанию выкл, аудио не создаётся).

- [ ] **Step 5: Гейт A -> pass. Commit**

```bash
cd /home/h2e/Root/siteArka
git add book.js index.html styles.css
git commit -m "Book: page-turn sound toggle (off by default, lazy audio)"
```

---

## Task 10: Reduced-motion, мобильный режим, адаптивность

**Files:**
- Modify: `styles.css`, `book.js`

- [ ] **Step 1: Сократить движение при reduced-motion (флип короче, без наклона/подъёма)**

В `styles.css` добавить:
```css
@media (prefers-reduced-motion: reduce) {
  .book-closed { transform: none; transition: opacity 200ms linear; }
  .book-closed:hover { transform: none; }
  .book-closed.is-gone { transform: none; }
}
```

В `book.js` в `initFlip()` сделать flippingTime зависимым от reduced-motion: заменить строку `flippingTime: 720,` на:
```javascript
      flippingTime: (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ? 1 : 720,
```

- [ ] **Step 2: Мобильные стили секции и книги**

В `styles.css` в существующий блок `@media (max-width: 767px)` (или создать новый, если отсутствует) добавить:
```css
@media (max-width: 767px) {
  .works-section { padding: clamp(3rem, 8vw, 5rem) 1rem; }
  .book-stage { min-height: 78vh; padding: 0.6rem; perspective: 1400px; }
  .book-closed { width: min(78vw, 320px); }
  .book-band { font-size: 0.78rem; }
  .book-controls { gap: 0.5rem; flex-wrap: wrap; justify-content: center; }
  .book-ghost { font-size: clamp(5rem, 26vw, 9rem); }
}
```
(StPageFlip с `usePortrait: true` сам переходит на одну страницу на узких экранах; дополнительной JS-логики не требуется.)

- [ ] **Step 3: Скриншоты трёх ширин (закрытая и открытая книга)**

Run:
```bash
cd /home/h2e/Root/siteArka
node tools/screenshot.js works-1440 1440 full
node tools/screenshot.js works-768 768 full
node tools/screenshot.js works-390 390 full
node tools/shot-open.js 1440
node tools/shot-open.js 390
```
Открыть все (Read). Критерий: на 1440/768/390 нет горизонтального скролла, текст и фото не перекрываются, книга помещается; на 390 открытая книга показывает одну страницу за раз, контролы переносятся аккуратно.

- [ ] **Step 4: Гейт A + консоль -> pass. Commit**

```bash
cd /home/h2e/Root/siteArka
git add styles.css book.js
git commit -m "Book: reduced-motion + responsive (mobile portrait, controls wrap)"
```

---

## Task 11: A11y-фокус, финальная приёмка, очистка

**Files:**
- Modify: `styles.css`, `index.html`; Move: `photo_*.jpg` -> `_ref/`

- [ ] **Step 1: Видимый keyboard-focus (если отсутствует глобально)**

Проверить наличие правила focus-visible в `styles.css`. Если его нет, добавить:
```css
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, .book-closed:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}
```

- [ ] **Step 2: Убрать референс-картинки из корня**

Run:
```bash
cd /home/h2e/Root/siteArka
mkdir -p _ref
git mv photo_2026-06-16_14-30-56.jpg _ref/ 2>/dev/null || mv photo_2026-06-16_14-30-56.jpg _ref/
git mv photo_2026-06-25_19-48-34.jpg _ref/ 2>/dev/null || mv photo_2026-06-25_19-48-34.jpg _ref/
git rm --cached _ref/*.jpg 2>/dev/null || true
ls _ref
```
(`_ref/` уже в `.gitignore` из Задачи 1; так референсы не уедут в прод.)

- [ ] **Step 3: Финальный гейт A + B + C**

Run: `cd /home/h2e/Root/siteArka && node test-site.js`
Expected: `Arka site static checks passed.`

Run: `cd /home/h2e/Root/siteArka && node tools/test-book-data.js`
Expected: `book-data invariant OK`.

Run: `cd /home/h2e/Root/siteArka && node tools/console-check.js`
Expected: `no console errors`.

Run: `cd /home/h2e/Root/siteArka && node tools/shot-open.js 1440` и `node tools/screenshot.js final-mobile 390 full`
Открыть оба. Сверить с критериями приёмки спеки §13.

- [ ] **Step 4: Сверка с критериями приёмки спеки §13**

Пройтись по чек-листу и зафиксировать текстом: книга как объект (тень/торец/наклон); плавное листание клик/свайп/клавиши; 12 кадров по одному разу; палитры глав рифмуются; терракотовая обложка; арка-вырубка и двойной кадр присутствуют; вес кадров ~3-4 МБ; нет горизонтального скролла на 1440/768/390.

- [ ] **Step 5: Финальный commit**

```bash
cd /home/h2e/Root/siteArka
git add styles.css index.html
git commit -m "Book: focus-visible a11y, move reference images out of deploy, final acceptance"
```

- [ ] **Step 6 (опционально, по запросу пользователя): деплой**

Push в `main` запускает GitHub Pages workflow. НЕ делать без явного разрешения пользователя.
```bash
cd /home/h2e/Root/siteArka && git push github-sitearka main
```

---

## Self-Review (выполнено автором плана)

- **Покрытие спеки:** §1 размещение/механика -> T4,T6; §2 решения (терракота-обложка, 4 акцента, палитра-на-главу) -> обложка T4/T5, арка-вырубка T5(arch-top), двойной кадр T5(climax/spread), манжетка T4(book-band), звук T9, палитры T1+T5; §3 токены -> T4; §4 модель страниц (20 стр, инвариант 4/проект) -> T3(тест)+T5(build); §5 фурнитура (раннеры/фолио/призрак/подписи) -> T5; §6 стейдж-объект (тень/торец/наклон/манжетка) -> T4; §7 данные/компоненты -> T1(tools),T3(data),T5-T9(book.js функции); §8 взаимодействие/a11y/noscript -> T4(noscript),T7(нав),T10(reduced-motion),T11(focus); §9 производительность (WebP/lazy) -> T1,T8; §10 файлы -> все задачи; §11 гейт -> T0; §12 открытые входы (звук-файл, реальные имена) -> отмечены в T9/data; §13 приёмка -> T11. Пробелов нет.
- **Плейсхолдеры:** код приведён в каждом изменяющем шаге; «реальные данные» и «файл звука» помечены как внешние входы, не блокируют (плейсхолдеры функционируют).
- **Консистентность имён:** `book-mount`/`.book-page`/`.book-closed`/`.book-stage` едины; функции `build/initFlip/wireNav/wireLazy/wireSound` согласованы; `window.ARKA_BOOK.onFlipReady` определяется до клика и вызывается в `initFlip`; глобал StPageFlip проверяется (T2S3) и используется как `Flip` (T6).
- **Риск-ноты:** (1) имя UMD-глобала StPageFlip подтверждается в T2S3 - если не `St.PageFlip`, исправить в T6. (2) StPageFlip требует измеримый контейнер: `mount` показывается (`display:block`) до `loadFromHTML` (T6 makeVisibleSizing). (3) Двойной кадр на мягком сгибе слегка изгибается у корешка - приемлемо. (4) `output/` в .gitignore, чтобы скриншоты не коммитились.

## Открытые входы (не блокируют старт)
- `assets/sound/page-turn.mp3` - короткий шелест (внешний вход; тумблер работает и без файла).
- Реальные названия/описания проектов - подмена в `book-data.js`.
- Точные hex палитр глав - уточняются по `tools/sample-palette.js` (T1S7).
