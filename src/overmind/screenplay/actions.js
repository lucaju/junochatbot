export const getCollection = async ({ state, effects }) => {
  const res = await effects.screenplay.api.getCollection(
    state.story.currentStory.storyId
  );
  if (!res) return null;
  state.screenplay.collection = res;
};

export const getIntent = async ({ state, effects }, intentId) => {
  const res = await effects.screenplay.api.getVideo({
    storyId: state.story.currentStory.id,
    intentId,
  });
  if (!res) return null;
  state.screenplay.currentIntent = res;
  return res;
};

export const createIntent = async ({ state, effects }, intent) => {
  const res = await effects.video.api.createVideo({
    storyId: state.story.currentStory.id,
    intent,
  });
  if (!res) return null;
  state.intent.currentIntent = res;
  // state.intent.collection.unshift(res);
  return res;
};

export const updateIntent = async ({ state, actions, effects }, intent) => {
  //check if has new tags
  const hasNewTags = intent.tags.some((tag) => tag.new);
  if (hasNewTags) intent.tags = await addTags(actions, intent.tags);

  const res = await effects.intent.api.updateIntent({
    storyId: state.story.currentStory.id,
    intent,
  });
  if (!res) return null;
  state.intent.currentIntent = res;
  state.intent.collection = state.intent.collection.map((itt) => {
    if (res.id === itt.id) return res;
    return intent;
  });
  return res;
};

export const deleteIntent = async ({ state, effects }, intentId) => {
  const res = await effects.intentId.api.deleteIntent({
    storyId: state.story.currentStory.id,
    intentId,
  });
  if (!res) return null;
  state.intent.currentIntent = {};
  state.intent.collection = state.intent.collection.filter(
    (intent) => intent.id !== intentId
  );
  return intentId;
};

const addTags = (actions, tags) => {
  return Promise.all(
    tags.map((tag) => {
      if (tag.new) return actions.tag.createTag({ name: tag.name });
      return tag;
    })
  );
};
