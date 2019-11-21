import axios from 'axios';
import { Base_URL } from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';

export const GET_BRAND_USERS = '[BRAND USERS APP] GET BRANDUSERS';
export const GET_ALL_COMPANIES = '[BRAND USERS APP] GET COMPANIES';
export const GET_ALL_BRANDS = '[BRAND USERS APP] GET ALLBRANDS';
export const ADD_BRAND_USER = '[BRAND USERS APP] Add BRANDUSER';
export const UPDATE_BRAND_USER = '[BRAND USERS APP] UPDATE BRANDUSER';
export const REMOVE_BRAND_USER = '[BRAND USERS APP] REMOVE BRANDUSER';

export const SET_SEARCH_TEXT = '[BRANDUSERS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_BRANDUSERS =
  '[BRANDUSERS APP] TOGGLE IN SELECTED BRANDUSERS';
export const SELECT_ALL_BRANDUSERS = '[BRANDUSERS APP] SELECT ALL BRANDUSERS';
export const DESELECT_ALL_BRANDUSERS = '[BRANDUSERS APP] DESELECT ALL BRANDUSERS';
export const OPEN_NEW_BRANDUSER_DIALOG = '[BRANDUSERS APP] OPEN NEW BRANDUSER DIALOG';
export const CLOSE_NEW_BRANDUSER_DIALOG =
  '[BRANDUSERS APP] CLOSE NEW BRANDUSER DIALOG';
export const OPEN_EDIT_BRANDUSER_DIALOG =
  '[BRANDUSERS APP] OPEN EDIT BRANDUSER DIALOG';
export const CLOSE_EDIT_BRANDUSER_DIALOG =
  '[BRANDUSERS APP] CLOSE EDIT BRANDUSER DIALOG';
export const ADD_BRANDUSER = '[BRANDUSERS APP] ADD BRANDUSER';
export const UPDATE_BRANDUSER = '[BRANDUSERS APP] UPDATE BRANDUSER';
export const REMOVE_BRANDUSER = '[BRANDUSERS APP] REMOVE BRANDUSER';
export const REMOVE_BRANDUSERS = '[BRANDUSERS APP] REMOVE BRANDUSERS';
export const TOGGLE_STARRED_BRANDUSER = '[BRANDUSERS APP] TOGGLE STARRED BRANDUSER';
export const TOGGLE_STARRED_BRANDUSERS = '[BRANDUSERS APP] TOGGLE STARRED BRANDUSERS';
export const SET_BRANDUSERS_STARRED = '[BRANDUSERS APP] SET BRANDUSERS STARRED ';

