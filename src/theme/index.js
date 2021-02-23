import { createMuiTheme, colors } from '@material-ui/core';

const theme = (darkMode) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.lightBlue[500],
        // main: '#00aeef',
      },
      secondary: {
        main: colors.blueGrey[400],
        // main: '#687988',
      },
    },
  });

export default theme;
