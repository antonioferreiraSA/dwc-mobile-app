import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import logEvent from '../../utils/logEvent';
import Colors from '../../constants/Colors';
import { Text, Title, Heading } from '../../components/shared/Typography';
import Button from '../../components/shared/Button';
import { useNavigation } from '@react-navigation/native';

const BaptismScreen = () => {
  const navigation = useNavigation();
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <ScrollView
          style={[styles.mainContainer, { paddingTop: headerHeight }]}
        >
          <Image
            source={require('../../assets/images/bap.jpeg')}
            style={styles.image}
          />
          <View style={[styles.container, { paddingBottom: headerHeight }]}>
            <Title style={styles.heading}>
              What is the meaning of Baptism?
            </Title>

            <Heading>
              {`It illustrates Christ's burial and resurrection`}
            </Heading>
            <Text style={styles.content}>
              {`"For when you were baptized, you were buried with Christ, and in baptism you were also raised with Christ." — COLOSSIANS 2:12`}
            </Text>

            <Heading>It illustrates my new life as a Christian</Heading>
            <Text style={styles.content}>
              {`"When someone becomes a Christian he becomes a brand new person inside. The old life has passed away and a new life has begun!" —2 CORINTHIANS 5:17`}
            </Text>

            <Heading>
              {`Baptism doesn't make you a believer — it shows that you already believe. Baptism does not "save" you — only your faith in Christ does that`}
            </Heading>
            <Text style={styles.content}>
              {`"For it is by grace you have been saved, through faith ... it is the gift of God — not by works, so that no one can boast." — EPHESIANS 2:8-9`}
            </Text>

            <Button
              title="I'm Interested"
              style={styles.button}
              onPress={() => {
                logEvent('TAP Baptism Interested');
                navigation.navigate('Baptism Form'); // navigate to BaptismForm screen
              }}
            />
          </View>
        </ScrollView>
      )}
    </HeaderHeightContext.Consumer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
  },
  image: {
    width: '100%',
    height: 250,
  },
  container: { paddingVertical: 20, paddingHorizontal: 16 },
  heading: {
    marginVertical: 10,
  },
  content: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: { marginVertical: 20 },
});

export default BaptismScreen;
