
import { 
  ADD_CLUB, ADD_CLUB_SUCCESS, ADD_CLUB_FAILURE,
  GET_CLUBS, GET_CLUBS_SUCCESS, GET_CLUBS_FAILURE,
  DELETE_CLUBS, DELETE_CLUBS_SUCCESS, DELETE_CLUBS_FAILURE,
  RESET_NEW_CLUB, UPDATE_NEW_CLUB
} from '../actions/clubs';

import uuid from 'uuid';
import newClubForm from '_forms/addclub.form.json';
import _ from 'lodash'

const INITIAL_STATE = {clubs:[], status: null, error: null, loading: false, newClub: Object.assign({uuid: uuid.v1()}, _.cloneDeep(newClubForm))};


/*
 if (errors && errors[key]) {
        switch (errors[key].kind) {
          case "required":
            return "Ce Champ est requis";
          default:
            return "Merci de renseigner une valeur correcte";
        }
      }
*/

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case GET_CLUBS:
      return { ...state, error:null, loading: true};
    case GET_CLUBS_SUCCESS:
      return { 
        ...state,
        clubs: action.payload.data,
        error:null,
        loading: false
      };
    case GET_CLUBS_FAILURE:
      return { ...state, error:"an error occured", loading: false};

    case ADD_CLUB:
      return { ...state, error:null, loading: true};
    case ADD_CLUB_FAILURE:
      var properties = state.newClub.schema.properties;
      var errors = action.payload.data.error.errors;
      for (let key of Object.keys(errors)) {
        if (properties[key]) {
          properties[key].error = errors[key];
        }
      }
      return {
        ...state,
        error:action.payload.data.error,
        newClub: {
          ...state.newClub,
          schema: {
            ...state.newClub.schema,
            properties: properties
          }
        },
        loading: false
      };
    case ADD_CLUB_SUCCESS:
      return { ...state, clubs:[...state.clubs, action.payload], error:null, loading: false, newClub: Object.assign({uuid: uuid.v1()}, _.cloneDeep(newClubForm))};
    case RESET_NEW_CLUB:
      return {  ...state, newClub: Object.assign({uuid: uuid.v1()}, _.cloneDeep(newClubForm))};
    case UPDATE_NEW_CLUB:
      state.newClub.schema.properties[action.key].value = action.value;
     return {...state};

    case DELETE_CLUBS:
      return { ...state, error:null, loading: true};
    case DELETE_CLUBS_FAILURE:
      return { ...state, error:action.payload.data.error, loading: false};
    case DELETE_CLUBS_SUCCESS:
      return { ...state, clubs:[...state.clubs], error:null, loading: false};

    default:
    return state;
  }
}