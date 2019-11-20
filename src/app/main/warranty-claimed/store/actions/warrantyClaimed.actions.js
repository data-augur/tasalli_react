import axios from 'axios';
import { Base_URL } from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
import moment from "moment";

export const GET_WARRANTYCLAIMED = '[GET_WARRANTYCLAIMED APP] GET GET_WARRANTYCLAIMED';
export const REMOVE_WARRANTYCLAIMED = '[GET_WARRANTYCLAIMED APP] REMOVE GET_WARRANTYCLAIMED';

export const SET_SEARCH_TEXT = '[WARRANTYCLAIMEDS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_WARRANTYCLAIMEDS =
  '[WARRANTYCLAIMEDS APP] TOGGLE IN SELECTED WARRANTYCLAIMEDS';
export const SELECT_ALL_WARRANTYCLAIMEDS = '[WARRANTYCLAIMEDS APP] SELECT ALL WARRANTYCLAIMEDS';
export const DESELECT_ALL_WARRANTYCLAIMEDS = '[WARRANTYCLAIMEDS APP] DESELECT ALL WARRANTYCLAIMEDS';
export const OPEN_NEW_WARRANTYCLAIMED_DIALOG = '[WARRANTYCLAIMEDS APP] OPEN NEW WARRANTYCLAIMED DIALOG';
export const CLOSE_NEW_WARRANTYCLAIMED_DIALOG =
  '[WARRANTYCLAIMEDS APP] CLOSE NEW WARRANTYCLAIMED DIALOG';
export const OPEN_EDIT_WARRANTYCLAIMED_DIALOG =
  '[WARRANTYCLAIMEDS APP] OPEN EDIT WARRANTYCLAIMED DIALOG';
export const CLOSE_EDIT_WARRANTYCLAIMED_DIALOG =
  '[WARRANTYCLAIMEDS APP] CLOSE EDIT WARRANTYCLAIMED DIALOG';

export const REMOVE_WARRANTYCLAIMEDS = '[WARRANTYCLAIMEDS APP] REMOVE WARRANTYCLAIMEDS';
export const TOGGLE_STARRED_WARRANTYCLAIMED = '[WARRANTYCLAIMEDS APP] TOGGLE STARRED WARRANTYCLAIMED';
export const TOGGLE_STARRED_WARRANTYCLAIMEDS = '[WARRANTYCLAIMEDS APP] TOGGLE STARRED WARRANTYCLAIMEDS';
export const SET_WARRANTYCLAIMEDS_STARRED = '[WARRANTYCLAIMEDS APP] SET WARRANTYCLAIMEDS STARRED ';

// export function getWarrantyClaimeds(routeParams) {
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

