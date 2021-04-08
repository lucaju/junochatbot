import { IConfig } from 'overmind';
import { createHook } from 'overmind-react';
import { namespaced } from 'overmind/config';
import * as intents from './intents';
import * as session from './session';
import * as story from './story';
import * as ui from './ui';
import * as users from './users';
import * as videos from './videos';

export const config = namespaced({
  ui,
  session,
  users,
  story,
  videos,
  intents,
});


export const useApp = createHook<typeof config>();

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}