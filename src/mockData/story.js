export const dataStories = [
  {
    title: 'After Life2',
    permalink: 'after-life2',
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
    title: 'Silicon 2',
    permalink: 'silicon2',
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
    title: 'Hey I',
    permalink: 'hey-i',
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
    title: 'After Life',
    permalink: 'after-life',
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
    title: 'The Post-Human 2',
    permalink: 'the-post-human-2',
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
    title: 'The Post-Human',
    permalink: 'the-post-human',
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
    title: 'Circuits',
    permalink: 'circuits',
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
    title: 'Carbon',
    permalink: 'carbon',
    icon: 'adb',
    genre: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2021,
    published: false,
    public: true,
    description: '',
  },
  {
    title: 'Silicon',
    permalink: 'silicon',
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
    title: 'Zero Or One',
    permalink: 'zero-or-one',
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

export const storyDefaultGeneral = {
  genre: '',
  synopsis: '',
  featuredImage: '',
  collaborators: [],
  published: false,
  public: false,
  bot: {
    biography: '',
    avatar: '',
    speed: 120,
    ballon: 'white',
  },
  user: {
    inputPlacehold: 'Type here',
    ballon: 'blue',
  },
  ui: {
    sidebar: 'right',
    showVideoController: false,
  },
};

export const storyExample = {
  id: 100,
  permalink: '/after-life',
  title: 'After Life',
  language: 'en-CA',
  owner: {
    name: 'Luciano Frizzera',
    email: 'lucaju@gmail.com',
  },
  general: {
    genre: 'Documentary',
    synopsis: 'A history beyond this world',
    featuredImage: 'image1.jpg',
    collaborators: [
      {
        name: 'Samia Pedraca',
        email: 'spedraca@gme.com',
      },
    ],
    published: false,
    public: false,
    bot: {
      biography: 'Your soul',
      avatar: 'adb',
      speed: 120,
      ballon: 'white',
    },
    user: {
      inputPlacehold: 'Type here',
      ballon: 'blue',
    },
    ui: {
      sidebar: 'right',
      showVideoController: false,
    },
  },
};

export default {
  dataStories,
  storyDefaultGeneral,
  storyExample
};