import React from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Logo from '../../components/Logo';
import ActiveContent from './ActiveContent';
import Submissions from './Submissions';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <Logo />
          <ActiveContent navigation={navigation} />
          <Submissions navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
