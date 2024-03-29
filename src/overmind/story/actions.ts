import type { ErrorMessage, Story } from '@src/types';
import { isError } from '@src/util/utilities';
import { Context } from '../';

export const resetState = ({ state, actions }: Context) => {
  state.story.stories = [];
  state.story.currentStory = undefined;

  actions.intents.resetState();
  actions.videos.resetState();
};

export const getStories = async ({
  state,
  actions,
  effects,
}: Context): Promise<Story[] | ErrorMessage> => {
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
  actions.story._setUserHasStory();

  return state.story.stories;
};

export const getStoriesByGroup = async (
  { state, actions, effects }: Context,
  groupId: number
): Promise<Story[] | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.story.api.getStoriesByGroup(groupId, authUser.token);

  if (isError(response)) return response;

  state.story.stories = response.reverse();
  actions.story._setUserHasStory();

  return state.story.stories;
};

export const getStoriesForAuthUser = async ({
  state,
  effects,
}: Context): Promise<Story[] | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.story.api.getStoriesByUser(authUser.id, authUser.token);
  return response;
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
  { state, actions, effects }: Context,
  values: Omit<Story, 'id'>
): Promise<Story | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const userId = authUser.id;

  //API requires language code to be separated with '_' instrad of '-'
  //eg. en-CA -> en_CA
  values.languageCode = values.languageCode.replace('-', '_');

  //new story default
  const story = {
    ...values,
    synopsis: '',
    botAvatar: 'adb',
    botName: '',
    botPersona: '',
    botDelay: 100,
  };

  const response = await effects.story.api.createStory(story, userId, authUser.token);
  if (isError(response)) return response;

  //load Story
  await actions.story.getStory(response.id);

  //make sure all intents are loaded
  await actions.intents.getIntents();

  //add presets to default welcome and default fallback
  await actions.intents.updateDefaultWelcomeIntent();
  await actions.intents.updateDefaultFallbackIntent();

  return response;
};

export const updateStory = async (
  { state, effects }: Context,
  { storyData, values }: { storyData: Story; values: Story }
): Promise<Story | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  //stash currentStory user
  const currentStoryUser = state.story.currentStory?.user;

  //1. Split data
  const newValues: Partial<Story> = { ...values };
  delete newValues.user;

  let newImage;
  if (newValues.imageUrl?.name) newImage = newValues.imageUrl;
  if (storyData.imageUrl !== null && newValues.imageUrl === null) newImage = null;

  //Upload umage
  if (newImage?.name) {
    const response = await effects.story.api.uploadImage(storyData.id, newImage, authUser.token);
    if (!isError(response)) newValues.imageUrl = response.fileName;
  } else if (newImage === null) {
    const response = await effects.story.api.deleteImage(storyData.id, authUser.token);
    if (!isError(response)) newValues.imageUrl = null;
  } else {
    newValues.imageUrl = storyData.imageUrl;
  }

  //update story
  const response = await effects.story.api.updateStory(newValues, authUser.token);
  if (isError(response)) return response;

  //update state;
  state.story.stories = state.story.stories.map((s) => {
    if (s.id === newValues.id) s = newValues as Story;
    return s;
  });

  //reapply currentStory User
  const story: Story = { ...response };
  if (currentStoryUser) story.user = currentStoryUser;

  state.story.currentStory = story;

  return state.story.currentStory;
};

export const _setUserHasStory = ({ state }: Context) => {
  if (state.story.userHasStory === true) return;
  const hasStory = state.story.stories.some((story) => story.user?.id === state.session.user?.id);
  state.story.userHasStory = hasStory;
};
