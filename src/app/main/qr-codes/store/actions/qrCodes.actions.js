import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
import {GET_ALL_LOGS_PHONE_NUMBERS} from "../../../logs/store/actions";

export const GET_QRCODES = '[QRCODES APP] GET QRCODES';
export const GET_ALL_COMPANIES = '[QRCODES APP] GET COMPANIES';
export const GET_ALL_QR_CODES_PHONE_NUMBERS = '[QRCODES APP] GET PHONENUMBERS';


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
export function getQrCodes() {

    return (
    getQrCodesPaginationData(0,20,'','')
    );
}



export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedQrCodes(qrcodeId) {
    return {
        type: TOGGLE_IN_SELECTED_QRCODES,
        qrcodeId
    };
}

export function selectAllQrCodes() {
    return {
        type: SELECT_ALL_QRCODES
    };
}

export function deSelectAllQrCodes() {
    return {
        type: DESELECT_ALL_QRCODES
    };
}

export function openNewQrCodeDialog() {
    return {
        type: OPEN_NEW_QRCODE_DIALOG
    };
}

export function closeNewQrCodeDialog() {
    return {
        type: CLOSE_NEW_QRCODE_DIALOG
    };
}

export function openEditQrCodeDialog(data) {
    return {
        type: OPEN_EDIT_QRCODE_DIALOG,
        data
    };
}

export function closeEditQrCodeDialog() {
    return {
        type: CLOSE_EDIT_QRCODE_DIALOG
    };
}



export function toggleStarredQrCode(qrcodeId) {
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
            ]).then(() => dispatch(getQrCodes(routeParams)))
        );
    };
}

export function toggleStarredQrCodes(qrcodeIds) {
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
            ]).then(() => dispatch(getQrCodes(routeParams)))
        );
    };
}

export function setQrCodesStarred(qrcodeIds) {
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
            ]).then(() => dispatch(getQrCodes(routeParams)))
        );
    };
}

export function setQrCodesUnstarred(qrcodeIds) {
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

            ]).then(() => dispatch(getQrCodes(routeParams)))
        );
    };
}

export const getQrCodesPaginationData = (page, pageSize, sorted, filtered) => dispatch => {

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
            getQrCodesPaginationData(0,20,'','')
        );
}