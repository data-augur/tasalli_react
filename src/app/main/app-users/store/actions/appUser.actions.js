import axios from 'axios';
import { Base_URL } from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_APP_USERS = '[APP USERS APP] GET APPUSERS';

export const UPDATE_APP_USER = '[APP USERS APP] UPDATE APPUSER';
export const REMOVE_APP_USER = '[APP USERS APP] REMOVE APPUSER';

export const SET_SEARCH_TEXT = '[APPUSERS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_APPUSERS =
  '[APPUSERS APP] TOGGLE IN SELECTED APPUSERS';
export const SELECT_ALL_APPUSERS = '[APPUSERS APP] SELECT ALL APPUSERS';
export const DESELECT_ALL_APPUSERS = '[APPUSERS APP] DESELECT ALL APPUSERS';
export const OPEN_NEW_APPUSER_DIALOG = '[APPUSERS APP] OPEN NEW APPUSER DIALOG';
export const CLOSE_NEW_APPUSER_DIALOG =
  '[APPUSERS APP] CLOSE NEW APPUSER DIALOG';
export const OPEN_EDIT_APPUSER_DIALOG =
  '[APPUSERS APP] OPEN EDIT APPUSER DIALOG';
export const CLOSE_EDIT_APPUSER_DIALOG =
  '[APPUSERS APP] CLOSE EDIT APPUSER DIALOG';
export const ADD_APPUSER = '[APPUSERS APP] ADD APPUSER';
export const UPDATE_APPUSER = '[APPUSERS APP] UPDATE APPUSER';
export const REMOVE_APPUSER = '[APPUSERS APP] REMOVE APPUSER';
export const REMOVE_APPUSERS = '[APPUSERS APP] REMOVE APPUSERS';
export const TOGGLE_STARRED_APPUSER = '[APPUSERS APP] TOGGLE STARRED APPUSER';
export const TOGGLE_STARRED_APPUSERS = '[APPUSERS APP] TOGGLE STARRED APPUSERS';
export const SET_APPUSERS_STARRED = '[APPUSERS APP] SET APPUSERS STARRED ';

// export function getAppusers(routeParams) {
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
export const getAllAppUsers = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-app-users')
    .get(Base_URL+'get-all-app-users')
    .then(res => {

      dispatch({
        type: GET_ALL_APP_USERS,
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
export const updateAppUser = (updateInfo, id) => dispatch => {

  axios
    .put(
        Base_URL+`update-app-user/${updateInfo.id}`,
      updateInfo
    )
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'App User Updated',variant: "success"}));
        }
      dispatch({
        type: UPDATE_APP_USER
      });
    })
    .then(() => dispatch(getAllAppUsers()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: err.response.data.error,variant: "error"}));
        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const removeAppUser = id => dispatch => {
  axios
    .delete(Base_URL+`delete-app-user/${id}`)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'App User Removed',variant: "success"}));
        }
      dispatch({
        type: REMOVE_APP_USER
      });
    })
    .then(() => dispatch(getAllAppUsers()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: err.response.data.error,variant: "error"}));
        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};

// export function updateAppuser(appuser) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().appusersApp.appusers;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       appuser
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_APPUSER
//         })
//       ]).then(() => dispatch(getAllAppUsers(routeParams)))
//     );
//   };
// }
// export function addAppuser(newAppuser) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().appusersApp.appusers;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newAppuser
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_APPUSER
//         })
//       ]).then(() => dispatch(getAllAppUsers(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function toggleInSelectedAppusers(appuserId) {
  return {
    type: TOGGLE_IN_SELECTED_APPUSERS,
    appuserId
  };
}

export function selectAllAppusers() {
  return {
    type: SELECT_ALL_APPUSERS
  };
}

export function deSelectAllAppusers() {
  return {
    type: DESELECT_ALL_APPUSERS
  };
}

export function openNewAppuserDialog() {
  return {
    type: OPEN_NEW_APPUSER_DIALOG
  };
}

export function closeNewAppuserDialog() {
  return {
    type: CLOSE_NEW_APPUSER_DIALOG
  };
}

export function openEditAppuserDialog(data) {
  return {
    type: OPEN_EDIT_APPUSER_DIALOG,
    data
  };
}

export function closeEditAppuserDialog() {
  return {
    type: CLOSE_EDIT_APPUSER_DIALOG
  };
}

// export function updateAppuser(appuser) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().appusersApp.appusers;

//     const request = axios.post('/api/appusers-app/update-appuser', {
//       appuser
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_APPUSER
//         })
//       ]).then(() => dispatch(getAllAppUsers(routeParams)))
//     );
//   };
// }

// export function removeAppuser(appuserId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().appusersApp.appusers;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       appuserId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_APPUSER
//         })
//       ]).then(() => dispatch(getAllAppUsers(routeParams)))
//     );
//   };
// }

export function removeAppusers(appuserIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().appusersApp.appusers;

    const request = axios.post('/api/appusers-app/remove-appusers', {
      appuserIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_APPUSERS
        }),
        dispatch({
          type: DESELECT_ALL_APPUSERS
        })
      ]).then(() => dispatch(getAllAppUsers(routeParams)))
    );
  };
}

export function toggleStarredAppuser(appuserId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().appusersApp.appusers;

    const request = axios.post('/api/appusers-app/toggle-starred-appuser', {
      appuserId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_APPUSER
        }),
      ]).then(() => dispatch(getAllAppUsers(routeParams)))
    );
  };
}

export function toggleStarredAppusers(appuserIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().appusersApp.appusers;

    const request = axios.post('/api/appusers-app/toggle-starred-appusers', {
      appuserIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_APPUSERS
        }),
        dispatch({
          type: DESELECT_ALL_APPUSERS
        }),
      ]).then(() => dispatch(getAllAppUsers(routeParams)))
    );
  };
}

export function setAppusersStarred(appuserIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().appusersApp.appusers;

    const request = axios.post('/api/appusers-app/set-appusers-starred', {
      appuserIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_APPUSERS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_APPUSERS
        }),
      ]).then(() => dispatch(getAllAppUsers(routeParams)))
    );
  };
}

export function setAppusersUnstarred(appuserIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().appusersApp.appusers;

    const request = axios.post('/api/appusers-app/set-appusers-unstarred', {
      appuserIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_APPUSERS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_APPUSERS
        }),
      ]).then(() => dispatch(getAllAppUsers(routeParams)))
    );
  };
}
