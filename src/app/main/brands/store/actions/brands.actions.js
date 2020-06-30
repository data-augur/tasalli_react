import axios from 'axios';
import {Base_URL} from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';

export const GET_BRANDS = '[BRANDS APP] GET BRANDS';
export const GET_ALL_COMPANIES = '[BRANDS APP] GET COMPANIES';
export const ADD_BRAND = '[BRANDS APP] ADD BRAND';
export const UPDATE_BRAND = '[BRANDS APP] UPDATE BRAND';
export const REMOVE_BRAND = '[BRANDS APP] REMOVE BRAND';

export const SET_SEARCH_TEXT = '[BRANDS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_BRANDS =
    '[BRANDS APP] TOGGLE IN SELECTED BRANDS';
export const SELECT_ALL_BRANDS = '[BRANDS APP] SELECT ALL BRANDS';
export const DESELECT_ALL_BRANDS = '[BRANDS APP] DESELECT ALL BRANDS';
export const OPEN_NEW_BRAND_DIALOG = '[BRANDS APP] OPEN NEW BRAND DIALOG';
export const CLOSE_NEW_BRAND_DIALOG =
    '[BRANDS APP] CLOSE NEW BRAND DIALOG';
export const OPEN_EDIT_BRAND_DIALOG =
    '[BRANDS APP] OPEN EDIT BRAND DIALOG';
export const CLOSE_EDIT_BRAND_DIALOG =
    '[BRANDS APP] CLOSE EDIT BRAND DIALOG';

export const REMOVE_BRANDS = '[BRANDS APP] REMOVE BRANDS';
export const TOGGLE_STARRED_BRAND = '[BRANDS APP] TOGGLE STARRED BRANDS';
export const TOGGLE_STARRED_BRANDS = '[BRANDS APP] TOGGLE STARRED BRANDS';
export const SET_BRANDS_STARRED = '[BRANDS APP] SET BRANDS STARRED ';

let selectedCompanyId = 'Undefined';

export function reset() {
    selectedCompanyId = 'Undefined';
}

export const getAllCompanies = () => dispatch => {
    let query;
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-companies-by-id/' + id;
    } else {
        query = 'get-all-companies';
    }
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_COMPANIES,
                payload: res.data
            });
        })
        .catch(err => {


        });
};

export function getBrands() {

    return (
        getBrandsPaginationData(0, 20, '', '')
    );
}

