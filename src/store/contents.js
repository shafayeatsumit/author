import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONTENTS from '../helpers/contentsData';

let contentStore = set => ({
  contents: [],
  initialize: () => set(() => ({contents: [...CONTENTS]})),
  removeContent: contentId =>
    set(state => ({
      contents: state.contents.filter(item => item.id !== contentId),
    })),
});

// contentStore = persist(contentStore, {
//   name: 'content_storage',
//   getStorage: () => AsyncStorage,
// });

export default contentStore;
