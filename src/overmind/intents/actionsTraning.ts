import { Parameter, Part, TrainingPhrase } from '@src/types';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';

export const createPhrase = ({ state, actions }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const phrases = currentIntent.trainingPhrases ?? [];

  const newPhrase = {
    name: `new-${uuidv4()}`,
    type: 'EXAMPLE',
    parts: [] as Part[],
  };

  currentIntent.trainingPhrases = [newPhrase, ...phrases];

  actions.intents.setIntentHaChange(true);
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

export const updatePhrase = ({ state, actions }: Context, updatedPhrase: TrainingPhrase) => {
  if (!state.intents.currentIntent?.trainingPhrases) return;
  const { trainingPhrases } = state.intents.currentIntent;

  state.intents.currentIntent.trainingPhrases = trainingPhrases.map((phrase) =>
    phrase.name == updatedPhrase.name ? updatedPhrase : phrase
  );

  actions.intents.setIntentHaChange(true);
};

export const removePhrase = ({ state, actions }: Context, name: string) => {
  if (!state.intents.currentIntent?.trainingPhrases) return;
  const { trainingPhrases } = state.intents.currentIntent;

  state.intents.currentIntent.trainingPhrases = trainingPhrases.filter(
    (phrase) => phrase.name !== name
  );

  actions.intents.setIntentHaChange(true);
};

export const removeParamFromPhrases = ({ state, actions }: Context, paramName: string) => {
  if (!state.intents.currentIntent?.trainingPhrases) return;
  const { trainingPhrases } = state.intents.currentIntent;

  state.intents.currentIntent.trainingPhrases = trainingPhrases.map((phrase) => {
    phrase.parts = phrase.parts.map((part) => {
      if (part.alias === paramName) return { text: part.text };
      return part;
    });
    return phrase;
  });

  actions.intents.setIntentHaChange(true);
};

interface UpdateParamsOnPhrasesProps {
  originalName: string;
  newParam: Parameter;
}
export const updateParamsOnPhrases = (
  { state, actions }: Context,
  { originalName, newParam }: UpdateParamsOnPhrasesProps
) => {
  if (!state.intents.currentIntent?.trainingPhrases) return;
  const { trainingPhrases } = state.intents.currentIntent;

  state.intents.currentIntent.trainingPhrases = trainingPhrases.map((phrase) => {
    phrase.parts = phrase.parts.map((part) => {
      if (part.alias === originalName) {
        part.alias = newParam.displayName;
        part.entityType = newParam.entityTypeDisplayName;
      }
      return part;
    });
    return phrase;
  });

  actions.intents.setIntentHaChange(true);
};
