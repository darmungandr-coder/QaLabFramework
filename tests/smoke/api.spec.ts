import { expect, test } from "@playwright/test";

test("TC-SMOKE-002: system health endpoint returns HTTP 200", async ({ request }) => {
  const response = await request.get("/api/system/health/");

  expect(response.status()).toBe(200);
});
