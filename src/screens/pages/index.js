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
  const [refreshing, setRefreshing] = React.useState(false);

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

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    setRefreshing(true);
    pullRandomPrompts();
    wait(500).then(() => {
      setRefreshing(false);
    });
  };

  const pullOneRandomPrompt = () => {
    pullRandomPrompts();
    setTimeout(scrollToIndexZero, 300);
  };

  useEffect(() => {
    pullRandomPrompts();
    setLastVisit();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // const notServedToday = !checkIfToday(lastVisit);
        // notServedToday && pullRandomPrompts();
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

  const handleScrollEnd = () => {
    analytics().logEvent('scrolling');
  };

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
        renderItem={renderPage}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
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
  },
});
