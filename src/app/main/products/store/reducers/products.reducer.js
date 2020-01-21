import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
    entities: [],
    registrationForms: [],
    completionForms: [],
    claimForms: [],
    brands: [],
    companies: [],
    searchText: '',
    selectedProductIds: [],
    routeParams: {},
    productDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const productReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                registrationForms: [],
                completionForms: [],
                claimForms: [],
                brands: [],
                companies: [],
                searchText: '',
                selectedProductIds: [],
                routeParams: {},
                productDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_PRODUCTS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.ADD_PRODUCT: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_PRODUCT: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_PRODUCT: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.getProductsPaginationData: {
            return {
                ...state
            }
        }
        case Actions.GET_ALL_WARRANTY_REGISTRATION_FORM: {
            return {
                ...state,
                registrationForms: action.payload
            };
        }
        case Actions.GET_ALL_WARRANTY_COMPLETION_FORM: {
            return {
                ...state,
                completionForms: action.payload
            };
        }
        case Actions.GET_ALL_WARRANTY_CLAIM_FORM: {
            return {
                ...state,
                claimForms: action.payload
            };
        }
        case Actions.GET_ALL_BRANDS: {
            return {
                ...state,
                brands: action.payload
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
        case Actions.TOGGLE_IN_SELECTED_PRODUCTS: {
            const productId = action.productId;

            let selectedProductIds = [...state.selectedProductIds];

            if (selectedProductIds.find(id => id === productId) !== undefined) {
                selectedProductIds = selectedProductIds.filter(id => id !== productId);
            } else {
                selectedProductIds = [...selectedProductIds, productId];
            }

            return {
                ...state,
                selectedProductIds: selectedProductIds
            };
        }
        case Actions.SELECT_ALL_PRODUCTS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedProductIds = arr.map(product => product.id);

            return {
                ...state,
                selectedProductIds: selectedProductIds
            };
        }
        case Actions.DESELECT_ALL_PRODUCTS: {
            return {
                ...state,
                selectedProductIds: []
            };
        }
        case Actions.OPEN_NEW_PRODUCT_DIALOG: {
            return {
                ...state,
                productDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_PRODUCT_DIALOG: {
            return {
                ...state,
                productDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_PRODUCT_DIALOG: {
            return {
                ...state,
                productDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_PRODUCT_DIALOG: {
            return {
                ...state,
                productDialog: {
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

export default productReducer;
