import React, {useEffect, useRef} from 'react';
import {View, FlatList, AppState, Dimensions, StyleSheet} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {checkIfToday} from '../../helpers/date';
import {ContentTitles} from '../../helpers/contentsData';
import {useSubmissionStore} from '../../store';
import ProgressivePrompt from './ProgressivePrompt';
import DailyPrompt from './DailyPrompt';
import PromptHeader from './PromptHeader';

const Prompts = () => {
  const {submission} = useSubmissionStore();
  const appState = useRef(AppState.currentState);
  const flatlistRef = useRef();
  const answeredToday = submission
    .filter(item => item.type === 'daily' && checkIfToday(item.date))
    .map(item => item.title);

  const prompts = ContentTitles.filter(
    item => !answeredToday.includes(item.title),
  );

  const scrollToTop = () => {
    flatlistRef.current &&
      flatlistRef.current.scrollToIndex({animated: false, index: 0});
  };

  const handleScrollEnd = () => {
    analytics().logEvent('scrolling');
  };

  const RenderSwiper = ({item, index}) => {
    if (item.type === 'daily') {
      return <DailyPrompt key={item.id} item={item} />;
    }
  };

  const keyExtractor = item => item.id;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground!
        console.log('app has come to fore ground!!!!');
        scrollToTop();
        analytics().logEvent('app_foreground');
      }
      appState.current = nextAppState;
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={prompts}
        ref={flatlistRef}
        renderItem={RenderSwiper}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<PromptHeader />}
        stickyHeaderIndices={[0]}
        onMomentumScrollEnd={handleScrollEnd}
      />
    </View>
  );
};
export default Prompts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  flatlist: {
    paddingBottom: 100,
  },
});
