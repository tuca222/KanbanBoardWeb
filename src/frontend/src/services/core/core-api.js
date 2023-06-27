import axios from 'axios'
import { parse, stringify } from 'qs'
import { onResponseError, onResponseSucess } from './interceptors'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  paramsSerializer: {
    encode: parse,
    serialize: stringify
  }
})

api.interceptors.response.use(onResponseSucess, onResponseError)

api.defaults.headers.common.Accept = 'application/json'
api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common.credentials = 'include'

export default api