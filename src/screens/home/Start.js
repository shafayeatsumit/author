import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useUserStore} from '../../store';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment';

const Start = () => {
  const {firstVisit} = useUserStore();
  console.log('first visit', firstVisit);
  const date = moment(firstVisit).format('MMMM DD, YYYY');
  const time = moment(firstVisit).format('h:mm a');

  return (
    <View>
      <Text style={styles.started}>Story starts</Text>
      <Text style={styles.text}>{date}</Text>
    </View>
  );
};
export default Start;

const styles = StyleSheet.create({
  text: {
    fontSize: RFValue(16),
    fontFamily: 'georgia',
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    // paddingVertical: 15,
    paddingTop: 10,
  },
  started: {
    fontSize: RFValue(28),
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    textAlign: 'center',
  },
});
