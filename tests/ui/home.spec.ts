import { randomUUID } from "node:crypto";
import {
  accountActions,
  drawerDestinations,
  helpActions,
  homeCopy,
  navigation,
} from "../../src/constants/home-copy";
import { expect, test } from "../../src/fixtures/signed-in.fixture";
import { HomePage, homePath } from "../../src/pages/home.page";
import { LoginPage } from "../../src/pages/login.page";

test.use({ locale: "en-US", trace: "off", screenshot: "off", video: "off" });

test("shows the home dashboard and its top-level navigation", async ({ signedInPage, signedInUsername }) => {
  const home = new HomePage(signedInPage);

  await test.step("Check the logo and top-level tabs", async () => {
    await expect(home.logo).toBeVisible();
    for (const [name] of navigation) {
      await expect(home.tab(name)).toBeVisible();
    }
    await expect(home.tab(homeCopy.dashboard, true)).toBeVisible();
  });

  await test.step("Check the signed-in dashboard", async () => {
    await expect(home.title(signedInUsername)).toBeVisible();
  });
});

test("shows the elevated-privilege warning to a superuser", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  test.skip((await home.warningHelp.count()) === 0, "Requires a superuser account");

  await test.step("Check the privilege warning", async () => {
    await expect(home.warningHelp).toBeVisible();
  });
});

test("opens a top-level section and returns to the dashboard", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  await test.step("Open the Parts section", async () => {
    await home.tab(homeCopy.parts).click();
    await expect(signedInPage).toHaveURL((url) => homeCopy.partsPath.test(url.pathname));
    await expect(home.tab(homeCopy.parts, true)).toBeVisible();
  });

  await test.step("Return to the dashboard", async () => {
    await home.tab(homeCopy.dashboard).click();
    await expect(signedInPage).toHaveURL((url) => url.pathname === homePath);
    await expect(home.dashboardMenuButton).toBeVisible();
  });
});

test("lists navigation destinations and help actions in the navigation drawer", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);
  await test.step("Open the navigation drawer", async () => {
    await home.navigationButton.click();
    await expect(home.dialog).toBeVisible();
  });

  await test.step("Check navigation and settings destinations", async () => {
    for (const [name, path] of drawerDestinations) {
      await expect(home.navigationLink(name)).toHaveAttribute("href", path);
    }
  });

  await test.step("Check help actions and close the drawer", async () => {
    await expect(home.documentation).toBeVisible();
    for (const name of helpActions) {
      await expect(home.helpAction(name)).toBeVisible();
    }
    await home.closeOverlay();
    await expect(home.dialog).toBeHidden();
  });
});

test("shows no global search results for a generated query", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  await test.step("Search for a generated query", async () => {
    await home.searchButton.click();
    await expect(home.globalSearch).toHaveAttribute("placeholder", homeCopy.searchPlaceholder);
    await home.globalSearch.fill(`qa-missing-${randomUUID()}`);
    await expect(home.noSearchResults).toBeVisible();
  });

  await test.step("Close global search", async () => {
    await home.closeOverlay();
    await expect(home.globalSearch).toBeHidden();
  });
});

test("filters Spotlight commands and closes the command palette", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  await test.step("Filter command palette actions", async () => {
    await home.spotlightButton.click();
    await expect(home.spotlightDashboard).toBeVisible();
    await home.spotlightSearch.fill(homeCopy.hotkeysQuery);
    await expect(home.spotlightHotkeys).toBeVisible();
    await expect(home.spotlightDashboard).toBeHidden();
  });

  await test.step("Close the command palette", async () => {
    await home.closeOverlay();
    await expect(home.dialog).toBeHidden();
  });
});

test("enables the barcode scanner when a code is entered", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  await test.step("Check scanner modes and the empty form", async () => {
    await home.barcodeButton.click();
    await expect(home.handheldMode).toBeChecked();
    await expect(home.cameraMode).toBeVisible();
    await expect(home.noBarcode).toBeVisible();
    await expect(home.scanButton).toBeDisabled();
  });

  await test.step("Enter a barcode", async () => {
    await home.barcodeInput.fill(`qa-${randomUUID()}`);
    await expect(home.scanButton).toBeEnabled();
  });

  await test.step("Clear the barcode", async () => {
    await home.barcodeInput.clear();
    await expect(home.scanButton).toBeDisabled();
  });
});

