import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
  entities: [],
  companies: [],
  searchText: '',
  selectedSurveyAttributeIds: [],
  routeParams: {},
  surveyAttributeDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const surveyAttributeReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        companies: [],
        searchText: '',
        selectedSurveyAttributeIds: [],
        routeParams: {},
        surveyAttributeDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_SURVEYATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.ADD_SURVEYATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_SURVEYATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_SURVEYATTRIBUTE: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.GET_SURVEYATTRIBUTEOPTIONS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.GET_ALL_SURVEYATTRIBUTE: {
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
    case Actions.TOGGLE_IN_SELECTED_SURVEYATTRIBUTES: {
      const surveyAttributeId = action.surveyAttributeId;

      let selectedSurveyAttributeIds = [...state.selectedSurveyAttributeIds];

      if (selectedSurveyAttributeIds.find(id => id === surveyAttributeId) !== undefined) {
        selectedSurveyAttributeIds = selectedSurveyAttributeIds.filter(id => id !== surveyAttributeId);
      } else {
        selectedSurveyAttributeIds = [...selectedSurveyAttributeIds, surveyAttributeId];
      }

      return {
        ...state,
        selectedSurveyAttributeIds: selectedSurveyAttributeIds
      };
    }
    case Actions.SELECT_ALL_SURVEYATTRIBUTES: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedSurveyAttributeIds = arr.map(surveyAttribute => surveyAttribute.id);

      return {
        ...state,
        selectedSurveyAttributeIds: selectedSurveyAttributeIds
      };
    }
    case Actions.DESELECT_ALL_SURVEYATTRIBUTES: {
      return {
        ...state,
        selectedSurveyAttributeIds: []
      };
    }
    case Actions.OPEN_NEW_SURVEYATTRIBUTE_DIALOG: {
      return {
        ...state,
        surveyAttributeDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_SURVEYATTRIBUTE_DIALOG: {
      return {
        ...state,
        surveyAttributeDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_SURVEYATTRIBUTE_DIALOG: {
      return {
        ...state,
        surveyAttributeDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_SURVEYATTRIBUTE_DIALOG: {
      return {
        ...state,
        surveyAttributeDialog: {
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

export default surveyAttributeReducer;
