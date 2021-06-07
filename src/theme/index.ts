import { createMuiTheme, colors } from '@material-ui/core';

const theme = (darkMode:boolean) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.lightBlue[500],
      },
      secondary: {
        main: colors.orange[400],
      },
    },
  });

export default theme;
