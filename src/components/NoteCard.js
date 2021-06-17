import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {formatDate} from '../helpers/date';

const NoteCard = ({content, handlePress}) => {
  const dateString = formatDate(content.date);
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.dateText}>{dateString}</Text>
      <Text style={styles.questionText}>{content.question}</Text>
      <Text style={styles.answerText}>{content.answer}</Text>
    </TouchableOpacity>
  );
};
export default NoteCard;

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '85%',
    marginVertical: 20,
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
    fontSize: 16,
    textAlign: 'left',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  answerText: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    position: 'absolute',
    top: 15,
    left: 30,
  },
});
