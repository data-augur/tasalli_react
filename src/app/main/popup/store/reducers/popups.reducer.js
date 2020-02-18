import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    notifications: [],
    searchText: '',
    selectedPopupIds: [],
    routeParams: {},
    popupDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const popUpsReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                surveys: [],
                searchText: '',
                selectedPopupIds: [],
                routeParams: {},
                popupDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_POPUPS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.ADD_POPUPS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_POPUPS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_POPUPS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.GET_ALL_NOTIFICATIONS: {
            return {
                ...state,
                notifications: action.payload
            };
        }
        case Actions.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.getPOPUPSPaginationData: {
            return {
                ...state
            }
        }
        case Actions.TOGGLE_IN_SELECTED_POPUPS: {
            const popupId = action.popupId;

            let selectedPopupIds = [...state.selectedPopupIds];

            if (selectedPopupIds.find(id => id === popupId) !== undefined) {
                selectedPopupIds = selectedPopupIds.filter(id => id !== popupId);
            } else {
                selectedPopupIds = [...selectedPopupIds, popupId];
            }

            return {
                ...state,
                selectedPopupIds: selectedPopupIds
            };
        }
        case Actions.SELECT_ALL_POPUPS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedPopupIds = arr.map(popup => popup.id);

            return {
                ...state,
                selectedPopupIds: selectedPopupIds
            };
        }
        case Actions.DESELECT_ALL_POPUPS: {
            return {
                ...state,
                selectedPopupIds: []
            };
        }
        case Actions.OPEN_NEW_POPUP_DIALOG: {
            return {
                ...state,
                popupDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_POPUP_DIALOG: {
            return {
                ...state,
                popupDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_POPUP_DIALOG: {
            return {
                ...state,
                popupDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_POPUP_DIALOG: {
            return {
                ...state,
                popupDialog: {
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

export default popUpsReducer;
