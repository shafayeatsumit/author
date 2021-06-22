import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
const {height: ScreenHeight} = Dimensions.get('window');

const Logo = () => {
  return (
    <Image style={styles.logo} source={require('../../assets/logo.png')} />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginBottom: 20,

    // height: ScreenHeight / 15,
    // width: ScreenHeight / 15,
    // resizeMode: 'contain',
  },
});
