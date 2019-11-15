import { combineReducers } from 'redux';
import warrantyRegister from './warrantyRegister.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  warrantyRegister,
  user
});

export default reducer;
