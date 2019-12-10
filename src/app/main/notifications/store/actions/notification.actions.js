import axios from "axios";
import { Base_URL } from "../../../../server";
import { showMessage } from "app/store/actions/fuse";

export const GET_NOTIFICATIONS = "[NOTIFICATIONS APP] GET NOTIFICATIONS";
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

// export function getNotifications(routeParams) {
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

export const getNotifications = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-notifications')
    .get(Base_URL + "get-all-app-notifications")
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
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
export const addNotification = newNotification => dispatch => {
  axios
    // .post(Base_URL+'create-notification', newNotification)
    .post(Base_URL + "create-app-notification", newNotification)
    .then(res => {
      if (res.request.status === 200) {
        dispatch(
          showMessage({ message: "Notification Created", variant: "success" })
        );
      }
      dispatch({
        type: ADD_NOTIFICATION
      });
      dispatch(getNotifications());
    })
    .catch(err => {
      dispatch(
        showMessage({ message: err.response.data.error, variant: "error" })
      );
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
    const { routeParams } = getState().notificationsApp.notifications;

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
    const { routeParams } = getState().notificationsApp.notifications;

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
    const { routeParams } = getState().notificationsApp.notifications;

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
    const { routeParams } = getState().notificationsApp.notifications;

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
