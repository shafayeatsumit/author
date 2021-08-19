import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

const PageHeader = ({submission, activeIndex}) => {
  const activeContent = submission[activeIndex];
  const {uid: itemId, date} = activeContent;
  const contentByDate = _.groupBy(submission, 'date');
  const items = contentByDate[date];
  const totalItems = items.length;
  const activeContentIdex = items.findIndex(i => i.uid === itemId);
  const dateString = moment(date).format('dddd MMMM Do');

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.dateText}>{dateString}</Animated.Text>

      <View style={styles.dotContainer}>
        {[...Array(totalItems)].map((item, indx) => (
          <View
            key={indx}
            style={[
              styles.dot,
              indx === activeContentIdex && {backgroundColor: 'white'},
            ]}
          />
        ))}
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
    height: 150,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    paddingLeft: 35,
    color: 'rgba(255,255,255,0.7)',
  },
  dotContainer: {
    height: 25,
    width: 120,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 35,
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255,255,255,0.37)',
    marginLeft: 5,
  },
});
