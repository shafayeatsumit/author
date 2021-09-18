import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const IntroStart = ({createFirstPage}) => (
  <TouchableOpacity onPress={createFirstPage} style={styles.container}>
    <Text style={styles.answer}>Create</Text>
  </TouchableOpacity>
);
export default IntroStart;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 200,
    backgroundColor: 'tomato',
    marginTop: 300,
  },
});
