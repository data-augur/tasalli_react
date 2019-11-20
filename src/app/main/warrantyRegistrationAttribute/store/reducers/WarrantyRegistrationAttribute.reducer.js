import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
  entities: [],
  companies: [],
  searchText: '',
  selectedWarrantyRegistrationAttributeIds: [],
  routeParams: {},
  warrantyRegistrationAttributeDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const warrantyRegistrationAttributeReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        companies: [],
        searchText: '',
        selectedWarrantyRegistrationAttributeIds: [],
        routeParams: {},
        warrantyRegistrationAttributeDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_WARRANTYREGISTRATIONATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.ADD_WARRANTYREGISTRATIONATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_WARRANTYREGISTRATIONATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_WARRANTYREGISTRATIONATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.GET_WARRANTYREGISTRATIONATTRIBUTEOPTIONS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.GET_ALL_WARRANTYREGISTRATIONATTRIBUTE: {
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
    case Actions.TOGGLE_IN_SELECTED_WARRANTYREGISTRATIONATTRIBUTES: {
      const warrantyRegistrationAttributeId = action.warrantyRegistrationAttributeId;

      let selectedWarrantyRegistrationAttributeIds = [...state.selectedWarrantyRegistrationAttributeIds];

      if (selectedWarrantyRegistrationAttributeIds.find(id => id === warrantyRegistrationAttributeId) !== undefined) {
        selectedWarrantyRegistrationAttributeIds = selectedWarrantyRegistrationAttributeIds.filter(id => id !== warrantyRegistrationAttributeId);
      } else {
        selectedWarrantyRegistrationAttributeIds = [...selectedWarrantyRegistrationAttributeIds, warrantyRegistrationAttributeId];
      }

      return {
        ...state,
        selectedWarrantyRegistrationAttributeIds: selectedWarrantyRegistrationAttributeIds
      };
    }
    case Actions.SELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedWarrantyRegistrationAttributeIds = arr.map(warrantyRegistrationAttribute => warrantyRegistrationAttribute.id);

      return {
        ...state,
        selectedWarrantyRegistrationAttributeIds: selectedWarrantyRegistrationAttributeIds
      };
    }
    case Actions.DESELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES: {
      return {
        ...state,
        selectedWarrantyRegistrationAttributeIds: []
      };
    }
    case Actions.OPEN_NEW_WARRANTYREGISTRATIONATTRIBUTE_DIALOG: {
      return {
        ...state,
        warrantyRegistrationAttributeDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_WARRANTYREGISTRATIONATTRIBUTE_DIALOG: {
      return {
        ...state,
        warrantyRegistrationAttributeDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_WARRANTYREGISTRATIONATTRIBUTE_DIALOG: {
      return {
        ...state,
        warrantyRegistrationAttributeDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_WARRANTYREGISTRATIONATTRIBUTE_DIALOG: {
      return {
        ...state,
        warrantyRegistrationAttributeDialog: {
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

export default warrantyRegistrationAttributeReducer;
