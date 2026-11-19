import { expect, test } from "@playwright/test";

test("TC-SMOKE-001: InvenTree login page is available", async ({ page }) => {
  await page.goto("/web/login");

  await expect(page.getByLabel("login-username")).toBeVisible();
  await expect(page.getByLabel("login-password")).toBeVisible();
});
