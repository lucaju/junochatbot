export const getUsers = async (filter) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      let result = dataUsers;
      if (filter?.group) {
        result = result.filter((user) => user.group === filter.group);
      }
      resolve(result);
    }, 1000);
  });
};

export const getUser = async (userId) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataUsers.find((user) => user.id === userId));
    }, 1000);
  });
};

export const addUser = async (userData) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 497 });
    }, 1000);
  });
};

export const updateUser = async (userData) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

export const deleteUser = async (userId) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

const dataUsers = [
  {
    id: 1,
    firstName: 'Luciano',
    lastName: 'Frizzera',
    avatar: 'lucaju.jpg',
    email: 'lucaju@gmail.com',
    roleType: 'Admin',
    language: 'en-CA',
    group: 'None',
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
    firstName: 'Cao',
    lastName: 'Yu',
    avatar: '',
    email: 'cao.yu@email.io',
    roleType: 'Student',
    language: 'en-CA',
    group: 'Dawson Cegep',
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
    firstName: 'Alexa',
    lastName: 'Richardson',
    avatar: '',
    email: 'alex.ri@email.io',
    roleType: 'Student',
    language: 'en-CA',
    group: 'Dawson Cegep',
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
    firstName: 'Anje',
    lastName: 'Keizer',
    avatar: '',
    email: 'anje.keizer@email.io',
    roleType: 'Student',
    language: 'en-CA',
    group: 'Dawson Cegep',
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
    firstName: 'Clarke',
    lastName: 'Gillebert',
    avatar: '',
    email: 'clarke.gillebert@email.io',
    roleType: 'Student',
    language: 'en-CA',
    group: 'St. Lawrence Cegep',
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
    firstName: 'Adam',
    lastName: 'Denisov',
    avatar: '',
    email: 'adam.denisov@email.io',
    roleType: 'Student',
    language: 'en-CA',
    group: 'Dawson Cegep',
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
    firstName: 'Ava',
    lastName: 'Gregoraci',
    avatar: '',
    email: 'ava.gregoraci@email.io',
    roleType: 'Student',
    language: 'en-CA',
    group: 'St. Lawrence Cegep',
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
    firstName: 'Emilee',
    lastName: 'Simchenko',
    avatar: '',
    email: 'emilee.simchenko@email.io',
    roleType: 'Student',
    language: 'en-CA',
    group: 'Dawson Cegep',
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
