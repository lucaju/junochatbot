export const getIntents= async ({ state, effects }) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.intents.api.getIntents({ storyId, token });
  if (!res) return null;
  state.intents.collection = res;
};

export const getIntent = async ({ state, effects }, intentId) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.intents.api.getIntent({ intentId, storyId, token });
  if (!res) return null;
  state.intents.currentIntent = res;
  return res;
};

export const createIntent = async ({ state, effects }, intent) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.videos.api.createIntent({ intent, storyId, token });
  if (!res) return null;
  state.intent.currentIntent = res;
  // state.intent.collection.unshift(res);
  return res;
};

export const updateIntent = async ({ state, effects }, intent) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.intent.api.updateIntent({ intent, storyId, token });
  if (!res) return null;

  state.intent.currentIntent = res;

  state.intent.collection = state.intent.collection.map((itt) => {
    if (res.id === itt.id) return res;
    return intent;
  });
  return res;
};

export const deleteIntent = async ({ state, effects }, intentId) => {
  const token = state.session.user.token;
  const storyId = state.story.currentStory.id;

  const res = await effects.intents.api.deleteIntent({ intentId, storyId, token });
  if (!res) return null;
  state.intent.currentIntent = {};
  state.intent.collection = state.intent.collection.filter(
    (intent) => intent.id !== intentId
  );
  return intentId;
};

///** CONTEXT */

export const getContextCollection = async ({ state }) => {
  const contextCollection = [];

  state.intents.collection.forEach(({ title, contexts }) => {
    if (contexts.length === 0) return;
    contexts.forEach((context) => {
      const intent = {
        title,
        type: context.type,
        spanLife: context.spanLife,
      };

      const ctx = contextCollection.find((_ctx) => _ctx.id === context.id);

      if (!ctx) {
        contextCollection.push({
          id: context.id,
          name: context.name,
          intents: [intent],
        });
      } else {
        ctx.intents.push(intent);
      }
    });
  });

  state.intents.contextCollection = contextCollection;
};
