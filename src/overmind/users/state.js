import { derived } from 'overmind';

export const state = {
  list: null,
  selected: null,
  languages: [
    { value: 'en-CA', name: 'English' },
    { value: 'fr-CA', name: 'French' },
  ],
  roleTypes: [
    { value: 'Admin', name: 'Admin' },
    { value: 'Student', name: 'Student' },
    { value: 'Instructor', name: 'Instructor' },
  ],
  groups: [
    { value: 'None', name: 'None' },
    { value: 'Dawson Cegep', name: 'Dawson Cegep' },
    { value: 'St. Lawrence Cegep', name: 'St. Lawrence Cegep' },
  ],
  defaultLanguage: derived((state) => state.languages[0].value),
  defaultRoleType: derived((state) => state.roleTypes[1].value),
  defaultGroup: derived((state) => state.groups[0].value),
};
