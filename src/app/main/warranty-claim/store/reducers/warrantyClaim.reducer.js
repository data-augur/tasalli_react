import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    companies: [],
    searchText: '',
    selectedWarrantyClaimIds: [],
    routeParams: {},
    warrantyClaimDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const warrantyClaimReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                companies: [],
                searchText: '',
                selectedWarrantyClaimIds: [],
                routeParams: {},
                warrantyClaimDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_WARRANTYCLAIM: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.ADD_WARRANTYCLAIM: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_WARRANTYCLAIM: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_WARRANTYCLAIM: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.getWarrantyClaimPaginationData: {
            return {
                ...state
            }
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
        case Actions.TOGGLE_IN_SELECTED_WARRANTYCLAIMS: {
            const warrantyClaimId = action.warrantyClaimId;

            let selectedWarrantyClaimIds = [...state.selectedWarrantyClaimIds];

            if (selectedWarrantyClaimIds.find(id => id === warrantyClaimId) !== undefined) {
                selectedWarrantyClaimIds = selectedWarrantyClaimIds.filter(id => id !== warrantyClaimId);
            } else {
                selectedWarrantyClaimIds = [...selectedWarrantyClaimIds, warrantyClaimId];
            }

            return {
                ...state,
                selectedWarrantyClaimIds: selectedWarrantyClaimIds
            };
        }
        case Actions.SELECT_ALL_WARRANTYCLAIMS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedWarrantyClaimIds = arr.map(warrantyClaim => warrantyClaim.id);

            return {
                ...state,
                selectedWarrantyClaimIds: selectedWarrantyClaimIds
            };
        }
        case Actions.DESELECT_ALL_WARRANTYCLAIMS: {
            return {
                ...state,
                selectedWarrantyClaimIds: []
            };
        }
        case Actions.OPEN_NEW_WARRANTYCLAIM_DIALOG: {
            return {
                ...state,
                warrantyClaimDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_WARRANTYCLAIM_DIALOG: {
            return {
                ...state,
                warrantyClaimDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_WARRANTYCLAIM_DIALOG: {
            return {
                ...state,
                warrantyClaimDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WARRANTYCLAIM_DIALOG: {
            return {
                ...state,
                warrantyClaimDialog: {
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

export default warrantyClaimReducer;
