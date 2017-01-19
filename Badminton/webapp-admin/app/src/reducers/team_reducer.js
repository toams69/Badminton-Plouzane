
import { 
  UPDATE_TEAM, UPDATE_TEAM_SUCCESS, UPDATE_TEAM_FAILURE,
  GET_TEAMS, GET_TEAMS_SUCCESS, GET_TEAMS_FAILURE,
  DELETE_TEAMS, DELETE_TEAMS_SUCCESS, DELETE_TEAMS_FAILURE,
  GET_TEAM
} from '../actions/teams';

import uuid from 'uuid';
import _ from 'lodash'

const INITIAL_STATE = {
  teams:[], 
  status: null, 
  error: null, 
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case GET_TEAMS:
      return { ...state, error:null, loading: true};
    case GET_TEAMS_SUCCESS:
      return { 
        ...state,
        teams: action.payload.data,
        error:null,
        loading: false
      };
    case GET_TEAMS_FAILURE:
      return { ...state, error:"an error occured", loading: false};

    case UPDATE_TEAM:
      return { ...state, error:null, loading: true};
    case UPDATE_TEAM_FAILURE:
      var errors = action.payload.data.error.errors;
      return { ...state, error:action.payload.data.error, loading: false };
    case UPDATE_TEAM_SUCCESS:
      if (action.payload && _.find(state.teams, function(t) {return t._id === action.payload._id})) {
        let f = _.find(state.teams, function(t) {return t._id === action.payload._id;})
        _.extend(f, action.payload)
        return { ...state, teams:[...state.teams], error:null, loading: false};
      }
      return { ...state, teams:[...state.teams, action.payload], error:null, loading: false};

    case DELETE_TEAMS:
      return { ...state, error:null, loading: true};
    case DELETE_TEAMS_FAILURE:
      return { ...state, error:action.payload.data.error, loading: false};
    case DELETE_TEAMS_SUCCESS:
      return { ...state, teams:[...state.teams], error:null, loading: false};

    case GET_TEAM:
      return {...state, current: action.team,  error:null}

    default:
    return state;
  }
}