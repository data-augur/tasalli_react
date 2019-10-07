import axios from 'axios';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    // .post('http://localhost:4000/su-admin/login', userData)
    .post('http://18.189.81.89:4000/su-admin/login', userData)
    .then(res => {
      console.log('res', res);
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log('err', err);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data
      });
    });
};
// Login - Get User Token
export const loginBrandUser = userData => dispatch => {
  axios
    // .post('http://localhost:4000/admin-auth/login', userData)
    .post('http://18.189.81.89:4000/admin-auth/login', userData)
    .then(res => {
      console.log('res', res);
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log('err', err);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data
      });
    });
};

// Set logged in user
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
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch({
    type: LOGOUT
  });
};
