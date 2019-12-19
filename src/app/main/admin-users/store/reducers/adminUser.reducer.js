import * as Actions from '../actions';
import _ from '@lodash';
import * as authActions from '../../../../auth/store/actions';

const initialState = {
    entities: [],
    searchText: '',
    selectedAdminIds: [],
    routeParams: {},
    adminDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const adminUserReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                searchText: '',
                selectedAdminIds: [],
                routeParams: {},
                adminDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_ALL_ADMIN_USERS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_ADMIN_USER: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_ADMIN_USER: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_IN_SELECTED_ADMINS: {
            const adminId = action.adminId;

            let selectedAdminIds = [...state.selectedAdminIds];

            if (selectedAdminIds.find(id => id === adminId) !== undefined) {
                selectedAdminIds = selectedAdminIds.filter(id => id !== adminId);
            } else {
                selectedAdminIds = [...selectedAdminIds, adminId];
            }

            return {
                ...state,
                selectedAdminIds: selectedAdminIds
            };
        }
        case Actions.SELECT_ALL_ADMINS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedAdminIds = arr.map(admin => admin.id);

            return {
                ...state,
                selectedAdminIds: selectedAdminIds
            };
        }
        case Actions.DESELECT_ALL_ADMINS: {
            return {
                ...state,
                selectedAdminIds: []
            };
        }
        case Actions.OPEN_NEW_ADMIN_DIALOG: {
            return {
                ...state,
                adminDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_ADMIN_DIALOG: {
            return {
                ...state,
                adminDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_ADMIN_DIALOG: {
            return {
                ...state,
                adminDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_ADMIN_DIALOG: {
            return {
                ...state,
                adminDialog: {
                    type: 'edit',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        default: {
            return state;
        }
    }
};

export default adminUserReducer;
