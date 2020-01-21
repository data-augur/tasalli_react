import axios from 'axios';
import {Base_URL} from '../../../../server'
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

export const SET_SEARCH_TEXT = '[PRODUCTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_PRODUCTS =
    '[PRODUCTS APP] TOGGLE IN SELECTED PRODUCTS';
export const SELECT_ALL_PRODUCTS = '[PRODUCTS APP] SELECT ALL PRODUCTS';
export const DESELECT_ALL_PRODUCTS = '[PRODUCTS APP] DESELECT ALL PRODUCTS';
export const OPEN_NEW_PRODUCT_DIALOG = '[PRODUCTS APP] OPEN NEW PRODUCT DIALOG';
export const CLOSE_NEW_PRODUCT_DIALOG =
    '[PRODUCTS APP] CLOSE NEW PRODUCT DIALOG';
export const OPEN_EDIT_PRODUCT_DIALOG =
    '[PRODUCTS APP] OPEN EDIT PRODUCT DIALOG';
export const CLOSE_EDIT_PRODUCT_DIALOG =
    '[PRODUCTS APP] CLOSE EDIT PRODUCT DIALOG';

export const REMOVE_PRODUCTS = '[PRODUCTS APP] REMOVE PRODUCTS';
export const TOGGLE_STARRED_PRODUCT = '[PRODUCTS APP] TOGGLE STARRED PRODUCT';
export const TOGGLE_STARRED_PRODUCTS = '[PRODUCTS APP] TOGGLE STARRED PRODUCTS';
export const SET_PRODUCTS_STARRED = '[PRODUCTS APP] SET PRODUCTS STARRED ';

let selectedSearch= {
    brandId:'Undefined',
    companyId:'Undefined'
};
export function reset() {
    selectedSearch.brandId='Undefined';
    selectedSearch.companyId='Undefined';
}
export const getAllWarrantyRegistration = () => dispatch => {
    let query;
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-warranty-registration-forms-by-id/' + id;
    } else {
        query = 'get-all-warranty-registration-forms';
    }
    axios
        .get(Base_URL + query)
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
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-warranty-completion-forms-by-id/' + id;
    } else {
        query = 'get-all-warranty-completion-forms';
    }
    axios
        .get(Base_URL + query)
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
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-warranty-claim-forms-by-id/' + id;
    } else {
        query = 'get-all-warranty-claim-forms';
    }
    axios
        .get(Base_URL + query)
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
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        query = 'get-all-brands-by-id/' + id;
    } else {
        query = 'get-all-brands';
    }
    axios
        .get(Base_URL + query)
        .then(res => {

            dispatch({
                type: GET_ALL_BRANDS,
                payload: res.data
            });
        })
        .catch(err => {
        });
};
export const getAllCompanies = () => dispatch => {
    axios
        .get(Base_URL + 'get-all-companies')
        .then(res => {

            dispatch({
                type: GET_ALL_COMPANIES,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
};
export function getProducts()  {
    return (
        getProductsPaginationData(0,20,'','')
    );
    // let query;
    // if (localStorage.getItem('companyId')) {
    //     let id = localStorage.getItem('companyId');
    //     query = 'get-all-sku-by-id/' + id;
    // } else {
    //     query = 'get-all-sku';
    // }
    // axios
    //     .get(Base_URL + query)   //Admin products  /${email}
    //     .then(res => {
    //
    //         dispatch({
    //             type: GET_PRODUCTS,
    //             payload: res.data
    //         });
    //     })
    //     .then(() => dispatch(getAllWarrantyRegistration()))
    //     .then(() => dispatch(getAllWarrantyCompletion()))
    //     .then(() => dispatch(getAllWarrantyClaim()))
    //     .then(() => dispatch(getAllBrand()))
        // .catch(err => {
        //
        // });
}
export const addProduct = newProduct => dispatch => {

    axios
        .post(Base_URL + 'create-sku', newProduct)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Product Created', variant: "success"}));
            } else {
                dispatch(showMessage({message: 'SKU already exsist', variant: "success"}));
            }
            dispatch({
                type: ADD_PRODUCT
            });
        })
        .then(() => dispatch(getProducts()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err);
        });
};
export const updateProduct = (updateInfo, id) => dispatch => {

    axios
        .put(
            Base_URL + `update-sku/${updateInfo.id}`,
            updateInfo
        )
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Product Updated', variant: "success"}));
            }
            dispatch({
                type: UPDATE_PRODUCT
            });
        })
        .then(() => dispatch(getProducts()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err.response);
        });
};
export const removeProduct = id => dispatch => {
    axios
        .delete(Base_URL + `delete-sku/${id}`)
        .then(res => {
            if (res.request.status === 200) {
                dispatch(showMessage({message: 'Product Removed', variant: "success"}));
            }
            dispatch({
                type: REMOVE_PRODUCT
            });
        })
        .then(() => dispatch(getProducts()))
        .catch(err => {
            dispatch(showMessage({message: err.response.data.error, variant: "error"}));
            console.log('err', err.response);
        });
};


