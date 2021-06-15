import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

let submissionStore = set => ({
  submission: [],
});

submissionStore = persist(submissionStore, {
  name: 'submission_storage',
  getStorage: () => AsyncStorage,
});

export default submissionStore;
