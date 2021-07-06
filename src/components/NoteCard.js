import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {formatDate} from '../helpers/date';
import {getAnswerStyle} from '../helpers/styling';

const NoteCard = ({content, handlePress}) => {
  const dateString = formatDate(content.date, content.type);
  const fontType = getAnswerStyle(content.type, content.isExtra);
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Text style={styles.dateText}>{dateString}</Text>
        {content.isExtra && (
          <Text style={styles.questionText}>{content.question}</Text>
        )}

        <Text style={[styles.answerText, fontType]}>{content.answer}</Text>
      </TouchableOpacity>
    </>
  );
};
export default NoteCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    minHeight: 190,
    width: '87%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  questionText: {
    fontSize: RFValue(16),
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'left',
    fontFamily: 'georgia',
    fontWeight: '400',
    paddingVertical: 20,
  },
  answerText: {
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
