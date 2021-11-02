import moment from 'moment';

export const allPrompts = [
  {id: 'The next time I ________', question: 'The next time I ________'},
  {
    id: '________ was hard, but I got through it',
    question: '________ was hard, but I got through it',
  },
  {
    id: 'I wonder if other people ________ just like I do',
    question: 'I wonder if other people ________ just like I do',
  },
];

const MonthName = moment().format('MMMM');
export const introPrompts = [
  {
    id: 'intro_1',
    question: 'I going to make today important by',
  },
  {
    id: 'intro_2',
    question: 'A completely carefree and lovely moment was',
  },
  {
    id: 'intro_3',
    question: 'The moment that tells the story of today was',
  },
  {
    id: 'intro_4',
    question: 'I felt most like myself today when',
  },
  {
    id: 'intro_5',
    question:
      'Overly self-critical thoughts that make me enedearingly human are',
  },
  {
    id: 'intro_6',
    question: 'Something unique influencing my world is',
  },
  {
    id: 'intro_7',
    question: 'One person this part of my story owes a thank you to is',
  },
  {
    id: 'intro_8',
    question:
      "The priority that I know I'll have in 20 years and is relevant today is",
  },
  {
    id: 'intro_9',
    question: "I'll look back fondly on",
  },
  {
    id: 'intro_10',
    question: 'I dedicate this writing to',
    type: 'dedicate',
  },
  {
    id: 'intro_11',
    question: `If the rest of ${MonthName} was a chapter in the story of my life, I'd title it`,
    type: 'title',
  },
];
