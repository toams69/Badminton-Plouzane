import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import clubReducer from './club_reducer';
import playerReducer from './player_reducer';
import teamReducer from './team_reducer';
import contestReducer from './contest_reducer'

const rootReducer = combineReducers({
  form: formReducer, // <-- redux-form
  clubs: clubReducer,
  players: playerReducer,
  contests: contestReducer,
  teams: teamReducer
});

export default rootReducer;
