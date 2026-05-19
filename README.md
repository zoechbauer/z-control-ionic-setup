# z-control IONIC Setup

Created as a starter template for building modern, user-friendly Ionic apps with Angular and Capacitor.

## Features

- **Tab-based navigation**: Clean, intuitive UI with separate tabs for main feature and settings
- **Built-in help**: help page for step-by-step instructions and FAQs
- **Structure for Settings**: Dedicated settings tab with accordions for configuration, Feedback, Change-log, Privacy Policy, and support

Download now for free and use it to create your own Ionic apps!

## Download & Online Access

- **Web App:**  
  [Run the app online (Firebase Hosting)](https://z-control-ionic-setup.web.app/)

- **Native Mobile App on Android devices:**
  [Get the app on Google Play Store](https://play.google.com/store/apps/details?id=at.zcontrol.zoe.ionicsetup) — available through closed testing.

---

## 🛠️ Tech Stack

- **Framework**: Ionic 8 with Angular 20
- **Language**: TypeScript
- **Styling**: SCSS with Ionic CSS Variables
- **Build Tool**: Angular CLI
- **Icons**: Ionicons
- **State Management**: RxJS (BehaviorSubject, Subject)
- **Testing**: Karma + Jasmine
- **Deployment**: Firebase Hosting, Capacitor (Android)

## 📁 Project Structure

```
TODO - add project structure overview here, or link to a separate file with detailed structure explanation

```

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

### Building for Android

```bash
ionic build --prod
npx cap sync android
cd android
./gradlew buildRelease
```

## Documentation

[How to use this setup app](docs/z-control-ionic-setup-usage.md)

[GitHub Copilot support guide](docs/github-copilot-support.md)

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