export const addBrand = newBrand => dispatch => {
    let file = newBrand.image;
    let formdata = new FormData();
    formdata.append('image', file);
    formdata.append('companyId', newBrand.companyId);
    formdata.append('companyName', newBrand.companyName);
    formdata.append('name', newBrand.name);
    formdata.append('id', newBrand.id);

    axios
        .post(Base_URL + 'create-brand', formdata)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Brand Created', variant: "success"}));
            }
            dispatch({
                type: ADD_BRAND
            });
        })
        .then(() => dispatch(getBrands()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err);

        });
};
export const updateBrand = (updateInfo, id) => dispatch => {
    let file = updateInfo.image;
    let formdata = new FormData();
    formdata.append('image', file);
    formdata.append('companyId', updateInfo.companyId);
    formdata.append('companyName', updateInfo.companyName);
    formdata.append('name', updateInfo.name);
    formdata.append('id', updateInfo.id);

    axios
        .put(
            Base_URL + `update-brand/${updateInfo.id}`,
            formdata
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Brand Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_BRAND
            });
        })
        .then(() => dispatch(getBrands()))
        .catch(err => {
            console.log('err', err.response);
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));

        });
};
export const removeBrand = id => dispatch => {
    axios
        .delete(Base_URL + `delete-brand/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Brand Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_BRAND
            });
        })
        .then(() => dispatch(getBrands()))
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

export function toggleInSelectedBrands(brandId) {
    return {
        type: TOGGLE_IN_SELECTED_BRANDS,
        brandId
    };
}

export function selectAllBrands() {
    return {
        type: SELECT_ALL_BRANDS
    };
}

export function deSelectAllBrands() {
    return {
        type: DESELECT_ALL_BRANDS
    };
}

export function openNewBrandDialog() {
    return {
        type: OPEN_NEW_BRAND_DIALOG
    };
}

export function closeNewBrandDialog() {
    return {
        type: CLOSE_NEW_BRAND_DIALOG
    };
}

export function openEditBrandDialog(data) {
    return {
        type: OPEN_EDIT_BRAND_DIALOG,
        data
    };
}

export function closeEditBrandDialog() {
    return {
        type: CLOSE_EDIT_BRAND_DIALOG
    };
}


export function removeBrands(brandIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().brandsApp.brands;

        const request = axios.post('/api/brands-app/remove-brands', {
            brandIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_BRANDS
                }),
                dispatch({
                    type: DESELECT_ALL_BRANDS
                })
            ]).then(() => dispatch(getBrands(routeParams)))
        );
    };
}

export function toggleStarredBrand(brandId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().brandsApp.brands;

        const request = axios.post('/api/brands-app/toggle-starred-brand', {
            brandId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_BRAND
                }),
            ]).then(() => dispatch(getBrands(routeParams)))
        );
    };
}

export function toggleStarredBrands(brandIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().brandsApp.brands;

        const request = axios.post('/api/brands-app/toggle-starred-brands', {
            brandIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_BRANDS
                }),
                dispatch({
                    type: DESELECT_ALL_BRANDS
                }),
            ]).then(() => dispatch(getBrands(routeParams)))
        );
    };
}

export function setBrandsStarred(brandIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().brandsApp.brands;

        const request = axios.post('/api/brands-app/set-brands-starred', {
            brandIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_BRANDS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_BRANDS
                }),
            ]).then(() => dispatch(getBrands(routeParams)))
        );
    };
}

export function setBrandsUnstarred(brandIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().brandsApp.brands;

        const request = axios.post('/api/brands-app/set-brands-unstarred', {
            brandIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_BRANDS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_BRANDS
                }),

            ]).then(() => dispatch(getBrands(routeParams)))
        );
    };
}

export const getBrandsPaginationData = (page, pageSize, sorted, filtered) => dispatch => {

    if (isNaN(pageSize) || pageSize === -1) {
        pageSize = 'All';
        page = 0;
        sorted = [];
    }
    let sortingName;
    let sortingOrder;
    if (sorted.length === 0 || sorted === '') {
        sortingName = 'Undefined';
        sortingOrder = 'Undefined';
    } else {
        if (sorted[0].desc) {
            sortingName = sorted[0].id;
            sortingOrder = 'DESC';
        } else {
            sortingName = sorted[0].id;
            sortingOrder = 'ASC';
        }
    }
    let querys;
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        querys = 'get-all-brands-by-id-pagination/' + id + '/' + page + '/' + pageSize + '/' + sortingName + '/' + sortingOrder;
    } else if (selectedCompanyId !== 'Undefined') {
        querys = 'get-all-brands-by-id-pagination/' + selectedCompanyId + '/' + page + '/' + pageSize + '/' + sortingName + '/' + sortingOrder;
    } else {
        querys = 'get-all-brands-by-paging/' + page + '/' + pageSize + '/' + sortingName + '/' + sortingOrder;
    }
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_BRANDS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return ({});
        })
        .then(() => dispatch(getAllCompanies()))
        .catch(err => {
            console.log('err', err);
            if (err.request.status === 401) {
                dispatch(showMessage({message: 'Your session expired. Please login again.', variant: "error"}));
                store.dispatch(logoutUser());
            }
        });
};

export function searchBrandsByCompany(companyId) {

    if (companyId === '') {
        selectedCompanyId = 'Undefined';
    } else {
        selectedCompanyId = companyId
    }
    return (
        getBrandsPaginationData(0, 20, '', '')
    );
}