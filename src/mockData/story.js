export const dataStories = [
  {
    id: 1,
    title: 'After Life2',
    featuredimage: 'image1.jpg',
    owner: {
      id: 1,
      firstName: 'Luciano',
      lastName: 'Frizzera',
    },
    languageCode: 'en-CA',
    publishedAt: '2022-01-01T00:00:00',
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
    botAvatar: 'adb',
    botName: 'Daft Punk',
    botPersona: 'A Duo Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. '
  },
  {
    id: 2,
    title: 'Sil 2',
    botAvatar: 'adb',
    owner: {
      id: 2,
      firstName: 'Julia',
      lastName: 'Salles',
    },
    languageCode: 'en-CA',
    publishedAt: '',
    published: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 3,
    title: 'Hey I',
    botAvatar: 'adb',
    featuredimage: 'image6.jpg',
    owner: {
      id: 1,
      firstName: 'Luciano',
      lastName: 'Frizzera',
    },
    languageCode: 'fr-CA',
    publishedAt: '2022-01-01T00:00:00',
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 4,
    title: 'After Life',
    botAvatar: 'adb',
    featuredimage: 'image2.jpg',
    owner: {
      id: 3,
      firstName: 'Samia',
      lastName: 'Pedraça',
    },
    languageCode: 'en-CA',
    publishedAt: '2021-01-01T00:00:00',
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 5,
    title: 'The Post-Human 2',
    botAvatar: 'adb',
    featuredimage: 'image3.png',
    owner: {
      id: 3,
      firstName: 'Samia',
      lastName: 'Pedraça',
    },
    languageCode: 'en-CA',
    publishedAt: '2021-01-01T00:00:00',
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 6,
    title: 'The Post-Human',
    botAvatar: 'adb',
    owner: {
      id: 2,
      firstName: 'Julia',
      lastName: 'Salles',
    },
    languageCode: 'fr-CA',
    publishedAt: '2021-01-01T00:00:00',
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 7,
    title: 'Circuits',
    botAvatar: 'adb',
    featuredimage: 'image4.png',
    owner: {
      id: 3,
      firstName: 'Samia',
      lastName: 'Pedraça',
    },
    languageCode: 'en-CA',
    publishedAt: '2021-01-01T00:00:00',
    published: true,
    synopsis: '',
  },
  {
    id: 8,
    title: 'Carbon',
    botAvatar: 'adb',
    owner: {
      id: 2,
      firstName: 'Julia',
      lastName: 'Salles',
    },
    languageCode: 'en-CA',
    publishedAt: '2021-01-01T00:00:00',
    published: true,
    synopsis: '',
  },
  {
    id: 9,
    title: 'SilbotAvatar',
    botAvatar: 'adb',
    featuredimage: 'image5.png',
    owner: {
      id: 3,
      firstName: 'Samia',
      lastName: 'Pedraça',
    },
    languageCode: 'en-CA',
    publishedAt: '2020-01-01T00:00:00',
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 10,
    title: 'Zero Or One',
    botAvatar: 'adb',
    owner: {
      id: 2,
      firstName: 'Julia',
      lastName: 'Salles',
    },
    languageCode: 'en-CA',
    publishedAt: '2020-01-01T00:00:00',
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
];

export const storyDefault = {
  id: null,
  title: '',
  languageCode: 1,
  ownerId: 4,
  synopsis: '',
  featuredImage: '',
  published: false,
  bot: {
    name: '',
    persona: '',
    avatar: 'adb',
    speed: 120,
  },
  videoCollection: [],
  dialogFlowCredentials: '',
};

export const storyExample = {
  id: 1,
  title: 'After Life',
  languageCode: 1,
  ownerId: 4,
  synopsis: 'A history beyond this world',
  featuredImage: 'image1.jpg',
  published: false,
  bot: {
    name: 'Swiss',
    persona: 'Your soul',
    avatar: 'adb',
    speed: 120,
  },
  videoCollection: [],
  dialogFlowCredentials: '',
};

export default {
  dataStories,
  storyDefault,
  storyExample,
};
