import moment from 'moment';
import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useSubmissionStore, usePromptStore, useUserStore} from '../../store';
import uuid from 'react-native-uuid';
import {sharedStart} from '../../helpers/utils';
import {formatDate} from '../../helpers/date';
import NoteHeader from './NoteHeader';
import useKeyboard from '../../helpers/useKeyboard';
const {height: ScreenHeight, width: ScreenWidth} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import analytics from '@react-native-firebase/analytics';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
TextInput.defaultProps.selectionColor = 'white';

const Note = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const HeaderHeight = 90;
  const ButtonHeight = 50;
  const ExtraHeight = 40;
  const boxHeight =
    ScreenHeight - (keyboardHeight + HeaderHeight + ButtonHeight + ExtraHeight);
  const {setLastSubmit} = useUserStore();
  const {updatePrompt, incNextAvailable} = usePromptStore();
  const {setSubmission, updateSubmission, submission} = useSubmissionStore();
  const inputRef = useRef();
  const totalPages = submission.length + 1;
  const {prompt, isEdit} = route.params;
  const promptQuestion = prompt.question;
  const promptAnswer = prompt.answer;

  const getAnswer = () => {
    const firstHalf = sharedStart([promptQuestion, promptAnswer]);
    const secondHalf = promptAnswer.replace(firstHalf, '');
    return secondHalf + ' ';
  };

  const answerPart = isEdit ? getAnswer() : '';

  const defaultText = promptQuestion + ' ' + answerPart;

  const [text, onChangeText] = React.useState(defaultText);

  const dateString = isEdit ? formatDate(prompt.date) : 'Today';

  const logEvent = eventType => {
    analytics().logEvent(eventType, {
      q: `${prompt.question}`,
      a: `${text}`,
    });
  };

  const submitAnswer = () => {
    const date = moment();
    const day = date.format('YYYY-MM-DD');
    setSubmission({
      ...prompt,
      uid: uuid.v4(),
      answer: text,
      id: prompt.id,
      type: prompt.type,
      date: new Date(),
      day,
    });
    const create = !isEdit;
    if (create && prompt.type !== 'progressive') {
      const {id, title} = prompt;
      updatePrompt(title, id, null, new Date());
      logEvent('submit');
    }

    if (create && prompt.type === 'progressive') {
      const {title} = prompt;
      incNextAvailable(title, totalPages);
    }
  };

  const editAnswer = () => {
    updateSubmission(prompt.id, text);
    logEvent('edit');
  };

  const goBack = () => {
    navigation.goBack();
    analytics().logEvent('button_push', {
      name: 'exit',
    });
  };

  const handleSubmit = () => {
    submitAnswer();
    goBack();
    setLastSubmit();
  };

  const handleEdit = () => {
    editAnswer();
    goBack();
  };

  const sharedInputValue = sharedStart([promptQuestion, text]);
  const unsharedInputValue = text.replace(sharedInputValue, '');

  const resetCursor = () => {
    inputRef.current.setNativeProps({
      selection: {
        start: undefined,
        end: undefined,
      },
    });
  };

  const findIndex = () =>
    submission.findIndex(item => item.id === prompt.id) + 1;

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
    setTimeout(setCursor, 500);
  }, []);
  const buttonDisabled = text === defaultText;
  const footerPageNumber = isEdit ? findIndex() : totalPages;
  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios'
        ? {behavior: 'padding'}
        : {behavior: 'height'})}
      style={styles.container}>
      <LinearGradient style={styles.container} colors={['#343D4C', '#131E25']}>
        <View style={{flex: 1}}>
          <NoteHeader title={prompt.title} date={dateString} goBack={goBack} />
          <View style={[styles.questionContainer, {height: boxHeight}]}>
            <TextInput
              onSubmitEditing={handleSubmit}
              style={styles.input}
              multiline={true}
              onChangeText={onChangeText}
              spellCheck={false}
              textAlignVertical="top"
              selectionColor={'white'}
              ref={inputRef}>
              <Text style={styles.boldInput}>
                {sharedInputValue}
                {unsharedInputValue}
              </Text>
            </TextInput>
          </View>

          <View style={[styles.buttonContainer]}>
            <Text style={styles.pageNo}>Page {footerPageNumber}</Text>
            <TouchableOpacity
              disabled={buttonDisabled}
              onPress={isEdit ? handleEdit : handleSubmit}
              style={[
                styles.button,
                buttonDisabled && {backgroundColor: '#71706E'},
              ]}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
export default Note;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    height: 120,
    width: ScreenWidth - 72,
    alignSelf: 'center',
    marginTop: 90, // HeaderHeight
  },
  input: {
    flex: 1,
    alignSelf: 'flex-start',
    marginHorizontal: 2,
    letterSpacing: -1,
    borderWidth: 0,
    lineHeight: 39,
    fontSize: RFValue(28),
    color: 'rgba(255,255,255,0.92)',
    fontFamily: 'Montserrat-Bold',
  },
  boldInput: {
    fontSize: RFValue(28),
    lineHeight: 39,
    letterSpacing: -2,
    color: 'rgba(255,255,255,0.92)',
    fontFamily: 'Montserrat-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  button: {
    marginTop: 10,
    height: 50,
    width: 100,
    backgroundColor: 'rgba(42, 98, 219, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFValue(26),
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  pageNo: {
    fontSize: RFValue(14),
    lineHeight: 14,
    color: 'rgba(255, 255, 255, 0.38)',
    paddingRight: 24,
    paddingTop: 35,
    // paddingBottom: 50,
  },
});
