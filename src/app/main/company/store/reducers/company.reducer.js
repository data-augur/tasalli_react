import * as Actions from '../actions';
import _ from '@lodash';
import * as authActions from '../../../../auth/store/actions';

const initialState = {
  entities: [],
  searchText: '',
  selectedCompanyIds: [],
  routeParams: {},
  companyDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const companiesReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        searchText: '',
        selectedCompanyIds: [],
        routeParams: {},
        companyDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_COMPANIES: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.ADD_COMPANY: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_COMPANY: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_COMPANY: {
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
    case Actions.TOGGLE_IN_SELECTED_COMPANYS: {
      const companyId = action.companyId;

      let selectedCompanyIds = [...state.selectedCompanyIds];

      if (selectedCompanyIds.find(id => id === companyId) !== undefined) {
        selectedCompanyIds = selectedCompanyIds.filter(id => id !== companyId);
      } else {
        selectedCompanyIds = [...selectedCompanyIds, companyId];
      }

      return {
        ...state,
        selectedCompanyIds: selectedCompanyIds
      };
    }
    case Actions.SELECT_ALL_COMPANYS: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedCompanyIds = arr.map(company => company.id);

      return {
        ...state,
        selectedCompanyIds: selectedCompanyIds
      };
    }
    case Actions.DESELECT_ALL_COMPANYS: {
      return {
        ...state,
        selectedCompanyIds: []
      };
    }
    case Actions.OPEN_NEW_COMPANY_DIALOG: {
      return {
        ...state,
        companyDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_COMPANY_DIALOG: {
      return {
        ...state,
        companyDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_COMPANY_DIALOG: {
      return {
        ...state,
        companyDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_COMPANY_DIALOG: {
      return {
        ...state,
        companyDialog: {
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

export default companiesReducer;
