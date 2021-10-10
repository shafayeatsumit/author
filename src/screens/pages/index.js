import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Modal,
  AppState,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useUserStore, useSubmissionStore} from '../../store';
import Page from './Page';

const Pages = ({navigation}) => {
  const {setLastVisit, finishedIntro} = useUserStore();
  const appState = useRef(AppState.currentState);
  const {submission, deleteSubmission} = useSubmissionStore();
  const flatlistRef = useRef();
  const renderPage = ({item, index}) => {
    return <Page prompt={item} />;
  };

  const keyExtractor = item => item.uid;

  const onEndReached = () => {
    console.log('reched end');
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setLastVisit();
        console.log('App has come to the foreground!');
      }
      appState.current = nextAppState;
    });
  }, []);

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

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.containerStyle}
        bounces={false}
        ref={flatlistRef}
        onEndReached={onEndReached}
        data={submission}
        renderItem={renderPage}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        inverted
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
    justifyContent: 'flex-end',
  },
});
