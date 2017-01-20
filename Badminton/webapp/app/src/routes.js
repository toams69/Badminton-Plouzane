import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Player from './pages/Player';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />
		<Route path="/joueurs" component={Players} />
		<Route path="/joueur/:joueurID" component={Player} />
	</Route>
);
