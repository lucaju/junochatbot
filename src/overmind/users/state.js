import { derived } from 'overmind';

export const state = {
  list: [],
  groups: [],
  roleTypes: [
    { value: 1, name: 'Admin' },
    { value: 2, name: 'Instructor' },
    { value: 3, name: 'Student' },
  ],
  defaultRoleType: derived((state) => state.roleTypes[2].value),
};
