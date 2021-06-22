import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSubmissionStore} from '../../store';
import NoteCard from '../../components/NoteCard';

const Submissions = ({navigation}) => {
  const {submission} = useSubmissionStore();

  const goNote = content => {
    navigation.navigate('Note', {content, isEdit: true});
  };

  const renderItem = ({item}) => {
    return <NoteCard content={item} handlePress={() => goNote(item)} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={submission}
        contentContainerStyle={styles.flatlist}
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
  flatlist: {
    paddingBottom: 20,
  },
});
