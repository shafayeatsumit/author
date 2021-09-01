import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {checkIfMorningTime, checkTodayAfterFive} from '../../helpers/date';
import {useUserStore, usePromptStore} from '../../store';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {DailyTitles} from '../../helpers/contentsData';
import {checkIfToday} from '../../helpers/date';
import moment from 'moment';
import _ from 'lodash';

const Prompt = ({item, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const isMorningTime = checkIfMorningTime();
  const isAfternoonTime = !isMorningTime;
  const isLastVisitToday = checkTodayAfterFive(lastVisit);
  const promptTitle = item.title;
  let allPrompts = DailyTitles[promptTitle];

  const {lastVisit} = useUserStore();
  const promptStore = usePromptStore();
  const {updatePrompt} = promptStore;

  console.log('is today', isLastVisitToday);

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
    navigation.navigate('Note', {content: selectedPrompt});
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

  const contentQuestion = isActive
    ? selectedPrompt.question + ' ' + '______'
    : selectedPrompt.question;

  const capitalizedTitle = _.upperFirst(selectedPrompt.title);

  const pickRandomPrompt = () => {
    const servedBefore = _.has(promptStore, `${promptTitle}.date`);
    const multiplePrompts = allPrompts.length > 1;
    if (servedBefore && multiplePrompts) {
      const lastServedId = promptStore[promptTitle].id;
      allPrompts = allPrompts.filter(p => p.id !== lastServedId);
    }
    const prompt = _.sample(allPrompts);
    const {title, id} = prompt;
    updatePrompt(title, id);
    setSelectedPrompt(prompt);
  };

  const serveForToday = () => {
    const lastServedId = promptStore[promptTitle].id;
    const prompt = allPrompts.find(p => p.id === lastServedId);

    setSelectedPrompt(prompt);
  };

  const serveContent = () => {
    let lastServedAt = promptStore[promptTitle].date;
    const isServedToday = checkIfToday(lastServedAt);
    if (isServedToday) {
      serveForToday();
    } else {
      // all prompts filter then pick one,
      pickRandomPrompt();
    }
  };

  useEffect(() => {
    serveContent();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
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
      <Text style={styles.text}>{contentQuestion}</Text>
    </TouchableOpacity>
  );
};
export default Prompt;

const styles = StyleSheet.create({
  itemPrompt: {
    backgroundColor: '#303B49',
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
  },
  title: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    fontSize: 32,
    color: '#BBBFC2',
    textAlign: 'center',
    fontFamily: 'georgia',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});
