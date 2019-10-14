import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost/buildeasyApi/public/',
    withCredentials: false,
   
});