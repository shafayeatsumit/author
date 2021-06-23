import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {formatDate} from '../helpers/date';
const {height: ScreenHeight} = Dimensions.get('window');

const getAnswerStyle = (type, pairId) => {
  if (pairId) {
    return 'georgia';
  }
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
  const fontType = getAnswerStyle(content.type, content.pairId);
  return (
    <>
      <View style={styles.lineStart} />
      <View style={styles.line} />
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Text style={styles.dateText}>{dateString}</Text>
        {content.pairId && (
          <Text style={styles.questionText}>{content.question}</Text>
        )}

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
    height: ScreenHeight / 8,
  },
  container: {
    paddingVertical: 40,
    minHeight: 220,
    width: '87%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(101, 179, 84, 0.20)',
      },
      android: {
        shadowColor: 'rgba(101, 179, 84, 0.5)',
      },
    }),
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    paddingHorizontal: 25,
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
