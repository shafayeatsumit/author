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
import {getAnswerStyle} from '../../helpers/styling';
import LinearGradient from 'react-native-linear-gradient';

const Note = ({navigation, route}) => {
  const {setLastSubmit} = useUserStore();
  const {setSubmission, updateSubmission} = useSubmissionStore();
  const {moveFirst} = useContentStore();
  const inputRef = useRef();
  const {content, isEdit} = route.params;
  const defaultText = content.answer ? content.answer : '';
  const [text, onChangeText] = React.useState(defaultText);
  const charMaxLength = 35;
  const logEvent = eventType => {
    analytics().logEvent(eventType, {
      q: `${content.question}`,
      a: `${text}`,
    });
  };
  const fontType = getAnswerStyle(content.type, content.isExtra);
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
      isExtra: content.pairId ? true : false,
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
    // TODO: change this later
    moveFirst();
  };

  const handleEdit = () => {
    editAnswer();
    goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableOpacity style={styles.xout} onPress={goBack}>
        <Image source={require('../../../assets/xout.png')} />
      </TouchableOpacity>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{content.question}</Text>
      </View>
      <TextInput
        multiline
        onSubmitEditing={handleSubmit}
        style={[styles.input, fontType]}
        onChangeText={onChangeText}
        value={text}
        spellCheck={false}
        textAlignVertical="top"
        maxLength={35}
        ref={inputRef}
      />
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
  },
  questionContainer: {
    padding: 30,
    paddingTop: 20,
    paddingBottom: 15,
    marginTop: 90,
  },
  question: {
    fontFamily: 'georgia',
    fontSize: RFValue(23),
    color: 'rgba(0,0,0,0.7)',
  },
  input: {
    height: ScreenHeight / 4,
    paddingHorizontal: 5,
    width: '85%',
    alignSelf: 'center',
    // margin: 12,
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
    backgroundColor: '#65B354',
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
