import React, {Component, useRef, useState} from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    height: 60,
    width: 100,
    marginTop: 100,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SwiperComponent = () => {
  const [pages, setPages] = useState(['First', 'Second']);
  const swiper = useRef(null);
  const handlePress = () => {
    swiper.current.scrollBy(1);
    setTimeout(() => {
      setPages(['Second']);
    }, 1500);
  };
  return (
    <Swiper ref={swiper} style={styles.wrapper} showsButtons={true}>
      {pages.map((item, i) => (
        <View key={item} style={styles.slide1}>
          <Text style={styles.text}>{item}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text>button</Text>
          </TouchableOpacity>
        </View>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
