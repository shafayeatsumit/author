import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useContentStore, useSubmissionStore} from '../../store';
import InfiniteScroll from 'react-native-infinite-looping-scroll';
import {checkIfToday} from '../../helpers/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Page from './Page';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Home = ({navigation}) => {
  const {contents, initialize} = useContentStore();
  const {submission} = useSubmissionStore();
  const scrollViewRef = useRef();

  useEffect(() => {
    initialize();
  }, []);

  const PromptItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemPrompt}
        onPress={() => navigation.navigate('Note', {content: item})}>
        <Text style={styles.title}>{item.type}</Text>
        <Text style={styles.text}>{item.question}</Text>
      </TouchableOpacity>
    );
  };
  const renderPropmpts = ({item}) => {
    return <PromptItem item={item} />;
  };

  const RenderPromtList = () => {
    if (!contents.length) {
      return (
        <View style={styles.itemPrompt}>
          <Text style={styles.text}>Hit the Max limit</Text>
        </View>
      );
    }
    return (
      <InfiniteScroll
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
      return <Page content={item} />;
    }
    return <RenderPromtList />;
  };

  return (
    <ScrollView
      pagingEnabled
      horizontal
      style={styles.container}
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={(contentWidth, contentHeight) => {
        scrollViewRef.current.scrollToEnd({animated: false});
      }}>
      <FlatList
        data={submission}
        renderItem={renderPage}
        keyExtractor={item => item.uid}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <RenderPromtList />
    </ScrollView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: ScreenHeight,
    width: ScreenWidth,
  },
  itemPrompt: {
    backgroundColor: '#FFF1F1',
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    textAlign: 'left',
    paddingLeft: 35,
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    fontSize: 32,
    textAlign: 'left',
    fontFamily: 'georgia',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});
