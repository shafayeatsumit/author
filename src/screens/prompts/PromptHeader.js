import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSubmissionStore} from '../../store';
import _ from 'lodash';
import {RFValue} from 'react-native-responsive-fontsize';
const PageHeader = () => {
  const {submission, title} = useSubmissionStore();
  console.log('submission', submission);
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
    height: 100,

    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonHolder: {
    height: 50,
    width: 50,

    justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 25,
    // backgroundColor: 'red',
  },
  backButton: {
    height: 20,
    width: 20,
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: RFValue(18),
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  dot: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 15,
    textAlign: 'center',
    // paddingBottom: 5,
  },
});
