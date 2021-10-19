import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  AppState,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useUserStore, useSubmissionStore} from '../../store';
import Page from './Page';
import PromptHeader from './PageHeader';
import DailyPrompt from '../../screens/prompts/DailyPrompt';
import analytics from '@react-native-firebase/analytics';
import {ContentTitles} from '../../helpers/contentsData';
import {checkIfToday} from '../../helpers/date';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Pages = ({navigation}) => {
  const {setLastVisit, finishedIntro} = useUserStore();
  const appState = useRef(AppState.currentState);
  const {submission, deleteSubmission} = useSubmissionStore();
  const flatlistRef = useRef();

  const answeredToday = submission
    .filter(item => item.type === 'daily' && checkIfToday(item.date))
    .map(item => item.title);

  const prompts = ContentTitles.filter(
    item => !answeredToday.includes(item.title),
  );

  const renderPage = ({item, index}) => {
    if (item.uid) {
      return <Page prompt={item} />;
    }

    return <DailyPrompt item={item} />;
  };

  const keyExtractor = item => (item.uid ? item.uid : item.id);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
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

  const scrollToTop = () => {
    flatlistRef.current && flatlistRef.current.scrollToEnd({animated: true});
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scrollToTop();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const submissionReverse = [...submission].reverse();
  const data = [...prompts, ...submissionReverse];

  return (
    <View style={styles.container}>
      <PromptHeader />
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
    // justifyContent: 'flex-end',
    paddingBottom: ScreenHeight / 10,
  },
});
