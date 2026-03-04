import { test, expect } from "@playwright/test";

test("Capture Light and Dark Theme Screenshots", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Wait for fonts and images to load
    await page.waitForLoadState("networkidle");

    // Force light theme
    await page.evaluate(() => {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        document.documentElement.style.colorScheme = "light";
    });

    // Give it a moment to apply
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/light-theme-full.png", fullPage: true });

    // Force dark theme
    await page.evaluate(() => {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
    });

    // Give it a moment to apply
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/dark-theme-full.png", fullPage: true });
});
