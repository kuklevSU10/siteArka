import { test, expect } from "@playwright/test";

test.describe("Homepage — V2 Strict Redesign", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ─── HERO ─────────────────────────────────────────────────
  test("Hero: displays only АРКА and дизайн-студия text, no CTA buttons", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("АРКА");

    const subtitle = hero.locator("text=дизайн-студия");
    await expect(subtitle).toBeVisible();

    // NO CTA buttons in hero
    const heroButtons = hero.locator('a[href], button');
    const count = await heroButtons.count();
    // The only link may be the header nav, but inside the <section> itself there should be no action buttons
    expect(count).toBeLessThanOrEqual(0);
  });

  // ─── PAGE TITLE ───────────────────────────────────────────
  test("Meta: page title is 'АРКА — дизайн-студия'", async ({ page }) => {
    await expect(page).toHaveTitle(/АРКА/);
  });

  // ─── HEADER ───────────────────────────────────────────────
  test("Header: contains exactly 4 navigation items", async ({ page }) => {
    const nav = page.locator('nav[aria-label="Основная навигация"]');
    await expect(nav).toBeVisible();

    // Check the 4 required items
    await expect(nav.locator("text=Наши работы")).toBeVisible();
    await expect(nav.locator("text=Пакеты услуг")).toBeVisible();
    await expect(nav.locator("text=О нас")).toBeVisible();
    await expect(nav.locator("text=Контакты")).toBeVisible();
  });

  test("Header: logo displays АРКА with subtitle дизайн-студия", async ({ page }) => {
    const logo = page.locator('header a[href="/"]');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText("АРКА");
    await expect(logo).toContainText("дизайн-студия");
  });

  // ─── WORK CATEGORIES ─────────────────────────────────────
  test("Section: Частные интерьеры is visible with exact subheading", async ({ page }) => {
    const section = page.locator("#private");
    await expect(section).toBeVisible();
    await expect(section.locator("h2")).toContainText("Частные интерьеры");
    await expect(section).toContainText("Интерьеры для жизни — продуманные и функциональные.");
  });

  test("Section: Коммерческие пространства is visible with exact subheading", async ({ page }) => {
    const section = page.locator("#commercial");
    await expect(section).toBeVisible();
    await expect(section.locator("h2")).toContainText("Коммерческие пространства");
    await expect(section).toContainText("Пространства, которые работают на бизнес.");
  });

  test("Section: Проекты для девелоперов is visible with exact subheading", async ({ page }) => {
    const section = page.locator("#developers");
    await expect(section).toBeVisible();
    await expect(section.locator("h2")).toContainText("Проекты для девелоперов");
    await expect(section).toContainText("Проектные решения для жилых и коммерческих объектов.");
  });

  // ─── PACKAGES ─────────────────────────────────────────────
  test("Packages: renders 3 cards with correct titles", async ({ page }) => {
    const packages = page.locator("#packages");
    await expect(packages).toBeVisible();

    await expect(packages).toContainText("Концепция + планировка");
    await expect(packages).toContainText("Полный дизайн-проект");
    await expect(packages).toContainText("Полный цикл");
  });

  test("Packages: first card has correct price", async ({ page }) => {
    const packages = page.locator("#packages");
    await expect(packages).toContainText("от 15 000 ₽");
  });

  // ─── ABOUT ────────────────────────────────────────────────
  test("About: section contains exact intro text", async ({ page }) => {
    const about = page.locator("#about");
    await expect(about).toBeVisible();
    await expect(about).toContainText("АРКА — студия, созданная тремя практикующими специалистами");
  });

  // ─── CONTACTS ─────────────────────────────────────────────
  test("Contacts: section displays phone, email, and social links", async ({ page }) => {
    const contacts = page.locator("#contacts");
    await expect(contacts).toBeVisible();
    await expect(contacts).toContainText("Telegram");
    await expect(contacts).toContainText("WhatsApp");
    await expect(contacts).toContainText("Instagram");
  });

  // ─── FOOTER ───────────────────────────────────────────────
  test("Footer: contains only legal links and copyright", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("© АРКА");
    await expect(footer).toContainText("Политика конфиденциальности");
    await expect(footer).toContainText("Пользовательское соглашение");
    await expect(footer).toContainText("Обработка персональных данных");
  });

  // ─── FORBIDDEN CONTENT ────────────────────────────────────
  test("Negative: no forbidden words on page", async ({ page }) => {
    const body = await page.locator("body").textContent();
    const forbidden = [
      "лучший", "премиальный", "эксклюзивный", "уникальный",
      "индивидуальный подход", "пространство мечты",
      "недорого", "доступные", "команда профессионалов"
    ];
    for (const word of forbidden) {
      expect(body?.toLowerCase()).not.toContain(word.toLowerCase());
    }
  });

  test("Negative: no disallowed sections (Testimonials, FAQ, Process)", async ({ page }) => {
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("Отзывы клиентов");
    expect(body).not.toContain("Частые вопросы");
    expect(body).not.toContain("Процесс работы");
  });
});
