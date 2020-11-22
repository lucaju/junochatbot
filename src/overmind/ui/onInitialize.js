import Cookies from 'js-cookie';

export const onInitialize = ({ state }) => {
  const cookie = Cookies.get('chatStoriesDarkMode') ?? false;
  const darkMode = cookie === 'true' ? true : false;
  state.ui.darkMode = darkMode;
};
