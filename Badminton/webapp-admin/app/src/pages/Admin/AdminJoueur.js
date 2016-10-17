import React, { Component } from 'react';
import HeaderContainer from '_containers/HeaderContainer.js';
import DrawerContainer from '_containers/DrawerContainer.js';
import Drawer from 'material-ui/Drawer';

const styles = {
  drawer: {
    top: 76
  },
};

class AdminJoueur extends Component {

  componentDidMount() {
    this.setState({open: false });
  }

  handleToggle = () => this.setState({open: !(this.state && this.state.open)});

  render() {
    return (
      <div>
        coucou
      </div>
    );
  }
}

export default AdminJoueur;
