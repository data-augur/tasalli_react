import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
  entities: [],
  companies: [],
  searchText: '',
  selectedBrandIds: [],
  routeParams: {},
  brandDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const brandReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        companies: [],
        searchText: '',
        selectedBrandIds: [],
        routeParams: {},
        brandDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_BRANDS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.ADD_BRAND: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_BRAND: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_BRAND: {
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
    case Actions.TOGGLE_IN_SELECTED_BRANDS: {
      const brandId = action.brandId;

      let selectedBrandIds = [...state.selectedBrandIds];

      if (selectedBrandIds.find(id => id === brandId) !== undefined) {
        selectedBrandIds = selectedBrandIds.filter(id => id !== brandId);
      } else {
        selectedBrandIds = [...selectedBrandIds, brandId];
      }

      return {
        ...state,
        selectedBrandIds: selectedBrandIds
      };
    }
    case Actions.SELECT_ALL_BRANDS: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedBrandIds = arr.map(brand => brand.id);

      return {
        ...state,
        selectedBrandIds: selectedBrandIds
      };
    }
    case Actions.DESELECT_ALL_BRANDS: {
      return {
        ...state,
        selectedBrandIds: []
      };
    }
    case Actions.OPEN_NEW_BRAND_DIALOG: {
      return {
        ...state,
        brandDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_BRAND_DIALOG: {
      return {
        ...state,
        brandDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_BRAND_DIALOG: {
      return {
        ...state,
        brandDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_BRAND_DIALOG: {
      return {
        ...state,
        brandDialog: {
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

export default brandReducer;
