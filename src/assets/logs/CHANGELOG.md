# What's New?

Welcome to the latest updates for the **z-control IONIC Setup** app.

## [0.2] – 2026-05-23

### ✨ New Features

- Added Firebase Functions to store quota usage data in Firestore.
- Implemented the Search Related Words feature using the Datamuse API, with results shown on the Main page. This feature demonstrates how to implement functionality in the z-control IONIC Setup project.
- Added quota usage tracking for the Search Related Words feature, including monthly quota management.
- Added relevant documentation for Firebase Functions and unit testing based on the z-control Translator app.

### 🔧 Internal

- Removed targetLanguages from getCharCountForUser in the Firestore service, as it is no longer required for quota tracking.

## [0.1] – 2026-05-20

### ✨ New Features

- Initial release of the IONIC setup app with a Main page and a Settings page, built with Angular 20 and Ionic 8.
- Added test infrastructure with Jasmine and Karma.
- Main page now includes a feature-call simulation button with toast feedback.
- Settings page now includes:
  - Language selection
  - Feedback option for z-control
  - Monthly usage/statistics overview
  - Privacy information
  - App version and release notes
  - Mobile app installation info
  - Source code link to GitHub
- Established a maintainable foundation for future z-control IONIC app features.

### 🛡 Security

- Your data stays on your device and is not shared with third parties.
- Only text you explicitly choose to translate is sent securely to Google Translate.
