import type {
  Entity,
  ErrorMessage as IError,
  Intent,
  Message,
  Struct,
  TrainingPhrase,
  Value,
} from '@src/types';
import { isError, sortBy } from '@src/util/utilities';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';
import { extractContextName } from './actionsContext';
import { trainingPhrasesCollection } from '@src/util/trainingPhrases';
import { responsePresetCollection } from '@src/util/responsePresets';
import { hasOutputContext } from './actionsContext';

export * from './actionsContext';
export * from './actionsParameters';
export * from './actionsResponses';
export * from './actionsTraning';

export const resetState = ({ state }: Context) => {
  state.intents.collection = [];
  state.intents.currentIntent = undefined;
  state.intents.entities = [];
};

export const getIntents = async ({
  state,
  actions,
  effects,
}: Context): Promise<Intent[] | IError> => {
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
): Promise<Intent | IError> => {
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

export const createIntent = async ({ state, effects }: Context): Promise<Intent | IError> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const currentIntent = state.intents.currentIntent;
  if (!currentIntent) return { errorMessage: 'Not Intent' };

  const response = await effects.intents.api.createIntent(storyId, currentIntent, authUser.token);
  if (isError(response)) return response;

  const intents = [response, ...state.intents.collection];
  state.intents.collection = sortBy(intents, 'displayName');

  state.intents.currentIntent = response;

  return response;
};

type IFollowUpIntent = {
  originIntent: Intent;
  followUpType: string;
  sharedContext: string;
};

export const createFollowUpIntent = async (
  { state, actions }: Context,
  { originIntent, followUpType }: Omit<IFollowUpIntent, 'sharedContext'>
): Promise<string | IError> => {
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
  if (!hasOutputContext(originIntent.outputContexts, sharedContext)) {
    await actions.intents._addFollowupSharedContext({ originIntent, sharedContext });
  }

  state.intents.currentIntent = responseFollowUpIntentCreation;

  const intentName = responseFollowUpIntentCreation.name ?? '';
  return intentName;
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
  { originIntent, followUpType, sharedContext }: IFollowUpIntent
): Promise<Intent | IError> => {
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

  const intents = [response, ...state.intents.collection];
  state.intents.collection = sortBy(intents, 'displayName');

  return response;
};

export const _addFollowupSharedContext = async (
  { actions }: Context,
  { originIntent, sharedContext }: Omit<IFollowUpIntent, 'followUpType'>
): Promise<Intent | IError> => {
  const originOutputContexts = originIntent.outputContexts ?? [];

  originIntent.outputContexts = [
    ...originOutputContexts,
    { name: sharedContext, lifespanCount: 1 },
  ];

  const response = await actions.intents.updateIntent(originIntent);
  if (isError(response)) return response;

  return response;
};

export const setIntentHaChange = ({ state }: Context, value: boolean) => {
  if (state.intents.currentIntent) state.intents.currentIntent.hasChanged = value;
};

export const updateIntent = async (
  { state, actions, effects }: Context,
  intent?: Intent
): Promise<Intent | IError> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  if (!intent) return { errorMessage: 'Not Intent' };

  //revert transformation and remove additonal values
  const intentToSubmit = partIntentToSubmit({ ...intent });

  //remove read-only attributes
  delete intentToSubmit.rootFollowupIntentName;
  delete intentToSubmit.parentFollowupIntentName;
  delete intentToSubmit.followupIntentInfo;

  const response = await effects.intents.api.updateIntent(storyId, intentToSubmit, authUser.token);
  if (isError(response)) return response;

  const fetchCurrentIntent = response.name
    ? await actions.intents.getIntent(response.name)
    : response;
  const updatedIntent = 'name' in fetchCurrentIntent ? fetchCurrentIntent : response;

  state.intents.collection = state.intents.collection.map((intent) =>
    response.name === intent.name ? { ...updatedIntent } : { ...intent }
  );

  state.intents.collection = sortBy([...state.intents.collection], 'displayName');

  return response;
};

