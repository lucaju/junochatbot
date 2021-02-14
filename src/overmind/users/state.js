import { derived } from 'overmind';

export const state = {
  list: null,
  roleTypes: [
    { value: 1, name: 'Admin' },
    { value: 2, name: 'Instructor' },
    { value: 3, name: 'Student' },
  ],
  groups: [
    { value: 'None', name: 'None' },
    { value: 'Dawson Cegep', name: 'Dawson Cegep' },
    { value: 'St. Lawrence Cegep', name: 'St. Lawrence Cegep' },
  ],
  defaultRoleType: derived((state) => state.roleTypes[2].value),
  defaultGroup: derived((state) => state.groups[0].value),
};
