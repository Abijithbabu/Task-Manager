import axios from "axios";

const baseURL = `${import.meta.env.VITE_BaseURL}`

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default Axios

Axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    console.warn(error)
    return Promise.reject(error);
  });

Axios.interceptors.response.use(function (response) {
console.warn(response.data)
  return response;
}, function (error) {
    console.error(error?.response?.data?.message || error.message)
  return Promise.reject(error);
});