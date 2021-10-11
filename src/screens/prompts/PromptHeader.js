import React from 'react';
import {View, Dimensions, Text, StyleSheet} from 'react-native';
import {useSubmissionStore} from '../../store';
import _ from 'lodash';
import {RFValue} from 'react-native-responsive-fontsize';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

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
    height: ScreenHeight / 10,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
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
