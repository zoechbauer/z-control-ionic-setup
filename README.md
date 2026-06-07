# z-control IONIC Setup

Created as a starter template for building modern, user-friendly Ionic apps with Angular, Capacitor, and Firebase. This setup app provides a clean, tab-based interface with built-in quota management and help features, making it easy to get started with your own Ionic projects. It also serves as the canonical backend source for shared Firebase Functions across z-control apps.

## Features

- **Quota management**: Track and display API usage with clear quota limits and warnings
- **Tab-based navigation**: Clean, intuitive UI with separate tabs for main feature and settings
- **Built-in help**: Help page for step-by-step instructions and FAQs
- **Structure for Settings**: Dedicated settings tab with accordions for configuration, Feedback, Change-log, Privacy Policy, and support

Download now for free and use it to create your own Ionic apps!

## Multi-App Backend Role

This repository is used in two roles:

- Ionic setup app starter template for new z-control apps
- Canonical backend source for shared Firebase Functions across z-control apps

Practical rule:

- Implement and maintain shared backend function code in this repository
- Deploy shared Firebase Functions from this repository only
- Other app repositories may contain frontend-only changes and should not deploy shared functions


## Download & Online Access
**Web Application**

Explore the z-control Ionic Setup application online via Firebase Hosting:

👉 https://z-control-ionic-setup.web.app/

The online demo uses the free Datamuse API, allowing you to test quota management and application features without setting up your own backend environment.

**Android Application**

The Android app is **available only to the z-control team in Google Play Internal Test Group** for testing and validation purposes, as it is used to create new applications based on this setup. It is not intended for public distribution.

👉 https://play.google.com/store/apps/details?id=at.zcontrol.zoe.ionicsetup

---

## 🛠️ Tech Stack

- **Framework**: Ionic 8 with Angular 20
- **Language**: TypeScript
- **Styling**: SCSS with Ionic CSS Variables
- **Build Tool**: Angular CLI
- **Icons**: Ionicons
- **State Management**: RxJS (BehaviorSubject, Subject)
- **Backend**: Firebase (Firestore, Cloud Functions, Hosting)
- **Testing**: Karma + Jasmine (frontend), Vitest (backend)
- **Deployment**: Firebase Hosting, Capacitor (Android)

## 📁 Project Structure

```
z-control-ionic-setup/
├── src/                         # Angular/Ionic frontend source
│   ├── app/                     # Pages, components, services, shared code
│   ├── assets/                  # Static assets, logs, language files
│   ├── environments/            # Environment configuration
│   └── theme/                   # Global theme variables
├── functions/                   # Firebase Functions (shared backend source)
│   ├── src/                     # Callable handlers, services, shared backend constants/interfaces
│   └── lib/                     # Compiled backend output
├── docs/                        # Project and architecture documentation
│   └── unit-tests/              # Testing tutorials and quick references
├── tools/                       # Utility scripts and templates
├── resources/                   # App icons, splash screens, platform resources
├── www/                         # Built web output (hosting target)
├── angular.json                 # Angular workspace config
├── capacitor.config.ts          # Capacitor app config
├── firebase.json                # Firebase hosting/functions config
└── package.json                 # Frontend scripts and dependencies

```

## Development Workflow

Use this workflow when you build a new feature for another z-control app (for example translator) that needs backend changes.

1. Implement backend changes in this setup repository (`functions/src`).
2. Start Firebase emulators from this setup repository.
3. Run the target frontend app (for example translator) with `ionic serve`.
4. Test FE and BE integration against the setup backend/emulator.
5. Deploy shared Firebase Functions from this setup repository only.
6. Deploy the target frontend app after integration tests pass.

Why this works:

