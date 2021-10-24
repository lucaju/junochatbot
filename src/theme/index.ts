import { colors, createTheme } from '@mui/material';

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
