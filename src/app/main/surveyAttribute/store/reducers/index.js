import { combineReducers } from 'redux';
import surveyAttribute from './surveyAttribute.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  surveyAttribute,
  user
});

export default reducer;
