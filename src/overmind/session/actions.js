import Cookies from 'js-cookie';

export const hasToken = () => getUserToken();

export const getUserToken = () => {
  const token = Cookies.get('chatStoriesToken');
  return token;
};

export const signedIn = async ({ state, actions }) => {
  if (state.session.isSignedIn) return true;
  if (!state.session.isSignedIn && hasToken()) {
    const token = getUserToken();
    const user = await actions.session.authenticate({ token });
    if (user) return true;
  }
  return false;
};

export const authenticate = async (
  { state, effects },
  { email = null, password = null, token = null }
) => {
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

export const getStories = async ({ state, effects }) => {
  state.session.stories = await effects.session.stories.getStories();
};
