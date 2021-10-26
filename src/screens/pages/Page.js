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

const Page = ({prompt}) => {
  const navigation = useNavigation();
  const {deleteSubmission} = useSubmissionStore();
  const isDedicationPage = prompt.id === 'intro_dedicate';
  const handlePress = () => {
    if (isDedicationPage) {
      navigation.navigate('Dedicate', {isEdit: true});
      return;
    }
    navigation.navigate('Note', {prompt, isEdit: true});
    triggerHaptic();
    analytics().logEvent('button_push', {
      name: 'tap to edit',
    });
  };
  const dateString = prompt.date ? formatDate(prompt.date) : null;
  const promptAnswer = prompt.answer;
  if (isDedicationPage) {
    return (
      <>
        <TouchableOpacity
          delayPressIn={50}
          onPress={handlePress}
          activeOpacity={1}
          style={styles.dedicattionPage}>
          <Text style={styles.dateText}>{dateString}</Text>
          <Text style={styles.answer}>I dedicate this to {promptAnswer}</Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <>
      {/* <View style={styles.divider} /> */}
      <TouchableOpacity
        delayPressIn={50}
        onPress={handlePress}
        activeOpacity={1}
        style={styles.container}>
        <Text style={styles.dateText}>{dateString}</Text>
        <Text style={styles.answer}>{promptAnswer}</Text>
      </TouchableOpacity>
    </>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    minHeight: ScreenHeight / 2.7,
    width: ScreenWidth,
    justifyContent: 'center',
    paddingHorizontal: 35,
    paddingVertical: 72,
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: RFValue(18),
    // paddingRight: 10,
    paddingBottom: 25,
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
