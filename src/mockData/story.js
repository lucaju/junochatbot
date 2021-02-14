export const dataStories = [
  {
    id: 1,
    title: 'After Life2',
    slug: 'after-life2',
    icon: 'adb',
    image: 'image1.jpg',
    authors: ['Luciano Frizzera', 'Sâmia Pedraca'],
    year: 2022,
    published: true,
    public: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 2,
    title: 'Silicon 2',
    slug: 'silicon2',
    icon: 'adb',
    authors: ['Julia Salles'],
    year: 2022,
    published: true,
    public: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 3,
    title: 'Hey I',
    slug: 'hey-i',
    icon: 'adb',
    image: 'image6.jpg',
    authors: ['Luciano Frizzera'],
    year: 2022,
    published: false,
    public: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 4,
    title: 'After Life',
    slug: 'after-life',
    icon: 'adb',
    image: 'image2.jpg',
    authors: ['Luciano Frizzera', 'Sâmia Pedraca'],
    year: 2021,
    published: false,
    public: false,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 5,
    title: 'The Post-Human 2',
    slug: 'the-post-human-2',
    icon: 'adb',
    image: 'image3.png',
    authors: ['Luciano Frizzera'],
    year: 2021,
    published: false,
    public: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 6,
    title: 'The Post-Human',
    slug: 'the-post-human',
    icon: 'adb',
    authors: ['Julia Salles'],
    year: 2021,
    published: false,
    public: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 7,
    title: 'Circuits',
    slug: 'circuits',
    icon: 'adb',
    image: 'image4.png',
    authors: ['Luciano Frizzera'],
    year: 2021,
    published: false,
    public: true,
    synopsis: '',
  },
  {
    id: 8,
    title: 'Carbon',
    slug: 'carbon',
    icon: 'adb',
    authors: ['Julia Salles'],
    year: 2021,
    published: false,
    public: true,
    synopsis: '',
  },
  {
    id: 9,
    title: 'Silicon',
    slug: 'silicon',
    icon: 'adb',
    image: 'image5.png',
    authors: ['Luciano Frizzera'],
    year: 2020,
    published: false,
    public: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 10,
    title: 'Zero Or One',
    slug: 'zero-or-one',
    icon: 'adb',
    authors: ['Julia Salles'],
    year: 2020,
    published: false,
    public: true,
    synopsis:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
];

export const storyDefault = {
  id: null,
  title: '',
  languageCode: '',
  owner: {
    name: '',
    userName: '',
  },
  general: {
    synopsis: '',
    featuredImage: '',
    authors: [],
    published: false,
    public: true,
    bot: {
      name: '',
      persona: '',
      avatar: 'adb',
      speed: 120,
      balloon: 'white',
    },
    user: {
      inputPlacehold: 'Type here',
      balloon: 'blue',
    },
    ui: {
      sidebar: 'right',
      showVideoController: false,
    },
  },
  videoCollection: [],
  screenplay: [],
  tags: [],
  contexts: [],
};

export const storyExample = {
  id: 1,
  slug: 'after-life',
  title: 'After Life',
  languageCode: 'en-CA',
  owner: {
    name: 4,
    userName: 'lucaju@gmail.com',
  },
  general: {
    synopsis: 'A history beyond this world',
    featuredImage: 'image1.jpg',
    collaborators: [
      {
        name: 7,
        userName: 'spedraca@gme.com',
      },
    ],
    published: false,
    public: true,
    bot: {
      name: 'Swiss',
      persona: 'Your soul',
      avatar: 'adb',
      speed: 120,
      balloon: 'white',
    },
    user: {
      inputPlacehold: 'Type here',
      balloon: 'blue',
    },
    ui: {
      sidebar: 'right',
      showVideoController: false,
    },
  },
  videoCollection: [],
  screenplay: [],
  tags: [],
  contexts: [],
};

export default {
  dataStories,
  storyDefault,
  storyExample,
};
