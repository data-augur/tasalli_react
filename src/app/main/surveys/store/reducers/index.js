import {combineReducers} from 'redux';
import surveys from './surveys.reducer';

const reducer = combineReducers({
    surveys
});

export default reducer;
