import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Cause from './Cause';
import NotificationSettings from './Notification';
import Swiper from 'react-native-swiper';
import {useUserStore} from '../../store';

const Options = ({navigation}) => {
  const {setFinishedIntro} = useUserStore();
  const scrollRef = useRef(null);
  const goHome = () => {
    setFinishedIntro();
    navigation.replace('Home');
  };

  const goToNotificationSettings = () => {
    scrollRef.current.scrollBy(1, true);
  };

  return (
    <Swiper
      ref={scrollRef}
      scrollEnabled={false}
      style={styles.container}
      showsButtons={false}>
      <Cause goNext={goToNotificationSettings} />
      <NotificationSettings goHome={goHome} />
    </Swiper>
  );
};
export default Options;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
