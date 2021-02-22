export const updateTitle = ({ state }, title) => {
  state.ui.title = title;
};

export const setDarkMode = ({ state }, value) => {
  state.ui.darkMode = value;
  localStorage.setItem('darkMode', JSON.stringify(value));
};

export const switchLanguage = ({ state }, value) => {
  state.ui.languageCode = value;
};

export const showNotification = ({ state }, { message, type }) => { 
  state.ui.notification = { type, message, open: true };
};

export const closeNotification = ({ state }) => {
  state.ui.notification = {
    messsage: '',
    open: false,
    type: state.ui.notification.type,
  };
};
