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
  const [loading, setLoading] = React.useState(false);
  const [instructionVisible, setInstructionVisible] = React.useState(true);
  const [prompt, setPrompt] = useState({id: null, question: null});
  const {lastVisit, setLastVisit, finishedIntro} = useUserStore();
  const {allPrompts, updatePrompts} = usePromptStore();
  const appState = useRef(AppState.currentState);
  const {submission, deleteSubmission} = useSubmissionStore();
  const flatlistRef = useRef();

  const finishNoteTaking = () => {
    pullOneRandomPrompt();
    if (prompt.id === 'intro_prompt') {
      setLoading(true);
      setTimeout(() => {
        flatlistRef.current.scrollToEnd({animated: false});
        setLoading(false);
      }, 400);
    }
  };

  const renderPage = ({item, index}) => {
    if (item.uid) {
      return (
        <Page
          instructionVisible={instructionVisible}
          prompt={item}
          scrollToContent={scrollToContent}
        />
      );
    }
    return <DailyPrompt item={item} updateContent={finishNoteTaking} />;
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
    analytics().logEvent('refresh', {
      name: prompt.id,
    });
    if (prompt.id === 'instruction') {
      setInstructionVisible(false);
    }
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
  const isFirstPrompt = prompt.id === 'intro_prompt';

  return (
    <View style={styles.container}>
      {loading && <View style={styles.loading} />}
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
          isFirstPrompt ? null : (
            <RefreshControl
              tintColor={'white'}
              colors={['black', 'white']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )
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
  loading: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    height: ScreenHeight,
    width: ScreenWidth,
    backgroundColor: 'black',
    zIndex: 5,
  },
});
