import { combineReducers } from 'redux';
import adminUser from './adminUser.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  adminUser,
  user
});

export default reducer;
