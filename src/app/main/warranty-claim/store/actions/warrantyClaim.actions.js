import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';

export const GET_WARRANTYCLAIM = '[WARRANTYCLAIM APP] GET WARRANTYCLAIM';
export const GET_ALL_COMPANIES = '[WARRANTYCLAIM APP] GET COMPANIES';
export const ADD_WARRANTYCLAIM = '[WARRANTYCLAIM APP] ADD WARRANTYCLAIM';
export const UPDATE_WARRANTYCLAIM = '[WARRANTYCLAIM APP] UPDATE WARRANTYCLAIM';
export const REMOVE_WARRANTYCLAIM = '[WARRANTYCLAIM APP] REMOVE WARRANTYCLAIM';

export const SET_SEARCH_TEXT = '[WARRANTYCLAIMS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_WARRANTYCLAIMS =
    '[WARRANTYCLAIMS APP] TOGGLE IN SELECTED WARRANTYCLAIMS';
export const SELECT_ALL_WARRANTYCLAIMS = '[WARRANTYCLAIMS APP] SELECT ALL WARRANTYCLAIMS';
export const DESELECT_ALL_WARRANTYCLAIMS = '[WARRANTYCLAIMS APP] DESELECT ALL WARRANTYCLAIMS';
export const OPEN_NEW_WARRANTYCLAIM_DIALOG = '[WARRANTYCLAIMS APP] OPEN NEW WARRANTYCLAIM DIALOG';
export const CLOSE_NEW_WARRANTYCLAIM_DIALOG =
    '[WARRANTYCLAIMS APP] CLOSE NEW WARRANTYCLAIM DIALOG';
export const OPEN_EDIT_WARRANTYCLAIM_DIALOG =
    '[WARRANTYCLAIMS APP] OPEN EDIT WARRANTYCLAIM DIALOG';
export const CLOSE_EDIT_WARRANTYCLAIM_DIALOG =
    '[WARRANTYCLAIMS APP] CLOSE EDIT WARRANTYCLAIM DIALOG';

export const REMOVE_WARRANTYCLAIMS = '[WARRANTYCLAIMS APP] REMOVE WARRANTYCLAIMS';
export const TOGGLE_STARRED_WARRANTYCLAIM = '[WARRANTYCLAIMS APP] TOGGLE STARRED WARRANTYCLAIM';
export const TOGGLE_STARRED_WARRANTYCLAIMS = '[WARRANTYCLAIMS APP] TOGGLE STARRED WARRANTYCLAIMS';
export const SET_WARRANTYCLAIMS_STARRED = '[WARRANTYCLAIMS APP] SET WARRANTYCLAIMS STARRED ';

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
export function getWarrantyClaim() {
    return (
        getWarrantyClaimPaginationData(0,20,'','')
    );
}
export const addWarrantyClaim = newWarrantyClaim => dispatch => {

    axios
    // .post(Base_URL+'create-brand', newWarrantyClaim)
        .post(Base_URL + 'create-warranty-claim-form', newWarrantyClaim)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Create Warranty Claim Form Created', variant: "success"}));
            }
            dispatch({
                type: ADD_WARRANTYCLAIM
            });
        })
        .then(() => dispatch(getWarrantyClaim()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err);
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const updateWarrantyClaim = (updateInfo, id) => dispatch => {

    axios
        .put(
            Base_URL + `update-warranty-claim-form/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Claim Form Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_WARRANTYCLAIM
            });
        })
        .then(() => dispatch(getWarrantyClaim()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeWarrantyClaim = id => dispatch => {
    axios
        .delete(Base_URL + `delete-warranty-claim-form/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Warranty Claim Form Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_WARRANTYCLAIM
            })
        })
        .then(() => dispatch(getWarrantyClaim()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};

// export function updateWarrantyClaim(warrantyClaim) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimsApp.warrantyClaims;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       warrantyClaim
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYCLAIM
//         })
//       ]).then(() => dispatch(getWarrantyClaims(routeParams)))
//     );
//   };
// }
// export function addWarrantyClaim(newWarrantyClaim) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimsApp.warrantyClaims;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newWarrantyClaim
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_WARRANTYCLAIM
//         })
//       ]).then(() => dispatch(getWarrantyClaims(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedWarrantyClaims(warrantyClaimId) {
    return {
        type: TOGGLE_IN_SELECTED_WARRANTYCLAIMS,
        warrantyClaimId
    };
}

