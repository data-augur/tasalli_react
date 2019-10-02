import * as Actions from "../actions";
import isEmpty from "../is-empty";

const initialState = {
  isAuthenticated: false,
  success: false,
  user: {},
  error: {
    username: null,
    password: null
  }
};

const login = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_CURRENT_USER: {
      return {
        ...initialState,
        isAuthenticated: !isEmpty(action.payload),
        success: true,
        user: action.payload
      };
    }
    case Actions.LOGIN_ERROR: {
      return {
        success: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default login;
