import React, {useState} from 'react';
import {View, FlatList, Text, Dimensions, StyleSheet} from 'react-native';
import {checkIfToday} from '../../helpers/date';
import {ContentTitles} from '../../helpers/contentsData';
import {useSubmissionStore} from '../../store';
import ProgressivePrompt from './ProgressivePrompt';
import DailyPrompt from './DailyPrompt';
import PromptHeader from './PromptHeader';

const JOMA = props => (
  <View style={styles.container}>
    <Text>JOMA</Text>
  </View>
);
export default JOMA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
