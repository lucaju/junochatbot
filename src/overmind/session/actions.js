export const getStories = async ({ state, effects }) => {
  state.session.stories = await effects.session.stories.getStories();
};
