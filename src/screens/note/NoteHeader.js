import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import _ from 'lodash';
import {triggerHaptic} from '../../helpers/haptics';

const NoteHeader = ({date, title, goBack}) => {
  const noteTitle = _.upperFirst(title);
  const handleBack = () => {
    triggerHaptic();
    goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>
        {date} <Text style={styles.title}>{noteTitle}</Text>
      </Text>
      <TouchableOpacity onPress={handleBack} style={styles.xoutContainer}>
        <Image
          style={styles.xout}
          source={require('../../../assets/x_out.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NoteHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingTop: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    paddingLeft: 35,
    color: 'rgba(255,255,255,0.7)',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 16,
    paddingLeft: 4,
  },
  xoutContainer: {
    height: 50,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    // backgroundColor: 'yellow',
  },
  xout: {
    height: 16,
    width: 16,
    // resizeMode: 'contain',
    tintColor: 'rgba(255,255,255,0.4)',
  },
});
