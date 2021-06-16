import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../../components/Card';
import {useContentStore} from '../../store';

const ActiveContent = ({navigation}) => {
  const {contents} = useContentStore();
  const activeContent = contents[0];
  const goNote = () => {
    navigation.navigate('Note', {content: activeContent});
  };
  return (
    <View style={styles.container}>
      <Card title={activeContent.text} handlePress={goNote} />
    </View>
  );
};
export default ActiveContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
