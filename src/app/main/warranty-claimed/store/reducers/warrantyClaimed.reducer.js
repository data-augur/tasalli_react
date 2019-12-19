import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    companies: [],
    searchText: '',
    selectedWarrantyClaimedIds: [],
    routeParams: {},
    warrantyClaimedDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const warrantyClaimedReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                companies: [],
                searchText: '',
                selectedWarrantyClaimedIds: [],
                routeParams: {},
                warrantyClaimedDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_WARRANTYCLAIMED: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_WARRANTYCLAIMED: {
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
        case Actions.TOGGLE_IN_SELECTED_WARRANTYCLAIMEDS: {
            const warrantyClaimedId = action.warrantyClaimedId;

            let selectedWarrantyClaimedIds = [...state.selectedWarrantyClaimedIds];

            if (selectedWarrantyClaimedIds.find(id => id === warrantyClaimedId) !== undefined) {
                selectedWarrantyClaimedIds = selectedWarrantyClaimedIds.filter(id => id !== warrantyClaimedId);
            } else {
                selectedWarrantyClaimedIds = [...selectedWarrantyClaimedIds, warrantyClaimedId];
            }

            return {
                ...state,
                selectedWarrantyClaimedIds: selectedWarrantyClaimedIds
            };
        }
        case Actions.SELECT_ALL_WARRANTYCLAIMEDS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedWarrantyClaimedIds = arr.map(warrantyClaimed => warrantyClaimed.id);

            return {
                ...state,
                selectedWarrantyClaimedIds: selectedWarrantyClaimedIds
            };
        }
        case Actions.DESELECT_ALL_WARRANTYCLAIMEDS: {
            return {
                ...state,
                selectedWarrantyClaimedIds: []
            };
        }
        case Actions.OPEN_NEW_WARRANTYCLAIMED_DIALOG: {
            return {
                ...state,
                warrantyClaimedDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_WARRANTYCLAIMED_DIALOG: {
            return {
                ...state,
                warrantyClaimedDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_WARRANTYCLAIMED_DIALOG: {
            return {
                ...state,
                warrantyClaimedDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_WARRANTYCLAIMED_DIALOG: {
            return {
                ...state,
                warrantyClaimedDialog: {
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

export default warrantyClaimedReducer;
