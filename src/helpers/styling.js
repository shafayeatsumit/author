import {RFValue} from 'react-native-responsive-fontsize';

export const getAnswerStyle = (type, isExtra) => {
  if (isExtra) {
    return {fontSize: RFValue(25), fontFamily: 'georgia'};
  }
  if (type === 'week') {
    return {fontSize: RFValue(32), fontFamily: 'georgia'};
  } else if (type === 'month') {
    return {fontSize: RFValue(30), fontFamily: 'Montserrat-SemiBold'};
  } else {
    return {fontSize: RFValue(30), fontFamily: 'Montserrat-Regular'};
  }
};
