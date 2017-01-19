import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from '_components/Admin/Player.js';

import {getAllPlayers, getAllPlayersSuccess,
updatePlayerClub,
updatePlayer, updatePlayerSuccess, updatePlayerFailure,
deletePlayer, deletePlayerSuccess, deletePlayerFailure,
createNewPlayer, updateField, getPlayer
 } from '_actions/players';

import {getAllClubs, getAllClubsSuccess, getClub
} from '_actions/clubs';

import JsonForm from '_components/JsonForm';

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClubs: () => {
      return new Promise((resolve, reject) => {
       dispatch(getAllClubs())
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
              // //let other components know of error by updating the redux` state
              // dispatch(signInUserFailure(response.payload));
             } else {
              dispatch(getAllClubsSuccess(response.payload));
            }
        });
      });
    },

    getAllPlayers: () => {
      return new Promise((resolve, reject) => {
       dispatch(getAllPlayers())
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
              // //let other components know of error by updating the redux` state
              // dispatch(signInUserFailure(response.payload));
             } else {
              dispatch(getAllPlayersSuccess(response.payload));
            }
        });
      });
    },

    updatePlayer: (player, club) => {
      return new Promise((resolve, reject) => {
       dispatch(updatePlayer(player))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
               dispatch(updatePlayerFailure(response.payload));
               reject();
             } else {
               if (club) {
                  dispatch(updatePlayerClub(data.player["_id"], club, 2016)).then((r) => {
                    dispatch(updatePlayerSuccess(data.player));
                    resolve();
                  });
                } else {
                  dispatch(updatePlayerSuccess(data.player));
                  resolve();
                }
            }
          }
        );
      });
    },

    deletePlayer: (id) => {
      return new Promise((resolve, reject) => {
       dispatch(deleteClub(id))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
               dispatch(deletePlayerFailure(response.payload));
               reject();
             } else {
              dispatch(deletePlayerSuccess());
              resolve();
            }
          }
        );
      });
    },

    resetPlayer: () => {
      dispatch(createNewPlayer());
    },

    getPlayer: (player) => {
      dispatch(getPlayer(player));
    },

    updateField: (key, value) => {
      dispatch(updateField(key, value));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    clubs: state.clubs.clubs,
    players: state.players.players,
    error: state.players.error,
    current: state.players.current,
    jsonForm: state.players.jsonForm
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
