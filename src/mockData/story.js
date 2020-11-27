export const dataStories = [
  {
    id: 1,
    title: 'After Life2',
    slug: 'after-life2',
    icon: 'adb',
    image: 'image1.jpg',
    genre: 'Documentary',
    authors: ['Luciano Frizzera', 'Sâmia Pedraca'],
    year: 2022,
    published: true,
    public: true,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 2,
    title: 'Silicon 2',
    slug: 'silicon2',
    icon: 'adb',
    genre: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2022,
    published: true,
    public: false,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 3,
    title: 'Hey I',
    slug: 'hey-i',
    icon: 'adb',
    image: 'image6.jpg',
    genre: 'Documentary',
    authors: ['Luciano Frizzera'],
    year: 2022,
    published: false,
    public: true,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 4,
    title: 'After Life',
    slug: 'after-life',
    icon: 'adb',
    image: 'image2.jpg',
    genre: 'Drama',
    authors: ['Luciano Frizzera', 'Sâmia Pedraca'],
    year: 2021,
    published: false,
    public: false,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 5,
    title: 'The Post-Human 2',
    slug: 'the-post-human-2',
    icon: 'adb',
    image: 'image3.png',
    genre: 'Documentary',
    authors: ['Luciano Frizzera'],
    year: 2021,
    published: false,
    public: true,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 6,
    title: 'The Post-Human',
    slug: 'the-post-human',
    icon: 'adb',
    genre: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2021,
    published: false,
    public: true,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 7,
    title: 'Circuits',
    slug: 'circuits',
    icon: 'adb',
    image: 'image4.png',
    genre: 'Documentary',
    authors: ['Luciano Frizzera'],
    year: 2021,
    published: false,
    public: true,
    description: '',
  },
  {
    id: 8,
    title: 'Carbon',
    slug: 'carbon',
    icon: 'adb',
    genre: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2021,
    published: false,
    public: true,
    description: '',
  },
  {
    id: 9,
    title: 'Silicon',
    slug: 'silicon',
    icon: 'adb',
    image: 'image5.png',
    genre: 'Documentary',
    authors: ['Luciano Frizzera'],
    year: 2020,
    published: false,
    public: true,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    id: 10,
    title: 'Zero Or One',
    slug: 'zero-or-one',
    icon: 'adb',
    genre: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2020,
    published: false,
    public: true,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
];

export const storyDefault = {
  id: null,
  slug: '',
  title: '',
  language: '',
  owner: {
    name: '',
    email: '',
  },
  general: {
    genre: '',
    description: '',
    featuredImage: '',
    authors: [],
    published: false,
    public: true,
    bot: {
      name: '',
      biography: '',
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
  language: 'en-CA',
  owner: {
    name: 'Luciano Frizzera',
    email: 'lucaju@gmail.com',
  },
  general: {
    genre: 'documentary',
    description: 'A history beyond this world',
    featuredImage: 'image1.jpg',
    collaborators: [
      {
        name: 'Samia Pedraca',
        email: 'spedraca@gme.com',
      },
    ],
    published: false,
    public: true,
    bot: {
      name: 'Swiss',
      biography: 'Your soul',
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

export const dataVideoColletion = [
  {
    id: 1,
    title: 'After Life2',
    source: 'after-life2',
    provider: 'video',
    image: 'image1.jpg',
    tags: [
      { id: 1, name: 'person' },
      { id: 2, name: 'communication' },
    ]
  },
  {
    id: 2,
    title: 'Drive away',
    source: 'drive-away',
    provider: 'youtube',
    image: 'image2.jpg',
    tags: [
      { id: 1, name: 'person' },
    ],
  },
];

export default {
  dataStories,
  storyDefault,
  storyExample,
  dataVideoColletion,
};
