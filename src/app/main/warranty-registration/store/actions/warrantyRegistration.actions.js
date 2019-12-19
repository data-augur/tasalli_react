import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';

export const GET_WARRANTYREGISTRATION = '[WARRANTYREGISTRATION APP] GET WARRANTYREGISTRATION';
export const GET_ALL_COMPANIES = '[WARRANTYREGISTRATION APP] GET COMPANIES';
export const ADD_WARRANTYREGISTRATION = '[WARRANTYREGISTRATION APP] ADD WARRANTYREGISTRATION';
export const UPDATE_WARRANTYREGISTRATION = '[WARRANTYREGISTRATION APP] UPDATE WARRANTYREGISTRATION';
export const REMOVE_WARRANTYREGISTRATION = '[WARRANTYREGISTRATION APP] REMOVE WARRANTYREGISTRATION';

export const SET_SEARCH_TEXT = '[WARRANTYREGISTRATIONS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_WARRANTYREGISTRATIONS =
    '[WARRANTYREGISTRATIONS APP] TOGGLE IN SELECTED WARRANTYREGISTRATIONS';
export const SELECT_ALL_WARRANTYREGISTRATIONS = '[WARRANTYREGISTRATIONS APP] SELECT ALL WARRANTYREGISTRATIONS';
export const DESELECT_ALL_WARRANTYREGISTRATIONS = '[WARRANTYREGISTRATIONS APP] DESELECT ALL WARRANTYREGISTRATIONS';
export const OPEN_NEW_WARRANTYREGISTRATION_DIALOG = '[WARRANTYREGISTRATIONS APP] OPEN NEW WARRANTYREGISTRATION DIALOG';
export const CLOSE_NEW_WARRANTYREGISTRATION_DIALOG =
    '[WARRANTYREGISTRATIONS APP] CLOSE NEW WARRANTYREGISTRATION DIALOG';
export const OPEN_EDIT_WARRANTYREGISTRATION_DIALOG =
    '[WARRANTYREGISTRATIONS APP] OPEN EDIT WARRANTYREGISTRATION DIALOG';
export const CLOSE_EDIT_WARRANTYREGISTRATION_DIALOG =
    '[WARRANTYREGISTRATIONS APP] CLOSE EDIT WARRANTYREGISTRATION DIALOG';

export const REMOVE_WARRANTYREGISTRATIONS = '[WARRANTYREGISTRATIONS APP] REMOVE WARRANTYREGISTRATIONS';
export const TOGGLE_STARRED_WARRANTYREGISTRATION = '[WARRANTYREGISTRATIONS APP] TOGGLE STARRED WARRANTYREGISTRATION';
export const TOGGLE_STARRED_WARRANTYREGISTRATIONS = '[WARRANTYREGISTRATIONS APP] TOGGLE STARRED WARRANTYREGISTRATIONS';
export const SET_WARRANTYREGISTRATIONS_STARRED = '[WARRANTYREGISTRATIONS APP] SET WARRANTYREGISTRATIONS STARRED ';

// export function getWarrantyRegistrations(routeParams) {
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
export const getWarrantyRegistration = () => dispatch => {
    let query;
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-warranty-registration-forms-by-id/' + id;
    } else {
        query = 'get-all-warranty-registration-forms';
    }
    axios
    // .get(Base_URL+'get-all-brands')
        .get(Base_URL + query)   //Admin brands  /${email}
        .then(res => {

            dispatch({
                type: GET_WARRANTYREGISTRATION,
                payload: res.data
            });
        })
        .then(() => dispatch(getAllCompanies()))
        .catch(err => {
            console.log('err', err);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const addWarrantyRegistration = newWarrantyRegistration => dispatch => {

    axios
    // .post(Base_URL+'create-brand', newWarrantyRegistration)
        .post(Base_URL + 'create-warranty-registration-form', newWarrantyRegistration)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Registration Form Created', variant: "success"}));
            }
            dispatch({
                type: ADD_WARRANTYREGISTRATION
            });
        })
        .then(() => dispatch(getWarrantyRegistration()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const updateWarrantyRegistration = (updateInfo, id) => dispatch => {

    axios
        .put(
            Base_URL + `update-warranty-registration-form/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Registration Form Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_WARRANTYREGISTRATION
            });
        })
        .then(() => dispatch(getWarrantyRegistration()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeWarrantyRegistration = id => dispatch => {

    axios
        .delete(Base_URL + `delete-warranty-registration-form/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Registration Form Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_WARRANTYREGISTRATION
            });
        })
        .then(() => dispatch(getWarrantyRegistration()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};

// export function updateWarrantyRegistration(warrantyRegistration) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistrationsApp.warrantyRegistrations;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       warrantyRegistration
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYREGISTRATION
//         })
//       ]).then(() => dispatch(getWarrantyRegistrations(routeParams)))
//     );
//   };
// }
// export function addWarrantyRegistration(newWarrantyRegistration) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistrationsApp.warrantyRegistrations;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newWarrantyRegistration
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_WARRANTYREGISTRATION
//         })
//       ]).then(() => dispatch(getWarrantyRegistrations(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedWarrantyRegistrations(warrantyRegistrationId) {
    return {
        type: TOGGLE_IN_SELECTED_WARRANTYREGISTRATIONS,
        warrantyRegistrationId
    };
}

