import React, {useEffect, useRef} from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
import {useUserStore, useSubmissionStore} from '../../store';

// AsyncStorage.clear();

const Loading = ({navigation}) => {
  const {finishedIntro, setLastVisit} = useUserStore();
  const {setIntroPages} = useSubmissionStore();
  const finishedIntroRef = useRef(null);

  const navigate = () => {
    if (finishedIntroRef.current) {
      navigation.replace('Home');
    } else {
      setIntroPages();
      navigation.replace('Start');
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
    backgroundColor: '#303B49',
  },
});
