import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const Card = ({title, handlePress}) => (
  <TouchableOpacity style={styles.container} onPress={handlePress}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);
export default Card;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 1.1, height: 0.8},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '600',
  },
});
