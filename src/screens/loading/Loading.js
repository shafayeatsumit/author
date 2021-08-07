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
import PushNotification from 'react-native-push-notification';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const Loading = ({navigation}) => {
  const {contents, initialize} = useContentStore();
  const {submission} = useSubmissionStore();
  const scrollViewRef = useRef();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={firePushNotification}
        style={{backgroundColor: 'tomato', height: 100, width: 100}}
      />
    </View>
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
