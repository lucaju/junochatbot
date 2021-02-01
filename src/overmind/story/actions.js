const slugify = require('slugify');

export const getStories = async ({ state, effects }) => {
  state.story.stories = await effects.story.storyAPI.getStories();
};

export const createStory = async ({ state, effects }, newStory) => {
  const story = newStory;
  story.slug = slugify(newStory.title, { lower: true });
  const userSession = state.session.user;
  story.owner = {
    id: userSession.id,
    userName: userSession.userName,
  };
  // story.general.authors.push({
  //   id: userSession.id,
  //   firstName: userSession.firstName,
  //   lastName: userSession.lastName,
  //   avatar: userSession.avatar,
  // });

  const res = await effects.story.storyAPI.createStory(story);
  if (!res) return null;
  state.story.currentStory = res;
  return res;
};

export const setCurrentStory = ({ state }, storyID) => {
  state.story.currentStory = {};
  if (storyID) state.story.currentStory.id = storyID;
  return state.story.currentStory;
};

export const getStory = async ({ state, effects }, storyID) => {
  const res = await effects.story.storyAPI.getStory(storyID);
  if (!res) return null;
  state.story.currentStory = res;
  return res;
};

export const updateStory = async ({ effects }, story) => {
  const res = await effects.story.storyAPI.updateStory(story);
  if (!res) return null;
  return res;
};

export const deleteStory = async ({ state, effects }, storyId) => {
  const res = await effects.story.storyAPI.deleteStory(storyId);
  if (!res) return null;
  state.story.currentStory = {};
  return res;
};
