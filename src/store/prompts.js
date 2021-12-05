import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  allPrompts,
  PlanPrompts,
  AppreciatePrompts,
  ReflectPrompts,
  ComposePrompts,
  BlankPrompts,
} from '../helpers/constants';

let promptStore = set => ({
  plan: [],
  appreciate: [],
  reflect: [],
  compose: [],
  blank: [],
  promptsList: [
    {
      name: 'plan',
      active: true,
    },
    {name: 'appreciate', active: true},
    {name: 'reflect', active: true},
    {name: 'compose', active: true},
    {name: 'blank', active: true},
  ],
  initPrompts: () =>
    set(state => ({
      plan: PlanPrompts,
      appreciate: AppreciatePrompts,
      reflect: ReflectPrompts,
      compose: ComposePrompts,
      blank: BlankPrompts,
    })),

  nextPrompt: promptName =>
    set(state => {
      const promptsCopy = [...state[promptName]];
      promptsCopy.push(promptsCopy.shift());
      return {
        [promptName]: promptsCopy,
      };
    }),

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
