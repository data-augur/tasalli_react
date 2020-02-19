import axios from "axios";
import {Base_URL} from "../../../../server";
import {showMessage} from "app/store/actions/fuse";

export const GET_NOTIFICATIONS = "[NOTIFICATIONS APP] GET NOTIFICATIONS";
export const GET_ALL_DATE_HISTORY = '[APP USERS APP] GET DATE HISTORY';
export const ADD_NOTIFICATION = "[NOTIFICATIONS APP] ADD NOTIFICATION";
export const UPDATE_NOTIFICATION = "[NOTIFICATIONS APP] UPDATE NOTIFICATION";
export const REMOVE_NOTIFICATION = "[NOTIFICATIONS APP] REMOVE NOTIFICATION";

export const SET_SEARCH_TEXT = "[NOTIFICATIONS APP] SET SEARCH TEXT";
export const TOGGLE_IN_SELECTED_NOTIFICATIONS =
    "[NOTIFICATIONS APP] TOGGLE IN SELECTED NOTIFICATIONS";
export const SELECT_ALL_NOTIFICATIONS =
    "[NOTIFICATIONS APP] SELECT ALL NOTIFICATIONS";
export const DESELECT_ALL_NOTIFICATIONS =
    "[NOTIFICATIONS APP] DESELECT ALL NOTIFICATIONS";
export const OPEN_NEW_NOTIFICATION_DIALOG =
    "[NOTIFICATIONS APP] OPEN NEW NOTIFICATION DIALOG";
export const CLOSE_NEW_NOTIFICATION_DIALOG =
    "[NOTIFICATIONS APP] CLOSE NEW NOTIFICATION DIALOG";
export const OPEN_EDIT_NOTIFICATION_DIALOG =
    "[NOTIFICATIONS APP] OPEN EDIT NOTIFICATION DIALOG";
export const CLOSE_EDIT_NOTIFICATION_DIALOG =
    "[NOTIFICATIONS APP] CLOSE EDIT NOTIFICATION DIALOG";

export const REMOVE_NOTIFICATIONS = "[NOTIFICATIONS APP] REMOVE NOTIFICATIONS";
export const TOGGLE_STARRED_NOTIFICATION =
    "[NOTIFICATIONS APP] TOGGLE STARRED NOTIFICATION";
export const TOGGLE_STARRED_NOTIFICATIONS =
    "[NOTIFICATIONS APP] TOGGLE STARRED NOTIFICATIONS";
export const SET_NOTIFICATIONS_STARRED =
    "[NOTIFICATIONS APP] SET NOTIFICATIONS STARRED ";


let selectedSearch= {
    notificationType:'Undefined',
    selectedDate:'Undefined'
};
export function reset() {
    selectedSearch.notificationType='Undefined';
    selectedSearch.selectedDate='Undefined';
}
export function getNotifications() {
    return (
        getNotificationsPaginationData(0,20,'','')
    );
}
export const addNotification = newNotification => dispatch => {
    let file= newNotification.images;
    let formdata= new FormData();
    formdata.append('image', file);
    formdata.append('title', newNotification.title);
    formdata.append('message', newNotification.message);
    formdata.append('notification_type', newNotification.notification_type);
    formdata.append('sender', newNotification.sender);

    axios({
        url: Base_URL+'create-app-notification',
        method: "POST",
        data: formdata
    })
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Notification Created', variant: "success"}));
            }
            dispatch({
                type: ADD_NOTIFICATION
            });
        })
        .then(() => dispatch(getNotifications()))
        .catch(err => {
            console.log('err', err);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
        });
};

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedNotifications(notificationId) {
    return {
        type: TOGGLE_IN_SELECTED_NOTIFICATIONS,
        notificationId
    };
}

export function selectAllNotifications() {
    return {
        type: SELECT_ALL_NOTIFICATIONS
    };
}

export function deSelectAllNotifications() {
    return {
        type: DESELECT_ALL_NOTIFICATIONS
    };
}

export function openNewNotificationDialog() {
    return {
        type: OPEN_NEW_NOTIFICATION_DIALOG
    };
}

export function closeNewNotificationDialog() {
    return {
        type: CLOSE_NEW_NOTIFICATION_DIALOG
    };
}

export function openEditNotificationDialog(data) {
    return {
        type: OPEN_EDIT_NOTIFICATION_DIALOG,
        data
    };
}

export function closeEditNotificationDialog() {
    return {
        type: CLOSE_EDIT_NOTIFICATION_DIALOG
    };
}

export function toggleStarredNotification(notificationId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().notificationsApp.notifications;

        const request = axios.post(
            "/api/notifications-app/toggle-starred-notification",
            {
                notificationId
            }
        );

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_NOTIFICATION
                })
            ]).then(() => dispatch(getNotifications(routeParams)))
        );
    };
}

export function toggleStarredNotifications(notificationIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().notificationsApp.notifications;

        const request = axios.post(
            "/api/notifications-app/toggle-starred-notifications",
            {
                notificationIds
            }
        );

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_NOTIFICATIONS
                }),
                dispatch({
                    type: DESELECT_ALL_NOTIFICATIONS
                })
            ]).then(() => dispatch(getNotifications(routeParams)))
        );
    };
}

export function setNotificationsStarred(notificationIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().notificationsApp.notifications;

        const request = axios.post(
            "/api/notifications-app/set-notifications-starred",
            {
                notificationIds
            }
        );

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_NOTIFICATIONS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_NOTIFICATIONS
                })
            ]).then(() => dispatch(getNotifications(routeParams)))
        );
    };
}

export function setNotificationsUnstarred(notificationIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().notificationsApp.notifications;

        const request = axios.post(
            "/api/notifications-app/set-notifications-unstarred",
            {
                notificationIds
            }
        );

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_NOTIFICATIONS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_NOTIFICATIONS
                })
            ]).then(() => dispatch(getNotifications(routeParams)))
        );
    };
}

export const getNotificationsPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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
    let querys = 'get-all-app-notifications-by-search-pagination/'+ selectedSearch.notificationType+'/'+ selectedSearch.selectedDate+'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_NOTIFICATIONS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .catch(err => {
            console.log('err', err);
        });
};

export function searchNotifications(state) {

    if(state.selectedDate==='yyyy-mm-dd'||state.selectedDate===''){
        state.selectedDate='Undefined';
    }
    if(state.notificationType===''){
        state.notificationType='Undefined';
    }
    selectedSearch=state;
    return (
        getNotificationsPaginationData(0,20,'','')
    );
}