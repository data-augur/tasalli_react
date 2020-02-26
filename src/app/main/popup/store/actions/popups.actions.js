import axios from 'axios';
import {Base_URL} from '../../../../server'
import moment from "moment";
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';


export const GET_POPUPS = '[POPUPS APP] GET POPUPS';
export const ADD_POPUPS = '[POPUPS APP] ADD POPUPS';
export const UPDATE_POPUPS = '[POPUPS APP] UPDATE POPUPS';
export const REMOVE_POPUPS = '[POPUPS APP] REMOVE POPUPS';
export const GET_ALL_NOTIFICATIONS = '[POPUPS APP] GET ALL NOTIFICATIONS';
export const SET_SEARCH_TEXT = '[POPUPS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_POPUPS =
    '[POPUPS APP] TOGGLE IN SELECTED POPUPS';
export const SELECT_ALL_POPUPS = '[POPUPS APP] SELECT ALL POPUPS';
export const DESELECT_ALL_POPUPS = '[POPUPS APP] DESELECT ALL POPUPS';
export const OPEN_NEW_POPUP_DIALOG = '[POPUPS APP] OPEN NEW POPUP DIALOG';
export const CLOSE_NEW_POPUP_DIALOG =
    '[POPUPS APP] CLOSE NEW POPUP DIALOG';
export const OPEN_EDIT_POPUP_DIALOG =
    '[POPUPS APP] OPEN EDIT POPUP DIALOG';
export const CLOSE_EDIT_POPUP_DIALOG =
    '[POPUPS APP] CLOSE EDIT POPUP DIALOG';

// export const REMOVE_POPUPS = '[POPUPS APP] REMOVE POPUPS';
export const TOGGLE_STARRED_AD = '[POPUPS APP] TOGGLE STARRED AD';
export const TOGGLE_STARRED_POPUPS = '[POPUPS APP] TOGGLE STARRED POPUPS';
export const SET_POPUPS_STARRED = '[POPUPS APP] SET POPUPS STARRED ';

let selectedSearch= {
    fromSearch:'yyyy-mm-dd',
    toSearch:'yyyy-mm-dd'
};
export function reset() {
    selectedSearch.fromSearch='yyyy-mm-dd';
    selectedSearch.toSearch='yyyy-mm-dd';
}
export const getAllNotifications = () => dispatch => {
    let query = 'get-all-app-notifications';
    axios
        .get(Base_URL + query)
        .then(res => {
            dispatch({
                type: GET_ALL_NOTIFICATIONS,
                payload: res.data
            });
        })
        .catch(err => {


        });
};
export function getPOPUPS()  {
    return (
    getPOPUPSPaginationData(0,20,'','')
    );
}

