import create from 'zustand';
import contentStore from './contents';
import userStore from './user';
import submissionStore from './submission';

export const useContentStore = create(contentStore);
export const useUserStore = create(userStore);
export const useSubmissionStore = create(submissionStore);
