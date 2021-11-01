import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {checkTodayAfterFive} from '../../helpers/date';
import {usePromptStore} from '../../store';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {DailyTitles} from '../../helpers/contentsData';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import _ from 'lodash';
import {triggerHaptic} from '../../helpers/haptics';
import analytics from '@react-native-firebase/analytics';

const Prompt = ({item, updateContent}) => {
  const navigation = useNavigation();
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const handlePress = () => {
    goToNote();
  };

  const contentQuestion = item.question;
  const updatePrompts = () => {
    console.log('update daily prompt');
    updateContent(item);
  };

  const goToNote = () => {
    triggerHaptic();
    //TODO: add here.
    navigation.navigate('Note', {
      prompt: item,
      scrollToPrompt: updatePrompts,
    });
    analytics().logEvent('button_push', {
      name: contentQuestion,
    });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        delayPressIn={50}
        key={selectedPrompt.id}
        style={styles.itemPrompt}
        onPress={handlePress}>
        {contentQuestion && (
          <Text style={styles.text}>{contentQuestion + ' ' + '______'}</Text>
        )}
      </TouchableOpacity>
    </>
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
    backgroundColor: 'transparent',
    minHeight: ScreenHeight / 2.7,
    width: ScreenWidth,
    justifyContent: 'center',
    paddingVertical: 72,
    paddingHorizontal: 15,
  },
  titleHolder: {
    flexDirection: 'row',
    marginLeft: 25,
    // backgroundColor: 'tomato',
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
  text: {
    lineHeight: 44.8,
    fontSize: RFValue(32),
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
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
