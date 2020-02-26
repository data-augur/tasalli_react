import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
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

let selectedCompanyId='Undefined';
export function reset() {
    selectedCompanyId='Undefined';
}

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
export function getWarrantyCompletion(){
    return (
        getWarrantyCompletionPaginationData(0,20,'','')
    );
}
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

export const getWarrantyCompletionPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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
    let querys;
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        querys = 'get-all-warranty-completion-forms-by-paging/' + id+'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    } else if(selectedCompanyId !== 'Undefined'){
        querys = 'get-all-warranty-completion-forms-by-paging/'+selectedCompanyId+'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    } else {
        querys = 'get-all-warranty-completion-forms-by-paging/Undefined/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    }
    axios
        .get(Base_URL + querys)
        .then(res => {

            dispatch({
                type: GET_WARRANTYCOMPLETION,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllCompanies()))
        .catch(err => {
            console.log('err', err);
            if (err.request.status === 401) {
                dispatch(showMessage({message: 'Your session expired. Please login again.', variant: "error"}));
                store.dispatch(logoutUser());
            }
        });
};

export function searchWarrantyCompletionByCompany(companyId) {
    if(companyId===''){
        selectedCompanyId='Undefined';
    } else {
        selectedCompanyId=companyId
    }
    return (
        getWarrantyCompletionPaginationData(0,20,'','')
    );
}