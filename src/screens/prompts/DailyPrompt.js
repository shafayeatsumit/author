import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSubmissionStore} from '../../store';
import {triggerHaptic} from '../../helpers/haptics';
import analytics from '@react-native-firebase/analytics';

const Prompt = ({item, updateContent}) => {
  const navigation = useNavigation();
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const {submission, deleteSubmission} = useSubmissionStore();
  const totalPages = submission.length + 1;

  const handlePress = () => {
    goToNote();
  };

  const contentQuestion = item.question;
  const updatePrompts = () => {
    updateContent(item);
  };

  const goToNote = () => {
    triggerHaptic();
    navigation.navigate('Note', {
      prompt: item,
      scrollToPrompt: updatePrompts,
    });
    analytics().logEvent('button_push', {
      name: contentQuestion,
    });
  };
  const isDisable = item.id === 'instruction';
  return (
    <TouchableOpacity
      activeOpacity={1}
      delayPressIn={50}
      disabled={isDisable}
      key={selectedPrompt.id}
      style={styles.itemPrompt}
      onPress={handlePress}>
      {contentQuestion && <Text style={styles.text}>{contentQuestion}</Text>}
      {totalPages ? <Text style={styles.footerText}>{totalPages}</Text> : null}
    </TouchableOpacity>
  );
};
export default Prompt;

const styles = StyleSheet.create({
  loading: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemPrompt: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 35,
    paddingBottom: 180,
  },
  titleHolder: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  divider: {
    height: 1,
    width: ScreenWidth * 0.8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
  },
  title: {
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  footerText: {
    fontSize: RFValue(15),
    color: 'rgba(255,255,255,0.92)',
    position: 'absolute',
    bottom: 0,
    right: 20,
    paddingBottom: 40,
    fontFamily: 'Montserrat-Regular',
    paddingTop: 4,
    letterSpacing: 0,
    paddingHorizontal: 25,
  },
  text: {
    lineHeight: 44.8,
    fontSize: RFValue(32),
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    paddingTop: 4,
    letterSpacing: -2,
    paddingHorizontal: 25,
  },
  disableText: {
    lineHeight: 41.6,
    fontSize: RFValue(30),
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});
