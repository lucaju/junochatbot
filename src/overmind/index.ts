import { IContext } from 'overmind';
import {
  createActionsHook,
  createEffectsHook,
  createReactionHook,
  createStateHook,
} from 'overmind-react';
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

export type Context = IContext<typeof config>;

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
export const useReaction = createReactionHook<Context>();
