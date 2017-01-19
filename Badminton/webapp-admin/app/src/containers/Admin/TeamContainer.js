import React, { Component } from 'react';
import { connect } from 'react-redux';
import Team from '_components/Admin/Team.js';
import { reduxForm } from 'redux-form';

import {getAllTeams, getAllTeamsSuccess,
updateTeam, updateTeamSuccess, updateTeamFailure,
deleteTeam, deleteTeamSuccess, deleteTeamFailure,
getTeam
 } from '_actions/teams';

import {getAllPlayers, getAllPlayersSuccess} from '_actions/players';
import {getAllClubs, getAllClubsSuccess} from '_actions/clubs';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.nom || values.nom.trim() === '') {
    errors.nom = 'Entrez un nom d\'équipe';
    hasErrors = true;
  }
  if (!values._clubId) {
    errors.nom = 'Choisir un club';
    hasErrors = true;
  }
   return hasErrors && errors;
} 

const mapDispatchToProps = (dispatch) => {
  return {
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
    },

    getAllTeams: () => {
      return new Promise((resolve, reject) => {
       dispatch(getAllTeams())
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
       
             } else {
              dispatch(getAllTeamsSuccess(response.payload)); 
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

    updateTeam: (team) => {
      return new Promise((resolve, reject) => {
       dispatch(updateTeam(team))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
               dispatch(updateTeamFailure(response.payload));
               reject();
             } else {
              dispatch(updateTeamSuccess(data.team)); 
              resolve();
            }
          }
        );
      });
    },

    deleteTeam: (id) => {
      return new Promise((resolve, reject) => {
       dispatch(deleteTeam(id))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
               dispatch(deleteTeamFailure(response.payload));
               reject();
             } else {
              dispatch(deleteTeamSuccess()); 
              resolve();
            }
          }
        );
      });
    },

    getTeam: (team) => {
      //p.initialValues.nom = "Thomas";
    }
  }
}

const mapStateToProps = (state) => {
  return { 
    clubs: state.clubs.clubs,
    players: state.players.players,
    teams: state.teams.teams,
    error: state.clubs.error
  };
}

let TeamForm = reduxForm({
  form: 'addEquipeForm', 
  fields: ['_id', 'nom', '_clubId', 'saison', 'type'], 
  null,
  null,
  validate
})(Team);

export default connect(mapStateToProps, mapDispatchToProps)(TeamForm);
