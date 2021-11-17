import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Swiper from 'react-native-swiper';

const SwipeStart = ({navigation}) => {
  const goHome = () => {
    navigation.navigate('Home');
  };
  return (
    <Swiper
      horizontal={false}
      style={styles.wrapper}
      showsButtons={false}
      showsPagination={false}
      onMomentumScrollEnd={goHome}>
      <View style={styles.slide1}>
        <Text style={styles.text}>Swipe up to{'\n'}start</Text>
      </View>
      <View style={styles.slide2} />
    </Swiper>
  );
};
export default SwipeStart;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingBottom: 120,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  text: {
    lineHeight: 41.6,
    fontSize: 32,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    paddingTop: 12,
    letterSpacing: -2,
    paddingHorizontal: 25,
  },
});
