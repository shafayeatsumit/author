import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {checkIfMorningTime, checkTodayAfterFive} from '../../helpers/date';
import {usePromptStore} from '../../store';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {DailyTitles} from '../../helpers/contentsData';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import _ from 'lodash';
import PromptFooter from './PromptFooter';

const Prompt = ({item}) => {
  const navigation = useNavigation();
  const [isDisabled, setDisabled] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const isMorningTime = checkIfMorningTime();
  const isAfternoonTime = !isMorningTime;
  const promptTitle = item.title;
  let allPrompts = DailyTitles[promptTitle];
  const promptStore = usePromptStore();
  const {updatePrompt} = promptStore;
  const currentPrompt = promptStore[promptTitle];

  const checkIfActive = type => {
    if (type === 'morning') {
      return isMorningTime;
    }
    if (type === 'afternoon') {
      return isAfternoonTime;
    }
  };
  const isActive = checkIfActive(item.time);

  const goToNote = () => {
    navigation.navigate('Note', {prompt: selectedPrompt});
  };

  const askAlert = () => {
    const isMorningPrompt = selectedPrompt.time === 'morning';
    const whenToAnswer = isMorningPrompt ? 'early' : 'later';
    Alert.alert(
      'Wait',
      `Some of these prompts are meant for ${whenToAnswer} in your day`,
      [
        {
          text: 'answer now',
          onPress: goToNote,
          style: 'cancel',
        },
        {text: 'Got it', onPress: () => console.log('OK Pressed')},
      ],
    );
  };

  const handlePress = () => {
    !isActive ? askAlert() : goToNote();
  };

  const contentQuestion = selectedPrompt.question + ' ' + '______';

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
    const {id: promptId, answeredAt} = currentPrompt;
    const hasAnsweredBefore = !!answeredAt;
    const isAnsweredToday =
      hasAnsweredBefore && checkTodayAfterFive(answeredAt);

    if (isAnsweredToday) {
      setDisabled(true);
    }
    const prompt = allPrompts.find(p => p.id === promptId);
    setSelectedPrompt(prompt);
  };

  const serveContent = () => {
    const {servedAt} = currentPrompt;
    const isServedToday = checkTodayAfterFive(servedAt);
    if (isServedToday) {
      serveForToday();
    } else {
      // all prompts filter then pick one,
      pickRandomPrompt();
    }
  };

  useEffect(() => {
    serveContent();
  }, [currentPrompt]);

  useEffect(() => {
    serveContent();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={isDisabled}
      key={selectedPrompt.id}
      style={styles.itemPrompt}
      onPress={handlePress}>
      <View style={styles.clockHolder}>
        <Text style={styles.title}>{capitalizedTitle}</Text>
        {!isActive && (
          <Image
            style={styles.clock}
            source={require('../../../assets/clock.png')}
          />
        )}
      </View>
      {isDisabled ? (
        <Text style={styles.disableText}>Available again tomorrow</Text>
      ) : (
        <Text style={styles.text}>{contentQuestion}</Text>
      )}
      <PromptFooter />
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
    backgroundColor: 'transparent',
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
  },
  clockHolder: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  clock: {
    marginLeft: 5,
    height: 14,
    width: 14,
    tintColor: 'rgba(255,255,255,0.92)',
  },
  title: {
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  text: {
    fontSize: RFValue(30),
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  disableText: {
    fontSize: RFValue(30),
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});
