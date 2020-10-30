export const getUsers = async ({ state, effects }) => {
  state.users.list = await effects.users.getUsers();
};