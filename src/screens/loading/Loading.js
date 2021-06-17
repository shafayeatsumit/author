import React, {useEffect, useState, useRef} from 'react';
import {View, Text, AppState, StyleSheet} from 'react-native';
import {useContentStore, useUserStore} from '../../store';
import {checkIfToday} from '../../helpers/date';

const Loading = ({navigation}) => {
  const appState = useRef(AppState.currentState);

  const {contents, initialize, moveFirst, moveFirstTwo} = useContentStore();
  const activeContent = contents[0];
  const {lastVisit, setLastVisit} = useUserStore();

  let contentsLenght = useRef(null);

  const loadContents = () => {
    if (!contentsLenght.current) {
      initialize();
    }
    navigation.navigate('Home');
  };

  useEffect(() => {
    contentsLenght.current = contents.length;
  }, [contents]);

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
    if (activeContent.pairId) {
      moveFirst();
    } else {
      moveFirstTwo();
    }
  };

  const checkVisitInfo = () => {
    if (lastVisit === null) {
      setLastVisit();
      return;
    }
    const isVisitedToday = checkIfToday(lastVisit);
    if (!isVisitedToday) {
      reorderContent();
      setLastVisit();
    }
  };

  useEffect(() => {
    // let the AsyncStorage hydrate zustand state;
    setTimeout(loadContents, 1000);
    AppState.addEventListener('change', _handleAppStateChange);
    checkVisitInfo();
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
