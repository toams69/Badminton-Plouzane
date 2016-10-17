import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {AppBar} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
  >
    <MenuItem primaryText="Mon profil" key={"profile"}/>
    <MenuItem primaryText="Se deconnecter" key={"logout"}/>
  </IconMenu>
);

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
      //this.context.router.push('/');
    } 
  }

  onItemTouchTap(e, child) {
    if (child.key == "profile") {
      this.props.handleProfile();
    } else if (child.key == "logout") {
      this.props.logout();
      this.context.router.push('/');
    }
  }

	render() {
      const { type, authenticatedUser, handleProfil } = this.props
			if(authenticatedUser) {
        return (
          <AppBar
            title="BestSpot4Me"
            iconElementLeft={<div/>}
            iconElementRight={<Logged onItemTouchTap={this.onItemTouchTap.bind(this)}/>}
          />
        );
      }
      return (
          <div></div>
      );
	}
}

export default Header