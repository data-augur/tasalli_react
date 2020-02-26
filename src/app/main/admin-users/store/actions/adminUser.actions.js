import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
export const GET_ALL_ADMIN_USERS = '[ADMIN USERS APP] GET ADMINUSERS';

export const UPDATE_ADMIN_USER = '[ADMIN USERS APP] UPDATE ADMINUSER';
export const ADD_ADMIN_USER = '[ADMIN USERS APP] Add ADMINUSER';
export const REMOVE_ADMIN_USER = '[ADMIN USERS APP] REMOVE ADMINUSER';

export const SET_SEARCH_TEXT = '[ADMINS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_ADMINS =
    '[ADMINS APP] TOGGLE IN SELECTED ADMINS';
export const SELECT_ALL_ADMINS = '[ADMINS APP] SELECT ALL ADMINS';
export const DESELECT_ALL_ADMINS = '[ADMINS APP] DESELECT ALL ADMINS';
export const OPEN_NEW_ADMIN_DIALOG = '[ADMINS APP] OPEN NEW ADMIN DIALOG';
export const CLOSE_NEW_ADMIN_DIALOG =
    '[ADMINS APP] CLOSE NEW ADMIN DIALOG';
export const OPEN_EDIT_ADMIN_DIALOG =
    '[ADMINS APP] OPEN EDIT ADMIN DIALOG';
export const CLOSE_EDIT_ADMIN_DIALOG =
    '[ADMINS APP] CLOSE EDIT ADMIN DIALOG';
export const ADD_ADMIN = '[ADMINS APP] ADD ADMIN';
export const UPDATE_ADMIN = '[ADMINS APP] UPDATE ADMIN';
export const REMOVE_ADMIN = '[ADMINS APP] REMOVE ADMIN';
export const REMOVE_ADMINS = '[ADMINS APP] REMOVE ADMINS';
export const TOGGLE_STARRED_ADMIN = '[ADMINS APP] TOGGLE STARRED ADMIN';
export const TOGGLE_STARRED_ADMINS = '[ADMINS APP] TOGGLE STARRED ADMINS';
export const SET_ADMINS_STARRED = '[ADMINS APP] SET ADMINS STARRED ';

let selectedRole='Undefined';
export function reset() {
    selectedRole='Undefined';
}
export function getAllAdminUsers(){
    return (
    getAdminsPaginationData(0,20,'','')
    );
}
export const addAdminUser = newAdmin => dispatch => {

    axios
    // .post(Base_URL+'create-brand-user', newAdmin)
        .post(Base_URL + 'create-tasali-admin', newAdmin)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Admin User Created', variant: "success"}));
            }
            dispatch({
                type: ADD_ADMIN_USER
            });
        })
        // .then(() => dispatch(getAllCompanies()))
        .then(() => dispatch(getAllAdminUsers()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const updateAdminUser = (updateInfo, id) => dispatch => {

    axios
        .put(
            Base_URL + `update-tasali-admin/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Admin User Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_ADMIN_USER
            });
        })
        .then(() => dispatch(getAllAdminUsers()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err.response);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeAdminUser = id => dispatch => {
    axios
        .delete(Base_URL + `delete-tasali-admin/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Admin User Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_ADMIN_USER
            });
        })
        .then(() => dispatch(getAllAdminUsers()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err.response);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};

// export function updateAdmin(admin) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().adminsApp.admins;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       admin
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_ADMIN
//         })
//       ]).then(() => dispatch(getAllAppUsers(routeParams)))
//     );
//   };
// }
// export function addAdmin(newAdmin) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().adminsApp.admins;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newAdmin
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_ADMIN
//         })
//       ]).then(() => dispatch(getAllAppUsers(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedAdmins(adminId) {
    return {
        type: TOGGLE_IN_SELECTED_ADMINS,
        adminId
    };
}

export function selectAllAdmins() {
    return {
        type: SELECT_ALL_ADMINS
    };
}

export function deSelectAllAdmins() {
    return {
        type: DESELECT_ALL_ADMINS
    };
}

export function openNewAdminDialog() {
    return {
        type: OPEN_NEW_ADMIN_DIALOG
    };
}

export function closeNewAdminDialog() {
    return {
        type: CLOSE_NEW_ADMIN_DIALOG
    };
}

export function openEditAdminDialog(data) {
    return {
        type: OPEN_EDIT_ADMIN_DIALOG,
        data
    };
}

export function closeEditAdminDialog() {
    return {
        type: CLOSE_EDIT_ADMIN_DIALOG
    };
}

// export function updateAdmin(admin) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().adminsApp.admins;

//     const request = axios.post('/api/admins-app/update-admin', {
//       admin
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_ADMIN
//         })
//       ]).then(() => dispatch(getAllAppUsers(routeParams)))
//     );
//   };
// }

// export function removeAdmin(adminId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().adminsApp.admins;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       adminId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_ADMIN
//         })
//       ]).then(() => dispatch(getAllAppUsers(routeParams)))
//     );
//   };
// }

export function removeAdmins(adminIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().adminsApp.admins;

        const request = axios.post('/api/admins-app/remove-admins', {
            adminIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_ADMINS
                }),
                dispatch({
                    type: DESELECT_ALL_ADMINS
                })
            ]).then(() => dispatch(getAllAdminUsers(routeParams)))
        );
    };
}

export function toggleStarredAdmin(adminId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().adminsApp.admins;

        const request = axios.post('/api/admins-app/toggle-starred-admin', {
            adminId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_ADMIN
                }),
            ]).then(() => dispatch(getAllAdminUsers(routeParams)))
        );
    };
}

export function toggleStarredAdmins(adminIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().adminsApp.admins;

        const request = axios.post('/api/admins-app/toggle-starred-admins', {
            adminIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_ADMINS
                }),
                dispatch({
                    type: DESELECT_ALL_ADMINS
                }),
            ]).then(() => dispatch(getAllAdminUsers(routeParams)))
        );
    };
}

export function setAdminsStarred(adminIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().adminsApp.admins;

        const request = axios.post('/api/admins-app/set-admins-starred', {
            adminIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_ADMINS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_ADMINS
                }),
            ]).then(() => dispatch(getAllAdminUsers(routeParams)))
        );
    };
}

export function setAdminsUnstarred(adminIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().adminsApp.admins;

        const request = axios.post('/api/admins-app/set-admins-unstarred', {
            adminIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_ADMINS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_ADMINS
                }),
            ]).then(() => dispatch(getAllAdminUsers(routeParams)))
        );
    };
}

export const getAdminsPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
    if(isNaN(pageSize)|| pageSize===-1){
        pageSize='All';
        page=0;
        sorted=[];
    }
    let sortingName;
    let sortingOrder;
    if(sorted.length===0 || sorted===''){
        sortingName='Undefined';
        sortingOrder='Undefined';
    } else {
        if(sorted[0].desc){
            sortingName = sorted[0].id;
            sortingOrder= 'DESC';
        } else {
            sortingName = sorted[0].id;
            sortingOrder= 'ASC';
        }
    }

    let querys = 'get-all-admins-by-role-pagination/'+selectedRole+'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;

    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_ALL_ADMIN_USERS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .catch(err => {
            console.log('err', err);
            if (err.request.status === 401) {
                dispatch(showMessage({message: 'Your session expired. Please login again.', variant: "error"}));
                store.dispatch(logoutUser());
            }
        });
};

export function searchAdminsByRole (role) {

    if(role===''){
        selectedRole='Undefined';
    } else {
        selectedRole=role;
    }
    return (
        getAdminsPaginationData(0,20,'','')
    );

};