import React from 'react';
import { HeaderHeightContext } from '@react-navigation/stack';
import {WebView} from 'react-native-webview';
import {SafeAreaView, } from 'react-native';


const PrayerRequestsScreen = () => {
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
    <SafeAreaView style={{flex:1}}>
      
    <WebView source={{uri: 'https://www.bible.com/bible/111/GEN.1.NIV'}}
    scalesPageToFit={true}
    
    />
    </SafeAreaView>
    )}
    </HeaderHeightContext.Consumer>
  );
};


export default PrayerRequestsScreen;
