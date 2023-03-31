import React from 'react';

import {WebView} from 'react-native-webview';
import {SafeAreaView, } from 'react-native';


const PrayerRequestsScreen = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      
    <WebView source={{uri: 'https://mobile.destinyworshipcentre.co.za/membership-form/'}} />
    </SafeAreaView>
  );
};


export default PrayerRequestsScreen;
