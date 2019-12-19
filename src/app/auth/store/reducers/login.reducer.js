import * as Actions from "../actions";
import isEmpty from "../is-empty";

const initialState = {
    isAuthenticated: false,
    success: false,
    user: {
        brandId: null,
        companyId: null,
        email: null,
        name: null,
        role: null,
    },
    error: {
        username: null,
        password: null
    }
};

const login = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_CURRENT_USER: {
            state = action.payload;

            return {
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
