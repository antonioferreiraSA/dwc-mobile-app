import React from 'react';
import { HeaderHeightContext } from '@react-navigation/stack';
import {WebView} from 'react-native-webview';
import {SafeAreaView, } from 'react-native';


const PrayerRequestsScreen = () => {
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
    <SafeAreaView style={{flex:1}}>
      
    <WebView source={{uri: 'https://www.youtube.com/@DWCContent/streams'}} />
    </SafeAreaView>
    )}
    </HeaderHeightContext.Consumer>
  );
};


export default PrayerRequestsScreen;
