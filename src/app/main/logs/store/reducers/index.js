import { combineReducers } from 'redux';
import logs from './logs.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  logs,
  user
});

export default reducer;
