import { combineReducers } from 'redux';
import brands from './brands.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  brands,
  user
});

export default reducer;
