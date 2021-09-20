import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useUserStore, useSubmissionStore} from '../../store';

const Dedicate = () => {
  const {deleteSubmission, submission} = useSubmissionStore();
  const {setFinishedIntro, finishedIntro} = useUserStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // deleteSubmission('intro_start');
    if (!finishedIntro) {
      fadeIn();
    }
  }, []);

  return (
    <TouchableOpacity
      disabled={true}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.text}>Story started!</Text>
      </View>
      <Animated.View style={[styles.swipeContainer, {opacity: fadeAnim}]}>
        <Text style={styles.swipeText}>
          Scroll up and find{'\n'}prompt for this{'\n'}page
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
export default Dedicate;

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    // height: ScreenHeight / 2,
    width: ScreenWidth - 64,
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: RFValue(28),
    lineHeight: 39.2,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: -2,
  },
  pageNumberHolder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  pageNumberText: {
    color: 'rgba(255,255,255,0.38)',
    fontSize: 14,
    textAlign: 'center',
  },
  swipeContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  swipeText: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: RFValue(28),
    color: 'rgba(255,255,255,0.38)',
  },
});
