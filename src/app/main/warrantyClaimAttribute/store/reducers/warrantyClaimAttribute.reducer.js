import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
  entities: [],
  companies: [],
  searchText: '',
  selectedWarrantyClaimAttributeIds: [],
  routeParams: {},
  warrantyClaimAttributeDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const warrantyClaimAttributeReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        companies: [],
        searchText: '',
        selectedWarrantyClaimAttributeIds: [],
        routeParams: {},
        warrantyClaimAttributeDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_WARRANTYCLAIMATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.ADD_WARRANTYCLAIMATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_WARRANTYCLAIMATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_WARRANTYCLAIMATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.GET_WARRANTYCLAIMATTRIBUTEOPTIONS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.GET_ALL_WARRANTYCLAIMATTRIBUTE: {
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
    case Actions.TOGGLE_IN_SELECTED_WARRANTYCLAIMATTRIBUTES: {
      const warrantyClaimAttributeId = action.warrantyClaimAttributeId;

      let selectedWarrantyClaimAttributeIds = [...state.selectedWarrantyClaimAttributeIds];

      if (selectedWarrantyClaimAttributeIds.find(id => id === warrantyClaimAttributeId) !== undefined) {
        selectedWarrantyClaimAttributeIds = selectedWarrantyClaimAttributeIds.filter(id => id !== warrantyClaimAttributeId);
      } else {
        selectedWarrantyClaimAttributeIds = [...selectedWarrantyClaimAttributeIds, warrantyClaimAttributeId];
      }

      return {
        ...state,
        selectedWarrantyClaimAttributeIds: selectedWarrantyClaimAttributeIds
      };
    }
    case Actions.SELECT_ALL_WARRANTYCLAIMATTRIBUTES: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedWarrantyClaimAttributeIds = arr.map(warrantyClaimAttribute => warrantyClaimAttribute.id);

      return {
        ...state,
        selectedWarrantyClaimAttributeIds: selectedWarrantyClaimAttributeIds
      };
    }
    case Actions.DESELECT_ALL_WARRANTYCLAIMATTRIBUTES: {
      return {
        ...state,
        selectedWarrantyClaimAttributeIds: []
      };
    }
    case Actions.OPEN_NEW_WARRANTYCLAIMATTRIBUTE_DIALOG: {
      return {
        ...state,
        warrantyClaimAttributeDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_WARRANTYCLAIMATTRIBUTE_DIALOG: {
      return {
        ...state,
        warrantyClaimAttributeDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_WARRANTYCLAIMATTRIBUTE_DIALOG: {
      return {
        ...state,
        warrantyClaimAttributeDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_WARRANTYCLAIMATTRIBUTE_DIALOG: {
      return {
        ...state,
        warrantyClaimAttributeDialog: {
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

export default warrantyClaimAttributeReducer;
