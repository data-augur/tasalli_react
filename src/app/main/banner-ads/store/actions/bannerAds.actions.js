import axios from 'axios';
import {Base_URL} from '../../../../server'
import moment from "moment";
import {showMessage} from 'app/store/actions/fuse';
// import Resizer from 'react-image-file-resizer';
import Compressor from 'compressorjs';
import {getAds, UPDATE_ADS} from "../../../ads/store/actions";


export const GET_BANNER_ADS = '[BANNER ADS APP] GET BANNER ADS';
export const ADD_BANNER_ADS = '[BANNER ADS APP] ADD BANNER ADS';
export const UPDATE_BANNER_ADS = '[BANNER ADS APP] UPDATE BANNER ADS';
export const REMOVE_BANNER_ADS = '[BANNER ADS APP] REMOVE BANNER ADS';
export const GET_ALL_NOTIFICATIONS = '[BANNER ADS APP] GET ALL NOTIFICATIONS';
export const SET_SEARCH_TEXT = '[BANNER ADS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_BANNER_ADS =
    '[ADS APP] TOGGLE IN SELECTED ADS';
export const SELECT_ALL_BANNER_ADS = '[BANNER ADS APP] SELECT ALL BANNER ADS';
export const DESELECT_ALL_BANNER_ADS = '[BANNER ADS APP] DESELECT ALL BANNER ADS';
export const OPEN_NEW_BANNER_AD_DIALOG = '[BANNER ADS APP] OPEN NEW BANNER AD DIALOG';
export const CLOSE_NEW_BANNER_AD_DIALOG =
    '[ADS APP] CLOSE NEW BANNER AD DIALOG';
export const OPEN_EDIT_BANNER_AD_DIALOG =
    '[ADS APP] OPEN EDIT BANNER AD DIALOG';
export const CLOSE_EDIT_BANNER_AD_DIALOG =
    '[ADS APP] CLOSE EDIT BANNER AD DIALOG';

// export const REMOVE_ADS = '[ADS APP] REMOVE ADS';
export const TOGGLE_STARRED_AD = '[ADS APP] TOGGLE STARRED AD';
export const TOGGLE_STARRED_ADS = '[ADS APP] TOGGLE STARRED ADS';
export const SET_ADS_STARRED = '[ADS APP] SET ADS STARRED ';

let selectedSearch= {
    searchType:'Undefined',
    fromSearch:'yyyy-mm-dd',
    toSearch:'yyyy-mm-dd'
};
export function reset() {
    selectedSearch.fromSearch='yyyy-mm-dd';
    selectedSearch.toSearch='yyyy-mm-dd';
}
export const getAllNotifications = () => dispatch => {
    let query = 'get-all-app-notifications';
    axios
        .get(Base_URL + query)
        .then(res => {
            dispatch({
                type: GET_ALL_NOTIFICATIONS,
                payload: res.data
            });
        })
        .catch(err => {


        });
};
export function getBannerAds()  {
    return (
    getBannerAdsPaginationData(0,20,'','')
    );
}

