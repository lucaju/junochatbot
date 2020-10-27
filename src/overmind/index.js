import { createHook } from 'overmind-react';
import { namespaced } from 'overmind/config';
import * as ui from './ui';
import * as session from './session';

export const useApp = createHook();

export const config = namespaced({
  ui,
  session,
});
