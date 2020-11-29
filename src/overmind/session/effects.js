import mock from 'src/mockData';

export const api = {
  authenticateWithCredentials: async ({ email, password }) => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        // const res = { error: 'fail' };
        const res = { user: mock.authUser };
        resolve(res);
      }, 1000);
    });
  },
  authenticateWithToken: async (token) => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        // const res = { error: 'fail' };
        const res = { user: mock.authUser };
        resolve(res);
      }, 1000);
    });
  },
};
