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
});
