import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';

export const GET_QRCODES = '[QRCODES APP] GET QRCODES';
export const GET_ALL_QR_CODES_PHONE_NUMBERS = '[QRCODES APP] GET PHONENUMBERS';
export const ADD_QRCODE = '[QRCODES APP] ADD QRCODE';
export const UPDATE_QRCODE = '[QRCODES APP] UPDATE QRCODE';
export const REMOVE_QRCODE = '[QRCODES APP] REMOVE QRCODE';

export const SET_SEARCH_TEXT = '[QRCODES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_QRCODES =
    '[QRCODES APP] TOGGLE IN SELECTED QRCODES';
export const SELECT_ALL_QRCODES = '[QRCODES APP] SELECT ALL QRCODES';
export const DESELECT_ALL_QRCODES = '[QRCODES APP] DESELECT ALL QRCODES';
export const OPEN_NEW_QRCODE_DIALOG = '[QRCODES APP] OPEN NEW QRCODE DIALOG';
export const CLOSE_NEW_QRCODE_DIALOG =
    '[QRCODES APP] CLOSE NEW QRCODE DIALOG';
export const OPEN_EDIT_QRCODE_DIALOG =
    '[QRCODES APP] OPEN EDIT QRCODE DIALOG';
export const CLOSE_EDIT_QRCODE_DIALOG =
    '[QRCODES APP] CLOSE EDIT QRCODE DIALOG';

export const REMOVE_QRCODES = '[QRCODES APP] REMOVE QRCODES';
export const TOGGLE_STARRED_QRCODE = '[QRCODES APP] TOGGLE STARRED QRCODES';
export const TOGGLE_STARRED_QRCODES = '[QRCODES APP] TOGGLE STARRED QRCODES';
export const SET_QRCODES_STARRED = '[QRCODES APP] SET QRCODES STARRED ';

let selectedSearch= {
    phoneNumber:'Undefined',
    code_type:'Undefined',
    searchDate:'Undefined'
};
export function reset() {
    selectedSearch.phoneNumber='Undefined';
    selectedSearch.code_type='Undefined';
    selectedSearch.searchDate='Undefined';
}
export const getAllQRCodePhoneNumbers = () => dispatch => {
    let query = 'get-all-qr-codes-phone-numbers';
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_QR_CODES_PHONE_NUMBERS,
                payload: res.data
            });
        })
        .catch(err => {

        });
};
export function getQrcodes() {

    return (
    getQrcodesPaginationData(0,20,'','')
    );
}
export const addQrcode = newQrcode => dispatch => {

    axios
        .post(Base_URL + 'create-qrcode', newQrcode)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Qrcode Created', variant: "success"}));
            }
            dispatch({
                type: ADD_QRCODE
            });
        })
        .then(() => dispatch(getQrcodes()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err);

        });
};
export const updateQrcode = (updateInfo, id) => dispatch => {

    axios
        .put(
            Base_URL + `update-qrcode/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Qrcode Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_QRCODE
            });
        })
        .then(() => dispatch(getQrcodes()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));

        });
};
export const removeQrcode = id => dispatch => {
    axios
        .delete(Base_URL + `delete-qrcode/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Qrcode Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_QRCODE
            });
        })
        .then(() => dispatch(getQrcodes()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));

        });
};


export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedQrcodes(qrcodeId) {
    return {
        type: TOGGLE_IN_SELECTED_QRCODES,
        qrcodeId
    };
}

export function selectAllQrcodes() {
    return {
        type: SELECT_ALL_QRCODES
    };
}

export function deSelectAllQrcodes() {
    return {
        type: DESELECT_ALL_QRCODES
    };
}

export function openNewQrcodeDialog() {
    return {
        type: OPEN_NEW_QRCODE_DIALOG
    };
}

export function closeNewQrcodeDialog() {
    return {
        type: CLOSE_NEW_QRCODE_DIALOG
    };
}

export function openEditQrcodeDialog(data) {
    return {
        type: OPEN_EDIT_QRCODE_DIALOG,
        data
    };
}

export function closeEditQrcodeDialog() {
    return {
        type: CLOSE_EDIT_QRCODE_DIALOG
    };
}


export function removeQrcodes(qrcodeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().qrcodesApp.qrcodes;

        const request = axios.post('/api/qrcodes-app/remove-qrcodes', {
            qrcodeIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_QRCODES
                }),
                dispatch({
                    type: DESELECT_ALL_QRCODES
                })
            ]).then(() => dispatch(getQrcodes(routeParams)))
        );
    };
}

export function toggleStarredQrcode(qrcodeId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().qrcodesApp.qrcodes;

        const request = axios.post('/api/qrcodes-app/toggle-starred-qrcode', {
            qrcodeId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_QRCODE
                }),
            ]).then(() => dispatch(getQrcodes(routeParams)))
        );
    };
}

export function toggleStarredQrcodes(qrcodeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().qrcodesApp.qrcodes;

        const request = axios.post('/api/qrcodes-app/toggle-starred-qrcodes', {
            qrcodeIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_QRCODES
                }),
                dispatch({
                    type: DESELECT_ALL_QRCODES
                }),
            ]).then(() => dispatch(getQrcodes(routeParams)))
        );
    };
}

export function setQrcodesStarred(qrcodeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().qrcodesApp.qrcodes;

        const request = axios.post('/api/qrcodes-app/set-qrcodes-starred', {
            qrcodeIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_QRCODES_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_QRCODES
                }),
            ]).then(() => dispatch(getQrcodes(routeParams)))
        );
    };
}

export function setQrcodesUnstarred(qrcodeIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().qrcodesApp.qrcodes;

        const request = axios.post('/api/qrcodes-app/set-qrcodes-unstarred', {
            qrcodeIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_QRCODES_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_QRCODES
                }),

            ]).then(() => dispatch(getQrcodes(routeParams)))
        );
    };
}

export const getQrcodesPaginationData = (page, pageSize, sorted, filtered) => dispatch => {

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
    let querys = 'get-all-qr-codes-by-search-paging/'+selectedSearch.phoneNumber + '/' + selectedSearch.code_type + '/' + selectedSearch.searchDate +'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;

    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_QRCODES,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllQRCodePhoneNumbers()))
        .catch(err => {
            console.log('err', err);
        });
};

export function searchQrCodes(state) {

    if(state.phoneNumber===''){
        state.phoneNumber='Undefined';
    }
    if(state.code_type===''){
        state.code_type='Undefined';
    }
    if(state.searchDate==='yyyy-mm-dd'||state.searchDate===''){
        state.searchDate='Undefined';
    }
    selectedSearch=state;
    return (
        getQrcodesPaginationData(0,20,'','')
    );
}