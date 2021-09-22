import moment from 'moment';
import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useSubmissionStore, usePromptStore, useUserStore} from '../../store';
import uuid from 'react-native-uuid';
import {sharedStart} from '../../helpers/utils';
import {formatDate} from '../../helpers/date';
import useKeyboard from '../../helpers/useKeyboard';
const {height: ScreenHeight, width: ScreenWidth} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';
import analytics from '@react-native-firebase/analytics';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

TextInput.defaultProps.selectionColor = 'white';

const Note = ({route}) => {
  const {prompt, handleClose} = route.params;
  const navigation = useNavigation();
  const {
    updateSubmission,
    deleteSubmission,
    setTitlePage,
    submission,
    skipSubmission,
  } = useSubmissionStore();
  const promptQuestion = prompt.question;
  const promptAnswer = prompt.answer ? ' ' + prompt.answer : ' ';
  const defaultText = promptQuestion + promptAnswer;
  const inputRef = useRef();
  const [text, onChangeText] = React.useState(defaultText);
  const introDedicate = prompt.id === 'intro_dedicate';

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
      setTimeout(resetCursor, 200);
    }
  };

  const skip = () => {
    skipSubmission(prompt.id);
    if (introDedicate) {
      addTitlePage();
    }
    handleClose();
    navigation.goBack();
  };

  const handleKeyPress = ({nativeEvent}) => {
    const disable = nativeEvent.key === 'Backspace';
    if (disable) {
      console.log('backspace');
    }
  };

  const handleFutureMe = () => {
    onChangeText('I dedicate this story to future me.');
  };

  const handleFamily = () => {
    onChangeText('I dedicate this story to family.');
  };

  const sharedInputValue = sharedStart([promptQuestion, text]);
  const unsharedInputValue = text.replace(sharedInputValue, '');
  const inputValue = promptQuestion + unsharedInputValue;
  const buttonDisabled = !unsharedInputValue.trim();
  const addTitlePage = () => {
    const titlePageIndex = submission.findIndex(
      item => item.id === 'intro_title',
    );
    console.log('title page', titlePageIndex);
    if (titlePageIndex === -1) {
      setTitlePage();
    }
  };
  const handleAdd = () => {
    updateSubmission(prompt.id, unsharedInputValue);
    navigation.goBack();
    handleClose();
    if (introDedicate) {
      addTitlePage();
    }
  };
  const charLength = unsharedInputValue.length;
  useEffect(() => {
    setTimeout(setCursor, 400);
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={useHeaderHeight()}
      {...(Platform.OS === 'ios'
        ? {behavior: 'padding'}
        : {behavior: 'height'})}
      style={styles.container}>
      <LinearGradient style={styles.container} colors={['#343D4C', '#131E25']}>
        <TouchableOpacity onPress={skip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TextInput
            style={[styles.input]}
            onChangeText={onChangeText}
            spellCheck={false}
            onKeyPress={handleKeyPress}
            textAlignVertical="top"
            selectionColor={'white'}
            disable={false}
            ref={inputRef}
            value={inputValue}
            multiline={true}
            maxLength={promptQuestion.length + 20}
          />
        </ScrollView>
        <View style={styles.buttonHolder}>
          {introDedicate && (
            <TouchableOpacity
              onPress={handleFutureMe}
              style={[styles.button, styles.buttonLight]}>
              <Text style={styles.buttonTextSm}>Fuure Me</Text>
            </TouchableOpacity>
          )}
          {introDedicate && (
            <TouchableOpacity
              onPress={handleFamily}
              style={[styles.button, styles.buttonLight]}>
              <Text style={styles.buttonTextSm}>Family</Text>
            </TouchableOpacity>
          )}
          {!introDedicate && (
            <Text style={styles.charLimit}>{charLength}/20</Text>
          )}

          <TouchableOpacity
            onPress={handleAdd}
            style={[styles.button, buttonDisabled && styles.disableButton]}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
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
  disableButton: {
    backgroundColor: '#71706E',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 15,
    height: 35,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    // backgroundColor: 'tomato',
  },
  skipText: {
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.38)',
    lineHeight: 22,
    fontFamily: 'Montserrat-Regular',
  },
  scrollView: {
    flex: 1,
    marginTop: 100,
  },
  input: {
    flex: 1,
    letterSpacing: -1,
    borderWidth: 0,
    paddingHorizontal: 30,
    lineHeight: 39,
    maxHeight: ScreenHeight / 2.0,
    fontSize: RFValue(28),
    color: 'rgba(255,255,255,0.92)',
    fontFamily: 'Montserrat-Bold',
    // marginBottom: 10,
  },
  buttonHolder: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
    height: 50,
    width: 100,
    backgroundColor: 'rgba(42, 98, 219, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  charLimit: {
    position: 'relative',
    right: 20,
    fontSize: RFValue(14),
    marginTop: 40,
    color: 'rgba(255, 255, 255, 0.38)',
    fontFamily: 'Montserrat-Regular',
  },
  buttonText: {
    fontSize: RFValue(26),
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  buttonTextSm: {
    fontSize: RFValue(16),
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
});