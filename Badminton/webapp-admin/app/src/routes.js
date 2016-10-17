import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import Dashboard from './pages/Dashboard';


import AdminJoueur from './pages/Admin/AdminJoueur';
import AdminClub from './pages/Admin/AdminClub';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />
		<Route path="admin">
			<Route path="/admin/dashboard" component={Dashboard} />
			<Route path="/admin/joueurs" component={AdminJoueur} />
			<Route path="/admin/clubs" component={AdminClub} />
		</Route>
	</Route>
);
