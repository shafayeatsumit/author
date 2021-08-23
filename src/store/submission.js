import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

let submissionStore = set => ({
  submission: [],
  setSubmission: content =>
    set(state => ({submission: [...state.submission, content]})),
  updateSubmission: (contentId, content) =>
    set(state => ({
      submission: state.submission.map(item => {
        if (item.id === contentId) {
          return {
            ...item,
            answer: content,
          };
        }
        return item;
      }),
    })),
  deleteSubmission: contentId =>
    set(state => ({
      submission: state.submission.filter(item => item.uid !== contentId),
    })),
});

submissionStore = persist(submissionStore, {
  name: 'submission_storage',
  getStorage: () => AsyncStorage,
});

export default submissionStore;