export const updateDefaultWelcomeIntent = async ({ state, effects }: Context) => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const defaultWelcomeIntent = state.intents.collection.find(
    (intent) => intent.displayName === 'Default Welcome Intent'
  );
  if (!defaultWelcomeIntent) return { errorMessage: 'No default welcome intent found' };

  //Add preset training phrases
  const languageCode = state.story.currentStory?.languageCode;
  const phraseCollection = `defaultWelcome-${languageCode}`;
  const trainingSet = trainingPhrasesCollection.get(phraseCollection) ?? [];

  const trainingPhrases: TrainingPhrase[] = trainingSet.map((phrase) => ({
    parts: [{ text: phrase }],
    timesAddedCount: 1,
    type: 'EXAMPLE',
  }));

  defaultWelcomeIntent.trainingPhrases = trainingPhrases;

  //revert transformation and remove additonal values
  const intentToSubmit = partIntentToSubmit({ ...defaultWelcomeIntent });

  //remove readonly attributes
  delete intentToSubmit.rootFollowupIntentName;
  delete intentToSubmit.parentFollowupIntentName;
  delete intentToSubmit.followupIntentInfo;

  const response = await effects.intents.api.updateIntent(storyId, intentToSubmit, authUser.token);
  if (isError(response)) return response;
};

export const updateDefaultFallbackIntent = async ({ state, effects }: Context) => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const defaultFallbackIntent = state.intents.collection.find(
    (intent) => intent.displayName === 'Default Fallback Intent'
  );
  if (!defaultFallbackIntent) return { errorMessage: 'No default fallback intent found' };

  //Add preset response
  const languageCode = state.story.currentStory?.languageCode;
  const responseCollection = `fallbackGeneral-${languageCode}`;
  const responses = responsePresetCollection.get(responseCollection) ?? [];

  const message: Message = { text: { text: responses } };

  defaultFallbackIntent.messages = [message];

  //revert transformation and remove additonal values
  let intentToSubmit = partIntentToSubmit({ ...defaultFallbackIntent });

  //remove read-only attributes
  delete intentToSubmit.rootFollowupIntentName;
  delete intentToSubmit.parentFollowupIntentName;
  delete intentToSubmit.followupIntentInfo;

  const response = await effects.intents.api.updateIntent(storyId, intentToSubmit, authUser.token);
  if (isError(response)) return response;
};

const partIntentToSubmit = (intent: Intent): Intent => {
  //* remove UUID from message array
  if (intent.messages) {
    const messages: Message[] = [];
    intent.messages.forEach((message) => {
      if ('payload' in message) {
        const { payload } = message;
        if (payload.source === '-1') return;
        messages.push({ payload });
      } else {
        const { text } = message;
        if (!text.text || text.text.length === 0 || text.text[0] === '') return;
        messages.push({ text });
      }
    });

    intent.messages = messages;
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
    const inputContextNames: string[] = [];
    intent.inputContexts.forEach((context) => {
      if (context.name !== '') inputContextNames.push(context.name);
    });
    intent.inputContextNames = inputContextNames;
  }
  delete intent.inputContexts;

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

  //custo controle attribute
  delete intent.hasChanged;

  return intent;
};

export const deleteIntent = async (
  { state, effects }: Context,
  intentName?: string
): Promise<boolean | IError> => {
  if (!intentName) return { errorMessage: 'Not Intent to delete' };

  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.deleteIntent(storyId, intentName, authUser.token);
  if (isError(response)) return response;

  state.intents.currentIntent = undefined;
  state.intents.collection = state.intents.collection.filter((itt) => itt.name !== intentName);
  state.intents.collection = state.intents.collection.filter(
    (itt) => itt.parentFollowupIntentName !== intentName
  );

  return true;
};

export const getIntentDisplayNameByName = ({ state }: Context, name?: string) => {
  if (!name) return;
  const intent = state.intents.collection.find((intent) => intent.name === name);
  return intent?.displayName;
};

//** Entity */

export const getEntities = async ({ state, effects }: Context): Promise<Entity[] | IError> => {
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
