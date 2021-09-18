import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useUserStore, useSubmissionStore} from '../../store';

const Dedicate = () => {
  const navigation = useNavigation();
  const {deleteSubmission, submission} = useSubmissionStore();
  const prompt = submission.find(item => item.id === 'intro_dedicate');

  const handlePress = () => {
    navigation.navigate('IntroNote', {prompt});
  };

  const promptPrefix = 'I dedicate this story to';
  const promptQuestion = 'I dedicate this story to __________.';
  const skipText = 'I will dedicate this story later.';
  const skippedSubmission = prompt.skip;
  const hasAnswer = !!prompt.answer;

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
});
