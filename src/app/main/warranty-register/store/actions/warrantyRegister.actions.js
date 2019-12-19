import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
// import moment from "moment";

export const GET_WARRANTYREGISTER = '[WARRANTYREGISTER APP] GET WARRANTYREGISTER';
export const REMOVE_WARRANTYREGISTER = '[WARRANTYREGISTER APP] REMOVE WARRANTYREGISTER';

export const SET_SEARCH_TEXT = '[WARRANTYREGISTERS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_WARRANTYREGISTERS = '[WARRANTYREGISTERS APP] TOGGLE IN SELECTED WARRANTYREGISTERS';
export const SELECT_ALL_WARRANTYREGISTERS = '[WARRANTYREGISTERS APP] SELECT ALL WARRANTYREGISTERS';
export const DESELECT_ALL_WARRANTYREGISTERS = '[WARRANTYREGISTERS APP] DESELECT ALL WARRANTYREGISTERS';
export const OPEN_NEW_WARRANTYREGISTER_DIALOG = '[WARRANTYREGISTERS APP] OPEN NEW WARRANTYREGISTER DIALOG';
export const CLOSE_NEW_WARRANTYREGISTER_DIALOG = '[WARRANTYREGISTERS APP] CLOSE NEW WARRANTYREGISTER DIALOG';
export const OPEN_EDIT_WARRANTYREGISTER_DIALOG = '[WARRANTYREGISTERS APP] OPEN EDIT WARRANTYREGISTER DIALOG';
export const CLOSE_EDIT_WARRANTYREGISTER_DIALOG = '[WARRANTYREGISTERS APP] CLOSE EDIT WARRANTYREGISTER DIALOG';

export const REMOVE_WARRANTYREGISTERS = '[WARRANTYREGISTERS APP] REMOVE WARRANTYREGISTERS';
export const TOGGLE_STARRED_WARRANTYREGISTER = '[WARRANTYREGISTERS APP] TOGGLE STARRED WARRANTYREGISTER';
export const TOGGLE_STARRED_WARRANTYREGISTERS = '[WARRANTYREGISTERS APP] TOGGLE STARRED WARRANTYREGISTERS';
export const SET_WARRANTYREGISTERS_STARRED = '[WARRANTYREGISTERS APP] SET WARRANTYREGISTERS STARRED ';

// export function getWarrantyRegisters(routeParams) {
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

export const getWarrantyRegister = () => dispatch => {
    let query;
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-warranty-registrations-by-id/' + id;
    } else {
        query = 'get-all-warranty-registrations';
    }
    axios
        .get(Base_URL + query)
        .then(res => {
            dispatch({
                type: GET_WARRANTYREGISTER,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('err', err);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeWarrantyRegister = id => dispatch => {

    axios
        .delete(Base_URL + `delete-warranty-registration/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Registration Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_WARRANTYREGISTER
            });
        })
        .then(() => dispatch(getWarrantyRegister()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};

// export function updateWarrantyRegister(warrantyRegister) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistersApp.warrantyRegisters;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       warrantyRegister
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYREGISTER
//         })
//       ]).then(() => dispatch(getWarrantyRegisters(routeParams)))
//     );
//   };
// }
// export function addWarrantyRegister(newWarrantyRegister) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistersApp.warrantyRegisters;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newWarrantyRegister
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_WARRANTYREGISTER
//         })
//       ]).then(() => dispatch(getWarrantyRegisters(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedWarrantyRegisters(warrantyRegisterId) {
    return {
        type: TOGGLE_IN_SELECTED_WARRANTYREGISTERS,
        warrantyRegisterId
    };
}

export function selectAllWarrantyRegisters() {
    return {
        type: SELECT_ALL_WARRANTYREGISTERS
    };
}

export function deSelectAllWarrantyRegisters() {
    return {
        type: DESELECT_ALL_WARRANTYREGISTERS
    };
}

export function openNewWarrantyRegisterDialog() {
    return {
        type: OPEN_NEW_WARRANTYREGISTER_DIALOG
    };
}

export function closeNewWarrantyRegisterDialog() {
    return {
        type: CLOSE_NEW_WARRANTYREGISTER_DIALOG
    };
}

export function openEditWarrantyRegisterDialog(data) {
    return {
        type: OPEN_EDIT_WARRANTYREGISTER_DIALOG,
        data
    };
}

export function closeEditWarrantyRegisterDialog() {
    return {
        type: CLOSE_EDIT_WARRANTYREGISTER_DIALOG
    };
}

// export function updateWarrantyRegister(warrantyRegister) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistersApp.warrantyRegisters;

//     const request = axios.post('/api/warrantyRegisters-app/update-warrantyRegister', {
//       warrantyRegister
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYREGISTER
//         })
//       ]).then(() => dispatch(getWarrantyRegisters(routeParams)))
//     );
//   };
// }

// export function removeWarrantyRegister(warrantyRegisterId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistersApp.warrantyRegisters;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       warrantyRegisterId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_WARRANTYREGISTER
//         })
//       ]).then(() => dispatch(getWarrantyRegisters(routeParams)))
//     );
//   };
// }

export function removeWarrantyRegisters(warrantyRegisterIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistersApp.warrantyRegisters;

        const request = axios.post('/api/warrantyRegisters-app/remove-warrantyRegisters', {
            warrantyRegisterIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_WARRANTYREGISTERS
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYREGISTERS
                })
            ]).then(() => dispatch(getWarrantyRegister(routeParams)))
        );
    };
}

export function toggleStarredWarrantyRegister(warrantyRegisterId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistersApp.warrantyRegisters;

        const request = axios.post('/api/warrantyRegisters-app/toggle-starred-warrantyRegister', {
            warrantyRegisterId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYREGISTER
                }),
            ]).then(() => dispatch(getWarrantyRegister(routeParams)))
        );
    };
}

export function toggleStarredWarrantyRegisters(warrantyRegisterIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistersApp.warrantyRegisters;

        const request = axios.post('/api/warrantyRegisters-app/toggle-starred-warrantyRegisters', {
            warrantyRegisterIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYREGISTERS
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYREGISTERS
                }),
            ]).then(() => dispatch(getWarrantyRegister(routeParams)))
        );
    };
}

export function setWarrantyRegistersStarred(warrantyRegisterIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistersApp.warrantyRegisters;

        const request = axios.post('/api/warrantyRegisters-app/set-warrantyRegisters-starred', {
            warrantyRegisterIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYREGISTERS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYREGISTERS
                }),
            ]).then(() => dispatch(getWarrantyRegister(routeParams)))
        );
    };
}

export function setWarrantyRegistersUnstarred(warrantyRegisterIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyRegistersApp.warrantyRegisters;

        const request = axios.post('/api/warrantyRegisters-app/set-warrantyRegisters-unstarred', {
            warrantyRegisterIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYREGISTERS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYREGISTERS
                }),
            ]).then(() => dispatch(getWarrantyRegister(routeParams)))
        );
    };
}
