import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  AppState,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useUserStore, useSubmissionStore, usePromptStore} from '../../store';
import Page from './Page';
import PromptHeader from './PageHeader';
import DailyPrompt from '../../screens/prompts/DailyPrompt';
import analytics from '@react-native-firebase/analytics';
import {useSwipe} from '../../helpers/swipeGesture';

import {checkIfToday} from '../../helpers/date';
import _ from 'lodash';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Pages = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [prompt, setPrompt] = useState({id: null, question: null});
  const {lastVisit, setLastVisit, finishedIntro} = useUserStore();
  const appState = useRef(AppState.currentState);
  const {submission, deleteSubmission} = useSubmissionStore();
  const flatlistRef = useRef();

  const onSwipeUp = () => {
    analytics().logEvent('scrollingup');
  };

  const onSwipeDown = () => {
    analytics().logEvent('scrollingdown');
  };

  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeUp, onSwipeDown, 8);
  const renderPage = ({item, index}) => {
    if (item.uid) {
      return <Page prompt={item} scrollToContent={scrollToContent} />;
    }
    return <DailyPrompt item={item} />;
  };

  const keyExtractor = item => (item.uid ? item.uid : item.id);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    analytics().logEvent('refresh', {
      name: prompt.id,
    });
    setRefreshing(true);

    wait(500).then(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setLastVisit();
        console.log('App has come to the foreground!');
        analytics().logEvent('app_foregrounded');
      }
      if (nextAppState === 'background') {
        analytics().logEvent('app_backgrounded');
      }

      appState.current = nextAppState;
    });
  }, []);

  const scrollToIndexZero = () => {
    flatlistRef.current &&
      flatlistRef.current.scrollToIndex({animated: false, index: 0});
  };

  const submissionReverse = [...submission].reverse();
  const submissionDateAdjusted = submissionReverse.map((item, index) => {
    const previousValue = submissionReverse[index + 1];
    if (previousValue && previousValue.day === item.day) {
      return {...item, date: null};
    }
    return item;
  });

  const data = [prompt, ...submissionDateAdjusted];

  const scrollToContent = activePrompt => {
    const index = data.findIndex(item => item.id === activePrompt.id);
    flatlistRef.current &&
      flatlistRef.current.scrollToIndex({animated: false, index});
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.containerStyle}
        ref={flatlistRef}
        data={data}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        renderItem={renderPage}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        inverted
        refreshControl={
          <RefreshControl
            tintColor={'white'}
            colors={['black', 'white']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};
export default Pages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerStyle: {
    flexGrow: 1,
    paddingBottom: 35,
  },
});
