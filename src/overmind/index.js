import { createHook } from 'overmind-react';
import { namespaced } from 'overmind/config';
import * as ui from './ui';
import * as session from './session';
import * as users from './users';
import * as story from './story';
import * as video from './video';
import * as tag from './tag';
import * as intentContext from './intentContext';
import * as narrative from './narrative';

export const useApp = createHook();

export const config = namespaced({
  ui,
  session,
  users,
  story,
  video,
  tag,
  intentContext,
  narrative,
});
