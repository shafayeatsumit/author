import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

let userStore = set => ({
  lastVisit: null,
  lastSubmit: null,
  firstVisit: null,
  setLastSubmit: () => set(() => ({lastSubmit: moment()})),
  setLastVisit: () => set(() => ({lastVisit: moment()})),
  setFirstVisit: () => set(() => ({firstVisit: moment()})),
});

userStore = persist(userStore, {
  name: 'user_storage',
  getStorage: () => AsyncStorage,
});

export default userStore;
