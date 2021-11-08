import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useUserStore, useSubmissionStore, usePromptStore} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import analytics from '@react-native-firebase/analytics';

// AsyncStorage.clear();

const Loading = ({navigation}) => {
  const {finishedIntro, setFinishedIntro, setLastVisit, setUserId, id} =
    useUserStore();

  const {initPrompts} = usePromptStore();
  const finishedIntroRef = useRef(null);

  const navigate = () => {
    if (finishedIntroRef.current) {
      navigation.replace('Home');
      analytics().setUserId(id);
      console.log('user id first time', id);
    } else {
      const userId = uuid.v4();
      initPrompts();
      setFinishedIntro();

      if (!id) {
        setUserId(userId);
        console.log('user id first time', userId);
        analytics().setUserId(userId);
      }
      navigation.replace('Home');
    }
  };

  useEffect(() => {
    finishedIntroRef.current = finishedIntro;
  }, [finishedIntro]);

  useEffect(() => {
    setLastVisit();
    setTimeout(navigate, 500);
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
