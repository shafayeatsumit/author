import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../../components/Card';
import {useContentStore, useSubmissionStore, useUserStore} from '../../store';
import {checkIfToday, formatDate} from '../../helpers/date';
import analytics from '@react-native-firebase/analytics';
import PushNotification from 'react-native-push-notification';

const ActiveContent = ({navigation}) => {
  const {contents} = useContentStore();
  const {lastSubmit} = useUserStore();
  const {submission} = useSubmissionStore();
  const isLastSubmitToday = checkIfToday(lastSubmit);
  // TODO:
  // const activeContent = isLastSubmitToday ? submission[0] : contents[0];
  const activeContent = contents[0];

  const dateString = formatDate(activeContent.date, activeContent.type);
  console.log('dateString', dateString);
  //TODO:
  // const title = isLastSubmitToday
  //   ? activeContent.answer
  //   : activeContent.question;

  const title = activeContent.question;

  const goNote = () => {
    navigation.navigate('Note', {content: activeContent});
    analytics().logEvent('tap', {
      q: `${activeContent.question}`,
    });
  };

  // useEffect(() => {
  //   PushNotification.localNotification({
  //     channelId: 'channel-id',
  //     title: 'My Notification Title', // (optional)
  //     message: 'My Notification Message', // (required)
  //   });
  // }, []);

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
