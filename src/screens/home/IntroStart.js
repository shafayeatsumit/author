import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const IntroStart = ({createFirstPage}) => (
  <View style={styles.container}>
    <Text style={styles.title}>It’s your story</Text>
    <TouchableOpacity onPress={createFirstPage} style={styles.button}>
      <Text style={styles.buttonText}>Create</Text>
    </TouchableOpacity>
  </View>
);
export default IntroStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left',
    fontSize: RFValue(28),
    lineHeight: 39.2,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: -2,
    marginLeft: -105,
    // paddingLeft: 48,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: RFValue(28),
    lineHeight: 39.2,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: -2,
  },
  button: {
    position: 'absolute',
    bottom: 84,
    alignSelf: 'center',
    height: 52,
    width: 300,
    backgroundColor: '#2A62DB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
