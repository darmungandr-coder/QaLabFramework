import type { Page } from "@playwright/test";

export const homePath = "/web/home";

export class HomePage {
  constructor(private readonly page: Page) {}

  async closeOverlay() {
    await this.page.keyboard.press("Escape");
  }

  private button(name: string) {
    return this.page.getByRole("button", { name, exact: true });
  }

  get dialog() {
    return this.page.getByRole("dialog");
  }

  title(username: string) {
    return this.page.getByText(`InvenTree - ${username}`, { exact: true });
  }

  tab(name: string, selected?: boolean) {
    return this.page.getByRole("tablist").getByRole("tab", { name, exact: true, selected });
  }

  navigationLink(name: string) {
    return this.dialog.getByRole("link", { name, exact: true });
  }

  helpAction(name: string) {
    return this.dialog.getByRole("button", { name, exact: true });
  }

  accountButton(username: string) {
    return this.button(username);
  }

  accountAction(name: string) {
    return this.accountMenu.getByRole("menuitem", { name, exact: true });
  }

  get serverAlerts() {
    return this.alertMenu.getByRole("menuitem", { name: /^INVE-/ }).filter({
      has: this.page.getByRole("alert"),
    });
  }

  slideLink(topic: string) {
    return this.carousel.getByRole("group", { name: "Carousel slide" })
      .filter({ has: this.page.getByText(topic, { exact: true }) })
      .getByRole("link", { name: "Read More", exact: true });
  }

  get logo() {
    return this.navigationButton.getByRole("img", { name: "InvenTree Logo" });
  }

  get navigationButton() {
    return this.button("navigation-menu");
  }

  get dashboardMenuButton() {
    return this.button("dashboard-menu");
  }

  get searchButton() {
    return this.button("open-search");
  }

  get spotlightButton() {
    return this.button("open-spotlight");
  }

  get barcodeButton() {
    return this.button("barcode-scan-button-any");
  }

  get notificationsButton() {
    return this.button("open-notifications");
  }

  get alertsButton() {
    return this.button("open-alerts");
  }

  get acceptLayoutButton() {
    return this.button("dashboard-accept-layout");
  }

  get clearWidgetFilter() {
    return this.widgetLibrary.getByRole("img", {
      name: "dashboard-widgets-filter-clear",
    });
  }

  private get superuserWarning() {
    return this.page.getByRole("alert", { name: "Superuser Mode", exact: true });
  }

  get warningHelp() {
    return this.superuserWarning.getByRole("link", { name: "Learn more about INVE-W14" });
  }

  get globalSearch() {
    return this.dialog.getByRole("textbox", { name: "global-search-input" });
  }

  get noSearchResults() {
    return this.page.getByText("No results available for search query", { exact: true });
  }

  get spotlightSearch() {
    return this.dialog.getByRole("textbox", { name: "Search..." });
  }

  get spotlightDashboard() {
    return this.dialog.getByRole("button", { name: "Dashboard Go to the InvenTree dashboard", exact: true });
  }

  get spotlightHotkeys() {
    return this.dialog.getByRole("button", { name: "Hotkeys View a list of available hotkeys", exact: true });
  }

  private get barcodeDialog() {
    return this.page.getByRole("dialog", { name: "Scan Barcode", exact: true });
  }

  get handheldMode() {
    return this.barcodeDialog.getByRole("radio", { name: "barcode-input-scanner" });
  }

  get cameraMode() {
    return this.barcodeDialog.getByRole("img", { name: "barcode-input-camera" });
  }

  get noBarcode() {
    return this.barcodeDialog.getByRole("alert", { name: "No barcode data" });
  }

  get barcodeInput() {
    return this.barcodeDialog.getByPlaceholder("Enter barcode data", { exact: true });
  }

  get scanButton() {
    return this.barcodeDialog.getByRole("button", { name: "Scan", exact: true });
  }

  get notifications() {
    return this.page.getByRole("dialog", { name: "Notifications", exact: true });
  }

  get notificationsHeading() {
    return this.notifications.getByRole("heading", { name: "Notifications", exact: true });
  }

  get alertMenu() {
    return this.page.getByRole("menu").filter({ has: this.page.getByRole("menuitem", { name: "alerts-view-all" }) });
  }

  get allMessages() {
    return this.alertMenu.getByRole("menuitem", { name: "alerts-view-all" });
  }

  private get accountMenu() {
    return this.page.getByRole("menu").filter({ has: this.page.getByRole("menuitem", { name: "Logout", exact: true }) });
  }

  get logout() {
    return this.accountMenu.getByRole("menuitem", { name: "Logout", exact: true });
  }

  get emptyDashboard() {
    return this.page.getByRole("alert", { name: "No Widgets Selected" });
  }

  get news() {
    return this.page.getByText("News Updates", { exact: true });
  }

  private get carousel() {
    return this.page.getByRole("region").filter({ has: this.button("Next slide") });
  }

  get slidePosition() {
    return this.carousel.getByRole("status");
  }

  get nextSlide() {
    return this.carousel.getByRole("button", { name: "Next slide" });
  }

  get previousSlide() {
    return this.carousel.getByRole("button", { name: "Previous slide" });
  }

  private get dashboardMenu() {
    return this.page.getByRole("menu", { name: "dashboard-menu", exact: true });
  }

  get clearWidgets() {
    return this.dashboardMenu.getByRole("menuitem", { name: "Clear Widgets", exact: true });
  }

  get editLayout() {
    return this.dashboardMenu.getByRole("menuitem", { name: "Edit Layout", exact: true });
  }

  get removeWidgets() {
    return this.dashboardMenu.getByRole("menuitem", { name: "Remove Widgets", exact: true });
  }

  get addWidget() {
    return this.dashboardMenu.getByRole("menuitem", { name: "Add Widget", exact: true });
  }

  private get widgetLibrary() {
    return this.page.getByRole("dialog", { name: "Add Dashboard Widgets", exact: true });
  }

  get widgetFilter() {
    return this.widgetLibrary.getByPlaceholder("Filter dashboard widgets", { exact: true });
  }

  get subscribedParts() {
    return this.widgetLibrary.getByRole("row", { name: /Subscribed Parts/ });
  }

  get subscribedCategories() {
    return this.widgetLibrary.getByRole("row", { name: /Subscribed Categories/ });
  }

  get tourPrompt() {
    return this.page.getByRole("alert").filter({ hasText: "First Use Tour available" });
  }

  get dismissTour() {
    return this.tourPrompt.getByRole("button", { name: "Dismiss permanently" });
  }

  get startTour() {
    return this.tourPrompt.getByRole("button", { name: "Start Tour", exact: true });
  }

  get firstTourStep() {
    return this.page.getByText("Navigation Area", { exact: true });
  }

  get documentation() {
    return this.dialog.getByRole("link", { name: "Documentation", exact: true });
  }
}
