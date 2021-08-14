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
import PageRenderer from './PageRenderer';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {contents, lastInitialized, initialize} = useContentStore();
  const {submission} = useSubmissionStore();
  const scrollViewRef = useRef();
  const isInitializedToday = checkIfToday(lastInitialized);
  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd();
    loading && setLoading(false);
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
    return <PageRenderer pages={item} navigation={navigation} />;
  };

  const submissionsByDate = _.values(_.groupBy(submission, 'date'));

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollViewRef}
        data={submissionsByDate}
        renderItem={renderPage}
        decelerationRate="fast"
        keyExtractor={item => item[0].date}
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
