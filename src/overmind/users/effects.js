// import mock from 'src/mockData';
const baseURL = 'https://api.junochatbot.ca';

export const api = {
  async getUsers(token) {
    const response = await fetch(`${baseURL}/admin/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    return result;
  },

  async getUser(userId, token) {
    const response = await fetch(`${baseURL}/admin/users/id/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    return result;
  },

  async addUser(userData, token) {
    const response = await fetch(`${baseURL}/admin/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.status !== 200) {
      return {
        error: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    }

    const result = await response.json();
    return result;
  },

  async updateUser(userData, token) {
    const response = await fetch(`${baseURL}/admin/users`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.status !== 200) {
      return {
        error: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    }

    const result = await response.json();
    return result;
  },

  async deleteUser(userId, token) {
    const response = await fetch(`${baseURL}/admin/users`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    });

    if (response.status !== 200) {
      return {
        error: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    }

    const result = await response.json();
    return result;

    // return await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     mock.dataUsers = mock.dataUsers.filter((user) => user.id !== userId);
    //     resolve({ success: true });
    //   }, 1000);
    // });
  },
};
