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

const Prompt = ({item}) => {
  const navigation = useNavigation();
  const [isDisabled, setDisabled] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const promptTitle = item.title;
  let allPrompts = DailyTitles[promptTitle];
  const promptStore = usePromptStore();
  const {updatePrompt} = promptStore;
  const currentPrompt = promptStore[promptTitle];

  const handlePress = () => {
    goToNote();
  };

  const contentQuestion = selectedPrompt.question;

  const capitalizedTitle = _.upperFirst(selectedPrompt.title);

  const pickRandomPrompt = () => {
    const servedBefore = _.has(promptStore, `${promptTitle}.date`);
    const multiplePrompts = allPrompts.length > 1;
    if (servedBefore && multiplePrompts) {
      const lastServedId = currentPrompt.id;
      allPrompts = allPrompts.filter(p => p.id !== lastServedId);
    }

    const prompt = _.sample(allPrompts);
    const {title, id} = prompt;
    updatePrompt(title, id, new Date());

    setSelectedPrompt(prompt);
  };

  const serveForToday = () => {
    const {id: promptId} = currentPrompt;
    const prompt = allPrompts.find(p => p.id === promptId);
    setSelectedPrompt(prompt);
  };

  const serveContent = () => {
    const {servedAt} = currentPrompt;
    const isServedToday = servedAt && checkTodayAfterFive(servedAt);

    if (isServedToday) {
      serveForToday();
    } else {
      // all prompts filter then pick one,
      pickRandomPrompt();
    }
  };

  const goToNote = () => {
    triggerHaptic();
    navigation.navigate('Note', {prompt: selectedPrompt});
    analytics().logEvent('button_push', {
      name: contentQuestion,
    });
  };

  useEffect(() => {
    serveContent();
  }, [currentPrompt]);

  useEffect(() => {
    serveContent();
  }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        delayPressIn={50}
        // disabled={isDisabled}
        key={selectedPrompt.id}
        style={styles.itemPrompt}
        onPress={handlePress}>
        {/* <View style={styles.titleHolder}>
          <Text style={styles.title}>{capitalizedTitle}</Text>
        </View> */}
        {contentQuestion && (
          <Text style={styles.text}>{contentQuestion + ' ' + '______'}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.divider} />
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
    paddingVertical: 60,
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
