import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  use: {
    baseURL: "http://localhost:8000",
    browserName: "chromium",
    headless: true
  }
});
