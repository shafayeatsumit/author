import React from 'react';
import {View, Dimensions, Text, Animated, StyleSheet} from 'react-native';
import {useSubmissionStore} from '../../store';
import {RFValue} from 'react-native-responsive-fontsize';

import _ from 'lodash';
const {height: ScreenHeight} = Dimensions.get('window');

const PageHeader = () => {
  const {submission, title} = useSubmissionStore();
  let pageTitle = title ? title : 'Add Title';
  pageTitle = _.upperFirst(pageTitle.trim());
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{pageTitle}</Text>
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
    paddingTop: 15,
    height: ScreenHeight / 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    zIndex: 5,
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: RFValue(18),
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
});
