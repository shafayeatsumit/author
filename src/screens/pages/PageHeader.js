import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {formatDate} from '../../helpers/date';

const PageHeader = ({submission, activeIndex}) => {
  const activeContent = submission[activeIndex];
  const {date} = activeContent;
  const dateString = formatDate(date);
  return (
    <View style={styles.container}>
      <Animated.Text style={styles.dateText}>{dateString}</Animated.Text>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 144,
    // backgroundColor: 'red',
    marginTop: 50,
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    paddingTop: 10,
    fontSize: 16,
    paddingLeft: 32,
    lineHeight: 16,
    letterSpacing: -1,
    color: 'rgba(255,255,255,0.7)',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(255,255,255,0.38)',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -1,
    paddingLeft: 4,
  },
  dotContainer: {
    height: 10,
    width: 120,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 32,
  },
  dot: {
    height: 3,
    width: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.38)',
    marginLeft: 5,
  },
  emptyDot: {
    borderColor: 'rgba(255,255,255,0.7)',
    backgroundColor: 'transparent',
    borderWidth: 0.4,
  },
});
