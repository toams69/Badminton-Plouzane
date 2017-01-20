import React, { Component } from 'react';
import { connect } from 'react-redux';
import Players from '_components/Players.js';


import {getAllPlayers, getAllPlayersSuccess } from '_actions/players';
import {getAllClubs, getAllClubsSuccess } from '_actions/clubs';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllPlayers: () => {
      return new Promise((resolve, reject) => {
       dispatch(getAllPlayers())
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
            
             } else {
              dispatch(getAllPlayersSuccess(response.payload));
            }
        });
      });
    },

    getAllClubs: () => {
      return new Promise((resolve, reject) => {
       dispatch(getAllClubs())
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
            
             } else {
              dispatch(getAllClubsSuccess(response.payload));
            }
        });
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.players.players,
    clubs: state.clubs.clubs,
    error: state.players.error,
    current: state.players.current
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Players);
