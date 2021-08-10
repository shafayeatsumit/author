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

import PushNotification from 'react-native-push-notification';
import Page from './Page';
import Prompt from './Prompt';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {contents, lastInitialized, initialize} = useContentStore();
  const {submission} = useSubmissionStore();
  const scrollViewRef = useRef();
  const isInitializedToday = checkIfToday(lastInitialized);

  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd();
    setTimeout(() => setLoading(false), 500);
  };

  useEffect(() => {
    if (!isInitializedToday) {
      initialize();
    }
    setTimeout(scrollToEnd, 200);
  }, []);

  const PromptItem = ({item}) => {
    return <Prompt navigation={navigation} item={item} />;
  };
  const renderPropmpts = ({item}) => {
    return <PromptItem item={item} />;
  };

  const RenderPromtList = () => {
    return (
      <FlatList
        data={contents}
        renderItem={renderPropmpts}
        keyExtractor={i => i.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderPage = ({item}) => {
    if (item.answer) {
      return <Page content={item} navigation={navigation} />;
    }
    return <RenderPromtList />;
  };

  return (
    <>
      <FlatList
        ref={scrollViewRef}
        data={submission}
        renderItem={renderPage}
        keyExtractor={item => item.uid}
        pagingEnabled
        horizontal
        ListFooterComponent={RenderPromtList}
        showsHorizontalScrollIndicator={false}
      />

      {loading && <View style={styles.loading} />}
    </>
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
});
