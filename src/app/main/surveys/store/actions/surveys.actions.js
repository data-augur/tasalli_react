import axios from 'axios';
import { Base_URL } from '../../../../server'
// import {GET_ALL_SURVEYS} from "../../../surveys/store/actions";
 import {showMessage} from 'app/store/actions/fuse';

export const GET_SURVEYS = '[SURVEYS APP] GET SURVEYS';
export const GET_ALL_SURVEYS = '[SURVEYS APP] GET SURVEYS';
export const ADD_SURVEY = '[SURVEYS APP] ADD SURVEY';
export const UPDATE_SURVEY = '[SURVEYS APP] UPDATE SURVEY';
export const REMOVE_SURVEY = '[SURVEYS APP] REMOVE SURVEY';

export const SET_SEARCH_TEXT = '[SURVEYS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_SURVEYS =
  '[SURVEYS APP] TOGGLE IN SELECTED SURVEYS';
export const SELECT_ALL_SURVEYS = '[SURVEYS APP] SELECT ALL SURVEYS';
export const DESELECT_ALL_SURVEYS = '[SURVEYS APP] DESELECT ALL SURVEYS';
export const OPEN_NEW_SURVEY_DIALOG = '[SURVEYS APP] OPEN NEW SURVEY DIALOG';
export const CLOSE_NEW_SURVEY_DIALOG =
  '[SURVEYS APP] CLOSE NEW SURVEY DIALOG';
export const OPEN_EDIT_SURVEY_DIALOG =
  '[SURVEYS APP] OPEN EDIT SURVEY DIALOG';
export const CLOSE_EDIT_SURVEY_DIALOG =
  '[SURVEYS APP] CLOSE EDIT SURVEY DIALOG';

export const REMOVE_SURVEYS = '[SURVEYS APP] REMOVE SURVEYS';
export const TOGGLE_STARRED_SURVEY = '[SURVEYS APP] TOGGLE STARRED SURVEY';
export const TOGGLE_STARRED_SURVEYS = '[SURVEYS APP] TOGGLE STARRED SURVEYS';
export const SET_SURVEYS_STARRED = '[SURVEYS APP] SET SURVEYS STARRED ';

// export function getSurveys(routeParams) {
//   const token = localStorage.getItem('jwtToken');

//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Authorization: token
//   };

