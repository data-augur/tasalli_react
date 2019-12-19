import {combineReducers} from "redux";
import notifications from "./notification.reducer";

const reducer = combineReducers({
    notifications
});

export default reducer;
