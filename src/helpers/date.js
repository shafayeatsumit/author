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

export const checkIfLastWeek = d => {
  const fourteenDaysAgo = moment().subtract(14, 'days');
  const date = moment(d);
  const fromToday = date.diff(fourteenDaysAgo, 'days');
  return _.inRange(fromToday, 8, 15);
};

const formatDay = date => {
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

const formatWeek = date => {
  const isThisWeek = checkIfThisWeek(date);
  if (isThisWeek) {
    return 'This Week';
  }

  const isLastWeek = checkIfLastWeek(date);
  if (isLastWeek) {
    return 'Last Week';
  }

  return moment(date).format('MM/DD');
};

const formatMonth = date => {
  const thisMonth = moment(date).isSame(new Date(), 'month');
  if (thisMonth) {
    return 'This Month';
  }
  return moment().format('MMMM');
};

export const formatDate = (date, type) => {
  if (type === 'week') {
    // week;
    return formatWeek(date);
  } else if (type === 'month') {
    // month;
    return formatMonth(date);
  }
  // day;
  return formatDay(date);
};