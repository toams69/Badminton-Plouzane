
import { 
  UPDATE_CLUB, UPDATE_CLUB_SUCCESS, UPDATE_CLUB_FAILURE,
  GET_CLUBS, GET_CLUBS_SUCCESS, GET_CLUBS_FAILURE,
  DELETE_CLUBS, DELETE_CLUBS_SUCCESS, DELETE_CLUBS_FAILURE,
 // SELECT_CLUB_TO_EDIT, EDIT_CLUB_SUCCESS, EDIT_CLUB, EDIT_CLUB_FAILURE,
  CREATE_NEW_CLUB, UPDATE_FIELD,
  GET_CLUB
} from '_actions/clubs';

import uuid from 'uuid';
import newClubForm from '_forms/addclub.form.json';
import _ from 'lodash'

const INITIAL_STATE = {
  clubs:[], 
  status: null, 
  error: null, 
  loading: false,
  jsonForm: Object.assign({}, _.cloneDeep(newClubForm)),
  current: Object.assign({}, {_id: uuid.v1(), isNew: true})
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

    case UPDATE_CLUB:
      return { ...state, error:null, loading: true};
    case UPDATE_CLUB_FAILURE:
      var errors = action.payload.data.error.errors;
      return { ...state, error:action.payload.data.error, loading: false };
    case UPDATE_CLUB_SUCCESS:
      return { ...state, clubs:[...state.clubs, action.payload], error:null, loading: false, current: Object.assign({}, {_id: uuid.v1(), isNew: true})};
    case CREATE_NEW_CLUB:
      return {  ...state, current: Object.assign({}, {_id: uuid.v1(), isNew: true})};


    case UPDATE_FIELD:
      var _club = state.current;
      _club[action.key] = action.value;
     return {...state, current: _club, error:null};

    case DELETE_CLUBS:
      return { ...state, error:null, loading: true};
    case DELETE_CLUBS_FAILURE:
      return { ...state, error:action.payload.data.error, loading: false};
    case DELETE_CLUBS_SUCCESS:
      return { ...state, clubs:[...state.clubs], error:null, loading: false};

    case GET_CLUB:
      return {...state, current: action.club,  error:null}

    default:
    return state;
  }
}