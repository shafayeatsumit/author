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
import {formatDate} from '../../helpers/date';
import {triggerHaptic} from '../../helpers/haptics';
import analytics from '@react-native-firebase/analytics';

const Page = ({prompt, instructionVisible, scrollToContent}) => {
  const navigation = useNavigation();

  const adjustScrollPosition = () => {
    scrollToContent(prompt);
  };
  const handlePress = () => {
    navigation.navigate('Note', {
      prompt,
      isEdit: true,
      scrollToContent: adjustScrollPosition,
    });
    triggerHaptic();
    analytics().logEvent('button_push', {
      name: 'tap to edit',
    });
  };

  let dateString = prompt.date ? formatDate(prompt.date) : null;
  const promptAnswer = prompt.answer;

  return (
    <TouchableOpacity
      delayPressIn={50}
      onPress={handlePress}
      activeOpacity={1}
      style={[styles.container, instructionVisible && styles.intro]}>
      <Text style={styles.dateText}>{dateString}</Text>
      <Text style={styles.answer}>{promptAnswer}</Text>
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    minHeight: ScreenHeight / 3,
    marginVertical: 4,
    // height: ScreenHeight,
    width: ScreenWidth,
    paddingHorizontal: 35,
    paddingVertical: 72,
  },
  intro: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'flex-end',
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    fontSize: RFValue(15),
    // paddingRight: 10,
    paddingBottom: 5,
    color: 'rgba(255,255,255,0.37)',
  },
  answer: {
    fontSize: RFValue(32),
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 44.8,
    letterSpacing: -2,
    paddingTop: 4,
    paddingBottom: 24,
  },
  divider: {
    height: 1,
    width: ScreenWidth * 0.8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
  },
  dedicattionPage: {
    height: ScreenHeight / 3,
    justifyContent: 'center',
    marginHorizontal: 30,
    // borderBottomWidth: 1,
    // borderColor: 'rgba(255,255,255,0.2)',
  },
});
