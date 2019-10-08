import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://secure-forest-32865.herokuapp.com/',
    headers:{
        Authorization: 'Bearer {token}'
    }
});