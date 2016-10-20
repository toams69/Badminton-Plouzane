import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import clubReducer from './club_reducer';
import playerReducer from './player_reducer';

const rootReducer = combineReducers({
  form: formReducer, // <-- redux-form
  clubs: clubReducer,
  players: playerReducer
});

export default rootReducer;
