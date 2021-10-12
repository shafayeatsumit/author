import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {triggerHaptic} from '../../helpers/haptics';

const IntroStart = ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Create your story</Text>
    <TouchableOpacity
      onPress={() => {
        triggerHaptic();
        navigation.replace('Dedicate', {isEdit: false});
      }}
      style={styles.button}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </View>
);
export default IntroStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: RFValue(28),
    lineHeight: 39.2,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: -2,
    // marginLeft: 35,

    // marginLeft: -105,
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
