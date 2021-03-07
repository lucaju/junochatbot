import { createHook } from 'overmind-react';
import { namespaced } from 'overmind/config';
import * as ui from './ui';
import * as session from './session';
import * as users from './users';
import * as story from './story';
import * as videos from './videos';
import * as intents from './intents';

export const useApp = createHook();

export const config = namespaced({
  ui,
  session,
  users,
  story,
  videos,
  intents,
});
