
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
      const clubs = [];
      _.each(action.payload.data, function(d) {
        var c = d.club;
        c.players = d.players;
        c.players.sort(function(a, b) {
          var o1 = a.prenom.toLowerCase();
          var o2 = b.prenom.toLowerCase();
          var p1 = a.nom.toLowerCase();
          var p2 = b.nom.toLowerCase();
          if (o1 < o2) return -1;
          if (o1 > o2) return 1;
          if (p1 < p2) return -1;
          if (p1 > p2) return 1;
          return 0;
        });
        clubs.push(d.club);
      });
      clubs.sort(function(a, b) {
        return a.nom > b.nom ? 1 : -1;
      });

      return { 
        ...state,
        clubs: clubs,
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