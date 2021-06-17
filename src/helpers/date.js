import moment from 'moment';

const today = moment();
const yesterday = moment().add(-1, 'days');

export const checkIfToday = date => {
  return moment(date).isSame(today, 'day');
};

export const checkIfYesterday = date => {
  return moment(date).isSame(yesterday, 'day');
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
  return moment(date).format('MMM Do YY');
};
