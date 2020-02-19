import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    phoneNumbers: [],
    selectedCompanyId: '',
    searchText: '',
    selectedQrcodeIds: [],
    routeParams: {},
    qrcodeDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const qrcodeReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                phoneNumbers: [],
                selectedCompanyId : '',
                searchText: '',
                selectedQrcodeIds: [],
                routeParams: {},
                qrcodeDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_QRCODES: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.GET_ALL_QR_CODES_PHONE_NUMBERS: {
            return {
                ...state,
                phoneNumbers: action.payload
            };
        }
        case Actions.ADD_QRCODE: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_QRCODE: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_QRCODE: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.getQrcodesPaginationData: {
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
        case Actions.TOGGLE_IN_SELECTED_QRCODES: {
            const qrcodeId = action.qrcodeId;

            let selectedQrcodeIds = [...state.selectedQrcodeIds];

            if (selectedQrcodeIds.find(id => id === qrcodeId) !== undefined) {
                selectedQrcodeIds = selectedQrcodeIds.filter(id => id !== qrcodeId);
            } else {
                selectedQrcodeIds = [...selectedQrcodeIds, qrcodeId];
            }

            return {
                ...state,
                selectedQrcodeIds: selectedQrcodeIds
            };
        }
        case Actions.SELECT_ALL_QRCODES: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedQrcodeIds = arr.map(qrcode => qrcode.id);

            return {
                ...state,
                selectedQrcodeIds: selectedQrcodeIds
            };
        }
        case Actions.DESELECT_ALL_QRCODES: {
            return {
                ...state,
                selectedQrcodeIds: []
            };
        }
        case Actions.OPEN_NEW_QRCODE_DIALOG: {
            return {
                ...state,
                qrcodeDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_QRCODE_DIALOG: {
            return {
                ...state,
                qrcodeDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_QRCODE_DIALOG: {
            return {
                ...state,
                qrcodeDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_QRCODE_DIALOG: {
            return {
                ...state,
                qrcodeDialog: {
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

export default qrcodeReducer;
