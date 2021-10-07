import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSubmissionStore, usePromptStore} from '../../store';
import _ from 'lodash';
import {triggerHaptic} from '../../helpers/haptics';
const progressive_prompts = [
  'backstory',
  'settings',
  'flashforward',
  'characters',
  'narrator',
  'Plot Twist',
];

const PageFooter = ({activeIndex, handleFastForward}) => {
  const {deleteSubmission, submission} = useSubmissionStore();
  let pageTitle = submission[1] ? submission[1].answer : 'Add Title';
  pageTitle = _.upperFirst(pageTitle.trim());
  const {decNextAvailable} = usePromptStore();
  const totalPages = submission.length + 1;
  const pageNumber = activeIndex + 1;
  const pageContent = submission[activeIndex];

  const handleFF = () => {
    triggerHaptic();
    handleFastForward();
  };

  const handleDelete = () => {
    triggerHaptic();
    deleteSubmission(pageContent.uid);
    if (pageContent.type === 'progressive') {
      progressive_prompts.map(item => decNextAvailable(item));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDelete} style={styles.imageHolder}>
        <Image style={styles.bin} source={require('../../../assets/ff.png')} />
      </TouchableOpacity>

      <Text style={styles.text}>
        {pageTitle} • Page {pageNumber} of {totalPages}
      </Text>
      <TouchableOpacity onPress={handleFF} style={styles.imageHolder}>
        <Image style={styles.ff} source={require('../../../assets/bin.png')} />
      </TouchableOpacity>
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
    height: 85,
    alignItems: 'center',

    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 4,
    // backgroundColor: 'transparent',
  },
  bin: {
    height: 20,
    width: 20,
    tintColor: 'rgba(255,255,255,0.38)',
  },
  ff: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'rgba(255,255,255,0.38)',
  },
  imageHolder: {
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
  },
  text: {
    color: 'rgba(255,255,255,0.38)',
    fontSize: 14,
    textAlign: 'center',
  },
});
