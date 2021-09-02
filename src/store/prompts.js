import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import _ from 'lodash';

//  removeContent: contentId =>
//     set(state => ({
//       contents: state.contents.filter(item => item.id !== contentId),
//     })),

let promptStore = set => ({
  title: {},
  plot: {},
  struggle: {},
  celebrate: {},
  moment: {},
  conclusion: {},
  updatePrompt: (title, id, servedAt, answeredAt) =>
    set(state => ({
      [title]: {
        ...state[title],
        ...(id && {id: id}),
        ...(servedAt && {servedAt}),
        ...(answeredAt && {answeredAt}),
      },
    })),
});

promptStore = persist(promptStore, {
  name: 'prompt_storage',
  getStorage: () => AsyncStorage,
});

export default promptStore;
