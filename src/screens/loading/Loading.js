import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useContentStore} from '../../store';

const Loading = ({navigation}) => {
  const {contents, initialize} = useContentStore();
  let contentsLenght = useRef(null);

  const loadContents = () => {
    if (!contentsLenght.current) {
      initialize();
    }
    navigation.navigate('Home');
  };

  useEffect(() => {
    contentsLenght.current = contents.length;
  }, [contents]);

  useEffect(() => {
    // let the AsyncStorage hydrate zustand state;
    // give 3 secs break;
    setTimeout(loadContents, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading </Text>
    </View>
  );
};
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