export function selectAllWarrantyRegistrations() {
    return {
        type: SELECT_ALL_WARRANTYREGISTRATIONS
    };
}

export function deSelectAllWarrantyRegistrations() {
    return {
        type: DESELECT_ALL_WARRANTYREGISTRATIONS
    };
}

export function openNewWarrantyRegistrationDialog() {
    return {
        type: OPEN_NEW_WARRANTYREGISTRATION_DIALOG
    };
}

export function closeNewWarrantyRegistrationDialog() {
    return {
        type: CLOSE_NEW_WARRANTYREGISTRATION_DIALOG
    };
}

export function openEditWarrantyRegistrationDialog(data) {
    return {
        type: OPEN_EDIT_WARRANTYREGISTRATION_DIALOG,
        data
    };
}

export function closeEditWarrantyRegistrationDialog() {
    return {
        type: CLOSE_EDIT_WARRANTYREGISTRATION_DIALOG
    };
}

// export function updateWarrantyRegistration(warrantyRegistration) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistrationsApp.warrantyRegistrations;

//     const request = axios.post('/api/warrantyRegistrations-app/update-warrantyRegistration', {
//       warrantyRegistration
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYREGISTRATION
//         })
//       ]).then(() => dispatch(getWarrantyRegistrations(routeParams)))
//     );
//   };
// }

// export function removeWarrantyRegistration(warrantyRegistrationId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistrationsApp.warrantyRegistrations;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       warrantyRegistrationId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_WARRANTYREGISTRATION
//         })
//       ]).then(() => dispatch(getWarrantyRegistrations(routeParams)))
//     );
//   };
// }

export function removeWarrantyRegistrations(warrantyRegistrationIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistrationsApp.warrantyRegistrations;

        const request = axios.post('/api/warrantyRegistrations-app/remove-warrantyRegistrations', {
            warrantyRegistrationIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_WARRANTYREGISTRATIONS
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYREGISTRATIONS
                })
            ]).then(() => dispatch(getWarrantyRegistration(routeParams)))
        );
    };
}

export function toggleStarredWarrantyRegistration(warrantyRegistrationId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistrationsApp.warrantyRegistrations;

        const request = axios.post('/api/warrantyRegistrations-app/toggle-starred-warrantyRegistration', {
            warrantyRegistrationId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYREGISTRATION
                }),
            ]).then(() => dispatch(getWarrantyRegistration(routeParams)))
        );
    };
}

export function toggleStarredWarrantyRegistrations(warrantyRegistrationIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistrationsApp.warrantyRegistrations;

        const request = axios.post('/api/warrantyRegistrations-app/toggle-starred-warrantyRegistrations', {
            warrantyRegistrationIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYREGISTRATIONS
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYREGISTRATIONS
                }),
            ]).then(() => dispatch(getWarrantyRegistration(routeParams)))
        );
    };
}

export function setWarrantyRegistrationsStarred(warrantyRegistrationIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistrationsApp.warrantyRegistrations;

        const request = axios.post('/api/warrantyRegistrations-app/set-warrantyRegistrations-starred', {
            warrantyRegistrationIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYREGISTRATIONS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYREGISTRATIONS
                }),
            ]).then(() => dispatch(getWarrantyRegistration(routeParams)))
        );
    };
}

export function setWarrantyRegistrationsUnstarred(warrantyRegistrationIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistrationsApp.warrantyRegistrations;

        const request = axios.post('/api/warrantyRegistrations-app/set-warrantyRegistrations-unstarred', {
            warrantyRegistrationIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYREGISTRATIONS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYREGISTRATIONS
                }),
            ]).then(() => dispatch(getWarrantyRegistration(routeParams)))
        );
    };
}
