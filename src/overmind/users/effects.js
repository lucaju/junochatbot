export const getUsers = async () => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataUsers);
    }, 1000);
  });
};

const dataUsers = [
  {
    id: 1,
    name: 'Ekaterina Tankova',
    avatarUrl: '/static/images/avatars/avatar_3.png',
    email: 'ekaterina.tankova@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 2,
    name: 'Cao Yu',
    avatarUrl: '/static/images/avatars/avatar_4.png',
    email: 'cao.yu@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 3,
    name: 'Alexa Richardson',
    avatarUrl: '/static/images/avatars/avatar_2.png',
    email: 'alex.ri@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 4,
    name: 'Anje Keizer',
    avatarUrl: '/static/images/avatars/avatar_5.png',
    email: 'anje.keizer@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 5,
    name: 'Clarke Gillebert',
    avatarUrl: '/static/images/avatars/avatar_6.png',
    email: 'clarke.gillebert@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 6,
    name: 'Adam Denisov',
    avatarUrl: '/static/images/avatars/avatar_1.png',
    email: 'adam.denisov@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 7,
    name: 'Ava Gregoraci',
    avatarUrl: '/static/images/avatars/avatar_7.png',
    email: 'ava.gregoraci@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 8,
    name: 'Emilee Simchenko',
    avatarUrl: '/static/images/avatars/avatar_8.png',
    email: 'emilee.simchenko@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 9,
    name: 'Kwak Seong-Min',
    avatarUrl: '/static/images/avatars/avatar_9.png',
    email: 'kwak.seong.min@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
  {
    id: 10,
    name: 'Merrile Burgett',
    avatarUrl: '/static/images/avatars/avatar_10.png',
    email: 'merrile.burgett@email.io',
    group: 'Dawson',
    stories: [
      {
        id: 1,
        title: 'After Life',
      },
      {
        id: 2,
        title: 'Silicon',
      },
    ],
  },
];
