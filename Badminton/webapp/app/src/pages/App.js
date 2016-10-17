import React from 'react';
import { Component } from 'react';
import AppContainer from '../containers/AppContainer';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<AppContainer>
				 {this.props.children}
				</AppContainer>
			 </MuiThemeProvider>
		);
	}
}
