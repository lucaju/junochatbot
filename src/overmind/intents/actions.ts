import type { Entity, ErrorMessage, Intent, TrainingPhrase } from '@src/types';
import { isError, sortBy } from '@src/util/utilities';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';
import { extractContextName } from './actionsContext';
import { trainingPhrasesCollection } from '@src/util/trainingPhrases';

export * from './actionsContext';
export * from './actionsParameters';
export * from './actionsResponses';
export * from './actionsTraning';

export const getIntents = async ({
  state,
  actions,
  effects,
}: Context): Promise<Intent[] | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.getIntents(storyId, authUser.token);

  if (isError(response)) return response;

  //load videos, tags, and entities
  if (state.videos.collection.length === 0) await actions.videos.getVideos();
  if (state.videos.tagCollection.length === 0) await actions.videos.getTags();
  if (state.intents.entities.length === 0) await actions.intents.getEntities();

  const intents = sortBy(response, 'displayName'); 

  state.intents.collection = intents;
  return state.intents.collection;
};

export const getIntent = async (
  { state, effects }: Context,
  intentName: string
): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.getIntent(storyId, intentName, authUser.token);
  if (isError(response)) return response;

  const currentIntent: Intent = { ...response };

  //* insert UUID into message array
  if (currentIntent.messages) {
    currentIntent.messages = currentIntent.messages.map((message) => {
      return { id: uuidv4(), ...message };
    });
  }

  //* insert UUID output Context array
  if (currentIntent.outputContexts) {
    currentIntent.outputContexts = currentIntent.outputContexts.map((context) => {
      return {
        id: uuidv4(),
        type: 'output',
        shortName: extractContextName(context.name),
        ...context,
      };
    });
  }

  //* insert inputContexts for better control inputContextNames
  if (currentIntent.inputContextNames) {
    currentIntent.inputContexts = currentIntent.inputContextNames.map((name) => {
      return { id: uuidv4(), type: 'input', shortName: extractContextName(name), name };
    });
  }

  state.intents.currentIntent = currentIntent;
  return currentIntent;
};

export const createIntent = async ({ state, effects }: Context): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const currentIntent = state.intents.currentIntent;
  if (!currentIntent) return { errorMessage: 'Not Intent' };

  const response = await effects.intents.api.createIntent(storyId, currentIntent, authUser.token);
  if (isError(response)) return response;

  state.intents.collection = [response, ...state.intents.collection];
  state.intents.currentIntent = response;

  return response;
};

export const createFollowUpIntent = async (
  { state, actions }: Context,
  { originIntent, followUpType }: { originIntent: Intent; followUpType: string }
): Promise<Intent | ErrorMessage> => {
  if (!originIntent.name) return { errorMessage: 'Not Intent' };

  // shared context
  const sharedContext = _createFollowUpSharedContext(originIntent.name, originIntent.displayName);

  //create follow Up Intent
  const responseFollowUpIntentCreation = await actions.intents._createFollowUpIntent({
    originIntent,
    followUpType,
    sharedContext,
  });
  if (isError(responseFollowUpIntentCreation)) return responseFollowUpIntentCreation;

  //update origin intent
  const updatedOriginIntent: Intent = { ...originIntent };
  const originOutputContexts = updatedOriginIntent.outputContexts ?? [];
  updatedOriginIntent.outputContexts = [
    ...originOutputContexts,
    { name: sharedContext, lifespanCount: 2 },
  ];

  const responseOriginIntentUpdate = await actions.intents.updateIntent(updatedOriginIntent);
  if (isError(responseOriginIntentUpdate)) return responseOriginIntentUpdate;

  //return
  state.intents.currentIntent = responseFollowUpIntentCreation;
  return responseFollowUpIntentCreation;
};

export const _createFollowUpSharedContext = (
  originIntentName: string,
  originIntentDisplayName: string
) => {
  const splitName = originIntentName.split('/');
  const [, projectName] = splitName;

  const sanitizeContextName = originIntentDisplayName.replace(/\s+/g, ''); //remove spaces.
  const sharedContext = `projects/${projectName}/agent/sessions/-/contexts/${sanitizeContextName}-followUp`;

  return sharedContext;
};

export const _createFollowUpIntent = async (
  { state, effects }: Context,
  {
    originIntent,
    followUpType,
    sharedContext,
  }: { originIntent: Intent; followUpType: string; sharedContext: string }
): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  //create follow up intent
  const followUpIntent: Intent = {
    displayName: `${originIntent.displayName}-${followUpType}`,
    parentFollowupIntentName: originIntent.name,
    inputContextNames: [sharedContext],
  };

  if (followUpType === 'fallback') followUpIntent.isFallback = true;

  //preset training phrases
  if (followUpType !== 'fallback') {
    const languageCode = state.story.currentStory?.languageCode;
    const phraseCollection = `${followUpType}-${languageCode}`;
    const trainingSet = trainingPhrasesCollection.get(phraseCollection) ?? [];
    const trainingPhrases: TrainingPhrase[] = trainingSet.map((phrase) => ({
      parts: [{ text: phrase }],
      timesAddedCount: 1,
      type: 'EXAMPLE',
    }));

    followUpIntent.trainingPhrases = trainingPhrases;
  }

  const response = await effects.intents.api.createIntent(storyId, followUpIntent, authUser.token);
  if (isError(response)) return response;

  state.intents.collection = [response, ...state.intents.collection];

  return response;
};

