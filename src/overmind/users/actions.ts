import { Context } from 'overmind';
import { isError, sortBy } from '@src/util/utilities';
import type { ErrorMessage, User, UserGroup } from '@src/types';

export const getUsers = async (
  { state, effects }: Context,
  groupId?: number
): Promise<void | ErrorMessage> => {
  const authuser = state.session.user;
  if (!authuser || !authuser.token) return { errorMessage: 'Not authorized' };

  let response;

  if (groupId) {
    response = await effects.users.api.getUsersByGroup(groupId, authuser.token);
  }

  if (!groupId && state.session.isInstructor && authuser.groupId) {
    response = await effects.users.api.getUsersByGroup(
      Number(authuser.groupId),
      authuser.token
    );
  }

  if (!groupId && state.session.isAdmin) {
    response = await effects.users.api.getAllUsers(authuser.token);
  }

  if (!groupId && !state.session.isAdmin) {
    return { errorMessage: 'Not authorized' };
  }

  if (!response) return { errorMessage: 'Not authorized' };

  if (isError(response)) return response;

  state.users.list = response.reverse();
};

export const getUser = async (
  { state, effects }: Context,
  userId: number
): Promise<User | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  let user = state.users.list.find(
    (_user) => _user.id === userId && _user.firstName
  );
  if (!user) {
    let user = await effects.users.api.getUser(userId, authUser.token);
    if (isError(user)) return user;
  }

  if (!user) return { errorMessage: 'Not User found' };

  const userGroup = await effects.users.api.getUserGroup(
    userId,
    authUser.token
  );
  if (userGroup && !isError(userGroup)) user.groupId = userGroup.id;

  return user;
};

export const getUserGroup = async (
  { state, effects }: Context,
  userId: number
): Promise<UserGroup | ErrorMessage | void> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.getUserGroup(userId, authUser.token);
  if (!response) return;
  if (isError(response)) return response;

  //update user
  state.users.list = state.users.list.map((user: User) => {
    if (user.id === userId) user.groupId = response.id;
    return user;
  });

  return response;
};

export const createUser = async (
  { state, effects }: Context,
  values: Omit<User, 'id'>
): Promise<User | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  //1. Split data
  const newUserData = { ...values };

  const avatar = newUserData.avatarUrl ?? null;
  delete newUserData.avatarUrl;

  const groupId = newUserData.groupId ?? undefined;
  delete newUserData.groupId;

  //2. Create user
  const user = await effects.users.api.createUser(newUserData, authUser.token);
  if (isError(user)) return user;

  //3. Assign group
  if (groupId && groupId === '') {
    const assignedGroup = await effects.users.api.addUserToGroup(
      Number(groupId),
      user.id,
      authUser.token
    );
    if (!isError(assignedGroup)) user.groupId = groupId;
  }

  //4. Upload avatar
  if (avatar) {
    const responseUploadAvatar = await effects.users.api.uploadAvatar(
      user.id,
      avatar,
      authUser.token
    );
    if (!isError(responseUploadAvatar))
      user.avatarUrl = responseUploadAvatar.fileName;
  }

  //5. add to state
  state.users.list = [user, ...state.users.list];

  return user;
};

export const updateUser = async (
  { state, effects }: Context,
  { userData, values }: { userData: Partial<User>; values: Partial<User> }
): Promise<User | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  //1. Split data
  let newValues: User = { ...values } as User;

  let newAvatar;
  if (newValues.avatarUrl?.name) newAvatar = newValues.avatarUrl;
  if (userData.avatarUrl !== null && newValues.avatarUrl === null)
    newAvatar = null;
  delete newValues.avatarUrl;

  const newGroupId =
    newValues.groupId !== userData.groupId ? newValues.groupId : undefined;
  delete newValues.groupId;

  //2. Check if user data changed
  const userDatahasChanged =
    newValues.firstName === userData.firstName &&
    newValues.lastName === userData.lastName &&
    newValues.roleTypeId === userData.roleTypeId
      ? false
      : true;

  //3. update User
  if (userDatahasChanged) {
    const response = await effects.users.api.updateUser(
      newValues,
      authUser.token
    );
    if (isError(response)) return response;
  } else {
    newValues = userData as User;
  }

  //4. Update user group
  if (newGroupId) {
    const response = await effects.users.api.addUserToGroup(
      Number(newGroupId),
      newValues.id,
      authUser.token
    );
    if (!isError(response)) newValues.groupId = newGroupId;
  }

  //5. Upload avatar
  if (newAvatar?.name) {
    const response = await effects.users.api.uploadAvatar(
      newValues.id,
      newAvatar,
      authUser.token
    );
    if (!isError(response)) newValues.avatarUrl = response;
  } else if (newAvatar === null) {
    const response = await effects.users.api.deleteAvatar(
      newValues.id,
      authUser.token
    );
    if (!isError(response)) newValues.avatarUrl = null;
  } else {
    newValues.avatarUrl = userData.avatarUrl;
  }

  //6. update state;
  state.users.list = state.users.list.map((user: User) => {
    if (user.id === newValues.id) user = newValues;
    return user;
  });

  return userData as User;
};

