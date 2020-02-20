import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    retailerPhoneNumbers: [],
    userPhoneNumbers: [],
    selectedCompanyId: '',
    searchText: '',
    selectedRetailerIds: [],
    routeParams: {},
    retailerDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const retailerReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                retailerPhoneNumbers: [],
                userPhoneNumbers: [],
                selectedCompanyId : '',
                searchText: '',
                selectedRetailerIds: [],
                routeParams: {},
                retailerDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_RETAILERS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.ADD_RETAILER: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_RETAILER: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_RETAILER: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.GET_ALL_RETAILER_PHONE_NUMBERS: {
            return {
                ...state,
                retailerPhoneNumbers: action.payload
            };
        }
        case Actions.GET_ALL_USER_PHONE_NUMBERS: {
            return {
                ...state,
                userPhoneNumbers: action.payload
            };
        }
        case Actions.getRetailersPaginationData: {
            return {
                ...state
            }
        }
        case Actions.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_IN_SELECTED_RETAILERS: {
            const retailerId = action.retailerId;

            let selectedRetailerIds = [...state.selectedRetailerIds];

            if (selectedRetailerIds.find(id => id === retailerId) !== undefined) {
                selectedRetailerIds = selectedRetailerIds.filter(id => id !== retailerId);
            } else {
                selectedRetailerIds = [...selectedRetailerIds, retailerId];
            }

            return {
                ...state,
                selectedRetailerIds: selectedRetailerIds
            };
        }
        case Actions.SELECT_ALL_RETAILERS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedRetailerIds = arr.map(retailer => retailer.id);

            return {
                ...state,
                selectedRetailerIds: selectedRetailerIds
            };
        }
        case Actions.DESELECT_ALL_RETAILERS: {
            return {
                ...state,
                selectedRetailerIds: []
            };
        }
        case Actions.OPEN_NEW_RETAILER_DIALOG: {
            return {
                ...state,
                retailerDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_RETAILER_DIALOG: {
            return {
                ...state,
                retailerDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_RETAILER_DIALOG: {
            return {
                ...state,
                retailerDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_RETAILER_DIALOG: {
            return {
                ...state,
                retailerDialog: {
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

export default retailerReducer;
