import { test } from "@playwright/test";

test("Capture specific sections for visual analysis", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Force light theme since it's the strict requirement from the prompt
    await page.evaluate(() => {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        document.documentElement.style.colorScheme = "light";
    });
    await page.waitForTimeout(500);

    // 1. Hero Section (mix-blend-difference check)
    const hero = page.locator("section").first();
    await hero.screenshot({ path: "e2e/screenshots/analysis-hero.png" });

    // 2. Commercial Category (Reusable placeholder image check)
    const commercial = page.locator("#commercial");
    await commercial.screenshot({ path: "e2e/screenshots/analysis-commercial.png" });

    // 3. Packages (Checking layout, hover, and border-radius)
    const packages = page.locator("#packages");
    await packages.screenshot({ path: "e2e/screenshots/analysis-packages.png" });

    // 4. Contacts (Checking dummy data)
    const contacts = page.locator("#contacts");
    await contacts.screenshot({ path: "e2e/screenshots/analysis-contacts.png" });
});
