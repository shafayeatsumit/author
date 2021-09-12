import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Animated, Dimensions, StyleSheet} from 'react-native';
import {checkIfToday} from '../../helpers/date';
import _ from 'lodash';
import moment from 'moment';
import {formatDate} from '../../helpers/date';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const PageHeader = ({submission, activeIndex}) => {
  const activeContent = submission[activeIndex];
  const isToday = checkIfToday(activeContent.date);
  const {uid: itemId, day, date} = activeContent;
  const contentByDate = _.groupBy(submission, 'day');

  const items = contentByDate[day];
  const totalItems = items.length;
  const activeContentIdex = items.findIndex(i => i.uid === itemId);
  const dateString = formatDate(date);
  const contentTitle = _.upperFirst(activeContent.title);
  return (
    <View style={styles.container}>
      <Animated.Text style={styles.dateText}>
        {dateString} <Text style={styles.title}>{contentTitle}</Text>
      </Animated.Text>

      <View style={styles.dotContainer}>
        {[...Array(totalItems)].map((item, indx) => (
          <View
            key={indx}
            style={[
              styles.dot,
              indx === activeContentIdex && {
                backgroundColor: 'rgba(255,255,255,0.7)',
              },
            ]}
          />
        ))}
        {isToday && <View style={[styles.dot, styles.emptyDot]} />}
      </View>
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
    height: 170,
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    paddingLeft: 35,
    lineHeight: 18,
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
    height: 25,
    width: 120,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 35,
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.38)',
    marginLeft: 5,
  },
  emptyDot: {
    borderColor: 'rgba(255,255,255,0.7)',
    backgroundColor: 'transparent',
    borderWidth: 0.4,
  },
});
