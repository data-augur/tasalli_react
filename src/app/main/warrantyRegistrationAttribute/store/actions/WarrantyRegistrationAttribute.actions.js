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

export const SET_SEARCH_TEXT = '[WARRANTYREGISTRATIONATTRIBUTES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_WARRANTYREGISTRATIONATTRIBUTES =
  '[WARRANTYREGISTRATIONATTRIBUTES APP] TOGGLE IN SELECTED WARRANTYREGISTRATIONATTRIBUTES';
export const SELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES = '[WARRANTYREGISTRATIONATTRIBUTES APP] SELECT ALL WARRANTYREGISTRATIONATTRIBUTES';
export const DESELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES = '[WARRANTYREGISTRATIONATTRIBUTES APP] DESELECT ALL WARRANTYREGISTRATIONATTRIBUTES';
export const OPEN_NEW_WARRANTYREGISTRATIONATTRIBUTE_DIALOG = '[WARRANTYREGISTRATIONATTRIBUTES APP] OPEN NEW WARRANTYREGISTRATIONATTRIBUTE DIALOG';
export const CLOSE_NEW_WARRANTYREGISTRATIONATTRIBUTE_DIALOG =
  '[WARRANTYREGISTRATIONATTRIBUTES APP] CLOSE NEW WARRANTYREGISTRATIONATTRIBUTE DIALOG';
export const OPEN_EDIT_WARRANTYREGISTRATIONATTRIBUTE_DIALOG =
  '[WARRANTYREGISTRATIONATTRIBUTES APP] OPEN EDIT WARRANTYREGISTRATIONATTRIBUTE DIALOG';
export const CLOSE_EDIT_WARRANTYREGISTRATIONATTRIBUTE_DIALOG =
  '[WARRANTYREGISTRATIONATTRIBUTES APP] CLOSE EDIT WARRANTYREGISTRATIONATTRIBUTE DIALOG';

export const REMOVE_WARRANTYREGISTRATIONATTRIBUTES = '[WARRANTYREGISTRATIONATTRIBUTES APP] REMOVE WARRANTYREGISTRATIONATTRIBUTES';
export const TOGGLE_STARRED_WARRANTYREGISTRATIONATTRIBUTE = '[WARRANTYREGISTRATIONATTRIBUTES APP] TOGGLE STARRED WARRANTYREGISTRATIONATTRIBUTE';
export const TOGGLE_STARRED_WARRANTYREGISTRATIONATTRIBUTES = '[WARRANTYREGISTRATIONATTRIBUTES APP] TOGGLE STARRED WARRANTYREGISTRATIONATTRIBUTES';
export const SET_WARRANTYREGISTRATIONATTRIBUTES_STARRED = '[WARRANTYREGISTRATIONATTRIBUTES APP] SET WARRANTYREGISTRATIONATTRIBUTES STARRED ';

// export function getWarrantyRegistrationAttributes(routeParams) {
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
export const addWarrantyRegistrationAttribute = newWarrantyRegistrationAttribute => dispatch => {
    axios
    // .post(Base_URL+'create-brand', newWarrantyRegistrationAttribute)
    .post(Base_URL+'create-warranty-registration-form-attribute', newWarrantyRegistrationAttribute)
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

// export function updateWarrantyRegistrationAttribute(warrantyRegistrationAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       warrantyRegistrationAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYREGISTRATIONATTRIBUTE
//         })
//       ]).then(() => dispatch(getWarrantyRegistrationAttributes(routeParams)))
//     );
//   };
// }
// export function addWarrantyRegistrationAttribute(newWarrantyRegistrationAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newWarrantyRegistrationAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_WARRANTYREGISTRATIONATTRIBUTE
//         })
//       ]).then(() => dispatch(getWarrantyRegistrationAttributes(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function toggleInSelectedWarrantyRegistrationAttributes(warrantyRegistrationAttributeId) {
  return {
    type: TOGGLE_IN_SELECTED_WARRANTYREGISTRATIONATTRIBUTES,
    warrantyRegistrationAttributeId
  };
}

