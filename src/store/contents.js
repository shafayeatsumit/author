import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getRandomContent} from '../helpers/contentsData';
import moment from 'moment';
import _ from 'lodash';

let contentStore = set => ({
  all: [],
  contents: [],
  lastInitialized: null,
  initialize: () =>
    set(() => {
      const randomContents = getRandomContent();
      return {lastInitialized: moment(), contents: [...randomContents]};
    }),
  removeContent: contentId =>
    set(state => ({
      contents: state.contents.filter(item => item.id !== contentId),
    })),
  sortContents: () =>
    set(state => {
      const sortedContents = _.sortBy(state.contents, ['time']);
      return {contents: [...sortedContents]};
    }),
});

contentStore = persist(contentStore, {
  name: 'content_storage',
  getStorage: () => AsyncStorage,
});

export default contentStore;
