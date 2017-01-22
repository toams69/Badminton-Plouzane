import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {AppBar} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  onItemTouchTap(e, child) {
    
  }

	render() {
      return (
          <AppBar title={this.props.title} onLeftIconButtonTouchTap={this.props.handleToggle} />
      );
	}
}

export default Header