import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
// import moment from "moment";

export const GET_WARRANTYREGISTER = '[WARRANTYREGISTER APP] GET WARRANTYREGISTER';
export const GET_ALL_WARRANTYREGISTER_SKU_CODES = '[WARRANTYREGISTER APP] GET SKUCODES';
export const GET_ALL_WARRANTYREGISTER_RETAILER_PHONE_NUMBERS = '[WARRANTYREGISTER APP] GET RETAILER PHONENUMBERS';
export const GET_ALL_WARRANTYREGISTER_USER_PHONE_NUMBERS = '[WARRANTYREGISTER APP] GET USER PHONENUMBERS';
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

let selectedSearch= {
    userPhoneNumber:'Undefined',
    searchDate:'yyyy-mm-dd',
    retailerPhoneNumber:'Undefined',
    skuCode:'Undefined'
};
export function reset() {
    selectedSearch.userPhoneNumber='Undefined';
    selectedSearch.searchDate='yyyy-mm-dd';
    selectedSearch.retailerPhoneNumber='Undefined';
    selectedSearch.skuCode='Undefined';
}
export const getAllWarrantyRegisterSKUCodes = () => dispatch => {
    let query = 'get-all-warranty-register-sku-codes';
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_WARRANTYREGISTER_SKU_CODES,
                payload: res.data
            });
        })
        .catch(err => {

        });
};
export const getAllWarrantyRegisterRetailerPhoneNumbers = () => dispatch => {
    let query = 'get-all-warranty-register-retailer-phone-numbers';
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_WARRANTYREGISTER_RETAILER_PHONE_NUMBERS,
                payload: res.data
            });
        })
        .catch(err => {

        });
};
export const getAllWarrantyRegisterUserPhoneNumbers = () => dispatch => {
    let query = 'get-all-warranty-register-user-phone-numbers';
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_WARRANTYREGISTER_USER_PHONE_NUMBERS,
                payload: res.data
            });
        })
        .catch(err => {

        });
};

export function getWarrantyRegister() {
    return (
        getRegisteredWarrantyPaginationData(0,20,'','')
    );
}
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

export const getRegisteredWarrantyPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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
    if(selectedSearch.searchDate==='yyyy-mm-dd'||selectedSearch.searchDate===''){
        selectedSearch.searchDate='Undefined';
    }
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        querys = 'get-all-warranty-registrations-by-search-paging/' + id+ '/'+ selectedSearch.retailerPhoneNumber + '/' + selectedSearch.userPhoneNumber + '/' + selectedSearch.skuCode + '/' + selectedSearch.searchDate +'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    } else {
        querys = 'get-all-warranty-registrations-by-search-paging/Undefined/'+ selectedSearch.retailerPhoneNumber + '/' + selectedSearch.userPhoneNumber + '/' + selectedSearch.skuCode + '/' + selectedSearch.searchDate + '/' +page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    }
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_WARRANTYREGISTER,
                payload: res.data.warrantyRegistration,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllWarrantyRegisterSKUCodes()))
        .then(() => dispatch(getAllWarrantyRegisterRetailerPhoneNumbers()))
        .then(() => dispatch(getAllWarrantyRegisterUserPhoneNumbers()))
        .catch(err => {
            console.log('err', err);
        });
};

export function searchWarrantyRegistration(state) {

    if(state.retailerPhoneNumber===''){
        state.retailerPhoneNumber='Undefined';
    }
    if(state.userPhoneNumber===''){
        state.userPhoneNumber='Undefined';
    }
    if(state.skuCode===''){
        state.skuCode='Undefined';
    }
    if(state.searchDate==='yyyy-mm-dd'||state.searchDate===''){
        state.searchDate='Undefined';
    }

    selectedSearch=state;

    return (
        getRegisteredWarrantyPaginationData(0,20,'','')
    );
}