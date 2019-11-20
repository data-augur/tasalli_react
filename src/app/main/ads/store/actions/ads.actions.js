import axios from 'axios';
import { Base_URL } from '../../../../server'
import moment from "moment";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ADS = '[ADS APP] GET ADS';
 export const GET_ALL_SURVEYS = '[ADS APP] GET SURVEYS';
export const ADD_ADS = '[ADS APP] ADD ADS';
export const UPDATE_ADS = '[ADS APP] UPDATE ADS';
export const REMOVE_ADS = '[ADS APP] REMOVE ADS';

export const SET_SEARCH_TEXT = '[ADS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_ADS =
  '[ADS APP] TOGGLE IN SELECTED ADS';
export const SELECT_ALL_ADS = '[ADS APP] SELECT ALL ADS';
export const DESELECT_ALL_ADS = '[ADS APP] DESELECT ALL ADS';
export const OPEN_NEW_AD_DIALOG = '[ADS APP] OPEN NEW AD DIALOG';
export const CLOSE_NEW_AD_DIALOG =
  '[ADS APP] CLOSE NEW AD DIALOG';
export const OPEN_EDIT_AD_DIALOG =
  '[ADS APP] OPEN EDIT AD DIALOG';
export const CLOSE_EDIT_AD_DIALOG =
  '[ADS APP] CLOSE EDIT AD DIALOG';

// export const REMOVE_ADS = '[ADS APP] REMOVE ADS';
export const TOGGLE_STARRED_AD = '[ADS APP] TOGGLE STARRED AD';
export const TOGGLE_STARRED_ADS = '[ADS APP] TOGGLE STARRED ADS';
export const SET_ADS_STARRED = '[ADS APP] SET ADS STARRED ';

// export function getAds(routeParams) {
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
export const addAds = newAd => dispatch => {
newAd.time_from = new Date(newAd.time_from);
newAd.time_to = new Date(newAd.time_to);
// newAd.ad_type = newAd.type;
  axios
    // .post(Base_URL+'create-ads', newAd)
    .post(Base_URL+'create-ad', newAd)
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

// export function updateAd(ad) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().adsApp.ads;

//     const request = axios.post(Base_URL+`update-ads/${id}`, {
//       ad
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_AD
//         })
//       ]).then(() => dispatch(getAds(routeParams)))
//     );
//   };
// }
// export function addAd(newAd) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().adsApp.ads;

//     const request = axios.post(Base_URL+'create-ads', {
//       newAd
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_AD
//         })
//       ]).then(() => dispatch(getAds(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function toggleInSelectedAds(adId) {
  return {
    type: TOGGLE_IN_SELECTED_ADS,
    adId
  };
}

export function selectAllAds() {
  return {
    type: SELECT_ALL_ADS
  };
}

export function deSelectAllAds() {
  return {
    type: DESELECT_ALL_ADS
  };
}

export function openNewAdDialog() {
  return {
    type: OPEN_NEW_AD_DIALOG
  };
}

export function closeNewAdDialog() {
  return {
    type: CLOSE_NEW_AD_DIALOG
  };
}

export function openEditAdDialog(data) {
  return {
    type: OPEN_EDIT_AD_DIALOG,
    data
  };
}

export function closeEditAdDialog() {
  return {
    type: CLOSE_EDIT_AD_DIALOG
  };
}


// export function removeAds(adIds) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().adsApp.ads;
//
//     const request = axios.post('/api/ads-app/remove-ads', {
//       adIds
//     });
//
//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_ADS
//         }),
//         dispatch({
//           type: DESELECT_ALL_ADS
//         })
//       ]).then(() => dispatch(getAds(routeParams)))
//     );
//   };
// }

export function toggleStarredAd(adId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().adsApp.ads;

    const request = axios.post('/api/ads-app/toggle-starred-ad', {
      adId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_AD
        }),
      ]).then(() => dispatch(getAds(routeParams)))
    );
  };
}

export function toggleStarredAds(adIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().adsApp.ads;

    const request = axios.post('/api/ads-app/toggle-starred-ads', {
      adIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_ADS
        }),
        dispatch({
          type: DESELECT_ALL_ADS
        }),
      ]).then(() => dispatch(getAds(routeParams)))
    );
  };
}

export function setAdsStarred(adIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().adsApp.ads;

    const request = axios.post('/api/ads-app/set-ads-starred', {
      adIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_ADS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_ADS
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


        });
};

export function setAdsUnstarred(adIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().adsApp.ads;

    const request = axios.post('/api/ads-app/set-ads-unstarred', {
      adIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_ADS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_ADS
        }),
      ]).then(() => dispatch(getAds(routeParams)))
    );
  };
}
