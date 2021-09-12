import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Page = ({prompt}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Note', {prompt, isEdit: true});
  };
  const promptAnswer = prompt.answer;
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.questionContainer}>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={styles.answer}>{promptAnswer}</Text>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    height: ScreenHeight / 2,
    width: ScreenWidth - 64,
  },
  answer: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(28),
    lineHeight: 39.2,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: -2,
  },
});
