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
  const [isDisable, setIsDisable] = useState(false);

  const [selectedPrompt, setSelectedPrompt] = useState('');

  const promptTitle = item.title;
  let allPrompts = DailyTitles[promptTitle];

  const promptStore = usePromptStore();
  const {submission} = useSubmissionStore();

  const totalPages = submission.length + 1;
  const {updateProgressive} = promptStore;
  const activePrompt = promptStore[promptTitle];
  const {
    id: lastServedId,
    firstAvailable,
    nextAvailable,
    increment,
  } = activePrompt;
  const isServedBefore = !!lastServedId;
  const isAnsweredBefore = !!nextAvailable;
  const activePromptDeatil = allPrompts.find(p => p.id === lastServedId);

  const goToNote = () => {
    navigation.navigate('Note', {prompt: activePromptDeatil});
  };

  const handlePress = () => {
    goToNote();
  };

  const pickRandomPrompt = () => {
    const multiplePrompts = allPrompts.length > 1;
    if (isServedBefore && multiplePrompts) {
      allPrompts = allPrompts.filter(p => p.id !== lastServedId);
    }
    const prompt = _.sample(allPrompts);
    const {title, id} = prompt;
    updateProgressive(title, id);
  };
  let disableMessage = null;
  let activeMessage = activePromptDeatil ? activePromptDeatil.question : '';

  if (!isServedBefore && totalPages < firstAvailable) {
    disableMessage = `First available will be at ${firstAvailable}`;
  } else if (!isServedBefore && totalPages === firstAvailable) {
    pickRandomPrompt();
  } else if (isServedBefore && nextAvailable && totalPages < nextAvailable) {
    disableMessage = `Next availabe at ${nextAvailable}`;
  } else if (
    isServedBefore &&
    isAnsweredBefore &&
    totalPages >= nextAvailable
  ) {
    pickRandomPrompt();
  }
  console.log(`${promptTitle} ===> ${disableMessage}`);
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
      {disableMessage ? (
        <Text style={styles.text}>{disableMessage}</Text>
      ) : (
        <Text style={styles.text}>{activeMessage}</Text>
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
