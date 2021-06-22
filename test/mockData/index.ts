import { dataIntents } from './intents';
import { dataEntities } from './entities';
import { authUser } from './session';
import { dataStories, storyDefault, storyExample } from './story';
import { dataTags } from './tag';
import { dataUsers, dataUserGroups } from './user';
import { dataVideoCollection } from './video';

export default {
  authUser,
  dataIntents,
  dataEntities,
  dataStories,
  dataTags,
  dataUsers,
  dataUserGroups,
  dataVideoCollection,
  storyDefault,
  storyExample,
};
