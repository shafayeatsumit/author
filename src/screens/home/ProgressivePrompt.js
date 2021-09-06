import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {checkIfMorningTime, checkTodayAfterFive} from '../../helpers/date';
import {useUserStore, useSubmissionStore, usePromptStore} from '../../store';
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {DailyTitles} from '../../helpers/contentsData';
import {checkIfToday} from '../../helpers/date';
import moment from 'moment';
import _ from 'lodash';
let count = 0;

const Prompt = ({item}) => {
  const navigation = useNavigation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [disableMessage, setDisableMessage] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const promptTitle = item.title;
  let allPrompts = DailyTitles[promptTitle];

  const promptStore = usePromptStore();
  const {submission} = useSubmissionStore();
  console.log('submission', submission.length);
  const totalPages = submission.length + 1;
  const {updateProgressive} = promptStore;
  const currentPrompt = promptStore[promptTitle];

  const {isOn, firstAvailable, nextAvailable, increment} = currentPrompt;

  const goToNote = () => {
    navigation.navigate('Note', {prompt: selectedPrompt});
  };

  const handlePress = () => {
    goToNote();
  };

  const pickRandomPrompt = () => {
    const multiplePrompts = allPrompts.length > 1;
    const firstTime = !isOn;
    if (!firstTime && multiplePrompts) {
      const lastServedId = currentPrompt.id;
      allPrompts = allPrompts.filter(p => p.id !== lastServedId);
    }
    const prompt = _.sample(allPrompts);

    const {title, id} = prompt;
    updateProgressive(title, id);
    setSelectedPrompt(prompt);
  };

  const serveContent = () => {
    const canServe = totalPages >= nextAvailable;

    if (canServe) {
      pickRandomPrompt();
    } else {
      const msg = `This will be available at page ${nextAvailable}`;
      setIsDisable(true);
      setDisableMessage(msg);
    }
  };

  const serveFirstTime = () => {
    const canServe = totalPages >= firstAvailable;
    console.log(
      `${promptTitle} ==> disable ${isDisable} can serve ${canServe}`,
    );
    if (canServe) {
      pickRandomPrompt();
    } else {
      const msg = `This will be first available at page ${firstAvailable}`;
      setIsDisable(true);
      setDisableMessage(msg);
    }
  };

  useEffect(() => {
    const servedBefore = !!currentPrompt.nextAvailable;

    if (servedBefore) {
      serveContent();
    } else {
      serveFirstTime();
    }
  }, []);

  const contentQuestion = !isDisable
    ? selectedPrompt.question + ' ' + '______'
    : null;

  console.log(`prompt title ${promptTitle} ${isDisable}`);
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={isDisable}
      key={'zero'}
      style={styles.itemPrompt}
      onPress={handlePress}>
      <View style={styles.clockHolder}>
        <Text style={styles.title}>{promptTitle}</Text>
      </View>
      {isDisable ? (
        <Text style={styles.text}>{disableMessage}</Text>
      ) : (
        <Text style={styles.text}>{contentQuestion}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Prompt;

const styles = StyleSheet.create({
  loading: {
    height: ScreenHeight,
    width: ScreenWidth,
    backgroundColor: '#303B49',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
