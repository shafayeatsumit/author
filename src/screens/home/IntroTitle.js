import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useUserStore, useSubmissionStore} from '../../store';

const Title = () => {
  const navigation = useNavigation();
  const {deleteSubmission, submission} = useSubmissionStore();
  const {setFinishedIntro, finishedIntro} = useUserStore();
  const prompt = submission.find(item => item.id === 'intro_title');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    fadeIn();
  };

  const handlePress = () => {
    fadeAnim.setValue(0);
    navigation.navigate('IntroNote', {prompt, handleClose});
  };

  const dateString = moment().format('MMMM YYYY');
  const month = moment().format('MMMM');
  const promptQuestion = `If the rest of ${month} was a chapter in the story of my life, I’d title it ______.`;
  const skipText = 'Add Title';
  const skippedSubmission = prompt.skip;
  const hasAnswer = !!prompt.answer;

  const getDisplayText = () => {
    if (hasAnswer) {
      return prompt.answer;
    }
    if (skippedSubmission) {
      return skipText;
    }

    return promptQuestion;
  };
  const displayText = getDisplayText();
  const showDate = skippedSubmission || hasAnswer;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.questionContainer}>
        {showDate && <Text style={styles.date}>{dateString}</Text>}
        <Text style={styles.text}>{displayText}</Text>
      </View>
      <Animated.View style={[styles.swipeContainer, {opacity: fadeAnim}]}>
        <Text style={styles.swipeText}>Swipe to create{'\n'}next page</Text>
      </Animated.View>
      <View style={styles.pageNumberHolder}>
        <Text style={styles.pageNumberText}>Page 2</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Title;

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
  date: {
    paddingBottom: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: RFValue(16),
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.38)',
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
