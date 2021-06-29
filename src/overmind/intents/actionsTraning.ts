import { Part, TrainingPhrase } from '@src/types';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';

export const createPhrase = ({ state }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const phrases = currentIntent.trainingPhrases ?? [];

  const newPhrase = {
    name: `new-${uuidv4()}`,
    type: 'EXAMPLE',
    parts: [] as Part[],
  };

  currentIntent.trainingPhrases = [newPhrase, ...phrases];
};

export const isSinglePhraseParam = ({ state }: Context, paramAlias: string) => {
  if (!state.intents.currentIntent?.trainingPhrases) return;
  const { trainingPhrases } = state.intents.currentIntent;

  let count = 0;
  trainingPhrases.forEach(({ parts }) => {
    parts.forEach(({ alias }) => {
      if (alias === paramAlias) count++;
    });
  });

  return count === 1;
};

export const updatePhrase = ({ state }: Context, updatedPhrase: TrainingPhrase) => {
  if (!state.intents.currentIntent?.trainingPhrases) return;
  const { trainingPhrases } = state.intents.currentIntent;

  state.intents.currentIntent.trainingPhrases = trainingPhrases.map((phrase) =>
    phrase.name == updatedPhrase.name ? updatedPhrase : phrase
  );
};

export const removePhrase = ({ state }: Context, name: string) => {
  if (!state.intents.currentIntent?.trainingPhrases) return;
  const { trainingPhrases } = state.intents.currentIntent;

  state.intents.currentIntent.trainingPhrases = trainingPhrases.filter(
    (phrase) => phrase.name !== name
  );
};

export const removeParamFromPhrases = ({ state }: Context, paramName: string) => {
  if (!state.intents.currentIntent?.trainingPhrases) return;
  const { trainingPhrases } = state.intents.currentIntent;

  state.intents.currentIntent.trainingPhrases = trainingPhrases.map((phrase) => {
    phrase.parts = phrase.parts.map((part) => {
      if (part.alias === paramName) return { text: part.text };
      return part;
    });
    return phrase;
  });
};
