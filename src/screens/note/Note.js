import moment from 'moment';
import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useSubmissionStore, useUserStore, useContentStore} from '../../store';
import uuid from 'react-native-uuid';
const {height: ScreenHeight} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import analytics from '@react-native-firebase/analytics';

const Note = ({navigation, route}) => {
  const {setLastSubmit} = useUserStore();
  const {setSubmission, updateSubmission} = useSubmissionStore();
  const {removeContent} = useContentStore();
  const inputRef = useRef();
  const {content, isEdit} = route.params;
  const defaultText = content.answer ? content.answer : '';
  const [text, onChangeText] = React.useState(defaultText);
  const charMaxLength = 35;
  const todayString = moment().format('MMMM Do');
  const logEvent = eventType => {
    analytics().logEvent(eventType, {
      q: `${content.question}`,
      a: `${text}`,
    });
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const submitAnswer = () => {
    setSubmission({
      uid: uuid.v4(),
      question: content.question,
      answer: text,
      id: content.id,
      type: content.type,
      date: moment(),
    });
    logEvent('submit');
  };

  const editAnswer = () => {
    updateSubmission(content.id, text);
    logEvent('edit');
  };

  const goBack = () => {
    navigation.goBack();
    analytics().logEvent('button_push', {
      name: 'exit',
    });
  };

  const handleSubmit = () => {
    if (!text) {
      return;
    }
    submitAnswer();
    goBack();
    setLastSubmit();
    removeContent(content.id);
  };

  const handleEdit = () => {
    editAnswer();
    goBack();
  };
  const contentQuestion = content.question.replace('______', '');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableOpacity style={styles.xout} onPress={goBack}>
        <Image source={require('../../../assets/xout.png')} />
      </TouchableOpacity>

      <View style={styles.questionContainer}>
        <Text style={styles.dateText}>{todayString}</Text>
        <Text style={styles.titleText}>{content.type}</Text>
        <Text style={styles.question}>{contentQuestion}</Text>
        <TextInput
          onSubmitEditing={handleSubmit}
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          spellCheck={false}
          textAlignVertical="top"
          maxLength={35}
          ref={inputRef}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.length}>
          {' '}
          {text.length} / {charMaxLength}
        </Text>
        <TouchableOpacity
          onPress={isEdit ? handleEdit : handleSubmit}
          style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Note;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303B49',
  },
  dateContainer: {
    height: 100,
    width: 100,
    // backgroundColor: 'red',
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: RFValue(16),
    paddingBottom: 10,
    color: 'white',
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(23),
    color: 'rgba(0,0,0,0.7)',
    paddingBottom: 10,
    color: 'white',
  },
  questionContainer: {
    padding: 30,
    paddingTop: 20,
    paddingBottom: 15,
    marginTop: 90,
  },
  question: {
    fontFamily: 'georgia',
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.7)',
  },
  input: {
    height: 80,
    paddingHorizontal: 5,
    width: '100%',
    alignSelf: 'center',
    margin: 12,
    borderWidth: 0,
    fontSize: RFValue(27),
    color: 'black',
    fontFamily: 'Montserrat-Bold',
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
    backgroundColor: '#3470E1',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  length: {
    paddingTop: 20,
    paddingRight: 20,
    fontSize: RFValue(18),
    color: 'gray',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  xout: {
    height: 50,
    width: 50,
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 40,
  },
});
