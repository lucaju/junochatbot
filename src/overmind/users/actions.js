export const getUsers = async ({ state, effects }, filter) => {
  const isAdmin = state.session.isAdmin;
  if (!isAdmin) filter = { group: state.session.user.group };
  state.users.list = await effects.users.getUsers(filter);
};

export const getUser = async ({ effects }, userId) => {
  return await effects.users.getUser(userId);
};

export const save = async ({ state, effects }, userData) => {
  let res;
  if (userData.id) {
    res = await effects.users.updateUser(userData);
    if (res) {
      state.users.list = state.users.list.map((user) => {
        if (user.id === userData.id) user = userData;
        return user;
      });
    }
  } else {
    res = await effects.users.addUser(userData);
    if (res) {
      userData.id = res.id;
      state.users.list.unshift(userData);
    }
  }
  return res;
};

export const deleteUser = async ({ state, effects }, userId) => {
  const res = await effects.users.deleteUser(userId);
  if (res) {
    state.users.list = state.users.list.filter((user) => user.id !== userId);
  }
  return res;
};
