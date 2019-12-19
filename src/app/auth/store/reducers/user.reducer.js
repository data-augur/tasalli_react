import * as Actions from '../actions';

const initialState = {
    isAuthenticated: false,
    success: false,
    role: 'guest',
    data: {
        displayName: 'Admin Panel',
        photoURL: '',
        email: '',
        brandId: null,
        companyId: null,
        shortcuts: ['calendar', 'mail', 'contacts', 'todo']
    },
    error: {
        username: null,
        password: null
    }
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_USER_DATA: {
            return {
                success: true,
                ...initialState,
                ...action.payload
            };
        }
        case Actions.REMOVE_USER_DATA: {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export default user;
