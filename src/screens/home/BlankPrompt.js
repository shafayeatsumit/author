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
import {useNavigation} from '@react-navigation/native';
import {checkIfMorningTime, checkTodayAfterFive} from '../../helpers/date';
import {useUserStore, useSubmissionStore, usePromptStore} from '../../store';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {DailyTitles} from '../../helpers/contentsData';
import {checkIfToday} from '../../helpers/date';
import moment from 'moment';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

const BlankPrompt = {
  id: 'blank_prompt_id',
  question: '',
  answer: '',
  type: 'blank',
  title: 'blank',
  time: 'all_time',
};
const Prompt = ({item}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const isMorningTime = checkIfMorningTime();
  const isAfternoonTime = !isMorningTime;
  const promptTitle = item.title;
  let allPrompts = DailyTitles[promptTitle];
  const promptStore = usePromptStore();
  const {submission} = useSubmissionStore();
  const {updatePrompt} = promptStore;
  const currentPrompt = promptStore[promptTitle];

  const goToNote = () => {
    navigation.navigate('Note', {prompt: BlankPrompt});
  };

  const handlePress = () => {
    goToNote();
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        {/* <ActivityIndicator size="large" color="#BBBFC2" /> */}
      </View>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={false}
      key={BlankPrompt.id}
      style={styles.itemPrompt}
      onPress={handlePress}>
      <View style={styles.clockHolder}>
        <Text style={styles.title}>Blank</Text>
      </View>

      <Text style={styles.text}>__________</Text>
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
