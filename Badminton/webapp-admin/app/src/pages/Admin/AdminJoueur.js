import React, { Component } from 'react';
import PlayerContainer from '_containers/Admin/PlayerContainer.js';

const styles = {
  drawer: {
    top: 76
  },
};

class AdminJoueur extends Component {

  render() {
    return (
      <PlayerContainer />
    );
  }
}

export default AdminJoueur;
