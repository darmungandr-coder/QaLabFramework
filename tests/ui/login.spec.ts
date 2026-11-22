import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";
import { loginCopy } from "../../src/constants/login-copy";
import { LoginPage, loginPath } from "../../src/pages/login.page";

test.use({ locale: "en-US" });

test("shows the username and password login form", async ({ page }) => {
  const login = new LoginPage(page);

  await test.step("Open the login page", async () => {
    await login.open();
  });

  await test.step("Check the credentials form and available sign-in options", async () => {
    await expect(login.title).toBeVisible();
    await expect(login.usernameLabel).toBeVisible();
    await expect(login.passwordLabel).toBeVisible();
    await expect(login.username).toBeEditable();
    await expect(login.username).toHaveAttribute("placeholder", loginCopy.usernamePlaceholder);
    await expect(login.password).toBeEditable();
    await expect(login.password).toHaveAttribute("placeholder", loginCopy.passwordPlaceholder);
    await expect(login.password).toHaveAttribute("type", "password");
    await expect(login.logInButton).toBeVisible();
    await expect(login.switchToEmailButton).toBeVisible();
  });
});

test("switches between password login and email login", async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();

  await test.step("Switch to email login and check its form", async () => {
    await login.switchToEmailButton.click();
    await expect(login.email).toBeEditable();
    await expect(login.email).toHaveAttribute("placeholder", loginCopy.emailPlaceholder);
    await expect(login.emailHint).toBeVisible();
    await expect(login.sendEmailButton).toBeVisible();
    await expect(login.password).toBeHidden();
  });

  await test.step("Return to username and password login", async () => {
    await login.switchToPasswordButton.click();
    await expect(login.username).toBeEditable();
    await expect(login.password).toBeEditable();
    await expect(login.logInButton).toBeVisible();
    await expect(login.email).toBeHidden();
  });
});

test("rejects credentials for a nonexistent account", async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();

  await test.step("Submit credentials for a generated username", async () => {
    await login.submitCredentials(`qa-missing-${randomUUID()}`, randomUUID());
  });

  await test.step("Check the rejection and confirm the login form is still available", async () => {
    await expect(login.failureTitle).toBeVisible();
    await expect(login.failureMessage).toBeVisible();
    await expect(page).toHaveURL((url) => url.pathname === loginPath);
    await expect(login.logInButton).toBeEnabled();
  });
});
