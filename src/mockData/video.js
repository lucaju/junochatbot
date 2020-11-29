export const dataVideoCollection = [
  {
    id: 1,
    source: 'https://www.youtube.com/watch?v=2MQx0SXLCcE',
    provider: 'youtube',
    image: 'image1.jpg',
    title: 'After Life2',
    author: 'Luciano Frizzera',
    year: 2002,
    genre: 'Intervew',
    description: 'Just a video',
    tags: [
      { id: 13, name: 'Person' },
      { id: 23, name: 'Communication' },
    ],
  },
  {
    id: 2,
    title: 'Drive away',
    source: 'drive-away',
    provider: 'youtube',
    image: 'image2.jpg',
    tags: [{ id: 13, name: 'Person' }],
  },
];

export default {
  dataVideoCollection,
};
