import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    companies: [],
    searchText: '',
    selectedWarrantyRegistrationIds: [],
    routeParams: {},
    warrantyRegistrationDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const warrantyRegistrationReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                companies: [],
                searchText: '',
                selectedWarrantyRegistrationIds: [],
                routeParams: {},
                warrantyRegistrationDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_WARRANTYREGISTRATION: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.ADD_WARRANTYREGISTRATION: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_WARRANTYREGISTRATION: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_WARRANTYREGISTRATION: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.GET_ALL_COMPANIES: {
            return {
                ...state,
                companies: action.payload
            };
        }
        case Actions.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.getWarrantyRegistrationPaginationData: {
            return {
                ...state
            }
        }
        case Actions.TOGGLE_IN_SELECTED_WARRANTYREGISTRATIONS: {
            const warrantyRegistrationId = action.warrantyRegistrationId;

            let selectedWarrantyRegistrationIds = [...state.selectedWarrantyRegistrationIds];

            if (selectedWarrantyRegistrationIds.find(id => id === warrantyRegistrationId) !== undefined) {
                selectedWarrantyRegistrationIds = selectedWarrantyRegistrationIds.filter(id => id !== warrantyRegistrationId);
            } else {
                selectedWarrantyRegistrationIds = [...selectedWarrantyRegistrationIds, warrantyRegistrationId];
            }

            return {
                ...state,
                selectedWarrantyRegistrationIds: selectedWarrantyRegistrationIds
            };
        }
        case Actions.SELECT_ALL_WARRANTYREGISTRATIONS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedWarrantyRegistrationIds = arr.map(warrantyRegistration => warrantyRegistration.id);

            return {
                ...state,
                selectedWarrantyRegistrationIds: selectedWarrantyRegistrationIds
            };
        }
        case Actions.DESELECT_ALL_WARRANTYREGISTRATIONS: {
            return {
                ...state,
                selectedWarrantyRegistrationIds: []
            };
        }
        case Actions.OPEN_NEW_WARRANTYREGISTRATION_DIALOG: {
            return {
                ...state,
                warrantyRegistrationDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_WARRANTYREGISTRATION_DIALOG: {
            return {
                ...state,
                warrantyRegistrationDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_WARRANTYREGISTRATION_DIALOG: {
            return {
                ...state,
                warrantyRegistrationDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WARRANTYREGISTRATION_DIALOG: {
            return {
                ...state,
                warrantyRegistrationDialog: {
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

export default warrantyRegistrationReducer;
