import axios from 'axios';
import { getUserData } from './user.actions';
import { Base_URL } from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';

export const GET_PRODUCTS = '[PRODUCTS APP] GET PRODUCTS';
export const GET_ALL_WARRANTY_REGISTRATION_FORM = '[PRODUCTS APP] GET WARRANTYREGISTRATIONFORM';
export const GET_ALL_WARRANTY_COMPLETION_FORM = '[PRODUCTS APP] GET WARRANTYCOMPLETIONFORM';
export const GET_ALL_WARRANTY_CLAIM_FORM = '[PRODUCTS APP] GET WARRANTYCLAIMFORM';
export const GET_ALL_BRANDS = '[PRODUCTS APP] GET BRANDS';
export const GET_ALL_COMPANIES = '[BRANDS APP] GET COMPANIES';
export const ADD_PRODUCT = '[PRODUCTS APP] ADD PRODUCT';
export const UPDATE_PRODUCT = '[PRODUCTS APP] UPDATE PRODUCT';
export const REMOVE_PRODUCT = '[PRODUCTS APP] REMOVE PRODUCT';

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


export const getAllWarrantyRegistration = () => dispatch => {
    let query;
    if(localStorage.getItem('companyId'))
    {
        let id=localStorage.getItem('companyId');
        query='get-all-warranty-registration-forms-by-id/'+id;
    }
    else
    {
        query='get-all-warranty-registration-forms';
    }
    axios
    .get(Base_URL+query)
    .then(res => {
      dispatch({
        type: GET_ALL_WARRANTY_REGISTRATION_FORM,
        payload: res.data
      });
    })
    .catch(err => {
    });
};
export const getAllWarrantyCompletion = () => dispatch => {
    let query;
    if(localStorage.getItem('companyId'))
    {
        let id=localStorage.getItem('companyId');
        query='get-all-warranty-completion-forms-by-id/'+id;
    }
    else
    {
        query='get-all-warranty-completion-forms';
    }
    axios
        .get(Base_URL+query)
        .then(res => {
            dispatch({
                type: GET_ALL_WARRANTY_COMPLETION_FORM,
                payload: res.data
            });
        })
        .catch(err => {
        });
};
export const getAllWarrantyClaim = () => dispatch => {
    let query;
    if(localStorage.getItem('companyId'))
    {
        let id=localStorage.getItem('companyId');
        query='get-all-warranty-claim-forms-by-id/'+id;
    }
    else
    {
        query='get-all-warranty-claim-forms';
    }
    axios
    // .get(Base_URL+'get-all-companies')
        .get(Base_URL+query)
        .then(res => {

            dispatch({
                type: GET_ALL_WARRANTY_CLAIM_FORM,
                payload: res.data
            });
        })
        .catch(err => {
        });
};
export const getAllBrand = () => dispatch => {
    let query;
    if(localStorage.getItem('companyId'))
    {
        let id=localStorage.getItem('companyId');
        query='get-all-brands-by-id/'+id;
    }
    else
    {
        query='get-all-brands';
    }
    axios
    // .get(Base_URL+'get-all-companies')
        .get(Base_URL+query)
        .then(res => {

            dispatch({
                type: GET_ALL_BRANDS,
                payload: res.data
            });
        })
        .catch(err => {
        });
};
export const getProducts = () => dispatch => {
    let query;
    if(localStorage.getItem('companyId'))
    {
        let id=localStorage.getItem('companyId');
        query='get-all-sku-by-id/'+id;
    }
    else
    {
        query='get-all-sku';
    }
  axios
    // .get(Base_URL+'get-all-brands')
    .get(Base_URL+query)   //Admin products  /${email}
    .then(res => {

      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    })
    .then(() => dispatch(getProducts()))
    .then(() => dispatch(getAllWarrantyRegistration()))
    .then(() => dispatch(getAllWarrantyCompletion()))
    .then(() => dispatch(getAllWarrantyClaim()))
    .then(() => dispatch(getAllBrand()))
    .catch(err => {
      console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const addProduct = newContact => dispatch => {
    console.log(newContact);
    axios
    // .post(Base_URL+'create-brand', newContact)
    .post(Base_URL+'create-sku', newContact)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Product Created',variant: "success"}));
        }
        else
        {
            dispatch(showMessage({message: 'SKU already exsist',variant: "success"}));
        }
      dispatch({
        type: ADD_PRODUCT
      });
    })
    .then(() => dispatch(getProducts()))
    .catch(err => {
        dispatch(showMessage({message: err,variant: "error"}));
        console.log('err', err);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const updateProduct = (updateInfo, id) => dispatch => {
    console.log("Object",updateInfo);

  axios
    .put(
        Base_URL+`update-sku/${updateInfo.id}`,
      updateInfo
    )
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Product Updated',variant: "success"}));
        }
      dispatch({
        type: UPDATE_PRODUCT
      });
    })
    .then(() => dispatch(getProducts()))
    .catch(err => {
        dispatch(showMessage({message: err,variant: "error"}));
        console.log('err', err.response);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const removeProduct = id => dispatch => {
  axios
    .delete(Base_URL+`delete-sku/${id}`)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Product Removed',variant: "success"}));
        }
      dispatch({
        type: REMOVE_PRODUCT
      });
    })
    .then(() => dispatch(getProducts()))
    .catch(err => {
        dispatch(showMessage({message: err,variant: "error"}));
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
      ]).then(() => dispatch(getProducts(routeParams)))
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
      ]).then(() => dispatch(getProducts(routeParams)))
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
      ]).then(() => dispatch(getProducts(routeParams)))
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
      ]).then(() => dispatch(getProducts(routeParams)))
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
      ]).then(() => dispatch(getProducts(routeParams)))
    );
  };
}
