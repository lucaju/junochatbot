export const dataTags = [
  {
    id: 1,
    name: 'Intro',
    intents: [
      { id: 1, title: 'Intro' },
      { id: 2, title: 'Fallback-Intro' },
    ],
    videos: [{ id: 1, title: 'Video 1' }],
  },
  {
    id: 2,
    name: 'Welcome',
    intents: [{ id: 3, title: 'Has Name' }],
    videos: [
      { id: 2, title: 'Video 2' },
      { id: 3, title: 'Video 3' },
    ],
  },
];

export default {
  dataTags,
};
