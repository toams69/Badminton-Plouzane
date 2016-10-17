
import { 
  UPDATE_PLAYER, UPDATE_PLAYER_SUCCESS, UPDATE_PLAYER_FAILURE,
  GET_PLAYERS, GET_PLAYERS_SUCCESS, GET_PLAYERS_FAILURE,
  DELETE_PLAYERS, DELETE_PLAYERS_SUCCESS, DELETE_PLAYERS_FAILURE,
 // SELECT_PLAYER_TO_EDIT, EDIT_PLAYER_SUCCESS, EDIT_PLAYER, EDIT_PLAYER_FAILURE,
  CREATE_NEW_PLAYER, UPDATE_FIELD,
  GET_PLAYER
} from '../actions/players';

import uuid from 'uuid';
import newPlayerForm from '_forms/player.form.json';
import _ from 'lodash'

const INITIAL_STATE = {
  players:[], 
  status: null, 
  error: null, 
  loading: false,
  jsonForm: Object.assign({}, _.cloneDeep(newPlayerForm)),
  current: Object.assign({}, {_id: uuid.v1(), isNew: true})
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

    case UPDATE_PLAYER:
      return { ...state, error:null, loading: true};
    case UPDATE_PLAYER_FAILURE:
      var errors = action.payload.data.error.errors;
      return { ...state, error:action.payload.data.error, loading: false };
    case UPDATE_PLAYER_SUCCESS:
      return { ...state, players:[...state.players, action.payload], error:null, loading: false, current: Object.assign({}, {_id: uuid.v1(), isNew: true})};
    case CREATE_NEW_PLAYER:
      return {  ...state, current: Object.assign({}, {_id: uuid.v1(), isNew: true})};


    case UPDATE_FIELD:
      var _player = state.current;
      _player[action.key] = action.value;
     return {...state, current: _player, error:null};

    case DELETE_PLAYERS:
      return { ...state, error:null, loading: true};
    case DELETE_PLAYERS_FAILURE:
      return { ...state, error:action.payload.data.error, loading: false};
    case DELETE_PLAYERS_SUCCESS:
      return { ...state, players:[...state.players], error:null, loading: false};

    case GET_PLAYER:
      return {...state, current: action.player,  error:null}

    default:
    return state;
  }
}