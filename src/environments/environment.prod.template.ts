// @ts-nocheck
export const environment = {
  production: __PRODUCTION__,
  version: {
    major: __MAJOR__,
    minor: __MINOR__,
    date: '__DATE__',
  },
  app: {
    name: '__APP_NAME__',
    showTabsBar: __SHOW_TABS_BAR__,
    useFirebaseEmulator: __USE_FIREBASE_EMULATOR__,
  },
  googleTranslate: {
    apiKey: '__GOOGLE_TRANSLATE_API_KEY__',
  },
  firebase: {
    apiKey: __FIREBASE_API_KEY__,
    authDomain: __FIREBASE_AUTH_DOMAIN__,
    projectId: __FIREBASE_PROJECT_ID__,
    storageBucket: __FIREBASE_STORAGE_BUCKET__,
    messagingSenderId: __FIREBASE_MESSAGING_SENDER_ID__,
    appId: __FIREBASE_APP_ID__,
    measurementId: __FIREBASE_MEASUREMENT_ID__,
  },
};
