import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';

export const GET_WARRANTYCOMPLETION = '[WARRANTYCOMPLETION APP] GET WARRANTYCOMPLETION';
export const GET_ALL_COMPANIES = '[WARRANTYCOMPLETION APP] GET COMPANIES';
export const ADD_WARRANTYCOMPLETION = '[WARRANTYCOMPLETION APP] ADD WARRANTYCOMPLETION';
export const UPDATE_WARRANTYCOMPLETION = '[WARRANTYCOMPLETION APP] UPDATE WARRANTYCOMPLETION';
export const REMOVE_WARRANTYCOMPLETION = '[WARRANTYCOMPLETION APP] REMOVE WARRANTYCOMPLETION';

export const SET_SEARCH_TEXT = '[WARRANTYCOMPLETIONS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_WARRANTYCOMPLETIONS =
    '[WARRANTYCOMPLETIONS APP] TOGGLE IN SELECTED WARRANTYCOMPLETIONS';
export const SELECT_ALL_WARRANTYCOMPLETIONS = '[WARRANTYCOMPLETIONS APP] SELECT ALL WARRANTYCOMPLETIONS';
export const DESELECT_ALL_WARRANTYCOMPLETIONS = '[WARRANTYCOMPLETIONS APP] DESELECT ALL WARRANTYCOMPLETIONS';
export const OPEN_NEW_WARRANTYCOMPLETION_DIALOG = '[WARRANTYCOMPLETIONS APP] OPEN NEW WARRANTYCOMPLETION DIALOG';
export const CLOSE_NEW_WARRANTYCOMPLETION_DIALOG =
    '[WARRANTYCOMPLETIONS APP] CLOSE NEW WARRANTYCOMPLETION DIALOG';
export const OPEN_EDIT_WARRANTYCOMPLETION_DIALOG =
    '[WARRANTYCOMPLETIONS APP] OPEN EDIT WARRANTYCOMPLETION DIALOG';
export const CLOSE_EDIT_WARRANTYCOMPLETION_DIALOG =
    '[WARRANTYCOMPLETIONS APP] CLOSE EDIT WARRANTYCOMPLETION DIALOG';

export const REMOVE_WARRANTYCOMPLETIONS = '[WARRANTYCOMPLETIONS APP] REMOVE WARRANTYCOMPLETIONS';
export const TOGGLE_STARRED_WARRANTYCOMPLETION = '[WARRANTYCOMPLETIONS APP] TOGGLE STARRED WARRANTYCOMPLETION';
export const TOGGLE_STARRED_WARRANTYCOMPLETIONS = '[WARRANTYCOMPLETIONS APP] TOGGLE STARRED WARRANTYCOMPLETIONS';
export const SET_WARRANTYCOMPLETIONS_STARRED = '[WARRANTYCOMPLETIONS APP] SET WARRANTYCOMPLETIONS STARRED ';

// export function getWarrantyCompletions(routeParams) {
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
export const getAllCompanies = () => dispatch => {
    let query;
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-companies-by-id/' + id;
    } else {
        query = 'get-all-companies';
    }
    axios
    // .get(Base_URL+'get-all-companies')
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_COMPANIES,
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
export const getWarrantyCompletion = () => dispatch => {
    let query;
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-warranty-completion-forms-with-attributes-by-id/' + id;
    } else {
        query = 'get-all-warranty-completion-forms-with-attributes';
    }
    axios
    // .get(Base_URL+'get-all-brands')
        .get(Base_URL + query)   //Admin brands  /${email}
        .then(res => {

            for (let j = 0; j < res.data.length; j++) {
                let attrs = [];
                for (let i = 0; i < res.data[j].attributes.length; i++) {
                    attrs.push(res.data[j].attributes[i].text);
                }
                res.data[j].attributes = attrs;
            }

            dispatch({
                type: GET_WARRANTYCOMPLETION,
                payload: res.data
            });
        })
        .then(() => dispatch(getAllCompanies()))
        .catch(err => {
            console.log('err', err);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const addWarrantyCompletion = newWarrantyCompletion => dispatch => {
    axios
    // .post(Base_URL+'create-brand', newWarrantyCompletion)
        .post(Base_URL + 'create-warranty-completion-form', newWarrantyCompletion)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Completion Form Created', variant: "success"}));
            }
            dispatch({
                type: ADD_WARRANTYCOMPLETION
            });
        })
        .then(() => dispatch(getWarrantyCompletion()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const updateWarrantyCompletion = (updateInfo, id) => dispatch => {

    axios
        .put(
            Base_URL + `update-warranty-completion-form/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Completion Form Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_WARRANTYCOMPLETION
            });
        })
        .then(() => dispatch(getWarrantyCompletion()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeWarrantyCompletion = id => dispatch => {
    axios
        .delete(Base_URL + `delete-warranty-completion-form/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Completion Form Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_WARRANTYCOMPLETION
            });
        })
        .then(() => dispatch(getWarrantyCompletion()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};

// export function updateWarrantyCompletion(warrantyCompletion) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyCompletionsApp.warrantyCompletions;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       warrantyCompletion
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYCOMPLETION
//         })
//       ]).then(() => dispatch(getWarrantyCompletions(routeParams)))
//     );
//   };
// }
// export function addWarrantyCompletion(newWarrantyCompletion) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyCompletionsApp.warrantyCompletions;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newWarrantyCompletion
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_WARRANTYCOMPLETION
//         })
//       ]).then(() => dispatch(getWarrantyCompletions(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedWarrantyCompletions(warrantyCompletionId) {
    return {
        type: TOGGLE_IN_SELECTED_WARRANTYCOMPLETIONS,
        warrantyCompletionId
    };
}

