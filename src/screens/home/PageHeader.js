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
  const textOpactiy = useRef(new Animated.Value(0)).current;

  const fadeOut = () => {
    Animated.timing(textOpactiy, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(fadeIn);
  };

  const fadeIn = () => {
    Animated.timing(textOpactiy, {
      toValue: 1,
      delay: 200,
      duration: 700,
      useNativeDriver: true,
    }).start(() => console.log('fade out'));
  };

  useEffect(() => {
    fadeOut();
  }, [date]);

  console.log('text opacity', textOpactiy);
  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.dateText, {opacity: textOpactiy}]}>
        {dateString}
      </Animated.Text>
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
});
