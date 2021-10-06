import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Pages = () => {
  return (
    <View style={styles.container}>
      <Text>****Pages</Text>
    </View>
  );
};
export default Pages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