export function selectAllWarrantyClaims() {
    return {
        type: SELECT_ALL_WARRANTYCLAIMS
    };
}

export function deSelectAllWarrantyClaims() {
    return {
        type: DESELECT_ALL_WARRANTYCLAIMS
    };
}

export function openNewWarrantyClaimDialog() {
    return {
        type: OPEN_NEW_WARRANTYCLAIM_DIALOG
    };
}

export function closeNewWarrantyClaimDialog() {
    return {
        type: CLOSE_NEW_WARRANTYCLAIM_DIALOG
    };
}

export function openEditWarrantyClaimDialog(data) {
    return {
        type: OPEN_EDIT_WARRANTYCLAIM_DIALOG,
        data
    };
}

export function closeEditWarrantyClaimDialog() {
    return {
        type: CLOSE_EDIT_WARRANTYCLAIM_DIALOG
    };
}

// export function updateWarrantyClaim(warrantyClaim) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimsApp.warrantyClaims;

//     const request = axios.post('/api/warrantyClaims-app/update-warrantyClaim', {
//       warrantyClaim
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYCLAIM
//         })
//       ]).then(() => dispatch(getWarrantyClaims(routeParams)))
//     );
//   };
// }

// export function removeWarrantyClaim(warrantyClaimId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimsApp.warrantyClaims;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       warrantyClaimId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_WARRANTYCLAIM
//         })
//       ]).then(() => dispatch(getWarrantyClaims(routeParams)))
//     );
//   };
// }

export function removeWarrantyClaims(warrantyClaimIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimsApp.warrantyClaims;

        const request = axios.post('/api/warrantyClaims-app/remove-warrantyClaims', {
            warrantyClaimIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_WARRANTYCLAIMS
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCLAIMS
                })
            ]).then(() => dispatch(getWarrantyClaim(routeParams)))
        );
    };
}

export function toggleStarredWarrantyClaim(warrantyClaimId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimsApp.warrantyClaims;

        const request = axios.post('/api/warrantyClaims-app/toggle-starred-warrantyClaim', {
            warrantyClaimId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYCLAIM
                }),
            ]).then(() => dispatch(getWarrantyClaim(routeParams)))
        );
    };
}

export function toggleStarredWarrantyClaims(warrantyClaimIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimsApp.warrantyClaims;

        const request = axios.post('/api/warrantyClaims-app/toggle-starred-warrantyClaims', {
            warrantyClaimIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_WARRANTYCLAIMS
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCLAIMS
                }),
            ]).then(() => dispatch(getWarrantyClaim(routeParams)))
        );
    };
}

export function setWarrantyClaimsStarred(warrantyClaimIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimsApp.warrantyClaims;

        const request = axios.post('/api/warrantyClaims-app/set-warrantyClaims-starred', {
            warrantyClaimIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYCLAIMS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCLAIMS
                }),
            ]).then(() => dispatch(getWarrantyClaim(routeParams)))
        );
    };
}

export function setWarrantyClaimsUnstarred(warrantyClaimIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().warrantyClaimsApp.warrantyClaims;

        const request = axios.post('/api/warrantyClaims-app/set-warrantyClaims-unstarred', {
            warrantyClaimIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_WARRANTYCLAIMS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_WARRANTYCLAIMS
                }),
            ]).then(() => dispatch(getWarrantyClaim(routeParams)))
        );
    };
}

export const getWarrantyClaimPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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
        querys = 'get-all-warranty-claim-forms-by-paging/' + id+'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    } else if(selectedCompanyId !== 'Undefined'){
        querys = 'get-all-warranty-claim-forms-by-paging/'+selectedCompanyId+'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    } else {
        querys = 'get-all-warranty-claim-forms-by-paging/Undefined/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    }
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_WARRANTYCLAIM,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllCompanies()))
        .catch(err => {
            console.log('err', err);
        });
};

export function searchWarrantyClaimByCompany(companyId) {

    if(companyId===''){
        selectedCompanyId='Undefined';
    } else {
        selectedCompanyId=companyId
    }
    return (
        getWarrantyClaimPaginationData(0,20,'','')
    );
}