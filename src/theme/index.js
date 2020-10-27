import { createMuiTheme, colors } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: colors.orange[800],
    },
    secondary: {
      main: colors.indigo[500]
    },
  },
});

export default theme;
