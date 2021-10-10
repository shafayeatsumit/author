import React, {useState} from 'react';
import {View, FlatList, Text, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {checkIfToday} from '../../helpers/date';
import {ContentTitles, ContentTitlesAtStart} from '../../helpers/contentsData';
import {useUserStore, useSubmissionStore} from '../../store';
import ProgressivePrompt from './ProgressivePrompt';
import DailyPrompt from './DailyPrompt';
import PromptHeader from './PromptHeader';
import StartPrompt from './StartPrompt';

const RenderPromptList = ({scrollIndex, goToLastPage}) => {
  const {submission} = useSubmissionStore();
  const answeredToday = submission
    .filter(item => item.type === 'daily' && checkIfToday(item.date))
    .map(item => item.title);

  const prompts = ContentTitles.filter(
    item => !answeredToday.includes(item.title),
  );

  const RenderSwiper = ({item, index}) => {
    if (item.type === 'start') {
      return <StartPrompt key={item.id} scrollIndex={scrollIndex} />;
    }
    if (item.type === 'progressive') {
      return <ProgressivePrompt key={item.id} item={item} />;
    }
    if (item.type === 'daily') {
      return <DailyPrompt key={item.id} item={item} />;
    }
  };

  const keyExtractor = item => item.id;

  return (
    <>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={prompts}
        renderItem={RenderSwiper}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<PromptHeader goToLastPage={goToLastPage} />}
      />
    </>
  );
};

export default RenderPromptList;

const styles = StyleSheet.create({
  flatlist: {
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
