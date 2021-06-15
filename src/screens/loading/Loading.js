import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useContentStore} from '../../store';

const Loading = () => {
  const {contents, initialize} = useContentStore();
  let contentsLenght = useRef(null);

  const loadContents = () => {
    if (!contentsLenght.current) {
      initialize();
    }
  };

  useEffect(() => {
    contentsLenght.current = contents.length;
  }, [contents]);

  useEffect(() => {
    // let the AsyncStorage hydrate zustand state;
    // give 3 secs break;
    setTimeout(loadContents, 3000);
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
