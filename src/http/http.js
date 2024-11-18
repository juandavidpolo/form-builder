import axios from 'axios';

const https = axios.create()
https.interceptors.request.use((config) => {
  config.baseURL = ""
  config.headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})
https.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default https;