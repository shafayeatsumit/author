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

import {checkIfToday} from '../../helpers/date';
import _ from 'lodash';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Pages = ({navigation}) => {
  const [prompt, setPrompt] = useState({id: null, question: null});
  const {lastVisit, setLastVisit, finishedIntro} = useUserStore();
  const {allPrompts, updatePrompts} = usePromptStore();
  const appState = useRef(AppState.currentState);
  const {submission, deleteSubmission} = useSubmissionStore();
  const flatlistRef = useRef();

  const renderPage = ({item, index}) => {
    if (item.uid) {
      return <Page prompt={item} scrollToContent={scrollToContent} />;
    }
    return <DailyPrompt item={item} updateContent={pullOneRandomPrompt} />;
  };

  const keyExtractor = item => (item.uid ? item.uid : item.id);

  const pullRandomPrompts = () => {
    const newPrompt = allPrompts[0];

    setPrompt(newPrompt);
    updatePrompts();
  };

  const pullOneRandomPrompt = () => {
    pullRandomPrompts();
    console.log('pulling one random');
    setTimeout(scrollToMiddle, 300);
  };

  useEffect(() => {
    pullRandomPrompts();
    setLastVisit();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const notServedToday = !checkIfToday(lastVisit);
        notServedToday && pullRandomPrompts();
        setLastVisit();
        console.log('App has come to the foreground!');
        analytics().logEvent('app_foreground');
      }
      appState.current = nextAppState;
    });
  }, []);

  const handleScrollEnd = () => {
    analytics().logEvent('scrolling');
  };

  const scrollToMiddle = () => {
    flatlistRef.current &&
      flatlistRef.current.scrollToIndex({animated: false, index: 0});
  };

  const scrollToTop = () => {
    flatlistRef.current &&
      flatlistRef.current.scrollToIndex({animated: false, index: 0});
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scrollToTop();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const submissionReverse = [...submission].reverse();
  const submissionDateAdjusted = submissionReverse.map((item, index) => {
    const previousValue = submissionReverse[index - 1];
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
        renderItem={renderPage}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
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
    paddingTop: 50,
    // justifyContent: 'flex-end',
    paddingBottom: ScreenHeight / 10,
  },
});
