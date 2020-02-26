import axios from 'axios';
import {Base_URL} from '../../../../server'
// import {ADD_SURVEYATTRIBUTE} from "../../../surveyAttributes/store/actions";
// import {GET_ALL_SURVEYS} from "../../../surveys/store/actions";
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
export const GET_SURVEYATTRIBUTE = '[SURVEYATTRIBUTE APP] GET SURVEYATTRIBUTE';
export const GET_ALL_SURVEYATTRIBUTE = '[SURVEYATTRIBUTE APP] GET SURVEYATTRIBUTE';
export const ADD_SURVEYATTRIBUTE = '[SURVEYATTRIBUTE APP] ADD SURVEYATTRIBUTE';
export const UPDATE_SURVEYATTRIBUTE = '[SURVEYATTRIBUTE APP] UPDATE SURVEYATTRIBUTE';
export const REMOVE_SURVEYATTRIBUTE = '[SURVEYATTRIBUTE APP] REMOVE SURVEYATTRIBUTE';
export const GET_SURVEYATTRIBUTEOPTIONS = '[SURVEYATTRIBUTE APP] GET SURVEYATTRIBUTEOPTIONS';

export const SET_SEARCH_TEXT = '[SURVEYATTRIBUTES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_SURVEYATTRIBUTES = '[SURVEYATTRIBUTES APP] TOGGLE IN SELECTED SURVEYATTRIBUTES';
export const SELECT_ALL_SURVEYATTRIBUTES = '[SURVEYATTRIBUTES APP] SELECT ALL SURVEYATTRIBUTES';
export const DESELECT_ALL_SURVEYATTRIBUTES = '[SURVEYATTRIBUTES APP] DESELECT ALL SURVEYATTRIBUTES';
export const OPEN_NEW_SURVEYATTRIBUTE_DIALOG = '[SURVEYATTRIBUTES APP] OPEN NEW SURVEYATTRIBUTE DIALOG';
export const CLOSE_NEW_SURVEYATTRIBUTE_DIALOG = '[SURVEYATTRIBUTES APP] CLOSE NEW SURVEYATTRIBUTE DIALOG';
export const OPEN_EDIT_SURVEYATTRIBUTE_DIALOG = '[SURVEYATTRIBUTES APP] OPEN EDIT SURVEYATTRIBUTE DIALOG';
export const CLOSE_EDIT_SURVEYATTRIBUTE_DIALOG = '[SURVEYATTRIBUTES APP] CLOSE EDIT SURVEYATTRIBUTE DIALOG';

export const REMOVE_SURVEYATTRIBUTES = '[SURVEYATTRIBUTES APP] REMOVE SURVEYATTRIBUTES';
export const TOGGLE_STARRED_SURVEYATTRIBUTE = '[SURVEYATTRIBUTES APP] TOGGLE STARRED SURVEYATTRIBUTE';
export const TOGGLE_STARRED_SURVEYATTRIBUTES = '[SURVEYATTRIBUTES APP] TOGGLE STARRED SURVEYATTRIBUTES';
export const SET_SURVEYATTRIBUTES_STARRED = '[SURVEYATTRIBUTES APP] SET SURVEYATTRIBUTES STARRED ';


