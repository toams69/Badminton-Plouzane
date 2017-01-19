
import { 
  GET_CLUBS, GET_CLUBS_SUCCESS, GET_CLUBS_FAILURE,
  GET_CLUB
} from '../actions/clubs';

import uuid from 'uuid';
import _ from 'lodash'

const INITIAL_STATE = {
  clubs:[], 
  status: null, 
  error: null, 
  loading: false,
  current: Object.assign({}, {_id: uuid.v1()})
};

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
    case GET_CLUB:
      return {...state, current: action.club,  error:null}

    default:
    return state;
  }
}