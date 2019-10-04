import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';

const userReducer = function(state = {}, action) {
  switch (action.type) {
    case Actions.GET_USER_DATA:
      return action.payload;
    case authActions.LOGOUT: {
      return {
        state: {}
      };
    }
    default:
      return state;
  }
};

export default userReducer;
