
import { 
  GET_PLAYERS, GET_PLAYERS_SUCCESS, GET_PLAYERS_FAILURE,
  GET_PLAYER, GET_PLAYER_SUCCESS, GET_PLAYER_FAILURE,
} from '../actions/players';

import uuid from 'uuid';
import _ from 'lodash'

const INITIAL_STATE = {
  players:[], 
  status: null, 
  error: null, 
  loading: false,
  current: null
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case GET_PLAYERS:
      return { ...state, error:null, loading: true};
    case GET_PLAYERS_SUCCESS:
      return { 
        ...state,
        players: action.payload.data,
        error:null,
        loading: false
      };
    case GET_PLAYERS_FAILURE:
      return { ...state, error:"an error occured", loading: false};

    case GET_PLAYER_SUCCESS:
      return { 
        ...state,
        current: action.payload.data,
        error:null,
        loading: false
      };
    case GET_PLAYER_FAILURE:
      return { ...state, error:"an error occured", loading: false};
    case GET_PLAYER:
      return { ...state, error:null, loading: true};

    default:
    return state;
  }
}