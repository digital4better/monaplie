import { expect, test } from "@playwright/test";

test("index page has expected description", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  expect(await page.textContent(".header--motd")).toBeDefined;
});
