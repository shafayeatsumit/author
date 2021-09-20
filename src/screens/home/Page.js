import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import IntroDedicate from './IntroDedicate';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useUserStore, useSubmissionStore} from '../../store';
import IntroStart from './IntroStart';
import IntroTitle from './IntroTitle';

const Page = ({
  prompt,
  goToSecondPage,
  enablePageScroll,
  disablePageScroll,
}) => {
  const navigation = useNavigation();
  const {deleteSubmission} = useSubmissionStore();
  const handlePress = () => {
    navigation.navigate('Note', {prompt, isEdit: true});
  };

  const createFirstPage = () => {
    goToSecondPage();
  };

  const promptAnswer = prompt.answer;
  const introStart = prompt.id === 'intro_start';
  const introTitle = prompt.id === 'intro_title';
  const introDedicate = prompt.id === 'intro_dedicate';
  const regularPage = prompt.type !== 'introFlow';
  const disablePageTouch = introStart;
  if (introDedicate) {
    return (
      <IntroDedicate
        enablePageScroll={enablePageScroll}
        disablePageScroll={disablePageScroll}
      />
    );
  }
  if (introTitle) {
    return (
      <IntroTitle
        enablePageScroll={enablePageScroll}
        disablePageScroll={disablePageScroll}
      />
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disablePageTouch}
      activeOpacity={1}
      style={styles.container}>
      {regularPage && (
        <View style={styles.questionContainer}>
          <ScrollView nestedScrollEnabled={true}>
            <Text style={styles.answer}>{promptAnswer}</Text>
          </ScrollView>
        </View>
      )}
      {introStart && <IntroStart createFirstPage={createFirstPage} />}
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    height: ScreenHeight / 2,
    width: ScreenWidth - 64,
  },
  answer: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(28),
    lineHeight: 39.2,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: -2,
  },
});
