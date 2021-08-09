import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const CAUSES = [
  {
    id: 'amazing_things',
    text: 'Remember amazing things',
  },
  {
    text: 'Make better decisions',
    id: 'better_decisions',
  },
  {
    id: 'see_compassionate',
    text: 'See yourself compassionately',
  },
  {
    id: 'perspectives',
    text: 'Gain objective perspectives',
  },
  {
    id: 'love_writing',
    text: 'I just love to write',
  },
];

const Cause = ({goNext}) => {
  const [selectedCause, setSelectedCause] = useState(null);
  const handlePressCause = cause => {
    setSelectedCause(cause);
  };

  const handlePressContinue = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What do you want to achieve by writing your story?
      </Text>
      <View style={styles.buttonContainer}>
        {CAUSES.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePressCause(item.id)}
              style={styles.button}>
              <Text style={styles.cause}>{item.text}</Text>
              {item.id === selectedCause && (
                <Image
                  style={styles.checkmark}
                  source={require('../../../assets/check_mark.png')}
                />
              )}
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={[styles.button, styles.buttonCont]}
          onPress={goNext}>
          <Text style={[styles.cause, {fontFamily: 'Montserrat-Bold'}]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Cause;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303B49',
    paddingVertical: 30,
  },
  buttonContainer: {
    paddingTop: 20,
    marginLeft: 20,
  },
  checkmark: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    position: 'absolute',
    right: 12,
  },
  title: {
    marginTop: 100,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 25,
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
  },
  button: {
    height: 70,
    width: '94%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonCont: {
    backgroundColor: '#6697EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cause: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 10,
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
  },
});
