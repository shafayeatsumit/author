import moment from 'moment';

export const allPrompts = [
  {
    id: "A positive aspect of my life that isn't top of mind is ________",
    question: "A positive aspect of my life that isn't top of mind is ________",
  },
  {
    id: 'I dedicate all the following writing to ________',
    question: 'I dedicate all the following writing to ________',
  },
  {id: 'Today takes place ________', question: 'Today takes place ________'},
  {
    id: "If today was a chapter in my life's story, I'd title it ________",
    question:
      "If today was a chapter in my life's story, I'd title it ________",
  },
  {
    id: 'I want tomorrow to start with ________',
    question: 'I want tomorrow to start with ________',
  },
  {
    id: "If I just didn't edit myself at all, the next thing I'd say is ________",
    question:
      "If I just didn't edit myself at all, the next thing I'd say is ________",
  },
  {
    id: 'The barista looked up from the coffee machine ________',
    question: 'The barista looked up from the coffee machine ________',
  },
  {
    id: 'If you got to live today two times, this first time, I would ________',
    question:
      'If you got to live today two times, this first time, I would ________',
  },
  {
    id: 'A moment from my past that helps explain this part of my story is ________',
    question:
      'A moment from my past that helps explain this part of my story is ________',
  },
  {
    id: "An ordinary object that's playing a role in my life right now is ________",
    question:
      "An ordinary object that's playing a role in my life right now is ________",
  },
  {id: "I've learned ________", question: "I've learned ________"},
  {
    id: 'An action I took last week that will help me this week was ________',
    question:
      'An action I took last week that will help me this week was ________',
  },
  {
    id: "A hard lesson I've come to realize I had to learn the hard way was ________",
    question:
      "A hard lesson I've come to realize I had to learn the hard way was ________",
  },
  {
    id: "When I reread this, I'll have a hard believing ________",
    question: "When I reread this, I'll have a hard believing ________",
  },
  {id: 'It got weird when ________', question: 'It got weird when ________'},
  {
    id: 'The thing that is within my power to control today is ________',
    question: 'The thing that is within my power to control today is ________',
  },
  {
    id: 'The story of today starts with me ________',
    question: 'The story of today starts with me ________',
  },
  {id: 'Kids these days ________', question: 'Kids these days ________'},
  {id: 'Thank you, but ________', question: 'Thank you, but ________'},
  {
    id: "Some great advice I've been given ________",
    question: "Some great advice I've been given ________",
  },
  {
    id: 'There is a person thinking ________',
    question: 'There is a person thinking ________',
  },
  {
    id: "A bad memory I've realized plays an important part in my story is ________",
    question:
      "A bad memory I've realized plays an important part in my story is ________",
  },
  {
    id: 'The only thing keeping this moment from being perfect ________',
    question: 'The only thing keeping this moment from being perfect ________',
  },
  {id: 'Fun was had when ________', question: 'Fun was had when ________'},
  {id: 'All the sudden, I ________', question: 'All the sudden, I ________'},
  {
    id: "Something I learned that I'll want to be reminded of in the future is ________",
    question:
      "Something I learned that I'll want to be reminded of in the future is ________",
  },
  {
    id: "Something I don't get ________",
    question: "Something I don't get ________",
  },
  {id: 'Yes, and ________', question: 'Yes, and ________'},
  {
    id: 'If the world ended tomorrow, ________',
    question: 'If the world ended tomorrow, ________',
  },
  {
    id: 'I had a thought recently that ________',
    question: 'I had a thought recently that ________',
  },
  {
    id: "It's completely not helpful ________",
    question: "It's completely not helpful ________",
  },
  {
    id: "No, I'm not going to ________",
    question: "No, I'm not going to ________",
  },
  {
    id: "Something I'm glad I get to do is ________",
    question: "Something I'm glad I get to do is ________",
  },
  {
    id: 'Today will be better than yesterday because ________',
    question: 'Today will be better than yesterday because ________',
  },
  {
    id: 'Next time, I get lost in thought ________',
    question: 'Next time, I get lost in thought ________',
  },
  {id: 'I laughed when ________', question: 'I laughed when ________'},
  {
    id: "If it weren't illegal, ________",
    question: "If it weren't illegal, ________",
  },
  {
    id: 'If my best friend had a super power, it would be ________',
    question: 'If my best friend had a super power, it would be ________',
  },
  {id: 'An emotion I want ________', question: 'An emotion I want ________'},
  {
    id: "Looking back from tomorrow, I'll be glad that today I ________",
    question: "Looking back from tomorrow, I'll be glad that today I ________",
  },
  {
    id: 'A past effort that paid off today was ________',
    question: 'A past effort that paid off today was ________',
  },
  {
    id: 'I find it reasonable that ________',
    question: 'I find it reasonable that ________',
  },
  {
    id: 'Something completely random is ________',
    question: 'Something completely random is ________',
  },
  {
    id: 'One word that could summarize my day is ________',
    question: 'One word that could summarize my day is ________',
  },
  {id: 'I overcame ________', question: 'I overcame ________'},
  {
    id: 'My story will be just fine if I let myself ________',
    question: 'My story will be just fine if I let myself ________',
  },
  {
    id: "It's totally fine I suck at ________",
    question: "It's totally fine I suck at ________",
  },
  {
    id: "I've never understood ________",
    question: "I've never understood ________",
  },
  {
    id: 'Future me, please forgive ________',
    question: 'Future me, please forgive ________',
  },
  {
    id: 'A completely carefree and lovely moment ________',
    question: 'A completely carefree and lovely moment ________',
  },
  {
    id: "An assumption I'm making about the future that I need to challenge is ________",
    question:
      "An assumption I'm making about the future that I need to challenge is ________",
  },
  {
    id: 'My body needs me to ________',
    question: 'My body needs me to ________',
  },
  {
    id: "Future me's advice for this moment would be ________",
    question: "Future me's advice for this moment would be ________",
  },
  {
    id: 'If I had to chose only one thing to do today, it would be ________',
    question:
      'If I had to chose only one thing to do today, it would be ________',
  },
  {
    id: "A strong emotion I've felt ________",
    question: "A strong emotion I've felt ________",
  },
  {
    id: "It's not an exaggeration to say ________",
    question: "It's not an exaggeration to say ________",
  },
  {
    id: 'The Halloween costume most appropriate for this moment ________',
    question: 'The Halloween costume most appropriate for this moment ________',
  },
  {
    id: 'I really need someone to invent ________',
    question: 'I really need someone to invent ________',
  },
  {
    id: 'The moment that tells the story of today ________',
    question: 'The moment that tells the story of today ________',
  },
  {
    id: "It's my kind of crazy when ________",
    question: "It's my kind of crazy when ________",
  },
  {id: "What if I didn't ________", question: "What if I didn't ________"},
  {
    id: "To understand my actions lately, you'd need to know ________",
    question: "To understand my actions lately, you'd need to know ________",
  },
  {
    id: 'The most common activity today was ________',
    question: 'The most common activity today was ________',
  },
  {
    id: 'Fastforward, and now I am ________',
    question: 'Fastforward, and now I am ________',
  },
  {
    id: "I'm walking down an orange tree lined street in Spain, and then ________",
    question:
      "I'm walking down an orange tree lined street in Spain, and then ________",
  },
  {id: "No thank you, I'll ________", question: "No thank you, I'll ________"},
  {
    id: "Right now, it's ok that I don't know ________",
    question: "Right now, it's ok that I don't know ________",
  },
  {
    id: 'The three words that describe exactly how I feel right now are ________',
    question:
      'The three words that describe exactly how I feel right now are ________',
  },
  {
    id: "I don't know why other people keep ________",
    question: "I don't know why other people keep ________",
  },
  {
    id: 'The most vivid image from today is ________',
    question: 'The most vivid image from today is ________',
  },
  {id: 'Bananas make me ________', question: 'Bananas make me ________'},
  {
    id: "If I really didn't limit or edit myself, I'd write about ________",
    question:
      "If I really didn't limit or edit myself, I'd write about ________",
  },
  {
    id: 'Something that will probably never happen the same way again was ________',
    question:
      'Something that will probably never happen the same way again was ________',
  },
  {
    id: "There is no way I won't ________",
    question: "There is no way I won't ________",
  },
  {
    id: 'The villian in my story today ________',
    question: 'The villian in my story today ________',
  },
  {
    id: "I'm going to not care about ________",
    question: "I'm going to not care about ________",
  },
  {
    id: "In a galaxy far far away, there's a version of me ________",
    question: "In a galaxy far far away, there's a version of me ________",
  },
  {
    id: "I imagine if another person were in my shoes right now, they'd ________",
    question:
      "I imagine if another person were in my shoes right now, they'd ________",
  },
  {
    id: 'Next year, an action I take more often is ________',
    question: 'Next year, an action I take more often is ________',
  },
  {
    id: "An obstacle I'll overcome today is ________",
    question: "An obstacle I'll overcome today is ________",
  },
  {
    id: 'Something I did today that I should do more of tomorrow is ________',
    question:
      'Something I did today that I should do more of tomorrow is ________',
  },
  {
    id: "Yeah, well what if I didn't ________",
    question: "Yeah, well what if I didn't ________",
  },
  {
    id: "It's not really going to be the end of the world, if ________",
    question: "It's not really going to be the end of the world, if ________",
  },
  {id: 'I said no to ________', question: 'I said no to ________'},
  {
    id: 'Just give me an orange, and ________',
    question: 'Just give me an orange, and ________',
  },
  {id: 'I can avoid ________', question: 'I can avoid ________'},
  {
    id: "I'll probably never understand why ________",
    question: "I'll probably never understand why ________",
  },
  {
    id: 'A common theme in my story right now is ________',
    question: 'A common theme in my story right now is ________',
  },
  {
    id: 'In this moment, I move my story forward by ________',
    question: 'In this moment, I move my story forward by ________',
  },
  {
    id: 'If I was given the power to do anything in Italy, I would ________',
    question:
      'If I was given the power to do anything in Italy, I would ________',
  },
  {
    id: '________ actually happened. I was there',
    question: '________ actually happened. I was there',
  },
  {
    id: "Advice that I'll want to give myself in the future is ________",
    question: "Advice that I'll want to give myself in the future is ________",
  },
  {
    id: "The unique aspect of this moment I'm missing is ________",
    question: "The unique aspect of this moment I'm missing is ________",
  },
  {
    id: 'An assumption about the immediate future that might not be true is ________',
    question:
      'An assumption about the immediate future that might not be true is ________',
  },
  {
    id: "If my best friend made my next decision, I'd ________",
    question: "If my best friend made my next decision, I'd ________",
  },
  {
    id: 'The voices in my head ________',
    question: 'The voices in my head ________',
  },
  {
    id: 'If I zoom out and think about the entire year, I can see that today ________',
    question:
      'If I zoom out and think about the entire year, I can see that today ________',
  },
  {
    id: "In the future, I'd want to remind myself ________",
    question: "In the future, I'd want to remind myself ________",
  },
  {
    id: 'Some good luck that went my way was ________',
    question: 'Some good luck that went my way was ________',
  },
  {
    id: 'I felt most like myself today when ________',
    question: 'I felt most like myself today when ________',
  },
  {
    id: 'The uncomfortable work my story needs me to complete today is ________',
    question:
      'The uncomfortable work my story needs me to complete today is ________',
  },
  {
    id: 'The action I have to take ________',
    question: 'The action I have to take ________',
  },
  {
    id: "The action I took last week that's paying off this week is ________",
    question:
      "The action I took last week that's paying off this week is ________",
  },
  {
    id: "An action I'm proud of ________",
    question: "An action I'm proud of ________",
  },
  {
    id: "I wonder how I'll eventually feel about ________",
    question: "I wonder how I'll eventually feel about ________",
  },
  {
    id: 'Who I was in high school is important to this part of my story because ________',
    question:
      'Who I was in high school is important to this part of my story because ________',
  },
  {id: 'Well, of course ________', question: 'Well, of course ________'},
  {
    id: 'Something that paid off was ________',
    question: 'Something that paid off was ________',
  },
  {
    id: 'If I got a dime everytime ________',
    question: 'If I got a dime everytime ________',
  },
  {
    id: "An unexpected event in my life that's turned out to be positive lately is ________",
    question:
      "An unexpected event in my life that's turned out to be positive lately is ________",
  },
  {
    id: "My story's best supporting actress or actor ________",
    question: "My story's best supporting actress or actor ________",
  },
  {
    id: "A talent I've acquired along the way that's been useful of late is ________",
    question:
      "A talent I've acquired along the way that's been useful of late is ________",
  },
  {id: 'I overcome ________', question: 'I overcome ________'},
  {
    id: "Something I'm sad won't be around later on in my story is ________",
    question:
      "Something I'm sad won't be around later on in my story is ________",
  },
  {
    id: 'A beautiful sight was ________',
    question: 'A beautiful sight was ________',
  },
  {
    id: "The app I'm going to delete from my phone is ________",
    question: "The app I'm going to delete from my phone is ________",
  },
  {
    id: "I'm not supposed to ________",
    question: "I'm not supposed to ________",
  },
  {
    id: 'I handle moments like this in the future by ________',
    question: 'I handle moments like this in the future by ________',
  },
  {
    id: 'I wish I was a little bit ________',
    question: 'I wish I was a little bit ________',
  },
  {
    id: 'Negativity my brain just keeps producing ________',
    question: 'Negativity my brain just keeps producing ________',
  },
  {
    id: 'Something my story needs me to remove is ________',
    question: 'Something my story needs me to remove is ________',
  },
  {
    id: 'People not being able to mind read is a good thing because ________',
    question:
      'People not being able to mind read is a good thing because ________',
  },
  {id: 'How about I ________', question: 'How about I ________'},
  {
    id: 'One super important action to take next month is ________',
    question: 'One super important action to take next month is ________',
  },
  {
    id: "I don't need to know ________",
    question: "I don't need to know ________",
  },
  {
    id: 'If the person who makes you feel best was here with you, you two would ________',
    question:
      'If the person who makes you feel best was here with you, you two would ________',
  },
  {
    id: 'Something that is within my control to push forward is ________',
    question: 'Something that is within my control to push forward is ________',
  },
  {
    id: 'If my life was a play, the stage would look like ________',
    question: 'If my life was a play, the stage would look like ________',
  },
  {id: 'And then just when ________', question: 'And then just when ________'},
  {
    id: "The frustration I feel today that I'll look back on humorously is ________",
    question:
      "The frustration I feel today that I'll look back on humorously is ________",
  },
  {
    id: 'Something unique influencing my world is ________',
    question: 'Something unique influencing my world is ________',
  },
  {
    id: "If I were one of the founding members of Mars, I'd make sure ________",
    question:
      "If I were one of the founding members of Mars, I'd make sure ________",
  },
  {
    id: 'Give me a good book ________',
    question: 'Give me a good book ________',
  },
  {id: 'I accidentally ________', question: 'I accidentally ________'},
  {
    id: 'My story wants me to celebrate ________',
    question: 'My story wants me to celebrate ________',
  },
  {
    id: 'My next daydream should feature ________',
    question: 'My next daydream should feature ________',
  },
  {
    id: 'The last time I saw a horse ________',
    question: 'The last time I saw a horse ________',
  },
  {
    id: 'Some bad luck that turned into good luck was ________',
    question: 'Some bad luck that turned into good luck was ________',
  },
  {
    id: 'My spirit animal is ________',
    question: 'My spirit animal is ________',
  },
  {
    id: 'I need to give myself permission ________',
    question: 'I need to give myself permission ________',
  },
  {
    id: 'A shower thought I had recently ________',
    question: 'A shower thought I had recently ________',
  },
  {
    id: "An action I could take to drastically alter the course of my life's story is ________",
    question:
      "An action I could take to drastically alter the course of my life's story is ________",
  },
  {
    id: "I realize it wasn't funny, but ________",
    question: "I realize it wasn't funny, but ________",
  },
  {id: 'Yeah, but ________', question: 'Yeah, but ________'},
  {
    id: 'I should thank the inventor of ________',
    question: 'I should thank the inventor of ________',
  },
  {
    id: 'Something I think is absolute magic is ________',
    question: 'Something I think is absolute magic is ________',
  },
  {
    id: "Something I'll write down and then be able to forget about is ________",
    question:
      "Something I'll write down and then be able to forget about is ________",
  },
  {id: 'In Scotland, they ________', question: 'In Scotland, they ________'},
  {
    id: 'Something I did today that I should do less of tomorrow is ________',
    question:
      'Something I did today that I should do less of tomorrow is ________',
  },
  {id: 'Ignore the ________', question: 'Ignore the ________'},
  {
    id: 'As I sleep tonight, I really wish my subconscious would work on ________',
    question:
      'As I sleep tonight, I really wish my subconscious would work on ________',
  },
  {
    id: 'Something I did for someone else ________',
    question: 'Something I did for someone else ________',
  },
  {id: 'Remember the ________', question: 'Remember the ________'},
  {
    id: 'My body is telling me to ________',
    question: 'My body is telling me to ________',
  },
  {
    id: 'I need to realize that ________',
    question: 'I need to realize that ________',
  },
  {
    id: 'I can still remember the smell ________',
    question: 'I can still remember the smell ________',
  },
  {id: 'Why do they say ________', question: 'Why do they say ________'},
  {
    id: 'Naturally, when push comes to shove, I ________',
    question: 'Naturally, when push comes to shove, I ________',
  },
  {
    id: "An obligation I don't want and will try ignoring to see what happens is ________",
    question:
      "An obligation I don't want and will try ignoring to see what happens is ________",
  },
  {
    id: 'A misstep that will help me grow as a person is ________',
    question: 'A misstep that will help me grow as a person is ________',
  },
  {
    id: 'If you were me and I was you, then ________',
    question: 'If you were me and I was you, then ________',
  },
  {
    id: 'If my best friend chose what I did today, ________',
    question: 'If my best friend chose what I did today, ________',
  },
  {
    id: 'I am unwilling to accept ________',
    question: 'I am unwilling to accept ________',
  },
  {
    id: 'A younger me would be amazed that ________',
    question: 'A younger me would be amazed that ________',
  },
  {
    id: 'The look on my face is ________',
    question: 'The look on my face is ________',
  },
  {
    id: "The story I'm telling myself about the future that just might not be true is ________",
    question:
      "The story I'm telling myself about the future that just might not be true is ________",
  },
  {
    id: "I'll figure out how to deal if ________",
    question: "I'll figure out how to deal if ________",
  },
  {
    id: 'If I had to chose something in the room to take with me everywhere, ________',
    question:
      'If I had to chose something in the room to take with me everywhere, ________',
  },
  {
    id: 'The advice I need right now ________',
    question: 'The advice I need right now ________',
  },
  {
    id: "When I'm older I hope I'll finally understand ________",
    question: "When I'm older I hope I'll finally understand ________",
  },
  {
    id: "An action I can take towards a priority I'll have in 20 years is ________",
    question:
      "An action I can take towards a priority I'll have in 20 years is ________",
  },
  {
    id: "A childhood memory that's important to this part of my story is ________",
    question:
      "A childhood memory that's important to this part of my story is ________",
  },
  {
    id: "I'll look back fondly on ________",
    question: "I'll look back fondly on ________",
  },
  {
    id: 'The end of this sentence ________',
    question: 'The end of this sentence ________',
  },
  {
    id: 'My story wants me to ________',
    question: 'My story wants me to ________',
  },
  {
    id: "A current obstacle I'll get past and learn from is ________",
    question: "A current obstacle I'll get past and learn from is ________",
  },
  {
    id: 'For today to feel like a success ________',
    question: 'For today to feel like a success ________',
  },
  {
    id: 'I make myself miserable by ________',
    question: 'I make myself miserable by ________',
  },
  {
    id: 'Something that is outside my control ________',
    question: 'Something that is outside my control ________',
  },
  {
    id: 'A win from today was ________',
    question: 'A win from today was ________',
  },
  {
    id: 'I going to make the rest of today important by ________',
    question: 'I going to make the rest of today important by ________',
  },
  {
    id: 'The biggest obstacle I face is ________',
    question: 'The biggest obstacle I face is ________',
  },
  {
    id: "The medal in the Olympics I'd most enjoy winning ________",
    question: "The medal in the Olympics I'd most enjoy winning ________",
  },
  {
    id: "The place where I'm writing is ________",
    question: "The place where I'm writing is ________",
  },
  {
    id: 'The silver lining on a cloud in my life is ________',
    question: 'The silver lining on a cloud in my life is ________',
  },
  {
    id: 'The superhuman power I need right now is ________',
    question: 'The superhuman power I need right now is ________',
  },
  {
    id: "I'd be happy if I never ________",
    question: "I'd be happy if I never ________",
  },
  {
    id: "Something that's going well is ________",
    question: "Something that's going well is ________",
  },
  {
    id: 'One super important action to take next week is ________',
    question: 'One super important action to take next week is ________',
  },
  {
    id: "I'll probably feel differently than I do now when ________",
    question: "I'll probably feel differently than I do now when ________",
  },
  {id: "I'd uninvent ________", question: "I'd uninvent ________"},
  {
    id: "It's ok that right now I don't know ________",
    question: "It's ok that right now I don't know ________",
  },
  {
    id: 'Moments like this would normally ________',
    question: 'Moments like this would normally ________',
  },
  {
    id: 'One person this part of my story owes a thank you to is ________',
    question:
      'One person this part of my story owes a thank you to is ________',
  },
  {
    id: 'The day dream that is worth remembering forever is ________',
    question: 'The day dream that is worth remembering forever is ________',
  },
  {
    id: "Some amazingly good luck I've only just realized I got was ________",
    question:
      "Some amazingly good luck I've only just realized I got was ________",
  },
  {id: 'My mood is ________', question: 'My mood is ________'},
  {
    id: "I'm absolutely amazed that ________",
    question: "I'm absolutely amazed that ________",
  },
  {
    id: 'My advice for myself tomorrow is ________',
    question: 'My advice for myself tomorrow is ________',
  },
  {
    id: 'A past hardship that gives special meaning to this part of my story is ________',
    question:
      'A past hardship that gives special meaning to this part of my story is ________',
  },
  {
    id: "Something I'll always want to remember is ________",
    question: "Something I'll always want to remember is ________",
  },
  {id: 'Just this one time ________', question: 'Just this one time ________'},
  {
    id: 'I have no idea how other people ________',
    question: 'I have no idea how other people ________',
  },
  {
    id: 'Something that happened that will make this next month better is ________',
    question:
      'Something that happened that will make this next month better is ________',
  },
  {
    id: 'If I could make a law everyone had to follow it would be ________',
    question:
      'If I could make a law everyone had to follow it would be ________',
  },
  {
    id: 'Overly self-critical thoughts that make me enedearingly human are ________',
    question:
      'Overly self-critical thoughts that make me enedearingly human are ________',
  },
  {
    id: 'A timemachine would ________',
    question: 'A timemachine would ________',
  },
  {
    id: "Of course, I'd use wings to ________",
    question: "Of course, I'd use wings to ________",
  },
  {
    id: 'A word I just made up is ________',
    question: 'A word I just made up is ________',
  },
  {
    id: 'I hope someone invents ________',
    question: 'I hope someone invents ________',
  },
  {
    id: "If the rest of {month} was a chapter in the story of my life, I'd title it ________",
    question:
      "If the rest of {month} was a chapter in the story of my life, I'd title it ________",
  },
  {
    id: "________ doesn't really happen all the time like I think it does",
    question:
      "________ doesn't really happen all the time like I think it does",
  },
  {
    id: "There's a maple tree, a fully loaded Volvo, and most importantly ________",
    question:
      "There's a maple tree, a fully loaded Volvo, and most importantly ________",
  },
  {
    id: "The world isn't going to end when I ________.",
    question: "The world isn't going to end when I ________.",
  },
  {
    id: "I probably don't need to take ________ personally.",
    question: "I probably don't need to take ________ personally.",
  },
  {id: "________ wasn't about me", question: "________ wasn't about me"},
  {
    id: 'The magic of this moment is ________',
    question: 'The magic of this moment is ________',
  },
  {id: 'At least, ________', question: 'At least, ________'},
  {
    id: "I won't ever accept ________",
    question: "I won't ever accept ________",
  },
  {
    id: 'A bad moment I got past was ________',
    question: 'A bad moment I got past was ________',
  },
  {
    id: "________ is something I couldn't do before",
    question: "________ is something I couldn't do before",
  },
  {
    id: 'I was expecting ________ to be a lot worse than it was',
    question: 'I was expecting ________ to be a lot worse than it was',
  },
  {
    id: 'I want the future me to remember that I ________ ',
    question: 'I want the future me to remember that I ________ ',
  },
  {
    id: '________ is an obstacle I overcame',
    question: '________ is an obstacle I overcame',
  },
  {id: '________ and keep going', question: '________ and keep going'},
  {id: 'What if I ________', question: 'What if I ________'},
  {
    id: 'The music was ominous, but the ________',
    question: 'The music was ominous, but the ________',
  },
  {id: 'I can tell ________', question: 'I can tell ________'},
  {id: 'Why are they ________', question: 'Why are they ________'},
  {
    id: 'If I had my own private jet, ________',
    question: 'If I had my own private jet, ________',
  },
  {
    id: 'When people see me, I hope they see ________',
    question: 'When people see me, I hope they see ________',
  },
  {
    id: "I'm probably a lot to handle when ________",
    question: "I'm probably a lot to handle when ________",
  },
  {
    id: 'And then just as the waiter was walking away, ________',
    question: 'And then just as the waiter was walking away, ________',
  },
  {id: 'The next time I ________', question: 'The next time I ________'},
  {
    id: "I'm getting better at ________",
    question: "I'm getting better at ________",
  },
  {
    id: '________ was hard, but I got through it',
    question: '________ was hard, but I got through it',
  },
  {
    id: '________ was a great decision I made',
    question: '________ was a great decision I made',
  },
  {
    id: "Something I've done that I can laugh at was ________",
    question: "Something I've done that I can laugh at was ________",
  },
  {
    id: "I'm overly hard on myself for ________",
    question: "I'm overly hard on myself for ________",
  },
  {
    id: "I'm amazingly good at beating myself up for ________",
    question: "I'm amazingly good at beating myself up for ________",
  },
  {
    id: 'Something useful that took me forever to learn is ________',
    question: 'Something useful that took me forever to learn is ________',
  },
  {
    id: 'I wonder if other people ________ just like I do',
    question: 'I wonder if other people ________ just like I do',
  },
  {
    id: '________ was a crazy thought I had',
    question: '________ was a crazy thought I had',
  },
  {
    id: 'An overreaction I had ________',
    question: 'An overreaction I had ________',
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