export const getSurveyAttribute = () => dispatch => {
    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    axios
        .get(Base_URL + `get-a-survey-attributes-with-options/${id}`)
        .then(res => {

            localStorage.setItem('SurveyName', res.data[0].survey_Name[0].name);
            dispatch({
                type: GET_SURVEYATTRIBUTE,
                payload: res.data
            });
        })
        // .then(() => dispatch(getAllCompanies()))
        .catch(err => {
            console.log('err', err);
            if (err.request.status === 401) {
                dispatch(showMessage({message: 'Your session expired. Please login again.', variant: "error"}));
                store.dispatch(logoutUser());
            }
        });
};
export const addSurveyAttribute = newSurveyAttribute => dispatch => {
    axios
    // .post(Base_URL+'create-brand', newSurveyAttribute)
        .post(Base_URL + 'create-survey-attribute', newSurveyAttribute)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Survey Attribute Saved Successfully', variant: "success"}));
            }
            dispatch({
                type: ADD_SURVEYATTRIBUTE
            });
        })
        .then(() => dispatch(getSurveyAttribute()))
        .catch(err => {
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            console.log('err', err);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const updateSurveyAttribute = (updateInfo) => dispatch => {
    axios
        .put(
            Base_URL + `update-survey-attribute/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Survey Attribute Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_SURVEYATTRIBUTE
            });
        })
        .then(() => dispatch(getSurveyAttribute()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeSurveyAttribute = id => dispatch => {
    axios
        .delete(Base_URL + `delete-survey-attribute/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Survey Attribute Deleted', variant: "success"}));
            }
            dispatch({
                type: REMOVE_SURVEYATTRIBUTE
            });
        })
        .then(() => dispatch(getSurveyAttribute()))
        .catch(err => {
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            console.log('err', err.response);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};

export const getSurveyAttributeOptions = id => dispatch => {
    axios
        .get(Base_URL + `get-a-survey-attribute-options/${id}`)
        .then(() => {
            dispatch({
                type: GET_SURVEYATTRIBUTEOPTIONS
            });
        })
        // .then(() => dispatch(getSurveyAttribute()))
        .catch(err => {
            console.log('err', err.response);
        });
};

// export function updateSurveyAttribute(surveyAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().surveyAttributesApp.surveyAttributes;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       surveyAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_SURVEYATTRIBUTE
//         })
//       ]).then(() => dispatch(getSurveyAttributes(routeParams)))
//     );
//   };
// }
// export function addSurveyAttribute(newSurveyAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().surveyAttributesApp.surveyAttributes;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newSurveyAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_SURVEYATTRIBUTE
//         })
//       ]).then(() => dispatch(getSurveyAttributes(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedSurveyAttributes(surveyAttributeId) {
    return {
        type: TOGGLE_IN_SELECTED_SURVEYATTRIBUTES,
        surveyAttributeId
    };
}

export function selectAllSurveyAttributes() {
    return {
        type: SELECT_ALL_SURVEYATTRIBUTES
    };
}

export function deSelectAllSurveyAttributes() {
    return {
        type: DESELECT_ALL_SURVEYATTRIBUTES
    };
}

export function openNewSurveyAttributeDialog() {
    return {
        type: OPEN_NEW_SURVEYATTRIBUTE_DIALOG
    };
}

export function closeNewSurveyAttributeDialog() {
    return {
        type: CLOSE_NEW_SURVEYATTRIBUTE_DIALOG
    };
}

export function openEditSurveyAttributeDialog(data) {
    return {
        type: OPEN_EDIT_SURVEYATTRIBUTE_DIALOG,
        data
    };
}

export function closeEditSurveyAttributeDialog() {
    return {
        type: CLOSE_EDIT_SURVEYATTRIBUTE_DIALOG
    };
}

// export function updateSurveyAttribute(surveyAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().surveyAttributesApp.surveyAttributes;

//     const request = axios.post('/api/surveyAttributes-app/update-surveyAttribute', {
//       surveyAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_SURVEYATTRIBUTE
//         })
//       ]).then(() => dispatch(getSurveyAttributes(routeParams)))
//     );
//   };
// }

// export function removeSurveyAttribute(surveyAttributeId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().surveyAttributesApp.surveyAttributes;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       surveyAttributeId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_SURVEYATTRIBUTE
//         })
//       ]).then(() => dispatch(getSurveyAttributes(routeParams)))
//     );
//   };
// }

export function removeSurveyAttributes(surveyAttributeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().surveyAttributesApp.surveyAttributes;

        const request = axios.post('/api/surveyAttributes-app/remove-surveyAttributes', {
            surveyAttributeIds
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: REMOVE_SURVEYATTRIBUTES
                }),
                dispatch({
                    type: DESELECT_ALL_SURVEYATTRIBUTES
                })
            ]).then(() => dispatch(getSurveyAttribute(routeParams)))
        );
    };
}

export function toggleStarredSurveyAttribute(surveyAttributeId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().surveyAttributesApp.surveyAttributes;

        const request = axios.post('/api/surveyAttributes-app/toggle-starred-surveyAttribute', {
            surveyAttributeId
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_SURVEYATTRIBUTE
                }),
            ]).then(() => dispatch(getSurveyAttribute(routeParams)))
        );
    };
}

export function toggleStarredSurveyAttributes(surveyAttributeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().surveyAttributesApp.surveyAttributes;

        const request = axios.post('/api/surveyAttributes-app/toggle-starred-surveyAttributes', {
            surveyAttributeIds
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_SURVEYATTRIBUTES
                }),
                dispatch({
                    type: DESELECT_ALL_SURVEYATTRIBUTES
                }),
            ]).then(() => dispatch(getSurveyAttribute(routeParams)))
        );
    };
}

export function setSurveyAttributesStarred(surveyAttributeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().surveyAttributesApp.surveyAttributes;

        const request = axios.post('/api/surveyAttributes-app/set-surveyAttributes-starred', {
            surveyAttributeIds
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: SET_SURVEYATTRIBUTES_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_SURVEYATTRIBUTES
                }),
            ]).then(() => dispatch(getSurveyAttribute(routeParams)))
        );
    };
}

export function setSurveyAttributesUnstarred(surveyAttributeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().surveyAttributesApp.surveyAttributes;

        const request = axios.post('/api/surveyAttributes-app/set-surveyAttributes-unstarred', {
            surveyAttributeIds
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: SET_SURVEYATTRIBUTES_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_SURVEYATTRIBUTES
                }),
            ]).then(() => dispatch(getSurveyAttribute(routeParams)))
        );
    };
}


