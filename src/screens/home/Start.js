import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {useUserStore} from '../../store';
const {height: ScreenHeight} = Dimensions.get('window');
import {dateFromNow} from '../../helpers/date';

const Start = () => {
  const {firstVisit} = useUserStore();
  console.log('first visit', firstVisit);
  const firstVisitDate = dateFromNow(firstVisit);
  return (
    <View>
      <View style={styles.lineStart} />
      <View style={styles.line} />
      <Text style={styles.text}>{firstVisitDate}</Text>
      <Text style={styles.started}>Started</Text>
    </View>
  );
};
export default Start;

const styles = StyleSheet.create({
  text: {
    paddingTop: 20,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    textAlign: 'center',
  },
  started: {
    fontSize: 45,
    fontFamily: 'georgia',
    color: '#65B354',
    textAlign: 'center',
  },
  lineStart: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderColor: '#81C174',
    alignSelf: 'center',
    borderWidth: 1,
  },
  line: {
    width: 1.5,
    alignSelf: 'center',
    backgroundColor: '#81C174',
    height: ScreenHeight / 8,
  },
});
