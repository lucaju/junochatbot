export const auth = {
  authenticateWithCredentials: async ({ email, password }) => {
    // //access endpoint
    // const response = await fetch('https://api.chatstories.ca/admin/projects/all');
    // console.log(response);
    // const result  = await response.json();
    // console.log(result);

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        // const res = { error: 'fail' };
        const res = { user: authUser };
        resolve(res);
      }, 1000);
    });
  },
  authenticateWithToken: async (token) => {
    // if (token) requestOptions.headers['chatStoriesToken'] = token;

    //access endpoint
    // const response = await fetch('/general/settings');
    // return await response.json();

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        // const res = { error: 'fail' };
        const res = { user: authUser };
        resolve(res);
      }, 1000);
    });
  },
};

export const stories = {
  getStories: async () => {
    //access endpoint
    // const response = await fetch('/general/settings');
    // return await response.json();

    //access endpoint
    const response = await fetch(
      'https://api.chatstories.ca/admin/projects/all'
    );
    //  const response = await fetch('https://api.localhost/admin/projects/all');
    console.log(response);
    const result = await response.json();
    console.log(result);

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dataStories);
      }, 1000);
    });
  },
};

const authUser = {
  name: 'Luciano Frizzera',
  roleType: 'Admin',
  email: 'lucaju@gmail.com',
  avatar: 'lucaju.jpg',
  language: 'en-CA',
  group: '',
  token: 'TOKEN-123',
};

const dataStories = [
  {
    title: 'After Life2',
    icon: 'adb',
    image: 'image1.jpg',
    category: 'Documentary',
    authors: ['Luciano Frizzera', 'Sâmia Pedraca'],
    year: 2022,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    title: 'Silicon 2',
    icon: 'adb',
    category: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2022,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    title: 'Hey I',
    icon: 'adb',
    image: 'image6.jpg',
    category: 'Documentary',
    authors: ['Luciano Frizzera'],
    year: 2022,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    title: 'After Life',
    icon: 'adb',
    image: 'image2.jpg',
    category: 'Drama',
    authors: ['Luciano Frizzera', 'Sâmia Pedraca'],
    year: 2021,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    title: 'The Post-Human 2',
    icon: 'adb',
    image: 'image3.png',
    category: 'Documentary',
    authors: ['Luciano Frizzera'],
    year: 2021,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    title: 'The Post-Human',
    icon: 'adb',
    category: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2021,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    title: 'Circuits',
    icon: 'adb',
    image: 'image4.png',
    category: 'Documentary',
    authors: ['Luciano Frizzera'],
    year: 2021,
    description: '',
  },
  {
    title: 'Carbon',
    icon: 'adb',
    category: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2021,
    description: '',
  },
  {
    title: 'Silicon',
    icon: 'adb',
    image: 'image5.png',
    category: 'Documentary',
    authors: ['Luciano Frizzera'],
    year: 2020,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
  {
    title: 'Zero Or One',
    icon: 'adb',
    category: 'Sci-Fi',
    authors: ['Julia Salles'],
    year: 2020,
    description:
      'Bacon ipsum dolor amet pastrami turducken fatback pig short ribs ham hock, drumstick cow filet mignon sirloin. Doner rump pastrami chislic short loin. Ribeye corned beef spare ribs short ribs frankfurter cow leberkas picanha.',
  },
];
