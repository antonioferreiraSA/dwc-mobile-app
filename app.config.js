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
    
    ios: {
      buildNumber: "1.0.0",
      bundleIdentifier: 'com.DestinyWorshipCentre.church.app',
      supportsTablet: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.DestinyWorshipCentre.church.app',
      versionCode: 1,
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
    
  },
};
