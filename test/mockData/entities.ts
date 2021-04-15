import { Entity } from '../../src/types';

export const dataEntities: Entity[] = [
  {
    id: 0,
    category: 'Date and Time',
    name: '@sys.date-time',
    extendable: false,
    description: 'Matches date, time, intervals or date and time together',
    outputFormat: 'String in ISO-8601 format or Object:',
    createdDate: '2020-09-15 21:16:21',
    updatedDate: '2020-09-15 21:16:21',
  },
  {
    id: 1,
    category: 'Names',
    name: '@sys.person',
    extendable: true,
    description:
      'Common given names, last names or their combinationsObject: name',
    outputFormat: 'String',
    createdDate: '2020-09-15 21:16:21',
    updatedDate: '2020-09-15 21:16:21',
  },
];

export default {
  dataEntities,
};
