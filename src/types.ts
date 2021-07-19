//GENERAL
export interface Language {
  value: string;
  name: string;
}

export enum RoleType {
  ADMIN = 'Admin',
  INSTRUCTOR = 'Instructor',
  STUDENT = 'Student',
}

export interface ErrorMessage {
  errorMessage: string;
}

//UI
export enum NotificationType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface Notification {
  open: boolean;
  message: string;
  type: NotificationType;
}

export interface DropFile {
  file: File;
  preview: string;
}

//USER
export interface Credential {
  email?: string;
  password?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  roleTypeId: RoleType;
  createdDate?: string;
  updatedDate?: string;
  avatarUrl?: string | any;
  groupId?: number | string;
  token?: string;
}

export interface UserGroup {
  id: number;
  name: string;
  description: string;
  institution: string;
  active?: boolean; //To be removed
  createdDate?: string;
  updatedDate?: string;
}

//STORY
export interface Story {
  id: number;
  title: string;
  imageUrl?: string | any;
  uploadFile?: File;
  user: User; //not present
  languageCode: string;
  published: 0 | 1;
  publishedDate: string | null;
  synopsis: string;
  botAvatar: string;
  botName: string;
  botPersona: string;
  botDelay: number;
}

//VIDEOS
export interface Tag {
  id: number;
  name: string;
  active?: boolean; //To be removed
}

export interface Video {
  id: number;
  url: string;
  imageUrl: string;
  title: string;
  channelTitle: string;
  publishedAt: string; //not present yet
  duration: string; //not present yet
  active?: boolean; //To be removed
  description?: string;
  tags?: Tag[];
}

//filter

export type HandleFilterType = {
  type: string;
  value: number | string;
  reset?: boolean;
};

// ENTITIES

export type Entity = {
  id: number;
  category: string;
  name: string;
  extendable?: boolean;
  description: string;
  outputFormat?: string;
  createdDate?: string;
  updatedDate?: string;
};

export type ContextRelation = {
  name: string;
  shortname: string;
  inputs?: string[];
  outputs?: string[];
};

//DIALOG FLOW INTENTS

//? https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/projects.agent.intents

enum WebhookState {
  WEBHOOK_STATE_UNSPECIFIED = 'WEBHOOK_STATE_UNSPECIFIED', //Webhook is disabled in the agent and in the intent.
  WEBHOOK_STATE_ENABLED = 'WEBHOOK_STATE_ENABLED', //Webhook is enabled in the agent and in the intent.
  WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING = 'WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING', //Webhook is enabled in the agent and in the intent. Also, each slot filling prompt is forwarded to the webhook.
}

// enum Type {
//   TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
//   EXAMPLE = 'EXAMPLE',
// }

export type Part = {
  text: string;
  entityType?: string;
  alias?: string;
  userDefined?: boolean;
};

export type TrainingPhrase = {
  name?: string;
  type: string;
  parts: Part[];
  timesAddedCount?: number;
};

type Struct = {
  fields: Map<string, Value>;
};

type ListValue = {
  values: Value;
};

type Value = {
  null_value: null; //	Represents a null value.
  number_value: number; //double -	double	Represents a double value. Note that attempting to serialize NaN or Infinity results in error. (We can't serialize these as string "NaN" or "Infinity" values like we do for regular fields, because they would parse as string_value, not number_value).
  string_value: string; //Represents a string value.
  bool_value: boolean; //Represents a boolean value.
  struct_value: Struct; //Represents a structured value.
  list_value: ListValue; //Represents a repeated Value.
};

export type Context = {
  id?: string;
  type?: 'input' | 'output';
  shortName?: string;
  name: string;
  lifespanCount?: number;
  parameters?: Map<string, Value>;
};

export type Parameter = {
  name?: string;
  displayName: string;
  value?: string;
  defaultValue?: string;
  entityTypeDisplayName?: string;
  mandatory?: boolean;
  prompts?: string[];
  isList?: boolean;
};

export type Text = {
  id?: string;
  text: {
    text?: string[];
  };
};

export type Payload = {
  id?: string;
  payload: VideoMessage;
};

export type VideoMessage = {
  type: 'tag' | 'video';
  source: string;
};

export type Message = Text | Payload;

type FollowupIntentInfo = {
  followupIntentName: string;
  parentFollowupIntentName: string;
};

//https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/projects.agent.intents
export type Intent = {
  name?: string;
  displayName: string;
  webhookState?: WebhookState;
  priority?: number;
  isFallback?: boolean;
  mlDisabled?: boolean;
  liveAgentHandoff?: boolean;
  endInteraction?: boolean;
  inputContextNames?: string[];
  inputContexts?: Context[];
  events?: string[];
  trainingPhrases?: TrainingPhrase[];
  action?: string;
  outputContexts?: Context[];
  resetContexts?: boolean;
  parameters?: Parameter[];
  messages?: Message[];
  defaultResponsePlatforms?: string; //PLATFORM_UNSPECIFIED
  rootFollowupIntentName?: string;
  parentFollowupIntentName?: string;
  followupIntentInfo?: FollowupIntentInfo[];
};

// CHAT

//https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/DetectIntentResponse#QueryResult
export interface DetectIntentResponse {
  queryResult: QueryResult;
  responseId: string;
  sessionid: string
}

export interface QueryResult {
  action: string;
  allRequiredParamsPresent: boolean;
  cancelsSlotFilling?: boolean;
  diagnosticInfo?: Struct;
  fulfillmentText: string;
  fulfillmentMessages?: Message[];
  intent: Intent;
  intentDetectionConfidence: number;
  languageCode: string;
  outputContexts: Context[];
  parameters: Struct;
  queryText: string;
  // sentimentAnalysisResult?: SentimentAnalysisResult;
  speechRecognitionConfidence?: number;
  webhookSource?: string;
  webhookPayload: Struct;
}

export interface SpeechMessage {
  id: string;
  type: 'text' | 'payload';
  source: 'bot' | 'user';
  message?: string;
  payload?: VideoMessage;
  typingTime?: number;
  waitingTime?: number;
  metadata?: QueryResult;
}