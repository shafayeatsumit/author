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
  Image,
  StyleSheet,
} from 'react-native';
import {useSubmissionStore, usePromptStore, useUserStore} from '../../store';
import uuid from 'react-native-uuid';
import {sharedStart} from '../../helpers/utils';
import {formatDate} from '../../helpers/date';
import NoteHeader from './NoteHeader';
import {triggerHaptic} from '../../helpers/haptics';
const {height: ScreenHeight, width: ScreenWidth} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import analytics from '@react-native-firebase/analytics';
TextInput.defaultProps.selectionColor = 'white';

const progressive_prompts = [
  'backstory',
  'flashforward',
  'narrator',
  'Plot Twist',
];

const Note = ({navigation, route}) => {
  const {setLastSubmit} = useUserStore();
  const {decNextAvailable} = usePromptStore();
  const {setSubmission, deleteSubmission, updateSubmission, submission} =
    useSubmissionStore();

  const inputRef = useRef();
  const totalPages = submission.length + 1;
  const {prompt, isEdit, scrollToContent} = route.params;
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

  const sharedInputValue = sharedStart([promptQuestion, text]);
  const unsharedInputValue = text.replace(sharedInputValue, '');

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
    analytics().logEvent('button_push', {
      name: 'add page',
      length: unsharedInputValue.length,
    });
  };

  const editAnswer = () => {
    updateSubmission(prompt.id, text);
    analytics().logEvent('button_push', {
      name: 'update page',
    });
  };

  const goBack = () => {
    navigation.goBack();
    analytics().logEvent('button_push', {
      name: 'pressed exit',
    });
  };

  const handleSubmit = () => {
    submitAnswer();
    goBack();
    setLastSubmit();
    triggerHaptic();
  };

  const handleDelete = () => {
    triggerHaptic();
    deleteSubmission(prompt.uid);
    if (prompt.type === 'progressive') {
      progressive_prompts.map(item => decNextAvailable(item));
    }
    goBack();
  };

  const handleEdit = () => {
    triggerHaptic();
    editAnswer();
    goBack();
    setTimeout(scrollToContent, 400);
  };

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
      <View style={styles.container}>
        <NoteHeader title={prompt.title} date={dateString} goBack={goBack} />
        <View style={styles.inputContainer}>
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
        <View style={styles.buttonContainer}>
          {isEdit ? (
            <TouchableOpacity
              style={styles.deleteConainer}
              onPress={handleDelete}>
              <Image
                style={styles.delete}
                source={require('../../../assets/ff.png')}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.deleteConainer} />
          )}
          {/* <Text style={styles.pageNo}>Page {footerPageNumber}</Text> */}
          <TouchableOpacity
            disabled={buttonDisabled}
            onPress={isEdit ? handleEdit : handleSubmit}
            style={[
              styles.button,
              buttonDisabled && {backgroundColor: '#1E4686'},
            ]}>
            <Text
              style={[styles.buttonText, buttonDisabled && styles.disableText]}>
              {isEdit ? 'Update' : 'Add page'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Note;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  questionContainer: {
    height: 120,
    width: ScreenWidth - 72,
    alignSelf: 'center',
    marginTop: 90, // HeaderHeight
  },
  inputContainer: {
    paddingHorizontal: 25,
    marginTop: 100,
    height: ScreenHeight / 2.9,
  },
  disableText: {
    color: 'rgba(255, 255, 255, 0.38)',
  },
  deleteConainer: {
    height: 40,
    width: 40,
    marginLeft: 35,
    paddingTop: 20,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: 'rgba(255,255,255,0.7)',
  },
  input: {
    flex: 1,
    alignSelf: 'flex-start',
    marginHorizontal: 2,
    letterSpacing: -1,
    borderWidth: 0,
    lineHeight: 41.6,
    fontSize: RFValue(30),
    color: 'rgba(255,255,255,0.92)',
    fontFamily: 'Montserrat-Regular',
  },
  boldInput: {
    lineHeight: 41.6,
    fontSize: RFValue(30),
    letterSpacing: -2,
    color: 'rgba(255,255,255,0.92)',
    fontFamily: 'Montserrat-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    // backgroundColor: 'orange',
  },

  button: {
    marginTop: 10,
    height: 50,
    width: 130,
    backgroundColor: '#2A62DB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFValue(18),
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  pageNo: {
    fontSize: RFValue(14),
    lineHeight: 14,
    color: 'rgba(255, 255, 255, 0.38)',
    // paddingRight: 24,
    paddingTop: 35,
  },
});
