import React, { Component } from 'react';
import PlayersContainer from '_containers/PlayersContainer.js';

class Player extends Component {

  render() {
    return (
      <PlayersContainer PlayerId={this.props.params.joueurID}/>
    );
  }
}

export default Player;
