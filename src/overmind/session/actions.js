import Cookies from 'js-cookie';

export const authenticate = async ({ state, effects }, { email, password ,token }) => {
  let user;
  if (token) {
    user = await effects.session.auth.authenticateWithToken(token);
  } else {
    user = await effects.session.auth.authenticateWithCredentials({
      email,
      password,
    });
    Cookies.set('chatStoriesToken', user.token);
  }
  state.session.user = user;
  return user;
};

export const getUserToken = () => {
  const token = Cookies.get('chatStoriesToken');
  return token;
};

export const getStories = async ({ state, effects }) => {
  state.session.stories = await effects.session.stories.getStories();
};
