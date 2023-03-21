import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Platform,
  
} from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import logEvent from '../utils/logEvent';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { Title, Subtitle, Heading } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import { openBrowser } from '../utils/openBrowser';
import { Feather } from '@expo/vector-icons';
// eslint-disable-next-line no-duplicate-imports
import { Entypo } from '@expo/vector-icons'; 
// eslint-disable-next-line no-duplicate-imports
import { FontAwesome5 } from '@expo/vector-icons';

const openMaps = (location) => {
  let url = '';

  switch (location) {
    case 'NSJ':
      url = 'https://goo.gl/maps/Q4Hg6ZThSmnxrcU7A';
      break;

    

    default:
      break;
  }

  logEvent('TAP Location', { campus: location });
  Linking.openURL(url);
};



const LocationsScreen = () => {
 

  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <ScrollView
          style={[styles.mainContainer, { paddingTop: headerHeight }]}
        >
        <TouchableHighlight
                
                onPress={() => openMaps('NSJ')}
       
              >
          <Image
            source={require('../assets/images/location.png')}
            style={styles.image}
          />
          </TouchableHighlight>
          <View style={[styles.container, { paddingBottom: headerHeight }]}>
            <Button
              title="Watch Church Online"
              style={styles.button}
              onPress={() => {
                WebBrowser.openBrowserAsync('https://echo.online.church/', {
                  toolbarColor: Colors.darkestGray,
                }).catch((err) => {
                  logEvent('ERROR with WebBrowser', { error: err });
                  WebBrowser.dismissBrowser();
                });
              }}
            />

            <Title center style={styles.heading}>
             Destiny Worship Center location & regular service time
            </Title>

            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('NSJ')}
                style={styles.highlight}
              >
                <Subtitle center style={styles.content}>
                 35 Ernest Schwartz Ln, Bruma, Johannesburg, 2026
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                Every Sunday at 9:00am, 10:30am, 
              </Heading>
              <Heading center style={styles.subContent}>
                Every Wednesday at 7:00pm, 8:00pm, 
              </Heading>
              <Title center style={styles.heading}>
              Contact Us
             </Title>
             
 
  <Button
  icon={<Entypo name="old-phone" size={24} color="white" />}
  title=" +27 11 616 1795"
  style={styles.checkIn}
 
/>
<View style={{paddingVertical: 5}}/>
<Button
icon={<FontAwesome5 name="whatsapp" size={24} color="white" />}
title="WhatsApp"
style={styles.checkIn}
onPress={() =>
  openBrowser({
    title: 'WhatsApp',
    url: 'https://api.whatsapp.com/send/?phone=%2B27764758245&text&type=phone_number&app_absent=0',
  })
}
/>

            </View>
            
            
          </View>
        </ScrollView>
      )}
    </HeaderHeightContext.Consumer>
  );
};

const styles = StyleSheet.create({
  
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  button: { marginBottom: 20 },
  heading: { marginVertical: 10 },
  highlight: { borderRadius: 4 },
  location: {
    marginBottom: 30,
  },


  content: {
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
  subContent: {
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});

export default LocationsScreen;
