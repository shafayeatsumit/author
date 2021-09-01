import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

let submissionStore = set => ({
  submission: [],
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
