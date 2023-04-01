import 'dotenv/config';


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
        foregroundImage: './assets/images/icon.png',
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
    "extra": {
      "eas": {
        "projectId": "b5ac5e8c-3ff9-4226-826b-d7fc8cd88f26"
      }
    }
    
  },
};
