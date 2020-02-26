import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
export const GET_RETAILERS = '[RETAILERS APP] GET RETAILERS';
export const GET_ALL_RETAILER_PHONE_NUMBERS = '[RETAILERS APP] GET RETAILER PHONENUMBERS';
export const GET_ALL_USER_PHONE_NUMBERS = '[RETAILERS APP] GET USER PHONENUMBERS';
export const ADD_RETAILER = '[RETAILERS APP] ADD RETAILER';
export const UPDATE_RETAILER = '[RETAILERS APP] UPDATE RETAILER';
export const REMOVE_RETAILER = '[RETAILERS APP] REMOVE RETAILER';

export const SET_SEARCH_TEXT = '[RETAILERS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_RETAILERS =
    '[RETAILERS APP] TOGGLE IN SELECTED RETAILERS';
export const SELECT_ALL_RETAILERS = '[RETAILERS APP] SELECT ALL RETAILERS';
export const DESELECT_ALL_RETAILERS = '[RETAILERS APP] DESELECT ALL RETAILERS';
export const OPEN_NEW_RETAILER_DIALOG = '[RETAILERS APP] OPEN NEW RETAILER DIALOG';
export const CLOSE_NEW_RETAILER_DIALOG =
    '[RETAILERS APP] CLOSE NEW RETAILER DIALOG';
export const OPEN_EDIT_RETAILER_DIALOG =
    '[RETAILERS APP] OPEN EDIT RETAILER DIALOG';
export const CLOSE_EDIT_RETAILER_DIALOG =
    '[RETAILERS APP] CLOSE EDIT RETAILER DIALOG';

export const REMOVE_RETAILERS = '[RETAILERS APP] REMOVE RETAILERS';
export const TOGGLE_STARRED_RETAILER = '[RETAILERS APP] TOGGLE STARRED RETAILERS';
export const TOGGLE_STARRED_RETAILERS = '[RETAILERS APP] TOGGLE STARRED RETAILERS';
export const SET_RETAILERS_STARRED = '[RETAILERS APP] SET RETAILERS STARRED ';

let selectedSearch= {
    userPhoneNumber:'Undefined',
    searchDate:'yyyy-mm-dd',
    retailerPhoneNumber:'Undefined'
};

export function reset() {
    selectedSearch.userPhoneNumber='Undefined';
    selectedSearch.searchDate='yyyy-mm-dd';
    selectedSearch.retailerPhoneNumber='Undefined';
}
export const getAllRetailerPhoneNumbers = () => dispatch => {
    let query = 'get-all-retailer-phone-numbers';
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_RETAILER_PHONE_NUMBERS,
                payload: res.data
            });
        })
        .catch(err => {

        });
};
export const getAllUserPhoneNumbers = () => dispatch => {
    let query = 'get-all-user-phone-numbers';
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_USER_PHONE_NUMBERS,
                payload: res.data
            });
        })
        .catch(err => {

        });
};
export function getRetailers() {

    return (
    getRetailersPaginationData(0,20,'','')
    );
}
export const addRetailer = newRetailer => dispatch => {

    // axios
    //     .post(Base_URL + 'create-retailer', newRetailer)
    //     .then(res => {
    //         if (res.request.status === 200) {
    //             dispatch(showMessage({message: 'Retailer Created', variant: "success"}));
    //         }
    //         dispatch({
    //             type: ADD_RETAILER
    //         });
    //     })
    //     .then(() => dispatch(getRetailers()))
    //     .catch(err => {
    //         dispatch(showMessage({message: err.response.data.error, variant: "error"}));
    //         console.log('err', err);
    //
    //     });
};
export const updateRetailer = (updateInfo, id) => dispatch => {

    // axios
    //     .put(
    //         Base_URL + `update-retailer/${updateInfo.id}`,
    //         updateInfo
    //     )
    //     .then(res => {
    //         if (res.request.status === 200) {
    //             dispatch(showMessage({message: 'Retailer Updated', variant: "success"}));
    //         }
    //         dispatch({
    //             type: UPDATE_RETAILER
    //         });
    //     })
    //     .then(() => dispatch(getRetailers()))
    //     .catch(err => {
    //         console.log('err', err.response);
    //         dispatch(showMessage({message: err.response.data.error, variant: "error"}));
    //
    //     });
};
export const removeRetailer = id => dispatch => {
    // axios
    //     .delete(Base_URL + `delete-retailer/${id}`)
    //     .then(res => {
    //         if (res.request.status === 200) {
    //             dispatch(showMessage({message: 'Retailer Removed', variant: "success"}));
    //         }
    //         dispatch({
    //             type: REMOVE_RETAILER
    //         });
    //     })
    //     .then(() => dispatch(getRetailers()))
    //     .catch(err => {
    //         console.log('err', err.response);
    //         dispatch(showMessage({message: err.response.data.error, variant: "error"}));
    //
    //     });
};