export const getWarrantyClaimed = () => dispatch => {
    let query;
    if(localStorage.getItem('companyId'))
    {
        let id=localStorage.getItem('companyId');
        query='get-all-warranty-claimed-by-id/'+id;
    }
    else
    {
        query='get-all-warranty-claimed';
    }
    axios
    .get(Base_URL+query)
    .then(res => {
        for(let i=0 ; i<res.data.length; i++)
        {
            res.data[i].date=moment(res.data[i].date).format('YYYY-MM-DD hh:mm');
        }

        dispatch({
        type: GET_WARRANTYCLAIMED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('err', err);
        dispatch(showMessage({message: err,variant: "error"}));
        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
export const removeWarrantyClaimed = id => dispatch => {

  axios
    .delete(Base_URL+`delete-warranty-claimed/${id}`)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Warranty Claim Removed',variant: "success"}));
        }
      dispatch({
        type: REMOVE_WARRANTYCLAIMED
      });
    })
    .then(() => dispatch(getWarrantyClaimed()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: err,variant: "error"}));
        //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};

// export function updateWarrantyClaimed(warrantyClaimed) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

//     const request = axios.post(Base_URL+`update-brand-user/${id}`, {
//       warrantyClaimed
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYCLAIMED
//         })
//       ]).then(() => dispatch(getWarrantyClaimeds(routeParams)))
//     );
//   };
// }
// export function addWarrantyClaimed(newWarrantyClaimed) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

//     const request = axios.post(Base_URL+'create-brand-user', {
//       newWarrantyClaimed
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_WARRANTYCLAIMED
//         })
//       ]).then(() => dispatch(getWarrantyClaimeds(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function toggleInSelectedWarrantyClaimeds(warrantyClaimedId) {
  return {
    type: TOGGLE_IN_SELECTED_WARRANTYCLAIMEDS,
    warrantyClaimedId
  };
}

export function selectAllWarrantyClaimeds() {
  return {
    type: SELECT_ALL_WARRANTYCLAIMEDS
  };
}

export function deSelectAllWarrantyClaimeds() {
  return {
    type: DESELECT_ALL_WARRANTYCLAIMEDS
  };
}

export function openNewWarrantyClaimedDialog() {
  return {
    type: OPEN_NEW_WARRANTYCLAIMED_DIALOG
  };
}

export function closeNewWarrantyClaimedDialog() {
  return {
    type: CLOSE_NEW_WARRANTYCLAIMED_DIALOG
  };
}

export function openEditWarrantyClaimedDialog(data) {
  return {
    type: OPEN_EDIT_WARRANTYCLAIMED_DIALOG,
    data
  };
}

export function closeEditWarrantyClaimedDialog() {
  return {
    type: CLOSE_EDIT_WARRANTYCLAIMED_DIALOG
  };
}

// export function updateWarrantyClaimed(warrantyClaimed) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

//     const request = axios.post('/api/warrantyClaimeds-app/update-warrantyClaimed', {
//       warrantyClaimed
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_WARRANTYCLAIMED
//         })
//       ]).then(() => dispatch(getWarrantyClaimeds(routeParams)))
//     );
//   };
// }

// export function removeWarrantyClaimed(warrantyClaimedId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

//     const request = axios.post(Base_URL+`delete-brand-user/${id}`, {
//       warrantyClaimedId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_WARRANTYCLAIMED
//         })
//       ]).then(() => dispatch(getWarrantyClaimeds(routeParams)))
//     );
//   };
// }

export function removeWarrantyClaimeds(warrantyClaimedIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

    const request = axios.post('/api/warrantyClaimeds-app/remove-warrantyClaimeds', {
      warrantyClaimedIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_WARRANTYCLAIMEDS
        }),
        dispatch({
          type: DESELECT_ALL_WARRANTYCLAIMEDS
        })
      ]).then(() => dispatch(getWarrantyClaimed(routeParams)))
    );
  };
}

export function toggleStarredWarrantyClaimed(warrantyClaimedId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

    const request = axios.post('/api/warrantyClaimeds-app/toggle-starred-warrantyClaimed', {
      warrantyClaimedId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_WARRANTYCLAIMED
        }),
      ]).then(() => dispatch(getWarrantyClaimed(routeParams)))
    );
  };
}

export function toggleStarredWarrantyClaimeds(warrantyClaimedIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

    const request = axios.post('/api/warrantyClaimeds-app/toggle-starred-warrantyClaimeds', {
      warrantyClaimedIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_WARRANTYCLAIMEDS
        }),
        dispatch({
          type: DESELECT_ALL_WARRANTYCLAIMEDS
        }),
      ]).then(() => dispatch(getWarrantyClaimed(routeParams)))
    );
  };
}

export function setWarrantyClaimedsStarred(warrantyClaimedIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

    const request = axios.post('/api/warrantyClaimeds-app/set-warrantyClaimeds-starred', {
      warrantyClaimedIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_WARRANTYCLAIMEDS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_WARRANTYCLAIMEDS
        }),
      ]).then(() => dispatch(getWarrantyClaimed(routeParams)))
    );
  };
}

export function setWarrantyClaimedsUnstarred(warrantyClaimedIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().warrantyClaimedsApp.warrantyClaimeds;

    const request = axios.post('/api/warrantyClaimeds-app/set-warrantyClaimeds-unstarred', {
      warrantyClaimedIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_WARRANTYCLAIMEDS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_WARRANTYCLAIMEDS
        }),
      ]).then(() => dispatch(getWarrantyClaimed(routeParams)))
    );
  };
}
