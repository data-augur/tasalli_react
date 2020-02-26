import axios from 'axios';
import {Base_URL} from '../../../../server'
// import {ADD_SURVEYATTRIBUTE} from "../../../surveyAttributes/store/actions";
// import {GET_ALL_SURVEYS} from "../../../surveys/store/actions";
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
export const GET_WARRANTYCLAIMATTRIBUTE = '[WARRANTYCLAIMATTRIBUTE APP] GET WARRANTYCLAIMATTRIBUTE';
export const GET_ALL_WARRANTYCLAIMATTRIBUTE = '[WARRANTYCLAIMATTRIBUTE APP] GET WARRANTYCLAIMATTRIBUTE';
export const ADD_WARRANTYCLAIMATTRIBUTE = '[WARRANTYCLAIMATTRIBUTE APP] ADD WARRANTYCLAIMATTRIBUTE';
export const UPDATE_WARRANTYCLAIMATTRIBUTE = '[WARRANTYCLAIMATTRIBUTE APP] UPDATE WARRANTYCLAIMATTRIBUTE';
export const REMOVE_WARRANTYCLAIMATTRIBUTE = '[WARRANTYCLAIMATTRIBUTE APP] REMOVE WARRANTYCLAIMATTRIBUTE';
export const GET_WARRANTYCLAIMATTRIBUTEOPTIONS = '[WARRANTYCLAIMATTRIBUTE APP] GET WARRANTYCLAIMATTRIBUTEOPTIONS';

export const SET_SEARCH_TEXT = '[WARRANTYCLAIMATTRIBUTES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_WARRANTYCLAIMATTRIBUTES =
    '[WARRANTYCLAIMATTRIBUTES APP] TOGGLE IN SELECTED WARRANTYCLAIMATTRIBUTES';
export const SELECT_ALL_WARRANTYCLAIMATTRIBUTES = '[WARRANTYCLAIMATTRIBUTES APP] SELECT ALL WARRANTYCLAIMATTRIBUTES';
export const DESELECT_ALL_WARRANTYCLAIMATTRIBUTES = '[WARRANTYCLAIMATTRIBUTES APP] DESELECT ALL WARRANTYCLAIMATTRIBUTES';
export const OPEN_NEW_WARRANTYCLAIMATTRIBUTE_DIALOG = '[WARRANTYCLAIMATTRIBUTES APP] OPEN NEW WARRANTYCLAIMATTRIBUTE DIALOG';
export const CLOSE_NEW_WARRANTYCLAIMATTRIBUTE_DIALOG =
    '[WARRANTYCLAIMATTRIBUTES APP] CLOSE NEW WARRANTYCLAIMATTRIBUTE DIALOG';
export const OPEN_EDIT_WARRANTYCLAIMATTRIBUTE_DIALOG =
    '[WARRANTYCLAIMATTRIBUTES APP] OPEN EDIT WARRANTYCLAIMATTRIBUTE DIALOG';
export const CLOSE_EDIT_WARRANTYCLAIMATTRIBUTE_DIALOG =
    '[WARRANTYCLAIMATTRIBUTES APP] CLOSE EDIT WARRANTYCLAIMATTRIBUTE DIALOG';

export const REMOVE_WARRANTYCLAIMATTRIBUTES = '[WARRANTYCLAIMATTRIBUTES APP] REMOVE WARRANTYCLAIMATTRIBUTES';
export const TOGGLE_STARRED_WARRANTYCLAIMATTRIBUTE = '[WARRANTYCLAIMATTRIBUTES APP] TOGGLE STARRED WARRANTYCLAIMATTRIBUTE';
export const TOGGLE_STARRED_WARRANTYCLAIMATTRIBUTES = '[WARRANTYCLAIMATTRIBUTES APP] TOGGLE STARRED WARRANTYCLAIMATTRIBUTES';
export const SET_WARRANTYCLAIMATTRIBUTES_STARRED = '[WARRANTYCLAIMATTRIBUTES APP] SET WARRANTYCLAIMATTRIBUTES STARRED ';

