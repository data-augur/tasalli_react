import axios from 'axios';

export const GET_USER_DATA = '[CONTACTS APP] GET USER DATA';

// export function getUserData() {
//   const token = localStorage.getItem('jwtToken');

//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Authorization: token
//   };

//   const request = axios({
//     method: 'get',
//     url: 'http://localhost:4000/get-all-brand-users',
//     headers
//   });

//   return dispatch =>
//     request.then(response =>
//       dispatch({
//         type: GET_USER_DATA,
//         payload: response.data
//       })
//     );
// }
const token = localStorage.getItem('jwtToken');
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';
export const getUserData = () => dispatch => {
  axios
    // .get('http://localhost:4000/get-all-brand-users')
    .get('http://18.189.81.89:4000/get-all-brand-users')
    .then(res => {
      console.log('res :', res);
      dispatch({
        type: GET_USER_DATA,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('err', err.response);
      //   dispatch({
      //     type: LOGIN_ERROR,
      //     payload: err.response.data
      //   });
    });
};
