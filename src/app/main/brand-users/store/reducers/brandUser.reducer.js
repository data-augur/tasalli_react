import * as Actions from '../actions';
import _ from '@lodash';
import * as authActions from '../../../../auth/store/actions';

const initialState = {
  entities: [],
  brands: [],
  companies: [],
  searchText: '',
  selectedBrandUserIds: [],
  routeParams: {},
  brandUserDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const brandUserReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        brands: [],
        searchText: '',
        selectedBrandUserIds: [],
        routeParams: {},
        brandUserDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_BRAND_USERS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.ADD_BRAND_USER: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_BRAND_USER: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_BRAND_USER: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
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
    case Actions.TOGGLE_IN_SELECTED_BRANDUSERS: {
      const brandUserId = action.brandUserId;

      let selectedBrandUserIds = [...state.selectedBrandUserIds];

      if (selectedBrandUserIds.find(id => id === brandUserId) !== undefined) {
        selectedBrandUserIds = selectedBrandUserIds.filter(id => id !== brandUserId);
      } else {
        selectedBrandUserIds = [...selectedBrandUserIds, brandUserId];
      }

      return {
        ...state,
        selectedBrandUserIds: selectedBrandUserIds
      };
    }
    case Actions.SELECT_ALL_BRANDUSERS: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedBrandUserIds = arr.map(brandUser => brandUser.id);

      return {
        ...state,
        selectedBrandUserIds: selectedBrandUserIds
      };
    }
    case Actions.DESELECT_ALL_BRANDUSERS: {
      return {
        ...state,
        selectedBrandUserIds: []
      };
    }
    case Actions.OPEN_NEW_BRANDUSER_DIALOG: {
      return {
        ...state,
        brandUserDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_BRANDUSER_DIALOG: {
      return {
        ...state,
        brandUserDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_BRANDUSER_DIALOG: {
      return {
        ...state,
        brandUserDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_BRANDUSER_DIALOG: {
      return {
        ...state,
        brandUserDialog: {
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

export default brandUserReducer;
