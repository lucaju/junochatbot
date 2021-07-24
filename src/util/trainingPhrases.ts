export const trainingPhrasesCollection: Map<string, string[]> = new Map();

const yes_EN = [
  'yes',
  'okay I will',
  'why not',
  "yes that's alright",
  'yes I do',
  'exactly',
  'of course',
  "yep that's ok",
  'okay',
  'ok',
];

const no_EN = [
  'thanks but no',
  'no way',
  'why not',
  'no',
  "no no don't",
  'na',
  "no it isn't",
  "don't",
  "nah I'm good",
  'no I cannot',
  "I can't",
];

trainingPhrasesCollection.set('yes-en_CA', yes_EN);
trainingPhrasesCollection.set('no-en_CA', no_EN);
