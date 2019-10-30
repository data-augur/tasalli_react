import { combineReducers } from 'redux';
import appUser from './appUser.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  appUser,
  user
});

export default reducer;
