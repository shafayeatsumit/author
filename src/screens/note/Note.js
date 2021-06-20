import moment from 'moment';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useSubmissionStore, useUserStore, useContentStore} from '../../store';
import uuid from 'react-native-uuid';

const Note = ({navigation, route}) => {
  const {setLastSubmit} = useUserStore();
  const {setSubmission, updateSubmission} = useSubmissionStore();
  const {moveFirst} = useContentStore();
  const {content, isEdit} = route.params;
  const defaultText = content.answer ? content.answer : '';
  const [text, onChangeText] = React.useState(defaultText);

  const submitAnswer = () => {
    setSubmission({
      uid: uuid.v4(),
      question: content.question,
      answer: text,
      id: content.id,
      date: moment(),
    });
  };

  const editAnswer = () => {
    updateSubmission(content.id, text);
  };

  const goBack = () => navigation.goBack();

  const handleSubmit = () => {
    submitAnswer();
    moveFirst();
    goBack();
    setLastSubmit();
  };

  const handleEdit = () => {
    editAnswer();
    goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.xout} onPress={goBack}>
        <Image source={require('../../../assets/xout.png')} />
      </TouchableOpacity>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{content.question}</Text>
      </View>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        spellCheck={false}
        textAlignVertical="top"
        maxLength={35}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.length}> {text.length} / 35</Text>
        <TouchableOpacity
          onPress={isEdit ? handleEdit : handleSubmit}
          style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Note;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    padding: 30,
    marginTop: 90,
  },
  question: {
    fontSize: 20,
    fontWeight: '300',
  },
  input: {
    height: 110,
    width: '85%',
    alignSelf: 'center',
    margin: 12,
    borderWidth: 0.6,
    fontSize: 24,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: '#65B354',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  length: {
    paddingRight: 20,
    fontSize: 18,
    paddingTop: 35,
    color: 'gray',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  xout: {
    height: 60,
    width: 60,
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 40,
  },
});
