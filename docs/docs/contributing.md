---
id: contributing
title: Contributing
sidebar_position: 4
---

# Contributing

Thank you for helping make **React State Timeline** better! This guide explains the repository layout, build process, quality checks, and how to contribute effectively.

---

## Project Structure

- **lib/**  
  All source files for the library live here.
  - _Build Process:_ Any `index.ts` or `index.tsx` file is detected and built by Vite (see `vite.config.ts`).
  - _Exports:_ The main entry for the package is `lib/index.tsx`. Ensure components, hooks, or utilities to be included in the package are exported from this file.
  - _Test Files:_ Any `*.test.ts` file will be considered as test file and all test will be run by `test` command.

- **docs/**  
  Documentation is built with [Docusaurus](https://docusaurus.io/).
  - All documentation markdown files are in `docs/docs/`.
  - Custom pages and demos (e.g., interactive homepage) are in `docs/src/pages/`.

---

## Contribution Workflow

1. **Fork and Branch**  
   Fork the repository and create a feature or fix branch.

2. **Make Your Changes**
   - Change or add code in `lib/`.
   - Export all intended APIs in `lib/index.tsx`.
   - Write or update documentation in `docs/docs/` for all new features or changes.

3. **Test Requirements**
   - If adding or changing any code, you **must** write tests (or expand existing ones).
   - Our test suite runs automatically as a pre-commit hook; commits will be blocked if any test fails.
   - Run tests locally to ensure all pass before committing.

4. **Commit Message Convention**
   - We use **[Conventional Commits](https://www.conventionalcommits.org/)**, which help standardize commit messages and automate changelog/version management.
   - To make this easy, simply run the `commit` command in your terminal (powered by Commitizen). You’ll be prompted for commit details and guided through the process, ensuring every message is correctly formatted.
   - Example flow:
     - Run `npm run commit`.
     - Answer the prompts (type, scope, message)
   - Direct `git commit` is discouraged; use the guided tool for every commit.
   - Example commit messages:
     ```
     feat(hook): add undo shortcut support
     fix: handle timeline index bounds in goTo
     docs: update usage examples for API improvements
     ```

5. **Documentation**
   - Update or create guides in `docs/docs/` to reflect your changes.
   - Every new feature or behavior change should be documented.

6. **Pull Request**
   - Open a PR to `develop` with a clear description.
   - Reference related issues or discussions where appropriate.

---

## Best Practices

- Use TypeScript for all code in `lib/`.
- Keep file and export structure clean; maintain `lib/index.tsx` as the "public" API.
- Ensure all features are documented before requesting review.
- Write clear, single-purpose commits using the Conventional Commits structure.

---

If you have questions not answered here, please open an issue or contact a maintainer.

Thanks for contributing and maintaining high quality!
