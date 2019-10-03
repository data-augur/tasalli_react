import { combineReducers } from 'redux';
import brandUser from './brandUser.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  brandUser,
  user
});

export default reducer;
