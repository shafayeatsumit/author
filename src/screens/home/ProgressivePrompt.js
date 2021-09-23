import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useSubmissionStore, usePromptStore} from '../../store';
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {DailyTitles} from '../../helpers/contentsData';
import _ from 'lodash';
import {RFValue} from 'react-native-responsive-fontsize';

const Prompt = ({item}) => {
  const navigation = useNavigation();

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
    lastServedAt,
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
    updateProgressive(title, id, totalPages);
  };

  let disableMessage = null;
  let activeMessage = activePromptDeatil ? activePromptDeatil.question : '';

  if (!isServedBefore && totalPages < firstAvailable) {
    disableMessage = `Unlocks on page ${firstAvailable}`;
  } else if (!isServedBefore && totalPages === firstAvailable) {
    pickRandomPrompt();
  } else if (isServedBefore && nextAvailable && totalPages < nextAvailable) {
    disableMessage = `Next available on ${nextAvailable}`;
  } else if (
    isAnsweredBefore &&
    totalPages === nextAvailable &&
    lastServedAt < totalPages
  ) {
    pickRandomPrompt();
  }
  const capitalizedTitle = _.upperFirst(promptTitle);
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!!disableMessage}
      key={'zero'}
      style={styles.itemPrompt}
      onPress={handlePress}>
      <View style={styles.clockHolder}>
        <Text style={styles.title}>{capitalizedTitle}</Text>
      </View>
      {disableMessage ? (
        <Text style={styles.disableText}>{disableMessage}</Text>
      ) : (
        <Text style={styles.text}>{activeMessage + ' ' + '______'}</Text>
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
