
import { 
  UPDATE_CONTEST, UPDATE_CONTEST_SUCCESS, UPDATE_CONTEST_FAILURE,
  GET_CONTESTS, GET_CONTESTS_SUCCESS, GET_CONTESTS_FAILURE,
  DELETE_CONTESTS, DELETE_CONTESTS_SUCCESS, DELETE_CONTESTS_FAILURE,
  GET_CONTEST
} from '_actions/contests';

import uuid from 'uuid';
import _ from 'lodash'

const INITIAL_STATE = {
  contests:[], 
  status: null, 
  error: null, 
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case GET_CONTESTS:
      return { ...state, error:null, loading: true};
    case GET_CONTESTS_SUCCESS:
      var finalContests = [];
      _.each(action.payload.data, function(c) {
        var date = new Date(c.date);
        finalContests.push({
          _id: c._id,
          date: date.toLocaleDateString(),
          locaux: c._team1Id.nom,
          score: ""+ c.resultatTeam1 + " - " + c.resultatTeam2,
          visiteur: c._team2Id.nom,
        });
      });
      return { 
        ...state,
        contests: finalContests,
        error:null,
        loading: false
      };
    case GET_CONTESTS_FAILURE:
      return { ...state, error:"an error occured", loading: false};

    case UPDATE_CONTEST:
      return { ...state, error:null, loading: true};
    case UPDATE_CONTEST_FAILURE:
      var errors = action.payload.data.error.errors;
      return { ...state, error:action.payload.data.error, loading: false };
    case UPDATE_CONTEST_SUCCESS:
      if (action.payload && _.find(state.contests, function(t) {return t._id === action.payload._id})) {
        let f = _.find(state.contests, function(t) {return t._id === action.payload._id;})
        _.extend(f, action.payload)
        return { ...state, contests:[...state.contests], error:null, loading: false};
      }
      return { ...state, contests:[...state.contests, action.payload], error:null, loading: false};

    case DELETE_CONTESTS:
      return { ...state, error:null, loading: true};
    case DELETE_CONTESTS_FAILURE:
      return { ...state, error:action.payload.data.error, loading: false};
    case DELETE_CONTESTS_SUCCESS:
      return { ...state, contests:[...state.contests], error:null, loading: false};

    case GET_CONTEST:
      return {...state, current: action.contest,  error:null}

    default:
    return state;
  }
}