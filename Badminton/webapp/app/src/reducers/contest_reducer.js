
import { 
  GET_CONTESTS, GET_CONTESTS_SUCCESS, GET_CONTESTS_FAILURE,
  GET_CONTEST
} from '../actions/contests';

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
    case GET_CONTEST:
      return {...state, current: action.contest,  error:null}

    default:
    return state;
  }
}