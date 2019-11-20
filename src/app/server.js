import axios from "axios";

export const Base_URL = "http://localhost:4000/";        //18.189.81.89          localhost

const token = localStorage.getItem('jwtToken');
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.common['Content-Type'] =
    'application/x-www-form-urlencoded';