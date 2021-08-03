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
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Page = ({content, navigation}) => {
  const todayString = moment().format('dddd MMMM Do');
  const handlePress = () => {
    navigation.navigate('Note', {content, isEdit: true});
  };
  const question = content.question.replace('______', '');
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.questionContainer}>
        <Text style={styles.titleText}>{content.type}</Text>
        <Text style={styles.dateText}>{todayString}</Text>
        <Text style={styles.question}>
          {question}
          <Text style={[styles.question, styles.answer]}>
            {' '}
            {content.answer}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303B49',
    height: ScreenHeight,
    width: ScreenWidth,
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
    padding: 30,
    // paddingTop: 20,
    paddingBottom: 15,
    marginTop: 90,
  },
  question: {
    fontFamily: 'georgia',
    fontSize: RFValue(26),
    color: 'rgba(255,255,255,0.8)',
    paddingTop: 20,
    lineHeight: 45,
  },
  answer: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: RFValue(30),
    color: 'rgba(255,255,255,0.8)',
  },
});
