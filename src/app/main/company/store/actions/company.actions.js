import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';

export const GET_COMPANIES = '[COMPANIES APP] GET COMPANIES';
export const ADD_COMPANY = '[COMPANIES APP] ADD COMPANY';
export const UPDATE_COMPANY = '[COMPANIES APP] UPDATE COMPANY';
export const REMOVE_COMPANY = '[COMPANIES APP] REMOVE COMPANY';

export const SET_SEARCH_TEXT = '[COMPANYS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_COMPANYS =
    '[COMPANYS APP] TOGGLE IN SELECTED COMPANYS';
export const SELECT_ALL_COMPANYS = '[COMPANYS APP] SELECT ALL COMPANYS';
export const DESELECT_ALL_COMPANYS = '[COMPANYS APP] DESELECT ALL COMPANYS';
export const OPEN_NEW_COMPANY_DIALOG = '[COMPANYS APP] OPEN NEW COMPANY DIALOG';
export const CLOSE_NEW_COMPANY_DIALOG =
    '[COMPANYS APP] CLOSE NEW COMPANY DIALOG';
export const OPEN_EDIT_COMPANY_DIALOG =
    '[COMPANYS APP] OPEN EDIT COMPANY DIALOG';
export const CLOSE_EDIT_COMPANY_DIALOG =
    '[COMPANYS APP] CLOSE EDIT COMPANY DIALOG';

export const REMOVE_COMPANYS = '[COMPANYS APP] REMOVE COMPANYS';
export const TOGGLE_STARRED_COMPANY = '[COMPANYS APP] TOGGLE STARRED COMPANY';
export const TOGGLE_STARRED_COMPANYS = '[COMPANYS APP] TOGGLE STARRED COMPANYS';
export const SET_COMPANYS_STARRED = '[COMPANYS APP] SET COMPANYS STARRED ';

// export function getCompanys(routeParams) {
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

export function getCompanies() {
    return (
    getCompaniesPaginationData(0,20,'','')
    );
}
export const addCompany = newCompany => dispatch => {

    axios
    // .post(Base_URL+'create-company', newCompany)
        .post(Base_URL + 'create-company', newCompany)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Company Created', variant: "success"}));
            }
            dispatch({
                type: ADD_COMPANY
            });
            dispatch(getCompanies())
        })
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
        });
};
export const updateCompany = (updateInfo, id) => dispatch => {

    axios
        .put(
            Base_URL + `update-company/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Company Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_COMPANY
            });
        })
        .then(() => dispatch(getCompanies()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));

            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeCompany = id => dispatch => {
    axios
        .delete(Base_URL + `delete-company/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Company Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_COMPANY
            });
        })
        .then(() => dispatch(getCompanies()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
        });
};

// export function updateCompany(company) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().companysApp.companys;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       company
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_COMPANY
//         })
//       ]).then(() => dispatch(getCompanys(routeParams)))
//     );
//   };
// }
// export function addCompany(newCompany) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().companysApp.companys;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newCompany
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_COMPANY
//         })
//       ]).then(() => dispatch(getCompanys(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedCompanys(companyId) {
    return {
        type: TOGGLE_IN_SELECTED_COMPANYS,
        companyId
    };
}

export function selectAllCompanys() {
    return {
        type: SELECT_ALL_COMPANYS
    };
}

export function deSelectAllCompanys() {
    return {
        type: DESELECT_ALL_COMPANYS
    };
}

export function openNewCompanyDialog() {
    return {
        type: OPEN_NEW_COMPANY_DIALOG
    };
}

export function closeNewCompanyDialog() {
    return {
        type: CLOSE_NEW_COMPANY_DIALOG
    };
}

export function openEditCompanyDialog(data) {
    return {
        type: OPEN_EDIT_COMPANY_DIALOG,
        data
    };
}

export function closeEditCompanyDialog() {
    return {
        type: CLOSE_EDIT_COMPANY_DIALOG
    };
}

// export function updateCompany(company) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().companysApp.companys;

//     const request = axios.post('/api/companys-app/update-company', {
//       company
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_COMPANY
//         })
//       ]).then(() => dispatch(getCompanys(routeParams)))
//     );
//   };
// }

// export function removeCompany(companyId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().companysApp.companys;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       companyId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_COMPANY
//         })
//       ]).then(() => dispatch(getCompanys(routeParams)))
//     );
//   };
// }

export function removeCompanys(companyIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().companysApp.companys;

        const request = axios.post('/api/companys-app/remove-companys', {
            companyIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_COMPANYS
                }),
                dispatch({
                    type: DESELECT_ALL_COMPANYS
                })
            ]).then(() => dispatch(getCompanies(routeParams)))
        );
    };
}

export function toggleStarredCompany(companyId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().companysApp.companys;

        const request = axios.post('/api/companys-app/toggle-starred-company', {
            companyId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_COMPANY
                }),
            ]).then(() => dispatch(getCompanies(routeParams)))
        );
    };
}

export function toggleStarredCompanys(companyIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().companysApp.companys;

        const request = axios.post('/api/companys-app/toggle-starred-companys', {
            companyIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_COMPANYS
                }),
                dispatch({
                    type: DESELECT_ALL_COMPANYS
                }),
            ]).then(() => dispatch(getCompanies(routeParams)))
        );
    };
}

export function setCompanysStarred(companyIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().companysApp.companys;

        const request = axios.post('/api/companys-app/set-companys-starred', {
            companyIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_COMPANYS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_COMPANYS
                }),
            ]).then(() => dispatch(getCompanies(routeParams)))
        );
    };
}

export function setCompanysUnstarred(companyIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().companysApp.companys;

        const request = axios.post('/api/companys-app/set-companys-unstarred', {
            companyIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_COMPANYS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_COMPANYS
                }),
            ]).then(() => dispatch(getCompanies(routeParams)))
        );
    };
}

export const getCompaniesPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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
    let querys = 'get-all-companies-by-paging/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;

    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_COMPANIES,
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