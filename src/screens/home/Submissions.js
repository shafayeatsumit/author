import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSubmissionStore} from '../../store';
import NoteCard from '../../components/NoteCard';

const Submissions = () => {
  const {submission} = useSubmissionStore();
  const renderItem = ({item}) => {
    return <NoteCard content={item} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={submission}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
    </View>
  );
};
export default Submissions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
