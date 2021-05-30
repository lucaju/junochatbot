import { Part, TrainingPhrase } from '@src/types';
import { useField } from 'formik';
import { v4 as uuidv4 } from 'uuid';

const useTrainingPhrases = () => {
  const [, meta, helpers] = useField('trainingPhrases');
  const { value }: { value: TrainingPhrase[] } = meta;
  const { setValue } = helpers;

  return {
    createNewPhrase: () => {
      return {
        name: `added-${uuidv4()}`,
        type: 'EXAMPLE',
        parts: [] as Part[],
      };
    },

    updatePhrase: (updatedPhrase: TrainingPhrase) => {
      let updateTrainingPhrases = value;

      if (updatedPhrase.name?.startsWith('added-')) {
        //? remove 'name' on ACTIONS when submit, befeore send to DialogFLow
        updateTrainingPhrases = [updatedPhrase, ...value];
      } else {
        updateTrainingPhrases = value.map((phrase) => {
          if (phrase.name === updatedPhrase.name) return updatedPhrase;
          return phrase;
        });
      }

      setValue(updateTrainingPhrases);
    },

    removePhrase: (name?: string) => {
      if (!name) return;
      const updateTrainingPhrases = value.filter((phrase) => phrase.name !== name);
      setValue(updateTrainingPhrases);
    },

    removeParamFromPhrases: (paramName: string) => {
      const updatedPhrases = value.map((phrase) => {
        const parts = phrase.parts.map((part) => {
          if (!part.alias) return part;

          if (part.alias === paramName) {
            return { text: part.text };
          }
        });

        let newParts: Part[] = [];

        parts.forEach((part, i) => {
          if (!part) return;
          if (i === 0) return newParts.push(part);
          if (part.alias) return newParts.push(part);
          if (!part.alias) {
            const prevPart = newParts[i - 1];
            prevPart.text = `${prevPart.text}${part.text}`;
          }
        });

        phrase.parts = newParts;

        return phrase;
      });

      setValue(updatedPhrases);
    },

    isSinglePhraseParam: (paramAlias: string) => {
      let count = 0;
      value.forEach(({ parts }) => {
        parts.forEach(({ alias }) => {
          if (alias === paramAlias) count++;
        });
      });
      return count === 1;
    },
  };
};

export default useTrainingPhrases;
