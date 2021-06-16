import moment from 'moment';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSubmissionStore} from '../../store';
import uuid from 'react-native-uuid';

const Note = ({route}) => {
  const {submission, setSubmission} = useSubmissionStore();
  const {content} = route.params;
  const [text, onChangeText] = React.useState('');
  const handlePress = () => {
    setSubmission({
      uid: uuid.v4(),
      question: content.text,
      answer: text,
      id: content.id,
      date: moment(),
    });
  };
  console.log('submissions', submission);
  return (
    <View style={styles.container}>
      <Text>{content.text}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TouchableOpacity onPress={handlePress} style={styles.button} />
    </View>
  );
};
export default Note;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 100,
    width: 300,
    margin: 12,
    borderWidth: 1,
    fontSize: 24,
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: 'tomato',
    marginTop: 20,
  },
});
