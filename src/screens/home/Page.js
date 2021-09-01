import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import {RFValue} from 'react-native-responsive-fontsize';
import {sharedStart} from '../../helpers/utils';
import {useSubmissionStore} from '../../store';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Page = ({totalLength, handleFastForward, index, prompt, navigation}) => {
  const {deleteSubmission} = useSubmissionStore();
  const handlePress = () => {
    navigation.navigate('Note', {prompt, isEdit: true});
  };
  const question = prompt.question.replace('______', '');
  const promptAnswer = prompt.answer;
  const sharedInputValue = sharedStart([question, promptAnswer]);
  const unsharedInputValue = promptAnswer.replace(sharedInputValue, '');
  const handleDelete = () => {
    console.log('delete', prompt.uid);
    deleteSubmission(prompt.uid);
  };
  const capitalizedTitle = _.upperFirst(prompt.type);
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.titleText}>{capitalizedTitle}</Text>
        <Text style={styles.question}>
          {sharedInputValue}
          <Text style={[styles.question, styles.answer]}>
            {unsharedInputValue}
          </Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleDelete} style={styles.footerBtn}>
          <Text style={styles.footerText}>Delete</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          {index + 1}/{totalLength}
        </Text>
        <TouchableOpacity style={styles.footerBtn} onPress={handleFastForward}>
          <Text style={styles.footerText}>FastForward</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
  },
  spacer: {
    height: ScreenHeight / 14,
  },
  title: {
    paddingTop: 15,
    fontSize: 35,
    textAlign: 'left',
    paddingLeft: 30,
    fontFamily: 'Montserrat-Bold',
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: RFValue(16),
    paddingBottom: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(23),
    // color: 'rgba(255,255,255,0.7)',
    paddingBottom: 10,
    color: 'white',
  },
  questionContainer: {
    paddingHorizontal: 30,
    paddingBottom: 15,
  },
  question: {
    fontFamily: 'georgia',
    fontSize: RFValue(19),
    color: 'rgba(255,255,255,0.6)',
    paddingTop: 20,
  },
  answer: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(22),
    color: 'rgba(255,255,255,1)',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  footerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'white',
    // padding: 20,
  },
  footerBtn: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
});
