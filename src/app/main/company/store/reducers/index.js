import { combineReducers } from 'redux';
import companies from './company.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  companies,
  user
});

export default reducer;
