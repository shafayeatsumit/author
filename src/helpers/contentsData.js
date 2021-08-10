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
    type: 'One Thing',
    time: 'morning',
    question: 'The action my story needs me to take is ______',
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
    type: 'Growth',
    time: 'morning',
    question: "A hurdle I'll face that will help me grow as a person is ______",
  },
  {
    id: 'mo_7',
    type: 'Purpose',
    time: 'morning',
    question: 'Today is important to my story because ______',
  },
  {
    id: 'mo_8',
    type: 'Mandate',
    time: 'morning',
    question: 'Today, I am unwilling to accept ______',
  },
  {
    id: 'mo_9',
    type: 'Challenge',
    time: 'morning',
    question:
      'A challenge I can accept that will make me better than I was yesterday is ______',
  },
  {
    id: 'mo_10',
    type: 'Guide',
    time: 'morning',
    question: 'A value that can guide me is ______',
  },
  {
    id: 'mo_11',
    type: 'Word',
    time: 'morning',
    question: 'One word that could summarize my day is ______',
  },
  {
    id: 'mo_12',
    type: 'Gratitude',
    time: 'morning',
    question: 'Something that is going well right now is ______',
  },
  {
    id: 'mo_14',
    type: 'Mindset',
    time: 'morning',
    question: 'The thoughts that I need today are ______',
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
    id: 'ev_3',
    time: 'evening',
    type: 'Highlight',
    question: 'The highlight of the day was ______',
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
    id: 'ev_6',
    time: 'evening',
    type: 'Levity',
    question: "Something silly I did that reminds me I'm human is ______",
  },
  {
    id: 'ev_7',
    time: 'evening',
    type: 'Grace',
    question: 'A completely carefree and lovely moment was ______',
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
