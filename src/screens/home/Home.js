import React from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Logo from '../../components/Logo';
import ActiveContent from './ActiveContent';
import Submissions from './Submissions';
import Start from './Start';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#343D4C', '#131E25']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      useAngle={true}
      angle={360}
      angleCenter={{x: 0.5, y: 0.5}}
      style={{height: '100%', width: '100%'}}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <ActiveContent navigation={navigation} />
          <Submissions navigation={navigation} />
          <Start />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});
