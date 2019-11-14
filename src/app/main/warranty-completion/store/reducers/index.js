import { combineReducers } from 'redux';
import warrantyCompletion from './warrantyCompletion.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  warrantyCompletion,
  user
});

export default reducer;
