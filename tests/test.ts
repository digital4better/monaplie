import { expect, test } from "@playwright/test";

test("index page has expected description", async ({ page }) => {
  await page.goto("/laplie", { waitUntil: "networkidle" });
  expect(await page.textContent(".header--motd")).toContain(
    "Bienvenue dans “Monaplie”, l'application qui vous aide dans vos démarches"
  );
});
