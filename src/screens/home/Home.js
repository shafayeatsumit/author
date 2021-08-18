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
import {submission} from '../../helpers/contentsData';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Carousel from 'react-native-snap-carousel';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
let renderCount = 0;

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const {contents, lastInitialized, initialize} = useContentStore();
  const [scrollIndex, setScrollIndex] = useState(0);
  const offset = useRef(0);
  // const {submission} = useSubmissionStore();

  const scrollViewRef = useRef();
  const isInitializedToday = checkIfToday(lastInitialized);

  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd();
    setScrollIndex(submission.length - 1);
    setTimeout(() => {
      loading && setLoading(false);
    }, 2000);
  };

  const handleScrollEnd = event => {
    const currentIndex = Math.round(offset.current / ScreenWidth);
    if (scrollIndex !== currentIndex) {
      setScrollIndex(currentIndex);
    }
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

  const handleSwipeScroll = e => {
    console.log('handle swipe event', e.nativeEvent.target);
  };

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
        loop
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

  const headerVisible = scrollIndex < submission.length;
  // renderCount += 1;
  // console.log(`render count ${renderCount} scrollIndex ${scrollIndex}`);
  return (
    <View style={styles.container}>
      {headerVisible && (
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
