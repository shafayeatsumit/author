import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {checkIfMorningTime} from '../../helpers/date';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Prompt = ({item, navigation}) => {
  const isMorningTime = checkIfMorningTime();
  const disableNote = isMorningTime && item.time === 'evening';
  const goToNote = () => {
    navigation.navigate('Note', {content: item});
  };

  const askAlert = () => {
    Alert.alert(
      'Wait',
      'Some of these prompts are meant for later in your day',
      [
        {
          text: 'answer now',
          onPress: goToNote,
          style: 'cancel',
        },
        {text: 'Got it', onPress: () => console.log('OK Pressed')},
      ],
    );
  };

  const handlePress = () => {
    disableNote ? askAlert() : goToNote();
  };

  const contentQuestion = disableNote
    ? item.question.replace('______', '')
    : item.question;

  return (
    <TouchableOpacity
      activeOpacity={1}
      key={item.id}
      style={styles.itemPrompt}
      onPress={handlePress}>
      <View style={styles.clockHolder}>
        <Text style={styles.title}>{item.type}</Text>
        {disableNote && (
          <Image
            style={styles.clock}
            source={require('../../../assets/clock.png')}
          />
        )}
      </View>
      <Text style={styles.text}>{contentQuestion}</Text>
    </TouchableOpacity>
  );
};
export default Prompt;

const styles = StyleSheet.create({
  itemPrompt: {
    backgroundColor: '#303B49',
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
  },
  clockHolder: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  clock: {
    marginLeft: 5,
    height: 14,
    width: 14,
  },
  title: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    fontSize: 32,
    color: '#BBBFC2',
    textAlign: 'center',
    fontFamily: 'georgia',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});
