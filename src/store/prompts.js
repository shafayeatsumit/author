import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import _ from 'lodash';

let promptStore = set => ({
  morning: {},
  highlight: {},
  evening: {},
  circumstance: {
    firstAvailable: 3,
    increment: 11,
  },
  backstory: {
    firstAvailable: 4,
    increment: 11,
    // increment: 3,
  },
  settings: {
    firstAvailable: 3,
    increment: 11,
    // increment: 2,
  },
  flashforward: {
    firstAvailable: 10,
    increment: 11,
  },
  characters: {
    firstAvailable: 9,
    increment: 11,
  },
  narrator: {
    firstAvailable: 5,
    increment: 11,
  },
  'Plot Twist': {
    isOn: false,
    firstAvailable: 13,
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
  updateProgressive: (title, id, lastServedAt) =>
    set(state => ({
      [title]: {
        ...state[title],
        ...(id && {id: id}),
        ...(!state[title].isOn && {isOn: true}),
        lastServedAt,
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
        lastServedAt:
          state[title].lastServedAt > 0 ? state[title].lastServedAt - 1 : 0,
      },
    })),
});

promptStore = persist(promptStore, {
  name: 'prompt_storage',
  getStorage: () => AsyncStorage,
});

export default promptStore;
