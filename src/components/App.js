import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from '../theme';

import RouterSwitcher from './RouterSwitcher';

const App = () => {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<RouterSwitcher />
				</Router>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
