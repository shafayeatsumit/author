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
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.3}
      style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.dateText}>{todayString}</Text>
        <Text style={styles.titleText}>{content.type}</Text>
        <Text style={styles.question}>{content.question}</Text>
      </View>
      <Text style={styles.title}>{content.answer}</Text>
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF1F1',
    height: ScreenHeight,
    width: ScreenWidth,
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
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(23),
    // color: 'rgba(0,0,0,0.7)',
    paddingBottom: 10,
  },
  questionContainer: {
    padding: 30,
    // paddingTop: 20,
    paddingBottom: 15,
    marginTop: 90,
  },
  question: {
    fontFamily: 'georgia',
    fontSize: RFValue(18),
    color: 'rgba(0,0,0,0.7)',
  },
});
