import { Context } from 'overmind';
import { isError, sortBy } from '../../util/utilities';
import type { ErrorMessage, Video, Tag } from '../../types';

export const getVideos = async ({
  state,
  effects,
}: Context): Promise<Video[] | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authuser = state.session.user;
  if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.getVideos(storyId, authuser.token);
  if (isError(response)) return response;

  state.videos.collection = response.reverse();

  return state.videos.collection;
};

export const getVideo = async (
  { state, effects }: Context,
  videoId: number
): Promise<Video | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authuser = state.session.user;
  if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.getVideo(
    storyId,
    videoId,
    authuser.token
  );
  if (isError(response)) return response;

  return response;
};

export const createVideo = async (
  { state, actions, effects }: Context,
  values: Omit<Video, 'id'>
): Promise<Video | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authuser = state.session.user;
  if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

  //1. Split data
  const newVideoData = { ...values };

  const tags =
    newVideoData.tags && newVideoData.tags.length > 0
      ? newVideoData.tags
      : null;
  delete newVideoData.tags;

  //2. Create Video
  const video = await effects.videos.api.createVideo(
    storyId,
    newVideoData,
    authuser.token
  );
  if (isError(video)) return video;

  //3. Assign groups
  if (video && tags) {
    video.tags = [];
    //assign each group to user
    for await (const tag of tags) {
      const newTag = await actions.videos.addTagToVideo({
        videoId: video.id,
        tag,
      });
      if (!isError(newTag)) video.tags = [...video.tags, tag];
    }
  }

  //4. add to state
  state.videos.collection = [video, ...state.videos.collection];

  return video;
};

export const updateVideo = async (
  { state, actions, effects }: Context,
  { videoData, values }: { videoData: Partial<Video>; values: Partial<Video> }
): Promise<Video | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  //1. Split data
  let newValues: Video = { ...values } as Video;

  const videoTagsSet = new Set(videoData.tags?.map(({ id }) => id));
  const valuesTagsSet = new Set(values.tags?.map(({ id }) => id));

  const tagsToAdd = values.tags?.filter(({ id }) => !videoTagsSet.has(id));
  const tagsToRemove = videoData.tags?.filter(
    ({ id }) => !valuesTagsSet.has(id)
  );
  delete newValues.tags;

  //2. Check if video data changed
  const videoDatahasChanged =
    newValues.url === videoData.url &&
    newValues.imageUrl === videoData.imageUrl &&
    newValues.title === videoData.title &&
    newValues.channelName === videoData.channelName &&
    newValues.publishedAt === videoData.publishedAt &&
    newValues.duration === videoData.duration &&
    newValues.description === videoData.description
      ? false
      : true;

  //3. update Video
  if (videoDatahasChanged) {
    const response = await effects.videos.api.updateVideo(
      storyId,
      newValues,
      authUser.token
    );
    if (isError(response)) return response;
  } else {
    newValues = videoData as Video;
  }

  //4. Add to group
  newValues.tags = videoData.tags;

  if (tagsToAdd && tagsToAdd.length > 0) {
    for await (const tag of tagsToAdd) {
      const newTag = await actions.videos.addTagToVideo({
        videoId: newValues.id,
        tag,
      });
      if (!isError(newTag)) {
        if (!newValues.tags) newValues.tags = [];
        newValues.tags = [...newValues.tags, tag];
      }
    }
  }

  //5. remove from group
  if (tagsToRemove && tagsToRemove?.length > 0) {
    for await (const tag of tagsToRemove) {
      const removeTag = await actions.videos.removeTagFromVideo({
        videoId: newValues.id,
        tagId: tag.id,
      });
      if (!isError(removeTag)) {
        newValues.tags?.filter((videoTag) => videoTag.id !== tag.id);
      }
    }
  }

  //7. update state;
  state.videos.collection = state.videos.collection.map((v: Video) => {
    if (v.id === newValues.id) v = newValues;
    return v;
  });

  return videoData as Video;
};

export const deleteVideo = async (
  { state, effects }: Context,
  videoId: number
): Promise<boolean | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.deleteVideo(
    storyId,
    videoId,
    authUser.token
  );
  if (isError(response)) return response;

  state.videos.collection = state.videos.collection.filter(
    (v: Video) => v.id !== videoId
  );

  return true;
};

// * YOUTUBE DATA ----------

export const getYoutubeData = async (
  { effects }: Context,
  youtubeVideoId: string
): Promise<Partial<Video> | ErrorMessage> => {
  const response = await effects.videos.api.getYoutubeData(youtubeVideoId);
  if (isError(response)) return response;

  return response;
};

// * TAGS ----------
export const getTags = async ({
  state,
  effects,
}: Context): Promise<Tag[] | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.getTags(storyId, authUser.token);
  if (isError(response)) return response;

  state.videos.tagCollection = sortBy(response, 'name');
  return state.videos.tagCollection;
};

export const getVideoTags = async (
  { state, effects }: Context,
  videoId: number
): Promise<Tag[] | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.getVideoTags(
    videoId,
    authUser.token
  );
  if (isError(response)) return response;

  return response;
};

export const getTag = async (
  { state, effects }: Context,
  tagId: number
): Promise<Tag | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.getTag(
    storyId,
    tagId,
    authUser.token
  );
  if (isError(response)) return response;

  return response;
};

export const createTag = async (
  { state, effects }: Context,
  tag: Omit<Tag, 'id'>
): Promise<Tag | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.createTag(
    storyId,
    tag,
    authUser.token
  );
  if (isError(response)) return response;

  state.videos.tagCollection = [response, ...state.videos.tagCollection];
  return response;
};

export const updateTag = async (
  { state, effects }: Context,
  tag: Tag
): Promise<Tag | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.updateTag(
    storyId,
    tag,
    authUser.token
  );
  if (isError(response)) return response;

  state.videos.tagCollection = state.videos.tagCollection.map((t: Tag) => {
    if (t.id === response.id) t = response;
    return t;
  });

  return tag;
};

export const deleteTag = async ({ state, effects }: Context, tagId: number) => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.deleteTag(
    storyId,
    tagId,
    authUser.token
  );
  if (isError(response)) return response;

  state.videos.tagCollection = state.videos.tagCollection.filter(
    (t) => t.id !== tagId
  );

  return response;
};

// * TAGS X VIDEOS----------

export const addTagToVideo = async (
  { state, actions, effects }: Context,
  { videoId, tag }: { videoId: number; tag: Partial<Tag> }
): Promise<Tag | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  if (!tag.id) {
    const newTag = await actions.videos.createTag(tag as Omit<Tag, 'id'>);
    if (isError(newTag)) return newTag;
    tag = newTag;
  }
  if (!tag.id) return { errorMessage: 'Erros assigning tag to video' };

  const response = await effects.videos.api.addTagToVideo(
    videoId,
    tag.id,
    authUser.token
  );
  if (isError(response)) return response;

  return tag as Tag;
};

export const removeTagFromVideo = async (
  { state, effects }: Context,
  { videoId, tagId }: { videoId: number; tagId: number }
): Promise<boolean | ErrorMessage> => {
  const authuser = state.session.user;
  if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.videos.api.removeTagFromVideo(
    videoId,
    tagId,
    authuser.token
  );

  if (isError(response)) return response;

  return true;
};
