import { combineReducers } from 'redux';
import warrantyRegistration from './warrantyRegistration.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  warrantyRegistration,
  user
});

export default reducer;
