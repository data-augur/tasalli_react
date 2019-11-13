import { combineReducers } from 'redux';
import products from './products.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  products,
  user
});

export default reducer;
