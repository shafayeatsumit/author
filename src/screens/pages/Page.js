import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useUserStore, useSubmissionStore} from '../../store';
import {formatDate} from '../../helpers/date';

const Page = ({prompt}) => {
  const navigation = useNavigation();
  const {deleteSubmission} = useSubmissionStore();
  const isDedicationPage = prompt.id === 'intro_dedicate';
  const handlePress = () => {
    if (isDedicationPage) {
      navigation.navigate('Dedicate', {isEdit: true});
      return;
    }
    navigation.navigate('Note', {prompt, isEdit: true});
  };

  const dateString = formatDate(prompt.date);

  const promptAnswer = prompt.answer;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.dateText}>{dateString}</Text>
        <Text style={styles.answer}>{promptAnswer}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight / 2.5,
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderBottomWidth: 0.4,
    borderBottomColor: 'rgba(255,255,255,0.4)',
  },
  questionContainer: {
    paddingHorizontal: 30,
    // height: ScreenHeight / 2,
    width: ScreenWidth,
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    lineHeight: 41.6,
    textAlign: 'right',
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.37)',
  },
  answer: {
    fontSize: RFValue(32),
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',

    lineHeight: 41.6,

    letterSpacing: -2,
  },
});
