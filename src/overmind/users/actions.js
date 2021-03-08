export const getUsers = async ({ state, effects }, groupId) => {
  const token = state.session.user.token;
  let response;

  if (groupId) {
    response = await effects.users.api.getUsersByGroup(groupId, token);
  }

  if (!groupId && state.session.isInstructor) {
    groupId = state.session.user.groups[0].id;
    response = await effects.users.api.getUsersByGroup(groupId, token);
  }

  if (!groupId && state.session.isAdmin) {
    response = await effects.users.api.getAllUsers(token);
  }
  
  if (response.error) return response;

  state.users.list = response.reverse();
};

export const getUser = async ({ state, effects }, userId) => {
  const token = state.session.user.token;
  const user = await effects.users.api.getUser(userId, token);

  const userGroups = await effects.users.api.getUserGroups(userId, token);
  if (!userGroups.error) {
    // const activeGroups = userGroups.filter(({  active }) => active === true);
    user.groups = userGroups;
  }
  return user;
};

export const getUserGroups = async ({ state, effects }, userId) => {
  const token = state.session.user.token;
  const groups = await effects.users.api.getUserGroups(userId, token);
  // const activeGroups = groups.filter(({  active }) => active === true);

  return groups;
};

export const createUser = async ({ state, effects }, values) => {
  const token = state.session.user.token;

  //1. Split data
  const newUserData = { ...values };

  const avatar = newUserData.avatarUrl ?? null;
  delete newUserData.avatarUrl;

  const groups = newUserData.groups.length > 0 ? newUserData.groups : null;
  delete newUserData.groups;

  //2. Create user
  const user = await effects.users.api.createUser(newUserData, token);
  if (user.error) return user;

  //3. Assign groups
  if (user && groups) {
    user.groups = [];
    //assign each group to user
    for await (const group of groups) {
      const newGroup = await effects.users.api.addUserToGroup({
        groupId: group.id,
        userId: user.id,
        token,
      });
      if (!newGroup.error) user.groups = [...user.groups, group];
    }
  }

  //4. Upload avatar
  if (user && avatar) {
    const responseUploadAvatar = await uploadAvatar(
      { state, effects },
      { avatar, userId: user.id }
    );
    if (!responseUploadAvatar.error) user.avatarUrl = responseUploadAvatar;
  }

  //5. add to state
  state.users.list.unshift(user);

  return user;
};

export const updateUser = async ({ state, effects }, { userData, values }) => {
  const token = state.session.user.token;

  //1. Split data
  let newValues = { ...values };

  let newAvatar;
  if (newValues.avatarUrl?.name) newAvatar = newValues.avatarUrl;
  if (userData.avatarUrl !== null && newValues.avatarUrl === null) newAvatar = null;
  delete newValues.avatarUrl;

  const userGroupsSet = new Set(userData.groups.map(({ id }) => id));
  const valuesGroupsSet = new Set(values.groups.map(({ id }) => id));

  const groupsToAdd = values.groups.filter(({ id }) => !userGroupsSet.has(id));
  const groupsToRemove = userData.groups.filter(({ id }) => !valuesGroupsSet.has(id));
  delete newValues.groups;

  //2. Check if user data changed
  if (
    newValues.firstName === userData.firstName &&
    newValues.lastName === userData.lastName &&
    newValues.roleTypeId === userData.roleTypeId &&
    newValues.active === userData.active
  ) {
    newValues = null;
  }

  //3. update User
  if (newValues) {
    const response = await effects.users.api.updateUser(newValues, token);
    if (response.error) return response;
  } else {
    newValues = userData
  }

  //4. Add to group
  newValues.groups = userData.groups;

  if (groupsToAdd?.length > 0) {
    for await (const group of groupsToAdd) {
      const grp = await effects.users.api.addUserToGroup({
        groupId: group.id,
        userId: newValues.id,
        token,
      });
      if (!grp.error) newValues.groups = [ ...newValues.groups, group ];
    }
  }

  //5. remove from group
  if (groupsToRemove?.length > 0) {
    for await (const group of groupsToRemove) {
      const grp = await effects.users.api.deleteUserFromGroup({
        groupId: group.id,
        userId: newValues.id,
        token,
      });
      if (!grp.error) {
        newValues.groups.filter((userGroup) => userGroup.id !== group.id);
      }
    }
  }

  //6. Upload avatar
  if (newAvatar?.name) {
    const respUploadAvatar = await uploadAvatar(
      { state, effects },
      { avatar: newAvatar, userId: userData.id }
    );
    if (!respUploadAvatar.error) newValues.avatarUrl = respUploadAvatar;
  } else if (newAvatar === null) {
    const resDelAvatar = await deleteAvatar({ state, effects }, userData.id);
    if (!resDelAvatar.error) newValues.avatarUrl = null;
  } else {
    newValues.avatarUrl = userData.avatarUrl
  }

  //7. update state;
  state.users.list = state.users.list.map((user) => {
    if (user.id === newValues.id) user = newValues;
    return user;
  });

  return userData;
};

