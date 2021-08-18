import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useUserStore, useContentStore, useSubmissionStore} from '../../store';
import InfiniteScroll from 'react-native-infinite-looping-scroll';
import {checkIfToday} from '../../helpers/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import PushNotification from 'react-native-push-notification';
import Page from './Page';
import Prompt from './Prompt';
import PageHeader from './PageHeader';
import PageRenderer from './PageRenderer';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {contents, lastInitialized, initialize} = useContentStore();
  const [scrollIndex, setScrollIndex] = useState(0);
  const offset = useRef(0);
  // const {submission} = useSubmissionStore();
  const submission = [
    {
      answer: 'The best supporting actor or actoress in my story today was kik',
      date: '2021-08-16T18:00:00.000Z',
      id: 'ev_5',
      question:
        'The best supporting actor or actoress in my story today was ______',
      type: 'Sidekick',
      uid: 'c7548598-4c7a-4184-8fda-9af98cc3ca5b',
    },

    {
      answer: "Something I'll always want to remember is jikam",
      date: '2021-08-16T18:00:00.000Z',
      id: 'ev_3',
      question: "Something I'll always want to remember is ______",
      type: 'Keepsake',
      uid: '919ee223-1412-432c-a7a0-0774d4f517c6',
    },

    {
      answer: "Something I'll always want to remember is jikam",
      date: '2021-08-15T18:00:00.000Z',
      id: 'ev_3',
      question: "Something I'll always want to remember is ______",
      type: 'Keepsake',
      uid: '919ee223-1412-432c-a7a0-6774d4f517c6',
    },

    {
      answer: "Something I'll always want to remember is jikam",
      date: '2021-08-15T18:00:00.000Z',
      id: 'ev_3',
      question: "Something I'll always want to remember is ______",
      type: 'Keepsake',
      uid: '919ee223-1412-432c-a7a0-6664d4f517c6',
    },

    {
      answer: "Something I'll always want to remember is jikam",
      date: '2021-08-15T18:00:00.000Z',
      id: 'ev_3',
      question: "Something I'll always want to remember is ______",
      type: 'Keepsake',
      uid: '919ee223-1412-432c-a7a0-6884d4f517c6',
    },
  ];

  const scrollViewRef = useRef();
  const isInitializedToday = checkIfToday(lastInitialized);
  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd();
    setTimeout(() => {
      loading && setLoading(false);
    }, 1000);
  };

  const handleScrollEnd = event => {
    const currentIndex = Math.round(offset.current / ScreenWidth);
    setScrollIndex(currentIndex);
  };

  const handleScroll = event => {
    let currentOffset = event.nativeEvent.contentOffset.x;
    offset.current = currentOffset;
  };

  useEffect(() => {
    if (!isInitializedToday) {
      initialize();
    }
    setTimeout(scrollToEnd, 200);
  }, []);

  const RenderPromtList = () => {
    if (!contents.length) {
      return (
        <View style={styles.max}>
          <Text style={styles.text}>Max Limit</Text>
        </View>
      );
    }
    return (
      <Swiper
        loop={true}
        pagingEnabled
        snapToInterval={ScreenHeight}
        decelerationRate="fast"
        removeClippedSubviews={false}
        showsPagination={false}
        horizontal={false}
        style={styles.wrapper}
        showsButtons={false}>
        {contents.map(item => (
          <Prompt key={item} navigation={navigation} item={item} />
        ))}
      </Swiper>
    );
  };

  const renderPage = ({item}) => {
    return <Page content={item} navigation={navigation} />;
  };

  const showHeader = scrollIndex < submission.length;
  return (
    <View style={styles.container}>
      {showHeader && (
        <PageHeader submission={submission} activeIndex={scrollIndex} />
      )}

      <FlatList
        ref={scrollViewRef}
        data={submission}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={renderPage}
        keyExtractor={item => item.uid}
        pagingEnabled
        horizontal
        ListFooterComponent={RenderPromtList}
        showsHorizontalScrollIndicator={false}
      />
      {loading && <View style={styles.loading} />}
    </View>
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
