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
import {useUserStore, useContentStore, useSubmissionStore} from '../../store';
import {checkIfToday} from '../../helpers/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
// TODO: comment this
// AsyncStorage.clear();
const Loading = ({navigation}) => {
  const {finishedIntro} = useUserStore();
  const finishedIntroRef = useRef(null);

  const navigate = () => {
    finishedIntroRef.current
      ? navigation.navigate('Home')
      : navigation.navigate('Intro');
  };

  useEffect(() => {
    finishedIntroRef.current = finishedIntro;
  }, [finishedIntro]);

  useEffect(() => {
    setTimeout(navigate, 500);
  }, []);

  return <View style={styles.container} />;
};
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303B49',
  },
});
