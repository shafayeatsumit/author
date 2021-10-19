import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const date = moment();
const dedicate_day = date.format('YYYY-MM-DD');

export const IntroPages = [
  {
    id: 'intro_dedicate',
    uid: 'intro_dedicate',
    type: 'introFlow',
    question: 'I dedicate this story to',
    date: new Date(),
    day: dedicate_day,
  },
];

let submissionStore = set => ({
  submission: [],
  title: '',
  setIntroPages: () => set(state => ({submission: [...IntroPages]})),
  setTitle: newTitle => set(state => ({title: newTitle})),
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
