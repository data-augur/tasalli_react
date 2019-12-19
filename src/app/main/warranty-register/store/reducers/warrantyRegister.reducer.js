import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    companies: [],
    searchText: '',
    selectedWarrantyRegisterIds: [],
    routeParams: {},
    warrantyRegisterDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const warrantyRegisterReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                companies: [],
                searchText: '',
                selectedWarrantyRegisterIds: [],
                routeParams: {},
                warrantyRegisterDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_WARRANTYREGISTER: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_WARRANTYREGISTER: {
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
        case Actions.TOGGLE_IN_SELECTED_WARRANTYREGISTERS: {
            const warrantyRegisterId = action.warrantyRegisterId;

            let selectedWarrantyRegisterIds = [...state.selectedWarrantyRegisterIds];

            if (selectedWarrantyRegisterIds.find(id => id === warrantyRegisterId) !== undefined) {
                selectedWarrantyRegisterIds = selectedWarrantyRegisterIds.filter(id => id !== warrantyRegisterId);
            } else {
                selectedWarrantyRegisterIds = [...selectedWarrantyRegisterIds, warrantyRegisterId];
            }

            return {
                ...state,
                selectedWarrantyRegisterIds: selectedWarrantyRegisterIds
            };
        }
        case Actions.SELECT_ALL_WARRANTYREGISTERS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedWarrantyRegisterIds = arr.map(warrantyRegister => warrantyRegister.id);

            return {
                ...state,
                selectedWarrantyRegisterIds: selectedWarrantyRegisterIds
            };
        }
        case Actions.DESELECT_ALL_WARRANTYREGISTERS: {
            return {
                ...state,
                selectedWarrantyRegisterIds: []
            };
        }
        case Actions.OPEN_NEW_WARRANTYREGISTER_DIALOG: {
            return {
                ...state,
                warrantyRegisterDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_WARRANTYREGISTER_DIALOG: {
            return {
                ...state,
                warrantyRegisterDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_WARRANTYREGISTER_DIALOG: {
            return {
                ...state,
                warrantyRegisterDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WARRANTYREGISTER_DIALOG: {
            return {
                ...state,
                warrantyRegisterDialog: {
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

export default warrantyRegisterReducer;