test("opens and closes the notifications drawer", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  await test.step("Open the notifications drawer", async () => {
    await home.notificationsButton.click();
    await expect(home.notificationsHeading).toBeVisible();
  });

  await test.step("Close the notifications drawer", async () => {
    await home.closeOverlay();
    await expect(home.notifications).toBeHidden();
  });
});

test("shows server alerts and the link to all messages", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  await test.step("Check server warnings and the link to all messages", async () => {
    await home.alertsButton.click();
    await expect(home.serverAlerts).not.toHaveCount(0);
    await expect(home.allMessages).toHaveText(homeCopy.allMessages);
  });

  await test.step("Close server alerts", async () => {
    await home.closeOverlay();
    await expect(home.alertMenu).toBeHidden();
  });
});

test("shows account actions and signs out", async ({ signedInPage, signedInUsername }) => {
  const home = new HomePage(signedInPage);

  await test.step("Check the account menu actions", async () => {
    await home.accountButton(signedInUsername).click();
    for (const name of accountActions) {
      await expect(home.accountAction(name)).toBeVisible();
    }
  });

  await test.step("Sign out and check the login form", async () => {
    await home.logout.click();
    await expect(new LoginPage(signedInPage).logInButton).toBeVisible();
  });
});

test("shows the sample dashboard and cycles through getting-started slides", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  test.skip(
    (await home.emptyDashboard.count()) === 0,
    "Requires a profile with an empty dashboard",
  );

  await test.step("Check the sample dashboard widgets", async () => {
    await expect(home.emptyDashboard).toBeVisible();
    await expect(home.news).toBeVisible();
  });

  await test.step("Check the first slide and documentation links", async () => {
    await expect(home.slidePosition).toHaveText(homeCopy.firstSlide);
    for (const topic of homeCopy.topics) {
      await expect(home.slideLink(topic)).toHaveAttribute("href", /^https:\/\//);
    }
  });

  await test.step("Move forward and back through the carousel", async () => {
    await home.nextSlide.click();
    await expect(home.slidePosition).toHaveText(homeCopy.secondSlide);
    await home.previousSlide.click();
    await expect(home.slidePosition).toHaveText(homeCopy.firstSlide);
  });
});

test("opens layout edit and remove modes and returns to the regular dashboard", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  await test.step("Enter and exit layout editing", async () => {
    await home.dashboardMenuButton.click();
    await expect(home.clearWidgets).toBeVisible();
    await home.editLayout.click();
    await expect(home.acceptLayoutButton).toBeVisible();
    await home.acceptLayoutButton.click();
    await expect(home.acceptLayoutButton).toBeHidden();
  });

  await test.step("Enter and exit widget removal mode", async () => {
    await home.dashboardMenuButton.click();
    await home.removeWidgets.click();
    await expect(home.acceptLayoutButton).toBeVisible();
    await home.acceptLayoutButton.click();
    await expect(home.acceptLayoutButton).toBeHidden();
  });
});

test("filters the dashboard widget library and clears the filter", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  await test.step("Open the widget library and check available widgets", async () => {
    await home.dashboardMenuButton.click();
    await home.addWidget.click();
    await expect(home.subscribedParts).toBeVisible();
    await expect(home.subscribedCategories).toBeVisible();
  });

  await test.step("Filter widgets by name", async () => {
    await home.widgetFilter.fill(homeCopy.widgetQuery);
    await expect(home.subscribedParts).toBeVisible();
    await expect(home.subscribedCategories).toBeHidden();
  });

  await test.step("Clear the filter and restore matching widgets", async () => {
    await home.clearWidgetFilter.click();
    await expect(home.widgetFilter).toBeEmpty();
    await expect(home.subscribedCategories).toBeVisible();
  });
});

test("starts the first-use tour from the dashboard", async ({ signedInPage }) => {
  const home = new HomePage(signedInPage);

  test.skip(
    (await home.tourPrompt.count()) === 0,
    "Requires a profile with the first-use tour invitation available",
  );

  await test.step("Start the tour from the first-use prompt", async () => {
    await expect(home.dismissTour).toBeVisible();
    await home.startTour.click();
  });

  await test.step("Check the first tour step", async () => {
    await expect(home.firstTourStep).toBeVisible();
    await expect(home.tourPrompt).toBeHidden();
  });
});
