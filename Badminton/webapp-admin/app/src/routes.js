import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import Dashboard from './pages/Dashboard';


import AdminJoueur from './pages/Admin/AdminJoueur';
import AdminClub from './pages/Admin/AdminClub';
import AdminTeam from './pages/Admin/AdminTeam';
import AdminMatch from './pages/Admin/AdminMatch';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />
		<Route path="admin">
			<Route path="/admin/dashboard" component={Dashboard} />
			<Route path="/admin/joueurs" component={AdminJoueur} />
			<Route path="/admin/clubs" component={AdminClub} />
			<Route path="/admin/equipes" component={AdminTeam} />
			<Route path="/admin/rencontre" component={AdminMatch} />
		</Route>
	</Route>
);
