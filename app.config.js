import 'dotenv/config';

const timestamp = Math.floor(new Date().getTime() / 10000);

export default {
  expo: {
    name: 'DWC',
    description: 'Destiny Worship Centre',
    slug: 'dwc',
    scheme: 'dwc',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'dark',
    backgroundColor: '#fff',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#fff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'echo-labs-team',
            project: 'echo-app',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
    ios: {
      buildNumber: String(timestamp),
      bundleIdentifier: 'com.echo.church.app',
      supportsTablet: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.echo.church.app',
      versionCode: timestamp,
    },
    plugins: [
      'expo-updates',
      'expo-splash-screen',
      'sentry-expo',
      [
        'expo-tracking-transparency',
        {
          userTrackingPermission:
            'Allow this app to collect app-related tracking data that can be used to improve your experience.',
        },
      ],
    ],
    extra: {
      AMPLITUDE: process.env.AMPLITUDE,
      TIMESTAMP: timestamp,
      ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      SENTRY_DSN: process.env.SENTRY_DSN,
      TWITTER: process.env.TWITTER,
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    },
  },
};
