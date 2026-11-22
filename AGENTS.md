# QA Engineering Lab

## Purpose and stack

This repository contains an independent QA automation framework for InvenTree, maintained in the separate `inventree-lab` repository. The stack is TypeScript, Playwright Test, Node.js, PostgreSQL/SQL, Docker Compose, GitHub Actions, and OpenAI Codex. Do not edit the InvenTree application repository as part of framework work.

## Repository structure

The structure below separates **existing** paths from planned targets. Existing: `tests/smoke/` (with UI and API smoke specs), `docs/conventions/` and `playwright.config.ts`. Other listed paths are planned; add them only when a concrete change needs them.

```text
tests/ui/                 planned: UI scenarios
tests/api/                planned: API scenarios
src/pages/                UI Page Objects
src/api-clients/          typed API clients
src/fixtures/             shared Playwright fixtures
src/helpers/              focused reusable utilities
src/constants/            stable framework constants
test-data/                controlled test inputs and factories
sql/                      reviewed SQL queries
infra/                    local and CI environment definitions
scripts/                  planned: environment scripts
docs/conventions/         existing: project conventions
.github/workflows/        CI/CD workflows
```

Keep each concern in its own area: tests describe behavior; Page Objects model UI interaction; API clients encapsulate HTTP calls; fixtures compose test dependencies and lifecycle; helpers contain small cross-cutting functions; constants hold stable values; test data is explicit and controlled; SQL files contain reviewable queries; infrastructure and CI definitions stay outside test code. Avoid wrappers or layers that only rename an existing Playwright capability.

## Repository conventions

- Follow this file and [Playwright E2E conventions](docs/conventions/playwright-e2e.md).
- Keep TypeScript readable, typed, and consistent with the installed dependencies. Prefer KISS, DRY, and SOLID where they improve clarity; avoid speculative abstractions.
- Use existing project scripts and capabilities before adding tools or dependencies. Do not install or introduce a dependency without explicit user authorization.
- Keep secrets, credentials, and personal data out of source control, logs, test reports, and fixtures. Use documented local-only configuration and safe placeholders.

## Test data and database safety

- Use test-owned or explicitly seeded data. Do not assume demo data, IDs, endpoints, schema, or UI controls without verifying them from the application or repository evidence.
- Before any destructive SQL, reset, or cleanup, verify the effective target is a dedicated isolated test database. Never target production, shared, or ordinary development data. Stop if the target cannot be proven safe; do not weaken existing reset safeguards.
- Prefer scoped cleanup of records created by the test. Keep SQL reviewable and parameterize values where applicable.

## AI agent workflow and boundaries

1. Inspect the relevant files, current project structure, and applicable documentation before proposing or changing anything.
2. Make the smallest change that satisfies the request; preserve useful existing instructions and conventions.
3. Do not invent InvenTree behavior, endpoints, schemas, or locators. Gather repository or application evidence first and state uncertainty when evidence is missing.
4. Do not modify InvenTree application code, perform destructive operations, or change infrastructure outside the requested scope. Do not add tests, run tests, or install dependencies unless asked.
5. Review the final diff for scope, clarity, and secrets. Report what changed and accurately state any validation performed; never imply tests or documentation checks ran when they did not.
