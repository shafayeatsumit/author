import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  AppState,
  SafeAreaView,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useContentStore, useUserStore} from '../../store';
import {checkIfToday} from '../../helpers/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Page',
    number: 0,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Page',
    number: 1,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Page',
    number: 2,
    isPrompt: true,
  },
];

const PromptData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Third Page \n\nFirst Prompt',
    number: 0,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Third Page \n\nSecond Prompt',
    number: 1,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Page \n\nThird Prompt',
    number: 2,
  },
];

const COLORS = [
  '#628395',
  '#FFA0A0',
  '#FFE3E3',
  '#DDDDDD',
  '#125D98',
  '#3C8DAD',
  '#F5A962',
  '#99154E',
  '#FFC93C',
  '#FFDDCC',
  '#FFBBCC',
];

import _ from 'lodash';

const Item = ({title}) => {
  const color = _.sample(COLORS);
  return (
    <View style={[styles.item, {backgroundColor: color}]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const PromptItem = ({title}) => {
  const color = _.sample(COLORS);
  return (
    <View style={[styles.itemPrompt, {backgroundColor: color}]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const Loading = ({navigation}) => {
  const renderPropmpts = ({item}) => {
    return <PromptItem title={item.title} />;
  };
  const renderItem = ({item}) => {
    if (item.isPrompt) {
      return (
        <FlatList
          data={PromptData}
          renderItem={renderPropmpts}
          keyExtractor={i => i.id}
          pagingEnabled
          initialScrollIndex={2}
          getItemLayout={(data, index) => ({
            length: ScreenHeight,
            offset: ScreenHeight * index,
            index,
          })}
        />
      );
    }
    return <Item title={item.title} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        pagingEnabled
        horizontal
        initialScrollIndex={2}
        getItemLayout={(data, index) => ({
          length: ScreenHeight,
          offset: ScreenHeight * index,
          index,
        })}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemPrompt: {
    backgroundColor: 'tomato',
    height: ScreenHeight,
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
});
