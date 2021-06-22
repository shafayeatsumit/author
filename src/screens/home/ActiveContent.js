import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../../components/Card';
import {useContentStore, useUserStore} from '../../store';
import {checkIfToday} from '../../helpers/date';
import analytics from '@react-native-firebase/analytics';

const ActiveContent = ({navigation}) => {
  const {contents} = useContentStore();
  const {lastSubmit} = useUserStore();
  const activeContent = contents[0];
  const isLocked = checkIfToday(lastSubmit) && activeContent.pairId === 0;

  const goNote = () => {
    navigation.navigate('Note', {content: activeContent});
    analytics().logEvent('tap', {
      q: `${activeContent.question}`,
    });
  };
  return (
    <View style={styles.container}>
      <Card
        isLocked={isLocked}
        title={activeContent.question}
        handlePress={goNote}
      />
    </View>
  );
};
export default ActiveContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
