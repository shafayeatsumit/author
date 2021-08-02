import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  AppState,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useContentStore, useSubmissionStore} from '../../store';
import {checkIfToday} from '../../helpers/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Loading = ({navigation}) => {
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
      <FlatList
        data={contents}
        renderItem={renderPropmpts}
        keyExtractor={i => i.id}
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: ScreenHeight,
          offset: ScreenHeight * index,
          index,
        })}
      />
    );
  };

  const renderPage = ({item}) => {
    if (item.answer) {
      return (
        <View style={styles.itemPrompt}>
          <Text style={styles.text}>{item.answer}</Text>
        </View>
      );
    }
    return <RenderPromtList />;
  };

  return (
    <ScrollView
      pagingEnabled
      horizontal
      style={styles.container}
      ref={scrollViewRef}
      onContentSizeChange={(contentWidth, contentHeight) => {
        scrollViewRef.current.scrollToEnd({animated: true});
      }}>
      <FlatList
        data={submission}
        renderItem={renderPage}
        keyExtractor={item => item.uid}
        pagingEnabled
        horizontal
      />
      <RenderPromtList />
    </ScrollView>
  );
};
export default Loading;

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
