export const getCollection = async ({ state, effects }) => {
  const res = await effects.video.api.getCollection(
    state.story.currentStory.storyId
  );
  if (!res) return null;
  state.video.collection = res;
};

export const getVideo = async ({ state, effects }, videoId) => {
  const res = await effects.video.api.getVideo({
    storyId: state.story.currentStory.id,
    videoId,
  });
  if (!res) return null;
  state.video.currentVideo = res;
  return res;
};

export const createVideo = async ({ state, effects }, video) => {
  const res = await effects.video.api.createVideo({
    storyId: state.story.currentStory.id,
    video,
  });
  if (!res) return null;
  state.video.currentVideo = res;
  // state.video.collection.unshift(res);
  return res;
};

export const updateVideo = async ({ state, actions, effects }, video) => {
  //check if has new tags
  const hasNewTags = video.tags.some((tag) => tag.new);
  if (hasNewTags) video.tags = await addTags(actions, video.tags);

  const res = await effects.video.api.updateVideo({
    storyId: state.story.currentStory.id,
    video,
  });
  if (!res) return null;
  state.video.currentVideo = res;
  state.video.collection = state.video.collection.map((v) => {
    if (res.id === v.id) return res;
    return video;
  });
  return res;
};

export const deleteVideo = async ({ state, effects }, videoId) => {
  const res = await effects.video.api.deleteVideo({
    storyId: state.story.currentStory.id,
    videoId,
  });
  if (!res) return null;
  state.video.currentVideo = {};
  state.video.collection = state.video.collection.filter(
    (video) => video.id !== videoId
  );
  return videoId;
};

const addTags = (actions, tags) => {
  return Promise.all(
    tags.map((tag) => {
      if (tag.new) return actions.tag.createTag({ name: tag.name });
      return tag;
    })
  );
};
