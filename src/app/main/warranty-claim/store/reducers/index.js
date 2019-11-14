import { combineReducers } from 'redux';
import warrantyClaim from './warrantyClaim.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  warrantyClaim,
  user
});

export default reducer;
