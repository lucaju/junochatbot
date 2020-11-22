import mock from 'src/mockData';

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
        const res = { user: mock.authUser };
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
        const res = { user: mock.authUser };
        resolve(res);
      }, 1000);
    });
  },
};
