import { combineReducers } from 'redux';
import ads from './ads.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  ads,
  user
});

export default reducer;
