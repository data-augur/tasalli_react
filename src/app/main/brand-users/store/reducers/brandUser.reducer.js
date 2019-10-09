import * as Actions from '../actions';
import _ from '@lodash';
import * as authActions from '../../../../auth/store/actions';

const initialState = {
  entities: [],
  brands: [],
  companies: [],
  searchText: '',
  selectedContactIds: [],
  routeParams: {},
  contactDialog: {
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
        selectedContactIds: [],
        routeParams: {},
        contactDialog: {
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
    case Actions.TOGGLE_IN_SELECTED_CONTACTS: {
      const contactId = action.contactId;

      let selectedContactIds = [...state.selectedContactIds];

      if (selectedContactIds.find(id => id === contactId) !== undefined) {
        selectedContactIds = selectedContactIds.filter(id => id !== contactId);
      } else {
        selectedContactIds = [...selectedContactIds, contactId];
      }

      return {
        ...state,
        selectedContactIds: selectedContactIds
      };
    }
    case Actions.SELECT_ALL_CONTACTS: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedContactIds = arr.map(contact => contact.id);

      return {
        ...state,
        selectedContactIds: selectedContactIds
      };
    }
    case Actions.DESELECT_ALL_CONTACTS: {
      return {
        ...state,
        selectedContactIds: []
      };
    }
    case Actions.OPEN_NEW_CONTACT_DIALOG: {
      return {
        ...state,
        contactDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_CONTACT_DIALOG: {
      return {
        ...state,
        contactDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_CONTACT_DIALOG: {
      return {
        ...state,
        contactDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_CONTACT_DIALOG: {
      return {
        ...state,
        contactDialog: {
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
