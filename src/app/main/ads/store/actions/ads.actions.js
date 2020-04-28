import axios from 'axios';
import {Base_URL} from '../../../../server'
import moment from "moment";
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
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

let selectedSearch= {
    fromSearch:'yyyy-mm-dd',
    toSearch:'yyyy-mm-dd'
};
export function reset() {
    selectedSearch.fromSearch='yyyy-mm-dd';
    selectedSearch.toSearch='yyyy-mm-dd';
}
export function getAds()  {
    return (
    getAdsPaginationData(0,20,'','')
    );
}
export const addAds = newAd => dispatch => {
    newAd.startDate = new Date(newAd.startDate);
    newAd.endDate = new Date(newAd.endDate);
    newAd.startTime = new Date(newAd.startTime);
    newAd.endTime = new Date(newAd.endTime);
    axios
    // .post(Base_URL+'create-ads', newAd)
        .post(Base_URL + 'create-ad', newAd)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Ad Created', variant: "success"}));
            } else if (res.request.status === 204) {
                dispatch(showMessage({message: 'Ad Overlap with exsisting Ad date', variant: "error"}));
            }
            dispatch({
                type: ADD_ADS
            });
        })
        .then(() => dispatch(getAds()))
        .catch(err => {
            console.log('err', err);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const updateAds = (updateInfo, id) => dispatch => {
// .put(Base_URL+'update-ad/${updateInfo.id}`,updateInfo)
    updateInfo.startDate = new Date(updateInfo.startDate);
    updateInfo.endDate = new Date(updateInfo.endDate);
    updateInfo.startTime = new Date(updateInfo.startTime);
    updateInfo.endTime = new Date(updateInfo.endTime);
    axios
        .put(Base_URL + `update-ad/${updateInfo.id}`, updateInfo)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Ad Updated', variant: "success"}));
            } else if (res.request.status === 204) {
                dispatch(showMessage({message: 'Ad Overlap with exsisting Ad date', variant: "error"}));
            }
            dispatch({
                type: UPDATE_ADS
            });
        })
        .then(() => dispatch(getAds()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));

            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeAds = id => dispatch => {
    axios
        .delete(Base_URL + `delete-ad/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Ad Deleted', variant: "success"}));
            }
            dispatch({
                type: REMOVE_ADS
            });
        })
        .then(() => dispatch(getAds()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));

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
        const {routeParams} = getState().adsApp.ads;

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
        const {routeParams} = getState().adsApp.ads;

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
        const {routeParams} = getState().adsApp.ads;

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
        .get(Base_URL + 'get-all-surveys')
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
        const {routeParams} = getState().adsApp.ads;

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

export const getAdsPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
    if(isNaN(pageSize)|| pageSize===-1){
        pageSize='All';
        page=0;
        sorted=[];
    }
    let sortingName;
    let sortingOrder;
    if(sorted.length===0 || sorted===''){
        sortingName='Undefined';
        sortingOrder='Undefined';
    } else {
        if(sorted[0].desc){
            sortingName = sorted[0].id;
            sortingOrder= 'DESC';
        } else {
            sortingName = sorted[0].id;
            sortingOrder= 'ASC';
        }
    }
    let querys;
        if((selectedSearch.fromSearch!=='yyyy-mm-dd' && selectedSearch.fromSearch!=='') || (selectedSearch.toSearch!=='yyyy-mm-dd' && selectedSearch.toSearch!=='')){
            if(selectedSearch.fromSearch==='yyyy-mm-dd'||selectedSearch.fromSearch===''){
                selectedSearch.fromSearch=moment('1970-01-01').format('YYYY-MM-DD');
            }
            if(selectedSearch.toSearch==='yyyy-mm-dd'||selectedSearch.toSearch===''){
                selectedSearch.toSearch=moment(new Date()).format('YYYY-MM-DD');
            }
            querys = 'get-all-ads-by-search-paging/' + selectedSearch.fromSearch + '/' + selectedSearch.toSearch + '/' + page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
        } else {
            querys = 'get-all-ads-by-paging/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
        }
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_ADS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .catch(err => {
            console.log('err', err);
            if (err.request.status === 401) {
                dispatch(showMessage({message: 'Your session expired. Please login again.', variant: "error"}));
                store.dispatch(logoutUser());
            }
        });
};

export function searchAds(state) {

    selectedSearch=state;

    return (
        getAdsPaginationData(0,20,'','')
    );
}