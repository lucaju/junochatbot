import { derived } from 'overmind';
import type { Intent, Entity } from '../../types';

type ContextRelation = {
  name: string;
  inputs?: string[];
  outputs?: string[];
};

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
      ({ displayName, inputContextNames, outputContexts }) => {
        if (inputContextNames.length === 0 && outputContexts.length === 0)
          return;

        inputContextNames.forEach((contextIn) => {
          const existingContext =
            contextCollection.length > 0
              ? contextCollection.find((ctx) => ctx.name === contextIn)
              : undefined;

          if (existingContext) {
            if (existingContext.inputs)
              existingContext.inputs = [...existingContext.inputs, displayName];
          } else {
            contextCollection = [
              {
                name: contextIn,
                inputs: [displayName],
              },
              ...contextCollection,
            ];
          }
        });

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
            contextCollection = [
              {
                name: contextOut.name,
                outputs: [displayName],
              },
              ...contextCollection,
            ];
          }
        });
      }
    );

    return contextCollection;
  }),
};
