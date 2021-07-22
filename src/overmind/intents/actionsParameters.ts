import { Parameter } from '@src/types';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';

export const createParameter = ({ state }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const parameters = currentIntent.parameters ?? [];

  const freshParam: Parameter = {
    name: `new-${uuidv4()}`,
    displayName: '',
  };

  currentIntent.parameters = [freshParam, ...parameters];
};

export const addParameter = ({ state }: Context, entityTypeDisplayName: string) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const parameters = currentIntent.parameters ?? [];

  const isSys = entityTypeDisplayName.includes('sys.');
  const displayName = isSys
    ? entityTypeDisplayName.substring(entityTypeDisplayName.indexOf('.') + 1)
    : entityTypeDisplayName;

  const newParam: Parameter = {
    name: `new-${uuidv4()}`,
    displayName,
    value: `$${displayName}`,
    entityTypeDisplayName,
  };

  currentIntent.parameters = [...parameters, newParam];
};

export const updateParameter = ({ state, actions }: Context, updatedParam: Parameter) => {
  if (!state.intents.currentIntent?.parameters) return;
  const { parameters } = state.intents.currentIntent;

  state.intents.currentIntent.parameters = parameters.map((param) =>
    param.name === updatedParam.name ? updatedParam : param
  );

  state.intents.currentIntent.parameters = parameters.map((param) => {
    if (param.name === updatedParam.name) {
      if (updatedParam.value && param.value && updatedParam.value !== param.value) {
        actions.intents.updateParameterInTextMessage({
          prevParamValue: param.value,
          newParamValue: updatedParam.value,
        });
      }
      return updatedParam;
    }
    return param;
  });
};

export const updateParameterByAlias = (
  { state }: Context,
  { alias, entityName }: { alias: string; entityName: string }
) => {
  if (!state.intents.currentIntent?.parameters) return;
  const { parameters } = state.intents.currentIntent;

  state.intents.currentIntent.parameters = parameters.map((param) => {
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
};

export const removeParameter = ({ state, actions }: Context, name: string) => {
  if (!state.intents.currentIntent?.parameters) return;
  const { parameters } = state.intents.currentIntent;

  const param = parameters.find((param) => param.name === name);
  //remove from phrases
  if (param) actions.intents.removeParamFromPhrases(param.displayName);

  state.intents.currentIntent.parameters = parameters.filter((param) => param.name !== name);
};

export const removeParameterByDisplayName = ({ state }: Context, displayName: string) => {
  if (!state.intents.currentIntent?.parameters) return;
  const { parameters } = state.intents.currentIntent;

  state.intents.currentIntent.parameters = parameters.filter(
    (param) => param.displayName !== displayName
  );
};
