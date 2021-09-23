import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

let promptStore = set => ({
  morning: {},
  highlight: {},
  evening: {},
  backstory: {
    firstAvailable: 5,
    increment: 4,
  },
  flashforward: {
    firstAvailable: 7,
    increment: 2,
  },

  narrator: {
    firstAvailable: 4,
    increment: 5,
  },
  'Plot Twist': {
    isOn: false,
    firstAvailable: 12,
    increment: 3,
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
