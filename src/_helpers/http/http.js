import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost/buildeasyApi/public/',
    headers:{
        Authorization: 'Bearer {token}'
    }
});