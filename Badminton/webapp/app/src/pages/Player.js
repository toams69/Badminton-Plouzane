import React, { Component } from 'react';
import PlayerContainer from '_containers/PlayerContainer.js';

class Player extends Component {

  render() {
    return (
      <PlayerContainer PlayerId={this.props.params.joueurID}/>
    );
  }
}

export default Player;
