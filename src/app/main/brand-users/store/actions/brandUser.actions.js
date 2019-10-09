import axios from 'axios';
import { getUserData } from './user.actions';

export const GET_BRAND_USERS = '[BRAND USERS APP] GET BRANDUSERS';
export const GET_ALL_COMPANIES = '[BRAND USERS APP] GET COMPANIES';
export const GET_ALL_BRANDS = '[BRAND USERS APP] GET ALLBRANDS';
export const ADD_BRAND_USER = '[BRAND USERS APP] Add BRANDUSER';
export const UPDATE_BRAND_USER = '[BRAND USERS APP] UPDATE BRANDUSER';
export const REMOVE_BRAND_USER = '[BRAND USERS APP] REMOVE BRANDUSER';

export const SET_SEARCH_TEXT = '[CONTACTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CONTACTS =
  '[CONTACTS APP] TOGGLE IN SELECTED CONTACTS';
export const SELECT_ALL_CONTACTS = '[CONTACTS APP] SELECT ALL CONTACTS';
export const DESELECT_ALL_CONTACTS = '[CONTACTS APP] DESELECT ALL CONTACTS';
export const OPEN_NEW_CONTACT_DIALOG = '[CONTACTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG =
  '[CONTACTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG =
  '[CONTACTS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG =
  '[CONTACTS APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[CONTACTS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[CONTACTS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[CONTACTS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[CONTACTS APP] REMOVE CONTACTS';
export const TOGGLE_STARRED_CONTACT = '[CONTACTS APP] TOGGLE STARRED CONTACT';
export const TOGGLE_STARRED_CONTACTS = '[CONTACTS APP] TOGGLE STARRED CONTACTS';
export const SET_CONTACTS_STARRED = '[CONTACTS APP] SET CONTACTS STARRED ';

// export function getContacts(routeParams) {
//   const token = localStorage.getItem('jwtToken');

//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Authorization: token
//   };

//   const request = axios({
//     method: 'get',
//     url: 'http://localhost:4000/get-all-brand-users',
//     headers
//   });
export const getAllCompanies = () => dispatch => {
  axios
    // .get('http://localhost:4000/get-all-companies')
    .get('http://18.189.81.89:4000/get-all-companies')
    .then(res => {
      // console.log('res :', res);
      dispatch({
        type: GET_ALL_COMPANIES,
        payload: res.data
      });
    })
    .catch(err => {
      // console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const getAllBrands = () => dispatch => {
  axios
    // .get('http://localhost:4000/get-all-brands')
    .get('http://18.189.81.89:4000/get-all-brands')
    .then(res => {
      // console.log('res :', res);
      dispatch({
        type: GET_ALL_BRANDS,
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
export const getBrandUsers = () => dispatch => {
  axios
    // .get('http://localhost:4000/get-all-brand-users')
    .get('http://18.189.81.89:4000/get-all-brand-users')
    .then(res => {
      // console.log('get Brand Users :', res);
      dispatch({
        type: GET_BRAND_USERS,
        payload: res.data
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .then(() => dispatch(getAllBrands()))
    .catch(err => {
      console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const addBrandUser = newContact => dispatch => {
  // console.log('newContact :', newContact);
  axios
    // .post('http://localhost:4000/create-brand-user', newContact)
    .post('http://18.189.81.89:4000/create-brand-user', newContact)
    .then(res => {
      // console.log('res :', res);
      dispatch({
        type: ADD_BRAND_USER
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .then(() => dispatch(getBrandUsers()))
    .catch(err => {
      console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const updateBrandUser = (updateInfo, id) => dispatch => {
  // console.log('updateInfo :', updateInfo);
  axios
    .put(
      // `http://localhost:4000/update-brand-user/${updateInfo.id}`,
      `http://18.189.81.89:4000/update-brand-user/${updateInfo.id}`,
      updateInfo
    )
    .then(res => {
      // console.log('update req :', res);
      dispatch({
        type: UPDATE_BRAND_USER
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .then(() => dispatch(getBrandUsers()))
    .catch(err => {
      console.log('err', err.response);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const removeBrandUser = id => dispatch => {
  axios
    // .delete(`http://localhost:4000/delete-brand-user/${id}`)
    .delete(`http://18.189.81.89:4000/delete-brand-user/${id}`)
    .then(res => {
      // console.log('update req :', res);
      dispatch({
        type: REMOVE_BRAND_USER
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .then(() => dispatch(getBrandUsers()))
    .catch(err => {
      console.log('err', err.response);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};

// export function updateContact(contact) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().contactsApp.contacts;

//     const request = axios.post(`http://localhost:4000/update-brand-user/${id}`, {
//       contact
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_CONTACT
//         })
//       ]).then(() => dispatch(getBrandUsers(routeParams)))
//     );
//   };
// }
// export function addContact(newContact) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().contactsApp.contacts;

//     const request = axios.post('http://localhost:4000/create-brand-user', {
//       newContact
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_CONTACT
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

export function toggleInSelectedContacts(contactId) {
  return {
    type: TOGGLE_IN_SELECTED_CONTACTS,
    contactId
  };
}

export function selectAllContacts() {
  return {
    type: SELECT_ALL_CONTACTS
  };
}

export function deSelectAllContacts() {
  return {
    type: DESELECT_ALL_CONTACTS
  };
}

export function openNewContactDialog() {
  return {
    type: OPEN_NEW_CONTACT_DIALOG
  };
}

export function closeNewContactDialog() {
  return {
    type: CLOSE_NEW_CONTACT_DIALOG
  };
}

export function openEditContactDialog(data) {
  return {
    type: OPEN_EDIT_CONTACT_DIALOG,
    data
  };
}

export function closeEditContactDialog() {
  return {
    type: CLOSE_EDIT_CONTACT_DIALOG
  };
}

// export function updateContact(contact) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().contactsApp.contacts;

//     const request = axios.post('/api/contacts-app/update-contact', {
//       contact
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_CONTACT
//         })
//       ]).then(() => dispatch(getBrandUsers(routeParams)))
//     );
//   };
// }

// export function removeContact(contactId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().contactsApp.contacts;

//     const request = axios.post(`http://localhost:4000/delete-brand-user/${id}`, {
//       contactId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_CONTACT
//         })
//       ]).then(() => dispatch(getBrandUsers(routeParams)))
//     );
//   };
// }

export function removeContacts(contactIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post('/api/contacts-app/remove-contacts', {
      contactIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_CONTACTS
        }),
        dispatch({
          type: DESELECT_ALL_CONTACTS
        })
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}

export function toggleStarredContact(contactId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post('/api/contacts-app/toggle-starred-contact', {
      contactId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_CONTACT
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}

export function toggleStarredContacts(contactIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
      contactIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_CONTACTS
        }),
        dispatch({
          type: DESELECT_ALL_CONTACTS
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}

export function setContactsStarred(contactIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post('/api/contacts-app/set-contacts-starred', {
      contactIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_CONTACTS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_CONTACTS
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}

export function setContactsUnstarred(contactIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post('/api/contacts-app/set-contacts-unstarred', {
      contactIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_CONTACTS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_CONTACTS
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getBrandUsers(routeParams)))
    );
  };
}
