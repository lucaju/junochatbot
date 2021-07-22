import type { ErrorMessage, Story } from '@src/types';
import { isError } from '@src/util/utilities';
import { Context } from '../';

export const resetState = ({ state }: Context) => {
  state.story.stories = [];
  state.story.currentStory = undefined;
};

export const getStories = async ({ state, effects }: Context): Promise<Story[] | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  let response: Story[] | ErrorMessage = [];

  if (state.session.isAdmin) {
    response = await effects.story.api.getAllStories(authUser.token);
  } else if (state.session.isInstructor) {
    if (!authUser.groupId) return { errorMessage: 'Not authorized' };
    response = await effects.story.api.getStoriesByGroup(Number(authUser.groupId), authUser.token);
  } else if (state.session.isStudent) {
    response = await effects.story.api.getStoriesByUser(authUser.id, authUser.token);
  }

  if (isError(response)) return response;

  state.story.stories = response.reverse();
  return state.story.stories;
};

export const getStoriesByGroup = async (
  { state, effects }: Context,
  groupId: number
): Promise<Story[] | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.story.api.getStoriesByGroup(groupId, authUser.token);

  if (isError(response)) return response;

  state.story.stories = response.reverse();
  return state.story.stories;
};

export const getStory = async (
  { state, effects }: Context,
  storyId: number
): Promise<Story | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.story.api.getStory(storyId, authUser.token);
  if (isError(response)) return response;

  //? HACK TO DEAL WITH NULL INFO - REMOVE THIS WHEN FLUSH THE TEST DB
  if (response.botName === null) response.botName = 'Bot Name';
  if (response.botPersona === null) response.botPersona = 'Persona description';
  if (response.botAvatar === null) response.botAvatar = 'adb';

  state.story.currentStory = response;

  return state.story.currentStory;
};

export const createStory = async (
  { state, effects }: Context,
  values: Omit<Story, 'id'>
): Promise<Story | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const story = values;
  story.user = authUser;

  const response = await effects.story.api.createStory(story, authUser.token);
  if (isError(response)) return response;

  state.story.currentStory = response;

  return state.story.currentStory;
};

export const updateStory = async (
  { state, effects }: Context,
  { storyData, values }: { storyData: Story; values: Story }
): Promise<Story | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  //1. Split data
  let newValues: Partial<Story> = { ...values };
  delete newValues.user;

  let newImage;
  if (newValues.imageUrl?.name) newImage = newValues.imageUrl;
  if (storyData.imageUrl !== null && newValues.imageUrl === null) newImage = null;
  delete newValues.imageUrl;

  //update story
  const response = await effects.story.api.updateStory(newValues, authUser.token);
  if (isError(response)) return response;

  //Upload umage
  if (newImage?.name) {
    const response = await effects.story.api.uploadImage(storyData.id, newImage, authUser.token);
    if (!isError(response)) newValues.imageUrl = response;
  } else if (newImage === null) {
    const response = await effects.story.api.deleteImage(storyData.id, authUser.token);
    if (!isError(response)) newValues.imageUrl = null;
  } else {
    newValues.imageUrl = storyData.imageUrl;
  }

  //update state;
  state.story.stories = state.story.stories.map((s) => {
    if (s.id === newValues.id) s = newValues as Story;
    return s;
  });

  state.story.currentStory = response;

  return state.story.currentStory;
};

// export const deleteStory = async (
//   { state, effects }: Context,
//   storyId: number
// ): Promise<boolean | ErrorMessage> => {
//   const authUser = state.session.user;
//   if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

//   const response = await effects.story.api.deleteStory(storyId, authUser.token);
//   if (isError(response)) return response;

//   state.story.stories = state.story.stories.filter((s) => s.id !== storyId);

//   return true;
// };
