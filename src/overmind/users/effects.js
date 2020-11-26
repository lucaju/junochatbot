import mock from 'src/mockData';

export const getUsers = async (filter) => {
  
  // console.log(filter);
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      let result = mock.dataUsers;
      if (filter?.group) {
        result = result.filter((user) => user.group === filter.group);
      }
      resolve(result);
    }, 1000);
  });
};

export const getUser = async (userId) => {

  // console.log(userId);
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mock.dataUsers.find((user) => user.id === userId));
    }, 50);
  });
};

export const addUser = async (userData) => {

  // console.log(userData);
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

  // console.log(userData);
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

  // console.log(userId);

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
