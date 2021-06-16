import moment from 'moment';

export const formatDate = date => {
  const today = moment();
  const yesterday = moment().add(-1, 'days');
  const isToday = moment().isSame(today, 'day');
  if (isToday) {
    return 'Today';
  }
  const isYesterday = moment().isSame(yesterday, 'day');
  if (isYesterday) {
    return 'Yesterday';
  }
  return moment(date).format('MMM Do YY');
};
