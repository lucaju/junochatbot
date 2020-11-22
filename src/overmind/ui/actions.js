import Cookies from 'js-cookie';

export const updateTitle = ({ state }, title) => {
  state.ui.title = title;
};

export const setDarkMode = ({ state }, value) => {
  state.ui.darkMode = value;
  Cookies.set('chatStoriesDarkMode', state.ui.darkMode);
};
