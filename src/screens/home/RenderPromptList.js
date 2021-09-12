import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {ContentTitles} from '../../helpers/contentsData';
import ProgressivePrompt from './ProgressivePrompt';
import DailyPrompt from './DailyPrompt';
import BlankPrompt from './BlankPrompt';
import PromptFooter from './PromptFooter';

const RenderPromptList = () => {
  const RenderSwiper = ({item, index}) => {
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

  return (
    <>
      <Carousel
        loop={true}
        useScrollView={true}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        pagingEnabled
        data={ContentTitles}
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
