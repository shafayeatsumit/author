import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Card = ({title, isLocked, handlePress}) => (
  <TouchableOpacity
    disabled={isLocked}
    style={styles.container}
    onPress={handlePress}>
    {isLocked && <Text style={styles.unlock}>Unlocked in 12 hrs</Text>}
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
    shadowOffset: {width: 0.3, height: 0.5},

    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 25,
    // marginVertical: 20,
  },
  title: {
    fontSize: 25,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '600',
  },
  unlock: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    fontSize: 12,
    textAlign: 'center',
    color: '#65B354',
  },
});
