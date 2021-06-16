import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo = () => {
  return (
    <Image style={styles.logo} source={require('../../assets/logo.png')} />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});
