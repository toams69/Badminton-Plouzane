import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from '_components/Player.js';

import {getPlayer, getPlayerSuccess } from '_actions/players';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	getPlayer: (id) => {
      return new Promise((resolve, reject) => {
       dispatch(getPlayer(id))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
            
             } else {
              dispatch(getPlayerSuccess(response.payload));
            }
        });
      });
    },
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.players.error,
    player: state.players.current
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
