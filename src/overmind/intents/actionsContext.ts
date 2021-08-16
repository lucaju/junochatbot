import type { Context as ContextType } from '@src/types';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';

type Type = 'input' | 'output';

export const extractContextName = (name: string) => {
  const matchName = name.match(/contexts\/(.+)/);
  const shortName = matchName ? matchName[1] : '';
  return shortName;
};

export const addContext = ({ actions }: Context, type: Type) => {
  const hasAdded =
    type === 'input' ? actions.intents.addInputContext() : actions.intents.addOutputContext();
  if (hasAdded) actions.intents.setIntentHaChange(true);
};

export const addInputContext = ({ state }: Context): boolean => {
  if (!state.intents.currentIntent) return false;

  const { currentIntent } = state.intents;
  const inputs = currentIntent?.inputContexts ?? [];

  const newContext: ContextType = {
    id: `new-${uuidv4()}`,
    type: 'input',
    shortName: '',
    name: '',
  };

  currentIntent.inputContexts = [...inputs, newContext];

  return true;
};

export const addOutputContext = ({ state }: Context, shortName?: string): boolean => {
  if (!state.intents.currentIntent) return false;
  const { currentIntent } = state.intents;
  const outputs = currentIntent?.outputContexts ?? [];

  const NAME_PREFIX = `projects/${state.intents.currentProjectName}/agent/sessions/-/contexts/`;
  const name = shortName ? `${NAME_PREFIX}${shortName}` : '';

  const defaultLifeSpan = 5;

  const newContext: ContextType = {
    id: `new-${uuidv4()}`,
    type: 'output',
    shortName: shortName ?? '',
    name,
    lifespanCount: defaultLifeSpan,
  };

  currentIntent.outputContexts = [...outputs, newContext];

  return true;
};

export const updateContext = ({ actions }: Context, context: ContextType) => {
  const hasChanged =
    context.type === 'input'
      ? actions.intents.updateInputContextName(context)
      : actions.intents.updateOutputContex(context);

  if (hasChanged) actions.intents.setIntentHaChange(true);
};

export const updateInputContextName = (
  { state, actions }: Context,
  context: ContextType
): boolean => {
  if (!state.intents.currentIntent?.inputContexts) return false;

  // deconstruct
  const { inputContexts } = state.intents.currentIntent;
  const { id, shortName } = context;

  //guard
  if (shortName === '') return actions.intents.removeInputContex(id);
  if (hasInputContext(inputContexts, shortName)) return actions.intents.removeInputContex(id);

  //new name
  const NAME_PREFIX = `projects/${state.intents.currentProjectName}/agent/sessions/-/contexts/`;
  const name = `${NAME_PREFIX}${shortName}`;

  state.intents.currentIntent.inputContexts = inputContexts.map((context) => {
    if (context.id === id) {
      //if this is a newly created input context, add it to output as well
      if (context.shortName === '') actions.intents.addOutputContext(shortName);
      return { ...context, name, shortName };
    }
    return { ...context };
  });

  return true;
};

export const updateOutputContex = ({ state, actions }: Context, context: ContextType): boolean => {
  if (!state.intents.currentIntent?.outputContexts) return false;

  // deconstruct
  const { outputContexts } = state.intents.currentIntent;
  const { id, shortName, lifespanCount } = context;

  //guard
  if (shortName === '' || lifespanCount === 0) return actions.intents.removeOutputContext(id);
  if (hasOutputContext(outputContexts, shortName)) return actions.intents.removeOutputContext(id);

  //new name
  const NAME_PREFIX = `projects/${state.intents.currentProjectName}/agent/sessions/-/contexts/`;
  const name = `${NAME_PREFIX}${shortName}`;

  //update
  state.intents.currentIntent.outputContexts = outputContexts.map((context) => {
    if (context.id === id) return { ...context, name, shortName, lifespanCount };
    return { ...context };
  });

  return true;
};

export const hasInputContext = (
  intentContexts: ContextType[] | undefined,
  contextName?: string
) => {
  if (!intentContexts || !contextName) return false;
  return intentContexts.some(({ shortName }) => shortName === contextName);
};

export const hasOutputContext = (
  intentContexts: ContextType[] | undefined,
  contextName?: string
) => {
  if (!intentContexts || !contextName) return false;
  return intentContexts.some(({ shortName }) => shortName === contextName);
};

export const removeContext = ({ actions }: Context, context: ContextType) => {
  const hasRemoved =
    context.type === 'input'
      ? actions.intents.removeInputContex(context.id)
      : actions.intents.removeOutputContext(context.id);

  if (hasRemoved) actions.intents.setIntentHaChange(true);
};

export const removeInputContex = ({ state }: Context, id?: string): boolean => {
  if (!id) return false;
  if (!state.intents.currentIntent?.inputContexts) return false;
  const { inputContexts } = state.intents.currentIntent;

  state.intents.currentIntent.inputContexts = inputContexts.filter((context) => context.id !== id);

  return true;
};

export const removeOutputContext = ({ state }: Context, id?: string): boolean => {
  if (!id) return false;
  if (!state.intents.currentIntent?.outputContexts) return false;
  const { outputContexts } = state.intents.currentIntent;

  state.intents.currentIntent.outputContexts = outputContexts.filter(
    (context) => context.id !== id
  );

  return true;
};