export const addBannerAds = newBannerAd => dispatch => {
    newBannerAd.startTime = new Date(newBannerAd.startTime);
    newBannerAd.endTime = new Date(newBannerAd.endTime);
    let file= newBannerAd.images;
    let formdata= new FormData();
    formdata.append('image', file);
    formdata.append('name', newBannerAd.name);
    formdata.append('startTime', newBannerAd.startTime);
    formdata.append('endTime', newBannerAd.endTime);
    formdata.append('duration', newBannerAd.duration);
    formdata.append('notification_id', newBannerAd.notification_id);

    axios({
        url: Base_URL+'create-banner-ad',
        method: "POST",
        data: formdata
    })
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Banner Ad Created', variant: "success"}));
            }
            dispatch({
                type: ADD_BANNER_ADS
            });
        })
        .then(() => dispatch(getBannerAds()))
        .catch(err => {
            console.log('err', err);
            dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
        })
};
export const updateBannerAds = (updateInfo) => dispatch => {
    updateInfo.startTime = new Date(updateInfo.startTime);
    updateInfo.endTime = new Date(updateInfo.endTime);
    let formdata= new FormData();
    if(updateInfo.images){
        let file= updateInfo.images;
        formdata.append('image', file);
        formdata.append('name', updateInfo.name);
        formdata.append('startTime', updateInfo.startTime);
        formdata.append('endTime', updateInfo.endTime);
        formdata.append('duration', updateInfo.duration);
        formdata.append('notification_id', updateInfo.notification_id);
        formdata.append('id', updateInfo.id);
        axios({
            url: Base_URL+`update-banner-ad/${updateInfo.id}`,
            method: "PUT",
            data: formdata
        })
            .then(res => {
                if (res.request.status === 200) {
                    dispatch(showMessage({message: 'Banner Ad Updated', variant: "success"}));
                }
                dispatch({
                    type: UPDATE_BANNER_ADS
                });
            })
            .then(() => dispatch(getBannerAds()))
            .catch(err => {
                console.log('err', err);
                dispatch(showMessage({message: 'Error!' + err, variant: "error"}));
            });
    } else {
        axios
            .put(Base_URL + `update-banner-ad/${updateInfo.id}`, updateInfo)
            .then(res => {
                if (res.request.status === 200) {
                    dispatch(showMessage({message: 'Banner Ad Updated', variant: "success"}));
                }
                dispatch({
                    type: UPDATE_BANNER_ADS
                });
            })
            .then(() => dispatch(getBannerAds()))
            .catch(err => {
                console.log('err', err.response);
                dispatch(showMessage({message: 'Error!' + err, variant: "error"}));

                //   dispatch({
                //     type: LOGIN_ERROR,
                //     payload: err.response.data
                //   });
            });
    }
};
export const removeBannerAds = id => dispatch => {
    axios
        .delete(Base_URL + `delete-banner-ad/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Banner Ad Deleted', variant: "success"}));
            }
            dispatch({
                type: REMOVE_BANNER_ADS
            });
        })
        .then(() => dispatch(getBannerAds()))
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
        type: TOGGLE_IN_SELECTED_BANNER_ADS,
        adId
    };
}

export function selectAllBannerAds() {
    return {
        type: SELECT_ALL_BANNER_ADS
    };
}

export function deSelectAllBannerAds() {
    return {
        type: DESELECT_ALL_BANNER_ADS
    };
}

export function openNewBannerAdDialog() {
    return {
        type: OPEN_NEW_BANNER_AD_DIALOG
    };
}

export function closeNewBannerAdDialog() {
    return {
        type: CLOSE_NEW_BANNER_AD_DIALOG
    };
}

export function openEditBannerAdDialog(data) {
    return {
        type: OPEN_EDIT_BANNER_AD_DIALOG,
        data
    };
}

export function closeEditBannerAdDialog() {
    return {
        type: CLOSE_EDIT_BANNER_AD_DIALOG
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
            ]).then(() => dispatch(getBannerAds(routeParams)))
        );
    };
}

export function toggleStarredBannerAds(adIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().bannerAdsApp.bannerAds;

        const request = axios.post('/api/ads-app/toggle-starred-ads', {
            adIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_ADS
                }),
                dispatch({
                    type: DESELECT_ALL_BANNER_ADS
                }),
            ]).then(() => dispatch(getBannerAds(routeParams)))
        );
    };
}

export function setBannerAdsStarred(adIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().bannerAdsApp.ads;

        const request = axios.post('/api/ads-app/set-ads-starred', {
            adIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_ADS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_BANNER_ADS
                }),
            ]).then(() => dispatch(getBannerAds(routeParams)))
        );
    };
}

export function setBannerAdsUnstarred(adIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().bannerAdsApp.ads;

        const request = axios.post('/api/ads-app/set-ads-unstarred', {
            adIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_ADS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_BANNER_ADS
                }),
            ]).then(() => dispatch(getBannerAds(routeParams)))
        );
    };
}

export const getBannerAdsPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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
        if(selectedSearch.searchType!=='Undefined' || (selectedSearch.fromSearch!=='yyyy-mm-dd' && selectedSearch.fromSearch!=='') || (selectedSearch.toSearch!=='yyyy-mm-dd' && selectedSearch.toSearch!=='')){
            if(selectedSearch.fromSearch==='yyyy-mm-dd'||selectedSearch.fromSearch===''){
                selectedSearch.fromSearch=moment('1970-01-01').format('YYYY-MM-DD');
            }
            querys = 'get-all-banner-ads-by-search-paging/' + selectedSearch.fromSearch + '/' + selectedSearch.toSearch + '/' + page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
        } else {
            querys = 'get-all-banner-ads-by-paging/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
        }
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_BANNER_ADS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllNotifications()))
        .catch(err => {
            console.log('err', err);
        });
};

export function searchAds(state) {

    selectedSearch=state;

    return (
        getBannerAdsPaginationData(0,20,'','')
    );
}