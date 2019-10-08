import axios from 'axios'

export const http = axios.create({
    baseURL: process.env.VUE_APP_baseUrl,
    headers:{
        Authorization: 'Bearer {token}'
    }
});