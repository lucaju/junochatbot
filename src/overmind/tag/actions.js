export const getCollection = async ({ state, effects }) => {
  const res = await effects.tag.api.getTags(state.story.currentStory.id);
  if (!res) return null;
  state.tag.collection = res;
  return res;
};

export const getTag = async ({ state, effects }, tagId) => {
  const res = await effects.tag.api.getTag({
    storyId: state.story.currentStory.id,
    tagId,
  });
  if (!res) return null;
  state.tag.currentTag = res;
  return res;
};

export const createTag = async ({ state, effects }, tag) => {
  const res = await effects.tag.api.createTag({
    storyId: state.story.currentStory.id,
    tag,
  });
  if (!res) return null;
  state.tag.currentTag = res;
  // state.tag.collection.unshift(res);
  return res;
};

export const updateTag = async ({ state, effects }, tag) => {
  const res = await effects.tag.api.updateTag({
    storyId: state.story.currentStory.id,
    tag,
  });
  if (!res) return null;
  state.tag.currentTag = res;
  state.tag.collection = state.tag.collection.map((tag) => {
    if (res.id === tag.id) return res;
    return tag;
  });
  return res;
};

export const deleteTag = async ({ state, effects }, tagId) => {
  const res = await effects.tag.api.deleteTag({
    storyId: state.story.currentStory.id,
    tagId,
  });
  if (!res) return null;
  state.tag.currentTag = {};
  state.tag.collection = state.tag.collection.filter((tag) => tag.id !== tagId);
  return tagId;
};
