import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import Dashboard from './pages/Dashboard';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />
	</Route>
);
