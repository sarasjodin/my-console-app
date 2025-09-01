# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

- Placeholder for upcoming changes and planned features

---

## [1.0.3] – 2025-07-02

### Changed

- `README.md`
  Updated with a readme-template for the actual project / app to include when ready.

---

## [1.0.2] – 2025-07-02

### Changed

- `.github/workflows/codeql.yml`
  For the standard repo template all stacks have been commented out.

---

## [1.0.1] – 2025-07-02

### Changed

- `.github/workflows/codeql.yml` should only include actual stack,
  otherwise an email "Run failed: CodeQL..." will be sent to repo owner.
  For the standard repo template JS will be default stack.
- `README.md` & `.github/workflows/codeql.yml` updated according to changes

---

## [1.0.0] – 2025-07-02

### Added

- Initial template structure for public portfolio or school projects
- `README.md` with usage instructions and recommended security settings
- `.github/workflows/codeql.yml` for CodeQL code scanning
- `.github/dependabot.yml` for automated dependency alerts
- `.github/SECURITY.md` for private vulnerability reporting
- `LICENSE` file using the MIT License
- `CHANGELOG.md` for tracking notable changes

### Notes

- `.gitignore` are intentionally left out of the base template.
  Add them in your project setup phase based on your stack (e.g. Node.js, Vite, etc).

---

## Legend

- **Added**: new features or components
- **Changed**: updates to existing behavior
- **Deprecated**: soon-to-be removed features
- **Removed**: deprecated features now gone
- **Fixed**: bug fixes
- **Security**: security-related fixes or enhancements
- **Notes**: related comments, limitations, or clarifications
