import { API_URL } from '../../config/config.js';
import type { ErrorMessage, User, UserGroup } from '../../types';

type ResponseUploadAvatar = {
  fileName: string;
};

export const api = {
  getAllUsers: async (token: string): Promise<User[] | ErrorMessage> => {
    const response = await fetch(`${API_URL}/admin/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as User[];
  },

  getUsersByGroup: async (
    groupId: number,
    token: string
  ): Promise<User[] | ErrorMessage> => {
    const response = await fetch(`${API_URL}/groups/${groupId}/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as User[];
  },

  getUser: async (
    userId: number,
    token: string
  ): Promise<User | ErrorMessage> => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as User;
  },

  getUserGroup: async (
    userId: number,
    token: string
  ): Promise<UserGroup | ErrorMessage | void > => {
    const response = await fetch(`${API_URL}/groups/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // no content
    if (response.status === 204) return;

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as UserGroup;
  },

  createUser: async (
    userData: Omit<User, 'id'>,
    token: string
  ): Promise<User | ErrorMessage> => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as User;
  },

  updateUser: async (
    userData: User,
    token: string
  ): Promise<User | ErrorMessage> => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as User;
  },

  deleteUser: async (
    userId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  addUserToGroup: async (
    groupId: number,
    userId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(
      `${API_URL}/groups/${groupId}/users/${userId}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  deleteUserFromGroup: async (
    groupId: number,
    userId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(
      `${API_URL}/groups/${groupId}/users/${userId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  getGroups: async (token: string): Promise<UserGroup[] | ErrorMessage> => {
    const response = await fetch(`${API_URL}/admin/groups/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as UserGroup[];
  },

  getGroup: async (
    groupId: number,
    token: string
  ): Promise<UserGroup | ErrorMessage> => {
    const response = await fetch(`${API_URL}/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as UserGroup;
  },

  createGroup: async (
    groupData: Omit<UserGroup, 'id'>,
    token: string
  ): Promise<UserGroup | ErrorMessage> => {
    const response = await fetch(`${API_URL}/groups`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as UserGroup;
  },

  updateGroup: async (
    groupData: UserGroup,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/groups`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  deleteGroup: async (
    groupId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/groups/${groupId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  uploadAvatar: async (
    userId: number,
    avatar: any,
    token: string
  ): Promise<ResponseUploadAvatar | ErrorMessage> => {
    const formData = new FormData();
    formData.append('file', avatar);

    const response = await fetch(`${API_URL}/users/${userId}/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as ResponseUploadAvatar;
  },

  deleteAvatar: async (
    userId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/users/${userId}/avatar`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  requestPassword: async (email: string): Promise<boolean | ErrorMessage> => {
    const response = await fetch(
      `${API_URL}/authentication/users/${email}/password`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  resetPassword: async (
    password: string,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(
      `${API_URL}/authentication/users/password`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },
};
