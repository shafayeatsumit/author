import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../../components/Card';
import {useContentStore, useSubmissionStore, useUserStore} from '../../store';
import {checkIfToday, formatDate} from '../../helpers/date';
import analytics from '@react-native-firebase/analytics';

const ActiveContent = ({navigation}) => {
  const {contents} = useContentStore();
  const {lastSubmit} = useUserStore();
  const {submission} = useSubmissionStore();
  const isLastSubmitToday = checkIfToday(lastSubmit);
  const activeContent = isLastSubmitToday ? submission[0] : contents[0];

  const dateString = formatDate(activeContent.date, activeContent.type);
  console.log('dateString', dateString);
  const title = isLastSubmitToday
    ? activeContent.answer
    : activeContent.question;
  const goNote = () => {
    navigation.navigate('Note', {content: activeContent});
    analytics().logEvent('tap', {
      q: `${activeContent.question}`,
    });
  };
  return (
    <View style={styles.container}>
      <Card date={dateString} title={title} handlePress={goNote} />
    </View>
  );
};
export default ActiveContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
