import React, { Component } from 'react';
import { connect } from 'react-redux';
import Club from '_components/Admin/Club.js';

import {getAllClubs, getAllClubsSuccess,
updateClub, updateClubSuccess, updateClubFailure,
deleteClub, deleteClubSuccess, deleteClubFailure,
createNewClub, updateField, getClub
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

    updateClub: (club) => {
      return new Promise((resolve, reject) => {
       dispatch(updateClub(club))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
               dispatch(updateClubFailure(response.payload));
               reject();
             } else {
              dispatch(updateClubSuccess(data.club)); 
              resolve();
            }
          }
        );
      });
    },

    deleteClub: (id) => {
      return new Promise((resolve, reject) => {
       dispatch(deleteClub(id))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
               dispatch(deleteClubFailure(response.payload));
               reject();
             } else {
              dispatch(deleteClubSuccess()); 
              resolve();
            }
          }
        );
      });
    },

    resetClub: () => {
      dispatch(createNewClub()); 
    },

    getClub: (club) => {
      dispatch(getClub(club));
    },

    updateField: (key, value) => {
      dispatch(updateField(key, value));
    }
  }
}

const mapStateToProps = (state) => {
  return { 
    clubs: state.clubs.clubs,
    error: state.clubs.error,
    current: state.clubs.current,
    jsonForm: state.clubs.jsonForm
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Club);
