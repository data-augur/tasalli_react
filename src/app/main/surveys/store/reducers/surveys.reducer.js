import * as Actions from '../actions';
import * as authActions from '../../../../auth/store/actions';
import _ from '@lodash';

const initialState = {
  entities: [],
  companies: [],
  searchText: '',
  selectedSurveyIds: [],
  routeParams: {},
  surveyDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const surveyReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGOUT: {
      return {
        ...state,
        entities: [],
        companies: [],
        searchText: '',
        selectedSurveyIds: [],
        routeParams: {},
        surveyDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_SURVEYS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.ADD_SURVEY: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.UPDATE_SURVEY: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.REMOVE_SURVEY: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id')
      };
    }
    case Actions.GET_ALL_SURVEYS: {
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
    case Actions.TOGGLE_IN_SELECTED_SURVEYS: {
      const surveyId = action.surveyId;

      let selectedSurveyIds = [...state.selectedSurveyIds];

      if (selectedSurveyIds.find(id => id === surveyId) !== undefined) {
        selectedSurveyIds = selectedSurveyIds.filter(id => id !== surveyId);
      } else {
        selectedSurveyIds = [...selectedSurveyIds, surveyId];
      }

      return {
        ...state,
        selectedSurveyIds: selectedSurveyIds
      };
    }
    case Actions.SELECT_ALL_SURVEYS: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedSurveyIds = arr.map(survey => survey.id);

      return {
        ...state,
        selectedSurveyIds: selectedSurveyIds
      };
    }
    case Actions.DESELECT_ALL_SURVEYS: {
      return {
        ...state,
        selectedSurveyIds: []
      };
    }
    case Actions.OPEN_NEW_SURVEY_DIALOG: {
      return {
        ...state,
        surveyDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_SURVEY_DIALOG: {
      return {
        ...state,
        surveyDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_SURVEY_DIALOG: {
      return {
        ...state,
        surveyDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_SURVEY_DIALOG: {
      return {
        ...state,
        surveyDialog: {
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

export default surveyReducer;
