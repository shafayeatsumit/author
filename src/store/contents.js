import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONTENTS from '../helpers/contentsData';

let contentStore = set => ({
  contents: [],
  initialize: () => set(() => ({contents: [...CONTENTS]})),
  moveFirst: () =>
    set(state => {
      const firstHalfArray = state.contents.slice(0, 1);
      const secondHalfArray = state.contents.slice(1);
      const update = [...secondHalfArray, ...firstHalfArray];
      return {
        contents: update,
      };
    }),
});

contentStore = persist(contentStore, {
  name: 'content_storage',
  getStorage: () => AsyncStorage,
});

export default contentStore;