export function selectAllWarrantyRegistrationAttributes() {
  return {
    type: SELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES
  };
}

export function deSelectAllWarrantyRegistrationAttributes() {
  return {
    type: DESELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES
  };
}

export function openNewWarrantyRegistrationAttributeDialog() {
  return {
    type: OPEN_NEW_WARRANTYREGISTRATIONATTRIBUTE_DIALOG
  };
}

export function closeNewWarrantyRegistrationAttributeDialog() {
  return {
    type: CLOSE_NEW_WARRANTYREGISTRATIONATTRIBUTE_DIALOG
  };
}

export function openEditWarrantyRegistrationAttributeDialog(data) {
  return {
    type: OPEN_EDIT_WARRANTYREGISTRATIONATTRIBUTE_DIALOG,
    data
  };
}

export function closeEditWarrantyRegistrationAttributeDialog() {
  return {
    type: CLOSE_EDIT_WARRANTYREGISTRATIONATTRIBUTE_DIALOG
  };
}

// export function updateWarrantyRegistrationAttribute(warrantyRegistrationAttribute) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

//     const request = axios.post('/api/warrantyRegistrationAttributes-app/update-warrantyRegistrationAttribute', {
//       warrantyRegistrationAttribute
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYREGISTRATIONATTRIBUTE
//         })
//       ]).then(() => dispatch(getWarrantyRegistrationAttributes(routeParams)))
//     );
//   };
// }

// export function removeWarrantyRegistrationAttribute(warrantyRegistrationAttributeId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       warrantyRegistrationAttributeId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_WARRANTYREGISTRATIONATTRIBUTE
//         })
//       ]).then(() => dispatch(getWarrantyRegistrationAttributes(routeParams)))
//     );
//   };
// }

export function removeWarrantyRegistrationAttributes(warrantyRegistrationAttributeIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

    const request = axios.post('/api/warrantyRegistrationAttributes-app/remove-warrantyRegistrationAttributes', {
      warrantyRegistrationAttributeIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_WARRANTYREGISTRATIONATTRIBUTES
        }),
        dispatch({
          type: DESELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES
        })
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
    );
  };
}

export function toggleStarredWarrantyRegistrationAttribute(warrantyRegistrationAttributeId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

    const request = axios.post('/api/warrantyRegistrationAttributes-app/toggle-starred-warrantyRegistrationAttribute', {
      warrantyRegistrationAttributeId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_WARRANTYREGISTRATIONATTRIBUTE
        }),
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
    );
  };
}

export function toggleStarredWarrantyRegistrationAttributes(warrantyRegistrationAttributeIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

    const request = axios.post('/api/warrantyRegistrationAttributes-app/toggle-starred-warrantyRegistrationAttributes', {
      warrantyRegistrationAttributeIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_WARRANTYREGISTRATIONATTRIBUTES
        }),
        dispatch({
          type: DESELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES
        }),
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
    );
  };
}

export function setWarrantyRegistrationAttributesStarred(warrantyRegistrationAttributeIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

    const request = axios.post('/api/warrantyRegistrationAttributes-app/set-warrantyRegistrationAttributes-starred', {
      warrantyRegistrationAttributeIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_WARRANTYREGISTRATIONATTRIBUTES_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES
        }),
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
    );
  };
}

export function setWarrantyRegistrationAttributesUnstarred(warrantyRegistrationAttributeIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyRegistrationAttributesApp.warrantyRegistrationAttributes;

    const request = axios.post('/api/warrantyRegistrationAttributes-app/set-warrantyRegistrationAttributes-unstarred', {
      warrantyRegistrationAttributeIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_WARRANTYREGISTRATIONATTRIBUTES_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_WARRANTYREGISTRATIONATTRIBUTES
        }),
      ]).then(() => dispatch(getWarrantyRegistrationAttribute(routeParams)))
    );
  };
}


