import axios from 'axios';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        const token =
            localStorage.getItem('persist:auth') &&
            JSON.parse(window.localStorage.getItem('persist:auth'))?.token?.slice(1, -1);
        // console.log('tokenq: ', token);
        // Do something before request is sent
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default axiosClient;
