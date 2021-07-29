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

const yes_FR = [
  "fais-le",
  "c'est correct",
  "d'accord",
  "bien sûr",
  "exactement",
  "confirmer",
  "je suis d'accord",
  "oui",
  "ça me va",
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

const no_FR = [
  "je ne crois pas",
  "ça ne m'intéresse pas",
  "ne le fais pas",
  "pas vraiment",
  "sûrement pas",
  "non merci",
  "je n'en veux pas",
  "je ne suis",
];

const defaultWelcome_EN = [
  "Hello",
  "hi",
];

const defaultWelcome_FR = [
  "Bonjour",
];

trainingPhrasesCollection.set('yes-en_CA', yes_EN);
trainingPhrasesCollection.set('yes-fr_CA', yes_FR);
trainingPhrasesCollection.set('no-en_CA', no_EN);
trainingPhrasesCollection.set('no-fr_CA', no_FR);
trainingPhrasesCollection.set('defaultWelcome-en_CA', defaultWelcome_EN);
trainingPhrasesCollection.set('defaultWelcome-fr_CA', defaultWelcome_FR);
