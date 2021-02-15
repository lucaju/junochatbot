export const updateTitle = ({ state }, title) => {
  state.ui.title = title;
};

export const setDarkMode = ({ state }, value) => {
  state.ui.darkMode = value;
  localStorage.setItem('darkMode', JSON.stringify(value));
};
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
