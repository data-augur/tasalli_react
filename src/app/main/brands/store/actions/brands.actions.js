import axios from 'axios';
import { Base_URL } from '../../../../server'
import {showMessage} from 'app/store/actions/fuse';

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


export const getAllCompanies = () => dispatch => {
    let query;
    if(localStorage.getItem('companyId'))
    {
        let id=localStorage.getItem('companyId');
        query='get-all-companies-by-id/'+id;
    }
    else
    {
        query='get-all-companies';
    }
    axios
    .get(Base_URL+query)
    .then(res => {

      dispatch({
        type: GET_ALL_COMPANIES,
        payload: res.data
      });
    })
    .catch(err => {


    });
};
export const getBrands = () => dispatch => {
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
    .get(Base_URL+query)
    .then(res => {

      dispatch({
        type: GET_BRANDS,
        payload: res.data
      });
    })
    .then(() => dispatch(getAllCompanies()))
    .catch(err => {
      console.log('err', err);

    });
};
export const addBrand = newContact => dispatch => {

  axios
    .post(Base_URL+'create-brand', newContact)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Brand Created',variant: "success"}));
        }
      dispatch({
        type: ADD_BRAND
      });
    })
    .then(() => dispatch(getBrands()))
    .catch(err => {
        dispatch(showMessage({message: err,variant: "error"}));
        console.log('err', err);

    });
};
export const updateBrand = (updateInfo, id) => dispatch => {

  axios
    .put(
        Base_URL+`update-brand/${updateInfo.id}`,
      updateInfo
    )
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Brand Updated',variant: "success"}));
        }
      dispatch({
        type: UPDATE_BRAND
      });
    })
    .then(() => dispatch(getBrands()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: err,variant: "error"}));

    });
};
export const removeBrand = id => dispatch => {
  axios
    .delete(Base_URL+`delete-brand/${id}`)
    .then(res => {
        if(res.request.status===200)
        {
            dispatch(showMessage({message: 'Brand Removed',variant: "success"}));
        }
      dispatch({
        type: REMOVE_BRAND
      });
    })
    .then(() => dispatch(getBrands()))
    .catch(err => {
      console.log('err', err.response);
        dispatch(showMessage({message: err,variant: "error"}));

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
    const { routeParams } = getState().brandsApp.brands;

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
    const { routeParams } = getState().brandsApp.brands;

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
    const { routeParams } = getState().brandsApp.brands;

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
    const { routeParams } = getState().brandsApp.brands;

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
    const { routeParams } = getState().brandsApp.brands;

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
