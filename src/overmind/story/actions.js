export const createStory = async ({ state, effects }, story) => {
  if (!state.session.isAdmin && !state.session.instructor) return null;
  const res = await effects.story.createStory(story);
  state.story.story = res;
  return res;
};
