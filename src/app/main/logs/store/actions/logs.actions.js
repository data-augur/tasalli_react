import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
export const GET_LOGS = '[LOGS APP] GET LOGS';
export const GET_ALL_LOGS_SKU_CODES = '[LOGS APP] GET SKUCODES';
export const GET_ALL_LOGS_PHONE_NUMBERS = '[LOGS APP] GET PHONENUMBERS';
// export const ADD_BRAND = '[BRANDS APP] ADD BRAND';
// export const UPDATE_BRAND = '[BRANDS APP] UPDATE BRAND';
// export const REMOVE_BRAND = '[BRANDS APP] REMOVE BRAND';

export const SET_SEARCH_TEXT = '[LOGS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_LOGS =
    '[LOGS APP] TOGGLE IN SELECTED LOGS';
export const SELECT_ALL_LOGS = '[LOGS APP] SELECT ALL LOGS';
export const DESELECT_ALL_LOGS = '[LOGS APP] DESELECT ALL LOGS';
export const OPEN_NEW_LOG_DIALOG = '[LOGS APP] OPEN NEW LOG DIALOG';
export const CLOSE_NEW_LOG_DIALOG =
    '[LOGS APP] CLOSE NEW LOG DIALOG';
export const OPEN_EDIT_LOG_DIALOG =
    '[LOGS APP] OPEN EDIT LOG DIALOG';
export const CLOSE_EDIT_LOG_DIALOG =
    '[LOGS APP] CLOSE EDIT LOG DIALOG';

export const REMOVE_LOGS = '[LOGS APP] REMOVE LOGS';
export const TOGGLE_STARRED_LOG = '[LOGS APP] TOGGLE STARRED LOG';
export const TOGGLE_STARRED_LOGS = '[LOGS APP] TOGGLE STARRED LOGS';
export const SET_LOGS_STARRED = '[LOGS APP] SET LOGS STARRED ';

let selectedSearch= {
    status:'Undefined',
    phoneNumber:'Undefined',
    skuCode:'Undefined',
    searchDate:'Undefined'
};
export function reset() {
    selectedSearch.status='Undefined';
    selectedSearch.phoneNumber='Undefined';
    selectedSearch.skuCode='Undefined';
    selectedSearch.searchDate='Undefined';
}
export const getAllLogsSKUCodes = () => dispatch => {
    let query = 'get-all-logs-sku-codes';
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_LOGS_SKU_CODES,
                payload: res.data
            });
        })
        .catch(err => {

        });
};
export const getAllLogsPhoneNumbers = () => dispatch => {
    let query = 'get-all-logs-phone-numbers';
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_LOGS_PHONE_NUMBERS,
                payload: res.data
            });
        })
        .catch(err => {

        });
};
export function getLogs()  {
    return (
        getLogsPaginationData(0,20,'','')
    );
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedLogs(logId) {
    return {
        type: TOGGLE_IN_SELECTED_LOGS,
        logId
    };
}

export function selectAllLogs() {
    return {
        type: SELECT_ALL_LOGS
    };
}

export function deSelectAllLogs() {
    return {
        type: DESELECT_ALL_LOGS
    };
}

export function openNewLogDialog() {
    return {
        type: OPEN_NEW_LOG_DIALOG
    };
}

export function closeNewLogDialog() {
    return {
        type: CLOSE_NEW_LOG_DIALOG
    };
}

export function openEditLogDialog(data) {
    return {
        type: OPEN_EDIT_LOG_DIALOG,
        data
    };
}

export function closeEditLogDialog() {
    return {
        type: CLOSE_EDIT_LOG_DIALOG
    };
}


export function toggleStarredLog(logId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().logsApp.logs;

        const request = axios.post('/api/logs-app/toggle-starred-log', {
            logId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_LOG
                }),
            ]).then(() => dispatch(getLogs(routeParams)))
        );
    };
}

export function toggleStarredLogs(logIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().logsApp.logs;

        const request = axios.post('/api/logs-app/toggle-starred-logs', {
            logIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_LOGS
                }),
                dispatch({
                    type: DESELECT_ALL_LOGS
                }),
            ]).then(() => dispatch(getLogs(routeParams)))
        );
    };
}

export function setLogsStarred(logIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().logsApp.logs;

        const request = axios.post('/api/logs-app/set-logs-starred', {
            logIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_LOGS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_LOGS
                }),
            ]).then(() => dispatch(getLogs(routeParams)))
        );
    };
}

export function setLogsUnstarred(logIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().logsApp.logs;

        const request = axios.post('/api/logs-app/set-logs-unstarred', {
            logIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_LOGS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_LOGS
                }),
            ]).then(() => dispatch(getLogs(routeParams)))
        );
    };
}

export const getLogsPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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

    let querys = 'get-all-logs-by-search-paging/'+ selectedSearch.status + '/' + selectedSearch.phoneNumber + '/' + selectedSearch.skuCode + '/' + selectedSearch.searchDate + '/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_LOGS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllLogsSKUCodes()))
        .then(() => dispatch(getAllLogsPhoneNumbers()))
        .catch(err => {
            console.log('err', err);
            if (err.request.status === 401) {
                dispatch(showMessage({message: 'Your session expired. Please login again.', variant: "error"}));
                store.dispatch(logoutUser());
            }
        });
};

export function searchLogs(state) {

    if(state.status===''){
        state.status='Undefined';
    }
    if(state.phoneNumber===''){
        state.phoneNumber='Undefined';
    }
    if(state.skuCode===''){
        state.skuCode='Undefined';
    }
    if(state.searchDate==='yyyy-mm-dd'||state.searchDate===''){
        state.searchDate='Undefined';
    }
    selectedSearch=state;

    return (
      getLogsPaginationData(0,20,'','')
    );
}