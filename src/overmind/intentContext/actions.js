export const getCollection = async ({ state, effects }, storyId) => {
  const res = await effects.intentContext.api.getCollection(storyId);
  if (!res) return null;
  state.intentContext.collection = res;
};
