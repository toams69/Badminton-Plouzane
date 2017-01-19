import React, { Component } from 'react';
import { connect } from 'react-redux';
import Contest from '_components/Admin/Contest.js';
import { reduxForm , formValueSelector} from 'redux-form';

import {getAllTeams, getAllTeamsSuccess} from '_actions/teams';
import {getAllClubs, getAllClubsSuccess} from '_actions/clubs';
import {updateContest, updateContestSuccess, getAllContests, getAllContestsSuccess, 
        deleteContestFailure, deleteContestSuccess, deleteContest} from '_actions/contests';



//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  
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

    deleteContest: (id) => {
      return new Promise((resolve, reject) => {
       dispatch(deleteContest(id))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
               dispatch(deleteContestFailure(response.payload));
               reject();
             } else {
              dispatch(deleteContestSuccess()); 
              resolve();
            }
          }
        );
      });
    },

    getAllContests: () => {
      return new Promise((resolve, reject) => {
       dispatch(getAllContests())
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
       
             } else {
              dispatch(getAllContestsSuccess(response.payload)); 
            }
        });
      });
    },

    updateContest: (values) => {
      return new Promise((resolve, reject) => {
       dispatch(updateContest(values))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
       
             } else {
              //dispatch(updateContestSuccess(response.payload));
              resolve();
            }
        });
      });
    },
  }
}

const selector = formValueSelector('addContestForm');

const mapStateToProps = (state) => {
  return {
    contests: state.contests.contests, 
    clubs: state.clubs.clubs,
    teams: state.teams.teams,
    typeSelected: selector(state, 'type'),
    locaux: selector(state, 'team1Id'),
    visiteurs: selector(state, 'team2Id'),
    error: state.clubs.error
  };
}



let ContestForm = reduxForm({
  form: 'addContestForm', 
  fields: ['_id', '_clubLocalId', '_clubVisiteurId', 'date', 'type'], 
  null,
  null,
  validate
})(Contest);

export default connect(mapStateToProps, mapDispatchToProps)(ContestForm);
