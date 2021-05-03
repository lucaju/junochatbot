import { derived } from 'overmind';
import type { Intent, Entity, ContextRelation } from '@src/types';

type State = {
  collection: Intent[];
  currentIntent?: Intent;
  entities: Entity[];
  contexts: ContextRelation[];
};

export const state: State = {
  collection: [] as Intent[],
  currentIntent: undefined,
  entities: [] as Entity[],

  contexts: derived((state: State) => {
    let contextCollection = [] as ContextRelation[];

    state.collection.forEach(
      ({ name, displayName, inputContextNames, outputContexts }) => {
        if (!inputContextNames && !outputContexts) return;

        if (inputContextNames) {
          inputContextNames.forEach((contextIn) => {
            const existingContext =
              contextCollection.length > 0
                ? contextCollection.find((ctx) => ctx.name === contextIn)
                : undefined;

            if (existingContext) {
              if (existingContext.inputs) {
                existingContext.inputs = [
                  ...existingContext.inputs,
                  displayName,
                ];
              }
            } else {
              const inContextName = contextIn.split('/');
              contextCollection = [
                {
                  name: inContextName[inContextName.length - 1],
                  inputs: [displayName],
                },
                ...contextCollection,
              ];
            }
          });
        }

        if (outputContexts) {
          outputContexts.forEach((contextOut) => {
            const existingContext =
              contextCollection.length > 0
                ? contextCollection.find((ctx) => ctx.name === contextOut.name)
                : undefined;

            if (existingContext) {
              if (existingContext.outputs)
                existingContext.outputs = [
                  ...existingContext.outputs,
                  displayName,
                ];
            } else {
              const outContextName = contextOut.name.split('/');
              contextCollection = [
                {
                  name: outContextName[outContextName.length - 1],
                  outputs: [displayName],
                },
                ...contextCollection,
              ];
            }
          });
        }
      }
    );

    return contextCollection;
  }),
};
