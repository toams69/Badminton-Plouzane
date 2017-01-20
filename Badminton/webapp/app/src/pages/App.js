import React from 'react';
import { Component, PropTypes } from 'react';
import AppContainer from '../containers/AppContainer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import HeaderContainer from '../containers/HeaderContainer.js';
import DrawerContainer from '../containers/DrawerContainer.js';
import Drawer from 'material-ui/Drawer';

injectTapEventPlugin();

const styles = {
  drawer: {
    top: 76
  },
};

export default class App extends Component {

  static contextTypes = {
   	router: PropTypes.object
  };

  componentDidMount() {
    this.setState({open: false });

  }

  handleToggle = () => this.setState({open: !(this.state && this.state.open)});

  handleItemMenuClick = (route) => {
  	this.context.router.push(route);
 	 this.setState({open: false });
  }

  render() {
	return (
		<MuiThemeProvider muiTheme={getMuiTheme()}>
			<AppContainer>
			 	<div>
					<HeaderContainer handleToggle={this.handleToggle} />
					<Drawer docked={false} open={this.state ? this.state.open : false} containerStyle={styles.drawer} onRouteChange={this.handleToggle} onRequestChange={(open) => this.setState({open})}>
						<DrawerContainer onItemClick={this.handleItemMenuClick}/>
					</Drawer>
					<div>
						{this.props.children}
					</div>
				</div>
			</AppContainer>
		 </MuiThemeProvider>
	);
   }
}
