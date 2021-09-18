import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const MonthName = moment().format('MMMM');
const IntroTitle = {
  id: 'intro_title',
  type: 'introFlow',
  month: MonthName,
  question: `If the rest of ${MonthName} was a chapter in the story of my life, I’d title it`,
};

const IntroPages = [
  {
    id: 'intro_start',
    uid: 'intro_start',
    type: 'introFlow',
  },
  {
    id: 'intro_dedicate',
    uid: 'intro_dedicate',
    type: 'introFlow',
    question: 'I dedicate this story to',
  },
];

let submissionStore = set => ({
  submission: [],
  setIntroPages: () =>
    set(state => ({submission: [...state.submission, ...IntroPages]})),
  setSubmission: prompt =>
    set(state => ({submission: [...state.submission, prompt]})),
  updateSubmission: (promptId, prompt) =>
    set(state => ({
      submission: state.submission.map(item => {
        if (item.id === promptId) {
          return {
            ...item,
            answer: prompt,
          };
        }
        return item;
      }),
    })),

  skipSubmission: promptId =>
    set(state => ({
      submission: state.submission.map(item => {
        if (item.id === promptId) {
          return {
            ...item,
            skip: true,
          };
        }
        return item;
      }),
    })),
  deleteSubmission: promptId =>
    set(state => ({
      submission: state.submission.filter(item => item.uid !== promptId),
    })),
});

submissionStore = persist(submissionStore, {
  name: 'submission_storage',
  getStorage: () => AsyncStorage,
});

export default submissionStore;
