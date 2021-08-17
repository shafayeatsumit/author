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
  const [scrollEndCount, setScrollEndCount] = useState(0);
  const [activeContent, setActiveContent] = useState({});
  const {contents, lastInitialized, initialize} = useContentStore();
  const [scrollIndex, setScrollIndex] = useState(0);
  const offset = useRef(0);

  // const {submission} = useSubmissionStore();
  const submission = [
    {
      answer:
        'The best supporting actor or actoress in my story today was jilll',
      date: '2021-08-13T18:00:00.000Z',
      id: 'ev_5',
      question:
        'The best supporting actor or actoress in my story today was ______',
      type: 'Sidekick',
      uid: '5828d3ac-4f01-46b3-9e5e-1dbddd9dec5e',
    },

    {
      answer: 'My advice for myself tomorrow is fresh',
      date: '2021-08-13T18:00:00.000Z',
      id: 'ev_7',
      question: 'My advice for myself tomorrow is ______',
      type: 'Foreshadow',
      uid: '0e06d037-5cbf-4589-b453-12425b10a04d',
    },

    {
      answer: 'My advice for myself tomorrow is tomorrow non chill',
      date: '2021-08-12T18:00:00.000Z',
      id: 'ev_7',
      question: 'My advice for myself tomorrow is ______',
      type: 'Foreshadow',
      uid: '0e06d037-5cbf-4589-b453-12425b10a04c',
    },

    {
      answer: 'Something that went well was yes thats right',
      date: '2021-08-12T18:00:00.000Z',
      id: 'ev_7',
      question: 'Something that went well was ______',
      type: 'Foreshadow',
      uid: '0e06d037-5cgf-4589-b453-12429b10a04c',
    },

    {
      answer: 'My advice for myself tomorrow is',
      date: '2021-08-12T18:00:00.000Z',
      id: 'ev_7',
      question: 'My advice for myself tomorrow is ______',
      type: 'Farm fresh',
      uid: '0e10d037-5cgf-4589-b453-12429b10a14c',
    },

    {
      answer: 'The thing that is within my power to control today is powerful',
      date: '2021-08-11T18:00:00.000Z',
      id: 'ev_7',
      question: 'The thing that is within my power to control today is ______',
      type: 'powerful',
      uid: '0e10d037-5cgf-4589-b453-12429b10a04c',
    },

    // {
    //   answer:
    //     'Messi The thing that is within my power to control today is powerful',
    //   date: '2021-08-11T18:00:00.000Z',
    //   id: 'ev_7',
    //   question: 'The thing that is within my power to control today is ______',
    //   type: 'Messi',
    //   uid: '0e10d037-5cgf-4589-b053-12429b10a04c',
    // },
  ];
  // console.log('submissions', submission);
  const scrollViewRef = useRef();
  const isInitializedToday = checkIfToday(lastInitialized);
  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd();
    loading && setLoading(false);
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
        decelerationRate="fast"
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
