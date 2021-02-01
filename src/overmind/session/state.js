import { derived } from 'overmind';

export const state = {
  user: null,
  isSignedIn: derived((state) => state.user !== null),
  isAdmin: derived((state) => state.user?.roleTypeId === 1),
  isInstructor: derived((state) => state.user?.roleTypeId === 2),
  isStudent: derived((state) => state.user?.roleTypeId === 3),
};
