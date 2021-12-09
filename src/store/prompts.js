import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PlanPrompts,
  AppreciatePrompts,
  ReflectPrompts,
  ComposePrompts,
  BlankPrompts,
  RelaxPrompts,
  CreatePrompts,
} from '../helpers/constants';

let promptStore = set => ({
  plan: [],
  appreciate: [],
  reflect: [],
  compose: [],
  relax: [],
  create: [],
  blank: [],

  promptsList: [
    {
      name: 'plan',
      active: true,
    },
    {name: 'compose', active: true},
    {name: 'appreciate', active: true},
    {name: 'reflect', active: true},
    {name: 'relax', active: true},
    {name: 'create', active: true},
    {name: 'blank', active: true},
  ],
  initPrompts: () =>
    set(state => ({
      plan: PlanPrompts,
      appreciate: AppreciatePrompts,
      reflect: ReflectPrompts,
      compose: ComposePrompts,
      relax: RelaxPrompts,
      create: CreatePrompts,
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
