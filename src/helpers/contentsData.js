import _ from 'lodash';

export const CONTENTS = [
  {
    id: '1',
    type: 'Title',
    question:
      'If the upcoming day was a chapter in my story, the title would be ______',
  },
  {
    id: '2',
    type: 'One Thing',
    question: 'The action my story needs me to take is ______',
  },
  {
    id: '3',
    type: 'Investment',
    question: "An investment I'll make in the future of my story is ______",
  },
  {
    id: '4',
    type: 'Cameo',
    question: "I'll play a supporting role in ______'s story",
  },
  {
    id: '5',
    type: 'Advice',
    question: "Future me's advice for today would be ______",
  },
  {
    id: '6',
    type: 'Growth',
    question: "A hurdle I'll face that will help me grow as a person is ______",
  },
  {
    id: '7',
    type: 'Purpose',
    question: 'Today is important to my story because ______',
  },
  {
    id: '8',
    type: 'Temptation',
    question: "If I avoid ______, today's story will be better",
  },
  {
    id: '9',
    type: 'Challenge',
    question:
      'A challenge I can accept that will make me better than I was yesterday is ______',
  },
  {
    id: '10',
    type: 'Guide',
    question: 'A value that can guide me is ______',
  },
  {
    id: '11',
    type: 'Word',
    question: 'One word that could summarize my day is ______',
  },
  {
    id: '12',
    type: 'Gratitude',
    question: 'Something that is going well right now is ______',
  },
  {
    id: '13',
    type: 'Triumph',
    question: 'I can celebrate ______',
  },
];

export const getRandomContent = () => _.sampleSize(CONTENTS, 8);
