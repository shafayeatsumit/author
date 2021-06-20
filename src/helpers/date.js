import moment from 'moment';
import _ from 'lodash';

const today = moment();
const yesterday = moment().add(-1, 'days');

export const checkIfToday = date => {
  return moment(date).isSame(today, 'day');
};

export const checkIfYesterday = date => {
  return moment(date).isSame(yesterday, 'day');
};

export const checkIfThisWeek = d => {
  const sevenDaysAgo = moment().subtract(7, 'days');
  const date = moment(d);
  const fromToday = date.diff(sevenDaysAgo, 'days');
  return _.inRange(fromToday, 0, 8);
};

export const formatDate = date => {
  const isToday = checkIfToday(date);
  if (isToday) {
    return 'Today';
  }
  const isYesterday = checkIfYesterday(date);
  if (isYesterday) {
    return 'Yesterday';
  }
  const isThisWeek = checkIfThisWeek(date);
  if (isThisWeek) {
    return moment(date).format('dddd');
  }
  return moment(date).format('dddd MM/DD');
};