// export function getBrandUsers(routeParams) {
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
export const getAllCompanies = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-companies')
    .get(Base_URL+'get-all-companies')
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
export const getAllBrands = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-brands')
    .get(Base_URL+'get-all-brands')
    .then(res => {

      dispatch({
        type: GET_ALL_BRANDS,
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
export const getBrandUsers = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-brand-users')
    .get(Base_URL+'get-all-brand-users')
    .then(res => {

      dispatch({
        type: GET_BRAND_USERS,
        payload: res.data
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .then(() => dispatch(getAllBrands()))
    .catch(err => {

      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const addBrandUser = newBrandUser => dispatch => {

  axios
    // .post(Base_URL+'create-brand-user', newBrandUser)
    .post(Base_URL+'create-brand-user', newBrandUser)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Brand User Created',variant: "success"}));
        }
      dispatch({
        type: ADD_BRAND_USER
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .then(() => dispatch(getBrandUsers()))
    .catch(err => {
        dispatch(showMessage({message: err.response.data.error,variant: "error"}));

      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const updateBrandUser = (updateInfo, id) => dispatch => {

  axios
    .put(
        Base_URL+`update-brand-user/${updateInfo.id}`,
      updateInfo
    )
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Brand User Updated',variant: "success"}));
        }
      dispatch({
        type: UPDATE_BRAND_USER
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .then(() => dispatch(getBrandUsers()))
    .catch(err => {
        dispatch(showMessage({message: err.response.data.error,variant: "error"}));

      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const removeBrandUser = id => dispatch => {
  axios
    .delete(Base_URL+`delete-brand-user/${id}`)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Brand User Removed',variant: "success"}));
        }
      dispatch({
        type: REMOVE_BRAND_USER
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .then(() => dispatch(getBrandUsers()))
    .catch(err => {
        dispatch(showMessage({message: err.response.data.error,variant: "error"}));

      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};

// export function updateBrandUser(brandUser) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().brandUsersApp.brandUsers;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       brandUser
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_BRANDUSER
//         })
//       ]).then(() => dispatch(getBrandUsers(routeParams)))
//     );
//   };
// }
// export function addBrandUser(newBrandUser) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().brandUsersApp.brandUsers;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newBrandUser
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_BRANDUSER
//         })
//       ]).then(() => dispatch(getBrandUsers(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function toggleInSelectedBrandUsers(brandUserId) {
  return {
    type: TOGGLE_IN_SELECTED_BRANDUSERS,
    brandUserId
  };
}

export function selectAllBrandUsers() {
  return {
    type: SELECT_ALL_BRANDUSERS
  };
}

export function deSelectAllBrandUsers() {
  return {
    type: DESELECT_ALL_BRANDUSERS
  };
}

export function openNewBrandUserDialog() {
  return {
    type: OPEN_NEW_BRANDUSER_DIALOG
  };
}

export function closeNewBrandUserDialog() {
  return {
    type: CLOSE_NEW_BRANDUSER_DIALOG
  };
}

export function openEditBrandUserDialog(data) {
  return {
    type: OPEN_EDIT_BRANDUSER_DIALOG,
    data
  };
}

export function closeEditBrandUserDialog() {
  return {
    type: CLOSE_EDIT_BRANDUSER_DIALOG
  };
}

// export function updateBrandUser(brandUser) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().brandUsersApp.brandUsers;

//     const request = axios.post('/api/brandUsers-app/update-brandUser', {
//       brandUser
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_BRANDUSER
//         })
//       ]).then(() => dispatch(getBrandUsers(routeParams)))
//     );
//   };
// }

// export function removeBrandUser(brandUserId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().brandUsersApp.brandUsers;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       brandUserId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_BRANDUSER
//         })
//       ]).then(() => dispatch(getBrandUsers(routeParams)))
//     );
//   };
// }

export function removeBrandUsers(brandUserIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().brandUsersApp.brandUsers;

    const request = axios.post('/api/brandUsers-app/remove-brandUsers', {
      brandUserIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_BRANDUSERS
        }),
        dispatch({
          type: DESELECT_ALL_BRANDUSERS
        })
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}

export function toggleStarredBrandUser(brandUserId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().brandUsersApp.brandUsers;

    const request = axios.post('/api/brandUsers-app/toggle-starred-brandUser', {
      brandUserId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_BRANDUSER
        }),
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}

export function toggleStarredBrandUsers(brandUserIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().brandUsersApp.brandUsers;

    const request = axios.post('/api/brandUsers-app/toggle-starred-brandUsers', {
      brandUserIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_BRANDUSERS
        }),
        dispatch({
          type: DESELECT_ALL_BRANDUSERS
        }),
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}

export function setBrandUsersStarred(brandUserIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().brandUsersApp.brandUsers;

    const request = axios.post('/api/brandUsers-app/set-brandUsers-starred', {
      brandUserIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_BRANDUSERS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_BRANDUSERS
        }),
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}

export function setBrandUsersUnstarred(brandUserIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().brandUsersApp.brandUsers;

    const request = axios.post('/api/brandUsers-app/set-brandUsers-unstarred', {
      brandUserIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_BRANDUSERS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_BRANDUSERS
        }),
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}
