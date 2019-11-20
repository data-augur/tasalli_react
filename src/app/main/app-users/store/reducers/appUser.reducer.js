import * as Actions from '../actions';
import _ from '@lodash';
import * as authActions from '../../../../auth/store/actions';

const initialState = {
  entities: [],
  searchText: '',
  selectedAppuserIds: [],
  routeParams: {},
  appuserDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const appUserReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        searchText: '',
        selectedAppuserIds: [],
        routeParams: {},
        appuserDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_ALL_APP_USERS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_APP_USER: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_APP_USER: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.TOGGLE_IN_SELECTED_APPUSERS: {
      const appuserId = action.appuserId;

      let selectedAppuserIds = [...state.selectedAppuserIds];

      if (selectedAppuserIds.find(id => id === appuserId) !== undefined) {
        selectedAppuserIds = selectedAppuserIds.filter(id => id !== appuserId);
      } else {
        selectedAppuserIds = [...selectedAppuserIds, appuserId];
      }

      return {
        ...state,
        selectedAppuserIds: selectedAppuserIds
      };
    }
    case Actions.SELECT_ALL_APPUSERS: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedAppuserIds = arr.map(appuser => appuser.id);

      return {
        ...state,
        selectedAppuserIds: selectedAppuserIds
      };
    }
    case Actions.DESELECT_ALL_APPUSERS: {
      return {
        ...state,
        selectedAppuserIds: []
      };
    }
    case Actions.OPEN_NEW_APPUSER_DIALOG: {
      return {
        ...state,
        appuserDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_APPUSER_DIALOG: {
      return {
        ...state,
        appuserDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_APPUSER_DIALOG: {
      return {
        ...state,
        appuserDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_APPUSER_DIALOG: {
      return {
        ...state,
        appuserDialog: {
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

export default appUserReducer;
