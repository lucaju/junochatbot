import { TrainingPhrase, Part } from '@src/types';
import { useField } from 'formik';

const useTrainingPhrases = () => {
  const [, meta, helpers] = useField('trainingPhrases');
  const { value }: { value: TrainingPhrase[] } = meta;
  const { setValue } = helpers;

  return {
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
  };
};

export default useTrainingPhrases;
