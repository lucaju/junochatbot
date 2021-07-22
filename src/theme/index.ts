import { createTheme, colors } from '@material-ui/core';

const theme = (darkMode?: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.lightBlue[500],
      },
      secondary: {
        main: colors.orange[400],
      },
    },
  });

export default theme;
