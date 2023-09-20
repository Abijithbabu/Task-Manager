import axios from "axios";

// const baseURL = `${process.env.REACT_APP_BaseURL}/api`
const baseURL = 'http://localhost:3000/api'

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default Axios

Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    console.warn(error)
    return Promise.reject(error);
  });

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
console.info(response.data)
  return response;
}, function (error) {
    console.warn(error.message)
  return Promise.reject(error);
});