export const updateUserStatus = async ({ state, effects }, values) => {
  const token = state.session.user.token;

  //clean data
  const newValues = { ...values };
  delete newValues.avatarUrl;
  delete newValues.groups;

  const response = await effects.users.api.updateUser(newValues, token);
  if (response.error) return response;

  // update state;
  state.users.list = state.users.list.map((user) => {
    if (user.id === values.id) user.active = values.active;
    return user;
  });

  return values;
};

//***** GROUPS */

export const getGroups = async ({ state, effects }) => {
  const token = state.session.user.token;
  let groups = await effects.users.api.getGroups(token);

  groups = sortBy(groups, 'name');
  state.users.groups = [...groups];

  return state.users.groups;
};

export const getGroup = async ({ state, effects }, groupId) => {
  let selectedGroup = state.users.groups.find((group) => group.id === groupId);

  if (!selectedGroup) {
    const token = state.session.user.token;

    selectedGroup = await effects.users.api.getGroup({ groupId, token });
    if (selectedGroup?.error) return { error: selectedGroup.error };

    const updatedGroup = [...state.users.groups, selectedGroup];
    state.users.groups = [...sortBy(updatedGroup, 'name')];
  }
  
  return selectedGroup;
};

export const createGroup = async ({ state, effects }, groupData) => {
  const token = state.session.user.token;

  const response = await effects.users.api.createGroup(groupData, token);
  if (response.error) return response;

  state.users.groups.unshift(response);

  return response;
};

export const updateGroup = async ({ state, effects }, groupData) => {
  const token = state.session.user.token;

  const response = await effects.users.api.updateGroup(groupData, token);
  if (response.error) return response;

  state.users.groups = state.users.groups.map((group) => {
    if (group.id === groupData.id) group = groupData;
    return group;
  });

  return response;
};

export const updateGroupStatus = async ({ state, effects }, groupData) => {
  const token = state.session.user.token;

  const response = await effects.users.api.updateGroup(groupData, token);
  if (response.error) return response;

  state.users.groups = state.users.groups.map((group) => {
    if (group.id === groupData.id) group = groupData;
    return group;
  });

  return response;
};

//***** PASSWORD */

export const requestPassword = async ({ effects }, { email }) => {
  const response = await effects.users.api.requestPassword(email);
  if (response.error) return response;
  return {};
};

export const resetPassword = async ({ effects }, { password, token }) => {
  const response = await effects.users.api.resetPassword(password, token);
  if (response.error) return response;
  return {};
};

//***** AVATAR */

export const uploadAvatar = async ({ state, effects }, { avatar, userId }) => {
  const token = state.session.user.token;
  const response = await effects.users.api.uploadAvatar({ avatar, userId, token });
  if (response.error) return { error: response.statusText };
  return response.fileName;
};

export const deleteAvatar = async ({ state, effects }, userId) => {
  const token = state.session.user.token;
  const response = await effects.users.api.deleteAvatar(userId, token);
  if (response.error) return { error: response.statusText };
  return response;
};

//***** UTIL */

const sortBy = (items, prop) => {
  items.sort((a, b) => {
    const propA = a[prop].toUpperCase(); // ignore upper and lowercase
    const propB = b[prop].toUpperCase(); // ignore upper and lowercase
    if (propA < propB) return -1;
    if (propA > propB) return 1;
    return 0;
  });
  return items;
};
