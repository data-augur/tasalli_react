import { combineReducers } from 'redux';
import warrantyClaimAttribute from './warrantyClaimAttribute.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  warrantyClaimAttribute,
  user
});

export default reducer;