export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedRetailers(retailerId) {
    return {
        type: TOGGLE_IN_SELECTED_RETAILERS,
        retailerId
    };
}

export function selectAllRetailers() {
    return {
        type: SELECT_ALL_RETAILERS
    };
}

export function deSelectAllRetailers() {
    return {
        type: DESELECT_ALL_RETAILERS
    };
}

export function openNewRetailerDialog() {
    return {
        type: OPEN_NEW_RETAILER_DIALOG
    };
}

export function closeNewRetailerDialog() {
    return {
        type: CLOSE_NEW_RETAILER_DIALOG
    };
}

export function openEditRetailerDialog(data) {
    return {
        type: OPEN_EDIT_RETAILER_DIALOG,
        data
    };
}

export function closeEditRetailerDialog() {
    return {
        type: CLOSE_EDIT_RETAILER_DIALOG
    };
}


export function removeRetailers(retailerIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().retailersApp.retailers;

        const request = axios.post('/api/retailers-app/remove-retailers', {
            retailerIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_RETAILERS
                }),
                dispatch({
                    type: DESELECT_ALL_RETAILERS
                })
            ]).then(() => dispatch(getRetailers(routeParams)))
        );
    };
}

export function toggleStarredRetailer(retailerId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().retailersApp.retailers;

        const request = axios.post('/api/retailers-app/toggle-starred-retailer', {
            retailerId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_RETAILER
                }),
            ]).then(() => dispatch(getRetailers(routeParams)))
        );
    };
}

export function toggleStarredRetailers(retailerIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().retailersApp.retailers;

        const request = axios.post('/api/retailers-app/toggle-starred-retailers', {
            retailerIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_RETAILERS
                }),
                dispatch({
                    type: DESELECT_ALL_RETAILERS
                }),
            ]).then(() => dispatch(getRetailers(routeParams)))
        );
    };
}

export function setRetailersStarred(retailerIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().retailersApp.retailers;

        const request = axios.post('/api/retailers-app/set-retailers-starred', {
            retailerIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_RETAILERS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_RETAILERS
                }),
            ]).then(() => dispatch(getRetailers(routeParams)))
        );
    };
}

export function setRetailersUnstarred(retailerIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().retailersApp.retailers;

        const request = axios.post('/api/retailers-app/set-retailers-unstarred', {
            retailerIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_RETAILERS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_RETAILERS
                }),

            ]).then(() => dispatch(getRetailers(routeParams)))
        );
    };
}

export const getRetailersPaginationData = (page, pageSize, sorted, filtered) => dispatch => {

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
    if(selectedSearch.searchDate==='yyyy-mm-dd'||selectedSearch.searchDate===''){
        selectedSearch.searchDate='Undefined';
    }
    let querys = 'get-all-retailers-by-search-paging/'+ selectedSearch.retailerPhoneNumber + '/' + selectedSearch.userPhoneNumber + '/' + selectedSearch.searchDate + '/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;

    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_RETAILERS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllRetailerPhoneNumbers()))
        .then(() => dispatch(getAllUserPhoneNumbers()))
        .catch(err => {
            console.log('err', err);
            if (err.request.status === 401) {
                dispatch(showMessage({message: 'Your session expired. Please login again.', variant: "error"}));
                store.dispatch(logoutUser());
            }
        });
};

export function searchRetailers(state) {

    if(state.retailerPhoneNumber===''){
        state.retailerPhoneNumber='Undefined';
    }
    if(state.userPhoneNumber===''){
        state.userPhoneNumber='Undefined';
    }
    if(state.searchDate==='yyyy-mm-dd'||state.searchDate===''){
        state.searchDate='Undefined';
    }

    selectedSearch=state;

    return (
            getRetailersPaginationData(0,20,'','')
        );
}