- Shared backend stays in one source of truth.
- Function deployments remain safe and predictable.
- Frontend repos can evolve independently without backend deployment ownership.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Angular CLI](https://angular.io/cli)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Android Studio](https://developer.android.com/studio) (for Android builds)

### Installation

```bash
git clone https://github.com/zoechbauer/z-control-ionic-setup
cd z-control-ionic-setup
npm install
ionic serve
```

The app will open at `http://localhost:4200/` in your browser.

### Testing

#### Frontend Tests (Karma + Jasmine)

```bash
# Run unit tests
npm test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run tests with code coverage
npm run test:coverage
```
#### Backend Tests (Vitest + Istanbul)

```bash
# Run backend tests
npm --prefix functions run test

# Run backend tests with Vitest UI (browser dashboard)
cd functions && npm run test:ui

# Run backend tests with Vitest UI and coverage
cd functions && npm run test:ui:coverage

# Run backend tests with coverage and auto-exit
npm --prefix functions run test:coverage
```
### Building for Android

```bash
ionic build --prod
npx cap sync android
cd android
./gradlew buildRelease
```

## Documentation

### Start Here

- [How to use this setup app](docs/z-control-ionic-setup-usage.md)
- [Docs index](docs/README.md)
- [Coding guidelines](docs/coding-guidelines.md)
- [GitHub Copilot support guide](docs/github-copilot-support.md)

### Firebase And Backend Architecture

- [Firebase Functions setup and deploy](docs/firebase-functions-setup-and-deploy.md)
- [Multi-app Firebase Functions deploy playbook](docs/firebase-functions-multi-app-deploy-playbook.md)
- [Firebase codebase, runtime, and appId security](docs/firebase-codebase-runtime-and-appid-security.md)
- [Firebase config environment files](docs/firebase-config-enviroment-files.md)
- [Firebase Functions ESM build guide](docs/firebase-functions-esm-build-guide.md)

### Feature-Specific And Local Testing Guides

- [Local testing guide secureTranslate](docs/local-testing-guide-secureTranslate.md)
- [Anonymous login](docs/anonymous-login.md)
- [Standalone config](docs/standalone-config.md)
- [Why use runInInjectionContext](docs/why-use-runInInjectionContext.md)

### Testing Documentation

- [Unit tests folder](docs/unit-tests)
- [FE/BE regression checklist](docs/fe-be-regression-checklist.md)
- [Unit testing quick reference](docs/unit-tests/unit-testing-quick-reference.md)
- [Unit testing learning roadmap](docs/unit-tests/unit-testing-learning-roadmap.md)
- [Test types FE/BE](docs/unit-tests/test-types-fe-be.md)
- [Karma test runner scrolling fix](docs/unit-tests/karma-test-runner-scrolling-fix.md)
- [Jasmine vs Vitest](docs/unit-tests/jasmine-vs-vitest.md)
- [Functions Vitest setup](docs/unit-tests/functions-vitest-setup.md)

### Operations And Maintenance

- [How to Install the z-control IONIC Setup App Locally on Your Mobile](docs/mobile-installation-guide.md.md)
- [Android installation troubleshooting](docs/solving-installation-problems-android.md)
- [Instructions to Ensure a Clean Build for Android](docs/clean-android-build-step-by-step.md)
- [Environment and programmer devices TODO list](docs/todo-list-environment-programmer-devices.md)

### Google Play Store Publication
- [Google Play Store Publication Guide](docs/upload-to-google-playstore/docs/Google-Play-Store-Publication-Guide.md)
- [Update Notification Guide](docs/upload-to-google-playstore/docs/Update-Notification-Guide.md)
- [Ionic Capacitor Splash Screens Guide](docs/upload-to-google-playstore/docs/ionic-capacitor-splash-screens-guide.md)

## Tools

This project includes utility scripts in the `tools/` folder for backing up non-committed files and generating environment files from `.env.local`. See [tools/README.md](tools/README.md) for details on how to use these scripts.

## Privacy Policy

This setup app does not collect or store any personal data. It is designed to be a local utility for developers to build their own Ionic apps.

Settings and usage data are stored locally on the user's device and are not transmitted to any servers. The app does not use any third-party analytics or tracking services.

## License

[MIT](LICENSE)

## Contact & Support

For questions, feedback, or support:  
[z-control Support & Feedback](https://z-control-4070.web.app/home)

Email: [zcontrol.app.qr@gmail.com](mailto:zcontrol.app.qr@gmail.com)

---

## Version History

See [CHANGELOG.md](src/assets/logs/CHANGELOG.md) for detailed release notes and version history.
