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
import {sharedStart} from '../../helpers/utils';
const {height: ScreenHeight} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import analytics from '@react-native-firebase/analytics';
TextInput.defaultProps.selectionColor = 'white';

const Note = ({navigation, route}) => {
  const {setLastSubmit} = useUserStore();
  const {setSubmission, updateSubmission} = useSubmissionStore();
  const {removeContent} = useContentStore();
  const inputRef = useRef();
  const {content, isEdit} = route.params;
  const contentQuestion = content.question.replace('______', '');
  const contentAnswer = content.answer;
  const getAnswer = () => {
    const firstHalf = sharedStart([contentQuestion, contentAnswer]);
    const secondHalf = contentAnswer.replace(firstHalf, '');
    return secondHalf;
  };

  const answerPart = isEdit ? getAnswer() : '';

  const defaultText = contentQuestion + answerPart;

  const [text, onChangeText] = React.useState(defaultText);

  const todayString = moment().format('MMMM Do');

  const logEvent = eventType => {
    analytics().logEvent(eventType, {
      q: `${content.question}`,
      a: `${text}`,
    });
  };

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

  const sharedInputValue = sharedStart([contentQuestion, text]);
  const unsharedInputValue = text.replace(sharedInputValue, '');

  const resetCursor = () => {
    inputRef.current.setNativeProps({
      selection: {
        start: undefined,
        end: undefined,
      },
    });
  };

  const setCursor = () => {
    inputRef.current.focus();
    inputRef.current.setNativeProps({
      selection: {
        start: text.length,
        end: text.length,
      },
    });
    if (Platform.OS === 'android') {
      setTimeout(resetCursor, 100);
    }
  };

  useEffect(() => {
    setTimeout(setCursor, 600);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableOpacity style={styles.xout} onPress={goBack}>
        <Image source={require('../../../assets/xout.png')} />
      </TouchableOpacity>

      <View style={styles.questionContainer}>
        <Text style={styles.titleText}>{content.type}</Text>
        <Text style={styles.dateText}>{todayString}</Text>

        <TextInput
          onSubmitEditing={handleSubmit}
          style={styles.input}
          multiline={true}
          onChangeText={onChangeText}
          spellCheck={false}
          textAlignVertical="top"
          selectionColor={'white'}
          ref={inputRef}>
          <Text>
            {sharedInputValue}

            <Text style={styles.boldInput}>{unsharedInputValue}</Text>
          </Text>
        </TextInput>
      </View>

      <View style={styles.buttonContainer}>
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
    fontSize: RFValue(14),
    paddingBottom: 10,
    color: 'white',
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(23),
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
    height: ScreenHeight / 4.5,
    paddingHorizontal: 5,
    width: '100%',
    alignSelf: 'center',
    margin: 12,
    lineHeight: 30,
    borderWidth: 0,
    fontSize: RFValue(19),
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'georgia',
  },
  boldInput: {
    fontSize: RFValue(22),
    color: 'white',
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
