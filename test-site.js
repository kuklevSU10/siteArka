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
