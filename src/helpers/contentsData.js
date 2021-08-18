import _ from 'lodash';
import {checkIfMorningTime} from '../helpers/date';
export const CONTENTS_MORNING = [
  {
    id: 'mo_1',
    type: 'Title',
    time: 'morning',
    question:
      'If the upcoming day was a chapter in my story, the title would be ______',
  },
  {
    id: 'mo_2',
    type: 'Priority',
    time: 'morning',
    question: 'The priority that can guide me today is ______',
  },
  {
    id: 'mo_3',
    type: 'Investment',
    time: 'morning',
    question: "An investment I'll make in the future of my story is ______",
  },
  {
    id: 'mo_5',
    type: 'Advice',
    time: 'morning',
    question: "Future me's advice for today would be ______",
  },
  {
    id: 'mo_6',
    type: 'Plot',
    time: 'morning',
    question: 'Actions my story needs me to complete are ______',
  },
  {
    id: 'mo_7',
    type: 'Power',
    time: 'morning',
    question: 'The thing that is within my power to control today is ______',
  },
  {
    id: 'mo_8',
    type: 'Composure',
    time: 'morning',
    question:
      'Something I might face today that is outside of my control is ______',
  },
  {
    id: 'mo_9',
    type: 'Strength',
    time: 'morning',
    question: 'Today, I am unwilling to accept ______',
  },
  {
    id: 'mo_10',
    type: 'Start',
    time: 'morning',
    question:
      'An extremely easy action I can take to push today in the right direction is ______',
  },
];

export const CONTENTS_EVENING = [
  {
    id: 'ev_1',
    type: 'Word',
    time: 'evening',
    question: 'One word that could summarize my day is ______',
  },
  {
    id: 'ev_2',
    time: 'evening',
    type: 'Gratitude',
    question: 'Something that went well was ______',
  },
  {
    id: 'ev_4',
    time: 'evening',
    type: 'Triumph',
    question: 'I can celebrate ______',
  },
  {
    id: 'ev_5',
    time: 'evening',
    type: 'Sidekick',
    question:
      'The best supporting actor or actoress in my story today was ______',
  },
  {
    id: 'ev_7',
    time: 'evening',
    type: 'Grace',
    question: 'A completely carefree and lovely moment was ______',
  },
  {
    id: 'ev_3',
    time: 'evening',
    type: 'Keepsake',
    question: "Something I'll always want to remember is ______",
  },
  {
    id: 'ev_6',
    time: 'evening',
    type: 'Misstep',
    question: 'A misstep that will help me grow as a person is ______',
  },
  {
    id: 'ev_7',
    time: 'evening',
    type: 'Foreshadow',
    question: 'My advice for myself tomorrow is ______',
  },
];

export const getRandomContent = () => {
  const early = _.sampleSize(CONTENTS_MORNING, 3);
  const later = _.sampleSize(CONTENTS_EVENING, 3);
  // TODO: uncomment this;
  const isMorningTime = checkIfMorningTime();
  // const isMorningTime = true;

  if (isMorningTime) {
    return [...early, ...later];
  }
  return [...later];
};

export const submission = [
  {
    answer: 'The best supporting actor or actoress in my story today was kik',
    date: '2021-08-16T18:00:00.000Z',
    id: 'ev_5',
    question:
      'The best supporting actor or actoress in my story today was ______',
    type: 'Sidekick',
    uid: 'c7548598-4c7a-4184-8fda-9af98cc3ca5b',
  },

  {
    answer: "Something I'll always want to remember is jikam",
    date: '2021-08-16T18:00:00.000Z',
    id: 'ev_3',
    question: "Something I'll always want to remember is ______",
    type: 'Keepsake',
    uid: '919ee223-1412-432c-a7a0-0774d4f517c6',
  },

  {
    answer: "Something I'll always want to remember is jikam",
    date: '2021-08-15T18:00:00.000Z',
    id: 'ev_3',
    question: "Something I'll always want to remember is ______",
    type: 'Keepsake',
    uid: '919ee223-1412-432c-a7a0-6774d4f517c6',
  },

  {
    answer: "Something I'll always want to remember is jikam",
    date: '2021-08-15T18:00:00.000Z',
    id: 'ev_3',
    question: "Something I'll always want to remember is ______",
    type: 'Keepsake',
    uid: '919ee223-1412-432c-a7a0-6664d4f517c6',
  },

  {
    answer: "Something I'll always want to remember is jikam",
    date: '2021-08-15T18:00:00.000Z',
    id: 'ev_3',
    question: "Something I'll always want to remember is ______",
    type: 'Keepsake',
    uid: '919ee223-1412-432c-a7a0-6884d4f517c6',
  },
];
