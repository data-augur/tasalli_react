import axios from 'axios';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import { Base_URL } from '../../../server';
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    // .post(Base_URL+'su-admin/login', userData)
    .post(Base_URL+'su-admin/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      localStorage.setItem('id', decoded.id);
      const userInfo ={
        ...decoded,
        companyId: res.data.companyId,
        brandId: res.data.brandId,
      };
      // Set current user
      dispatch(setCurrentUser(userInfo));
    })
    .catch(err => {

      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data
      });
    });
};
// Login - Get User Token
export const loginBrandUser = userData => dispatch => {
  axios
    // .post(Base_URL+'admin-auth/login', userData)
    .post(Base_URL+'admin-auth/login', userData)
    .then(res => {
      // Save to localStorage
        const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      localStorage.setItem("companyId",res.data.companyId);
      localStorage.setItem("brandId",res.data.brandId);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);

      const userInfo ={
        ...decoded,
        companyId: res.data.companyId,
        brandId: res.data.brandId,
      };
      // Set current user
      dispatch(setCurrentUser(userInfo));
    })
    .catch(err => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const verifyToken = token => dispatch => {

  axios
    // .post(Base_URL+'admin-auth/verify-token', { token })
    .post(Base_URL+'admin-auth/verify-token', { token })
    .then(res => {
      // Set current user
      dispatch(setCurrentUser(res.data));
    })
    .catch(err => {

      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data
      });
    });
};
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // localStorage.removeItem('Role');
  localStorage.removeItem('WarrantyRegistrationFormName');
  localStorage.removeItem('SurveyName');
  localStorage.removeItem('WarrantyClaimFormName');
  localStorage.removeItem('brandId');
  localStorage.removeItem('companyId');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch({
    type: LOGOUT
  });
};
