import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Platform,
  Text,
  StyleSheet,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const {height: ScreenHeight, width: ScreenWidth} = Dimensions.get('window');

const Card = ({title, date, handlePress}) => (
  <TouchableOpacity style={styles.container} onPress={handlePress}>
    <Text style={styles.dateText}>{date}</Text>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);
export default Card;

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    marginTop: -30,
  },
  dateText: {
    fontSize: RFValue(18),
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,0.5)',
    paddingVertical: 30,
  },
  title: {
    fontSize: RFValue(35),
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
