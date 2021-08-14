import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Page from './Page';
import moment from 'moment';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';

const PageRenderer = ({pages, navigation, scrollEndCount}) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);
  const contentDate = pages[0].date;
  const dateString = moment(contentDate).format('dddd MMMM Do');
  let offset = 0;
  const firstIndex = 0;
  const lastIndex = pages.length - 1;

  const handleScroll = event => {
    let currentOffset = event.nativeEvent.contentOffset.x;
    let direction = currentOffset > offset ? 'left' : 'right';
    offset = currentOffset;
    // console.log('direction', direction);
    if (lastIndex === scrollIndex && direction === 'right') {
      // setScrollEnabled(false);
    }
  };

  const handleScrollEnd = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / ScreenWidth);
    setScrollIndex(currentIndex);
  };

  const handleTouchStart = () => {};

  useEffect(() => {
    if (scrollEndCount !== 0 && scrollEndCount % 3 === 0) {
      setScrollEnabled(true);
    }
  }, [scrollEndCount]);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{dateString}</Text>
      </View>
      <View style={{height: ScreenHeight - 200, width: ScreenWidth}}>
        <GestureHandlerScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={scrollEnabled}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          onTouchStart={handleTouchStart}
          contentContainerStyle={styles.scrollContainer}
          horizontal={true}>
          {pages.map(item => {
            return (
              <Page key={item.uid} content={item} navigation={navigation} />
            );
          })}
        </GestureHandlerScrollView>
      </View>
    </View>
  );
};
export default PageRenderer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303B49',
  },
  dateContainer: {
    height: 200,
    justifyContent: 'center',
    paddingLeft: 30,
    // alignItems: 'center',
  },
  header: {
    height: 250,
    flexDirection: 'row',
    // width: ScreenWidth,
    position: 'absolute',
    top: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#303B49',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: 'white',
  },
  scrollContainer: {
    // height: ScreenHeight,
    // width: ScreenWidth,
  },
  title: {
    paddingTop: 15,
    fontSize: 35,
    textAlign: 'left',
    paddingLeft: 30,
    fontFamily: 'Montserrat-Bold',
  },
  dateText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: RFValue(16),
    paddingBottom: 10,
    color: 'rgba(255,255,255,0.7)',
  },
});
