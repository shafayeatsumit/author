import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useUserStore} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import analytics from '@react-native-firebase/analytics';

// AsyncStorage.clear();

const Loading = ({navigation}) => {
  const {finishedIntro, setLastVisit, id} = useUserStore();
  const finishedIntroRef = useRef(null);
  const userIdRef = useRef(null);
  const navigate = () => {
    if (!finishedIntroRef.current) {
      navigation.replace('Intro');
      analytics().setUserId(userIdRef.current);
    } else {
      navigation.replace('Home');
    }
  };

  useEffect(() => {
    finishedIntroRef.current = finishedIntro;
  }, [finishedIntro]);

  useEffect(() => {
    userIdRef.current = id;
  }, [id]);

  useEffect(() => {
    setLastVisit();
    setTimeout(navigate, 1000);
  }, []);

  return <View style={styles.container} />;
};
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
