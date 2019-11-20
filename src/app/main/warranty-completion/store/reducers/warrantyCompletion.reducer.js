import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
  entities: [],
  companies: [],
  searchText: '',
  selectedWarrantyCompletionIds: [],
  routeParams: {},
  warrantyCompletionDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const warrantyCompletionReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        companies: [],
        searchText: '',
        selectedWarrantyCompletionIds: [],
        routeParams: {},
        warrantyCompletionDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_WARRANTYCOMPLETION: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.ADD_WARRANTYCOMPLETION: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_WARRANTYCOMPLETION: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_WARRANTYCOMPLETION: {
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
    case Actions.TOGGLE_IN_SELECTED_WARRANTYCOMPLETIONS: {
      const warrantyCompletionId = action.warrantyCompletionId;

      let selectedWarrantyCompletionIds = [...state.selectedWarrantyCompletionIds];

      if (selectedWarrantyCompletionIds.find(id => id === warrantyCompletionId) !== undefined) {
        selectedWarrantyCompletionIds = selectedWarrantyCompletionIds.filter(id => id !== warrantyCompletionId);
      } else {
        selectedWarrantyCompletionIds = [...selectedWarrantyCompletionIds, warrantyCompletionId];
      }

      return {
        ...state,
        selectedWarrantyCompletionIds: selectedWarrantyCompletionIds
      };
    }
    case Actions.SELECT_ALL_WARRANTYCOMPLETIONS: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedWarrantyCompletionIds = arr.map(warrantyCompletion => warrantyCompletion.id);

      return {
        ...state,
        selectedWarrantyCompletionIds: selectedWarrantyCompletionIds
      };
    }
    case Actions.DESELECT_ALL_WARRANTYCOMPLETIONS: {
      return {
        ...state,
        selectedWarrantyCompletionIds: []
      };
    }
    case Actions.OPEN_NEW_WARRANTYCOMPLETION_DIALOG: {
      return {
        ...state,
        warrantyCompletionDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_WARRANTYCOMPLETION_DIALOG: {
      return {
        ...state,
        warrantyCompletionDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_WARRANTYCOMPLETION_DIALOG: {
      return {
        ...state,
        warrantyCompletionDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_WARRANTYCOMPLETION_DIALOG: {
      return {
        ...state,
        warrantyCompletionDialog: {
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

export default warrantyCompletionReducer;
