export const responsePresetCollection: Map<string, string[]> = new Map();

const fallbackGeneral_EN = [
  "I'm sorry. I'm having trouble understanding the question.",
  'I think I may have misunderstood your last statement.',
  "I'm sorry. I didn't quite grasp what you just said.",
  "I don't think I'm qualified to answer that yet.",
  "I'm a bit confused by that last part.",
  "I'm not totally sure about that.",
  "I'm not sure I follow.",
  "I'm afraid I don't understand.",
  "I'm a bit confused.",
];

const fallbackGeneral_FR = [
  "J'ai du mal à comprendre cette question.",
  "J'ai mal compris votre demande.",
  "Je n'ai pas saisi ce que vous avez dit.",
  'Je crois que je ne vous suis pas.',
  'Je ne comprends pas de quoi vous me parlez.',
];

responsePresetCollection.set('fallbackGeneral-en_CA', fallbackGeneral_EN);
responsePresetCollection.set('fallbackGeneral-fr_CA', fallbackGeneral_FR);
