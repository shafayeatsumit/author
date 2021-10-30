import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {allPrompts} from '../helpers/constants';

let promptStore = set => ({
  allPrompts: [],
  initPrompts: () =>
    set(state => ({
      allPrompts: allPrompts,
    })),
  updatePrompts: () =>
    set(state => {
      const promptsCopy = [...state.allPrompts];
      promptsCopy.push(promptsCopy.shift());
      return {
        allPrompts: promptsCopy,
      };
    }),
});

promptStore = persist(promptStore, {
  name: 'prompt_storage',
  getStorage: () => AsyncStorage,
});

export default promptStore;
