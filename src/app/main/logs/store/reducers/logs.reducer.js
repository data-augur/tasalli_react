import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    skuCodes: [],
    phoneNumbers: [],
    searchText: '',
    selectedLogIds: [],
    routeParams: {},
    logDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const logsReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                skuCodes: [],
                phoneNumbers: [],
                searchText: '',
                selectedLogIds: [],
                routeParams: {},
                logDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_LOGS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.getLogsPaginationData: {
            return {
                ...state
            }
        }
        case Actions.GET_ALL_LOGS_SKU_CODES: {
            return {
                ...state,
                skuCodes: action.payload
            };
        }
        case Actions.GET_ALL_LOGS_PHONE_NUMBERS: {
            return {
                ...state,
                phoneNumbers: action.payload
            };
        }
        // case Actions.ADD_BRAND: {
        //   return {
        //     ...state,
        //     entities: _.keyBy(action.payload, 'id')
        //   };
        // }
        // case Actions.UPDATE_BRAND: {
        //   return {
        //     ...state,
        //     entities: _.keyBy(action.payload, 'id')
        //   };
        // }
        // case Actions.REMOVE_BRAND: {
        //   return {
        //     ...state,
        //     entities: _.keyBy(action.payload, 'id')
        //   };
        // }
        // case Actions.GET_ALL_COMPANIES: {
        //   return {
        //     ...state,
        //     companies: action.payload
        //   };
        // }
        case Actions.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_IN_SELECTED_LOGS: {
            const logId = action.logId;

            let selectedLogIds = [...state.selectedLogIds];

            if (selectedLogIds.find(id => id === logId) !== undefined) {
                selectedLogIds = selectedLogIds.filter(id => id !== logId);
            } else {
                selectedLogIds = [...selectedLogIds, logId];
            }

            return {
                ...state,
                selectedLogIds: selectedLogIds
            };
        }
        case Actions.SELECT_ALL_LOGS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedLogIds = arr.map(log => log.id);

            return {
                ...state,
                selectedLogIds: selectedLogIds
            };
        }
        case Actions.DESELECT_ALL_LOGS: {
            return {
                ...state,
                selectedLogIds: []
            };
        }
        case Actions.OPEN_NEW_LOG_DIALOG: {
            return {
                ...state,
                logDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_LOG_DIALOG: {
            return {
                ...state,
                logDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_LOG_DIALOG: {
            return {
                ...state,
                logDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_LOG_DIALOG: {
            return {
                ...state,
                logDialog: {
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

export default logsReducer;
