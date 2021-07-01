import React, {useEffect, useRef} from 'react';
import {View, Text, AppState, StyleSheet} from 'react-native';
import {useContentStore, useUserStore} from '../../store';
import {checkIfToday} from '../../helpers/date';
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.clear();

const Loading = ({navigation}) => {
  const appState = useRef(AppState.currentState);

  const {contents, initialize, moveFirst, moveFirstTwo} = useContentStore();

  const {lastVisit, setLastVisit, setFirstVisit} = useUserStore();

  let contentsRef = useRef(null);
  let lastVisitRef = useRef(null);

  const loadContents = () => {
    if (!contentsRef.current.length) {
      initialize();
      setFirstVisit();
    }
    navigation.navigate('Home');
  };

  useEffect(() => {
    contentsRef.current = contents;
  }, [contents]);

  useEffect(() => {
    lastVisitRef.current = lastVisit;
  }, [lastVisit]);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // app foregrounded;
      checkVisitInfo();
    }

    appState.current = nextAppState;
  };

  const reorderContent = () => {
    moveFirst();
  };

  const checkVisitInfo = () => {
    const lastVisitDate = lastVisitRef.current;
    if (lastVisitDate === null) {
      setLastVisit();
      return;
    }

    const isVisitedToday = checkIfToday(lastVisitDate);
    if (!isVisitedToday) {
      reorderContent();
      setLastVisit();
    }
  };

  const startApp = () => {
    loadContents();
    checkVisitInfo();
  };

  useEffect(() => {
    // let the AsyncStorage hydrate zustand state;
    setTimeout(startApp, 1000);
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading </Text>
    </View>
  );
};
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
