import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import PromptFooter from './PromptFooter';

const BlankPrompt = {
  id: 'blank_prompt_id',
  question: '',
  answer: '',
  type: 'blank',
  title: 'blank',
  time: 'all_time',
};
const Prompt = () => {
  const navigation = useNavigation();
  const goToNote = () => {
    navigation.navigate('Note', {prompt: BlankPrompt});
  };
  const handlePress = () => {
    goToNote();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={false}
      key={BlankPrompt.id}
      style={styles.itemPrompt}
      onPress={handlePress}>
      <View style={styles.clockHolder}>
        <Text style={styles.title}>Blank</Text>
      </View>

      <Text style={styles.text}>______</Text>
      <PromptFooter />
    </TouchableOpacity>
  );
};
export default Prompt;

const styles = StyleSheet.create({
  itemPrompt: {
    backgroundColor: 'transparent',
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
  },

  title: {
    fontSize: RFValue(18),
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  text: {
    fontSize: RFValue(30),
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});
