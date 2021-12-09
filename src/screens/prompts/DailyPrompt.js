import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSubmissionStore, usePromptStore} from '../../store';
import {triggerHaptic} from '../../helpers/haptics';
import analytics from '@react-native-firebase/analytics';
import Swiper from 'react-native-swiper';

const Prompt = ({item, setActivePrompt}) => {
  const navigation = useNavigation();
  const prompts = usePromptStore();

  const handlePress = selectedPrompt => {
    triggerHaptic();
    const navPath = 'Note';
    navigation.navigate(navPath, {
      prompt: selectedPrompt,
    });
    analytics().logEvent('button_push', {
      name: contentQuestion,
    });
  };

  const contentQuestion = item.question;

  const activePrompts = prompts.promptsList
    .filter(p => p.active)
    .map(activePrompt => activePrompt.name);

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={false}
      onIndexChanged={index => setActivePrompt(activePrompts[index])}
      activeDotColor="rgba(255, 255, 255, 0.9)"
      dotColor="rgba(255, 255, 255, 0.3)">
      {activePrompts.map(prompt => {
        const currentPrompt = prompts[prompt][0];
        const promptName = _.upperFirst(prompt);
        const promptQuestion =
          promptName === 'Blank' ? '__________' : currentPrompt.question;
        return (
          <TouchableOpacity
            activeOpacity={1}
            delayPressIn={50}
            key={prompt}
            style={styles.slide1}
            onPress={() => handlePress(currentPrompt)}>
            <Text style={styles.title}>{promptName}</Text>
            <Text style={styles.text}>{promptQuestion}</Text>
          </TouchableOpacity>
        );
      })}
    </Swiper>
  );
};
export default Prompt;

const styles = StyleSheet.create({
  wrapper: {
    // flex: 0.3,
    maxHeight: 350,
    // backgroundColor: 'yellow',
  },
  slide1: {
    minHeight: 200,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
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
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 25,
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
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
    lineHeight: 35.8,
    fontSize: RFValue(26),
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
