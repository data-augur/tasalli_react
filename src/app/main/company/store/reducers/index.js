import { combineReducers } from 'redux';
import companies from './company.reducer';

const reducer = combineReducers({
  companies
});

export default reducer;
