import React, {useRef, useState, useEffect} from 'react';
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
import {useHeaderHeight} from '@react-navigation/stack';
import {useSubmissionStore} from '../../store';
import {triggerHaptic} from '../../helpers/haptics';
import {sharedStart} from '../../helpers/utils';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const {height: ScreenHeight} = Dimensions.get('window');
TextInput.defaultProps.selectionColor = 'white';

const IntroNote = () => {
  const navigation = useNavigation();
  const MonthName = moment().format('MMMM');
  const {updateSubmission, setTitle, title} = useSubmissionStore();
  const promptQuestion = `If the rest of ${MonthName} was a chapter in the story of my life, I’d title it`;
  const promptAnswer = title ? ' ' + title : ' ';
  const defaultText = promptQuestion + promptAnswer;
  const inputRef = useRef();
  const [text, onChangeText] = React.useState(defaultText);

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
    triggerHaptic();
    // handleClose();
    navigation.navigate('Home');
  };

  const handleKeyPress = ({nativeEvent}) => {
    const disable = nativeEvent.key === 'Backspace';
    if (disable) {
      console.log('backspace');
    }
  };

  const sharedInputValue = sharedStart([promptQuestion, text]);
  const unsharedInputValue = text.replace(sharedInputValue, '');
  const inputValue = promptQuestion + unsharedInputValue;
  const buttonDisabled = !unsharedInputValue.trim();

  const handleAdd = () => {
    setTitle(unsharedInputValue);
    navigation.navigate('Home');
    triggerHaptic();
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
      <View style={styles.container}>
        <TouchableOpacity onPress={skip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
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
        </View>
        <View style={styles.buttonHolder}>
          <Text style={styles.charLimit}>{charLength}/20</Text>

          <TouchableOpacity
            onPress={handleAdd}
            style={[styles.button, buttonDisabled && styles.disableButton]}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default IntroNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  disableButton: {
    backgroundColor: '#1E4686',
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
  },
  skipText: {
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.38)',
    lineHeight: 22,
    fontFamily: 'Montserrat-Regular',
  },
  inputContainer: {
    height: ScreenHeight / 3.0,
    marginTop: 100,
  },
  input: {
    flex: 1,
    letterSpacing: -1,
    borderWidth: 0,
    paddingHorizontal: 25,
    lineHeight: 41.6,
    fontSize: RFValue(30),
    color: 'rgba(255,255,255,0.92)',
    fontFamily: 'Montserrat-Regular',
  },
  buttonHolder: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    ...Platform.select({
      ios: {
        paddingBottom: 15,
      },
      android: {
        paddingBottom: 50,
      },
    }),
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
    height: 50,
    width: 100,
    backgroundColor: '#0D60D6',
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
    fontSize: RFValue(13.5),
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
});
