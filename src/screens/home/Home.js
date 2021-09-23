import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Modal,
  AppState,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useUserStore, useSubmissionStore} from '../../store';
import Page from './Page';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import RenderPromptList from './RenderPromptList';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
let renderCount = 0;

const Home = ({navigation}) => {
  const {setLastVisit, finishedIntro} = useUserStore();
  const loadingState = finishedIntro ? true : false;
  const appState = useRef(AppState.currentState);
  const [loading, setLoading] = useState(loadingState);
  const [showHeader, setShowHeader] = useState(true);
  const [pageScrolling, setPageScrolling] = useState(true);

  const [scrollIndex, setScrollIndex] = useState(0);
  const offset = useRef(0);
  const {submission, deleteSubmission} = useSubmissionStore();

  const numberOfintroPages = submission.filter(
    item => item.type === 'introFlow',
  ).length;

  const scrollViewRef = useRef();

  const scrollToEnd = () => {
    if (finishedIntro) {
      scrollViewRef.current.scrollToEnd({animated: true});
      submission.length && setScrollIndex(submission.length - 1);
      setTimeout(() => {
        loading && setLoading(false);
      }, 1000);
    }
  };

  const handleScrollEnd = event => {
    const currentIndex = Math.round(offset.current / ScreenWidth);
    if (scrollIndex !== currentIndex) {
      setScrollIndex(currentIndex);
    }
    !showHeader && setShowHeader(true);
  };

  const handleScroll = event => {
    let currentOffset = event.nativeEvent.contentOffset.x;
    const diff = currentOffset - offset.current;
    offset.current = currentOffset;
    if (diff > 2 && scrollIndex === submission.length - 1) {
      showHeader && setShowHeader(false);
    }
  };

  const handleFastForward = () => {
    scrollViewRef && scrollViewRef.current.scrollToEnd({animated: true});
  };

  const goToSecondPage = () => {
    scrollViewRef &&
      scrollViewRef.current.scrollToIndex({index: 1, animated: true});
  };

  const onEndReached = () => {
    loading && setLoading(false);
  };

  useEffect(() => {
    setTimeout(scrollToEnd, 500);
  }, []);

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

  const enablePageScroll = () => {
    if (!pageScrolling) {
      setPageScrolling(true);
    }
  };

  const disablePageScroll = () => {
    setPageScrolling(false);
  };

  const renderPage = ({item, index}) => {
    return (
      <Page
        goToSecondPage={goToSecondPage}
        prompt={item}
        navigation={navigation}
        enablePageScroll={enablePageScroll}
        disablePageScroll={disablePageScroll}
      />
    );
  };

  const keyExtractor = item => item.uid;

  const headerVisible =
    scrollIndex < submission.length &&
    showHeader &&
    scrollIndex > numberOfintroPages - 1;
  renderCount = renderCount + 1;
  console.log(`page scrolling ${pageScrolling}`);
  return (
    <LinearGradient colors={['#343D4C', '#131E25']} style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {}}>
        <View style={styles.loading} />
      </Modal>

      {headerVisible && (
        <PageHeader submission={submission} activeIndex={scrollIndex} />
      )}
      {headerVisible && (
        <PageFooter
          handleFastForward={handleFastForward}
          activeIndex={scrollIndex}
        />
      )}

      <FlatList
        ref={scrollViewRef}
        bounces={false}
        onEndReached={onEndReached}
        data={submission}
        scrollEnabled={pageScrolling}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={renderPage}
        keyExtractor={keyExtractor}
        pagingEnabled
        horizontal
        ListFooterComponent={<RenderPromptList scrollIndex={scrollIndex} />}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
      />
    </LinearGradient>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303B49',
  },

  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#303B49',
  },
  max: {
    height: ScreenHeight,
    width: ScreenWidth,
    backgroundColor: '#303B49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#303B49',
    height: ScreenHeight,
    width: ScreenWidth,
  },

  title: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    fontSize: 32,
    color: '#BBBFC2',
    textAlign: 'center',
    fontFamily: 'georgia',
    paddingTop: 30,
    paddingHorizontal: 30,
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
});
