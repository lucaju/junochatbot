import type { Context as ContextIntent, Entity, ErrorMessage, Intent } from '@src/types';
import { isError } from '@src/util/utilities';
import { Context } from 'overmind';

export const getIntents = async ({
  state,
  actions,
  effects,
}: Context): Promise<Intent[] | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.getIntents(storyId, authUser.token);

  if (isError(response)) return response;

  //load videos, tags, and entities
  if (state.videos.collection.length === 0) await actions.videos.getVideos();
  if (state.videos.tagCollection.length === 0) await actions.videos.getTags();
  if (state.intents.entities.length === 0) await actions.intents.getEntities();

  state.intents.collection = response;
  return state.intents.collection;
};

export const getIntent = async (
  { state, effects }: Context,
  intentName: string
): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.getIntent(storyId, intentName, authUser.token);
  if (isError(response)) return response;

  state.intents.currentIntent = response;
  return response;
};

export const createIntent = async ({ state, effects }: Context): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const currentIntent = state.intents.currentIntent;
  if (!currentIntent) return { errorMessage: 'Not Intent' };

  const response = await effects.intents.api.createIntent(storyId, currentIntent, authUser.token);
  if (isError(response)) return response;

  state.intents.collection = [response, ...state.intents.collection];
  state.intents.currentIntent = response;

  return response;
};

export const updateIntent = async ({ state, effects }: Context): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const currentIntent = state.intents.currentIntent;
  if (!currentIntent) return { errorMessage: 'Not Intent' };

  const response = await effects.intents.api.updateIntent(storyId, currentIntent, authUser.token);
  if (isError(response)) return response;

  state.intents.collection = state.intents.collection.map((itt) => {
    if (response.name === itt.name) return response;
    return itt;
  });

  state.intents.currentIntent = response;

  return response;
};

export const deleteIntent = async (
  { state, effects }: Context,
  intentName: string
): Promise<boolean | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.deleteIntent(storyId, intentName, authUser.token);
  if (isError(response)) return response;

  state.intents.currentIntent = undefined;
  state.intents.collection = state.intents.collection.filter((itt) => itt.name !== intentName);
  return true;
};

//** Entity */

export const getEntities = async ({
  state,
  effects,
}: Context): Promise<Entity[] | ErrorMessage> => {
  if (state.intents.entities.length > 0) return state.intents.entities;

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.getEntities(authUser.token);
  if (isError(response)) return response;

  state.intents.entities = response;
  return response;
};

//** VIDEOS AND TAGS */

export const getVideoById = ({ state }: Context, id: number) => {
  const video = state.videos.collection.find((v) => v.id === id);
  return video;
};

export const getTagById = ({ state }: Context, id: number) => {
  const tag = state.videos.tagCollection.find((t) => t.id === id);
  return tag;
};

///

//Current

export const createNewIntent = ({ state }: Context) => {
  state.intents.currentIntent = { displayName: '' };
};

export const closeCurrentIntent = ({ state }: Context) => {
  state.intents.currentIntent = undefined;
};

export const updateCurrentDisplayName = ({ state }: Context, value: string) => {
  if (!state.intents.currentIntent) return;
  state.intents.currentIntent.displayName = value;
};

export const addInputContext = ({ state }: Context, name: string) => {
  if (!state.intents.currentIntent) return;
  const currentIntent = state.intents.currentIntent;
  const inputs = currentIntent?.inputContextNames ?? [];
  currentIntent.inputContextNames = [...inputs, name];
};

export const addOutputContext = (
  { state }: Context,
  { name, lifeSpan }: { name: string; lifeSpan?: number }
) => {
  if (!state.intents.currentIntent) return;
  const currentIntent = state.intents.currentIntent;
  const outputs = currentIntent?.outputContexts ?? [];
  currentIntent.outputContexts = [...outputs, { name, lifespanCount: lifeSpan }];
};

export const updateInputContextNames = ({ state }: Context, contexts: string[]) => {
  if (!state.intents.currentIntent) return;
  state.intents.currentIntent.inputContextNames = contexts;
};

export const updateInputContextName = (
  { state }: Context,
  { oldName, newName }: { oldName: string; newName: string }
) => {
  if (!state.intents.currentIntent) return;
  if (!state.intents.currentIntent.inputContextNames) return;
  const inputContextNames = state.intents.currentIntent.inputContextNames;

  state.intents.currentIntent.inputContextNames = inputContextNames.map((context) =>
    context === oldName ? newName : context
  );
};

export const updateOutputContexs = ({ state }: Context, contexts: ContextIntent[]) => {
  if (!state.intents.currentIntent) return;
  state.intents.currentIntent.outputContexts = contexts;
};

export const updateOutputContex = (
  { state }: Context,
  { oldName, newContext }: { oldName: string; newContext: ContextIntent }
) => {
  if (!state.intents.currentIntent) return;
  if (!state.intents.currentIntent.outputContexts) return;
  const outputContexts = state.intents.currentIntent.outputContexts;

  state.intents.currentIntent.outputContexts = outputContexts.map((context) => {
    if (context.name === oldName) {
      context.name = newContext.name;
      context.lifespanCount = newContext.lifespanCount;
    }
    return context;
  });
};

export const removeInputContextName = ({ state }: Context, name: string) => {
  if (!state.intents.currentIntent) return;
  if (!state.intents.currentIntent.inputContextNames) return;
  const inputContextNames = state.intents.currentIntent.inputContextNames;

  state.intents.currentIntent.inputContextNames = inputContextNames.filter(
    (context) => context !== name
  );
};

export const removeOutputContext = ({ state }: Context, name: string) => {
  if (!state.intents.currentIntent) return;
  if (!state.intents.currentIntent.outputContexts) return;
  const outputContexts = state.intents.currentIntent.outputContexts;

  state.intents.currentIntent.outputContexts = outputContexts.filter(
    (context) => context.name !== name
  );
};
