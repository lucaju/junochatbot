import { Context } from 'overmind';
import { isError } from '../../util/utilities';
import type { ErrorMessage, Story } from '../../types';

// export const getAssets = async ({ state, effects }:Context): Promise<Assets[] | ErrorMessage> => {
//   const authuser = state.session.user;
//   if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

//   const assets = await effects.story.api.getStories(authuser.id, authuser.token);
//   if (isError(assets)) return assets;

//   //TODO
// };

export const getStories = async ({ state, effects }: Context): Promise<Story[] | ErrorMessage> => {
  const response = await effects.story.api.getStories();
  if (isError(response)) return response;

  state.story.stories = response.reverse();

  return state.story.stories;
};

export const getStory = async (
  { state, effects }: Context,
  storyId: number
): Promise<Story | ErrorMessage> => {
  const response = await effects.story.api.getStory(storyId);
  if (isError(response)) return response;

  state.story.currentStory = response;

  return state.story.currentStory;
};

export const createStory = async (
  { state, effects }: Context,
  values: Omit<Story, 'id'>
): Promise<Story | ErrorMessage> => {
  const authuser = state.session.user;
  if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

  const story = values;
  story.owner = authuser;

  const response = await effects.story.api.createStory(story, authuser.token);
  if (isError(response)) return response;

  state.story.currentStory = response;

  return state.story.currentStory;
};

export const updateStory = async (
  { state, effects }: Context,
  values: Story
): Promise<Story | ErrorMessage> => {
  const authuser = state.session.user;
  if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.story.api.updateStory(
    values.id,
    values,
    authuser.token
  );
  if (isError(response)) return response;

  state.story.currentStory = response;

  return state.story.currentStory;
};

// export const deleteStory = async (
//   { state, effects }: Context,
//   storyId: number
// ): Promise<boolean | ErrorMessage> => {
//   const authuser = state.session.user;
//   if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

//   const response = await effects.story.api.deleteStory(storyId, authuser.token);
//   if (isError(response)) return response;

//   state.story.stories = state.story.stories.filter((s) => s.id !== storyId);

//   return true;
// };
