import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Options from './Options';

const Start = ({navigation}) => {
  const [showOptions, setShowOptions] = useState(false);
  const handlePress = () => {
    setShowOptions(true);
  };
  if (showOptions) {
    return (
      <View style={styles.container}>
        <Options navigation={navigation} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.author}>Author your story</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.start}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303B49',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  author: {
    color: 'white',
    fontSize: 28,
    textAlign: 'left',
    marginLeft: 34,
    fontFamily: 'Montserrat-Bold',
  },
  button: {
    position: 'absolute',
    height: 55,
    width: 180,
    borderRadius: 30,
    backgroundColor: '#6697EA',
    bottom: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  start: {
    color: 'white',
    fontSize: 24,
  },
});
