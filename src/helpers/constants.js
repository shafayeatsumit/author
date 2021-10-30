import moment from 'moment';

export const allPrompts = [
  {
    id: 'I going to make today important by',
    question: 'I going to make today important by',
  },
  {
    id: 'A completely carefree and lovely moment',
    question: 'A completely carefree and lovely moment',
  },
  {
    id: 'The moment that tells the story of today',
    question: 'The moment that tells the story of today',
  },
  {
    id: 'I felt most like myself today when',
    question: 'I felt most like myself today when',
  },
  {
    id: 'Overly self-critical thoughts that make me enedearingly human are',
    question:
      'Overly self-critical thoughts that make me enedearingly human are',
  },
  {
    id: 'Something unique influencing my world is',
    question: 'Something unique influencing my world is',
  },
  {
    id: 'One person this part of my story owes a thank you to is',
    question: 'One person this part of my story owes a thank you to is',
  },
  {
    id: "The priority that I know I'll have in 20 years is",
    question: "The priority that I know I'll have in 20 years is",
  },
  {id: "I'll look back fondly on", question: "I'll look back fondly on"},
  {
    id: 'One word that could summarize my day is',
    question: 'One word that could summarize my day is',
  },
  {
    id: "Something I'm glad I get to do is",
    question: "Something I'm glad I get to do is",
  },
  {
    id: 'The story of today starts with me',
    question: 'The story of today starts with me',
  },
  {
    id: 'If I had to chose only one thing to do today, it would be',
    question: 'If I had to chose only one thing to do today, it would be',
  },
  {
    id: 'For today to feel like a success',
    question: 'For today to feel like a success',
  },
  {
    id: "Something I'll always want to remember is",
    question: "Something I'll always want to remember is",
  },
  {
    id: "Something that's going well is",
    question: "Something that's going well is",
  },
  {id: "A strong emotion I've felt", question: "A strong emotion I've felt"},
  {
    id: 'Something that will probably never happen the same way again was',
    question:
      'Something that will probably never happen the same way again was',
  },
  {
    id: "A positive aspect of my life that isn't top of mind is",
    question: "A positive aspect of my life that isn't top of mind is",
  },
  {
    id: "To understand my actions lately, you'd need to know",
    question: "To understand my actions lately, you'd need to know",
  },
  {
    id: "An ordinary object that's playing a crucial role in my story is",
    question: "An ordinary object that's playing a crucial role in my story is",
  },
  {
    id: "My story's best supporting actress or actor",
    question: "My story's best supporting actress or actor",
  },
  {
    id: 'Next year, an action I take more often is',
    question: 'Next year, an action I take more often is',
  },
  {
    id: "A current obstacle I'll get past and learn from is",
    question: "A current obstacle I'll get past and learn from is",
  },
  {
    id: 'A moment from my past that helps explain this part of my story is',
    question:
      'A moment from my past that helps explain this part of my story is',
  },
  {
    id: 'A past hardship that gives special meaning to this part of my story is',
    question:
      'A past hardship that gives special meaning to this part of my story is',
  },
  {
    id: "A talent I've acquired along the way that's been useful of late is",
    question:
      "A talent I've acquired along the way that's been useful of late is",
  },
  {
    id: "An unexpected event in my life that's turned out to be positive lately is",
    question:
      "An unexpected event in my life that's turned out to be positive lately is",
  },
  {
    id: "A hard lesson I've come to realize I had to learn the hard way was",
    question:
      "A hard lesson I've come to realize I had to learn the hard way was",
  },
  {
    id: 'Who I was in high school is important to this part of my story because',
    question:
      'Who I was in high school is important to this part of my story because',
  },
  {
    id: "A childhood memory I've had recently that's important to this part of my story is",
    question:
      "A childhood memory I've had recently that's important to this part of my story is",
  },
  {
    id: "An action I could take to drastically alter the course of my life's story is",
    question:
      "An action I could take to drastically alter the course of my life's story is",
  },
  {id: 'The action I have to take', question: 'The action I have to take'},
  {id: 'The advice I need right now', question: 'The advice I need right now'},
  {
    id: 'Something my story needs me to remove is',
    question: 'Something my story needs me to remove is',
  },
  {
    id: "An obligation I don't want and will try ignoring to see what happens is",
    question:
      "An obligation I don't want and will try ignoring to see what happens is",
  },
  {
    id: 'An assumption about the future of my story I need to challenge is',
    question:
      'An assumption about the future of my story I need to challenge is',
  },
  {id: "I'm not supposed to", question: "I'm not supposed to"},
  {
    id: "The tough conversation I'm going to have is",
    question: "The tough conversation I'm going to have is",
  },
  {
    id: 'A common theme in my story right now is',
    question: 'A common theme in my story right now is',
  },
  {
    id: 'As I sleep tonight, I really wish my subconscious would work on',
    question: 'As I sleep tonight, I really wish my subconscious would work on',
  },
  {
    id: 'Something that happened that will make this next month better is',
    question:
      'Something that happened that will make this next month better is',
  },
  {
    id: 'One super important action to take next month is',
    question: 'One super important action to take next month is',
  },
  {
    id: 'An action I took last week that will help me this week was',
    question: 'An action I took last week that will help me this week was',
  },
  {
    id: 'One super important action to take next week is',
    question: 'One super important action to take next week is',
  },
  {
    id: "Some amazingly good luck I've only just realized I got was",
    question: "Some amazingly good luck I've only just realized I got was",
  },
  {
    id: 'The uncomfortable work my story needs me to complete today is',
    question: 'The uncomfortable work my story needs me to complete today is',
  },
  {
    id: "A bad memory I've realized plays an important part in my story is",
    question:
      "A bad memory I've realized plays an important part in my story is",
  },
  {
    id: 'The thing that is within my power to control today is',
    question: 'The thing that is within my power to control today is',
  },
  {
    id: 'A misstep that will help me grow as a person is',
    question: 'A misstep that will help me grow as a person is',
  },
  {id: 'My body is telling me', question: 'My body is telling me'},
  {id: 'I said no to', question: 'I said no to'},
  {id: 'I overcome', question: 'I overcome'},
  {
    id: "The story I'm telling myself that just might not be true is",
    question: "The story I'm telling myself that just might not be true is",
  },
  {
    id: "In a galaxy far far away, there's a version of me",
    question: "In a galaxy far far away, there's a version of me",
  },
  {id: 'And then just when', question: 'And then just when'},
  {
    id: "It's not an exaggeration to say",
    question: "It's not an exaggeration to say",
  },
  {
    id: 'The silver lining on a big cloud in my life is',
    question: 'The silver lining on a big cloud in my life is',
  },
  {
    id: "The action I took last week that's paying off this week is",
    question: "The action I took last week that's paying off this week is",
  },
  {
    id: "Some great advice I've been given",
    question: "Some great advice I've been given",
  },
  {id: 'A win from today was', question: 'A win from today was'},
  {id: 'I am unwilling to accept', question: 'I am unwilling to accept'},
  {
    id: 'Something that is within my control to push forward is',
    question: 'Something that is within my control to push forward is',
  },
  {
    id: 'Today will be better than yesterday because',
    question: 'Today will be better than yesterday because',
  },
  {
    id: 'Something I did today that I should do more of tomorrow is',
    question: 'Something I did today that I should do more of tomorrow is',
  },
  {
    id: 'The most common activity today was',
    question: 'The most common activity today was',
  },
  {
    id: 'Something I did today that I should do less of tomorrow is',
    question: 'Something I did today that I should do less of tomorrow is',
  },
  {
    id: 'A past effort that paid off today was',
    question: 'A past effort that paid off today was',
  },
  {
    id: 'I really need someone to invent',
    question: 'I really need someone to invent',
  },
  {
    id: 'A shower thought I had recently',
    question: 'A shower thought I had recently',
  },
  {
    id: 'The day dream that is worth immortalizing',
    question: 'The day dream that is worth immortalizing',
  },
  {id: 'Yeah, but', question: 'Yeah, but'},
  {id: 'I keep putting off', question: 'I keep putting off'},
  {
    id: 'Something that is outside my control',
    question: 'Something that is outside my control',
  },
  {id: 'My mood is', question: 'My mood is'},
  {
    id: "Something I won't believe when I reread it is",
    question: "Something I won't believe when I reread it is",
  },
  {
    id: "I wonder how I'll eventually feel about",
    question: "I wonder how I'll eventually feel about",
  },
  {id: 'I wish I was a little bit', question: 'I wish I was a little bit'},
  {id: 'I suck at', question: 'I suck at'},
  {
    id: 'People not being able to mind read is a good thing because',
    question: 'People not being able to mind read is a good thing because',
  },
  {id: 'If I got a dime everytime', question: 'If I got a dime everytime'},
  {id: 'Future me, please forgive', question: 'Future me, please forgive'},
  {
    id: "If my best friend made my next decision, I'd",
    question: "If my best friend made my next decision, I'd",
  },
  {id: "I've never understood", question: "I've never understood"},
  {
    id: 'The major setting for my story is',
    question: 'The major setting for my story is',
  },
  {
    id: "The place where I'm writing is",
    question: "The place where I'm writing is",
  },
  {id: 'An emotion I want', question: 'An emotion I want'},
  {id: 'Today needs to start with', question: 'Today needs to start with'},
  {
    id: "An obstacle I'll overcome today is",
    question: "An obstacle I'll overcome today is",
  },
  {
    id: 'I handle moments like this in the future by',
    question: 'I handle moments like this in the future by',
  },
  {
    id: 'My advice for myself tomorrow is',
    question: 'My advice for myself tomorrow is',
  },
  {
    id: 'In this moment, I move my story forward by',
    question: 'In this moment, I move my story forward by',
  },
  {id: 'It got weird when', question: 'It got weird when'},
  {
    id: "Something I learned that I'll want to be reminded of in the future is",
    question:
      "Something I learned that I'll want to be reminded of in the future is",
  },
  {
    id: "Something I'll write down and then be able to forget about is",
    question: "Something I'll write down and then be able to forget about is",
  },
  {
    id: "Advice that I'll want to give myself in the future is",
    question: "Advice that I'll want to give myself in the future is",
  },
  {id: 'Today takes place', question: 'Today takes place'},
  {id: 'A beautiful sight was', question: 'A beautiful sight was'},
  {id: 'I overcame', question: 'I overcame'},
  {id: 'Fun was had when', question: 'Fun was had when'},
  {
    id: "When I reread this, I'll have a hard believing",
    question: "When I reread this, I'll have a hard believing",
  },
  {
    id: 'Some good luck that went my way was',
    question: 'Some good luck that went my way was',
  },
  {id: 'Something that paid off was', question: 'Something that paid off was'},
  {
    id: 'I should thank the inventor of',
    question: 'I should thank the inventor of',
  },
  {
    id: 'My next daydream should feature',
    question: 'My next daydream should feature',
  },
  {
    id: "I don't know why other people keep",
    question: "I don't know why other people keep",
  },
  {
    id: 'The only thing keeping this moment from being perfect',
    question: 'The only thing keeping this moment from being perfect',
  },
  {
    id: 'The most vivid image from today is',
    question: 'The most vivid image from today is',
  },
  {
    id: 'I need to give myself permission',
    question: 'I need to give myself permission',
  },
  {
    id: 'The biggest obstacle I face is',
    question: 'The biggest obstacle I face is',
  },
  {
    id: 'Some bad luck that turned into good luck was',
    question: 'Some bad luck that turned into good luck was',
  },
  {id: 'The voices in my head', question: 'The voices in my head'},
  {id: 'My story wants me to', question: 'My story wants me to'},
  {
    id: "Something I'm sad won't be around later on in my story is",
    question: "Something I'm sad won't be around later on in my story is",
  },
  {
    id: 'My story will be just fine if I let myself',
    question: 'My story will be just fine if I let myself',
  },
  {
    id: 'My story wants me to celebrate',
    question: 'My story wants me to celebrate',
  },
  {
    id: "It's ok that right now I don't know",
    question: "It's ok that right now I don't know",
  },
  {
    id: "In the future, I'd want to remind myself",
    question: "In the future, I'd want to remind myself",
  },
  {id: 'The look on my face is', question: 'The look on my face is'},
  {
    id: "Future me's advice for this moment would be",
    question: "Future me's advice for this moment would be",
  },
  {id: "If it weren't illegal,", question: "If it weren't illegal,"},
  {
    id: "Right now, I don't have to know",
    question: "Right now, I don't have to know",
  },
  {
    id: "if my best friend was a super power, they're super power would be",
    question:
      "if my best friend was a super power, they're super power would be",
  },
  {id: 'my spirit animal is', question: 'my spirit animal is'},
  {
    id: "If I really didn't limit or edit myself, I'd write about",
    question: "If I really didn't limit or edit myself, I'd write about",
  },
  {
    id: 'If the world ended tomorrow,',
    question: 'If the world ended tomorrow,',
  },
  {id: 'My body needs me to', question: 'My body needs me to'},
  {
    id: "I'll probably feel differently than I do know when",
    question: "I'll probably feel differently than I do know when",
  },
  {
    id: "The frustration I feel today that I'll look back on humorously is",
    question:
      "The frustration I feel today that I'll look back on humorously is",
  },
  {
    id: 'If the person who makes you feel best was here with you, you two would',
    question:
      'If the person who makes you feel best was here with you, you two would',
  },
  {
    id: "Looking back from tomorrow, I'll be glad that today I",
    question: "Looking back from tomorrow, I'll be glad that today I",
  },
  {
    id: 'If today was a chapter in the story of my life',
    question: 'If today was a chapter in the story of my life',
  },
  {
    id: "I'm actively making myself miserable by",
    question: "I'm actively making myself miserable by",
  },
  {
    id: 'Something I did for someone else',
    question: 'Something I did for someone else',
  },
  {id: 'Remember the', question: 'Remember the'},
  {id: 'Yes, and', question: 'Yes, and'},
  {id: 'There is a person thinking', question: 'There is a person thinking'},
  {id: 'Ignore the', question: 'Ignore the'},
  {
    id: 'Moments like this would normally',
    question: 'Moments like this would normally',
  },
  {
    id: "I imagine if another person were in my shoes right now, they'd",
    question: "I imagine if another person were in my shoes right now, they'd",
  },
  {
    id: 'The three words that describe exactly how I feel right now are',
    question: 'The three words that describe exactly how I feel right now are',
  },
  {
    id: "The unique aspect of this moment I'm missing is",
    question: "The unique aspect of this moment I'm missing is",
  },
  {
    id: 'If you got to live this exact moment over, what would you do the second time',
    question:
      'If you got to live this exact moment over, what would you do the second time',
  },
  {
    id: 'The superhuman power I need right now is',
    question: 'The superhuman power I need right now is',
  },
  {
    id: 'If my best friend chose what I did today,',
    question: 'If my best friend chose what I did today,',
  },
  {id: "I'd be happy if I never", question: "I'd be happy if I never"},
  {
    id: 'The Halloween costume most appropriate for this moment',
    question: 'The Halloween costume most appropriate for this moment',
  },
  {id: "I'm going to not care about", question: "I'm going to not care about"},
  {
    id: 'If I had to chose something in the room to take with me everywhere,',
    question:
      'If I had to chose something in the room to take with me everywhere,',
  },
  {
    id: 'I have no idea how other people',
    question: 'I have no idea how other people',
  },
  {id: 'Bananas', question: 'Bananas'},
  {
    id: 'The barista looked up from the coffee machine',
    question: 'The barista looked up from the coffee machine',
  },
  {
    id: 'If I could make a law everyone had to follow it would be',
    question: 'If I could make a law everyone had to follow it would be',
  },
  {id: "I'd uninvent", question: "I'd uninvent"},
  {
    id: "If I were one of the founding members of Mars, I'd make sure",
    question: "If I were one of the founding members of Mars, I'd make sure",
  },
  {
    id: 'Next time, I get lost in thought',
    question: 'Next time, I get lost in thought',
  },
  {id: "What if I didn't", question: "What if I didn't"},
  {id: 'How about I', question: 'How about I'},
  {id: "An action I'm proud of", question: "An action I'm proud of"},
  {id: "It's completely not helpful", question: "It's completely not helpful"},
  {
    id: 'The villian in my story today',
    question: 'The villian in my story today',
  },
  {
    id: 'Something completely random is',
    question: 'Something completely random is',
  },
  {id: "I'm absolutely amazed that", question: "I'm absolutely amazed that"},
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
