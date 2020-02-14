import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    notifications: [],
    searchText: '',
    selectedAdIds: [],
    routeParams: {},
    adDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const bannerAdsReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                surveys: [],
                searchText: '',
                selectedAdIds: [],
                routeParams: {},
                adDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_BANNER_ADS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.ADD_BANNER_ADS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_BANNER_ADS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_BANNER_ADS: {
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
        case Actions.getBannerAdsPaginationData: {
            return {
                ...state
            }
        }
        case Actions.TOGGLE_IN_SELECTED_BANNER_ADS: {
            const adId = action.adId;

            let selectedAdIds = [...state.selectedAdIds];

            if (selectedAdIds.find(id => id === adId) !== undefined) {
                selectedAdIds = selectedAdIds.filter(id => id !== adId);
            } else {
                selectedAdIds = [...selectedAdIds, adId];
            }

            return {
                ...state,
                selectedAdIds: selectedAdIds
            };
        }
        case Actions.SELECT_ALL_BANNER_ADS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedAdIds = arr.map(ad => ad.id);

            return {
                ...state,
                selectedAdIds: selectedAdIds
            };
        }
        case Actions.DESELECT_ALL_BANNER_ADS: {
            return {
                ...state,
                selectedAdIds: []
            };
        }
        case Actions.OPEN_NEW_BANNER_AD_DIALOG: {
            return {
                ...state,
                adDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_BANNER_AD_DIALOG: {
            return {
                ...state,
                adDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_BANNER_AD_DIALOG: {
            return {
                ...state,
                adDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_BANNER_AD_DIALOG: {
            return {
                ...state,
                adDialog: {
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

export default bannerAdsReducer;
