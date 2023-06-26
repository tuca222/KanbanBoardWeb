import axios from 'axios';
import queryString from 'query-string';

const baseUrlServer = ""
const baseUrlLocal = "http://localhost:3333"

const axiosClient = axios.create({
  baseURL: baseUrlLocal,
  paramsSerializer: params => queryString.stringify({ params })
})

axiosClient.interceptors.request.use(async config => {
  return {
    ...config,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  }
})

axiosClient.interceptors.response.use(response => {
  if (response && response.data) return response.data
  return response
}, err => {
  if (!err.response) {
    return alert(err)
  }
  throw err.response;
})

export default axiosClient;