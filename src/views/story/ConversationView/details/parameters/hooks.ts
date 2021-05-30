import { Parameter } from '@src/types';
import { useField } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import useTrainingPhrases from '../training/hooks';

const useParameter = () => {
  const [, meta, helpers] = useField('parameters');
  const { value }: { value: Parameter[] } = meta;
  const { setValue } = helpers;

  const { removeParamFromPhrases } = useTrainingPhrases();

  return {
    params: value,

    createFreshParameter: () => {
      const freshParam: Parameter = {
        name: `added-${uuidv4()}`,
        displayName: '',
      };
      return freshParam;
    },

    addParameter: (entityTypeDisplayName: string) => {
      const isSys = entityTypeDisplayName.includes('sys.');
      const displayName = isSys
        ? entityTypeDisplayName.substring(entityTypeDisplayName.indexOf('.') + 1)
        : entityTypeDisplayName;

      const newParam: Parameter = {
        name: `added-${uuidv4()}`,
        displayName,
        value: `$${displayName}`,
        entityTypeDisplayName,
      };

      if (!value) return setValue([newParam]);

      setValue([...value, newParam]);
    },

    removeParameter: (name: string, displayName: string) => {
      const updatedList = value.filter((param) => param.name !== name);
      setValue(updatedList);
      removeParamFromPhrases(displayName);
    },

    removeParameterByDisplayName: (displayName: string) => {
      const updatedList = value.filter((param) => param.displayName !== displayName);
      setValue(updatedList);
    },

    updateParameter: (name: string, updatedParam: Parameter) => {
      const updatedList = value.map((param) => {
        if (param.name === name) return updatedParam;
        return param;
      });
      setValue(updatedList);
    },

    updateParameterByAlias: (alias: string, entityName: string) => {
      const updatedList = value.map((param) => {
        if (param.displayName !== alias) return param;

        const isSys = entityName.includes('sys.');
        const displayName = isSys ? entityName.substring(entityName.indexOf('.') + 1) : entityName;

        const newParam: Parameter = {
          name: param.name,
          displayName,
          value: `$${displayName}`,
          entityTypeDisplayName: entityName,
        };

        return newParam;
      });
      setValue(updatedList);
    },
  };
};

export default useParameter;
