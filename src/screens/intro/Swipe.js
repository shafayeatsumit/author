import React, {useRef} from 'react';
import {
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useSwipe} from '../../helpers/swipeGesture';
const {height: ScreenHeight, width: ScreenWidth} = Dimensions.get('window');

const SwipeStart = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const goHome = () => {
    navigation.navigate('Home');
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(goHome);
  };

  const onSwipeUp = () => {
    fadeOut();
  };

  const onSwipeDown = () => {
    console.log('swipe down');
  };

  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeUp, onSwipeDown, 8);

  return (
    <ScrollView
      scrollEnabled={false}
      style={styles.container}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      <Animated.View style={[styles.slide, {opacity: fadeAnim}]}>
        <Text style={styles.text}>Swipe up to{'\n'}start</Text>
      </Animated.View>
    </ScrollView>
  );
};
export default SwipeStart;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  slide: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingBottom: 120,
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
