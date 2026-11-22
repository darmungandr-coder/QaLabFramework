# Playwright E2E Conventions

These conventions apply to Playwright Test code in QA Engineering Lab. They are written for the repository's locked `@playwright/test` version (currently 1.65.1); check the installed version before relying on newer APIs. For uncertainty, consult the official documentation linked below. Do not re-fetch it for routine work.

## Test organization and naming

- Group specs by test layer and feature. Use descriptive `*.spec.ts` names; keep UI and API coverage separate.
- Name each test for the user-visible behavior and expected outcome. Preserve a case ID when it provides useful traceability, but do not let an ID replace a clear description.
- Keep a test focused on one behavior or closely related outcome. Avoid order dependencies and shared mutable state.

## Steps and comments

- Use `test.step()` to label meaningful business or workflow stages, such as preparing an order, submitting it, or confirming the saved result. Do not wrap every click, fill, or assertion in its own step.
- Keep step names concise, specific, and useful in reports. Avoid extra nesting that makes a simple flow harder to read.
- Add short comments only when they explain non-obvious intent, constraints, or workarounds. Comments should explain why; the code and step names should show what.

## Locators and user-facing behavior

- Prefer resilient, user-facing locators: role and accessible name, label, visible text, placeholder, alt text, or title as appropriate.
- Use `getByTestId()` when user-facing semantics are unavailable or ambiguous and a stable test contract exists. Treat CSS selectors, XPath, and DOM structure as last resorts because they couple tests to implementation details.
- Scope locators to a meaningful region when names repeat. Resolve ambiguity deliberately; do not silence strictness by selecting the first match without a behavioral reason.
- Test behavior a user can observe. Avoid asserting private implementation details unless the test specifically covers an integration contract.

## Assertions, waiting, and synchronization

- Prefer Playwright web-first assertions such as `toBeVisible()`, `toHaveText()`, and `toHaveURL()`. These retry until success or timeout. Use generic assertions for values that are not web state, such as a response status.
- Rely on locator actions' built-in actionability checks and Playwright's automatic waiting. Do not add fixed sleeps or `waitForTimeout()` to make a test pass.
- When synchronization needs an explicit signal, wait for that signal (for example, a particular response, URL, or UI state) and assert the expected outcome. Avoid `force` actions or broad waits that hide a real readiness problem.
- Make assertions describe the expected result, not merely that an action completed.

## Page Objects, fixtures, and isolation

- Use Page Objects for repeated, coherent UI areas or workflows. Keep locators and interaction details in the relevant object; expose clear operations and useful state. Keep test intent and primary outcome assertions visible in the spec.
- Do not create a Page Object for every screen by default, or turn objects into generic automation frameworks. Use the direct `page` API for short, clear cases.
- Use Playwright fixtures for shared setup, dependencies, and cleanup with a clear lifecycle. Keep test-specific setup close to the test when abstraction would obscure its intent.
- Preserve per-test isolation: rely on Playwright's fresh browser context, and do not share mutable browser or database state between tests. Tests should remain independently runnable and safe under the configured worker count.
- Create data through supported UI/API/setup paths where practical. Use unique, deterministic test-owned data; clean up only records the test owns. Do not assume fixture/demo records remain unchanged.

## Debugging, reporting, and code quality

- Keep failures diagnosable with clear test and step names and focused assertions. Use the configured Playwright report, traces, screenshots, or other artifacts when investigating failures; do not put secrets or sensitive data in artifacts.
- Prefer simple, typed TypeScript and built-in Playwright Test features. Avoid `any`, duplicated flows, unexplained constants, custom waits, and abstractions without repeated use.
- Fix the underlying readiness, locator, data, or environment issue instead of masking it with retries, longer timeouts, or forced actions. If a timeout must change, keep it narrow and explain the reason.

## AI-generated test validation

- Verify every generated locator, workflow, endpoint, and expected result against the current InvenTree UI/API or repository evidence. Never invent application behavior.
- Review generated code for isolation, data ownership, cleanup safety, meaningful assertions, and compatibility with the locked Playwright version.
- Read the test diff and its failure output; distinguish a product defect from a test or environment defect. Run only the relevant validation requested for the task and report what was actually run.

## Source of these conventions

The **official recommendations** informing this document are Playwright's advice to test user-visible behavior, isolate tests, prefer resilient locators, use retrying web assertions, and rely on actionability checks and fixtures. The **project-specific conventions** above apply those recommendations to this repository's directory layout, test data, reporting, and AI-assisted workflow.

- [Best practices](https://playwright.dev/docs/best-practices)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Actionability and auto-waiting](https://playwright.dev/docs/actionability)
- [Browser contexts and isolation](https://playwright.dev/docs/browser-contexts)
- [Page Object Model](https://playwright.dev/docs/pom)
- [`test.step()` API](https://playwright.dev/docs/api/class-test#test-step)
