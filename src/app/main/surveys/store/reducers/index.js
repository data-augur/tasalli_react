import { combineReducers } from 'redux';
import surveys from './surveys.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  surveys,
  user
});

export default reducer;