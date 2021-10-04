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
import {checkTodayAfterFive} from '../../helpers/date';
import {usePromptStore} from '../../store';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {DailyTitles} from '../../helpers/contentsData';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import _ from 'lodash';
import PromptHeader from './PromptHeader';

const Prompt = ({item}) => {
  const navigation = useNavigation();
  const [isDisabled, setDisabled] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const promptTitle = item.title;
  let allPrompts = DailyTitles[promptTitle];
  const promptStore = usePromptStore();
  const {updatePrompt} = promptStore;
  const currentPrompt = promptStore[promptTitle];

  const goToNote = () => {
    navigation.navigate('Note', {prompt: selectedPrompt});
  };

  const handlePress = () => {
    goToNote();
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
    const isServedToday = servedAt && checkTodayAfterFive(servedAt);

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
      <View style={styles.titleHolder}>
        <Text style={styles.title}>{capitalizedTitle}</Text>
      </View>

      <Text style={styles.text}>{contentQuestion}</Text>
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
    height: ScreenHeight / 3,
    width: ScreenWidth,
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 0.2,
    paddingVertical: 20,
  },
  titleHolder: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  title: {
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  text: {
    lineHeight: 41.6,
    fontSize: RFValue(32),
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    paddingTop: 12,
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
