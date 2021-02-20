export const dataStories = [
  {
    id: 1,
    title: 'After Life2',
    icon: 'adb',
    image: 'image1.jpg',
    authors: ['Luciano Frizzera', 'Sâmia Pedraca'],
    year: 2022,
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 2,
    title: 'Silicon 2',
    icon: 'adb',
    authors: ['Julia Salles'],
    year: 2022,
    published: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 3,
    title: 'Hey I',
    icon: 'adb',
    image: 'image6.jpg',
    authors: ['Luciano Frizzera'],
    year: 2022,
    published: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 4,
    title: 'After Life',
    icon: 'adb',
    image: 'image2.jpg',
    authors: ['Luciano Frizzera', 'Sâmia Pedraca'],
    year: 2021,
    published: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 5,
    title: 'The Post-Human 2',
    icon: 'adb',
    image: 'image3.png',
    authors: ['Luciano Frizzera'],
    year: 2021,
    published: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 6,
    title: 'The Post-Human',
    icon: 'adb',
    authors: ['Julia Salles'],
    year: 2021,
    published: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 7,
    title: 'Circuits',
    icon: 'adb',
    image: 'image4.png',
    authors: ['Luciano Frizzera'],
    year: 2021,
    published: false,
    synopsis: '',
  },
  {
    id: 8,
    title: 'Carbon',
    icon: 'adb',
    authors: ['Julia Salles'],
    year: 2021,
    published: false,
    synopsis: '',
  },
  {
    id: 9,
    title: 'Silicon',
    icon: 'adb',
    image: 'image5.png',
    authors: ['Luciano Frizzera'],
    year: 2020,
    published: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 10,
    title: 'Zero Or One',
    icon: 'adb',
    authors: ['Julia Salles'],
    year: 2020,
    published: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
];

export const storyDefault = {
  id: null,
  title: '',
  languageCode: 'en-CA',
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
  languageCode: 'en-CA',
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
