import { combineReducers } from 'redux';

import matchReducer from './match/match.reducer';

export default combineReducers({
  match: matchReducer,
});
