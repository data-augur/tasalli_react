import { combineReducers } from 'redux';
import warrantyClaimed from './warrantyClaimed.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  warrantyClaimed,
  user
});

export default reducer;
