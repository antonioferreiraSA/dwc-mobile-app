import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, ActivityIndicator } from 'react-native';

const PrayerRequestsScreen = () => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && <ActivityIndicator  color="black"/>}
      <WebView source={{ uri: 'https://mobile.destinyworshipcentre.co.za/membership-form/' }} onLoad={handleLoad} />
    </SafeAreaView>
  );
};

export default PrayerRequestsScreen;