// export function getWarrantyClaimAttributes(routeParams) {
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
// export const getAllWarrantyClaimAttribute = () => dispatch => {
//   axios
//     // .get(Base_URL+'get-all-surveys')
//     .get(Base_URL+'get-a-warranty-claim-form-attributes-with-options/${id}')
//     .then(res => {
//
//       dispatch({
//         type: GET_ALL_WARRANTYCLAIMATTRIBUTE,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//
//       //   dispatch({
//       //     type: LOGIN_ERROR,
//       //     payload: err.response.data
//       //   });
//     });
// };
export const getWarrantyClaimAttribute = () => dispatch => {
    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    axios
        .get(Base_URL + `get-a-warranty-claim-form-attributes-with-options/${id}`)
        .then(res => {

            localStorage.setItem('WarrantyClaimFormName', res.data[0].warrantyClaimForm_Name[0].formName);
            dispatch({
                type: GET_WARRANTYCLAIMATTRIBUTE,
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
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const addWarrantyClaimAttribute = newWarrantyClaimAttribute => dispatch => {

    axios
    // .post(Base_URL+'create-brand', newWarrantyClaimAttribute)
        .post(Base_URL + 'create-warranty-claim-form-attribute', newWarrantyClaimAttribute)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({
                    message: 'Warranty Claim Form Attribute Saved Successfully',
                    variant: "success"
                }));
            }
            dispatch({
                type: ADD_WARRANTYCLAIMATTRIBUTE
            });
        })
        .then(() => dispatch(getWarrantyClaimAttribute()))
        .catch(err => {
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            console.log('err', err);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const updateWarrantyClaimAttribute = (updateInfo) => dispatch => {

    axios
        .put(
            Base_URL + `update-warranty-claim-form-attribute/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Claim Form Attribute Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_WARRANTYCLAIMATTRIBUTE
            });
        })
        .then(() => dispatch(getWarrantyClaimAttribute()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeWarrantyClaimAttribute = id => dispatch => {
    axios
        .delete(Base_URL + `delete-warranty-claim-form-attribute/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Claim Form Attribute Deleted', variant: "success"}));
            }
            dispatch({
                type: REMOVE_WARRANTYCLAIMATTRIBUTE
            });
        })
        .then(() => dispatch(getWarrantyClaimAttribute()))
        .catch(err => {
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            console.log('err', err.response);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};

export const getWarrantyClaimAttributeOptions = id => dispatch => {
    axios
        .get(Base_URL + `get-a-warranty-claim-form-attributes-with-options/${id}`)
        .then(() => {
            dispatch({
                type: GET_WARRANTYCLAIMATTRIBUTE
            });
        })
        // .then(() => dispatch(getSurveyAttribute()))
        .catch(err => {
            console.log('err', err.response);
        });
};

// export function updateWarrantyClaimAttribute(warrantyClaimAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       warrantyClaimAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYCLAIMATTRIBUTE
//         })
//       ]).then(() => dispatch(getWarrantyClaimAttributes(routeParams)))
//     );
//   };
// }
// export function addWarrantyClaimAttribute(newWarrantyClaimAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newWarrantyClaimAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_WARRANTYCLAIMATTRIBUTE
//         })
//       ]).then(() => dispatch(getWarrantyClaimAttributes(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedWarrantyClaimAttributes(warrantyClaimAttributeId) {
    return {
        type: TOGGLE_IN_SELECTED_WARRANTYCLAIMATTRIBUTES,
        warrantyClaimAttributeId
    };
}

export function selectAllWarrantyClaimAttributes() {
    return {
        type: SELECT_ALL_WARRANTYCLAIMATTRIBUTES
    };
}

export function deSelectAllWarrantyClaimAttributes() {
    return {
        type: DESELECT_ALL_WARRANTYCLAIMATTRIBUTES
    };
}

export function openNewWarrantyClaimAttributeDialog() {
    return {
        type: OPEN_NEW_WARRANTYCLAIMATTRIBUTE_DIALOG
    };
}

export function closeNewWarrantyClaimAttributeDialog() {
    return {
        type: CLOSE_NEW_WARRANTYCLAIMATTRIBUTE_DIALOG
    };
}

export function openEditWarrantyClaimAttributeDialog(data) {
    return {
        type: OPEN_EDIT_WARRANTYCLAIMATTRIBUTE_DIALOG,
        data
    };
}

export function closeEditWarrantyClaimAttributeDialog() {
    return {
        type: CLOSE_EDIT_WARRANTYCLAIMATTRIBUTE_DIALOG
    };
}

// export function updateWarrantyClaimAttribute(warrantyClaimAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

//     const request = axios.post('/api/warrantyClaimAttributes-app/update-warrantyClaimAttribute', {
//       warrantyClaimAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYCLAIMATTRIBUTE
//         })
//       ]).then(() => dispatch(getWarrantyClaimAttributes(routeParams)))
//     );
//   };
// }

// export function removeWarrantyClaimAttribute(warrantyClaimAttributeId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       warrantyClaimAttributeId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_WARRANTYCLAIMATTRIBUTE
//         })
//       ]).then(() => dispatch(getWarrantyClaimAttributes(routeParams)))
//     );
//   };
// }

export function removeWarrantyClaimAttributes(warrantyClaimAttributeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

        const request = axios.post('/api/warrantyClaimAttributes-app/remove-warrantyClaimAttributes', {
            warrantyClaimAttributeIds
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: REMOVE_WARRANTYCLAIMATTRIBUTES
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCLAIMATTRIBUTES
                })
            ]).then(() => dispatch(getWarrantyClaimAttribute(routeParams)))
        );
    };
}

export function toggleStarredWarrantyClaimAttribute(warrantyClaimAttributeId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

        const request = axios.post('/api/warrantyClaimAttributes-app/toggle-starred-warrantyClaimAttribute', {
            warrantyClaimAttributeId
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYCLAIMATTRIBUTE
                }),
            ]).then(() => dispatch(getWarrantyClaimAttribute(routeParams)))
        );
    };
}

export function toggleStarredWarrantyClaimAttributes(warrantyClaimAttributeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

        const request = axios.post('/api/warrantyClaimAttributes-app/toggle-starred-warrantyClaimAttributes', {
            warrantyClaimAttributeIds
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYCLAIMATTRIBUTES
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCLAIMATTRIBUTES
                }),
            ]).then(() => dispatch(getWarrantyClaimAttribute(routeParams)))
        );
    };
}

export function setWarrantyClaimAttributesStarred(warrantyClaimAttributeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

        const request = axios.post('/api/warrantyClaimAttributes-app/set-warrantyClaimAttributes-starred', {
            warrantyClaimAttributeIds
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYCLAIMATTRIBUTES_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCLAIMATTRIBUTES
                }),
            ]).then(() => dispatch(getWarrantyClaimAttribute(routeParams)))
        );
    };
}

export function setWarrantyClaimAttributesUnstarred(warrantyClaimAttributeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimAttributesApp.warrantyClaimAttributes;

        const request = axios.post('/api/warrantyClaimAttributes-app/set-warrantyClaimAttributes-unstarred', {
            warrantyClaimAttributeIds
        });

        return request.then(() =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYCLAIMATTRIBUTES_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCLAIMATTRIBUTES
                }),
            ]).then(() => dispatch(getWarrantyClaimAttribute(routeParams)))
        );
    };
}


