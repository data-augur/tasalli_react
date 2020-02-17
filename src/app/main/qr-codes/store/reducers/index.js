import {combineReducers} from 'redux';
import qrcodes from './qrCodes.reducer';

const reducer = combineReducers({
    qrcodes
});

export default reducer;
