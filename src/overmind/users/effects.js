import mock from 'src/mockData';

export const api = {
  async getUsers(filter) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = mock.dataUsers;
        if (filter?.group) {
          result = result.filter((user) => user.group === filter.group);
        }
        resolve(result);
      }, 1000);
    });
  },

  async getUser(userId) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mock.dataUsers.find((user) => user.id === userId));
      }, 50);
    });
  },

  async addUser(userData) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataUsers.unshift(userData);
        resolve({ id: 497 });
      }, 1000);
    });
  },

  async updateUser(userData) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataUsers = mock.dataUsers.map((u) => {
          if (userData.id === u.id) return userData;
          return u;
        });
        resolve({ success: true });
      }, 1000);
    });
  },

  async deleteUser(userId) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataUsers = mock.dataUsers.filter((user) => user.id !== userId);
        resolve({ success: true });
      }, 1000);
    });
  },
};
