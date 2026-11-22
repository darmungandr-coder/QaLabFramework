import type { Locator, Page, Response } from "@playwright/test";
import { loginCopy } from "../constants/login-copy";

export const loginPath = "/web/login";

export class LoginPage {
  readonly title: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly usernameLabel: Locator;
  readonly passwordLabel: Locator;
  readonly logInButton: Locator;
  readonly switchToEmailButton: Locator;
  readonly switchToPasswordButton: Locator;
  readonly email: Locator;
  readonly emailHint: Locator;
  readonly sendEmailButton: Locator;
  readonly failureTitle: Locator;
  readonly failureMessage: Locator;

  constructor(private readonly page: Page) {
    this.title = this.page.getByText(loginCopy.title, { exact: true });
    this.username = this.page.getByLabel("login-username", { exact: true });
    this.password = this.page.getByLabel("login-password", { exact: true });
    this.usernameLabel = this.page.getByText(new RegExp(`^${loginCopy.usernameLabel}\\s*\\*?$`));
    this.passwordLabel = this.page.getByText(new RegExp(`^${loginCopy.passwordLabel}\\s*\\*?$`));
    this.logInButton = this.page.getByRole("button", { name: loginCopy.logIn, exact: true });
    this.switchToEmailButton = this.page.getByRole("button", {
      name: loginCopy.switchToEmail,
      exact: true,
    });
    this.switchToPasswordButton = this.page.getByRole("button", {
      name: loginCopy.switchToPassword,
      exact: true,
    });
    this.email = this.page.getByRole("textbox", { name: loginCopy.emailLabel });
    this.emailHint = this.page.getByText(loginCopy.emailHint, { exact: true });
    this.sendEmailButton = this.page.getByRole("button", { name: loginCopy.sendEmail, exact: true });
    this.failureTitle = this.page.getByText(loginCopy.failureTitle, { exact: true });
    this.failureMessage = this.page.getByText(loginCopy.failureMessage, { exact: true });
  }

  async open() {
    await this.page.goto(loginPath);
  }

  async submitCredentials(username: string, password: string): Promise<Response> {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      await this.username.fill(username);
      await this.password.fill(password);
      const loginResponse = this.page
        .waitForResponse(
          (response) =>
            response.request().method() === "POST" &&
            /\/api\/auth\/v1\/auth\/login\/?$/.test(new URL(response.url()).pathname),
          { timeout: 5_000 },
        )
        .catch(() => undefined);

      await this.logInButton.click();
      const response = await loginResponse;

      if (response) {
        return response;
      }
    }

    throw new Error("The login form did not send a sign-in request after two attempts.");
  }
}