export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    };
}

export function toggleInSelectedProducts(productId) {
    return {
        type: TOGGLE_IN_SELECTED_PRODUCTS,
        productId
    };
}

export function selectAllProducts() {
    return {
        type: SELECT_ALL_PRODUCTS
    };
}

export function deSelectAllProducts() {
    return {
        type: DESELECT_ALL_PRODUCTS
    };
}

export function openNewProductDialog() {
    return {
        type: OPEN_NEW_PRODUCT_DIALOG
    };
}

export function closeNewProductDialog() {
    return {
        type: CLOSE_NEW_PRODUCT_DIALOG
    };
}

export function openEditProductDialog(data) {
    return {
        type: OPEN_EDIT_PRODUCT_DIALOG,
        data
    };
}

export function closeEditProductDialog() {
    return {
        type: CLOSE_EDIT_PRODUCT_DIALOG
    };
}


export function removeProducts(productIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().productsApp.products;

        const request = axios.post('/api/products-app/remove-products', {
            productIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: REMOVE_PRODUCTS
                }),
                dispatch({
                    type: DESELECT_ALL_PRODUCTS
                })
            ]).then(() => dispatch(getProducts(routeParams)))
        );
    };
}

export function toggleStarredProduct(productId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().productsApp.products;

        const request = axios.post('/api/products-app/toggle-starred-product', {
            productId
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_PRODUCT
                }),
            ]).then(() => dispatch(getProducts(routeParams)))
        );
    };
}

export function toggleStarredProducts(productIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().productsApp.products;

        const request = axios.post('/api/products-app/toggle-starred-products', {
            productIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_PRODUCTS
                }),
                dispatch({
                    type: DESELECT_ALL_PRODUCTS
                }),
            ]).then(() => dispatch(getProducts(routeParams)))
        );
    };
}

export function setProductsStarred(productIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().productsApp.products;

        const request = axios.post('/api/products-app/set-products-starred', {
            productIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_PRODUCTS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_PRODUCTS
                }),
            ]).then(() => dispatch(getProducts(routeParams)))
        );
    };
}

export function setProductsUnstarred(productIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().productsApp.products;

        const request = axios.post('/api/products-app/set-products-unstarred', {
            productIds
        });

        return request.then(response =>
            Promise.all([
                dispatch({
                    type: SET_PRODUCTS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_PRODUCTS
                }),
            ]).then(() => dispatch(getProducts(routeParams)))
        );
    };
}

export const getProductsPaginationData = (page, pageSize, sorted, filtered) => dispatch => {
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
    if (localStorage.getItem('companyId')) {
        let id = localStorage.getItem('companyId');
        querys = 'get-all-sku-by-search-pagination/' + id+'/'+selectedSearch.companyId+'/'+ selectedSearch.brandId+'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    } else {
        querys = 'get-all-sku-by-search-pagination/Undefined/'+ selectedSearch.companyId+'/'+ selectedSearch.brandId+'/'+page+'/'+pageSize+'/'+sortingName+'/'+sortingOrder;
    }
    axios
        .get(Base_URL + querys)
        .then(res => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data.records,
                pages: res.data.pages
            });
            return({});
        })
        .then(() => dispatch(getAllWarrantyRegistration()))
        .then(() => dispatch(getAllWarrantyCompletion()))
        .then(() => dispatch(getAllWarrantyClaim()))
        .then(() => dispatch(getAllBrand()))
        .then(() => dispatch(getAllCompanies()))
        .catch(err => {
            console.log('err', err);
        });
};

export function searchProducts(state) {
    if(state.companyId===''){
        state.companyId='Undefined';
    }
    if(state.brandId===''){
        state.brandId='Undefined';
    }

    selectedSearch=state;

    return (
        getProductsPaginationData(0,20,'','')
    );
}