import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {sharedStart} from '../../helpers/utils';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Page = ({content, navigation}) => {
  const dateString = moment(content.date).format('dddd MMMM Do');
  const handlePress = () => {
    navigation.navigate('Note', {content, isEdit: true});
  };
  const question = content.question.replace('______', '');
  const contentAnswer = content.answer;
  const sharedInputValue = sharedStart([question, contentAnswer]);
  const unsharedInputValue = contentAnswer.replace(sharedInputValue, '');

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.titleText}>{content.type}</Text>
        <Text style={styles.question}>
          {sharedInputValue}
          <Text style={[styles.question, styles.answer]}>
            {unsharedInputValue}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#303B49',
    width: ScreenWidth,
    flex: 1,
    // backgroundColor: 'orange',
  },
  spacer: {
    height: ScreenHeight / 14,
  },
  title: {
    paddingTop: 15,
    fontSize: 35,
    textAlign: 'left',
    paddingLeft: 30,
    fontFamily: 'Montserrat-Bold',
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: RFValue(16),
    paddingBottom: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(23),
    // color: 'rgba(255,255,255,0.7)',
    paddingBottom: 10,
    color: 'white',
  },
  questionContainer: {
    paddingHorizontal: 30,
    paddingBottom: 15,
  },
  question: {
    fontFamily: 'georgia',
    fontSize: RFValue(19),
    color: 'rgba(255,255,255,0.6)',
    paddingTop: 20,
  },
  answer: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(22),
    color: 'rgba(255,255,255,1)',
  },
});
