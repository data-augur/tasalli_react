import { combineReducers } from 'redux';
import warrantyRegistrationAttribute from './WarrantyRegistrationAttribute.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  warrantyRegistrationAttribute,
  user
});

export default reducer;
