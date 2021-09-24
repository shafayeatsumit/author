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
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useUserStore, useSubmissionStore} from '../../store';

const Dedicate = ({enablePageScroll, disablePageScroll}) => {
  const navigation = useNavigation();
  const {deleteSubmission, submission} = useSubmissionStore();
  const {setFinishedIntro, finishedIntro} = useUserStore();
  const finishedIntroRef = useRef(null);
  const prompt = submission.find(item => item.id === 'intro_dedicate');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const promptPrefix = 'I dedicate this story to';
  const promptQuestion = 'I dedicate this story to ______';
  const skipText = 'I will dedicate this story later.';
  const skippedSubmission = prompt.skip;
  const hasAnswer = !!prompt.answer;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(enablePageScroll);
  };

  const handleClose = () => {
    if (!finishedIntroRef.current) {
      fadeIn();
    }
  };

  const handlePress = () => {
    fadeAnim.setValue(0);
    navigation.navigate('IntroNote', {prompt, handleClose});
  };

  const getDisplayText = () => {
    if (hasAnswer) {
      return promptPrefix + prompt.answer;
    }
    if (skippedSubmission) {
      return skipText;
    }

    return promptQuestion;
  };
  const displayText = getDisplayText();

  useEffect(() => {
    if (!finishedIntro) {
      disablePageScroll();
    }
  }, []);

  useEffect(() => {
    finishedIntroRef.current = finishedIntro;
    if (finishedIntroRef.current) {
      fadeAnim.setValue(0);
    }
  }, [finishedIntro]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.text}>{displayText}</Text>
      </View>
      <View style={styles.pageNumberHolder}>
        <Text style={styles.pageNumberText}>Page 1</Text>
      </View>
      <Animated.View style={[styles.swipeContainer, {opacity: fadeAnim}]}>
        <Text style={styles.swipeText}>Swipe to create{'\n'}next page</Text>
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
    lineHeight: 41.6,
    fontSize: RFValue(30),
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
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
    bottom: 70,
    left: 0,
    right: 0,
    height: 170,
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
