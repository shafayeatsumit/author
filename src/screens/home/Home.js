import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
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
// import {submission} from '../../helpers/contentsData';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Carousel from 'react-native-snap-carousel';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
let renderCount = 0;

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const {contents, lastInitialized, initialize} = useContentStore();
  const [scrollIndex, setScrollIndex] = useState(0);
  const offset = useRef(0);
  const {submission} = useSubmissionStore();
  const scrollViewRef = useRef();
  const isInitializedToday = checkIfToday(lastInitialized);

  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
    submission.length && setScrollIndex(submission.length - 1);
    setTimeout(() => {
      loading && setLoading(false);
    }, 1000);
  };

  const handleScrollEnd = event => {
    const currentIndex = Math.round(offset.current / ScreenWidth);
    console.log(`scrollindex ${scrollIndex} currentindex ${currentIndex}`);
    if (scrollIndex !== currentIndex) {
      setScrollIndex(currentIndex);
    }
    !showHeader && setShowHeader(true);
  };

  const handleScroll = event => {
    let currentOffset = event.nativeEvent.contentOffset.x;
    const diff = currentOffset - offset.current;
    const direction = currentOffset > offset.current ? 'right' : 'left';
    offset.current = currentOffset;
    if (diff > 2 && scrollIndex === submission.length - 1) {
      showHeader && setShowHeader(false);
    }
  };

  const onScrollBeginDrag = event => {};

  const onScrollEndDrag = () => {};

  const onEndReached = () => {
    loading && setLoading(false);
  };

  useEffect(() => {
    if (!isInitializedToday) {
      initialize();
    }
    setTimeout(scrollToEnd, 200);
  }, []);

  const RenderSwiper = ({item, index}) => {
    return <Prompt key={item} navigation={navigation} item={item} />;
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
      <Carousel
        loop={true}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        pagingEnabled
        data={contents}
        vertical={true}
        renderItem={RenderSwiper}
        sliderHeight={ScreenHeight}
        itemHeight={ScreenHeight}
        removeClippedSubviews={false}
        swipeThreshold={10}
      />
    );
  };

  const renderPage = ({item}) => {
    return <Page loading={loading} content={item} navigation={navigation} />;
  };

  const headerVisible = scrollIndex < submission.length && showHeader;
  renderCount = renderCount + 1;
  console.log('renderCount', renderCount);
  return (
    <View style={styles.container}>
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

      <FlatList
        ref={scrollViewRef}
        onEndReached={onEndReached}
        data={submission}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={renderPage}
        keyExtractor={item => item.uid}
        pagingEnabled
        horizontal
        ListFooterComponent={RenderPromtList}
        showsHorizontalScrollIndicator={false}
      />
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
