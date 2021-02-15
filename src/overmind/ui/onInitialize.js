export const onInitialize = ({ state }) => {
  //LANGUAGE
  let prefLanguage = localStorage.getItem('language');
  if (!prefLanguage) {
    prefLanguage = navigator.language;
    localStorage.setItem('language', prefLanguage);
  }
  state.ui.languageCode = prefLanguage;

  //DARK MODE
  const prefDarkMode = localStorage.getItem('darkMode');
  const darkMode = prefDarkMode === 'true' ? true : false;
  state.ui.darkMode = darkMode;
};
