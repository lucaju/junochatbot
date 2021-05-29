import { Parameter } from '@src/types';
import { useField } from 'formik';
import useTrainingPhrases from '../training/hooks';

const useParameter = () => {
  const [, meta, helpers] = useField('parameters');
  const { value }: { value: Parameter[] } = meta;
  const { setValue } = helpers;

  const { removeParamFromPhrases } = useTrainingPhrases();

  return {
    params: value,
    removeParameter: (name: string, displayName: string) => {
      const updatedList = value.filter((param) => param.name !== name);
      setValue(updatedList);
      removeParamFromPhrases(displayName);
    },
    updateParameter: (name: string, updatedParam: Parameter) => {
      const updatedList = value.map((param) => {
        if (param.name === name) return updatedParam;
        return param;
      });
      setValue(updatedList);
    },
  };
};

export default useParameter;
