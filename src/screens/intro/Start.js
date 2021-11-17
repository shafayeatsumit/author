import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useUserStore, usePromptStore} from '../../store';
import {RFValue} from 'react-native-responsive-fontsize';
import {triggerHaptic} from '../../helpers/haptics';
import analytics from '@react-native-firebase/analytics';
import uuid from 'react-native-uuid';

const IntroStart = ({navigation}) => {
  const {setFinishedIntro, setUserId} = useUserStore();
  const {initPrompts} = usePromptStore();
  const setIntro = () => {
    const userId = uuid.v4();
    initPrompts();

    setFinishedIntro();
    triggerHaptic();
    setUserId(userId);
    analytics().setUserId(userId);
    console.log('new user id set', userId);
    navigation.replace('Home');
    analytics().logEvent('button_push', {
      name: 'Get Started',
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compose</Text>
      <TouchableOpacity onPress={setIntro} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
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
    fontSize: RFValue(36),
    lineHeight: 39.2,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: -2,
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