//   const request = axios({
//     method: 'get',
//     url: Base_URL+'get-all-brand-users',
//     headers
//   });
export const getAllSurveys = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-surveys')
    .get(Base_URL+'get-all-surveys')
    .then(res => {

      dispatch({
        type: GET_ALL_SURVEYS,
        payload: res.data
      });
    })
    .catch(err => {

      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const getSurveys = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-brands')
    .get(Base_URL+'get-all-surveys')   //Admin brands  /${email}
    .then(res => {

      dispatch({
        type: GET_SURVEYS,
        payload: res.data
      });
    })
    // .then(() => dispatch(getAllCompanies()))
    .catch(err => {
      console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const addSurvey = newSurvey => dispatch => {

  axios
    // .post(Base_URL+'create-brand', newSurvey)
    .post(Base_URL+'create-survey', newSurvey)
    .then(res => {
        // dispatch(showMessage({message: 'Survey Saved'}));
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Survey Created',variant: "success"}));
        }
      dispatch({
        type: ADD_SURVEY
      });
    })
    .then(() => dispatch(getAllSurveys()))
    .catch(err => {
        dispatch(showMessage({message: err,variant: "error"}));
        console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const updateSurvey = (updateInfo, id) => dispatch => {

  axios
    .put(
        Base_URL+`update-survey/${updateInfo.id}`,
      updateInfo
    )
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Survey Updated',variant: "success"}));
        }

      dispatch({
        type: UPDATE_SURVEY
      });
    })
    .then(() => dispatch(getSurveys()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: 'Error! Survey Not Updated'+err,variant: "error"}));
        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const removeSurvey = id => dispatch => {
  axios
    .delete(Base_URL+`delete-survey/${id}`)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Survey Deleted', variant: "success"}));
        }
        else
        {
            dispatch(showMessage({message: 'Error! Survey Not Deleted'}));
        }
      dispatch({
        type: REMOVE_SURVEY
      });
    })
    .then(() => dispatch(getSurveys()))
    .catch(err => {
        dispatch(showMessage({message: 'Error! Survey Not Updated'+err,variant: "error"}));

        console.log('err', err.response);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};

// export function updateSurvey(survey) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().surveysApp.surveys;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       survey
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_SURVEY
//         })
//       ]).then(() => dispatch(getSurveys(routeParams)))
//     );
//   };
// }
// export function addSurvey(newSurvey) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().surveysApp.surveys;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newSurvey
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_SURVEY
//         })
//       ]).then(() => dispatch(getSurveys(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function toggleInSelectedSurveys(surveyId) {
  return {
    type: TOGGLE_IN_SELECTED_SURVEYS,
    surveyId
  };
}

export function selectAllSurveys() {
  return {
    type: SELECT_ALL_SURVEYS
  };
}

export function deSelectAllSurveys() {
  return {
    type: DESELECT_ALL_SURVEYS
  };
}

export function openNewSurveyDialog() {
  return {
    type: OPEN_NEW_SURVEY_DIALOG
  };
}

export function closeNewSurveyDialog() {
  return {
    type: CLOSE_NEW_SURVEY_DIALOG
  };
}

export function openEditSurveyDialog(data) {
  return {
    type: OPEN_EDIT_SURVEY_DIALOG,
    data
  };
}

export function closeEditSurveyDialog() {
  return {
    type: CLOSE_EDIT_SURVEY_DIALOG
  };
}

// export function updateSurvey(survey) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().surveysApp.surveys;

//     const request = axios.post('/api/surveys-app/update-survey', {
//       survey
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_SURVEY
//         })
//       ]).then(() => dispatch(getSurveys(routeParams)))
//     );
//   };
// }

// export function removeSurvey(surveyId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().surveysApp.surveys;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       surveyId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_SURVEY
//         })
//       ]).then(() => dispatch(getSurveys(routeParams)))
//     );
//   };
// }

export function removeSurveys(surveyIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().surveysApp.surveys;

    const request = axios.post('/api/surveys-app/remove-surveys', {
      surveyIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_SURVEYS
        }),
        dispatch({
          type: DESELECT_ALL_SURVEYS
        })
      ]).then(() => dispatch(getSurveys(routeParams)))
    );
  };
}

export function toggleStarredSurvey(surveyId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().surveysApp.surveys;

    const request = axios.post('/api/surveys-app/toggle-starred-survey', {
      surveyId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_SURVEY
        }),
      ]).then(() => dispatch(getSurveys(routeParams)))
    );
  };
}

export function toggleStarredSurveys(surveyIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().surveysApp.surveys;

    const request = axios.post('/api/surveys-app/toggle-starred-surveys', {
      surveyIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_SURVEYS
        }),
        dispatch({
          type: DESELECT_ALL_SURVEYS
        }),
      ]).then(() => dispatch(getSurveys(routeParams)))
    );
  };
}

export function setSurveysStarred(surveyIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().surveysApp.surveys;

    const request = axios.post('/api/surveys-app/set-surveys-starred', {
      surveyIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_SURVEYS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_SURVEYS
        }),
      ]).then(() => dispatch(getSurveys(routeParams)))
    );
  };
}

export function setSurveysUnstarred(surveyIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().surveysApp.surveys;

    const request = axios.post('/api/surveys-app/set-surveys-unstarred', {
      surveyIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_SURVEYS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_SURVEYS
        }),
      ]).then(() => dispatch(getSurveys(routeParams)))
    );
  };
}
