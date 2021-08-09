import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const NOTIFICATIONS = [
  {
    id: 'morning',
    text: 'In the morning',
  },
  {
    text: 'Around lunch time',
    id: 'lunch',
  },
  {
    id: 'after_work',
    text: 'After work',
  },
  {
    id: 'before_bed',
    text: 'Before bed',
  },
  {
    id: 'all_day',
    text: 'I just love to write (so all day)',
  },
];

const Notifications = ({goHome}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const handlePressTime = time => {
    setSelectedTime(time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>When are you creative?</Text>
      <View style={styles.buttonContainer}>
        {NOTIFICATIONS.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePressTime(item.id)}
              style={styles.button}>
              <Text style={styles.cause}>{item.text}</Text>
              {item.id === selectedTime && (
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
          onPress={goHome}>
          <Text style={[styles.cause, {fontFamily: 'Montserrat-Bold'}]}>
            Set notifications
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Notifications;

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
