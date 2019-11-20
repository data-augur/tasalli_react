import axios from 'axios';
import { Base_URL } from '../../../../server'
import moment from "moment";

export const GET_LOGS = '[LOGS APP] GET LOGS';
// export const GET_ALL_COMPANIES = '[BRANDS APP] GET COMPANIES';
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

export const getLogs = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-brands')
    .get(Base_URL+'get-all-logs')
    .then(res => {
        for(let i=0 ; i<res.data.length; i++)
        {
            res.data[i].time=moment(res.data[i].time).format('YYYY-MM-DD hh:mm');
        }
        dispatch({
        type: GET_LOGS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('err', err);
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
    const { routeParams } = getState().logsApp.logs;

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
    const { routeParams } = getState().logsApp.logs;

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
    const { routeParams } = getState().logsApp.logs;

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
    const { routeParams } = getState().logsApp.logs;

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
