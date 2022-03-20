export const responsePresetCollection: Map<string, string[]> = new Map();

const fallbackGeneral_EN = [
  "I didn't get that. Can you say it again?",
  'I missed what you said. What was that?',
  'Sorry, could you say that again?',
  'Sorry, can you say that again?',
  'Can you say that again?',
  "Sorry, I didn't get that. Can you rephrase?",
  'Sorry, what was that?',
  'One more time?',
  'What was that?',
  'Say that one more time?',
  "I didn't get that. Can you repeat?",
  'I missed that, say that again?',
];

const fallbackGeneral_FR = [
  "J'ai du mal à comprendre cette question.",
  "J'ai mal compris votre demande.",
  "Je n'ai pas saisi ce que vous avez dit.",
  'Je crois que je ne vous suis pas.',
  'Je ne comprends pas de quoi vous me parlez.',
];

const fallbackGeneral_BR = [
  "Lamento, mas não compreendi.",
  "Desculpe, mas não compreendi.",
  "Infelizmente, não captei o que deseja.",
  'Não consegui compreender, desculpe.',
];

responsePresetCollection.set('fallbackGeneral-en_CA', fallbackGeneral_EN);
responsePresetCollection.set('fallbackGeneral-fr_CA', fallbackGeneral_FR);
responsePresetCollection.set('fallbackGeneral-pt_BR', fallbackGeneral_BR);
