import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// import Home from './home/Home';
import SignIn from './signin/SignIn';

import { useApp } from '../app';

const useQuery = () => new URLSearchParams(useLocation().search);

const RouterSwitcher = () => {
	const query = useQuery();
	const { actions } = useApp();
	if (query.get('debug') === 'true') actions.general.setDebug(true);
	return (
		<Switch>
			{/* <Route path="/bot" component={Main} /> */}
			{/* <Route component={Home} /> */}
			<Route component={SignIn} />
		</Switch>
	);
};

export default RouterSwitcher;
