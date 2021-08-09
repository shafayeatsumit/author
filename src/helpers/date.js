import moment from 'moment';
import _ from 'lodash';

export const isMorningTime = () => {
  const now = moment();
  const format = 'hh:mm:ss';
  const beforeTime = moment('05:00:00', format);
  const afterTime = moment('12:00:00', format);
  if (now.isBetween(beforeTime, afterTime)) {
    return true;
  }
  return false;
};

export const checkIfToday = date => {
  const today = moment();
  return moment(date).isSame(today, 'day');
};

export const checkIfYesterday = date => {
  const yesterday = moment().add(-1, 'days');
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

export const dateFromNow = myDate => {
  // get from-now for this date
  var fromNow = moment(myDate).fromNow();

  // ensure the date is displayed with today and yesterday
  return moment(myDate).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    // when the date is further away, use from-now functionality
    sameElse: function () {
      return '[' + fromNow + ']';
    },
  });
};
