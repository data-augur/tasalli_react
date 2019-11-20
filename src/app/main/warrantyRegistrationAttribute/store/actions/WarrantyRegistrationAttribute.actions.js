import axios from 'axios';
import { Base_URL } from '../../../../server'
// import {ADD_SURVEYATTRIBUTE} from "../../../surveyAttributes/store/actions";
// import {GET_ALL_SURVEYS} from "../../../surveys/store/actions";
import {showMessage} from 'app/store/actions/fuse';

export const GET_WARRANTYREGISTRATIONATTRIBUTE = '[WARRANTYREGISTRATIONATTRIBUTE APP] GET WARRANTYREGISTRATIONATTRIBUTE';
export const GET_ALL_WARRANTYREGISTRATIONATTRIBUTE = '[WARRANTYREGISTRATIONATTRIBUTE APP] GET WARRANTYREGISTRATIONATTRIBUTE';
export const ADD_WARRANTYREGISTRATIONATTRIBUTE = '[WARRANTYREGISTRATIONATTRIBUTE APP] ADD WARRANTYREGISTRATIONATTRIBUTE';
export const UPDATE_WARRANTYREGISTRATIONATTRIBUTE = '[WARRANTYREGISTRATIONATTRIBUTE APP] UPDATE WARRANTYREGISTRATIONATTRIBUTE';
export const REMOVE_WARRANTYREGISTRATIONATTRIBUTE = '[WARRANTYREGISTRATIONATTRIBUTE APP] REMOVE WARRANTYREGISTRATIONATTRIBUTE';
export const GET_WARRANTYREGISTRATIONATTRIBUTEOPTIONS = '[WARRANTYREGISTRATIONATTRIBUTE APP] GET WARRANTYREGISTRATIONATTRIBUTEOPTIONS';

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
//     url: Base_URL+'get-all-brand-users',
//     headers
//   });
export const getAllWarrantyRegistrationAttribute = () => dispatch => {
    let id=0;
    id=window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  axios
    // .get(Base_URL+'get-all-surveys')
      .get(Base_URL+`get-a-warranty-registration-form-attributes-with-options/${id}`)
    .then(res => {

        dispatch({
        type: GET_ALL_WARRANTYREGISTRATIONATTRIBUTE,
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
export const getWarrantyRegistrationAttribute = () => dispatch => {
    let id=0;
    id=window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    axios
        .get(Base_URL+`get-a-warranty-registration-form-attributes-with-options/${id}`)
    .then(res => {

         localStorage.setItem('WarrantyRegistrationFormName', res.data[0].warrantyRegistrationForm_Name[0].formName);
      dispatch({
        type: GET_WARRANTYREGISTRATIONATTRIBUTE,
        payload: res.data
      });
    })
    // .then(() => dispatch(getAllCompanies()))
    .catch(err => {
      console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const addWarrantyRegistrationAttribute = newContact => dispatch => {
    axios
    // .post(Base_URL+'create-brand', newContact)
    .post(Base_URL+'create-warranty-registration-form-attribute', newContact)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Warranty Registration Form Attribute Saved Successfully', variant: "success"}));
        }
        dispatch({
        type: ADD_WARRANTYREGISTRATIONATTRIBUTE
      });
    })
    .then(() => dispatch(getWarrantyRegistrationAttribute()))
    .catch(err => {
        dispatch(showMessage({message: 'Error!'+err, variant: "error"}));
        console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const updateWarrantyRegistrationAttribute = (updateInfo, id) => dispatch => {

  axios
    .put(
        Base_URL+`update-warranty-registration-form-attribute/${updateInfo.id}`,
      updateInfo
    )
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Warranty Registration Form Attribute Updated', variant: "success"}));
        }
      dispatch({
        type: UPDATE_WARRANTYREGISTRATIONATTRIBUTE
      });
    })
    .then(() => dispatch(getWarrantyRegistrationAttribute()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: 'Error!'+err, variant: "error"}));
        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const removeWarrantyRegistrationAttribute = id => dispatch => {
  axios
    .delete(Base_URL+`delete-warranty-registration-form-attribute/${id}`)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Warranty Registration Form Attribute Deleted', variant: "success"}));
        }
      dispatch({
        type: REMOVE_WARRANTYREGISTRATIONATTRIBUTE
      });
    })
    .then(() => dispatch(getWarrantyRegistrationAttribute()))
    .catch(err => {
        dispatch(showMessage({message: 'Error!'+err, variant: "error"}));
        console.log('err', err.response);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};

export const getWarrantyRegistrationAttributeOptions = id => dispatch => {
    axios
        .get(Base_URL+`get-a-survey-attribute-options/${id}`)
        .then(res => {
            dispatch({
                type: GET_WARRANTYREGISTRATIONATTRIBUTEOPTIONS
            });
        })
        // .then(() => dispatch(getSurveyAttribute()))
        .catch(err => {
            console.log('err', err.response);
        });
};

// export function updateContact(contact) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().contactsApp.contacts;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       contact
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_CONTACT
//         })
//       ]).then(() => dispatch(getContacts(routeParams)))
//     );
//   };
// }
// export function addContact(newContact) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().contactsApp.contacts;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newContact
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_CONTACT
//         })
//       ]).then(() => dispatch(getContacts(routeParams)))
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
//       ]).then(() => dispatch(getContacts(routeParams)))
//     );
//   };
// }

// export function removeContact(contactId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().contactsApp.contacts;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       contactId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_CONTACT
//         })
//       ]).then(() => dispatch(getContacts(routeParams)))
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
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
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
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
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
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
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
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
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
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
    );
  };
}


