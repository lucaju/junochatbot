import Cookies from 'js-cookie';

export const updateTitle = ({ state }, title) => {
  state.ui.title = title;
};

export const setDarkMode = ({ state }, value) => {
  state.ui.darkMode = value;
  Cookies.set('JunoDarkMode', state.ui.darkMode);
};

export const showNotification = ({ state }, { type, message }) => {
  state.ui.notification = { type, message, open: true };
};

export const closeNotification = ({ state }) => {
  state.ui.notification = {
    type: state.ui.notification.type,
    messsage: '',
    open: false,
  };
};
