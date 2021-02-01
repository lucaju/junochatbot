import { derived } from 'overmind';

export const state = {
  list: null,
  languages: [
    { value: 'en-CA', name: 'English' },
    { value: 'fr-CA', name: 'French' },
  ],
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
  defaultLanguage: derived((state) => state.languages[0].value),
  defaultRoleType: derived((state) => state.roleTypes[2].value),
  defaultGroup: derived((state) => state.groups[0].value),
};
