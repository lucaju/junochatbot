export const getVideos = async ({ state, effects }) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  if (!storyId) return null;

  const collection = await effects.videos.api.getVideos({ storyId, token });
  if (!collection) return null;

  state.videos.collection = collection.reverse();
  return state.videos.collection;
};

export const getVideo = async ({ state, effects }, videoId) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const video = await effects.videos.api.getVideo({ videoId, storyId, token });
  if (!video) return null;

  state.videos.currentVideo = video;
  return video;
};

export const createVideo = async ({ state, effects }, values) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  //1. Split data
  const newVideoData = { ...values };

  const tags = newVideoData.tags.length > 0 ? newVideoData.tags : null;
  delete newVideoData.tags;

  //2. Create Video
  const video = await effects.videos.api.createVideo({
    video: newVideoData,
    storyId,
    token,
  });
  if (video.error) return { error: video.error };

  //3. Assign groups
  if (video && tags) {
    video.tags = [];
    //assign each group to user
    for await (const tag of tags) {
      const newTag = await addTagToVideo(
        { state, effects },
        {
          tag,
          videoId: video.id,
        }
      );
      if (!newTag.error) video.tags = [...video.tags, tag];
    }
  }

  //4. add to state
  state.videos.collection.unshift(video);
  state.videos.currentVideo = video;

  return video;
};

export const updateVideo = async (
  { state, effects },
  { videoData, values }
) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  //1. Split data
  let newValues = { ...values };

  const videoTagsSet = new Set(videoData.tags.map(({ id }) => id));
  const valuesTagsSet = new Set(values.tags.map(({ id }) => id));

  const tagsToAdd = values.groups.filter(({ id }) => !videoTagsSet.has(id));
  const tagsToRemove = videoData.groups.filter(
    ({ id }) => !valuesTagsSet.has(id)
  );
  delete newValues.tags;

  //2. Check if video data changed
  if (
    newValues.url === videoData.url &&
    newValues.image === videoData.image &&
    newValues.title === videoData.title &&
    newValues.channelTitle === videoData.channelTitle &&
    newValues.publishedAt === videoData.publishedAt &&
    newValues.duration === videoData.duration &&
    newValues.description === videoData.description
  ) {
    newValues = null;
  }

  //3. update Video
  if (newValues) {
    const response = await effects.videos.api.updateVideo({
      video: newValues,
      storyId,
      token,
    });
    if (response.error) return response;
  } else {
    newValues = videoData;
  }

  //4. Add to group
  newValues.tags = videoData.tags;

  if (tagsToAdd?.length > 0) {
    for await (const tag of tagsToAdd) {
      const newTag = await addTagToVideo(
        { state, effects },
        {
          tag,
          videoId: newValues.id,
        }
      );
      if (!newTag.error) newValues.tags = [...newValues.tags, tag];
    }
  }

  //5. remove from group
  if (tagsToRemove?.length > 0) {
    for await (const tag of tagsToRemove) {
      const res = await removeTagFromVideo(
        { state, effects },
        {
          tagId: tag.id,
          videoId: newValues.id,
        }
      );
      if (!res.error) {
        newValues.tags.filter((videoTag) => videoTag.id !== tag.id);
      }
    }
  }

  //7. update state;
  state.videos.collection = state.videos.collection.map((video) => {
    if (video.id === newValues.id) video = newValues;
    return video;
  });

  return videoData;
};

export const deleteVideo = async ({ state, effects }, videoId) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const response = await effects.videos.api.deleteVideo({
    videoId,
    storyId,
    token,
  });
  if (response.error) return response;

  state.videos.currentVideo = {};
  state.videos.collection = state.videos.collection.filter(
    (video) => video.id !== videoId
  );
  return videoId;
};

// * YOUTUBE DATA ----------

export const getYoutubeData = async ({ effects }, youtubeVideoId) => {
  const res = await effects.videos.api.getYoutubeData(youtubeVideoId);
  if (!res) return null;
  return res;
};

// * TAGS ----------

export const getTags = async ({ state, effects }) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.videos.api.getTags({ storyId, token });
  if (!res) return null;
  state.videos.tagCollection = sortBy(res, 'name');
  return res;
};

export const getTag = async ({ state, effects }, tagId) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.videos.api.getTag({ tagId, storyId, token });
  if (!res) return null;
  state.videos.currentTag = res;
  return res;
};

export const createTag = async ({ state, effects }, tag) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.videos.api.createTag({ storyId, tag, token });
  if (!res) return null;

  state.videos.currentTag = res;
  state.videos.tagCollection.unshift(res);
  return res;
};

export const updateTag = async ({ state, effects }, tag) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.videos.api.updateTag({ tag, storyId, token });
  if (!res) return null;
  
  state.videos.currentTag = res;
  state.videos.tagCollection = state.videos.tagCollection.map((tag) => {
    if (res.id === tag.id) return res;
    return tag;
  });

  return res;
};

export const updateTagStatus = async ({ state, effects }, tag) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.videos.api.updateTagStatus({ tag, storyId, token });
  if (!res) return null;

  state.videos.currentTag = {};
  state.videos.tagCollection = state.videos.tagCollection.map((tag) => {
    if (res.id === tag.id) return res;
    return tag;
  });
  
  return res;
};

// * TAGS X VIDEOS----------

const addTagToVideo = async ({ state, effects }, { tag, videoId }) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  if (!tag.id) {
    tag = await createTag({ state, effects }, tag);
    if (tag.error) return tag;
  }

  const assinedTag = await effects.videos.api.addTagToVideo({
    tagId: tag.id,
    storyId,
    videoId,
    token,
  });

  if (assinedTag.error) return assinedTag;

  return tag;
};

const removeTagFromVideo = async ({ state, effects }, { tagId, videoId }) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.videos.api.removeTagFromVideo({
    tagId,
    storyId,
    videoId,
    token,
  });

  if (res.error) return res;

  return res;
};


//***** UTIL */

const sortBy = (items, prop) => {
  items.sort((a, b) => {
    const propA = a[prop].toUpperCase(); // ignore upper and lowercase
    const propB = b[prop].toUpperCase(); // ignore upper and lowercase
    if (propA < propB) return -1;
    if (propA > propB) return 1;
    return 0;
  });
  return items;
};