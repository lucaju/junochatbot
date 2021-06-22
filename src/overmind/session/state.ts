import type { User } from '@src/types';
import { derived } from 'overmind';

type State = {
  user: User | null;
  isSignedIn: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
  isStudent: boolean;
  stories?: any;
  story?: any;
};

export const state: State = {
  user: null,
  isSignedIn: derived((state: State) => state.user !== null),
  isAdmin: derived((state: State) => state.user?.roleTypeId === 'Admin'),
  isInstructor: derived((state: State) => state.user?.roleTypeId === 'Instructor'),
  isStudent: derived((state: State) => state.user?.roleTypeId === 'Student'),
};
