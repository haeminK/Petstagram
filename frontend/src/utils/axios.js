import axios from 'axios'
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
        '' : 'http://localhost:3000'
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + Cookies.get('accessToken');
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (['jwt expired', 'jwt malformed'].includes(error.response.data)) {
        window.location.reload();
    }
    return Promise.reject(error);
})

export default axiosInstance;