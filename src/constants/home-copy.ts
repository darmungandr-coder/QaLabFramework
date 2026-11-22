export const homeCopy = {
  dashboard: "Dashboard",
  parts: "Parts",
  searchPlaceholder: "Enter search text",
  hotkeysQuery: "Hotkeys",
  allMessages: "View all messages",
  widgetQuery: "Subscribed Parts",
  topics: ["Getting Started", "API", "Developer Manual", "FAQ", "GitHub Repository"],
  partsPath: /^\/web\/part(?:\/|$)/,
  firstSlide: /^Slide 1 of \d+$/,
  secondSlide: /^Slide 2 of \d+$/,
} as const;

export const navigation = [
  [homeCopy.dashboard, "/web"],
  [homeCopy.parts, "/web/part"],
  ["Stock", "/web/stock"],
  ["Manufacturing", "/web/manufacturing/"],
  ["Purchasing", "/web/purchasing/"],
  ["Sales", "/web/sales/"],
] as const;

export const drawerDestinations = [
  ...navigation,
  ["Users", "/web/core/index/users"],
  ["Groups", "/web/core/index/groups"],
  ["Notifications", "/web/notifications"],
  ["User Settings", "/web/settings/user"],
  ["System Settings", "/web/settings/system"],
  ["Admin Center", "/web/settings/admin"],
  ["Scan Barcode", "/web/scan"],
] as const;

export const helpActions = ["System Information", "License Information", "First Use Tour", "About InvenTree"] as const;
export const accountActions = ["User Settings", "System Settings", "Admin Center", "Change Color Mode", "About InvenTree"] as const;
