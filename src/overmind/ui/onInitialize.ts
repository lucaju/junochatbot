import { OnInitialize } from 'overmind';

export const onInitialize:OnInitialize = ({ state }) => {
  //LANGUAGE
  const prefLanguage = localStorage.getItem('i18nextLng');
  if (prefLanguage) state.ui.languageCode = prefLanguage;

  //DARK MODE
  const prefDarkMode = localStorage.getItem('darkMode');
  const darkMode = prefDarkMode === 'true' ? true : false;
  state.ui.darkMode = darkMode;
};
