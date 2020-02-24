import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';

let initialState = {
    entities: {},
    searchText: '',
    isProcess: false,
    selectedUploadPictureIds: [],
    routeParams: {},
    uploadPictureDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const uploadPicturesReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: {},
                searchText: '',
                isProcess: false,
                selectedUploadPictureIds: [],
                routeParams: {},
                uploadPictureDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.ADD_UPLOADPICTURE: {
            return {
                ...state,
                entities: action.payload
            };
        }

        case Actions.SET_PROCESS: {
            return {
                ...state,
                isProcess: action.isProcess
            };
        }

        case Actions.OPEN_NEW_UPLOADPICTURE_DIALOG: {
            return {
                ...state,
                uploadPictureDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_UPLOADPICTURE_DIALOG: {
            return {
                ...state,
                uploadPictureDialog: {
                    type: 'new',
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

export default uploadPicturesReducer;
