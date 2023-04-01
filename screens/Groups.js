import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';


const Block = ({ image, header, subtitle1, subtitle2 }) => {
  return (
    <View style={styles.block}>
      <Image source={image} style={styles.image} />
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.subtitle}>{subtitle1}</Text>
      <Text style={styles.subtitle}>{subtitle2}</Text>
    </View>
  );
};

const Blocks = () => {
  return (
    <ScrollView contentContainerStyle={styles.blocksContainer}>
      <Block
        image={require('../assets/images/icon.png')}
        header="Block 1"
        subtitle1="Subtitle 1"
        subtitle2="Subtitle 2"
      />
      <Block
        image={require('../assets/images/icon.png')}
        header="Block 2"
        subtitle1="Subtitle 1"
        subtitle2="Subtitle 2"
      />
      <Block
        image={require('../assets/images/icon.png')}
        header="Block 3"
        subtitle1="Subtitle 1"
        subtitle2="Subtitle 2"
      />
      <Block
        image={require('../assets/images/icon.png')}
        header="Block 4"
        subtitle1="Subtitle 1"
        subtitle2="Subtitle 2"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blocksContainer: {
    paddingVertical: 20,
  },
  block: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
  },
  header: {
    fontSize: 24,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Blocks;