export const deleteUser = async (
  { state, effects }: Context,
  userId: number
): Promise<boolean | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.deleteUser(userId, authUser.token);
  if (isError(response)) return response;

  // update state;
  state.users.list = state.users.list.filter((u: User) => u.id !== userId);

  return true;
};

// //***** GROUPS */

export const getGroups = async ({
  state,
  effects,
}: Context): Promise<UserGroup[] | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.getGroups(authUser.token);
  if (isError(response)) return response;

  const groups: UserGroup[] = sortBy(response, 'name');
  state.users.groups = [...groups];

  return state.users.groups;
};

export const getGroup = async (
  { state, effects }: Context,
  groupId: number
): Promise<UserGroup | ErrorMessage> => {
  let selectedGroup = state.users.groups.find(
    (group: UserGroup) => group.id === groupId
  );
  if (selectedGroup) return selectedGroup;

  //retrieve data
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.getGroup(groupId, authUser.token);
  if (isError(response)) return response;

  const updatedGroup = [...state.users.groups, response];
  state.users.groups = [...sortBy(updatedGroup, 'name')];

  selectedGroup = response;

  return selectedGroup;
};

export const createGroup = async (
  { state, effects }: Context,
  groupData: Omit<UserGroup, 'id'>
): Promise<UserGroup | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.createGroup(
    groupData,
    authUser.token
  );
  if (isError(response)) return response;

  //add group to state
  state.users.groups = [response, ...state.users.groups];

  return response;
};

export const updateGroup = async (
  { state, effects }: Context,
  groupData: UserGroup
): Promise<boolean | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.updateGroup(
    groupData,
    authUser.token
  );
  if (isError(response)) return response;

  state.users.groups = state.users.groups.map((group: UserGroup) => {
    if (group.id === groupData.id) group = groupData;
    return group;
  });

  return true;
};

export const deleteGroup = async (
  { state, effects }: Context,
  groupId: number
): Promise<boolean | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.deleteGroup(groupId, authUser.token);
  if (isError(response)) return response;

  // update state;
  state.users.groups = state.users.groups.filter(
    (g: UserGroup) => g.id !== groupId
  );

  return true;
};

//***** PASSWORD */

export const requestPassword = async (
  { effects }: Context,
  email: string
): Promise<boolean | ErrorMessage> => {
  const encodedEmail = encodeURIComponent(email);

  const response = await effects.users.api.requestPassword(encodedEmail);
  if (isError(response)) return response;

  return true;
};

export const resetPassword = async (
  { effects }: Context,
  { password, token }: { password: string; token: string }
): Promise<boolean | ErrorMessage> => {
  const response = await effects.users.api.resetPassword(password, token);
  if (isError(response)) return response;

  return true;
};

// //***** AVATAR */

export const uploadAvatar = async (
  { state, effects }: Context,
  { userId, avatar }: { userId: number; avatar: any }
): Promise<string | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.uploadAvatar(
    userId,
    avatar,
    authUser.token
  );
  if (isError(response)) return response;

  return response.fileName;
};

export const deleteAvatar = async (
  { state, effects }: Context,
  userId: number
): Promise<boolean | ErrorMessage> => {
  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.users.api.deleteAvatar(userId, authUser.token);
  if (isError(response)) return response;

  return response;
};
