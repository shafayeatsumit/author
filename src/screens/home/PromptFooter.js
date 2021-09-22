import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSubmissionStore} from '../../store';
import _ from 'lodash';

const PageFooter = () => {
  const {submission} = useSubmissionStore();
  let pageTitle = submission[0].answer ? submission[0].answer : 'Add Title';
  const totalPages = submission.length + 1;
  pageTitle = _.upperFirst(pageTitle.trim());

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {pageTitle} • Page {totalPages}
      </Text>
    </View>
  );
};

export default PageFooter;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  dot: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 15,
    textAlign: 'center',
    // paddingBottom: 5,
  },
});