export const updateIntent = async (
  { state, actions, effects }: Context,
  intent?: Intent
): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  if (!intent) return { errorMessage: 'Not Intent' };

  // console.log({ ...intent });

  //revert transformation and remove additonal values
  const intentToSubmit = partIntentToSubmit({ ...intent });

  //remove readonly attributes
  delete intentToSubmit.rootFollowupIntentName;
  delete intentToSubmit.parentFollowupIntentName;
  delete intentToSubmit.followupIntentInfo;

  // console.log(intentToSubmit);

  const response = await effects.intents.api.updateIntent(storyId, intentToSubmit, authUser.token);
  if (isError(response)) return response;

  const fetchCurrentIntent = response.name
    ? await actions.intents.getIntent(response.name)
    : response;
  const updatedIntent = 'name' in fetchCurrentIntent ? fetchCurrentIntent : response;

  // actions.intents.closeCurrentIntent();

  state.intents.collection = state.intents.collection.map((intent) =>
    response.name === intent.name ? updatedIntent : intent
  );

  return response;
};

const partIntentToSubmit = (intent: Intent): Intent => {
  //* remove UUID from message array
  if (intent.messages) {
    intent.messages = intent.messages.map((message) => {
      if ('payload' in message) {
        return { payload: message.payload };
      } else {
        return { text: message.text };
      }
    });
  }

  //* remvoe UUID from output Context array
  if (intent.outputContexts) {
    intent.outputContexts = intent.outputContexts.map((context) => {
      return {
        name: context.name,
        lifespanCount: context.lifespanCount,
        parameters: context.parameters,
      };
    });
  }

  //* translate inputContexts to inputContextNames
  if (intent.inputContexts) {
    intent.inputContextNames = intent.inputContexts.map((context) => {
      return context.name;
    });
  }

  //* remove UUID for new parameters
  if (intent.parameters) {
    intent.parameters = intent.parameters.map((parameter) => {
      if (parameter.name?.includes('new-')) {
        return {
          displayName: parameter.displayName,
          value: parameter.value,
          defaultValue: parameter.defaultValue,
          entityTypeDisplayName: parameter.entityTypeDisplayName,
          mandatory: parameter.mandatory,
          prompts: parameter.prompts,
          isList: parameter.isList,
        };
      }
      return parameter;
    });
  }

  //* remove UUID for new traning phrases
  if (intent.trainingPhrases) {
    intent.trainingPhrases = intent.trainingPhrases.map((phrase) => {
      if (phrase.name?.includes('new-')) {
        return {
          type: phrase.type,
          parts: phrase.parts,
          timesAddedCount: phrase.timesAddedCount,
        };
      }
      return phrase;
    });
  }

  return intent;
};

export const deleteIntent = async (
  { state, effects }: Context,
  intentName?: string
): Promise<boolean | ErrorMessage> => {
  if (!intentName) return { errorMessage: 'Not Intent to delete' };

  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.deleteIntent(storyId, intentName, authUser.token);
  if (isError(response)) return response;

  state.intents.currentIntent = undefined;
  state.intents.collection = state.intents.collection.filter((itt) => itt.name !== intentName);

  return true;
};

export const getIntentDisplayNameByName = ({ state }: Context, name?: string) => {
  if (!name) return;
  const intent = state.intents.collection.find((intent) => intent.name === name);
  return intent?.displayName;
};

//** Entity */

export const getEntities = async ({
  state,
  effects,
}: Context): Promise<Entity[] | ErrorMessage> => {
  if (state.intents.entities.length > 0) return state.intents.entities;

  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const sysEntities = await effects.intents.api.getSysEntities(authUser.token);
  if (isError(sysEntities)) return sysEntities;

  const customEntities = await effects.intents.api.getCustomEntities(storyId, authUser.token);
  if (isError(customEntities)) return customEntities;

  let entities = [...sysEntities, ...customEntities];
  entities = entities.map((entity, i) => {
    entity.id = i;
    return entity;
  });

  state.intents.entities = entities;
  return entities;
};

//** VIDEOS AND TAGS */

export const getVideoById = ({ state }: Context, id: number) => {
  const video = state.videos.collection.find((v) => v.id === id);
  return video;
};

export const getTagById = ({ state }: Context, id: number) => {
  const tag = state.videos.tagCollection.find((t) => t.id === id);
  return tag;
};

///

//Current

export const createNewIntent = ({ state }: Context) => {
  state.intents.currentIntent = { displayName: '' };
};

export const closeCurrentIntent = ({ state }: Context) => {
  state.intents.currentIntent = undefined;
};

export const updateCurrentDisplayName = ({ state }: Context, value: string) => {
  if (!state.intents.currentIntent) return;
  state.intents.currentIntent.displayName = value;
};
