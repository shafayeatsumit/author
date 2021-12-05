import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {useUserStore, useSubmissionStore} from '../../store';
import {formatDate} from '../../helpers/date';
import {triggerHaptic} from '../../helpers/haptics';
import analytics from '@react-native-firebase/analytics';
import _ from 'lodash';

const Page = ({prompt, scrollToContent}) => {
  const navigation = useNavigation();

  const adjustScrollPosition = () => {
    scrollToContent(prompt);
  };
  const handlePress = () => {
    navigation.navigate('Note', {
      prompt,
      isEdit: true,
      scrollToContent: adjustScrollPosition,
    });
    triggerHaptic();
    analytics().logEvent('button_push', {
      name: 'tap to edit',
    });
  };

  let dateString = prompt.date ? formatDate(prompt.date) : null;
  const promptAnswer = prompt.answer;
  const promptTitle = _.upperFirst(prompt.title);
  return (
    <TouchableOpacity
      delayPressIn={50}
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.titleHolder}>
        <Text style={styles.title}>{promptTitle}</Text>
        <Text style={styles.dateText}>{dateString}</Text>
      </View>
      <Text style={styles.answer}>{promptAnswer}</Text>
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    // minHeight: ScreenHeight / 3,
    marginVertical: 4,
    width: ScreenWidth,
    paddingHorizontal: 35,
    paddingVertical: 15,
  },
  intro: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'flex-end',
  },
  titleHolder: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'left',
    fontSize: RFValue(15),
    color: '#FFFFA6',
  },
  dateText: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'right',
    fontSize: RFValue(15),
    paddingBottom: 6,
    color: 'rgba(255,255,255,0.7)',
  },
  answer: {
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    // lineHeight: 44.8,
    letterSpacing: -2,
    paddingTop: 4,
    paddingBottom: 5,
  },
  divider: {
    height: 1,
    width: ScreenWidth * 0.8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
  },
  dedicattionPage: {
    height: ScreenHeight / 3,
    justifyContent: 'center',
    marginHorizontal: 30,
    // borderBottomWidth: 1,
    // borderColor: 'rgba(255,255,255,0.2)',
  },
});
