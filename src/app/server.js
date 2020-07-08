import axios from "axios";

// export const Base_URL = "http://3.133.18.163/api/";        //old=18.189.81.89         new=3.133.18.163          local=localhost
export const Base_URL = "http://localhost:4000/";
// export const Base_URL = "http://18.189.81.89:4000/";

const token = localStorage.getItem('jwtToken');
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.common['Content-Type'] =
    'application/x-www-form-urlencoded';
