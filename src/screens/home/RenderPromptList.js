import React, {useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {ContentTitles} from '../../helpers/contentsData';
import {useUserStore} from '../../store';
import ProgressivePrompt from './ProgressivePrompt';
import DailyPrompt from './DailyPrompt';
import BlankPrompt from './BlankPrompt';
import PromptFooter from './PromptFooter';
import StartPrompt from './StartPrompt';

const StartPromptDetail = {
  id: 'start_prompt',
  title: 'morning',
  type: 'start',
  time: 'morning',
};

const MorningPrompt = {
  id: 'morning',
  title: 'morning',
  type: 'daily',
  time: 'morning',
};

const RenderPromptList = ({scrollIndex}) => {
  const {finishedIntro, setFinishedIntro} = useUserStore();
  const PROMPTS = finishedIntro
    ? ContentTitles
    : [StartPromptDetail, ...ContentTitles];

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
    if (item.type === 'blank') {
      return <BlankPrompt key={item.id} item={item} />;
    }
  };

  const itemsChanged = itemIndex => {
    if (!finishedIntro && itemIndex === 9) {
      setFinishedIntro();
    }
  };

  return (
    <>
      <Carousel
        loop={true}
        useScrollView={true}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        pagingEnabled
        data={PROMPTS}
        onSnapToItem={itemsChanged}
        vertical={true}
        renderItem={RenderSwiper}
        sliderHeight={ScreenHeight}
        itemHeight={ScreenHeight}
        removeClippedSubviews={false}
        swipeThreshold={10}
      />
      <PromptFooter />
    </>
  );
};

export default RenderPromptList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
