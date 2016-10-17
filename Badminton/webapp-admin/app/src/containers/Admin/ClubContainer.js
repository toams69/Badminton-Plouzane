import React, { Component } from 'react';
import { connect } from 'react-redux';
import Club from '_components/Admin/Club.js';

import {getAllClubs, getAllClubsSuccess,
addClub, addClubSuccess, addClubFailure,
deleteClub, deleteClubSuccess, deleteClubFailure,
resetNewClub, updateNewClub
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

    addClub: (values) => {
      return new Promise((resolve, reject) => {
       dispatch(addClub(values))
        .then((response) => {
            let data = response.payload.data;
            if(response.payload.status != 200) {
               dispatch(addClubFailure(response.payload));
               reject();
             } else {
              dispatch(addClubSuccess(data.club)); 
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
      dispatch(resetNewClub()); 
    },

    updateClub: (property, key, value) => {
      dispatch(updateNewClub(property, key, value));
    }
  }
}

const mapStateToProps = (state) => {
  return { 
    clubs: state.clubs.clubs,
    error: state.clubs.error,
    newClub: state.clubs.newClub,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Club);