export const addPOPUPS = newPopup => dispatch => {
    newPopup.startTime = new Date(newPopup.startTime);
    newPopup.endTime = new Date(newPopup.endTime);
    let file= newPopup.images;
    let formdata= new FormData();
    formdata.append('image', file);
    formdata.append('name', newPopup.name);
    formdata.append('startTime', newPopup.startTime);
    formdata.append('endTime', newPopup.endTime);
    formdata.append('duration', newPopup.duration);
    formdata.append('notification_id', newPopup.notification_id);

    axios({
        url: Base_URL+'create-popup',
        method: "POST",
        data: formdata
    })
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Pop up Created', variant: "success"}));
            }
            dispatch({
                type: ADD_POPUPS
            });
        })
        .then(() => dispatch(getPOPUPS()))
        .catch(err => {
            console.log('err', err);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
        })
};
export const updatePOPUPS = (updateInfo) => dispatch => {
    updateInfo.startTime = new Date(updateInfo.startTime);
    updateInfo.endTime = new Date(updateInfo.endTime);
    let formdata= new FormData();
    if(updateInfo.images){
        let file= updateInfo.images;
        formdata.append('image', file);
        formdata.append('name', updateInfo.name);
        formdata.append('startTime', updateInfo.startTime);
        formdata.append('endTime', updateInfo.endTime);
        formdata.append('duration', updateInfo.duration);
        formdata.append('notification_id', updateInfo.notification_id);
        formdata.append('id', updateInfo.id);
        axios({
            url: Base_URL+`update-popup/${updateInfo.id}`,
            method: "PUT",
            data: formdata
        })
            .then(res => {
                if (res.request.status === 200) {
                    dispatch(showMessage({message: 'Popup Updated', variant: "success"}));
                }
                dispatch({
                    type: UPDATE_POPUPS
                });
            })
            .then(() => dispatch(getPOPUPS()))
            .catch(err => {
                console.log('err', err);
                dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            });
    } else {
        axios
            .put(Base_URL + `update-popup/${updateInfo.id}`, updateInfo)
            .then(res => {
                if (res.request.status === 200) {
                    dispatch(showMessage({message: 'Popup Updated', variant: "success"}));
                }
                dispatch({
                    type: UPDATE_POPUPS
                });
            })
            .then(() => dispatch(getPOPUPS()))
            .catch(err => {
                console.log('err', err.response);
                dispatch(showMessage({message: 'Error!' + err, variant: "error"}));

                //   dispatch({
                //     type: LOGIN_ERROR,
                //     payload: err.response.data
                //   });
            });
    }
};
export const removePOPUPS = id => dispatch => {
    axios
        .delete(Base_URL + `delete-popup/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Popup Deleted', variant: "success"}));
            }
            dispatch({
                type: REMOVE_POPUPS
            });
        })
        .then(() => dispatch(getPOPUPS()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));

            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};


export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedPopups(popupId) {
    return {
        type: TOGGLE_IN_SELECTED_POPUPS,
        popupId
    };
}

export function selectAllPOPUPS() {
    return {
        type: SELECT_ALL_POPUPS
    };
}

export function deSelectAllPOPUPS() {
    return {
        type: DESELECT_ALL_POPUPS
    };
}

export function openNewPopupDialog() {
    return {
        type: OPEN_NEW_POPUP_DIALOG
    };
}

export function closeNewPopupDialog() {
    return {
        type: CLOSE_NEW_POPUP_DIALOG
    };
}

export function openEditPopupDialog(data) {
    return {
        type: OPEN_EDIT_POPUP_DIALOG,
        data
    };
}

export function closeEditPopupDialog() {
    return {
        type: CLOSE_EDIT_POPUP_DIALOG
    };
}

export function toggleStarredPopup(popupId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().popupsApp.popups;

        const request = axios.post('/api/popups-app/toggle-starred-ad', {
            popupId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_AD
                }),
            ]).then(() => dispatch(getPOPUPS(routeParams)))
        );
    };
}

export function toggleStarredPOPUPS(popupIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().popUpsApp.popUps;

        const request = axios.post('/api/popups-app/toggle-starred-popups', {
            popupIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_POPUPS
                }),
                dispatch({
                    type: DESELECT_ALL_POPUPS
                }),
            ]).then(() => dispatch(getPOPUPS(routeParams)))
        );
    };
}

export function setPOPUPSStarred(popupIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().popUpsApp.popups;

        const request = axios.post('/api/popups-app/set-popups-starred', {
            popupIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_POPUPS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_POPUPS
                }),
            ]).then(() => dispatch(getPOPUPS(routeParams)))
        );
    };
}

export function setPOPUPSUnstarred(popupIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().popUpsApp.popups;

        const request = axios.post('/api/popups-app/set-popups-unstarred', {
            popupIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_POPUPS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_POPUPS
                }),
            ]).then(() => dispatch(getPOPUPS(routeParams)))
        );
    };
}

export const getPOPUPSPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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
        if( (selectedSearch.fromSearch!=='yyyy-mm-dd' && selectedSearch.fromSearch!=='') || (selectedSearch.toSearch!=='yyyy-mm-dd' && selectedSearch.toSearch!=='')){
            if(selectedSearch.fromSearch==='yyyy-mm-dd'||selectedSearch.fromSearch===''){
                selectedSearch.fromSearch=moment('1970-01-01').format('YYYY-MM-DD');
            }
            if(selectedSearch.toSearch==='yyyy-mm-dd'||selectedSearch.toSearch===''){
                selectedSearch.toSearch=moment(new Date()).format('YYYY-MM-DD');
            }
            querys = 'get-all-popups-by-search-paging/' + selectedSearch.fromSearch + '/' + selectedSearch.toSearch + '/' + page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
        } else {
            querys = 'get-all-popups-by-paging/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
        }
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_POPUPS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllNotifications()))
        .catch(err => {
            console.log('err', err);
            if (err.request.status === 401) {
                dispatch(showMessage({message: 'Your session expired. Please login again.', variant: "error"}));
                store.dispatch(logoutUser());
            }
        });
};

export function searchPOPUPS(state) {

    selectedSearch=state;

    return (
        getPOPUPSPaginationData(0,20,'','')
    );
}