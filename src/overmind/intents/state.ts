import type { ContextRelation, Entity, Intent, Parameter } from '@src/types';
import { derived } from 'overmind';

type State = {
  collection: Intent[];
  currentIntent?: Intent;
  currentProjectName?: string;
  contexts: ContextRelation[];
  entities: Entity[];
  parameters: Parameter[];
};

export const state: State = {
  collection: [] as Intent[],
  currentIntent: undefined,
  entities: [] as Entity[],
  currentProjectName: derived((state: State) => {
    const currentIntentName = state.currentIntent?.name;
    if (!currentIntentName) return;
    const splitName = currentIntentName.split('/');
    const [, projectName] = splitName;
    return projectName;
  }),
  contexts: derived((state: State) => {
    const contextCollection: ContextRelation[] = [];

    state.collection.forEach(({ displayName, inputContextNames, outputContexts }) => {
      inputContextNames?.forEach((contextIn) => {
        const existingContext = contextCollection.find((ctx) => ctx.name === contextIn);
        if (existingContext) {
          existingContext.inputs = existingContext.inputs
            ? [...existingContext.inputs, displayName]
            : [displayName];
        } else {
          const inContextName = contextIn.split('/');
          contextCollection.push({
            shortname: inContextName[inContextName.length - 1],
            name: contextIn,
            inputs: [displayName],
          });
        }
      });

      outputContexts?.forEach((contextOut) => {
        const existingContext = contextCollection.find((ctx) => ctx.name === contextOut.name);
        if (existingContext) {
          existingContext.outputs = existingContext.outputs
            ? [...existingContext.outputs, displayName]
            : [displayName];
        } else {
          const outContextName = contextOut.name.split('/');
          contextCollection.push({
            shortname: outContextName[outContextName.length - 1],
            name: contextOut.name,
            outputs: [displayName],
          });
        }
      });
    });

    return contextCollection;
  }),
  parameters: derived((state: State) => {
    let list: Parameter[] = [];
    state.collection.forEach(({ parameters }) => {
      if (parameters) list = [...list, ...parameters];
    });
    return list;
  }),
};
