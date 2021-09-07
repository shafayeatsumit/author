import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import _ from 'lodash';

let promptStore = set => ({
  title: {},
  plot: {},
  struggle: {},
  celebrate: {},
  moment: {},
  conclusion: {},
  circumstance: {
    firstAvailable: 1,
    increment: 11,
  },
  backstory: {
    firstAvailable: 2,
    increment: 11,
  },
  settings: {
    firstAvailable: 1,
    increment: 11,
  },
  flashforward: {
    firstAvailable: 8,
    increment: 11,
  },
  characters: {
    firstAvailable: 7,
    increment: 11,
  },
  narrator: {
    firstAvailable: 3,
    increment: 11,
  },
  'Plot Twist': {
    isOn: false,
    firstAvailable: 11,
    increment: 27,
  },
  updatePrompt: (title, id, servedAt, answeredAt) =>
    set(state => ({
      [title]: {
        ...state[title],
        ...(id && {id: id}),
        ...(servedAt && {servedAt}),
        ...(answeredAt && {answeredAt}),
      },
    })),
  updateProgressive: (title, id) =>
    set(state => ({
      [title]: {
        ...state[title],
        ...(id && {id: id}),
        ...(!state[title].isOn && {isOn: true}),
      },
    })),

  incNextAvailable: (title, totalPages) =>
    set(state => ({
      [title]: {
        ...state[title],
        nextAvailable: totalPages + state[title].increment,
      },
    })),

  decNextAvailable: title =>
    set(state => ({
      [title]: {
        ...state[title],
        nextAvailable:
          state[title].nextAvailable > 0 ? state[title].nextAvailable - 1 : 0,
      },
    })),
});

promptStore = persist(promptStore, {
  name: 'prompt_storage',
  getStorage: () => AsyncStorage,
});

export default promptStore;
