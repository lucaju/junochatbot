export const dataContexts = [
  {
    id: 1,
    name: 'GetName',
    inputs: [{ id: 1, title: 'Get Name' }],
    outputs: [{ id: 2, title: 'Welcome' }],
  },
  {
    id: 2,
    name: 'Intro',
    inputs: [
      { id: 3, title: 'Intro' },
      { id: 4, title: 'Intro Feeling Bad' },
    ],
    outputs: [
      { id: 1, title: 'Get Name' },
      { id: 5, title: 'Welcome Has Name' },
    ],
  },
];

export default {
  dataContexts,
};
