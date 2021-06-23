import React from 'react';
import {TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';
const {height: ScreenHeight} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';

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
    // height:,
    minHeight: 200,
    paddingVertical: 35,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(101, 179, 84, 0.25)',
    shadowOffset: {width: 1, height: 5},

    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 25,
    // marginVertical: 20,
  },
  title: {
    fontSize: RFValue(26),
    fontFamily: 'georgia',
    textAlign: 'left',
    color: 'rgba(0,0,0,0.7)',
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
