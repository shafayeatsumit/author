import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {useSubmissionStore} from '../../store';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
const {height: ScreenHeight} = Dimensions.get('window');

const PageHeader = () => {
  const {submission, title} = useSubmissionStore();
  const navigation = useNavigation();
  let pageTitle = title ? title : 'Add Title';
  pageTitle = _.upperFirst(pageTitle.trim());

  const handlePress = () => {
    navigation.navigate('Title');
    analytics().logEvent('button_push', {
      name: 'go edit title',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Compose</Text>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight / 14,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: RFValue(23),
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
});
