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
  type === 'input' ? actions.intents.addInputContext() : actions.intents.addOutputContext();
};

export const addInputContext = ({ state }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const inputs = currentIntent?.inputContexts ?? [];

  const newContext: ContextType = {
    id: `new-${uuidv4()}`,
    type: 'input',
    shortName: '',
    name: '',
  };

  currentIntent.inputContexts = [...inputs, newContext];
};

export const addOutputContext = ({ state }: Context, shortName?: string) => {
  if (!state.intents.currentIntent) return;
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
};

export const updateContext = ({ actions }: Context, context: ContextType) => {
  context.type === 'input'
    ? actions.intents.updateInputContextName(context)
    : actions.intents.updateOutputContex(context);
};

export const updateInputContextName = ({ state, actions }: Context, context: ContextType) => {
  if (!state.intents.currentIntent?.inputContexts) return;

  // deconstruct
  const { inputContexts } = state.intents.currentIntent;
  const { id, shortName } = context;

  //guard
  if (shortName === '') return actions.intents.removeInputContex(id);

  //new name
  const NAME_PREFIX = `projects/${state.intents.currentProjectName}/agent/sessions/-/contexts/`;
  const name = `${NAME_PREFIX}${shortName}`;

  //update
  state.intents.currentIntent.inputContexts = inputContexts.map((context) => {
    if (context.id === id) {
      //if this is a newly created input context, add it to output as well
      if (context.shortName === '') actions.intents.addOutputContext(shortName);

      context.name = name;
      context.shortName = shortName;
    }
    return context;
  });
};

export const updateOutputContex = ({ state, actions }: Context, context: ContextType) => {
  if (!state.intents.currentIntent?.outputContexts) return;

  // deconstruct
  const { outputContexts } = state.intents.currentIntent;
  const { id, shortName, lifespanCount } = context;

  //guard
  if (shortName === '' || lifespanCount === 0) return actions.intents.removeOutputContext(id);

  //new name
  const NAME_PREFIX = `projects/${state.intents.currentProjectName}/agent/sessions/-/contexts/`;
  const name = `${NAME_PREFIX}${shortName}`;

  //update
  state.intents.currentIntent.outputContexts = outputContexts.map((context) => {
    if (context.id === id) {
      context.name = name;
      context.shortName = shortName;
      context.lifespanCount = lifespanCount;
    }
    return context;
  });
};

export const removeContext = ({ actions }: Context, context: ContextType) => {
  context.type === 'input'
    ? actions.intents.removeInputContex(context.id)
    : actions.intents.removeOutputContext(context.id);
};

export const removeInputContex = ({ state }: Context, id?: string) => {
  if (!id) return;
  if (!state.intents.currentIntent?.inputContexts) return;
  const { inputContexts } = state.intents.currentIntent;

  state.intents.currentIntent.inputContexts = inputContexts.filter((context) => context.id !== id);
};

export const removeOutputContext = ({ state }: Context, id?: string) => {
  if (!id) return;
  if (!state.intents.currentIntent?.outputContexts) return;
  const { outputContexts } = state.intents.currentIntent;

  state.intents.currentIntent.outputContexts = outputContexts.filter(
    (context) => context.id !== id
  );
};
