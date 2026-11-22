import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { expect, test as base, type Page } from "@playwright/test";
import { HomePage, homePath } from "../pages/home.page";
import { LoginPage, loginPath } from "../pages/login.page";

if (existsSync(".env.local")) {
  loadEnvFile(".env.local");
}

type Credentials = {
  username: string;
  password: string;
};

type SignedInFixtures = {
  credentials: Credentials;
  signedInPage: Page;
  signedInUsername: string;
};

const configuredCredentials =
  process.env.INVENTREE_USERNAME && process.env.INVENTREE_PASSWORD
    ? {
        username: process.env.INVENTREE_USERNAME,
        password: process.env.INVENTREE_PASSWORD,
      }
    : undefined;

export const test = base.extend<SignedInFixtures>({
  credentials: async ({}, use, testInfo) => {
    testInfo.skip(
      !configuredCredentials,
      "Set INVENTREE_USERNAME and INVENTREE_PASSWORD in .env.local or the environment",
    );

    if (configuredCredentials) {
      await use(configuredCredentials);
    }
  },

  signedInPage: async ({ page, credentials }, use) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);

    await login.open();
    const loginResponse = await login.submitCredentials(credentials.username, credentials.password);
    const signedIn = await page
      .waitForURL((url) => url.pathname === homePath, { timeout: 5_000 })
      .then(() => true)
      .catch(() => false);

    if (!signedIn) {
      await login.password.clear();
      throw new Error(`Sign-in request returned HTTP ${loginResponse.status()}.`);
    }

    await expect(home.dashboardMenuButton).toBeVisible();

    await use(page);

    if (new URL(page.url()).pathname !== loginPath) {
      await page.goto("/web/logout");
      await expect(login.logInButton).toBeVisible();
    }
  },

  signedInUsername: async ({ credentials }, use) => {
    await use(credentials.username);
  },
});

export { expect };
