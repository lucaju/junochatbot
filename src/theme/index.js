import { createMuiTheme, colors } from '@material-ui/core';

const theme = (darkMode) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.lightBlue[500],
      },
      secondary: {
        main: '#F7941D',
      },
    },
  });

export default theme;