export function selectAllWarrantyCompletions() {
    return {
        type: SELECT_ALL_WARRANTYCOMPLETIONS
    };
}

export function deSelectAllWarrantyCompletions() {
    return {
        type: DESELECT_ALL_WARRANTYCOMPLETIONS
    };
}

export function openNewWarrantyCompletionDialog() {
    return {
        type: OPEN_NEW_WARRANTYCOMPLETION_DIALOG
    };
}

export function closeNewWarrantyCompletionDialog() {
    return {
        type: CLOSE_NEW_WARRANTYCOMPLETION_DIALOG
    };
}

export function openEditWarrantyCompletionDialog(data) {
    return {
        type: OPEN_EDIT_WARRANTYCOMPLETION_DIALOG,
        data
    };
}

export function closeEditWarrantyCompletionDialog() {
    return {
        type: CLOSE_EDIT_WARRANTYCOMPLETION_DIALOG
    };
}

// export function updateWarrantyCompletion(warrantyCompletion) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyCompletionsApp.warrantyCompletions;

//     const request = axios.post('/api/warrantyCompletions-app/update-warrantyCompletion', {
//       warrantyCompletion
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYCOMPLETION
//         })
//       ]).then(() => dispatch(getWarrantyCompletions(routeParams)))
//     );
//   };
// }

// export function removeWarrantyCompletion(warrantyCompletionId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyCompletionsApp.warrantyCompletions;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       warrantyCompletionId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_WARRANTYCOMPLETION
//         })
//       ]).then(() => dispatch(getWarrantyCompletions(routeParams)))
//     );
//   };
// }

export function removeWarrantyCompletions(warrantyCompletionIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyCompletionsApp.warrantyCompletions;

        const request = axios.post('/api/warrantyCompletions-app/remove-warrantyCompletions', {
            warrantyCompletionIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_WARRANTYCOMPLETIONS
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCOMPLETIONS
                })
            ]).then(() => dispatch(getWarrantyCompletion(routeParams)))
        );
    };
}

export function toggleStarredWarrantyCompletion(warrantyCompletionId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyCompletionsApp.warrantyCompletions;

        const request = axios.post('/api/warrantyCompletions-app/toggle-starred-warrantyCompletion', {
            warrantyCompletionId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYCOMPLETION
                }),
            ]).then(() => dispatch(getWarrantyCompletion(routeParams)))
        );
    };
}

export function toggleStarredWarrantyCompletions(warrantyCompletionIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyCompletionsApp.warrantyCompletions;

        const request = axios.post('/api/warrantyCompletions-app/toggle-starred-warrantyCompletions', {
            warrantyCompletionIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYCOMPLETIONS
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCOMPLETIONS
                }),
            ]).then(() => dispatch(getWarrantyCompletion(routeParams)))
        );
    };
}

export function setWarrantyCompletionsStarred(warrantyCompletionIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyCompletionsApp.warrantyCompletions;

        const request = axios.post('/api/warrantyCompletions-app/set-warrantyCompletions-starred', {
            warrantyCompletionIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYCOMPLETIONS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCOMPLETIONS
                }),
            ]).then(() => dispatch(getWarrantyCompletion(routeParams)))
        );
    };
}

export function setWarrantyCompletionsUnstarred(warrantyCompletionIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyCompletionsApp.warrantyCompletions;

        const request = axios.post('/api/warrantyCompletions-app/set-warrantyCompletions-unstarred', {
            warrantyCompletionIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYCOMPLETIONS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCOMPLETIONS
                }),
            ]).then(() => dispatch(getWarrantyCompletion(routeParams)))
        );
    };
}
