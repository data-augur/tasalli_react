import axios from 'axios';
import { Base_URL } from '../../../../server'
import moment from "moment";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ADS = '[ADS APP] GET ADS';
 export const GET_ALL_SURVEYS = '[ADS APP] GET SURVEYS';
export const ADD_ADS = '[ADS APP] ADD ADS';
export const UPDATE_ADS = '[ADS APP] UPDATE ADS';
export const REMOVE_ADS = '[ADS APP] REMOVE ADS';

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
//     url: Base_URL+'get-all-ads',
//     headers
//   });
// export const getAllCompanies = () => dispatch => {
//   axios
//     // .get(Base_URL+'get-all-companies')
//     .get(Base_URL+'get-all-companies')
//     .then(res => {
//
//       dispatch({
//         type: GET_ALL_COMPANIES,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//
//       //   dispatch({
//       //     type: LOGIN_ERROR,
//       //     payload: err.response.data
//       //   });
//     });
// };
export const getAds = () => dispatch => {
  axios
    // .get(Base_URL+'get-all-ads')
    .get(Base_URL+'get-all-ads')
    .then(res => {
      dispatch({
        type: GET_ADS,
        payload: res.data
      });
      // let data=JSON.parse(JSON.stringify(res.data))
       for(let i=0 ; i<res.data.length; i++)
      {
           res.data[i].time_from=moment(res.data[i].time_from).format('YYYY-MM-DD hh:mm');
           res.data[i].time_to=moment(res.data[i].time_to).format('YYYY-MM-DD hh:mm');
      }
    })
      .then(() => dispatch(getAllSurveys()))
    .catch(err => {
      console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const addAds = newContact => dispatch => {
newContact.time_from = new Date(newContact.time_from);
newContact.time_to = new Date(newContact.time_to);
// newContact.ad_type = newContact.type;
  axios
    // .post(Base_URL+'create-ads', newContact)
    .post(Base_URL+'create-ad', newContact)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Ad Created', variant:"success"}));
        }
        else if(res.request.status===204)
        {
            dispatch(showMessage({message: 'Ad Overlap with exsisting Ad date', variant:"error"}));
        }
      dispatch({
        type: ADD_ADS
      });
    })
    .then(() => dispatch(getAds()))
    .catch(err => {
      console.log('err', err);
        dispatch(showMessage({message: 'Error!'+err, variant:"error"}));
        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const updateAds = (updateInfo, id) => dispatch => {
// .put(Base_URL+'update-ad/${updateInfo.id}`,updateInfo)

  axios
    .put(Base_URL+`update-ad/${updateInfo.id}`, updateInfo )
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Ad Updated', variant:"success"}));
        }
        else if(res.request.status===204)
        {
            dispatch(showMessage({message: 'Ad Overlap with exsisting Ad date', variant:"error"}));
        }
      dispatch({
        type: UPDATE_ADS
      });
    })
    .then(() => dispatch(getAds()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: 'Error!'+err, variant:"error"}));

        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const removeAds = id => dispatch => {
  axios
    .delete(Base_URL+`delete-ad/${id}`)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Ad Deleted', variant: "success"}));
        }
      dispatch({
        type: REMOVE_ADS
      });
    })
    .then(() => dispatch(getAds()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: 'Error!'+err, variant:"error"}));

        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};

// export function updateContact(contact) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().contactsApp.contacts;

//     const request = axios.post(Base_URL+`update-ads/${id}`, {
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

//     const request = axios.post(Base_URL+'create-ads', {
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

//     const request = axios.post(Base_URL+`delete-ads/${id}`, {
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
      ]).then(() => dispatch(getAds(routeParams)))
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
      ]).then(() => dispatch(getAds(routeParams)))
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
      ]).then(() => dispatch(getAds(routeParams)))
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
      ]).then(() => dispatch(getAds(routeParams)))
    );
  };
}

export const getAllSurveys = () => dispatch => {
    axios
    // .get(Base_URL+'get-all-companies')
        .get(Base_URL+'get-all-surveys')
        .then(res => {

            dispatch({
                type: GET_ALL_SURVEYS,
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
      ]).then(() => dispatch(getAds(routeParams)))
    );
  };
}
