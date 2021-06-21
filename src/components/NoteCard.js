import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {formatDate} from '../helpers/date';
const {height: ScreenHeight} = Dimensions.get('window');

const getAnswerStyle = type => {
  if (type === 'week') {
    return 'georgia';
  } else if (type === 'month') {
    return 'Montserrat-Bold';
  } else {
    return 'Montserrat-Regular';
  }
};

const NoteCard = ({content, handlePress}) => {
  const dateString = formatDate(content.date, content.type);
  const fontType = getAnswerStyle(content.type);
  return (
    <>
      <View style={styles.lineStart} />
      <View style={styles.line} />
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Text style={styles.dateText}>{dateString}</Text>
        <Text style={styles.questionText}>{content.question}</Text>
        <Text style={[styles.answerText, {fontFamily: fontType}]}>
          {content.answer}
        </Text>
      </TouchableOpacity>
    </>
  );
};
export default NoteCard;

const styles = StyleSheet.create({
  lineStart: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderColor: '#81C174',
    alignSelf: 'center',
    borderWidth: 1,
  },
  line: {
    width: 1.5,
    alignSelf: 'center',
    backgroundColor: '#81C174',
    height: ScreenHeight / 10,
  },
  container: {
    // height: ScreenHeight / 2.7,
    paddingVertical: 55,
    width: '87%',
    // marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0.3, height: 0.5},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  questionText: {
    fontSize: RFValue(19),
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'left',
    fontFamily: 'georgia',
    fontWeight: '400',
    paddingVertical: 20,
  },
  answerText: {
    fontSize: RFValue(29),
    textAlign: 'left',
  },
  dateText: {
    fontSize: RFValue(14),
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 15,
    left: 30,
  },
});
