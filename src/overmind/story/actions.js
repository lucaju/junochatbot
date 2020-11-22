export const getStories = async ({ state, effects }) => {
  state.story.stories = await effects.story.getStories();
};

export const createStory = async ({ state, effects }, story) => {
  if (!state.session.isAdmin && !state.session.instructor) return null;
  const res = await effects.story.createStory(story);
  if (!res) return null;
  state.story.id = res.id;
  state.story.permalink = res.permalink;
  state.story.title = res.title;
  state.story.owner = res.owner;
  state.story.language = res.language;
  state.story.general = res.general;
  return res;
};

export const editStory = async ({ state, effects }, storyID) => {
  // if (!state.session.isAdmin && !state.session.instructor) return null;
  const res = await effects.story.editStory(storyID);
  if (!res) return null;
  state.story.id = res.id;
  state.story.permalink = res.permalink;
  state.story.title = res.title;
  state.story.owner = res.owner;
  state.story.language = res.language;
  state.story.general = res.general;
  return res;
};
