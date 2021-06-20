import {persist, devtools} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

let submissionStore = set => ({
  submission: [],
  setSubmission: content =>
    set(state => ({submission: [content, ...state.submission]})),
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
});

submissionStore = persist(submissionStore, {
  name: 'submission_storage',
  getStorage: () => AsyncStorage,
});

export default submissionStore;
