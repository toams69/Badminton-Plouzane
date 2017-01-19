
import { 
  GET_TEAMS, GET_TEAMS_SUCCESS, GET_TEAMS_FAILURE,
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

    case GET_TEAM:
      return {...state, current: action.team,  error:null}

    default:
    return state;
  }
}